"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard/shell"
import { DashboardHeader } from "@/components/dashboard/header"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Calendar, Users } from "lucide-react"
import { format } from "date-fns"
import { toast } from "sonner"
import Link from "next/link"

const projects = [
  {
    id: "1",
    name: "Website Redesign",
    description: "Redesign and implement the new company website",
    status: "In Progress",
    priority: "High",
    startDate: "2025-06-01",
    dueDate: "2025-06-15",
    team: "Frontend Team",
    progress: 65
  },
  {
    id: "2",
    name: "API Integration",
    description: "Integrate third-party APIs for enhanced functionality",
    status: "Planning",
    priority: "Medium",
    startDate: "2025-06-10",
    dueDate: "2025-07-01",
    team: "Backend Team",
    progress: 20
  }
]

const teams = [
  "Frontend Team",
  "Backend Team",
  "Marketing & Production",
  "Full-Stack Team"
]

const priorities = ["Low", "Medium", "High", "Urgent"]

export default function ProjectsPage() {
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    team: "",
    priority: "",
    dueDate: ""
  })

  const handleCreateProject = () => {
    if (!newProject.name || !newProject.team || !newProject.priority) {
      toast.error("Please fill in all required fields")
      return
    }
    
    toast.success(`Project "${newProject.name}" created successfully`)
    setNewProject({ name: "", description: "", team: "", priority: "", dueDate: "" })
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "in progress":
        return "bg-blue-500/10 text-blue-500"
      case "planning":
        return "bg-yellow-500/10 text-yellow-500"
      case "completed":
        return "bg-green-500/10 text-green-500"
      default:
        return "bg-gray-500/10 text-gray-500"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-500/10 text-red-500"
      case "medium":
        return "bg-yellow-500/10 text-yellow-500"
      case "low":
        return "bg-green-500/10 text-green-500"
      default:
        return "bg-gray-500/10 text-gray-500"
    }
  }

  return (
    <DashboardShell>
      <DashboardHeader 
        heading="Projects" 
        text="Manage your projects and track their progress."
      >
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
              <DialogDescription>
                Add a new project to your workspace.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Project Name</Label>
                <Input
                  id="name"
                  placeholder="Enter project name"
                  value={newProject.name}
                  onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Enter project description"
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="team">Assigned Team</Label>
                <Select
                  value={newProject.team}
                  onValueChange={(value) => setNewProject({ ...newProject, team: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select team" />
                  </SelectTrigger>
                  <SelectContent>
                    {teams.map((team) => (
                      <SelectItem key={team} value={team}>
                        {team}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={newProject.priority}
                  onValueChange={(value) => setNewProject({ ...newProject, priority: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    {priorities.map((priority) => (
                      <SelectItem key={priority} value={priority}>
                        {priority}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={newProject.dueDate}
                  onChange={(e) => setNewProject({ ...newProject, dueDate: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleCreateProject}>Create Project</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DashboardHeader>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Team</TableHead>
              <TableHead>Timeline</TableHead>
              <TableHead>Progress</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell>
                  <Link href={`/projects/${project.id}`} className="hover:underline">
                    <div>
                      <p className="font-medium">{project.name}</p>
                      <p className="text-sm text-muted-foreground">{project.description}</p>
                    </div>
                  </Link>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getPriorityColor(project.priority)}>
                    {project.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{project.team}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>
                      {format(new Date(project.startDate), "MMM d")} - {format(new Date(project.dueDate), "MMM d, yyyy")}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>{project.progress}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </DashboardShell>
  )
}