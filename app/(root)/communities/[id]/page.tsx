
import ProfileHeader from "@/components/shared/ProfileHeader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { communityTabs, profileTabs } from "@/constants";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import NodeTab from "@/components/shared/NodeTab";
import { fetchCommunityDetails } from "@/lib/actions/community.actions";
import { UserCard } from "@/components/cards/UserCard";

export default async function Page({ params }: { params: { id: string } }) {
  const {id} = await params;


  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  const communityDetails = await fetchCommunityDetails(id);

  // console.log(user)

  return (
    <>
      <h2 className="head-text">Profile</h2>

      <ProfileHeader
        accountId={communityDetails.id}
        authUserId={user.id}
        name={communityDetails.name}
        username={communityDetails.username}
        imgUrl={communityDetails.image}
        bio={communityDetails.bio}
        type="Community"
      />

      <div className="mt-9">
        <Tabs defaultValue="Nodes">
          <TabsList className="grid w-full grid-cols-2">
            {communityTabs.map((tab,ind) => (
              <TabsTrigger key={ind} value={tab.value} className="tab">
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
                    {communityDetails?.nodes?.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
            <TabsContent value="Nodes" className="w-full text-light-1">
              <NodeTab
                currentUserId={userInfo._id.toString()}
                accountId={communityDetails._id}
                accountType="Community"
              />
            </TabsContent>
            <TabsContent value="members" className="w-full text-light-1">
              <section className="mt-9 flex flex-col gap-5">
              {communityDetails.members.map((i:any)=>(
                <UserCard
                              key={i.id}
                              id={i.id}
                              name={i.name}
                              username={i.username}
                              image={i.image}
                              personType="User" 
                            />
              ))}

              </section>
            </TabsContent>
            <TabsContent value="Nodes" className="w-full text-light-1">
              <NodeTab
                currentUserId={userInfo._id.toString()}
                accountId={communityDetails._id}
                accountType="Community"
              />
            </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
