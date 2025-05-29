"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard/shell"
import { DashboardHeader } from "@/components/dashboard/header"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, DollarSign, Users, Filter, Plus, Eye, Pencil, Trash2, Mail, Phone } from "lucide-react"
import { format } from "date-fns"
import { toast } from "sonner"
import Link from "next/link"

// Define the data arrays
const pipeline = [
  {
    id: "1",
    name: "Enterprise Website Redesign",
    company: "Tech Corp",
    value: 75000,
    probability: 80,
    expectedClose: "2025-03-15",
    owner: "Sarah Johnson",
    stage: "Proposal"
  },
  {
    id: "2",
    name: "Mobile App Development",
    company: "Innovate Inc",
    value: 120000,
    probability: 65,
    expectedClose: "2025-04-01",
    owner: "Michael Chen",
    stage: "Discovery"
  }
]

const contacts = [
  {
    id: "1",
    name: "John Smith",
    title: "CTO",
    company: "Tech Corp",
    email: "john.smith@techcorp.com",
    phone: "(555) 123-4567",
    status: "Active",
    lastContact: "2025-02-01"
  },
  {
    id: "2",
    name: "Emily Davis",
    title: "Marketing Director",
    company: "Innovate Inc",
    email: "emily.davis@innovate.com",
    phone: "(555) 987-6543",
    status: "New",
    lastContact: "2025-02-10"
  }
]

const leads = [
  {
    id: "1",
    name: "Robert Wilson",
    company: "Growth Solutions",
    email: "robert.wilson@growthsolutions.com",
    phone: "(555) 234-5678",
    status: "Qualified",
    source: "Website Contact",
    createdAt: "2025-01-15"
  },
  {
    id: "2",
    name: "Lisa Anderson",
    company: "Digital Dynamics",
    email: "lisa.anderson@digitaldynamics.com",
    phone: "(555) 876-5432",
    status: "New",
    source: "LinkedIn",
    createdAt: "2025-02-05"
  }
]

const projects = [
  {
    id: "1",
    name: "Website Redesign",
    client: "Tech Corp",
    value: 75000,
    status: "In Progress",
    team: "5 members",
    startDate: "2025-01-01",
    dueDate: "2025-04-30",
    progress: 60
  },
  {
    id: "2",
    name: "Mobile App MVP",
    client: "Innovate Inc",
    value: 120000,
    status: "Planning",
    team: "4 members",
    startDate: "2025-02-15",
    dueDate: "2025-06-30",
    progress: 25
  }
]

export default function CRMPage() {
  const [activeTab, setActiveTab] = useState("pipeline")

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "in progress":
        return "bg-blue-500/10 text-blue-500"
      case "planning":
        return "bg-yellow-500/10 text-yellow-500"
      case "completed":
        return "bg-green-500/10 text-green-500"
      case "active":
        return "bg-green-500/10 text-green-500"
      case "new":
        return "bg-blue-500/10 text-blue-500"
      case "qualified":
        return "bg-purple-500/10 text-purple-500"
      default:
        return "bg-gray-500/10 text-gray-500"
    }
  }

  const getStageColor = (stage: string) => {
    switch (stage.toLowerCase()) {
      case "proposal":
        return "bg-purple-500/10 text-purple-500"
      case "discovery":
        return "bg-blue-500/10 text-blue-500"
      case "negotiation":
        return "bg-yellow-500/10 text-yellow-500"
      case "closed":
        return "bg-green-500/10 text-green-500"
      default:
        return "bg-gray-500/10 text-gray-500"
    }
  }

  const handleDeleteProject = (projectId: string) => {
    toast.success("Project deleted successfully")
  }

  return (
    <DashboardShell>
      <DashboardHeader 
        heading="CRM" 
        text="Manage your leads and sales pipeline."
      >
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Lead
        </Button>
      </DashboardHeader>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pipeline Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$195,000</div>
            <p className="text-xs text-muted-foreground">
              Across 2 leads
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Qualified Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              Ready for proposal
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Deal Size</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$97,500</div>
            <p className="text-xs text-muted-foreground">
              Per qualified lead
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Follow-ups Due</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              Scheduled this week
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
            <TabsTrigger value="leads">Leads</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
          </TabsList>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>

        <TabsContent value="pipeline" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pipeline.map((opportunity) => (
              <Card key={opportunity.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{opportunity.name}</CardTitle>
                    <Badge className={getStageColor(opportunity.stage)}>
                      {opportunity.stage}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium">{opportunity.company}</p>
                      <p className="text-2xl font-bold">${opportunity.value.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Probability</span>
                      <span className="font-medium">{opportunity.probability}%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Expected Close</span>
                      <span className="font-medium">{format(new Date(opportunity.expectedClose), "MMM d, yyyy")}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Owner</span>
                      <span className="font-medium">{opportunity.owner}</span>
                    </div>
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="contacts" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {contacts.map((contact) => (
              <Card key={contact.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{contact.name}</CardTitle>
                    <Badge className={getStatusColor(contact.status)}>
                      {contact.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium">{contact.title}</p>
                      <p className="text-sm text-muted-foreground">{contact.company}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{contact.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{contact.phone}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Last Contact</span>
                      <span className="font-medium">{format(new Date(contact.lastContact), "MMM d, yyyy")}</span>
                    </div>
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="leads" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {leads.map((lead) => (
              <Card key={lead.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{lead.name}</CardTitle>
                    <Badge className={getStatusColor(lead.status)}>
                      {lead.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium">{lead.company}</p>
                      <p className="text-sm text-muted-foreground">{lead.source}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{lead.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{lead.phone}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Created</span>
                      <span className="font-medium">{format(new Date(lead.createdAt), "MMM d, yyyy")}</span>
                    </div>
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="projects" className="mt-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Team</TableHead>
                  <TableHead>Timeline</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell>
                      <Link href={`/projects/${project.id}`} className="hover:underline">
                        <div>
                          <p className="font-medium">{project.name}</p>
                        </div>
                      </Link>
                    </TableCell>
                    <TableCell>{project.client}</TableCell>
                    <TableCell>${project.value.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(project.status)}>
                        {project.status}
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
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/projects/${project.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/projects/${project.id}/edit`}>
                            <Pencil className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteProject(project.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}