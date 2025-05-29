"use client";

import Image from "next/image";

interface Params {
  accountId: string;
  authUserId: string;
  name: string;
  username: string;
  imgUrl: string;
  bio:string
}

export default function ProfileHeader({
  authUserId,
  name,
  username,
  imgUrl,
  bio
}: Params) {
  return (
    <div className="flex w-full flex-col justify-start mt-3">
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

        <p className="mt-6 max-w-lg text-base-regular text-light-2">{bio}</p>
        <div className="mt-12 h-0.5 w-full bg-dark-3"/>
      
    </div>
  );
}
