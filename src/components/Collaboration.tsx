import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users,
  Plus,
  MessageSquare,
  Share2,
  Clock,
  CheckCircle,
  AlertCircle,
  Settings,
  Mail,
  Search,
  Filter,
  Bot,
  User,
  Timer,
  X,
  AlertTriangle,
  GripVertical,
} from "lucide-react";

const Collaboration: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [draggedItem, setDraggedItem] = useState<any>(null);
  const [draggedFromColumn, setDraggedFromColumn] = useState<string>("");

  const teamMembers = [
    {
      id: 1,
      name: "John Doe",
      email: "john@company.com",
      role: "Admin",
      avatar: "/api/placeholder/32/32",
      status: "online",
      lastActive: "Now",
      agentsCreated: 8,
    },
    {
      id: 2,
      name: "Sarah Wilson",
      email: "sarah@company.com",
      role: "Developer",
      avatar: "/api/placeholder/32/32",
      status: "online",
      lastActive: "5 min ago",
      agentsCreated: 12,
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@company.com",
      role: "Viewer",
      avatar: "/api/placeholder/32/32",
      status: "offline",
      lastActive: "2 hours ago",
      agentsCreated: 3,
    },
    {
      id: 4,
      name: "Emily Chen",
      email: "emily@company.com",
      role: "Developer",
      avatar: "/api/placeholder/32/32",
      status: "away",
      lastActive: "30 min ago",
      agentsCreated: 15,
    },
  ];

  const sharedProjects = [
    {
      id: 1,
      name: "Customer Support Automation",
      description: "Multi-agent system for handling customer inquiries",
      collaborators: 4,
      lastModified: "2 hours ago",
      status: "active",
      owner: "Sarah Wilson",
    },
    {
      id: 2,
      name: "Sales Lead Qualification",
      description: "Agent pipeline for qualifying and routing sales leads",
      collaborators: 2,
      lastModified: "1 day ago",
      status: "review",
      owner: "John Doe",
    },
    {
      id: 3,
      name: "Content Generation Suite",
      description: "Collection of agents for various content creation tasks",
      collaborators: 3,
      lastModified: "3 days ago",
      status: "draft",
      owner: "Emily Chen",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      user: "Sarah Wilson",
      action: "updated",
      target: "Customer Support Agent",
      time: "10 minutes ago",
      type: "edit",
    },
    {
      id: 2,
      user: "John Doe",
      action: "shared",
      target: "Sales Pipeline Project",
      time: "1 hour ago",
      type: "share",
    },
    {
      id: 3,
      user: "Emily Chen",
      action: "commented on",
      target: "Content Generator v2",
      time: "2 hours ago",
      type: "comment",
    },
    {
      id: 4,
      user: "Mike Johnson",
      action: "deployed",
      target: "HR Assistant Agent",
      time: "4 hours ago",
      type: "deploy",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "away":
        return "bg-yellow-500";
      case "offline":
        return "bg-gray-400";
      default:
        return "bg-gray-400";
    }
  };

  const getProjectStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "review":
        return <Badge className="bg-yellow-100 text-yellow-800">Review</Badge>;
      case "draft":
        return <Badge className="bg-gray-100 text-gray-800">Draft</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleDragStart = (
    e: React.DragEvent,
    item: any,
    fromColumn: string,
  ) => {
    setDraggedItem(item);
    setDraggedFromColumn(fromColumn);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, toColumn: string) => {
    e.preventDefault();
    if (draggedItem && draggedFromColumn !== toColumn) {
      console.log(
        `Moving item from ${draggedFromColumn} to ${toColumn}:`,
        draggedItem,
      );
      // Here you would implement the actual logic to move the item between columns
    }
    setDraggedItem(null);
    setDraggedFromColumn("");
  };

  return (
    <div className="p-6 space-y-6 bg-background">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-heading">
            Collaboration
          </h1>
          <p className="text-muted-foreground">
            Work together on AI agents and share knowledge with your team
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search decisions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="executed">Executed</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Invite Member
          </Button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="space-y-6">
        <div className="overflow-x-auto">
          <div className="flex gap-6 min-w-max pb-4">
            {/* Decision taken by AI */}
            <div className="space-y-4 w-[600px] flex-shrink-0 bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-text-heading flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                Decision taken by AI
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {/* AI Executed Column */}
                <Card
                  className="min-h-[600px]"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, "ai-executed")}
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-green-600 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      AI Executed (8)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      {
                        id: 1,
                        title: "Customer inquiry auto-response",
                        agent: "Support Agent",
                        time: "2 min ago",
                        priority: "high",
                      },
                      {
                        id: 2,
                        title: "Lead qualification",
                        agent: "Sales Agent",
                        time: "5 min ago",
                        priority: "medium",
                      },
                      {
                        id: 3,
                        title: "Content generation finished",
                        agent: "Content Agent",
                        time: "12 min ago",
                        priority: "low",
                      },
                    ].map((item) => (
                      <Card
                        key={item.id}
                        className="p-3 bg-green-50 border-green-200 cursor-move hover:shadow-md transition-shadow"
                        draggable
                        onDragStart={(e) =>
                          handleDragStart(e, item, "ai-executed")
                        }
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <GripVertical className="h-3 w-3 text-gray-400" />
                              <h4 className="text-sm font-medium">
                                {item.title}
                              </h4>
                            </div>
                            <Badge
                              variant="outline"
                              className={`text-xs ${
                                item.priority === "high"
                                  ? "border-red-300 text-red-600"
                                  : item.priority === "medium"
                                    ? "border-yellow-300 text-yellow-600"
                                    : "border-gray-300 text-gray-600"
                              }`}
                            >
                              {item.priority}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>{item.agent}</span>
                            <span>{item.time}</span>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </CardContent>
                </Card>

                {/* Execution failed Column */}
                <Card
                  className="min-h-[600px]"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, "ai-failed")}
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-red-600 flex items-center gap-2">
                      <X className="h-4 w-4" />
                      Execution failed / aborted (3)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      {
                        id: 1,
                        title: "API rate limit exceeded",
                        agent: "Data Agent",
                        time: "15 min ago",
                        error: "Rate limit",
                      },
                      {
                        id: 2,
                        title: "Connection timeout",
                        agent: "Analytics Agent",
                        time: "1 hour ago",
                        error: "Timeout",
                      },
                    ].map((item) => (
                      <Card
                        key={item.id}
                        className="p-3 bg-red-50 border-red-200 cursor-move hover:shadow-md transition-shadow"
                        draggable
                        onDragStart={(e) =>
                          handleDragStart(e, item, "ai-failed")
                        }
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <GripVertical className="h-3 w-3 text-gray-400" />
                              <h4 className="text-sm font-medium">
                                {item.title}
                              </h4>
                            </div>
                            <Badge
                              variant="destructive"
                              className="text-xs whitespace-nowrap"
                            >
                              {item.error}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>{item.agent}</span>
                            <span>{item.time}</span>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Decisions pending on Humans */}
            <div className="space-y-4 w-[400px] flex-shrink-0 bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-text-heading flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                Decisions pending on Humans
              </h2>
              <div className="space-y-4">
                {/* Awaiting Human Approval */}
                <Card
                  className="min-h-[600px]"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, "awaiting-approval")}
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-yellow-600 flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Awaiting Human Approval (4)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      {
                        id: 1,
                        title: "High-value contract negotiation",
                        agent: "Sales Agent",
                        time: "5 min ago",
                        priority: "high",
                        value: "$50,000",
                      },
                      {
                        id: 2,
                        title: "Customer refund request",
                        agent: "Support Agent",
                        time: "15 min ago",
                        priority: "medium",
                        value: "$1,200",
                      },
                      {
                        id: 3,
                        title: "New vendor partnership",
                        agent: "Procurement Agent",
                        time: "1 hour ago",
                        priority: "low",
                        value: "Partnership",
                      },
                    ].map((item) => (
                      <Card
                        key={item.id}
                        className="p-3 bg-yellow-50 border-yellow-200 cursor-move hover:shadow-md transition-shadow"
                        draggable
                        onDragStart={(e) =>
                          handleDragStart(e, item, "awaiting-approval")
                        }
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <GripVertical className="h-3 w-3 text-gray-400" />
                              <h4 className="text-sm font-medium">
                                {item.title}
                              </h4>
                            </div>
                            <Badge
                              variant="outline"
                              className={`text-xs ${
                                item.priority === "high"
                                  ? "border-red-300 text-red-600"
                                  : item.priority === "medium"
                                    ? "border-yellow-300 text-yellow-600"
                                    : "border-gray-300 text-gray-600"
                              }`}
                            >
                              {item.priority}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>{item.agent}</span>
                            <span className="font-medium">{item.value}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">
                              {item.time}
                            </span>
                            <div className="flex gap-1">
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-6 px-2 text-xs"
                              >
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-6 px-2 text-xs"
                              >
                                Reject
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Decision taken by Humans */}
            <div className="space-y-4 w-[900px] flex-shrink-0 bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-text-heading flex items-center gap-2">
                <User className="h-5 w-5 text-blue-600" />
                Decision taken by Humans
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {/* Human Approved / AI Executed */}
                <Card
                  className="min-h-[600px]"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, "human-approved")}
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-green-600 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Human Approved / AI Executed (5)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      {
                        id: 1,
                        title: "Marketing campaign approval",
                        approver: "Sarah Wilson",
                        time: "30 min ago",
                      },
                      {
                        id: 2,
                        title: "Budget allocation decision required",
                        approver: "John Doe",
                        time: "2 hours ago",
                      },
                    ].map((item) => (
                      <Card
                        key={item.id}
                        className="p-3 bg-green-50 border-green-200 cursor-move hover:shadow-md transition-shadow"
                        draggable
                        onDragStart={(e) =>
                          handleDragStart(e, item, "human-approved")
                        }
                      >
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <GripVertical className="h-3 w-3 text-gray-400" />
                            <h4 className="text-sm font-medium">
                              {item.title}
                            </h4>
                          </div>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>Approved by {item.approver}</span>
                            <span>{item.time}</span>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </CardContent>
                </Card>

                {/* Human Rejected */}
                <Card
                  className="min-h-[600px]"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, "human-rejected")}
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-red-600 flex items-center gap-2">
                      <X className="h-4 w-4" />
                      Human Rejected (2)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      {
                        id: 1,
                        title: "Social media post content",
                        rejector: "Mike Johnson",
                        time: "1 hour ago",
                        reason: "Content policy",
                      },
                    ].map((item) => (
                      <Card
                        key={item.id}
                        className="p-3 bg-red-50 border-red-200 cursor-move hover:shadow-md transition-shadow"
                        draggable
                        onDragStart={(e) =>
                          handleDragStart(e, item, "human-rejected")
                        }
                      >
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <GripVertical className="h-3 w-3 text-gray-400" />
                            <h4 className="text-sm font-medium">
                              {item.title}
                            </h4>
                          </div>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>Rejected by {item.rejector}</span>
                            <Badge
                              variant="outline"
                              className="text-xs whitespace-nowrap"
                            >
                              {item.reason}
                            </Badge>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {item.time}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </CardContent>
                </Card>

                {/* Timeout/Expired */}
                <Card
                  className="min-h-[600px]"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, "timeout-expired")}
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-orange-600 flex items-center gap-2">
                      <Timer className="h-4 w-4" />
                      Timeout/Expired (1)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      {
                        id: 1,
                        title: "Document review request",
                        time: "3 hours ago",
                        timeout: "2 hour timeout",
                      },
                    ].map((item) => (
                      <Card
                        key={item.id}
                        className="p-3 bg-orange-50 border-orange-200 cursor-move hover:shadow-md transition-shadow"
                        draggable
                        onDragStart={(e) =>
                          handleDragStart(e, item, "timeout-expired")
                        }
                      >
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <GripVertical className="h-3 w-3 text-gray-400" />
                            <h4 className="text-sm font-medium">
                              {item.title}
                            </h4>
                          </div>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>{item.timeout}</span>
                            <span>{item.time}</span>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collaboration;
