import Image from "next/image";
import Link from "next/link";

interface Params {
  id: string;
  name: string;
  username: string;
  image: string;
  personType: string;
}

export const UserCard = ({ id, name, username, image, personType }: Params) => {
  return (
    <Link href={`/profile/${id}`} className={`flex w-full flex-col rounded bg-dark-4 p-4`}>
      <div className="flex items-start">
        <div className="flex w-full flex-1 flex-row items-center">
          <div className="flex flex-col ">
              <Image
                src={image}
                alt="Profile Image"
                width={48}
                height={48}
                className="cursor-pointer rounded-full"
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
    </Link>
  );
};
