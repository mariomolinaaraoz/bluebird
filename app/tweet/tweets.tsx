"use client";

import { useEffect, useOptimistic } from "react";
import { useRouter } from "next/navigation";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { MessageCircle, Repeat2, Share } from 'lucide-react'

import Likes from "./likes";

export default function Tweets({ tweets }: { tweets: TweetWithAuthor[] }) {
  const [optimisticTweets, addOptimisticTweet] = useOptimistic<
    TweetWithAuthor[],
    TweetWithAuthor
  >(tweets, (currentOptimisticTweets, newTweet) => {
    const newOptimisticTweets = [...currentOptimisticTweets];
    const index = newOptimisticTweets.findIndex(
      (tweet) => tweet.id === newTweet.id
    );
    newOptimisticTweets[index] = newTweet;
    return newOptimisticTweets;
  });

  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const channel = supabase
      .channel("realtime tweets")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "tweets",
        },
        () => {
          router.refresh();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, router]);

  return optimisticTweets.map((tweet) => (
    <div key={tweet.id} className="p-4 border-b border-gray-200">
      <div className="flex space-x-3">
        <Avatar>
          <AvatarImage src={tweet.author.avatar_url} alt={tweet.author.name} />
          <AvatarFallback>{tweet.author[0]}</AvatarFallback>
        </Avatar>

        <div>
          <div className="flex items-center space-x-1">
            <span className="font-bold">{tweet.author.full_name}</span>
            <span className="text-gray-500">@{tweet.author.username}</span>
            <span className="text-gray-500 px-1">|</span>
            <span className="text-gray-500">
              {new Intl.DateTimeFormat('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              }).format(new Date(tweet.created_at))}
            </span>
          </div>

          <p>{tweet.title}</p>

          <div className="flex space-x-8 mt-2 text-gray-500">
            <button className="flex items-center space-x-1">
              <MessageCircle size={18} />
              <span>{tweet.replies}</span>
            </button>
            <button className="flex items-center space-x-1">
              <Repeat2 size={18} />
              <span>{tweet.retweets}</span>
            </button>
            <Likes tweet={tweet} addOptimisticTweet={addOptimisticTweet} />
            <button>
              <Share size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  ));
}