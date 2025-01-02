import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg sm:w-96 w-full">
        <h3 className="text-2xl font-bold text-center">Login to your account</h3>
        {/* <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              placeholder="Email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              required
            />
          </div>
          <div className="mt-4">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              placeholder="Password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              required
            />
          </div>
          <div className="flex items-center justify-between mt-4">
            <Button type="submit" className="w-full">Login</Button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <span className="text-sm text-gray-600">Or continue with</span>
        </div> */}

        <EmailButton/>

        {/* <div className="mt-4">
          <Button
            onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
            className="w-full flex items-center justify-center"
            variant="outline"
          >
            <GithubIcon className="mr-2 h-4 w-4" />
            Sign in with GitHub
          </Button>
        </div> */}
          <GitHubButton />
      </div>
    </div>
    
  );
}