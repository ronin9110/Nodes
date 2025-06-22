
import { NodeCard } from "@/components/cards/NodeCard";
import Comment from "@/components/forms/Comment";
import { fecthNodeById } from "@/lib/actions/node.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";

import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  if (!id) return null;

  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) redirect("/onboarding");

  const NodePost = await fecthNodeById(id);

  // console.log(NodePost);



  return (
    <section className="realtive">
      <div>
        <NodeCard
        likes={NodePost.likes}
          id={NodePost._id}
          currentUserId={userInfo?._id.toString() || ""}
          parentId={NodePost.parentId}
          content={NodePost.text}
          author={NodePost.author}
          community={NodePost.community}
          createdAt={NodePost.createdAt}
          comments={NodePost.children}
          isComment={false}
          nodepage={true}
        />
      </div>
      
    <div >
        <Comment
          NodeId={NodePost._id}
          currentUserImg={userInfo.image}
          currentUserId={userInfo._id.toString()}
        />
      </div>

      <div className="mt-10">
        {NodePost.children.map((childItem: any) => (
          <div className="mt-5" key={childItem._id}>
            <NodeCard
            likes={childItem.likes}
            id={childItem._id}
            currentUserId={userInfo?._id.toString()|| ""}
            parentId={childItem.parentId}
            content={childItem.text}
            author={childItem.author}
            community={childItem.community}
            createdAt={childItem.createdAt}
            comments={childItem.children}
            isComment={true}
          />
          </div>
        ))}
      </div>
      
    </section>
  );
}
