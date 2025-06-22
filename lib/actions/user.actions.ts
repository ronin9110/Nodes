"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import NodePost from "../models/node.model";
import { FilterQuery, SortOrder } from "mongoose";
import { register } from "module";
import Community from "../models/community.model";

interface Params {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
}

export const fetchUser = async (userId: string) => {
  try {
    connectToDB();
    return JSON.parse(JSON.stringify(await User.findOne({ id: userId })));
  } catch (error: any) {
    throw new Error("Failed to Fetch UserInfo: ", error.message);
  }
};

export async function updateUser({
  userId,
  username,
  name,
  bio,
  image,
  path,
}: Params): Promise<void> {
  connectToDB();

  try {
    await User.findOneAndUpdate(
      { id: userId },
      {
        username: username.toLowerCase(),
        name,
        bio,
        image,
        onboarded: true,
      },
      { upsert: true }
    );

    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(`Failed to create/update User: ${error.message}`);
  }
}

export async function fetchUserPosts(userId: string) {
  connectToDB();

  try {
    const posts = await User.findOne({ id: userId }).populate({
      path: "nodes",
      model: NodePost,
      options: { sort: { createdAt: -1 } },
      populate: [
        {
          path: "children",
          model: NodePost,
          populate: {
            path: "author",
            model: User,
          },
        },
        {
          path: "community",
          model: Community,
          strictPopulate: false,
        },
      ],
    });
    return JSON.parse(JSON.stringify(posts));
  } catch (error: any) {
    throw new Error(`Failed to Featch posts by User: ${error.message}`);
  }
}

export async function fetchUsers({
  userId,
  searchString = "",
  pageNumber = 1,
  pageSize = 20,
  sortby = "desc",
}: {
  userId: string;
  searchString: string;
  pageNumber: number;
  pageSize: number;
  sortby: SortOrder;
}) {
  connectToDB();

  try {
    const skipAmount = (pageNumber - 1) * pageSize;

    const Regex = new RegExp(searchString, "i");

    const query: FilterQuery<typeof User> = {
      id: { $ne: userId },
    };

    if (searchString.trim() !== "") {
      query.$or = [
        { username: { $regex: Regex } },
        { name: { $regex: Regex } },
      ];
    }

    const sortQuery = { createdAt: sortby };

    const usersQuery = User.find(query)
      .sort(sortQuery)
      .skip(skipAmount)
      .limit(pageSize);

    const totalUserCouont = await User.countDocuments(query);

    const users = await usersQuery.exec();

    const isNextPage = totalUserCouont > skipAmount + users.length;

    return { users, isNextPage };
  } catch (error: any) {
    throw new Error(`Failed to Featch Users: ${error.message}`);
  }
}

export const getActivity = async (userId: string) => {
  try {
    let Activity:any={
      replies:[],
      likes:[]
    }
    connectToDB();
    const UserNodes = await NodePost.find({ author: userId });

    const ChildNodes = UserNodes.reduce((acc, userNode) => {
      return acc.concat(userNode.children);
    }, []);

    const replies = await NodePost.find({
      _id: { $in: ChildNodes },
      author: { $ne: userId },
    }).populate({
      path: "author",
      model: User,
      select: "name image _id",
    });

    replies && replies.map((i) => Activity.replies.push(i));

    const likes = await NodePost.find({
      _id: { $in: UserNodes },
      author: { $ne: userId }, // Exclude posts authored by the same user
      likes: { $elemMatch: { $eq: userId } }, // Include only posts liked by the user
    }).populate({
      path: "author",
      model: User,
      select: "name image _id",
    });

    likes && likes.map((i) => Activity.likes.push(i));

    const likes2 = await NodePost.find({
      _id: { $in: ChildNodes },
      author: { $ne: userId },
      likes: { $elemMatch: { $eq: userId } },
    }).populate({
      path: "author",
      model: User,
      select: "name image _id",
    });

    likes2 && likes2.map((i) => Activity.likes.push(i));

    console.log(Activity);

    return Activity;
  } catch (error: any) {
    throw new Error("Failed to Fetch Activity: ", error.message);
  }
};
