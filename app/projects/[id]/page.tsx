"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard/shell"
import { DashboardHeader } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ChevronLeft, Calendar, Users, Clock, Paperclip, Settings2, Link2, MessageSquare, FileText, CheckSquare, AlertCircle } from "lucide-react"
import { format } from "date-fns"
import { toast } from "sonner"
import Link from "next/link"

const projectDetails = {
  id: "1",
  name: "Website Redesign",
  description: "Redesign and implement the new company website with modern design principles and improved user experience.",
  status: "In Progress",
  priority: "High",
  startDate: "2025-06-01",
  dueDate: "2025-06-15",
  progress: 65,
  team: {
    name: "Frontend Team",
    lead: {
      name: "Ralf",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    members: [
      {
        name: "Ralf",
        role: "Frontend Engineer",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      },
      {
        name: "Reuben",
        role: "Frontend Developer",
        image: "https://images.unsplash.com/photo-1502378735452-bc7d86632805?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      }
    ]
  },
  features: [
    {
      id: "f1",
      title: "Responsive Design Implementation",
      description: "Ensure the website works seamlessly across all devices and screen sizes",
      status: "In Progress",
      priority: "High"
    },
    {
      id: "f2",
      title: "Performance Optimization",
      description: "Optimize loading times and overall performance metrics",
      status: "Todo",
      priority: "Medium"
    },
    {
      id: "f3",
      title: "Accessibility Compliance",
      description: "Implement WCAG 2.1 AA compliance standards",
      status: "Todo",
      priority: "High"
    }
  ],
  tasks: [
    {
      id: "t1",
      title: "Design System",
      status: "Done",
      assignee: "Ralf",
      startDate: "2025-06-01",
      endDate: "2025-06-05"
    },
    {
      id: "t2",
      title: "Homepage Layout",
      status: "In Progress",
      assignee: "Reuben",
      startDate: "2025-06-04",
      endDate: "2025-06-10"
    },
    {
      id: "t3",
      title: "Mobile Responsiveness",
      status: "Todo",
      assignee: "Alexis",
      startDate: "2025-06-08",
      endDate: "2025-06-15"
    }
  ],
  risks: [
    {
      id: "r1",
      title: "Technical Debt",
      description: "Legacy code integration might slow down development",
      severity: "Medium",
      mitigation: "Detailed code review and refactoring plan"
    },
    {
      id: "r2",
      title: "Resource Availability",
      description: "Team members might be pulled into other projects",
      severity: "High",
      mitigation: "Clear resource allocation and backup plans"
    }
  ],
  documents: [
    {
      id: "d1",
      name: "Project Brief.pdf",
      type: "PDF",
      uploadedBy: "Ian",
      uploadedAt: "2025-05-28T10:00:00Z"
    },
    {
      id: "d2",
      name: "Design Mockups.fig",
      type: "Figma",
      uploadedBy: "Ralf",
      uploadedAt: "2025-05-29T15:30:00Z"
    }
  ],
  updates: [
    {
      id: "u1",
      author: {
        name: "Ralf",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      },
      content: "Design system implementation is complete. Moving on to homepage layout.",
      timestamp: "2025-06-05T09:00:00Z"
    },
    {
      id: "u2",
      author: {
        name: "Reuben",
        image: "https://images.unsplash.com/photo-1502378735452-bc7d86632805?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      },
      content: "Started working on responsive layouts for the homepage.",
      timestamp: "2025-06-06T14:30:00Z"
    }
  ]
}

export default function ProjectDetailsPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <DashboardShell>
      <DashboardHeader 
        heading={projectDetails.name}
        text={projectDetails.description}
      >
        <div className="flex space-x-2">
          <Button variant="outline" asChild>
            <Link href="/projects">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Link>
          </Button>
          <Button variant="outline">
            <Settings2 className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </DashboardHeader>

      <div className="grid gap-4 md:grid-cols-7">
        <div className="col-span-5 space-y-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="risks">Risks</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="updates">Updates</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Project Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Status</span>
                        <Badge>{projectDetails.status}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Priority</span>
                        <Badge variant="outline">{projectDetails.priority}</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progress</span>
                          <span>{projectDetails.progress}%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-secondary">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{ width: `${projectDetails.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Start Date</p>
                          <p className="text-sm text-muted-foreground">
                            {format(new Date(projectDetails.startDate), "MMM d, yyyy")}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Due Date</p>
                          <p className="text-sm text-muted-foreground">
                            {format(new Date(projectDetails.dueDate), "MMM d, yyyy")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Team</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={projectDetails.team.lead.image} />
                          <AvatarFallback>{projectDetails.team.lead.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{projectDetails.team.lead.name}</p>
                          <p className="text-sm text-muted-foreground">Team Lead</p>
                        </div>
                      </div>
                    </div>
                    <Separator />
                    <div className="grid gap-4 md:grid-cols-2">
                      {projectDetails.team.members.map((member) => (
                        <div key={member.name} className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarImage src={member.image} />
                            <AvatarFallback>{member.name.slice(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{member.name}</p>
                            <p className="text-sm text-muted-foreground">{member.role}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="features" className="space-y-4">
              {projectDetails.features.map((feature) => (
                <Card key={feature.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                      <div className="flex space-x-2">
                        <Badge>{feature.status}</Badge>
                        <Badge variant="outline">{feature.priority}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="tasks" className="space-y-4">
              {projectDetails.tasks.map((task) => (
                <Card key={task.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{task.title}</CardTitle>
                      <Badge>{task.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{task.assignee}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {format(new Date(task.startDate), "MMM d")} - {format(new Date(task.endDate), "MMM d")}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="risks" className="space-y-4">
              {projectDetails.risks.map((risk) => (
                <Card key={risk.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{risk.title}</CardTitle>
                      <Badge variant="destructive">{risk.severity}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <p className="text-sm text-muted-foreground">{risk.description}</p>
                    </div>
                    <div className="space-y-2">
                      <Label>Mitigation Plan</Label>
                      <p className="text-sm text-muted-foreground">{risk.mitigation}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="documents" className="space-y-4">
              {projectDetails.documents.map((doc) => (
                <Card key={doc.id}>
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-4">
                      <FileText className="h-8 w-8 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{doc.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Uploaded by {doc.uploadedBy} on {format(new Date(doc.uploadedAt), "MMM d, yyyy")}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Link2 className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="updates" className="space-y-4">
              {projectDetails.updates.map((update) => (
                <Card key={update.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <Avatar>
                        <AvatarImage src={update.author.image} />
                        <AvatarFallback>{update.author.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">{update.author.name}</p>
                        <p className="text-sm text-muted-foreground">{update.content}</p>
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(update.timestamp), "MMM d, yyyy 'at' h:mm a")}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        <div className="col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full" variant="outline">
                <MessageSquare className="h-4 w-4 mr-2" />
                Add Update
              </Button>
              <Button className="w-full" variant="outline">
                <CheckSquare className="h-4 w-4 mr-2" />
                Add Task
              </Button>
              <Button className="w-full" variant="outline">
                <AlertCircle className="h-4 w-4 mr-2" />
                Report Issue
              </Button>
              <Button className="w-full" variant="outline">
                <Paperclip className="h-4 w-4 mr-2" />
                Upload Document
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Project Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" variant="ghost">
                <Link2 className="h-4 w-4 mr-2" />
                Design Files
              </Button>
              <Button className="w-full justify-start" variant="ghost">
                <Link2 className="h-4 w-4 mr-2" />
                Development Repository
              </Button>
              <Button className="w-full justify-start" variant="ghost">
                <Link2 className="h-4 w-4 mr-2" />
                Project Documentation
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  )
}