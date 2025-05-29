import { fetchUserPosts } from "@/lib/actions/user.actions"
import { redirect } from "next/navigation";
import { NodeCard } from "../cards/NodeCard";

interface Params {
    currentUserId:string
accountId:string
accountType:string
}


export default async function NodeTab({currentUserId,
accountId,
accountType}:Params) {
    let res = await fetchUserPosts(accountId);

    if(!res) redirect("/");

    return(
        <section className="mt-9 flex flex-col gap-10">
            {res.nodes.map((i:any)=>(
               <NodeCard
                             key={i._id}
                           id={i._id}
                           currentUserId={currentUserId}
                           parentId={i.parentId}
                           content={i.text}
                           author={accountType==="User"?{
                            name:res.name,
                            image:res.image,
                            id:res.id
                           }:i.author}
                           community={i.community}
                           createdAt={i.createdAt}
                           comments={i.comments}
                           isComment={false}
                             /> 
            ))}
        </section>
    )
}