"use server";

import ProfileHeader from "@/components/shared/ProfileHeader";
import { profileTabs } from "@/constants";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { redirect } from "next/navigation";
import NodeTab from "@/components/shared/NodeTab";

export default async function Page({ params }: { params: { id: string } }) {
  const {id} = await params;

  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(id);

  const current = await fetchUser(user.id);

  const edit = userInfo._id.toString()==current._id.toString();

  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <>
      <h2 className="head-text">Profile</h2>

      <ProfileHeader
        accountId={userInfo._id.toString()}
        authUserId={user.id}
        name={userInfo.name}
        username={userInfo.username}
        imgUrl={userInfo.image}
        bio={userInfo.bio}
        currentUser={edit}
      />

      <div className="mt-9">
        <Tabs defaultValue="Nodes">
          <TabsList className="grid w-full grid-cols-1">
            {profileTabs.map((tab) => (
              <TabsTrigger key={tab.label} value={tab.value} className="tab">
                <Image
                  src={tab.icon}
                  alt={tab.label}
                  width={20}
                  height={20}
                  className="object-contain "
                />
                <p className="max-sm:hidden">{tab.label}</p>
                {tab.label == "Nodes" && (
                  <p className="ml-1 rounded-sm bg-dark-2 px-2 py-1 !text-tiny-medium text-light-2 ">
                    {userInfo?.nodes?.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent
            key={`content-Nodes`}
            value={"Nodes"}
            className="w-fulll text-light-1"
          >
            <NodeTab
              currentUserId={userInfo._id.toString()}
              accountId={userInfo.id}
              accountType="User"
            />
          </TabsContent>
          {/* <TabsContent
            key={`content-Replies`}
            value={"replies"}
            className="w-fulll text-light-1"
          >
            wtf bruh 2
          </TabsContent>
          <TabsContent
            key={`content-Tagged`}
            value={"tagged"}
            className="w-fulll text-light-1"
          >
            wtf bruh
          </TabsContent> */}
        </Tabs>
      </div>
    </>
  );
}
