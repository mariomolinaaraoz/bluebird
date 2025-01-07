import AccountForm from "../account/account-form"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
import { cn } from '@/lib/utils'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Sheet, SheetTitle, SheetContent, SheetHeader, SheetTrigger } from '@/components/ui/sheet'

import { Menu, Plus, Search } from 'lucide-react'
import { ChevronRight, Globe, Keyboard, HelpCircle, MessageSquarePlus, Settings, Moon, Shield, DollarSign, Camera, LogOut, UserCircle2, Languages } from 'lucide-react'

import AuthButtonServer from "@/app/auth-button-server";

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import NewTweet from "../tweet/new-tweet";
import Tweets from "../tweet/tweets";

import { DocSidebar } from "@/app/dashboard/components/doc-sidebar"
import { VerticalNav } from "@/app/dashboard/components/vertical-nav"
import { SidebarProvider } from "@/components/ui/sidebar"


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
    <div className="flex min-h-screen">
      <VerticalNav />
      <SidebarProvider>
        <DocSidebar user={session.user} />
        <div className="flex-1">
          <header className="bg-background sticky top-0 z-20">
            <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-4 px-4">
              <div className="mr-auto flex items-center gap-2">
                <SearchBar className="hidden sm:block" />
              </div>
              <nav className="hover:[&_a]:text-foreground hidden items-center gap-6 text-sm font-medium md:flex [&_a]:transition-colors">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-1">
                      <Plus className="h-4 w-4" />
                      <span>Create</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <h2 className="text-lg font-bold">Create New Item</h2>
                    <p className="text-sm text-muted-foreground">Fill out the form below to create a new item.</p>
                    <NewTweet user={session.user} />
                  </SheetContent>
                </Sheet>


                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-1">

                      <Avatar>
                        <AvatarImage src={session.user.user_metadata.avatar_url} alt={session.user.user_metadata.name} />
                        <AvatarFallback>
                          {session.user.user_metadata.name?.slice(0, 2).toUpperCase() || "UN"}
                        </AvatarFallback>
                      </Avatar>

                    </Button>
                  </SheetTrigger>

                  <SheetContent side="right" className="w-[300px] bg-zinc-900 text-white p-0">
                    <div className="flex flex-col h-full">
                      <SheetHeader className="p-4 space-y-2">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={session.user.user_metadata.avatar_url} alt={session.user.user_metadata.name} />
                            <AvatarFallback>
                              {session.user.user_metadata.name?.slice(0, 2).toUpperCase() || "UN"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <SheetTitle className="text-sm text-white">{session.user.user_metadata.name}</SheetTitle>

                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" className="pl-0 text-sm text-blue-400">@{session.user.user_metadata.user_name}</Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                  <DialogTitle>Share link</DialogTitle>
                                  <DialogDescription>
                                    Anyone who has this link will be able to view this.
                                  </DialogDescription>
                                </DialogHeader>

                                <AccountForm user={session.user} />

                                <DialogFooter className="sm:justify-start">
                                  <DialogClose asChild>
                                    <Button type="button" variant="secondary">
                                      Close
                                    </Button>
                                  </DialogClose>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>


                          </div>
                        </div>
                        <div className="flex-1 overflow-auto">
                          <div className="px-2">
                            
                            <div className='flex flex-row pl-4 py-2'>
                              <LogOut size={20} /><span className="pl-2"><AuthButtonServer /></span>
                            </div>

                            <Separator className="my-2 bg-zinc-700" />

                            <MenuItem icon={<Camera size={20} />} label="YouTube Studio" />
                            <MenuItem icon="P" label="Tus beneficios de Premium" isPremium />
                            <MenuItem icon={<DollarSign size={20} />} label="Compras y suscripciones" />
                            <MenuItem icon={<Shield size={20} />} label="Tus datos en YouTube" />
                            <Separator className="my-2 bg-zinc-700" />

                            <MenuItem icon={<Moon size={20} />} label="Aspecto: tema del dispositivo" hasChevron />
                            <MenuItem icon={<Languages size={20} />} label="Idioma: Español" hasChevron />
                            <MenuItem icon={<Shield size={20} />} label="Modo Restringido: desactivado" hasChevron />
                            <MenuItem icon={<Globe size={20} />} label="Ubicación: Argentina" hasChevron />
                            <MenuItem icon={<Keyboard size={20} />} label="Combinaciones de teclas" />
                            <Separator className="my-2 bg-zinc-700" />

                            <MenuItem icon={<Settings size={20} />} label="Configuración" />
                            <MenuItem icon={<HelpCircle size={20} />} label="Ayuda" />
                            <MenuItem icon={<MessageSquarePlus size={20} />} label="Enviar sugerencias" />
                          </div>
                        </div>


                      </SheetHeader>
                    </div>
                  </SheetContent>
                </Sheet>

              </nav>
            </div>
          </header>
          <main className="container mx-auto p-4">
            <div className="prose prose-invert max-w-none">
              <h1 className="text-xl font-bold">Inicio</h1>
              <p className="text-muted-foreground">
                A composable, themeable and customizable sidebar component.
              </p>
              <Tweets tweets={tweets} />
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}

function SearchBar({ className }: { className?: string }) {
  return (
    <form className={cn('relative max-w-lg lg:max-w-xs', className)}>
      <Search className="text-muted-foreground absolute left-2 top-2 size-4" />
      <Input
        type="search"
        placeholder="Search..."
        className="h-8 rounded-lg pl-8 text-sm sm:w-[200px] md:w-[400px] lg:w-[200px]"
      />
    </form>
  )
}

function Sidebar() {
  return (
    <Sheet>
      <Tooltip>
        <SheetTrigger asChild>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="border-border size-8 shrink-0 border md:hidden"
            >
              <Menu className="size-4" />
              <span className="sr-only">Menu</span>
            </Button>
          </TooltipTrigger>
        </SheetTrigger>
        <TooltipContent align="start">Menu</TooltipContent>
        <SheetContent side="left" className="flex w-full flex-col p-4 pt-12 md:w-3/4">
          <SearchBar className="w-full sm:hidden" />
          <Button className="justify-start" variant="ghost">
            <Link href="#">Women</Link>
          </Button>
          <Button className="justify-start" variant="ghost">
            <Link href="#">Men</Link>
          </Button>
          <Button className="justify-start" variant="ghost">
            <Link href="#">Kids</Link>
          </Button>
          <Button className="justify-start" variant="ghost">
            <Link href="#">Accessories</Link>
          </Button>
        </SheetContent>
      </Tooltip>
    </Sheet>
  )
}

interface MenuItemProps {
  icon: React.ReactNode | string
  label: string
  hasChevron?: boolean
  isPremium?: boolean
}

function MenuItem({ icon, label, hasChevron, isPremium }: MenuItemProps) {
  return (
    <div className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-zinc-800 cursor-pointer">
      {typeof icon === "string" ? (
        <div className="w-5 h-5 bg-pink-500 text-white rounded flex items-center justify-center text-sm font-medium">
          {icon}
        </div>
      ) : (
        <div className="text-zinc-400">{icon}</div>
      )}
      <span className="flex-1 text-sm">{label}</span>
      {hasChevron && <ChevronRight size={18} className="text-zinc-400" />}
    </div>
  )
}