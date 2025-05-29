import { NodeCard } from "@/components/cards/NodeCard";
import { FetchPosts } from "@/lib/actions/node.actions";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const posts = await FetchPosts(1, 30);
  const user = await currentUser();
  console.log(posts);
  return (
    <>
      <h1 className="head-text text-left">Home</h1>
      <section className="mt-9 flex flex-col gap-10">
        {posts.posts.length == -0 ? (
          <p className="no-result">No posts Found</p>
        ) : (
          <>
            {posts.posts.map((i) => (
              <NodeCard
                key={i._id}
                id={i.id}
                currentUserId={user?.id.toString() || ""}
                parentId={i.parentId}
                content={i.text}
                author={i.author}
                community={i.community}
                createdAt={i.createdAt}
                comments={i.comments}
                isComment={false}
              />
            ))}
          </>
        )}
      </section>
    </>
  );
}
