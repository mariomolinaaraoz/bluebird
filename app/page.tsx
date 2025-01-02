import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AuthButtonServer from "./auth-button-server";
import { redirect } from "next/navigation";
import NewTweet from "./new-tweet";
import Tweets from "./tweets";

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const { data } = await supabase
    .from("tweets")
    .select("*, author: profiles(*), likes(user_id)").order('created_at', {ascending:false});

    interface LikeBlog {
      user_id: string;  // o el tipo adecuado para el user_id, tal vez un número
    }

  const tweets =
    data?.map((tweet) => ({
      ...tweet,
      author: Array.isArray(tweet.author) ? tweet.author[0] : tweet.author,
      user_has_liked_tweet: !!tweet.likes.find(
        (like:LikeBlog) => like.user_id === session.user.id
      ),
      likes: tweet.likes.length,
    })) ?? [];

    const isAdmin = session?.user.user_metadata.role === "admin";
    const userName = session?.user.email;

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="flex justify-between px-4 py-6 border border-gray-800 border-t-0">
        <h1 className="text-xl font-bold">Home</h1>
        <a href="/account/">Account</a>
        {isAdmin ? (
        <>
          <a href="/admin">Admin</a>
        </>
      ) : (
        <a href="/">{userName}</a>
      )}
        <AuthButtonServer />
      </div>      
      <NewTweet user={session.user} />
      <Tweets tweets={tweets} />
      {/* <pre>{JSON.stringify(tweets, null, 2)}</pre> */}
    </div>   
  );
}