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
import { NodeValidation } from "@/lib/validations/node";
import { CreateNode } from "@/lib/actions/node.actions";
import { currentUser } from "@clerk/nextjs/server";
import { useOrganization } from "@clerk/nextjs";

export default function PostNode({ userId }: { userId: string }) {
  const pathName = usePathname();
  const router = useRouter();
  const { organization }= useOrganization();

  const form = useForm({
    resolver: zodResolver(NodeValidation),
    defaultValues: {
      node: "",
      accountId: userId,
    },
  });

  const onSubmit = async (values: z.infer<typeof NodeValidation>) => {
    
      await CreateNode({
      text: values.node.trim(),
      author: userId,
      communityId: organization? organization.id:null,
      path: pathName,
    });
    

    router.push("/");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-10 justify-start mt-10"
      >
        <FormField
          control={form.control}
          name="node"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2 w-full">
              <FormLabel className="text-base-semibold text-light-2">
                Content
              </FormLabel>
              <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                <Textarea
                  rows={15}
                  className="account-form_input no-focus"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-white text-black hover:text-white hover:border-2">
          Post Node
        </Button>
      </form>
    </Form>
  );
}
