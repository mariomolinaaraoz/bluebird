"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function LikesBlog({
  blog,
  addOptimisticBlog,
}: {
  blog: BlogWithAuthor;
  addOptimisticBlog: (newBlog: BlogWithAuthor) => void;
}) {
  const router = useRouter();
  const handleLikes = async () => {
    const supabase = createClientComponentClient<Database>();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      if (blog.user_has_liked_blog) {
        addOptimisticBlog({
          ...blog,
          likes: blog.likes - 1,
          user_has_liked_blog: !blog.user_has_liked_blog,
        });
        await supabase
          .from("likes_blogs")
          .delete()
          .match({ user_id: user.id, blog_id: blog.id });
      } else {
        addOptimisticBlog({
          ...blog,
          likes: blog.likes + 1,
          user_has_liked_blog: !blog.user_has_liked_blog,
        });
        await supabase.from("likes_blogs").insert({ user_id: user.id, blog_id: blog.id });
      }
      router.refresh();
    }
  };
  return (
    <button className="group flex items-center" onClick={handleLikes}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`group-hover:fill-red-600 group-hover:stroke-red-600 ${
          blog.user_has_liked_blog
            ? "fill-red-600 stroke-red-600"
            : "fill-none stroke-gray-500"
        }`}
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
      <span
        className={`ml-2 text-sm group-hover:text-red-600 ${
          blog.user_has_liked_blog ? "text-red-600" : "text-gray-500"
        }`}
      >
        {blog.likes}
      </span>
    </button>
  );
}