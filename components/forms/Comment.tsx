"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserValidation } from "@/lib/validations/user";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { Textarea } from "../ui/textarea";
import { eventNames } from "process";
import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadthing";
import { updateUser } from "@/lib/actions/user.actions";
import { usePathname, useRouter } from "next/navigation";
import { CommentValidation, NodeValidation } from "@/lib/validations/node";
import { addCommentToNode, CreateNode } from "@/lib/actions/node.actions";
import { currentUser } from "@clerk/nextjs/server";

interface Params {
  NodeId: string;
  currentUserImg: string;
  currentUserId: string;
}

export default function Comment({
  NodeId,
  currentUserImg,
  currentUserId,
}: Params) {
  const path = usePathname();
  const form = useForm({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      node: "",
      accountId: currentUserId,
    },
  });

  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {


    // console.log(NodeId)
    await addCommentToNode(NodeId, values.node, currentUserId.toString(), path);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10 flex items-center gap-4 border-y border-y-dark-4 py-5 max-xs:flex-col">
        <FormField
          control={form.control}
          name="node"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2 w-full">
              <FormLabel>
                <Image
                  src={currentUserImg}
                  alt="Profile Photo"
                  width={48}
                  height={48}
                  className="rounded full object-cover"
                />
              </FormLabel>
              <FormControl className="border-none bg-transparent">
                <Input
                  type="text"
                  placeholder="Comment..."
                  className="no-focus text-light-1 outline-hidden"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="bg-white text-black hover:text-white hover:border-2"
        >
          Comment
        </Button>
      </form>
    </Form>  
  );
}
