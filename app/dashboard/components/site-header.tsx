import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Menu, Search } from 'lucide-react'
import Link from 'next/link'
import { Logo } from '@/app/dashboard/components/logo'
import AuthButtonServer from "@/app/auth-button-server";

export function SiteHeader() {
  return (
    <header className="bg-background sticky top-0 z-20">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-4 px-4">
        <div className="mr-7 flex items-center gap-3">
          <Sidebar />
          <Logo className="size-8" />
          <Link
            href="/"
            className="flex items-center gap-2 px-2 text-xl font-bold tracking-tighter"
          >
            Acme
          </Link>
        </div>
        <nav className="text-muted-foreground hover:[&_a]:text-foreground hidden items-center gap-6 text-sm font-medium md:flex [&_a]:transition-colors">
          <Link href="#">Women</Link>
          <Link href="#">Men</Link>
          <Link href="#">Kids</Link>
          <Link href="#">Accessories</Link>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <SearchBar className="hidden sm:block" />
          <AuthButtonServer />
        </div>
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
        placeholder="Search products..."
        className="h-8 rounded-lg pl-8 text-sm sm:w-[200px] md:w-[200px] lg:w-[200px]"
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
        <SheetContent
          side="left"
          className="flex w-full flex-col p-4 pt-12 md:w-3/4"
        >
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