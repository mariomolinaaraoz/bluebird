import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Users from "./users";
import Blogs from "./blogs";
import NewBlog from "./new-blog";

export default async function Admin_Page() {
    const supabase = createServerComponentClient<Database>({ cookies });

    const {
      data: { session },
    } = await supabase.auth.getSession();
  
    if (!session) {
      redirect("/login");
    }

	if (session?.user.user_metadata.role !== "admin") {
		 return redirect("/");
	}

  interface LikeBlog {
    user_id: string;  // o el tipo adecuado para el user_id, tal vez un número
  }
  

	const { data } = await supabase
    .from("blogs")    
    .select("*, author: profiles(*), likes_blogs(user_id)").order('created_at', {ascending:false});

  const blogs =
    data?.map((blog) => ({
      ...blog,
      author: Array.isArray(blog.author) ? blog.author[0] : blog.author,
      user_has_liked_blog: !!blog.likes_blogs.find(
        (like:LikeBlog) => like.user_id === session.user.id
      ),
      likes: blog.likes_blogs.length,
    })) ?? [];

	return (
		<div>
			<h1 className="text-3xl font-bold">Admin role access only</h1>
      <a className="my-4" href="/">Home</a>
      <h1>mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm</h1>
			<Users/>

      <h1>mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm</h1>
      <NewBlog user={session.user} />
			<Blogs blogs={blogs} />
      <h1>mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm</h1>
		</div>
	);
}