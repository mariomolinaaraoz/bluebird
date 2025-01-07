import { cn } from '@/lib/utils'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

import { Menu, Plus, Search } from 'lucide-react'

import AuthButtonServer from "@/app/auth-button-server";

export function SiteHeaderCopy() {
  return (
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
              <form className="mt-4 space-y-4">
                <Input placeholder="Title" />
                <Input placeholder="Description" />
                <Button type="submit" className="w-full">Submit</Button>
              </form>              
            </SheetContent>
          </Sheet>
          <AuthButtonServer />
        </nav>
      </div>
    </header>
  )
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