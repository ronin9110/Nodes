import * as z from "zod";

export const NodeValidation = z.object({
    
    node:z.string().nonempty().min(3,{message:"3 Characters Required"}) ,
    accountId:z.string()
})

export const CommentValidation = z.object({
    
    node:z.string().nonempty().min(3,{message:"3 Characters Required"}) ,
    accountId:z.string()
}) 