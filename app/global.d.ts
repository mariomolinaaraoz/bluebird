import { Database as DB } from "@/lib/database.types";

type Blog = DB["public"]["Tables"]["blogs"]["Row"];
type Tweet = DB["public"]["Tables"]["tweets"]["Row"];

declare global {
  type Database = DB;
  type TweetWithAuthor = Tweet & {
    author: Profile;
    likes: number;
    user_has_liked_tweet: boolean;
  };
  type BlogWithAuthor = Blog & {
    author: Profile;
    likes: number;
    user_has_liked_blog: boolean;
  };
}