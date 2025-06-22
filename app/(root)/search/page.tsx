import { CommunityCard } from "@/components/cards/CommunityCard";
import { NodeCard } from "@/components/cards/NodeCard";
import { UserCard } from "@/components/cards/UserCard";
import Comment from "@/components/forms/Comment";
import { fetchCommunities } from "@/lib/actions/community.actions";
import { fecthNodeById } from "@/lib/actions/node.actions";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
// import { useUser } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await currentUser();
  // const { isSignedIn, user, isLoaded } = useUser();

  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) redirect("/onboarding");

  const res = await fetchUsers({
    userId:userInfo.id,
    searchString: "",
    pageNumber: 1,
    pageSize: 20,
    sortby:"desc"
  });

  

  return (
    <div className="head-text mb-10">
      Search Users
      <div className="mt-14 flex flex-col gap-5">
        {res.users.length === 0 ? (
          <p className="no-result">No Users</p>
        ) : (
          res.users.map((i) => (
            <UserCard
              key={i.id}
              id={i.id}
              name={i.name}
              username={i.username}
              image={i.image}
              personType="User"
            />
          ))
        )}
      </div>
    </div>
  );
}
