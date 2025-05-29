import AccountProfile from "@/components/forms/AccountProfile";
import { currentUser } from "@clerk/nextjs/server";

export default async function Page() {
    const user = await currentUser();
    const userInfo ={};
    const userData ={
        id:user?.id,
        objectId:userInfo?._id,
        username: user?.username ||userInfo?.username,
        name: user?.firstName || userInfo?.name,
        bio: userInfo?.bio,
        image: user?.imageUrl || userInfo?.image
    }

  return (
    <main className="mx-auto flex-col max-w-3xl justify-start px-10 py-20">
      <h2 className="head-text">Onboarding</h2>
      <p className="mt-2 text-base-regular text-light-2">
        Complete your Profile to use Nodes.
      </p>
      <section className="mt-3 bg-dark-4 p-10">
        <AccountProfile user={userData} btnTitle="Continue"/>
      </section>
    </main>
  );
}
