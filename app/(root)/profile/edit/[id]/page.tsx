import AccountProfile from "@/components/forms/AccountProfile";
import { fetchUser } from "@/lib/actions/user.actions";

export default async function page({ params }: { params: { id: string } }) {
  const user = await fetchUser(params.id);

  return(

    <>
    <h2 className="head-text">Edit Profile</h2>
    <AccountProfile user={user} btnTitle="Edit Profile" /></>
  )
  
}
