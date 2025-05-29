"use server";

import ProfileHeader from "@/components/shared/ProfileHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { profileTabs } from "@/constants";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { redirect } from "next/navigation";
import NodeTab from "@/components/shared/NodeTab";

export default async function Page({ params }: { params: { id: string } }) {
  const user =  await currentUser();

    if(!user) return null;

    const userInfo = await fetchUser(params.id);

    if(!userInfo?.onboarded) redirect("/onboarding");

  return (
    <>
      <h2 className="head-text">Profile</h2>

      <ProfileHeader
        accountId={userInfo.id}
        authUserId={user.id}
        name={userInfo.name}
        username={userInfo.username}
        imgUrl={userInfo.image}
        bio={userInfo.bio}
      />

      <div className="mt-9">
        <Tabs defaultValue="Nodes">
          <TabsList className="grid w-full grid-cols-3">
            {profileTabs.map(tab=>(
              <TabsTrigger key={tab.label} value={tab.value} className="tab">
              <Image
              src={tab.icon}
              alt={tab.label}
              width={20}
              height={20}
              className="object-contain "
              />
              <p className="max-sm:hidden">{tab.label}</p>
              {tab.label=='Nodes' &&(
                <p className="ml-1 rounded-sm bg-dark-2 px-2 py-1 !text-tiny-medium text-light-2 ">
                  {
                  userInfo?.nodes?.length}
                </p>
              )}
            </TabsTrigger>))}
          </TabsList>
          {profileTabs.map(tab=>(
            <TabsContent key={`content-${tab.label}`} value={tab.value}
            className="w-fulll text-light-1">
              <NodeTab
              currentUserId={user.id}
              accountId={userInfo.id}
              accountType="User"
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* <div>
        <Tabs defaultValue="account" className="w-[100%] ">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="@peduarte" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>


      </div> */}
    </>
  );
}
