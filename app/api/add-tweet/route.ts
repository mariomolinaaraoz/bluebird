import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const supabase = createServerActionClient<Database>({ cookies });
  const { title, userId } = await request.json();

  if (!title || !userId) {
    return new Response("Invalid input", { status: 400 });
  }

  await supabase.from("tweets").insert({ title, user_id: userId });

  return new Response("Tweet added successfully", { status: 200 });
}