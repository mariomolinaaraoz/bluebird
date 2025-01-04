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
    redirect("/");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white rounded-lg shadow-lg sm:w-96 w-full">
        <h3 className="text-2xl font-bold text-center">Login to your account</h3>
        <EmailButton />
        <div className="mt-6 text-center">
          <span className="text-sm text-gray-600">Or continue with</span>
        </div>
        <GitHubButton />
      </div>
    </div>
  );
}