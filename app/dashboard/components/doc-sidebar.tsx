import { ChevronDown, ChevronRight, LayoutDashboard, Settings, Blocks, AlertCircle, Calendar, CreditCard, User, LogOut } from 'lucide-react'
import Link from "next/link"
import AuthButtonServer from "@/app/auth-button-server";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"

const components = [
  { name: "Accordion", href: "#" },
  { name: "Alert", href: "#" },
  { name: "Alert Dialog", href: "#" },
  { name: "Aspect Ratio", href: "#" },
  { name: "Avatar", href: "#" },
  { name: "Badge", href: "#" },
  { name: "Breadcrumb", href: "#" },
  { name: "Button", href: "#" },
  { name: "Calendar", href: "#" },
  { name: "Card", href: "#" },
  { name: "Carousel", href: "#" },
  { name: "Chart", href: "#" },
]

// Definir la interfaz para las propiedades del componente
interface DocSidebarProps {
  user: any;  // Usa un tipo más específico si tienes un tipo definido para `user`
}

export function DocSidebar({ user }: DocSidebarProps) {

  return (
    <Sidebar className="border-r">

      <SidebarHeader className="border-b p-4">
        <Link href="/" className="flex items-center space-x-2">
          <LayoutDashboard className="h-6 w-6" />
          <span className="font-bold">Gatsby</span>
        </Link>
      </SidebarHeader>

      <SidebarContent>

        <SidebarGroup>
          <SidebarGroupLabel>Manual</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="#">
                    <User className="mr-2 h-4 w-4" />
                    <span>{user.user_metadata.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <Collapsible defaultOpen>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex w-full items-center justify-between p-2">
                Components
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {components.map((component) => (
                    <SidebarMenuItem key={component.name}>
                      <SidebarMenuButton asChild>
                        <Link href={component.href}>{component.name}</Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>

      </SidebarContent>

      <SidebarGroup>
        <SidebarGroupContent className='border-t p-4'>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="#">
                  <LogOut className="mr-2 h-4 w-4" />
                  <AuthButtonServer />
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      
      <SidebarRail />
    </Sidebar>
  )
}