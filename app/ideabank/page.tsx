"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard/shell"
import { DashboardHeader } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Heart, ThumbsDown, MessageSquare, ThumbsUp, Filter, Plus, ArrowUp, MoreVertical, Sparkles, TrendingUp, User, FolderPlus, Lightbulb } from "lucide-react"
import { format, subDays } from "date-fns"
import { toast } from "sonner"

const statuses = [
  { value: "new", label: "New", color: "bg-blue-500/10 text-blue-500" },
  { value: "under-review", label: "Under Review", color: "bg-yellow-500/10 text-yellow-500" },
  { value: "planned", label: "Planned", color: "bg-purple-500/10 text-purple-500" },
  { value: "in-progress", label: "In Progress", color: "bg-green-500/10 text-green-500" },
  { value: "completed", label: "Completed", color: "bg-gray-500/10 text-gray-500" },
  { value: "archived", label: "Archived", color: "bg-red-500/10 text-red-500" }
]

const teams = [
  "Frontend Team",
  "Backend Team",
  "Marketing & Production",
  "Full-Stack Team"
]

const currentUser = {
  id: "1",
  name: "Ian",
  image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  role: "CEO"
}

const initialIdeas = [
  {
    id: "1",
    title: "AI-Powered Task Prioritization",
    description: "Implement machine learning to automatically prioritize tasks based on project deadlines, dependencies, and team capacity.",
    author: {
      id: "2",
      name: "Dreb",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    createdAt: "2025-05-28T10:00:00Z",
    upvotes: 15,
    status: "under-review",
    comments: [
      {
        id: "c1",
        author: {
          name: "Ian",
          image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        },
        content: "This could significantly improve our workflow efficiency.",
        createdAt: "2025-05-28T11:30:00Z"
      }
    ],
    hasUpvoted: false,
    views: 45
  },
  {
    id: "2",
    title: "Team Collaboration Analytics",
    description: "Add analytics dashboard to track team collaboration metrics, including response times, cross-team interactions, and contribution patterns.",
    author: {
      id: "1",
      name: "Ian",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    createdAt: "2025-05-27T15:00:00Z",
    upvotes: 12,
    status: "planned",
    comments: [
      {
        id: "c2",
        author: {
          name: "Alexis",
          image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        },
        content: "This would help identify bottlenecks in our processes.",
        createdAt: "2025-05-27T16:45:00Z"
      }
    ],
    hasUpvoted: false,
    views: 38
  }
]

export default function IdeaBankPage() {
  const [ideas, setIdeas] = useState(initialIdeas)
  const [activeTab, setActiveTab] = useState("all")
  const [showNewIdeaDialog, setShowNewIdeaDialog] = useState(false)
  const [showConvertDialog, setShowConvertDialog] = useState(false)
  const [selectedIdeaForConversion, setSelectedIdeaForConversion] = useState<string | null>(null)
  const [showReactionDialog, setShowReactionDialog] = useState(false)
  const [reactionType, setReactionType] = useState<"up" | "down" | null>(null)
  const [reactionComment, setReactionComment] = useState("")
  const [selectedIdeaForReaction, setSelectedIdeaForReaction] = useState<string | null>(null)
  const [newIdea, setNewIdea] = useState({
    title: "",
    description: ""
  })
  const [newProject, setNewProject] = useState({
    teams: [] as string[],
    priority: "Medium",
    dueDate: ""
  })
  const [newComment, setNewComment] = useState("")
  const [selectedIdea, setSelectedIdea] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("newest")

  const isAdmin = currentUser.role === "CEO" || currentUser.role === "CTO"

  const handleCreateIdea = () => {
    if (!newIdea.title || !newIdea.description) {
      toast.error("Please fill in all required fields")
      return
    }

    const idea = {
      id: (ideas.length + 1).toString(),
      ...newIdea,
      author: {
        id: currentUser.id,
        name: currentUser.name,
        image: currentUser.image
      },
      createdAt: new Date().toISOString(),
      upvotes: 0,
      status: "new",
      comments: [],
      hasUpvoted: false,
      views: 0
    }

    setIdeas([idea, ...ideas])
    setNewIdea({ title: "", description: "" })
    setShowNewIdeaDialog(false)
    toast.success("Idea submitted successfully")
  }

  const handleConvertToProject = (ideaId: string) => {
    setSelectedIdeaForConversion(ideaId)
    setShowConvertDialog(true)
  }

  const handleCreateProject = () => {
    if (newProject.teams.length === 0 || !newProject.dueDate) {
      toast.error("Please fill in all required fields")
      return
    }

    const idea = ideas.find(i => i.id === selectedIdeaForConversion)
    if (!idea) return

    setIdeas(ideas.map(i => 
      i.id === selectedIdeaForConversion 
        ? { ...i, status: "in-progress" }
        : i
    ))

    toast.success("Project created successfully")
    setShowConvertDialog(false)
    setSelectedIdeaForConversion(null)
    setNewProject({ teams: [], priority: "Medium", dueDate: "" })
  }

  const handleUpvote = (ideaId: string) => {
    setIdeas(ideas.map(idea =>
      idea.id === ideaId
        ? { 
            ...idea, 
            upvotes: idea.hasUpvoted ? idea.upvotes - 1 : idea.upvotes + 1,
            hasUpvoted: !idea.hasUpvoted
          }
        : idea
    ))
    toast.success(ideas.find(i => i.id === ideaId)?.hasUpvoted ? "Upvote removed" : "Upvoted!")
  }

  const handleDownvote = (ideaId: string) => {
    toast.success("Feedback recorded")
  }

  const handleAddComment = (ideaId: string) => {
    if (!newComment.trim()) {
      toast.error("Please enter a comment")
      return
    }

    setIdeas(ideas.map(idea =>
      idea.id === ideaId
        ? {
            ...idea,
            comments: [
              ...idea.comments,
              {
                id: `c${idea.comments.length + 1}`,
                author: {
                  name: currentUser.name,
                  image: currentUser.image
                },
                content: newComment,
                createdAt: new Date().toISOString()
              }
            ]
          }
        : idea
    ))
    setNewComment("")
    toast.success("Comment added")
  }

  const handleStatusChange = (ideaId: string, newStatus: string) => {
    setIdeas(ideas.map(idea =>
      idea.id === ideaId
        ? { ...idea, status: newStatus }
        : idea
    ))
    toast.success("Status updated")
  }

  const handleReactionClick = (ideaId: string, type: "up" | "down") => {
    setSelectedIdeaForReaction(ideaId)
    setReactionType(type)
    setShowReactionDialog(true)
  }

  const handleReactionSubmit = () => {
    if (!selectedIdeaForReaction || !reactionType) return

    if (reactionType === "up") {
      handleUpvote(selectedIdeaForReaction)
    } else {
      handleDownvote(selectedIdeaForReaction)
    }

    if (reactionComment) {
      handleAddComment(selectedIdeaForReaction)
    }

    setShowReactionDialog(false)
    setReactionComment("")
    setSelectedIdeaForReaction(null)
    setReactionType(null)
  }

  const getTrendingIdeas = () => {
    const oneWeekAgo = subDays(new Date(), 7)
    return ideas
      .filter(idea => new Date(idea.createdAt) >= oneWeekAgo)
      .sort((a, b) => {
        const scoreA = a.upvotes * 2 + a.comments.length * 3 + Math.floor(a.views / 10)
        const scoreB = b.upvotes * 2 + b.comments.length * 3 + Math.floor(b.views / 10)
        return scoreB - scoreA
      })
  }

  const getMyIdeas = () => {
    return ideas.filter(idea => idea.author.id === currentUser.id)
  }

  const getFilteredIdeas = (sourceIdeas: typeof ideas) => {
    return sourceIdeas
      .filter(idea => filterStatus === "all" || idea.status === filterStatus)
      .sort((a, b) => {
        switch (sortBy) {
          case "most-upvoted":
            return b.upvotes - a.upvotes
          case "most-commented":
            return b.comments.length - a.comments.length
          case "oldest":
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          default: // newest
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        }
      })
  }

  const renderIdeasList = (sourceIdeas: typeof ideas) => (
    <ScrollArea className="h-[calc(100vh-250px)]">
      <div className="space-y-4">
        {sourceIdeas.map((idea) => (
          <Card key={idea.id}>
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
              <div className="flex items-start space-x-4">
                <div className="flex flex-col items-center space-y-2">
                  <Button
                    variant={idea.hasUpvoted ? "secondary" : "ghost"}
                    size="icon"
                    className="flex flex-col items-center"
                    onClick={() => handleReactionClick(idea.id, "up")}
                  >
                    <Heart className={`h-4 w-4 ${idea.hasUpvoted ? "fill-primary text-primary" : ""}`} />
                    <span className="text-xs">{idea.upvotes}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="flex flex-col items-center"
                    onClick={() => handleReactionClick(idea.id, "down")}
                  >
                    <ThumbsDown className="h-4 w-4" />
                  </Button>
                </div>
                <div>
                  <CardTitle className="text-lg font-medium">
                    {idea.title}
                  </CardTitle>
                  <div className="flex items-center space-x-2 mt-1">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={idea.author.image} />
                      <AvatarFallback>{idea.author.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">
                      {idea.author.name} · {format(new Date(idea.createdAt), "MMM d, yyyy")}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {isAdmin && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center space-x-2"
                    onClick={() => handleConvertToProject(idea.id)}
                  >
                    <FolderPlus className="h-4 w-4" />
                    <span>Convert to Project</span>
                  </Button>
                )}
                <Select
                  value={idea.status}
                  onValueChange={(value) => handleStatusChange(idea.id, value)}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {idea.description}
                </p>
                <div className="flex items-center space-x-2">
                  <Badge 
                    variant="secondary"
                    className={statuses.find(s => s.value === idea.status)?.color}
                  >
                    {statuses.find(s => s.value === idea.status)?.label}
                  </Badge>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {idea.comments.length} comments
                    </span>
                  </div>
                  {selectedIdea === idea.id && (
                    <div className="space-y-4">
                      {idea.comments.map((comment) => (
                        <div key={comment.id} className="flex items-start space-x-4">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={comment.author.image} />
                            <AvatarFallback>{comment.author.name.slice(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium">{comment.author.name}</span>
                              <span className="text-xs text-muted-foreground">
                                {format(new Date(comment.createdAt), "MMM d, yyyy")}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">{comment.content}</p>
                          </div>
                        </div>
                      ))}
                      <div className="flex items-start space-x-4">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={currentUser.image} />
                          <AvatarFallback>{currentUser.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-2">
                          <Textarea
                            placeholder="Add a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                          />
                          <Button
                            size="sm"
                            onClick={() => handleAddComment(idea.id)}
                          >
                            Comment
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                  {selectedIdea !== idea.id && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedIdea(idea.id)}
                    >
                      Show Discussion
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  )

  return (
    <DashboardShell>
      <DashboardHeader 
        heading="IdeaBank" 
        text="Submit and discuss new ideas for the platform."
      >
        <Dialog open={showNewIdeaDialog} onOpenChange={setShowNewIdeaDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Idea
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Submit New Idea</DialogTitle>
              <DialogDescription>
                Share your idea with the team. Great ideas can become projects!
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter idea title"
                  value={newIdea.title}
                  onChange={(e) => setNewIdea({ ...newIdea, title: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your idea in detail"
                  value={newIdea.description}
                  onChange={(e) => setNewIdea({ ...newIdea, description: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleCreateIdea}>Submit Idea</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DashboardHeader>

      <Dialog open={showConvertDialog} onOpenChange={setShowConvertDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Convert to Project</DialogTitle>
            <DialogDescription>
              Convert this idea into a new project.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Assigned Teams</Label>
              <div className="space-y-2">
                {teams.map((team) => (
                  <div key={team} className="flex items-center space-x-2">
                    <Checkbox
                      id={team}
                      checked={newProject.teams.includes(team)}
                      onCheckedChange={(checked) => {
                        setNewProject(prev => ({
                          ...prev,
                          teams: checked
                            ? [...prev.teams, team]
                            : prev.teams.filter(t => t !== team)
                        }))
                      }}
                    />
                    <label
                      htmlFor={team}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {team}
                    </label>
                  </div>
                ))}
              </div>
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
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Urgent">Urgent</SelectItem>
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
            {newProject.teams.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {newProject.teams.map(team => (
                  <Badge key={team} variant="secondary">
                    {team}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button onClick={handleCreateProject}>Create Project</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showReactionDialog} onOpenChange={setShowReactionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {reactionType === "up" ? "I'm Down!" : "I'll Pass"}
            </DialogTitle>
            <DialogDescription>
              {reactionType === "up" 
                ? "Share why you support this idea" 
                : "Help us understand your concerns"
              }
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="reaction-comment">Your thoughts (optional)</Label>
              <Textarea
                id="reaction-comment"
                placeholder={reactionType === "up" 
                  ? "What makes you excited about this idea?" 
                  : "What concerns do you have about this idea?"
                }
                value={reactionComment}
                onChange={(e) => setReactionComment(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReactionDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleReactionSubmit}
              variant={reactionType === "up" ? "default" : "destructive"}
            >
              {reactionType === "up" ? "Confirm Support" : "Submit Feedback"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-4">
          <TabsList>
            <TabsTrigger value="all" className="flex items-center space-x-2">
              <Lightbulb className="h-4 w-4" />
              <span>All Ideas</span>
            </TabsTrigger>
            <TabsTrigger value="trending" className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>Trending</span>
            </TabsTrigger>
            <TabsTrigger value="my-ideas" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>My Ideas</span>
            </TabsTrigger>
          </TabsList>
          <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <Sparkles className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {statuses.map((status) => (
                  <SelectItem key={status.value} value={status.value}>{status.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="most-upvoted">Most Upvoted</SelectItem>
                <SelectItem value="most-commented">Most Discussed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <TabsContent value="all" className="space-y-4">
          {renderIdeasList(getFilteredIdeas(ideas))}
        </TabsContent>
        <TabsContent value="trending" className="space-y-4">
          {renderIdeasList(getFilteredIdeas(getTrendingIdeas()))}
        </TabsContent>
        <TabsContent value="my-ideas" className="space-y-4">
          {renderIdeasList(getFilteredIdeas(getMyIdeas()))}
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}