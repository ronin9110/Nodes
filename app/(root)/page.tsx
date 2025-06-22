

import { NodeCard } from "@/components/cards/NodeCard";

import { FetchPosts } from "@/lib/actions/node.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";


export default async function Home() {
  const posts =await FetchPosts(1, 30);


  
  const user = await currentUser();
  if(!user) redirect('/sign-in')


  const userInfo = await fetchUser(user!.id);

  if (!userInfo?.onboarded) redirect("/onboarding");



  

  return (
    <div className="items-center">
        <h1 className="head-text text-left">Home</h1>
          <section className="mt-9 flex flex-col gap-10">
            {posts.posts.length == 0 ? (
              <p className="no-result">No posts Found</p>
            ) : (
              <>
                {posts.posts.map((i:any) => (
                  <NodeCard
                    key={i._id}
                    id={i._id}
                    currentUserId={userInfo._id.toString()}
                    parentId={i.parentId}
                    content={i.text}
                    author={i.author}
                    community={i.community}
                    createdAt={i.createdAt}
                    comments={i.children}
                    isComment={false}
                    likes={i.likes}
                    // onLike={handleLike}
                  />
                ))}
              </>
            )}
          </section>
    </div>
  );
}
