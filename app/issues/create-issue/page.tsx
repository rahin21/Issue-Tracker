"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Loader2 } from "lucide-react";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });

const FormSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
});

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function CreateIssuePage() {
  const router = useRouter();
  const { data: issues, mutate } = useSWR("/api/issues", fetcher);
  const [loading, setLoading] = useState(false); // Spinner state

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setLoading(true); // Start spinner
    try {
      const response = await axios.post("/api/issue", {
        title: data.title,
        description: data.description,
        status: "Open",
      });

      mutate([...issues, response.data], false); // Optimistic update
    } catch (error) {
      console.error("Error creating issue:", error);
    } finally {
      router.push("/issues");
      setLoading(false); // Stop spinner
    }
  };

  return (
    <div className="flex flex-col items-center md:my-[7rem] my-[5rem]">
      <h1 className="text-3xl font-bold">Create Issue</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="md:w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel id="description">Description</FormLabel>
                <FormControl>
                  <SimpleMDE {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end items-center">
            <Button type="submit" disabled={loading}>
              {loading ? (
                <div className="flex items-center">
                 <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  Creating...
                </div>
              ) : (
                "Create An Issue"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
