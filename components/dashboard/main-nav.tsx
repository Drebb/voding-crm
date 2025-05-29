"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { CodeIcon } from "lucide-react"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <CodeIcon className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">
          Voding.dev
        </span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <Link
          href="/projects"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/projects" ? "text-foreground" : "text-foreground/60"
          )}
        >
          Projects
        </Link>
        <Link
          href="/teams"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/teams" ? "text-foreground" : "text-foreground/60"
          )}
        >
          Teams
        </Link>
        <Link
          href="/ideabank"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/ideabank" ? "text-foreground" : "text-foreground/60"
          )}
        >
          IdeaBank
        </Link>
        <Link
          href="/crm"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/crm" ? "text-foreground" : "text-foreground/60"
          )}
        >
          CRM
        </Link>
      </nav>
    </div>
  )
}