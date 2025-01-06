"use client";

import { User } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function NewTweet({ user }: { user: User }) {
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const title = String(formData.get("title"));

    if (title.trim() === "") {
      alert("El tweet no puede estar vacío.");
      return;
    }

    await fetch("/api/add-tweet", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, userId: user.id }),
    });

    // Limpia el formulario después de enviar el tweet
    form.reset();
    router.refresh();
  };

  return (
    <form className="p-4 border-b border-gray-200" onSubmit={handleSubmit}>
      <div className="flex items-start space-x-4">
        <Avatar>
          <AvatarImage src={user.user_metadata.avatar_url} alt={user.user_metadata.name} />
          <AvatarFallback>
            {user.user_metadata.name?.slice(0, 2).toUpperCase() || "UN"}
          </AvatarFallback>
        </Avatar>
        <div className="flex-grow">
          <Input
            name="title"
            placeholder="¿Qué está pasando?"
            className="mb-2"
          />
          <Button type="submit">Twittear</Button>
        </div>
      </div>
    </form>
  );
}