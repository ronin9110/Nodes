import Image from "next/image";
import Link from "next/link";

interface Params {
  id: string;
  name: string;
  username: string;
  image: string;
  members: {
    image:string
  }[];
  bio: string;
}

export const CommunityCard = ({
  id,
  name,
  username,
  image,
  bio,
  members,
}: Params) => {

  return (
    <Link
      href={`/communities/${id}`}
      className={`flex w-full flex-col rounded-lg bg-dark-4 p-4`}
    >
      <div className="flex items-start">
        <div className="flex w-full flex-1 flex-row items-center">
          <div className="flex flex-col relative w-12 h-12">
            <Image
              src={image}
              fill
              alt="Profile Image"
              className="object-cover rounded-full"
            />
          </div>
          <div className=" flex-1 mx-4 text-ellipsis">
            <h4 className="text-left text-base-semibold text-light-1">
              {name}
            </h4>
            <p className="text-left text-small-medium text-gray-1">
              @{username}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div className="m-2 text-small-regular text-gray-1">{bio}</div>
       
        {members.length > 0 && (
          <div className='flex items-center'>
            {members.map((member, index) => (
              <Image
                key={index}
                src={member.image}
                alt={`user_${index}`}
                width={28}
                height={28}
                className={`${
                  index !== 0 && "-ml-2"
                } rounded-full object-cover`}
              />
            ))}
            
            {members.length > 3 && (
              <p className='ml-1 text-subtle-medium text-gray-1'>
                {members.length}+ Users
              </p>
            )}
       </div>)}
      </div>
    </Link>
  );
};
