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
            <div className="w-[700px] flex-shrink-0">
              {/* Main Header */}
              <div className="bg-blue-100 text-blue-900 px-4 py-3 rounded-t-lg font-medium text-sm">
                Decision taken by AI
              </div>

              {/* Sub-columns */}
              <div className="grid grid-cols-2 gap-4 bg-gray-100 p-2">
                {/* AI Executed Column */}
                <div className="bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-200">
                    <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-900">
                      AI Executed
                    </span>
                    <Badge className="ml-auto bg-gray-300 text-gray-700 text-xs px-2 py-0.5">
                      4
                    </Badge>
                  </div>
                  <div
                    className="p-3 space-y-3 min-h-[500px]"
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, "ai-executed")}
                  >
                    {[
                      {
                        id: 1,
                        title: "Customer inquiry auto-response",
                        agent: "Support Agent",
                        time: "2min ago",
                        priority: "High",
                      },
                      {
                        id: 2,
                        title: "Lead qualification completed",
                        agent: "Sales Agent",
                        time: "5min ago",
                        priority: "Medium",
                      },
                      {
                        id: 3,
                        title: "Invoice processing automated",
                        agent: "Finance Agent",
                        time: "8min ago",
                        priority: "Low",
                      },
                      {
                        id: 4,
                        title: "Email campaign sent",
                        agent: "Marketing Agent",
                        time: "12min ago",
                        priority: "Medium",
                      },
                    ].map((item) => (
                      <Card
                        key={item.id}
                        className="p-3 bg-white border border-gray-200 cursor-move hover:shadow-md transition-shadow rounded-md"
                        draggable
                        onDragStart={(e) =>
                          handleDragStart(e, item, "ai-executed")
                        }
                      >
                        <div className="space-y-2">
                          <div className="flex items-start justify-between">
                            <h4 className="text-sm font-medium text-gray-900">
                              {item.title}
                            </h4>
                            <Badge
                              className={`text-xs px-2 py-0.5 ${
                                item.priority === "Critical"
                                  ? "bg-red-200 text-red-900"
                                  : item.priority === "High"
                                    ? "bg-red-100 text-red-700"
                                    : item.priority === "Medium"
                                      ? "bg-yellow-100 text-yellow-700"
                                      : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {item.priority}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between text-xs text-gray-600">
                            <span>{item.agent}</span>
                            <span>{item.time}</span>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Execution failed Column */}
                <div className="bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-200">
                    <div className="w-1 h-4 bg-red-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-900">
                      Execution failed / aborted
                    </span>
                    <Badge className="ml-auto bg-gray-300 text-gray-700 text-xs px-2 py-0.5">
                      3
                    </Badge>
                  </div>
                  <div
                    className="p-3 space-y-3 min-h-[500px]"
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, "ai-failed")}
                  >
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
                        title: "Payment processing failed",
                        agent: "Payment Agent",
                        time: "25 min ago",
                        error: "Auth failed",
                      },
                      {
                        id: 3,
                        title: "Email delivery bounced",
                        agent: "Email Agent",
                        time: "1 hour ago",
                        error: "Invalid email",
                      },
                    ].map((item) => (
                      <Card
                        key={item.id}
                        className="p-3 bg-white border border-gray-200 cursor-move hover:shadow-md transition-shadow rounded-md"
                        draggable
                        onDragStart={(e) =>
                          handleDragStart(e, item, "ai-failed")
                        }
                      >
                        <div className="space-y-2">
                          <div className="flex items-start justify-between">
                            <h4 className="text-sm font-medium text-gray-900">
                              {item.title}
                            </h4>
                            <Badge className="bg-red-100 text-red-700 text-xs px-2 py-0.5">
                              {item.error}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between text-xs text-gray-600">
                            <span>{item.agent}</span>
                            <span>{item.time}</span>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Decisions pending on Humans */}
            <div className="w-[450px] flex-shrink-0">
              {/* Main Header */}
              <div className="bg-orange-100 text-orange-900 px-4 py-3 rounded-t-lg font-medium text-sm">
                Decisions pending on Humans
              </div>

              {/* Sub-column */}
              <div className="bg-gray-100 p-2">
                <div className="bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-200">
                    <div className="w-1 h-4 bg-orange-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-900">
                      Awaiting Human Approval
                    </span>
                    <Badge className="ml-auto bg-gray-300 text-gray-700 text-xs px-2 py-0.5">
                      4
                    </Badge>
                  </div>
                  <div
                    className="p-3 space-y-3 min-h-[500px]"
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, "awaiting-approval")}
                  >
                    {[
                      {
                        id: 1,
                        title: "High-value contract negotiation",
                        agent: "Sales Agent",
                        time: "5 min ago",
                        priority: "High",
                        value: "$50,000",
                      },
                      {
                        id: 2,
                        title: "Employee termination process",
                        agent: "HR Agent",
                        time: "15 min ago",
                        priority: "Critical",
                        value: "Sensitive",
                      },
                      {
                        id: 3,
                        title: "Large expense approval",
                        agent: "Finance Agent",
                        time: "30 min ago",
                        priority: "High",
                        value: "$25,000",
                      },
                      {
                        id: 4,
                        title: "Legal document review",
                        agent: "Legal Agent",
                        time: "45 min ago",
                        priority: "Medium",
                        value: "Contract",
                      },
                    ].map((item) => (
                      <Card
                        key={item.id}
                        className="p-3 bg-white border border-gray-200 cursor-move hover:shadow-md transition-shadow rounded-md"
                        draggable
                        onDragStart={(e) =>
                          handleDragStart(e, item, "awaiting-approval")
                        }
                      >
                        <div className="space-y-2">
                          <div className="flex items-start justify-between">
                            <h4 className="text-sm font-medium text-gray-900">
                              {item.title}
                            </h4>
                            <Badge className="bg-red-100 text-red-700 text-xs px-2 py-0.5">
                              {item.priority}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between text-xs text-gray-600">
                            <span>{item.agent}</span>
                            <span className="font-medium">{item.value}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">
                              {item.time}
                            </span>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-6 px-2 text-xs"
                            >
                              View Details
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Decision taken by Humans */}
            <div className="w-[1050px] flex-shrink-0">
              {/* Main Header */}
              <div className="bg-green-100 text-green-900 px-4 py-3 rounded-t-lg font-medium text-sm">
                Decision taken by Humans
              </div>

              {/* Sub-columns */}
              <div className="grid grid-cols-3 gap-4 bg-gray-100 p-2">
                {/* Human Approved / AI Executed */}
                <div className="bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-200">
                    <div className="w-1 h-4 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-900">
                      Human Approved / AI Executed
                    </span>
                    <Badge className="ml-auto bg-gray-300 text-gray-700 text-xs px-2 py-0.5">
                      4
                    </Badge>
                  </div>
                  <div
                    className="p-3 space-y-3 min-h-[500px]"
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, "human-approved")}
                  >
                    {[
                      {
                        id: 1,
                        title: "Enterprise software purchase",
                        approver: "John Doe",
                        time: "1 hour ago",
                        value: "$75,000",
                        status: "Executed",
                      },
                      {
                        id: 2,
                        title: "Marketing campaign launch",
                        approver: "Sarah Wilson",
                        time: "2 hours ago",
                        value: "$15,000",
                        status: "In Progress",
                      },
                      {
                        id: 3,
                        title: "New hire onboarding",
                        approver: "Emily Chen",
                        time: "3 hours ago",
                        value: "HR Process",
                        status: "Completed",
                      },
                      {
                        id: 4,
                        title: "Vendor contract renewal",
                        approver: "Mike Johnson",
                        time: "4 hours ago",
                        value: "$30,000",
                        status: "Pending",
                      },
                    ].map((item) => (
                      <Card
                        key={item.id}
                        className="p-3 bg-white border border-gray-200 cursor-move hover:shadow-md transition-shadow rounded-md"
                        draggable
                        onDragStart={(e) =>
                          handleDragStart(e, item, "human-approved")
                        }
                      >
                        <div className="space-y-2">
                          <div className="flex items-start justify-between">
                            <h4 className="text-sm font-medium text-gray-900">
                              {item.title}
                            </h4>
                            <Badge
                              className={`text-xs px-2 py-0.5 ${
                                item.status === "Executed"
                                  ? "bg-green-100 text-green-700"
                                  : item.status === "Completed"
                                    ? "bg-blue-100 text-blue-700"
                                    : item.status === "In Progress"
                                      ? "bg-yellow-100 text-yellow-700"
                                      : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {item.status}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between text-xs text-gray-600">
                            <span>Approved by {item.approver}</span>
                            <span className="font-medium">{item.value}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">
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
                  </div>
                </div>

                {/* Human Rejected */}
                <div className="bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-200">
                    <div className="w-1 h-4 bg-red-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-900">
                      Human Rejected
                    </span>
                    <Badge className="ml-auto bg-gray-300 text-gray-700 text-xs px-2 py-0.5">
                      2
                    </Badge>
                  </div>
                  <div
                    className="p-3 space-y-3 min-h-[500px]"
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, "human-rejected")}
                  >
                    {[
                      {
                        id: 1,
                        title: "Social media post content",
                        rejector: "Mike Johnson",
                        time: "1 hour ago",
                        reason: "Policy violation",
                      },
                      {
                        id: 2,
                        title: "Aggressive pricing strategy",
                        rejector: "Sarah Wilson",
                        time: "3 hours ago",
                        reason: "Risk too high",
                      },
                    ].map((item) => (
                      <Card
                        key={item.id}
                        className="p-3 bg-white border border-gray-200 cursor-move hover:shadow-md transition-shadow rounded-md"
                        draggable
                        onDragStart={(e) =>
                          handleDragStart(e, item, "human-rejected")
                        }
                      >
                        <div className="space-y-2">
                          <div className="flex items-start justify-between">
                            <h4 className="text-sm font-medium text-gray-900">
                              {item.title}
                            </h4>
                            <Badge className="bg-red-100 text-red-700 text-xs px-2 py-0.5">
                              {item.reason}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between text-xs text-gray-600">
                            <span>Rejected by {item.rejector}</span>
                            <span>{item.time}</span>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Timeout/Expired */}
                <div className="bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-200">
                    <div className="w-1 h-4 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-900">
                      Timeout/Expired
                    </span>
                    <Badge className="ml-auto bg-gray-300 text-gray-700 text-xs px-2 py-0.5">
                      1
                    </Badge>
                  </div>
                  <div
                    className="p-3 space-y-3 min-h-[500px]"
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, "timeout-expired")}
                  >
                    {[
                      {
                        id: 1,
                        title: "Document review request",
                        time: "3 hours ago",
                        timeout: "2 hour timeout",
                        originalValue: "$12,000",
                      },
                    ].map((item) => (
                      <Card
                        key={item.id}
                        className="p-3 bg-white border border-gray-200 cursor-move hover:shadow-md transition-shadow rounded-md"
                        draggable
                        onDragStart={(e) =>
                          handleDragStart(e, item, "timeout-expired")
                        }
                      >
                        <div className="space-y-2">
                          <div className="flex items-start justify-between">
                            <h4 className="text-sm font-medium text-gray-900">
                              {item.title}
                            </h4>
                            <Badge className="bg-orange-100 text-orange-700 text-xs px-2 py-0.5">
                              Expired
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between text-xs text-gray-600">
                            <span>{item.timeout}</span>
                            <span className="font-medium">
                              {item.originalValue}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500">
                            {item.time}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collaboration;
