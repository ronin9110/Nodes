import { CommunityCard } from "@/components/cards/CommunityCard";
import { fetchCommunities } from "@/lib/actions/community.actions";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) redirect("/onboarding");

  const res = await fetchCommunities({
    searchString: "",
    pageNumber: 1,
    pageSize: 20
  });

  

  return (
    <div className="head-text mb-10">
      Search Communities
      <div className="mt-14 flex flex-col-2 gap-5">
        {res.communities.length === 0 ? (
          <p className="no-result">No Communities</p>
        ) : (
          res.communities.map((i) => (
            <CommunityCard
              key={i.id}
              id={i._id}
              name={i.name}
              username={i.username}
              image={i.image}
              bio={i.bio}
              members={i.members}
            />
          ))
        )}
      </div>
    </div>
  );
}
