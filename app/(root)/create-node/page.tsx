

import PostNode from "@/components/forms/PostNode";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Page() {
    const user =  await currentUser();

    if(!user) return null;

    const userInfo = await fetchUser(user.id);

    if(!userInfo?.onboarded) redirect("/onboarding");

    return(
        <>
        <h2 className="head-text">Create Node</h2>

        <PostNode userId={userInfo._id.toString()}/>
        </>
    )
}