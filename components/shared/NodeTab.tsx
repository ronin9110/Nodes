import { fetchUserPosts } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import { NodeCard } from "../cards/NodeCard";
import { fetchCommunityPosts } from "@/lib/actions/community.actions";

interface Params {
  currentUserId: string;
  accountId: string;
  accountType: string;
}

export default async function NodeTab({
  currentUserId,
  accountId,
  accountType,
}: Params) {
  let res: any;

  if (accountType === "Community") {
    res = await fetchCommunityPosts(accountId);
  } else {
    res = await fetchUserPosts(accountId);
  }

  // console.log(res.nodes.length);

  if (!res) redirect("/");

  return (
    <section className="mt-9 flex flex-col gap-10">
      {res.nodes.length === 0 ? (
        <p className="no-result">No posts Found</p>
      ) : (
        <>
          {res.nodes.map((i: any,index:any) => (
            <NodeCard
              key={i._id}
              id={i._id}
              currentUserId={currentUserId}
              parentId={i.parentId}
              content={i.text}
              author={
                accountType === "User"
                  ? {
                      name: res.name,
                      image: res.image,
                      id: res.id,
                      _id: res._id,
                    }
                  : i.author
              }
              community={i.community}
              createdAt={i.createdAt}
              comments={i.children}
              isComment={false}
              likes={i.likes}
            />
          ))}
        </>
      )}
    </section>
  );
}
