import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from "next/image";
import Avatar from "./avatar";

export default function NewBlog({ user}: { user: User }) {
  
  const addBlog = async (formData: FormData) => {
    "use server";
    const title = String(formData.get("title"));    
    const supabase = createServerActionClient<Database>({ cookies });

    await supabase.from("blogs").insert({ title, user_id: user.id});
  };

  return (
    <form className="border border-gray-800 border-t-0" action={addBlog}>
      <div className="flex py-8 px-4">
        <div className="h-12 w-12">
          <Image
            src={user.user_metadata.avatar_url}
            alt="user avatar"
            width={48}
            height={48}
            className="rounded-full"
          />
        </div>
        <div className="grid grid-flow-row gap-6 w-full">
          <input
            name="title"
            className="bg-inherit flex-1 ml-2 text-2xl leading-loose placeholder-gray-500 px-2 py-2 border rounded-full"
            placeholder="What is happening?!"
          />
          <div className="flex flex-row justify-between  px-10">
            <Avatar uid={user.id}/>  
            <button type="button">Evento</button>
            <button type="button">Escribir Artículo</button>
          </div>
        </div>
      </div>
    </form>
  );
}