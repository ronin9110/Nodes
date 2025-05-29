"use server";

import { revalidatePath } from "next/cache";
import NodePost from "../models/node.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import { model } from "mongoose";
import { threadId } from "worker_threads";

interface Params {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
}

export const CreateNode = async ({
  text,
  author,
  communityId,
  path,
}: Params) => {
  connectToDB();

  const createNode = await NodePost.create({
    text,
    author,
    community: null,
  });

  await User.findByIdAndUpdate(author, { $push: { nodes: createNode._id } });

  revalidatePath(path);
};

export const FetchPosts = async (pageNumber = 1, pageSize = 20) => {
  connectToDB();

  const skipAmount = (pageNumber - 1) * pageSize;

  const postsQuery = NodePost.find({
    parentId: { $in: [null, undefined] },
  })
    .sort({ createdAt: "desc" })
    .skip(skipAmount)
    .populate({ path: "author", model: User })
    .populate({
      path: "childern",
      populate: {
        path: "author",
        model: User,
        select: "_id name parentId image",
      },
      strictPopulate: false,
    });

  const totalPosts = await NodePost.countDocuments({
    parentId: { $in: [null, undefined] },
  });

  const posts = await postsQuery.exec();

  const isNext = totalPosts > skipAmount + posts.length;

  return { posts, isNext };
};

export const fecthNodeById = async (id: string) => {
  connectToDB();

  try {
    const post = await NodePost.findById(id)
      .populate({
        path: "author",
        model: User,
        select: "_id id name image",
      })
      .populate({
        path: "children",
        populate: [
          {
            path: "author",
            model: User,
            select: "_id id name parentId image",
          },
          {
            path: "children",
            model: NodePost,
            populate: {
              path: "author",
              model: User,
              select: "_id id name parentId image",
            },
          },
        ],
        strictPopulate: false,
      })
      .exec();

    return post;
  } catch (error: any) {
    throw new Error(`Error Fetching Thread :${error.message}`);
  }
};

export const addCommentToNode = async (
  Nodeid: string,
  CommentText: string,
  userId: string,
  path: string
) => {
  connectToDB();

  try {
    const originalNode = await NodePost.findById(Nodeid);

    if (!originalNode) {
      throw new Error(`Thread not Found`);
    }

    const commentNode = new NodePost({
      text: CommentText,
      author: userId,
      parentId: Nodeid,
    });

    const savedCommentNode = await commentNode.save();

    originalNode.children.push(savedCommentNode._id);

    await originalNode.save();

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Error Adding Comment :${error.message}`);
  }
};
