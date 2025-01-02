import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import EmailButton from "./email-button";
import GitHubButton from "./github-button";

export default async function Login() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("https://bluebird-wine.vercel.app/");
  }

  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <EmailButton/>
      <GitHubButton />
    </div>
  );
}