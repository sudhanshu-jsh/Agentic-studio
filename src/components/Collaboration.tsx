import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bot,
  User,
  CheckCircle,
  GripVertical,
  Timer,
  Send,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  Plus,
  Check,
  Loader2,
} from "lucide-react";

export default function Collaboration() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [draggedItem, setDraggedItem] = useState<any>(null);
  const [draggedFromColumn, setDraggedFromColumn] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const [dragOverColumn, setDragOverColumn] = useState<string>("");

  // State for managing cards in different columns
  const [columnData, setColumnData] = useState({
    "ai-executed": [
      {
        id: 1,
        title: "Incident auto-classification P2",
        agent: "ITSM Incident Agent",
        time: "2min ago",
        priority: "High",
      },
      {
        id: 2,
        title: "Service request auto-approval",
        agent: "Service Request Agent",
        time: "5min ago",
        priority: "Medium",
      },
      {
        id: 3,
        title: "Knowledge article auto-creation",
        agent: "Knowledge Management Agent",
        time: "8min ago",
        priority: "Low",
      },
      {
        id: 4,
        title: "Change risk assessment completed",
        agent: "Change Management Agent",
        time: "12min ago",
        priority: "Medium",
      },
    ],
    "ai-failed": [
      {
        id: 5,
        title: "CMDB CI update failed",
        agent: "CMDB Agent",
        time: "15 min ago",
        error: "API timeout",
      },
      {
        id: 6,
        title: "Incident escalation blocked",
        agent: "Incident Management Agent",
        time: "25 min ago",
        error: "SLA missing",
      },
      {
        id: 7,
        title: "Asset discovery scan failed",
        agent: "Asset Management Agent",
        time: "1 hour ago",
        error: "Network Error",
      },
    ],
    "ai-pipeline": [
      {
        id: 19,
        title: "Auto-categorize incoming incidents",
        agent: "Incident Management Agent",
        taskType: "Classification",
        description:
          "Analyze new incident reports and automatically categorize by severity and type",
        status: "Queued",
        estimatedTime: "2min",
        priority: "High",
      },
      {
        id: 20,
        title: "Generate SLA breach alerts",
        agent: "SLA Management Agent",
        taskType: "Monitoring",
        description:
          "Monitor all active tickets and generate alerts for potential SLA breaches",
        status: "Scheduled",
        estimatedTime: "5min",
        priority: "Medium",
      },
      {
        id: 21,
        title: "Update CMDB from asset discovery",
        agent: "Asset Management Agent",
        taskType: "Data Sync",
        description:
          "Process network discovery results and update configuration management database",
        status: "Queued",
        estimatedTime: "10min",
        priority: "Low",
      },
      {
        id: 22,
        title: "Create knowledge articles from resolved incidents",
        agent: "Knowledge Management Agent",
        taskType: "Documentation",
        description:
          "Analyze recently resolved P2 incidents and generate knowledge base articles",
        status: "Queued",
        estimatedTime: "15min",
        priority: "Medium",
      },
      {
        id: 23,
        title: "Validate change request dependencies",
        agent: "Change Management Agent",
        taskType: "Validation",
        description:
          "Check all pending change requests for conflicts and dependency issues",
        status: "Processing",
        estimatedTime: "8min",
        priority: "High",
      },
    ],
    "awaiting-approval": [
      {
        id: 11,
        title: "SLA breach notification",
        agent: "SLA Management Agent",
        time: "45 min ago",
        priority: "High",
        value: "Customer Impact",
      },
      {
        id: 24,
        title: "VPN Connection Issues",
        agent: "Network Support Agent",
        time: "10 min ago",
        priority: "High",
        value: "User: Sarah",
        isVpnTask: true,
      },
      {
        id: 8,
        title: "Emergency change deployment",
        agent: "Change Management Agent",
        time: "5 min ago",
        priority: "Critical",
        value: "Production Impact",
      },
      {
        id: 9,
        title: "Major incident declaration",
        agent: "Incident Management Agent",
        time: "15 min ago",
        priority: "Critical",
        value: "P1 Incident",
      },
      {
        id: 10,
        title: "Service catalog item approval",
        agent: "Service Catalog Agent",
        time: "30 min ago",
        priority: "High",
        value: "$15,000",
      },
    ],
    "human-approved": [
      {
        id: 12,
        title: "Infrastructure change executed",
        approver: "IT Manager",
        time: "1 hour ago",
        value: "Server Upgrade",
        status: "Executed",
      },
      {
        id: 13,
        title: "Service restoration completed",
        approver: "Service Owner",
        time: "2 hours ago",
        value: "P2 Incident",
        status: "Completed",
      },
      {
        id: 14,
        title: "New service deployment",
        approver: "Change Advisory Board",
        time: "3 hours ago",
        value: "Production Release",
        status: "In Progress",
      },
      {
        id: 15,
        title: "Vendor contract renewal",
        approver: "Procurement Manager",
        time: "4 hours ago",
        value: "$50,000",
        status: "Pending",
      },
    ],
    "human-rejected": [
      {
        id: 16,
        title: "Unauthorized software installation",
        rejector: "Security Team",
        time: "1 hour ago",
        reason: "Security violation",
      },
      {
        id: 17,
        title: "High-risk change request",
        rejector: "Change Manager",
        time: "3 hours ago",
        reason: "Testing incomplete",
      },
    ],
    "timeout-expired": [
      {
        id: 18,
        title: "Change approval timeout",
        time: "3 hours ago",
        timeout: "4 hour SLA expired",
        originalValue: "Standard Change",
      },
    ],
  });

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

  // New state for chat functionality
  const [selectedTaskForChat, setSelectedTaskForChat] = useState(null);
  const [taskDescription, setTaskDescription] = useState("");
  const [conversations, setConversations] = useState({});
  const [expandedConversations, setExpandedConversations] = useState({});
  const [actionSteps, setActionSteps] = useState({});
  const [currentActionStep, setCurrentActionStep] = useState({});
  const [showAIPipelineConversation, setShowAIPipelineConversation] = useState(
    {},
  );
  const [vpnTaskDetails, setVpnTaskDetails] = useState({});
  const [showVpnDetails, setShowVpnDetails] = useState({});

  // Handle bot icon click for AI Pipeline
  const handleAIPipelineBotClick = (taskId) => {
    setShowAIPipelineConversation((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
    if (!showAIPipelineConversation[taskId]) {
      setSelectedTaskForChat(taskId);
    } else {
      setSelectedTaskForChat(null);
    }
  };

  // Handle bot icon click for human approval
  const handleBotIconClick = (taskId) => {
    if (selectedTaskForChat === taskId) {
      // Close the bot - this will show the VPN details box if available
      setSelectedTaskForChat(null);
    } else {
      // Open the bot
      setSelectedTaskForChat(taskId);
      // Reset VPN details visibility when opening chat
      setShowVpnDetails((prev) => ({
        ...prev,
        [taskId]: false,
      }));
    }
  };

  // Handle task description send for AI Pipeline
  const handleDescriptionSend = () => {
    if (!taskDescription.trim()) return;

    const taskId = selectedTaskForChat;
    const newConversation = {
      id: Date.now(),
      messages: [
        {
          type: "user",
          text: taskDescription,
          timestamp: new Date().toLocaleTimeString(),
        },
        {
          type: "bot",
          text: "on it",
          timestamp: new Date().toLocaleTimeString(),
        },
      ],
    };

    setConversations((prev) => ({
      ...prev,
      [taskId]: newConversation,
    }));

    setTaskDescription("");
    setSelectedTaskForChat(null);
  };

  // Handle human approval task message send
  const handleHumanApprovalMessageSend = () => {
    if (!taskDescription.trim()) return;

    const taskId = selectedTaskForChat;
    const task = columnData["awaiting-approval"].find((t) => t.id === taskId);

    // Check if this is the VPN task
    if (task && (task as any).isVpnTask) {
      handleVpnTaskFlow(taskId);
      return;
    }

    // For Manish scenario - create conversation and start action sequence
    const newConversation = {
      id: Date.now(),
      messages: [
        {
          type: "user",
          text: taskDescription,
          timestamp: new Date().toLocaleTimeString(),
        },
        {
          type: "bot",
          text: "On it!",
          timestamp: new Date().toLocaleTimeString(),
        },
      ],
    };

    setConversations((prev) => ({
      ...prev,
      [taskId]: newConversation,
    }));

    setTaskDescription("");
    // Don't close the chat yet - keep it open to show action steps
    // setSelectedTaskForChat(null);

    // Start action sequence
    startActionSequence(taskId.toString());
  };

  // Handle VPN task flow
  const handleVpnTaskFlow = (taskId) => {
    // Create initial conversation with user message
    const newConversation = {
      id: Date.now(),
      messages: [
        {
          type: "user",
          text: taskDescription,
          timestamp: new Date().toLocaleTimeString(),
        },
      ],
    };

    setConversations((prev) => ({
      ...prev,
      [taskId]: newConversation,
    }));

    setTaskDescription("");

    // Add "On it!" message after 1 second
    setTimeout(() => {
      setConversations((prev) => ({
        ...prev,
        [taskId]: {
          ...prev[taskId],
          messages: [
            ...prev[taskId].messages,
            {
              type: "bot",
              text: "On it!",
              timestamp: new Date().toLocaleTimeString(),
            },
          ],
        },
      }));

      // Start action sequence after showing "On it!"
      setTimeout(() => {
        startVpnActionSequence(taskId.toString());
      }, 500);
    }, 1000);
  };

  // VPN task action sequence
  const startVpnActionSequence = (taskId) => {
    const actions = [
      {
        text: "Invoked Teams MCP to send message to @Sarah",
        duration: 3000,
        icon: "loading",
      },
      { text: "Message sent", duration: 2000, icon: "check" },
      {
        text: "Gathering additional information",
        duration: 5000,
        icon: "loading",
      },
    ];

    let currentIndex = 0;

    const executeAction = () => {
      if (currentIndex < actions.length) {
        const action = actions[currentIndex];
        setCurrentActionStep((prev) => ({
          ...prev,
          [taskId]: action,
        }));

        setTimeout(() => {
          currentIndex++;
          if (currentIndex < actions.length) {
            executeAction();
          } else {
            // Show final bot message with details
            const detailsMessage = `Ticket has been updated. Here are additional details:\n• Device: Windows 11 (latest), home WiFi connection\n• Works from office network, issue isolated to home\n• ISP: Comcast (standard router)\n• Recent change: NortonPlus antivirus installed 2 days ago\n• Likely cause: Antivirus blocking VPN ports or NAT-T traversal issue\n• Recommended action: Configure firewall exception for VPN or temporarily disable to test`;

            setConversations((prev) => ({
              ...prev,
              [taskId]: {
                ...prev[taskId],
                messages: [
                  ...prev[taskId].messages,
                  {
                    type: "bot",
                    text: detailsMessage,
                    timestamp: new Date().toLocaleTimeString(),
                  },
                ],
              },
            }));

            // Store the details for showing in card
            setVpnTaskDetails((prev) => ({
              ...prev,
              [taskId]: detailsMessage,
            }));

            // Clear action steps
            setCurrentActionStep((prev) => ({
              ...prev,
              [taskId]: null,
            }));
          }
        }, action.duration);
      }
    };

    executeAction();
  };

  // Start action sequence for human approval tasks
  const startActionSequence = (taskId) => {
    const actions = [
      {
        text: "Invoked Teams MCP to send message to @manish.sharma",
        duration: 3000,
        icon: "loading",
      },
      { text: "Message sent", duration: 3000, icon: "check" },
      {
        text: "Waiting for @manish.sharma's reply",
        duration: 3000,
        icon: "loading",
      },
      { text: "Moving to AI pipeline", duration: 2000, icon: "loading" },
    ];

    let currentIndex = 0;

    const executeAction = () => {
      if (currentIndex < actions.length) {
        const action = actions[currentIndex];
        setCurrentActionStep((prev) => ({
          ...prev,
          [taskId]: action,
        }));

        setTimeout(() => {
          currentIndex++;
          if (currentIndex < actions.length) {
            executeAction();
          } else {
            // Clear action steps
            setCurrentActionStep((prev) => ({
              ...prev,
              [taskId]: null,
            }));

            // Close the chat
            setSelectedTaskForChat(null);

            // Move task to AI pipeline first
            moveTaskToAIPipeline(taskId.toString());

            // After 2 seconds, add "Status: waiting" message
            setTimeout(() => {
              setConversations((prev) => ({
                ...prev,
                [taskId]: {
                  ...prev[taskId],
                  messages: [
                    ...prev[taskId].messages,
                    {
                      type: "bot",
                      text: "Status: waiting",
                      timestamp: new Date().toLocaleTimeString(),
                    },
                  ],
                },
              }));
            }, 2000);
          }
        }, action.duration);
      }
    };

    executeAction();
  };

  // Move task from human approval to AI pipeline
  const moveTaskToAIPipeline = (taskId) => {
    const task = columnData["awaiting-approval"].find(
      (t) => t.id.toString() === taskId,
    );
    if (task) {
      const updatedTask = {
        ...task,
        hasConversation: true,
        conversationId: taskId,
        taskType: "Human Escalation",
        description:
          "Task escalated from human approval with conversation history",
        status: "Waiting",
        estimatedTime: "5min",
        showWaitingStatus: true,
        statusText: "Status: waiting for @manish.sharma's reply",
      };

      setColumnData((prev) => ({
        ...prev,
        "awaiting-approval": prev["awaiting-approval"].filter(
          (t: any) => t.id.toString() !== taskId,
        ),
        "ai-pipeline": [updatedTask, ...prev["ai-pipeline"]],
      }));

      // Don't auto-open the conversation - keep it hidden by default
      // User needs to click the bot icon to see it
    }
  };

  // Toggle conversation expansion
  const toggleConversation = (taskId) => {
    setExpandedConversations((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  const handleDragStart = (
    e: React.DragEvent,
    item: any,
    fromColumn: string,
  ) => {
    setDraggedItem(item);
    setDraggedFromColumn(fromColumn);
    setIsDragging(true);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", JSON.stringify({ item, fromColumn }));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDragEnter = (e: React.DragEvent, column: string) => {
    e.preventDefault();
    setDragOverColumn(column);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    // Only clear drag over if we're leaving the drop zone entirely
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setDragOverColumn("");
    }
  };

  const handleDrop = (e: React.DragEvent, toColumn: string) => {
    e.preventDefault();
    setDragOverColumn("");
    setIsDragging(false);

    if (draggedItem && draggedFromColumn !== toColumn) {
      // Remove item from source column
      const sourceItems = columnData[
        draggedFromColumn as keyof typeof columnData
      ].filter((item: any) => item.id !== draggedItem.id);

      // Add item to destination column
      const destinationItems = [
        ...columnData[toColumn as keyof typeof columnData],
        draggedItem,
      ];

      // Update state
      setColumnData((prev) => ({
        ...prev,
        [draggedFromColumn]: sourceItems,
        [toColumn]: destinationItems,
      }));

      console.log(
        `Successfully moved "${draggedItem.title}" from ${draggedFromColumn} to ${toColumn}`,
      );
    }
    setDraggedItem(null);
    setDraggedFromColumn("");
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setDragOverColumn("");
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
            {/* AI Pipeline - Updated to show conversation history */}
            <div className="w-[400px] flex-shrink-0 flex flex-col h-[calc(100vh-140px)]">
              {/* Main Header - Fixed */}
              <div className="bg-indigo-100 text-indigo-900 px-4 py-3 rounded-t-lg font-medium text-sm flex items-center gap-2 flex-shrink-0">
                <Bot className="h-4 w-4" />
                AI Pipeline
              </div>

              {/* Sub-column - Scrollable */}
              <div className="bg-gray-100 p-2 flex-1 overflow-hidden">
                <div className="bg-white rounded-lg border border-gray-200 h-full flex flex-col">
                  <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-200 flex-shrink-0">
                    <div className="w-1 h-4 bg-indigo-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-900">
                      Tasks to Perform
                    </span>
                    <Badge className="ml-auto bg-gray-300 text-gray-700 text-xs px-2 py-0.5">
                      {columnData["ai-pipeline"].length}
                    </Badge>
                  </div>
                  <div
                    className={`p-3 space-y-3 overflow-y-auto flex-1 transition-colors ${
                      dragOverColumn === "ai-pipeline"
                        ? "bg-indigo-50 border-2 border-indigo-300 border-dashed"
                        : ""
                    }`}
                    onDragOver={handleDragOver}
                    onDragEnter={(e) => handleDragEnter(e, "ai-pipeline")}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, "ai-pipeline")}
                  >
                    {columnData["ai-pipeline"].map((item) => (
                      <Card
                        key={item.id}
                        className={`p-3 space-y-2 cursor-grab hover:shadow-md transition-shadow ${
                          (item as any).showWaitingStatus
                            ? "bg-blue-50 border-blue-200"
                            : ""
                        }`}
                        draggable
                        onDragStart={(e) =>
                          handleDragStart(e, item, "ai-pipeline")
                        }
                      >
                        <div className="space-y-2">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                              <GripVertical className="h-4 w-4 text-gray-400 cursor-grab" />
                              <h4 className="text-sm font-medium text-gray-900">
                                {item.title}
                              </h4>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge
                                className={`text-xs px-2 py-0.5 whitespace-nowrap ${
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
                          </div>

                          <div className="text-xs text-gray-600">
                            {(item as any).description}
                          </div>

                          {/* Show conversation if exists and is expanded */}
                          {conversations[item.id] &&
                            showAIPipelineConversation[item.id] && (
                              <div className="space-y-2">
                                <div className="text-xs font-medium text-gray-700">
                                  Previous Conversation:
                                </div>
                                {conversations[item.id].messages.map(
                                  (msg, idx) => (
                                    <div
                                      key={idx}
                                      className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                                    >
                                      <div
                                        className={`max-w-[80%] p-2 rounded-lg text-xs ${
                                          msg.type === "user"
                                            ? "bg-blue-100 text-blue-900"
                                            : "bg-gray-100 text-gray-900"
                                        }`}
                                      >
                                        <p>{msg.text}</p>
                                        <span className="text-xs opacity-70">
                                          {msg.timestamp}
                                        </span>
                                      </div>
                                    </div>
                                  ),
                                )}
                              </div>
                            )}

                          {/* Task description input */}
                          {selectedTaskForChat === item.id &&
                            showAIPipelineConversation[item.id] && (
                              <div className="space-y-2">
                                <Textarea
                                  placeholder="Describe the task details..."
                                  value={taskDescription}
                                  onChange={(e) =>
                                    setTaskDescription(e.target.value)
                                  }
                                  className="text-xs"
                                  rows={3}
                                />
                                <div className="flex justify-end gap-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                      setSelectedTaskForChat(null);
                                      setShowAIPipelineConversation((prev) => ({
                                        ...prev,
                                        [item.id]: false,
                                      }));
                                    }}
                                    className="h-6 px-2 text-xs"
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    size="sm"
                                    onClick={handleDescriptionSend}
                                    className="h-6 px-2 text-xs"
                                  >
                                    <Send className="h-3 w-3 mr-1" />
                                    Send
                                  </Button>
                                </div>
                              </div>
                            )}

                          <div className="flex items-center justify-between">
                            {/* Status waiting tag for moved tasks */}
                            {(item as any).showWaitingStatus && (
                              <Badge className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5">
                                {(item as any).statusText || "Status: Waiting"}
                              </Badge>
                            )}
                            {!(item as any).showWaitingStatus && <div></div>}

                            <div
                              className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-indigo-200"
                              onClick={() => handleAIPipelineBotClick(item.id)}
                            >
                              <Bot className="h-3 w-3 text-indigo-600" />
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Decisions pending on Humans - Updated with bot functionality */}
            <div className="w-[500px] flex-shrink-0 flex flex-col h-[calc(100vh-140px)]">
              {/* Main Header - Fixed */}
              <div className="bg-orange-100 text-orange-900 px-4 py-3 rounded-t-lg font-medium text-sm flex-shrink-0">
                Decisions pending on Humans
              </div>

              {/* Sub-column - Scrollable */}
              <div className="bg-gray-100 p-2 flex-1 overflow-hidden">
                <div className="bg-white rounded-lg border border-gray-200 h-full flex flex-col">
                  <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-200 flex-shrink-0">
                    <div className="w-1 h-4 bg-orange-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-900">
                      Awaiting Human Approval
                    </span>
                    <Badge className="ml-auto bg-gray-300 text-gray-700 text-xs px-2 py-0.5">
                      {columnData["awaiting-approval"].length}
                    </Badge>
                  </div>
                  <div
                    className={`p-3 space-y-3 overflow-y-auto flex-1 transition-colors ${
                      dragOverColumn === "awaiting-approval"
                        ? "bg-orange-50 border-2 border-orange-300 border-dashed"
                        : ""
                    }`}
                    onDragOver={handleDragOver}
                    onDragEnter={(e) => handleDragEnter(e, "awaiting-approval")}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, "awaiting-approval")}
                  >
                    {columnData["awaiting-approval"].map((item) => (
                      <Card
                        key={item.id}
                        className={`p-3 bg-white transition-all rounded-md cursor-move hover:shadow-md ${
                          draggedItem?.id === item.id
                            ? "opacity-50 scale-95"
                            : ""
                        } ${
                          (item as any).hasConversation
                            ? "border-2 border-indigo-300 shadow-md"
                            : "border border-gray-200"
                        }`}
                        draggable
                        onDragStart={(e) =>
                          handleDragStart(e, item, "awaiting-approval")
                        }
                        onDragEnd={handleDragEnd}
                      >
                        <div className="space-y-2">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                              <GripVertical className="h-4 w-4 text-gray-400 cursor-grab" />
                              <h4 className="text-sm font-medium text-gray-900">
                                {item.title}
                              </h4>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge
                                className={`text-xs px-2 py-0.5 whitespace-nowrap ${
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
                          </div>

                          {/* Show conversation updated tag if task has conversation */}
                          {(item as any).hasConversation && (
                            <div
                              className="flex items-center gap-1 text-blue-600 cursor-pointer hover:text-blue-800"
                              onClick={() =>
                                toggleConversation((item as any).conversationId)
                              }
                            >
                              <Bot className="h-3 w-3" />
                              <span className="text-xs font-medium">
                                Conversation updated
                              </span>
                              {expandedConversations[
                                (item as any).conversationId
                              ] ? (
                                <ChevronUp className="h-3 w-3" />
                              ) : (
                                <ChevronDown className="h-3 w-3" />
                              )}
                            </div>
                          )}

                          {/* Show expanded conversation */}
                          {(item as any).hasConversation &&
                            expandedConversations[
                              (item as any).conversationId
                            ] &&
                            conversations[(item as any).conversationId] && (
                              <div className="bg-gray-50 p-2 rounded space-y-2">
                                <div className="text-xs font-medium text-gray-700 mb-2">
                                  Conversation History:
                                </div>
                                {conversations[
                                  (item as any).conversationId
                                ].messages.map((msg, idx) => (
                                  <div
                                    key={idx}
                                    className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                                  >
                                    <div
                                      className={`max-w-[80%] p-2 rounded-lg text-xs ${
                                        msg.type === "user"
                                          ? "bg-blue-100 text-blue-900"
                                          : "bg-white text-gray-900 border"
                                      }`}
                                    >
                                      <div className="flex items-center gap-1 mb-1">
                                        {msg.type === "user" ? (
                                          <User className="h-3 w-3" />
                                        ) : (
                                          <Bot className="h-3 w-3" />
                                        )}
                                        <span className="font-medium">
                                          {msg.type === "user"
                                            ? "You"
                                            : "AI Agent"}
                                        </span>
                                      </div>
                                      <p>{msg.text}</p>
                                      <span className="text-xs opacity-70">
                                        {msg.timestamp}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}

                          {/* Conversation history - only show when bot is open */}
                          {selectedTaskForChat === item.id &&
                            conversations[item.id] && (
                              <div className="space-y-2 mb-2 mt-2">
                                {conversations[item.id].messages.map(
                                  (msg, idx) => (
                                    <div
                                      key={idx}
                                      className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                                    >
                                      <div
                                        className={`max-w-[80%] p-2 rounded-lg text-xs ${
                                          msg.type === "user"
                                            ? "bg-blue-100 text-blue-900"
                                            : "bg-gray-100 text-gray-900"
                                        }`}
                                      >
                                        <div className="font-medium mb-1">
                                          {msg.type === "user"
                                            ? "You"
                                            : "AI Agent"}
                                        </div>
                                        <div className="whitespace-pre-line">
                                          {msg.text}
                                        </div>
                                        <div className="text-gray-500 mt-1">
                                          {msg.timestamp}
                                        </div>
                                      </div>
                                    </div>
                                  ),
                                )}
                              </div>
                            )}

                          {/* Show VPN details box when bot is closed and details are available */}
                          {(item as any).isVpnTask &&
                            vpnTaskDetails[item.id] &&
                            selectedTaskForChat !== item.id && (
                              <div className="bg-blue-50 border border-blue-200 rounded p-3 space-y-2 mt-2">
                                <div className="text-xs font-semibold text-blue-900">
                                  Updated ticket details
                                </div>
                                <div className="text-xs text-gray-700 space-y-1.5">
                                  {vpnTaskDetails[item.id]
                                    .split("\n")
                                    .slice(1)
                                    .map((line, idx) => {
                                      // Remove bullet if it already exists in the line
                                      const cleanLine = line.replace(
                                        /^•\s*/,
                                        "",
                                      );
                                      const colonIndex = cleanLine.indexOf(":");
                                      const label =
                                        colonIndex > 0
                                          ? cleanLine.substring(
                                              0,
                                              colonIndex + 1,
                                            )
                                          : "";
                                      const value =
                                        colonIndex > 0
                                          ? cleanLine.substring(colonIndex + 1)
                                          : cleanLine;

                                      return (
                                        <div
                                          key={idx}
                                          className="flex items-start gap-2"
                                        >
                                          <span className="text-blue-600 mt-0.5">
                                            •
                                          </span>
                                          <span>
                                            {label && (
                                              <span className="font-semibold">
                                                {label}
                                              </span>
                                            )}
                                            {value}
                                          </span>
                                        </div>
                                      );
                                    })}
                                </div>
                              </div>
                            )}

                          {/* Show current action step */}
                          {currentActionStep[item.id] && (
                            <div className="flex items-center gap-2 text-xs text-gray-700 bg-blue-50 p-2 rounded mt-2">
                              {currentActionStep[item.id].icon === "loading" ? (
                                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                              ) : (
                                <Check className="h-3 w-3 text-green-600" />
                              )}
                              <span>{currentActionStep[item.id].text}</span>
                            </div>
                          )}

                          {/* Task description input */}
                          {selectedTaskForChat === item.id && (
                            <div className="space-y-2">
                              <Textarea
                                placeholder="How can I help you with this ticket?"
                                value={taskDescription}
                                onChange={(e) =>
                                  setTaskDescription(e.target.value)
                                }
                                className="text-xs"
                                rows={3}
                              />
                              <div className="flex justify-end gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => setSelectedTaskForChat(null)}
                                  className="h-6 px-2 text-xs"
                                >
                                  Cancel
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={handleHumanApprovalMessageSend}
                                  className="h-6 px-2 text-xs"
                                >
                                  <Send className="h-3 w-3 mr-1" />
                                  Send
                                </Button>
                              </div>
                            </div>
                          )}

                          <div className="flex items-center justify-between text-xs text-gray-600">
                            <span>{item.agent}</span>
                            <span className="font-medium">
                              {(item as any).value}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">
                              {item.time}
                            </span>
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-6 px-2 text-xs"
                              >
                                View Details
                              </Button>
                              <div
                                className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-indigo-200"
                                onClick={() => handleBotIconClick(item.id)}
                              >
                                <Bot className="h-3 w-3 text-indigo-600" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Decision taken by AI - Moved to third position */}
            <div className="w-[800px] flex-shrink-0 flex flex-col h-[calc(100vh-140px)]">
              {/* Main Header - Fixed */}
              <div className="bg-blue-100 text-blue-900 px-4 py-3 rounded-t-lg font-medium text-sm flex-shrink-0">
                Decision taken by AI
              </div>

              {/* Sub-columns - Scrollable */}
              <div className="grid grid-cols-2 gap-4 bg-gray-100 p-2 flex-1 overflow-hidden">
                {/* AI Executed Column */}
                <div className="bg-white rounded-lg border border-gray-200 flex flex-col h-full">
                  <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-200 flex-shrink-0">
                    <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-900">
                      AI Executed
                    </span>
                    <Badge className="ml-auto bg-gray-300 text-gray-700 text-xs px-2 py-0.5">
                      {columnData["ai-executed"].length}
                    </Badge>
                  </div>
                  <div
                    className={`p-3 space-y-3 overflow-y-auto flex-1 transition-colors ${
                      dragOverColumn === "ai-executed"
                        ? "bg-blue-50 border-2 border-blue-300 border-dashed"
                        : ""
                    }`}
                    onDragOver={handleDragOver}
                    onDragEnter={(e) => handleDragEnter(e, "ai-executed")}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, "ai-executed")}
                  >
                    {columnData["ai-executed"].map((item) => (
                      <Card
                        key={item.id}
                        className={`p-3 bg-white border border-gray-200 cursor-move hover:shadow-md transition-all rounded-md ${
                          draggedItem?.id === item.id
                            ? "opacity-50 scale-95"
                            : ""
                        }`}
                        draggable
                        onDragStart={(e) =>
                          handleDragStart(e, item, "ai-executed")
                        }
                        onDragEnd={handleDragEnd}
                      >
                        <div className="space-y-2">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                              <GripVertical className="h-4 w-4 text-gray-400 cursor-grab" />
                              <h4 className="text-sm font-medium text-gray-900">
                                {item.title}
                              </h4>
                            </div>
                            <Badge
                              className={`text-xs px-2 py-0.5 whitespace-nowrap ${
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
                <div className="bg-white rounded-lg border border-gray-200 flex flex-col h-full">
                  <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-200 flex-shrink-0">
                    <div className="w-1 h-4 bg-red-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-900">
                      Execution failed / aborted
                    </span>
                    <Badge className="ml-auto bg-gray-300 text-gray-700 text-xs px-2 py-0.5">
                      {columnData["ai-failed"].length}
                    </Badge>
                  </div>
                  <div
                    className={`p-3 space-y-3 overflow-y-auto flex-1 transition-colors ${
                      dragOverColumn === "ai-failed"
                        ? "bg-red-50 border-2 border-red-300 border-dashed"
                        : ""
                    }`}
                    onDragOver={handleDragOver}
                    onDragEnter={(e) => handleDragEnter(e, "ai-failed")}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, "ai-failed")}
                  >
                    {columnData["ai-failed"].map((item) => (
                      <Card
                        key={item.id}
                        className={`p-3 bg-white border border-gray-200 cursor-move hover:shadow-md transition-all rounded-md ${
                          draggedItem?.id === item.id
                            ? "opacity-50 scale-95"
                            : ""
                        }`}
                        draggable
                        onDragStart={(e) =>
                          handleDragStart(e, item, "ai-failed")
                        }
                        onDragEnd={handleDragEnd}
                      >
                        <div className="space-y-2">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                              <GripVertical className="h-4 w-4 text-gray-400 cursor-grab" />
                              <h4 className="text-sm font-medium text-gray-900">
                                {item.title}
                              </h4>
                            </div>
                            <Badge className="bg-red-100 text-red-700 text-xs px-2 py-0.5 whitespace-nowrap">
                              {(item as any).error}
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

            {/* Decision taken by Humans */}
            <div className="w-[1200px] flex-shrink-0 flex flex-col h-[calc(100vh-140px)]">
              {/* Main Header - Fixed */}
              <div className="bg-green-100 text-green-900 px-4 py-3 rounded-t-lg font-medium text-sm flex-shrink-0">
                Decision taken by Humans
              </div>

              {/* Sub-columns - Scrollable */}
              <div className="grid grid-cols-3 gap-4 bg-gray-100 p-2 flex-1 overflow-hidden">
                {/* Human Approved / AI Executed */}
                <div className="bg-white rounded-lg border border-gray-200 flex flex-col h-full">
                  <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-200 flex-shrink-0">
                    <div className="w-1 h-4 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-900">
                      Human Approved / AI Executed
                    </span>
                    <Badge className="ml-auto bg-gray-300 text-gray-700 text-xs px-2 py-0.5">
                      {columnData["human-approved"].length}
                    </Badge>
                  </div>
                  <div
                    className={`p-3 space-y-3 overflow-y-auto flex-1 transition-colors ${
                      dragOverColumn === "human-approved"
                        ? "bg-green-50 border-2 border-green-300 border-dashed"
                        : ""
                    }`}
                    onDragOver={handleDragOver}
                    onDragEnter={(e) => handleDragEnter(e, "human-approved")}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, "human-approved")}
                  >
                    {columnData["human-approved"].map((item) => (
                      <Card
                        key={item.id}
                        className={`p-3 bg-white border border-gray-200 cursor-move hover:shadow-md transition-all rounded-md ${
                          draggedItem?.id === item.id
                            ? "opacity-50 scale-95"
                            : ""
                        }`}
                        draggable
                        onDragStart={(e) =>
                          handleDragStart(e, item, "human-approved")
                        }
                        onDragEnd={handleDragEnd}
                      >
                        <div className="space-y-2">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                              <GripVertical className="h-4 w-4 text-gray-400 cursor-grab" />
                              <h4 className="text-sm font-medium text-gray-900">
                                {item.title}
                              </h4>
                            </div>
                            <Badge
                              className={`text-xs px-2 py-0.5 whitespace-nowrap ${
                                (item as any).status === "Executed"
                                  ? "bg-green-100 text-green-700"
                                  : (item as any).status === "Completed"
                                    ? "bg-blue-100 text-blue-700"
                                    : (item as any).status === "In Progress"
                                      ? "bg-yellow-100 text-yellow-700"
                                      : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {(item as any).status}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between text-xs text-gray-600">
                            <span>Approved by {(item as any).approver}</span>
                            <span className="font-medium">
                              {(item as any).value}
                            </span>
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
                <div className="bg-white rounded-lg border border-gray-200 flex flex-col h-full">
                  <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-200 flex-shrink-0">
                    <div className="w-1 h-4 bg-red-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-900">
                      Human Rejected
                    </span>
                    <Badge className="ml-auto bg-gray-300 text-gray-700 text-xs px-2 py-0.5">
                      {columnData["human-rejected"].length}
                    </Badge>
                  </div>
                  <div
                    className={`p-3 space-y-3 overflow-y-auto flex-1 transition-colors ${
                      dragOverColumn === "human-rejected"
                        ? "bg-red-50 border-2 border-red-300 border-dashed"
                        : ""
                    }`}
                    onDragOver={handleDragOver}
                    onDragEnter={(e) => handleDragEnter(e, "human-rejected")}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, "human-rejected")}
                  >
                    {columnData["human-rejected"].map((item) => (
                      <Card
                        key={item.id}
                        className={`p-3 bg-white border border-gray-200 cursor-move hover:shadow-md transition-all rounded-md ${
                          draggedItem?.id === item.id
                            ? "opacity-50 scale-95"
                            : ""
                        }`}
                        draggable
                        onDragStart={(e) =>
                          handleDragStart(e, item, "human-rejected")
                        }
                        onDragEnd={handleDragEnd}
                      >
                        <div className="space-y-2">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                              <GripVertical className="h-4 w-4 text-gray-400 cursor-grab" />
                              <h4 className="text-sm font-medium text-gray-900">
                                {item.title}
                              </h4>
                            </div>
                            <Badge className="bg-red-100 text-red-700 text-xs px-2 py-0.5 whitespace-nowrap">
                              {(item as any).reason}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between text-xs text-gray-600">
                            <span>Rejected by {(item as any).rejector}</span>
                            <span>{item.time}</span>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Timeout/Expired */}
                <div className="bg-white rounded-lg border border-gray-200 flex flex-col h-full">
                  <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-200 flex-shrink-0">
                    <div className="w-1 h-4 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-900">
                      Timeout/Expired
                    </span>
                    <Badge className="ml-auto bg-gray-300 text-gray-700 text-xs px-2 py-0.5">
                      {columnData["timeout-expired"].length}
                    </Badge>
                  </div>
                  <div
                    className={`p-3 space-y-3 overflow-y-auto flex-1 transition-colors ${
                      dragOverColumn === "timeout-expired"
                        ? "bg-yellow-50 border-2 border-yellow-300 border-dashed"
                        : ""
                    }`}
                    onDragOver={handleDragOver}
                    onDragEnter={(e) => handleDragEnter(e, "timeout-expired")}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, "timeout-expired")}
                  >
                    {columnData["timeout-expired"].map((item) => (
                      <Card
                        key={item.id}
                        className={`p-3 bg-white border border-gray-200 cursor-move hover:shadow-md transition-all rounded-md ${
                          draggedItem?.id === item.id
                            ? "opacity-50 scale-95"
                            : ""
                        }`}
                        draggable
                        onDragStart={(e) =>
                          handleDragStart(e, item, "timeout-expired")
                        }
                        onDragEnd={handleDragEnd}
                      >
                        <div className="space-y-2">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                              <GripVertical className="h-4 w-4 text-gray-400 cursor-grab" />
                              <h4 className="text-sm font-medium text-gray-900">
                                {item.title}
                              </h4>
                            </div>
                            <Badge className="bg-orange-100 text-orange-700 text-xs px-2 py-0.5 whitespace-nowrap">
                              Expired
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between text-xs text-gray-600">
                            <span>{(item as any).timeout}</span>
                            <span className="font-medium">
                              {(item as any).originalValue}
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
}