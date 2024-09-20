"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import LikesBlog from "./likes-blog";
import { useState,useEffect, useOptimistic } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";


export default function Blogs({ blogs }: { blogs: BlogWithAuthor[] }) {
  const [optimisticBlogs, addOptimisticBlog] = useOptimistic<
  BlogWithAuthor[],
  BlogWithAuthor
  >(blogs, (currentOptimisticBlogs, newBlog) => {
    const newOptimisticBlogs = [...currentOptimisticBlogs];
    const index = newOptimisticBlogs.findIndex(
      (blog) => blog.id === newBlog.id
    );
    newOptimisticBlogs[index] = newBlog;
    return newOptimisticBlogs;
  });

  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const channel = supabase
      .channel("realtime blogs")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "blogs",
        },
        () => {
          router.refresh();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, router]);

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const storage = process.env.NEXT_PUBLIC_SUPABASE_STORAGE || "";


  return optimisticBlogs.map((blog) => (
    <div
      key={blog.id}
      className="border border-gray-800 border-t-0 px-4 py-8 flex"
    >
      <div className="h-12 w-12">        
          <Image
            className="rounded-full"
            src={blog.author.avatar_url}
            alt="blog user avatar"
            width={48}
            height={48}
          />
        
  </div>
      
      <div className="ml-4">
        <p>
          <span className="font-bold">{blog.author.username}</span>
          <span className="text-sm ml-2 text-gray-400">
            {blog.author.full_name}
          </span>
        </p>
        <p>{blog.title}</p>
        <p>{blog.content}</p>        
        {blog.image ? (
          <Image
            width={150}
            height={150}
            src={url+storage+ "/blog_image/"+blog.image}
            alt={blog.image}
            className=""
            style={{ height: 150, width: 150 }}
          />
        ) : (
          <div
            className="avatar no-image"
            // style={{ height: 150, width: 150 }}
          />
        )} 
        <LikesBlog blog={blog} addOptimisticBlog={addOptimisticBlog} />
      </div>
    </div>
  ));
}

