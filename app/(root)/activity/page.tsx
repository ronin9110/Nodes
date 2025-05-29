import { NodeCard } from "@/components/cards/NodeCard";
import { UserCard } from "@/components/cards/UserCard";
import Comment from "@/components/forms/Comment";
import { fecthNodeById } from "@/lib/actions/node.actions";
import { fetchUser, fetchUsers, getActivity } from "@/lib/actions/user.actions";
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

  const activity = await getActivity(userInfo._id);

  return (
    <section>
      <h2 className="head-text mb-10">
        Activity Page
        <section className="mt-10 flex flex-col gap-5">
          {activity.length > 0 ? (
            <>
              {activity.map((act) => (
                <Link key={act._id} href={`/node/${act.parentId}`}>
                  <article className="activity-card">
                    <div>
                      <Image
                    src={act.author.image}
                    alt="Profile photo"
                    width={30}
                    height={30}
                    className="rounded-full object-cover"
                    />
                    </div>
                    <p className="text-ellipsis !text-small-regular">
                      <span className="text-small-semibold">
                        {act.author.name}
                      </span>{" "}
                      replied to your Node.
                    </p>
                  </article>
                </Link>
              ))}
            </>
          ) : (
            <p className="text-small-semibold text-center">No Activity yet.</p>
          )}
        </section>
      </h2>
    </section>
  );
}
