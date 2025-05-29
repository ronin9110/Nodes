
import { NodeCard } from "@/components/cards/NodeCard";
import Comment from "@/components/forms/Comment";
import { fecthNodeById } from "@/lib/actions/node.actions";
import { fetchUser } from "@/lib/actions/user.actions";
// import { useUser } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  if (!params.id) return null;

  const user = await currentUser();
  // const { isSignedIn, user, isLoaded } = useUser();

  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) redirect("/onboarding");

  const NodePost = await fecthNodeById(params.id);

  return (
    <section className="realtive">
      <div>
        <NodeCard
          id={NodePost._id}
          currentUserId={NodePost?.id.toString() || ""}
          parentId={NodePost.parentId}
          content={NodePost.text}
          author={NodePost.author}
          community={NodePost.community}
          createdAt={NodePost.createdAt}
          comments={NodePost.children}
          isComment={false}
        />
      </div>
      

      <div className="mt-10">
        {NodePost.children.map((childItem: any) => (
          <NodeCard
            key={childItem._id}
            id={childItem._id}
            currentUserId={user?.id.toString() || ""}
            parentId={childItem.parentId}
            content={childItem.text}
            author={childItem.author}
            community={childItem.community}
            createdAt={childItem.createdAt}
            comments={childItem.children}
            isComment={true}
          />
        ))}
      </div>
      <div >
        <Comment
          NodeId={NodePost.id}
          currentUserImg={userInfo.image}
          currentUserId={userInfo._id.toString()}
        />
      </div>
    </section>
  );
}
