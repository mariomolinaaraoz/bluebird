"use client";
import React, { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
type Profiles = Database["public"]["Tables"]["profiles"]["Row"];

export default function Avatar({
  uid,
  setAvatar, // Nueva prop para actualizar la URL del avatar
}: {
  uid: string;
  setAvatar: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const supabase = createClientComponentClient<Database>();
  const [avatarUrl, setAvatarUrl] = useState<Profiles["avatar_url"]>();
  const [uploading, setUploading] = useState(false);

    const downloadImage = async (path: string) =>{
      try {
        const { data, error } = await supabase.storage
          .from("blog_image")
          .download(path);

        if (error) {
          throw error;
        }

        const url = URL.createObjectURL(data);
        setAvatarUrl(url);
        
      } catch (error) {
        console.log("Error downloading image: ", error);
      }
     }

  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const filePath = `${uid}-${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("blog_image")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      downloadImage(filePath)
      
    } catch (error) {
      console.error(error);
      alert("Error uploading avatar!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-8">
        {avatarUrl ? (
          <Image
            width={150}
            height={150}
            src={avatarUrl}
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
        <div className="flex flex-col gap-8" style={{ width: 150 }}>
          <label className="button primary block" htmlFor="single">
            {uploading ? "Uploading ..." : "Upload"}
          </label>
          <input
            style={{
              visibility: "hidden",
              position: "absolute",
            }}
            type="file"
            id="single"
            accept="image/*"
            onChange={uploadAvatar}
            disabled={uploading}
          />
        </div>
      </div>
    </>
  );
}