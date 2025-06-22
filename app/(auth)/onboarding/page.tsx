import AccountProfile from "@/components/forms/AccountProfile";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);
  if (userInfo?.onboarded) redirect("/");

  const userData = {
    id: user?.id,
    objectId: userInfo?._id,
    username: !userInfo?user?.username : userInfo?.username,
    name: !userInfo?user?.firstName ||"" : userInfo?.name,
    bio: userInfo? userInfo?.bio:"",
    image: !userInfo? user?.imageUrl : userInfo?.image
  };

  return (
    <main className="mx-auto flex-col max-w-3xl  justify-start px-10 py-20">
      <h2 className="head-text">Onboarding</h2>
      <p className="mt-2 text-base-regular  text-light-2">
        Complete your Profile to use Nodes.
      </p>
      <section className="mt-3 bg-dark-4 rounded-lg p-10">
        <AccountProfile user={userData} btnTitle="Continue" />
      </section>
    </main>
  );
}
