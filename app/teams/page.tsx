"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard/shell"
import { DashboardHeader } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Users, Code, Palette, Megaphone, Plus, Settings2, UserPlus, Trash2, Shield, Activity } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { format } from "date-fns"

const teams = [
  {
    name: "Backend Team",
    icon: <Code className="h-5 w-5 text-muted-foreground" />,
    lead: "Dreb",
    members: [
      { name: "Dreb", role: "Team Lead", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Kobe", role: "Full-Stack Engineer", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" }
    ],
    permissions: {
      canManageProjects: true,
      canInviteMembers: true,
      canViewAnalytics: true
    },
    activities: [
      { type: "member_added", user: "Dreb", target: "Kobe", timestamp: "2025-05-28T10:00:00Z" },
      { type: "permission_updated", user: "Ian", detail: "Updated project management permissions", timestamp: "2025-05-27T15:30:00Z" }
    ]
  },
  {
    name: "Frontend Team",
    icon: <Palette className="h-5 w-5 text-muted-foreground" />,
    lead: "Ralf",
    members: [
      { name: "Ralf", role: "Frontend Engineer", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Reuben", role: "Frontend Developer", image: "https://images.unsplash.com/photo-1502378735452-bc7d86632805?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" }
    ],
    permissions: {
      canManageProjects: true,
      canInviteMembers: false,
      canViewAnalytics: true
    },
    activities: [
      { type: "member_added", user: "Ralf", target: "Reuben", timestamp: "2025-05-28T09:00:00Z" },
      { type: "permission_updated", user: "Ian", detail: "Granted analytics access", timestamp: "2025-05-26T11:20:00Z" }
    ]
  },
  {
    name: "Marketing & Production",
    icon: <Megaphone className="h-5 w-5 text-muted-foreground" />,
    lead: "Ian",
    members: [
      { name: "Ian", role: "CEO", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Alexis", role: "Creative Lead", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Reuben", role: "Copy Marketing", image: "https://images.unsplash.com/photo-1502378735452-bc7d86632805?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" }
    ],
    permissions: {
      canManageProjects: true,
      canInviteMembers: true,
      canViewAnalytics: true
    },
    activities: [
      { type: "member_added", user: "Ian", target: "Alexis", timestamp: "2025-05-27T14:00:00Z" },
      { type: "permission_updated", user: "Ian", detail: "Enabled member invitations", timestamp: "2025-05-25T16:45:00Z" }
    ]
  }
]

const availableMembers = [
  { name: "Ian", role: "CEO", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
  { name: "Ysl Ron", role: "CTO", image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
  { name: "Alexis", role: "Creative Lead", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
  { name: "Dreb", role: "Backend Lead", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
  { name: "Kobe", role: "Full-Stack Engineer", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
  { name: "Ralf", role: "Frontend Engineer", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
  { name: "Reuben", role: "Frontend Developer", image: "https://images.unsplash.com/photo-1502378735452-bc7d86632805?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" }
]

export default function TeamsPage() {
  const [selectedTeam, setSelectedTeam] = useState(null)
  const [newTeamData, setNewTeamData] = useState({ name: "", lead: "" })
  const [newMemberData, setNewMemberData] = useState({ name: "", role: "" })
  const [editTeamData, setEditTeamData] = useState({ name: "", lead: "" })
  const [showNewTeamDialog, setShowNewTeamDialog] = useState(false)
  const [showAddMemberDialog, setShowAddMemberDialog] = useState(false)
  const [showEditTeamDialog, setShowEditTeamDialog] = useState(false)
  const [showPermissionsDialog, setShowPermissionsDialog] = useState(false)
  const [selectedTeamPermissions, setSelectedTeamPermissions] = useState({
    canManageProjects: false,
    canInviteMembers: false,
    canViewAnalytics: false
  })

  const handleCreateTeam = () => {
    if (!newTeamData.name || !newTeamData.lead) {
      toast.error("Please fill in all required fields")
      return
    }
    
    // In a real app, this would be an API call
    toast.success(`Team "${newTeamData.name}" created successfully`)
    setNewTeamData({ name: "", lead: "" })
    setShowNewTeamDialog(false)
  }

  const handleAddMember = (teamName: string) => {
    if (!newMemberData.name || !newMemberData.role) {
      toast.error("Please fill in all required fields")
      return
    }

    // In a real app, this would be an API call
    toast.success(`Member added to ${teamName}`)
    setNewMemberData({ name: "", role: "" })
    setShowAddMemberDialog(false)
  }

  const handleEditTeam = (teamName: string) => {
    if (!editTeamData.name || !editTeamData.lead) {
      toast.error("Please fill in all required fields")
      return
    }

    // In a real app, this would be an API call
    toast.success(`Team "${teamName}" updated successfully`)
    setEditTeamData({ name: "", lead: "" })
    setShowEditTeamDialog(false)
  }

  const handleDeleteTeam = (teamName: string) => {
    // In a real app, this would be an API call
    toast.success(`Team "${teamName}" deleted successfully`)
    setShowEditTeamDialog(false)
  }

  const handleRemoveMember = (teamName: string, memberName: string) => {
    // In a real app, this would be an API call
    toast.success(`${memberName} removed from ${teamName}`)
  }

  const handleUpdatePermissions = (teamName: string) => {
    // In a real app, this would be an API call
    toast.success(`Permissions updated for ${teamName}`)
    setShowPermissionsDialog(false)
  }

  const formatActivityMessage = (activity: any) => {
    switch (activity.type) {
      case 'member_added':
        return `${activity.user} added ${activity.target} to the team`
      case 'permission_updated':
        return `${activity.user} ${activity.detail}`
      default:
        return ''
    }
  }

  return (
    <DashboardShell>
      <DashboardHeader 
        heading="Teams" 
        text="Manage your teams and team members."
      >
        <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Team
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Team</DialogTitle>
              <DialogDescription>
                Add a new team to your organization.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Team Name</Label>
                <Input 
                  id="name" 
                  placeholder="Enter team name"
                  value={newTeamData.name}
                  onChange={(e) => setNewTeamData({ ...newTeamData, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lead">Team Lead</Label>
                <Select 
                  value={newTeamData.lead}
                  onValueChange={(value) => setNewTeamData({ ...newTeamData, lead: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select team lead" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableMembers.map((member) => (
                      <SelectItem key={member.name} value={member.name}>
                        {member.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleCreateTeam}>Create Team</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DashboardHeader>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {teams.map((team) => (
          <Card key={team.name} className="hover:bg-muted/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {team.name}
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Dialog open={showAddMemberDialog} onOpenChange={setShowAddMemberDialog}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <UserPlus className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Team Member</DialogTitle>
                      <DialogDescription>
                        Add a new member to {team.name}.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="member">Select Member</Label>
                        <Select
                          value={newMemberData.name}
                          onValueChange={(value) => setNewMemberData({ ...newMemberData, name: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a member" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableMembers
                              .filter(m => !team.members.find(tm => tm.name === m.name))
                              .map((member) => (
                                <SelectItem key={member.name} value={member.name}>
                                  {member.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="role">Role</Label>
                        <Input 
                          id="role" 
                          placeholder="Enter role"
                          value={newMemberData.role}
                          onChange={(e) => setNewMemberData({ ...newMemberData, role: e.target.value })}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={() => handleAddMember(team.name)}>Add Member</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Shield className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Team Permissions</DialogTitle>
                      <DialogDescription>
                        Manage permissions for {team.name}.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="manage-projects">Manage Projects</Label>
                        <Switch
                          id="manage-projects"
                          checked={team.permissions.canManageProjects}
                          onCheckedChange={(checked) => 
                            setSelectedTeamPermissions(prev => ({
                              ...prev,
                              canManageProjects: checked
                            }))
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="invite-members">Invite Members</Label>
                        <Switch
                          id="invite-members"
                          checked={team.permissions.canInviteMembers}
                          onCheckedChange={(checked) => 
                            setSelectedTeamPermissions(prev => ({
                              ...prev,
                              canInviteMembers: checked
                            }))
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="view-analytics">View Analytics</Label>
                        <Switch
                          id="view-analytics"
                          checked={team.permissions.canViewAnalytics}
                          onCheckedChange={(checked) => 
                            setSelectedTeamPermissions(prev => ({
                              ...prev,
                              canViewAnalytics: checked
                            }))
                          }
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={() => handleUpdatePermissions(team.name)}>
                        Save Permissions
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Dialog open={showEditTeamDialog} onOpenChange={setShowEditTeamDialog}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Settings2 className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Team</DialogTitle>
                      <DialogDescription>
                        Make changes to {team.name}.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Team Name</Label>
                        <Input 
                          id="name" 
                          defaultValue={team.name}
                          value={editTeamData.name}
                          onChange={(e) => setEditTeamData({ ...editTeamData, name: e.target.value })}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="lead">Team Lead</Label>
                        <Select 
                          defaultValue={team.lead}
                          value={editTeamData.lead}
                          onValueChange={(value) => setEditTeamData({ ...editTeamData, lead: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {team.members.map((member) => (
                              <SelectItem key={member.name} value={member.name}>
                                {member.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button 
                        variant="destructive" 
                        className="mr-auto"
                        onClick={() => handleDeleteTeam(team.name)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Team
                      </Button>
                      <Button onClick={() => handleEditTeam(team.name)}>Save Changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {team.members.length} members
                  </span>
                </div>
                <div className="space-y-3">
                  {team.members.map((member) => (
                    <div key={member.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={member.image} alt={member.name} />
                          <AvatarFallback>{member.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium leading-none">{member.name}</p>
                          <p className="text-xs text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                      {member.name !== team.lead && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs"
                          onClick={() => handleRemoveMember(team.name, member.name)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Activity className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Recent Activity</span>
                  </div>
                  <ScrollArea className="h-[100px]">
                    {team.activities.map((activity, index) => (
                      <div key={index} className="text-sm text-muted-foreground py-1">
                        {formatActivityMessage(activity)}
                        <span className="block text-xs">
                          {format(new Date(activity.timestamp), 'MMM d, yyyy')}
                        </span>
                      </div>
                    ))}
                  </ScrollArea>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardShell>
  )
}