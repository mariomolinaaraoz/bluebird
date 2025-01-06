import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import AuthButtonServer from "../auth-button-server";
import NewTweet from "../tweet/new-tweet";
import Tweets from "../tweet/tweets";

export default async function Dashboard() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  interface Like {
    user_id: string;
  }

  const { data } = await supabase
    .from("tweets")
    .select("*, author: profiles(*), likes(user_id)").order('created_at', { ascending: false });

  const tweets =
    data?.map((tweet) => ({
      ...tweet,
      author: Array.isArray(tweet.author) ? tweet.author[0] : tweet.author,
      user_has_liked_tweet: !!tweet.likes.find(
        (like: Like) => like.user_id === session.user.id
      ),
      likes: tweet.likes.length,
    })) ?? [];

  const isAdmin = session?.user.user_metadata.role === "admin";

  return (
    <>
      <div className="max-w-2xl mx-auto">
        <header className="border-b border-gray-200 p-4">
          <h1 className="text-xl font-bold">Inicio</h1>
          <AuthButtonServer />
        </header>
        <NewTweet user={session.user} />
        <Tweets tweets={tweets} />
      </div>


      {/* <div className="w-full max-w-xl mx-auto">
        <div className="flex justify-between px-4 py-6 border border-gray-800 border-t-0">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <a href="/account/">Account</a>
          {isAdmin && (
            <a href="/admin">admin</a>
          )}
          <AuthButtonServer />
        </div>
      </div> */}
    </>
  );
}