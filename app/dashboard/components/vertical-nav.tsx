import { LayoutDashboard, FileText, Blocks, PieChart, Palette, Settings } from 'lucide-react'
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function VerticalNav() {
  return (
    <TooltipProvider>
      <div className="flex w-[60px] flex-col items-center border-r bg-background py-4">
        <div className="flex flex-col items-center gap-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <LayoutDashboard className="h-5 w-5" />
                <span className="sr-only">Dashboard</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Dashboard</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <FileText className="h-5 w-5" />
                <span className="sr-only">Docs</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Documentation</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <Blocks className="h-5 w-5" />
                <span className="sr-only">Components</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Components</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <PieChart className="h-5 w-5" />
                <span className="sr-only">Charts</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Charts</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <Palette className="h-5 w-5" />
                <span className="sr-only">Themes</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Themes</TooltipContent>
          </Tooltip>
        </div>
        <div className="mt-auto">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  )
}