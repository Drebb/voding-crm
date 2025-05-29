import { DashboardShell } from "@/components/dashboard/shell"
import { DashboardHeader } from "@/components/dashboard/header"
import { Overview } from "@/components/dashboard/overview"

export default function Home() {
  return (
    <DashboardShell>
      <DashboardHeader 
        heading="Dashboard" 
        text="Welcome to Voding.dev - Your unified project management platform."
      />
      <Overview />
    </DashboardShell>
  )
}