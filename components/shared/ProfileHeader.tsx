"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

interface Params {
  accountId: string;
  authUserId: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
  type?: "User" | "Community";
  currentUser?: boolean;
}

export default function ProfileHeader({
  accountId,
  authUserId,
  name,
  username,
  imgUrl,
  bio,
  currentUser,
}: Params) {
  return (
    <div className="flex w-full flex-col justify-start mt-3">
      <div className="flex flex-row justify-between items-center">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className=" relative h-20 w-20 object-cover">
              <Image
                src={imgUrl}
                alt="Profile Photo"
                fill
                className="rounded-full object-cover shadow-2xs"
              />
            </div>
          </div>
          <div className="flex-1 mx-4">
            <h2 className="text-left text-heading3-bold text-light-1">
              {name}
            </h2>
            <h2 className="text-left text-base-medium text-gray-1">
              @{username}
            </h2>
          </div>
        </div>
        {currentUser ? (
          <Link href={`/profile/edit/${authUserId}`}>
            <Button type="submit" className="bg-white text-black hover:text-white hover:border-2">
              Edit Profile
            </Button>
          </Link>
        ) : null}
      </div>

      <p className="mt-6 max-w-lg text-base-regular text-light-2">{bio}</p>
      <div className="mt-1 h-0.5 w-full bg-dark-3" />
    </div>
  );
}
