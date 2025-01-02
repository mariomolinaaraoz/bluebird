"use client"
import { useState } from 'react'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { User } from '@supabase/auth-helpers-nextjs';

const initialState = { title: '', content: '', image: '' }

export default function NewBlog({ user }: { user: User }) {
  const router = useRouter();
  const [post, setPost] = useState(initialState)
  const supabase = createClientComponentClient();
  const { title, content, image } = post
  const [imgUrl, setimgUrl] = useState<string>();
  const [uploading, setUploading] = useState(false);
  const [uploadingg, setUploadingg] = useState(false);

  function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setPost(() => ({ ...post, [e.target.name]: e.target.value }))
  }

  async function createNewPost() {
    if (!title || !content) return;

    const { data } = await supabase
      .from("blogs")
      .insert([{ title,content,image,user_id: user.id }])
      .single();
      router.refresh();
  }


  async function onChangeFile(e: React.ChangeEvent<HTMLInputElement>){
    try {
      setUploading(true);
      
      if (!e.target.files || e.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }
      
      const file = e.target.files[0];
      const fileExt = file.name.split(".").pop();
      const filePath = `${user.id}-${Math.random()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
      .from("blog_image")
      .upload(filePath, file);
      
      if (uploadError) {
        throw uploadError;
      }
      
      console.log("filePath: ", filePath);
      post.image=filePath;
      downloadImage(filePath)

      
    } catch (error) {
      console.error(error);
      alert("Error uploading avatar!");
    } finally {
      setUploading(false);
    }
    
  }
  
  async function downloadImage(filePath: string){
    try {
      setUploadingg(true);
      const { data, error } = await supabase.storage
        .from("blog_image")
        .download(filePath);

      if (error) {
        throw error;
      }

      console.log("data: ",data);
      const url = URL.createObjectURL(data);
      setimgUrl(url);      
      
    } catch (error) {
      console.log("Error downloading image: ", error);
    } finally {
      setUploadingg(false);
    }
  }

  return (    
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
        <button
        type="button"
        className="mb-4 bg-green-600 text-white font-semibold px-8 py-2 rounded-lg"
        onClick={createNewPost}
      >Create Post</button>
        <div className="grid grid-flow-row gap-6 w-full">
        <input
        onChange={onChange}
        name="title"
        placeholder="Title"
        value={post.title}
        className="border-b pb-2 text-lg my-4 focus:outline-none w-full font-light text-gray-500 placeholder-gray-500 y-2"
      /> 
        <input
        onChange={onChange}
        name="content"
        placeholder="Content"
        value={post.content}
        className="border-b pb-2 text-lg my-4 focus:outline-none w-full font-light text-gray-500 placeholder-gray-500 y-2"
      /> 
          <div className="flex flex-row justify-between  px-10">
          <label className="button primary block" htmlFor="single">
            
          </label>
          <label className="button primary block" htmlFor="single">
            {uploading ? 
            "subiendo ..." : 
            uploadingg ? "esperando respuesta ..." : ""
            }
          </label>
          <input
          id='single'
          type="file"
        onChange={onChangeFile}
        name="image"
        placeholder="image"
        className="border-b pb-2 text-lg my-4 focus:outline-none w-full font-light text-gray-500 placeholder-gray-500 y-2"
      />

            
          </div>
      {imgUrl ? (
          <Image
            width={150}
            height={150}
            src={imgUrl}
            alt="Avatar"
            className=""
            style={{ height: 150, width: 150 }}
          />
        ) : (
          <div
            className="avatar no-image"
            style={{ height: 150, width: 150 }}
          />
        )} 
        </div>
      </div>    
  );
}