import { cn } from "@/lib/utils"
import { UserNav } from "@/components/dashboard/user-nav"
import { Sidebar } from "@/components/dashboard/sidebar"

export function DashboardShell({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center justify-end">
            <UserNav />
          </div>
        </header>
        <main className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex-1 space-y-4">
            <div className={cn("flex-1 space-y-4", className)}>
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}