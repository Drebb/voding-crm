"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CodeIcon, Activity, Users, Lightbulb, UserCheck } from "lucide-react"

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
      <div className="flex h-full flex-col gap-2">
        <div className="flex h-[60px] items-center border-b px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <CodeIcon className="h-6 w-6" />
            <span>Voding.dev</span>
          </Link>
        </div>
        <ScrollArea className="flex-1 px-3">
          <div className="space-y-2 py-2">
            <Link href="/">
              <Button 
                variant={pathname === "/" ? "secondary" : "ghost"} 
                className="w-full justify-start gap-2"
              >
                <Activity className="h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <Link href="/projects">
              <Button 
                variant={pathname === "/projects" ? "secondary" : "ghost"} 
                className="w-full justify-start gap-2"
              >
                <Activity className="h-4 w-4" />
                Projects
              </Button>
            </Link>
            <Link href="/teams">
              <Button 
                variant={pathname === "/teams" ? "secondary" : "ghost"} 
                className="w-full justify-start gap-2"
              >
                <Users className="h-4 w-4" />
                Teams
              </Button>
            </Link>
            <Link href="/ideabank">
              <Button 
                variant={pathname === "/ideabank" ? "secondary" : "ghost"} 
                className="w-full justify-start gap-2"
              >
                <Lightbulb className="h-4 w-4" />
                IdeaBank
              </Button>
            </Link>
            <Link href="/crm">
              <Button 
                variant={pathname === "/crm" ? "secondary" : "ghost"} 
                className="w-full justify-start gap-2"
              >
                <UserCheck className="h-4 w-4" />
                CRM
              </Button>
            </Link>
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}