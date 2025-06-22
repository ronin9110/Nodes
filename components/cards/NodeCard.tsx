"use client";

import { LikeNode } from "@/lib/actions/node.actions";
import { formatDateString } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Params {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
    _id: string;
  };
  community: {
    name: string;
    image: string;
    _id: string;
  } | null;
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment: boolean;
  nodepage?: boolean;
  likes: string[];
}

export const NodeCard = ({
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  isComment,
  nodepage,
  likes,
}: Params) => {
  const [like,setLike]=useState(likes.length);
  const [liked,setLiked]=useState(false);

  // console.log(community);

  useEffect(() => {
    likes.map(i=>{
      if(i===currentUserId){
        setLiked(true)
      }
    })
  }, [])
  

  const handleLike=async()=>{
    if(liked){
      await LikeNode(id,currentUserId,false)
      setLiked(false);
      setLike(like=>like-1)
    }else{
      await LikeNode(id,currentUserId,true)
      setLiked(true);
      setLike(like=>like+1)
    }
  }

  return (
    <article className={`flex w-full flex-col rounded-lg ${isComment ? "px-0 xs:px-7" : "bg-dark-2 p-7"}`}>
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
              <Image src={author.image} alt="Profile Image" fill className="cursor-pointer object-cover rounded-full" />
            </Link>
            <div className="thread-card_bar" />
          </div>
          <div className="flex w-full flex-col">
            <Link href={`/profile/${author.id}`} className="w-fit">
              <h4 className="cursor-pointer text-base-semibold text-light-1">{author.name}</h4>
            </Link>
            <p className="mt-2 mb-3 text-small-regular text-light-2">{content}</p>
            <div className={`${isComment && "mb-6"} flex flex-col gap-3`}>
              <div className="flex gap-3.5">
                <div className="flex items-center" onClick={handleLike}>
                  <Image
                    src={`/assets/${!liked?"heart-gray":"heart-fill"}.svg`}
                    alt="Heart"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain"
                  />
                  {like !== 0 && <p className="ml-1 text-subtle-medium text-gray-1">{like}</p>}
                </div>
                <Link href={`/node/${id}`}>
                  <Image
                    src="/assets/reply.svg"
                    alt="reply"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain me-1"
                  />
                </Link>
                {/* <Image src="/assets/repost.svg" alt="repost" width={24} height={24} className="cursor-pointer object-contain" />
                <Image src="/assets/share.svg" alt="share" width={24} height={24} className="cursor-pointer object-contain" /> */}
              </div>
              {comments && comments.length > 0 && !nodepage && (
                <Link href={`/node/${id}`}>
                  <div className="flex items-center">
                    {comments.map((i, index) => (
                      <Image
                        key={index}
                        src={i.author.image}
                        alt={`user_${index}`}
                        width={28}
                        height={28}
                        className={`${index !== 0 && "-ml-2"} cursor-pointer object-cover rounded-full`}
                      />
                    ))}
                    <p className="ml-1 text-subtle-medium text-gray-1">{comments.length} replies</p>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
 <div className="mt-5 flex justify-between">
        <p className="text-subtle-medium text-gray-400">
          {formatDateString(createdAt)}
        </p>
        {community && (
          <Link
            href={`/communities/${community._id}`}
            className="flex items-center justify-end"
          >
            <p className="text-subtle-medium text-gray-400">
              {community.name} Community
            </p>

            <Image
              src={community.image}
              alt={community.name}
              width={14}
              height={14}
              className="ml-1 rounded-full object-cover"
            />
          </Link>
        )}
      </div> 
    </article>
  );
};

