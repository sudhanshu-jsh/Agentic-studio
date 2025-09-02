import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Filter,
  Plus,
  Wrench,
  Globe,
  Database,
  MessageSquare,
  FileText,
  Image,
  Code,
  Settings,
  Zap,
  FileSearch,
  Mail,
  Key,
  Brain,
  Shield,
  Cpu,
  Network,
  Bot,
  Workflow,
  Gauge,
} from "lucide-react";

const AgentTools: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTool, setSelectedTool] = useState<any>(null);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [showMoreMCP, setShowMoreMCP] = useState(false);
  const [showMoreUtilities, setShowMoreUtilities] = useState(false);

  const toolCategories = [
    {
      id: "mcp-tools",
      name: "MCP",
      icon: Zap,
      count: 12,
      tools: [
        {
          id: "servicenow-mcp",
          name: "ServiceNow MCP",
          description:
            "Allows agents to read, create, and update tickets in ServiceNow",
          category: "MCP Tools",
          status: "active",
          uses: 234,
          icon: "https://i.postimg.cc/ts8VTX2j/service-now.png",
        },
        {
          id: "servicenow-kb-mcp",
          name: "ServiceNow KB MCP",
          description:
            "Allows agents to search, read, create, and update knowledge in ServiceNow",
          category: "MCP Tools",
          status: "active",
          uses: 189,
          icon: "https://i.postimg.cc/ts8VTX2j/service-now.png",
        },
        {
          id: "jira-mcp",
          name: "JIRA MCP",
          description:
            "Allows agents to read, create, and update tickets in JIRA",
          category: "MCP Tools",
          status: "active",
          uses: 156,
          icon: "https://i.postimg.cc/wtJRRSGs/jira.png",
        },
        {
          id: "github-mcp",
          name: "GitHub MCP",
          description:
            "Allows agents to interact with GitHub repositories and issues",
          category: "MCP Tools",
          status: "active",
          uses: 198,
          icon: "https://i.ibb.co/bjcS1wH8/githublogo.png",
        },
        {
          id: "slack-mcp",
          name: "Slack MCP",
          description:
            "Enables agents to send messages and interact with Slack channels",
          category: "MCP Tools",
          status: "active",
          uses: 167,
          icon: "https://i.ibb.co/svvXkmkY/slack.png",
        },
        {
          id: "notion-mcp",
          name: "Notion MCP",
          description:
            "Allows agents to create and update Notion pages and databases",
          category: "MCP Tools",
          status: "active",
          uses: 143,
          icon: "https://i.ibb.co/jjQ1wxK/notion.png",
        },
        {
          id: "salesforce-mcp",
          name: "Salesforce MCP",
          description:
            "Enables agents to manage Salesforce leads, contacts, and opportunities",
          category: "MCP Tools",
          status: "active",
          uses: 132,
          icon: "https://i.ibb.co/3yjDgVBH/salesforce.png",
        },
        {
          id: "hubspot-mcp",
          name: "HubSpot MCP",
          description:
            "Allows agents to interact with HubSpot CRM and marketing tools",
          category: "MCP Tools",
          status: "active",
          uses: 121,
          icon: "https://i.ibb.co/Ldpw4YwC/hubspot.png",
        },
        {
          id: "zendesk-mcp",
          name: "Zendesk MCP",
          description:
            "Enables agents to create and manage Zendesk support tickets",
          category: "MCP Tools",
          status: "active",
          uses: 109,
          icon: "https://i.ibb.co/hxHHmxxh/zendesk.png",
        },
      ],
      showMore: true,
    },
    {
      id: "utilities",
      name: "Utilities",
      icon: Wrench,
      count: 17,
      tools: [
        {
          id: "log-analyzer",
          name: "Log Analyzer",
          description: "Analyzes and parses system logs for insights",
          category: "Utilities",
          status: "active",
          uses: 145,
          icon: FileSearch,
        },
        {
          id: "email-parser",
          name: "Email Parser",
          description: "Parses and extracts information from email content",
          category: "Utilities",
          status: "active",
          uses: 123,
          icon: Mail,
        },
        {
          id: "license-allocator",
          name: "License Allocator",
          description: "Dynamically assigns provisioned licenses",
          category: "Utilities",
          status: "active",
          uses: 89,
          icon: Key,
        },
        {
          id: "ai-model-optimizer",
          name: "AI Model Optimizer",
          description: "Optimizes AI model performance and resource usage",
          category: "Utilities",
          status: "active",
          uses: 167,
          icon: Brain,
        },
        {
          id: "security-scanner",
          name: "Security Scanner",
          description:
            "Scans agent configurations for security vulnerabilities",
          category: "Utilities",
          status: "active",
          uses: 134,
          icon: Shield,
        },
        {
          id: "performance-monitor",
          name: "Performance Monitor",
          description: "Monitors agent performance and resource utilization",
          category: "Utilities",
          status: "active",
          uses: 198,
          icon: Gauge,
        },
        {
          id: "workflow-builder",
          name: "Workflow Builder",
          description: "Creates custom workflows for agent automation",
          category: "Utilities",
          status: "active",
          uses: 156,
          icon: Workflow,
        },
        {
          id: "agent-debugger",
          name: "Agent Debugger",
          description: "Debug and troubleshoot agent behavior and responses",
          category: "Utilities",
          status: "active",
          uses: 143,
          icon: Bot,
        },
        {
          id: "network-analyzer",
          name: "Network Analyzer",
          description: "Analyzes network traffic and API call patterns",
          category: "Utilities",
          status: "active",
          uses: 121,
          icon: Network,
        },
        {
          id: "resource-manager",
          name: "Resource Manager",
          description: "Manages computational resources for AI agents",
          category: "Utilities",
          status: "active",
          uses: 109,
          icon: Cpu,
        },
      ],
      showMore: true,
    },
    {
      id: "creator-studio-flow",
      name: "Creator Studio Flow",
      icon: Code,
      tools: [
        {
          id: "customer-support-flow",
          name: "Customer Support Flow",
          description: "Automated customer support workflow with escalation",
          category: "Creator Studio Flow",
          status: "active",
          uses: 234,
        },
        {
          id: "lead-qualification-flow",
          name: "Lead Qualification Flow",
          description: "Qualify and route leads based on criteria",
          category: "Creator Studio Flow",
          status: "active",
          uses: 178,
        },
        {
          id: "onboarding-flow",
          name: "User Onboarding Flow",
          description: "Guide new users through onboarding process",
          category: "Creator Studio Flow",
          status: "active",
          uses: 145,
        },
        {
          id: "feedback-collection-flow",
          name: "Feedback Collection Flow",
          description: "Collect and analyze user feedback",
          category: "Creator Studio Flow",
          status: "draft",
          uses: 0,
        },
        {
          id: "appointment-booking-flow",
          name: "Appointment Booking Flow",
          description: "Handle appointment scheduling and reminders",
          category: "Creator Studio Flow",
          status: "active",
          uses: 89,
        },
      ],
    },
    {
      id: "communication",
      name: "Communication",
      icon: MessageSquare,
      tools: [
        {
          id: "email-sender",
          name: "Email Sender",
          description: "Send emails through various providers",
          category: "Communication",
          status: "active",
          uses: 245,
        },
        {
          id: "slack-integration",
          name: "Slack Integration",
          description: "Send messages and notifications to Slack",
          category: "Communication",
          status: "active",
          uses: 189,
        },
        {
          id: "sms-gateway",
          name: "SMS Gateway",
          description: "Send SMS messages via Twilio",
          category: "Communication",
          status: "draft",
          uses: 0,
        },
      ],
    },
    {
      id: "data",
      name: "Data & APIs",
      icon: Database,
      tools: [
        {
          id: "rest-api-client",
          name: "REST API Client",
          description: "Make HTTP requests to external APIs",
          category: "Data",
          status: "active",
          uses: 567,
        },
        {
          id: "database-query",
          name: "Database Query",
          description: "Execute SQL queries on connected databases",
          category: "Data",
          status: "active",
          uses: 123,
        },
        {
          id: "csv-parser",
          name: "CSV Parser",
          description: "Parse and process CSV files",
          category: "Data",
          status: "active",
          uses: 89,
        },
      ],
    },
    {
      id: "web",
      name: "Web & Search",
      icon: Globe,
      tools: [
        {
          id: "web-scraper",
          name: "Web Scraper",
          description: "Extract data from web pages",
          category: "Web",
          status: "active",
          uses: 334,
        },
        {
          id: "search-engine",
          name: "Search Engine",
          description: "Search the web for information",
          category: "Web",
          status: "active",
          uses: 456,
        },
        {
          id: "url-shortener",
          name: "URL Shortener",
          description: "Create short URLs for links",
          category: "Web",
          status: "active",
          uses: 67,
        },
      ],
    },
    {
      id: "content",
      name: "Content & Media",
      icon: FileText,
      tools: [
        {
          id: "pdf-generator",
          name: "PDF Generator",
          description: "Generate PDF documents from templates",
          category: "Content",
          status: "active",
          uses: 178,
        },
        {
          id: "image-generator",
          name: "Image Generator",
          description: "Generate images using AI models",
          category: "Content",
          status: "beta",
          uses: 45,
        },
        {
          id: "text-translator",
          name: "Text Translator",
          description: "Translate text between languages",
          category: "Content",
          status: "active",
          uses: 234,
        },
      ],
    },
  ];

  const [toolStates, setToolStates] = useState<Record<string, boolean>>(() => {
    // Initialize with active tools turned on
    const initialStates: Record<string, boolean> = {};
    toolCategories.forEach((category) => {
      category.tools.forEach((tool) => {
        if (tool.status === "active") {
          initialStates[tool.id] = true;
        }
      });
    });
    return initialStates;
  });

  const allTools = toolCategories.flatMap((category) => category.tools);
  const filteredTools = allTools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const toggleTool = (toolId: string) => {
    setToolStates((prev) => ({
      ...prev,
      [toolId]: !prev[toolId],
    }));
  };

  const openConfiguration = (tool: any) => {
    setSelectedTool(tool);
    setIsConfigOpen(true);
  };

  return (
    <div className="p-6 space-y-6 bg-background">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-heading">Agent Tools</h1>
          <p className="text-muted-foreground">
            Manage and configure tools for your AI agents
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Custom Tool
        </Button>
      </div>

      {/* Tools Content */}
      <Tabs defaultValue="all" className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All Tools (35)</TabsTrigger>
            <TabsTrigger value="active">
              Active ({allTools.filter((t) => t.status === "active").length})
            </TabsTrigger>
            <TabsTrigger value="draft">
              Draft ({allTools.filter((t) => t.status === "draft").length})
            </TabsTrigger>
          </TabsList>

          {/* Search and Filters */}
          <div className="flex items-center gap-4">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Quick Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tools</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="mcp">MCP Tools</SelectItem>
                <SelectItem value="utilities">Utilities</SelectItem>
                <SelectItem value="communication">Communication</SelectItem>
                <SelectItem value="data">Data & APIs</SelectItem>
                <SelectItem value="web">Web & Search</SelectItem>
                <SelectItem value="content">Content & Media</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="all" className="space-y-6">
          {toolCategories.map((category) => {
            const Icon = category.icon;
            const categoryTools = category.tools.filter(
              (tool) =>
                searchQuery === "" ||
                tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                tool.description
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase()),
            );

            if (categoryTools.length === 0) return null;

            // For MCP tools, show only first 3 unless showMoreMCP is true
            // For utilities, show only first 3 unless showMoreUtilities is true
            const displayTools =
              category.id === "mcp-tools" && !showMoreMCP
                ? categoryTools.slice(0, 3)
                : category.id === "utilities" && !showMoreUtilities
                  ? categoryTools.slice(0, 3)
                  : categoryTools;

            return (
              <Card key={category.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon className="h-5 w-5" />
                    {category.name}
                    <Badge variant="outline">
                      {category.count || categoryTools.length} applications
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {displayTools.map((tool, index) => {
                      const ToolIcon = (tool as any).icon;
                      return (
                        <Card
                          key={index}
                          className="hover:shadow-md transition-shadow"
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                {(tool as any).icon ? (
                                  typeof (tool as any).icon === "string" ? (
                                    <img
                                      src={(tool as any).icon}
                                      alt={tool.name}
                                      className="h-4 w-4"
                                    />
                                  ) : (
                                    <ToolIcon className="h-4 w-4 text-primary" />
                                  )
                                ) : (
                                  <Wrench className="h-4 w-4 text-primary" />
                                )}
                                <h4 className="font-medium">{tool.name}</h4>
                              </div>
                              <div className="flex items-center gap-2">
                                <Switch
                                  checked={toolStates[tool.id] || false}
                                  onCheckedChange={() => toggleTool(tool.id)}
                                />
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">
                              {tool.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-muted-foreground">
                                {tool.uses} uses
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openConfiguration(tool)}
                              >
                                Configure
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                  {category.id === "mcp-tools" && categoryTools.length > 3 && (
                    <div className="mt-4 text-right">
                      <Button
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => setShowMoreMCP(!showMoreMCP)}
                      >
                        {showMoreMCP ? "Show less" : "Show more"}
                      </Button>
                    </div>
                  )}
                  {category.id === "utilities" && categoryTools.length > 3 && (
                    <div className="mt-4 text-right">
                      <Button
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => setShowMoreUtilities(!showMoreUtilities)}
                      >
                        {showMoreUtilities ? "Show less" : "Show more"}
                      </Button>
                    </div>
                  )}
                  {category.showMore &&
                    category.id !== "mcp-tools" &&
                    category.id !== "utilities" && (
                      <div className="mt-4 text-right">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                          Show more
                        </Button>
                      </div>
                    )}
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allTools
              .filter((tool) => tool.status === "active")
              .map((tool, index) => {
                const ToolIcon = (tool as any).icon;
                return (
                  <Card
                    key={index}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {(tool as any).icon ? (
                            typeof (tool as any).icon === "string" ? (
                              <img
                                src={(tool as any).icon}
                                alt={tool.name}
                                className="h-4 w-4"
                              />
                            ) : (
                              <ToolIcon className="h-4 w-4 text-primary" />
                            )
                          ) : (
                            <Wrench className="h-4 w-4 text-primary" />
                          )}
                          <h4 className="font-medium">{tool.name}</h4>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={toolStates[tool.id] || false}
                            onCheckedChange={() => toggleTool(tool.id)}
                          />
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {tool.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {tool.uses} uses
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openConfiguration(tool)}
                        >
                          Configure
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
          </div>
        </TabsContent>

        <TabsContent value="draft" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allTools
              .filter((tool) => tool.status === "draft")
              .map((tool, index) => {
                const ToolIcon = (tool as any).icon;
                return (
                  <Card
                    key={index}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {(tool as any).icon ? (
                            typeof (tool as any).icon === "string" ? (
                              <img
                                src={(tool as any).icon}
                                alt={tool.name}
                                className="h-4 w-4 opacity-50"
                              />
                            ) : (
                              <ToolIcon className="h-4 w-4 text-muted-foreground" />
                            )
                          ) : (
                            <Wrench className="h-4 w-4 text-muted-foreground" />
                          )}
                          <h4 className="font-medium text-muted-foreground">
                            {tool.name}
                          </h4>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={toolStates[tool.id] || false}
                            onCheckedChange={() => toggleTool(tool.id)}
                          />
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {tool.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          Not deployed
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openConfiguration(tool)}
                        >
                          Configure
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
          </div>
        </TabsContent>
      </Tabs>

      {/* Configuration Side Drawer */}
      <Sheet open={isConfigOpen} onOpenChange={setIsConfigOpen}>
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>Configure {selectedTool?.name}</SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-6">
            {selectedTool && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="tool-name">Tool Name</Label>
                  <Input
                    id="tool-name"
                    defaultValue={selectedTool.name}
                    placeholder="Enter tool name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tool-description">Description</Label>
                  <Textarea
                    id="tool-description"
                    defaultValue={selectedTool.description}
                    placeholder="Enter tool description"
                    rows={3}
                  />
                </div>

                {selectedTool.category === "MCP Tools" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="mcp-server-url">MCP Server URL</Label>
                      <Input
                        id="mcp-server-url"
                        placeholder="https://your-mcp-server.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mcp-api-key">API Key</Label>
                      <Input
                        id="mcp-api-key"
                        type="password"
                        placeholder="Enter API key"
                      />
                    </div>
                  </>
                )}

                {selectedTool.category === "Communication" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="webhook-url">Webhook URL</Label>
                      <Input
                        id="webhook-url"
                        placeholder="https://hooks.slack.com/..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="auth-token">Authentication Token</Label>
                      <Input
                        id="auth-token"
                        type="password"
                        placeholder="Enter authentication token"
                      />
                    </div>
                  </>
                )}

                {selectedTool.category === "Data" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="api-endpoint">API Endpoint</Label>
                      <Input
                        id="api-endpoint"
                        placeholder="https://api.example.com/v1"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="connection-string">
                        Connection String
                      </Label>
                      <Input
                        id="connection-string"
                        type="password"
                        placeholder="Enter database connection string"
                      />
                    </div>
                  </>
                )}

                {selectedTool.category === "Web" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="user-agent">User Agent</Label>
                      <Input
                        id="user-agent"
                        defaultValue="Mozilla/5.0 (compatible; AI-Agent/1.0)"
                        placeholder="Enter user agent string"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="rate-limit">
                        Rate Limit (requests/minute)
                      </Label>
                      <Input
                        id="rate-limit"
                        type="number"
                        defaultValue="60"
                        placeholder="60"
                      />
                    </div>
                  </>
                )}

                {selectedTool.category === "Content" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="output-format">Output Format</Label>
                      <Input
                        id="output-format"
                        defaultValue="PDF"
                        placeholder="PDF, DOCX, HTML"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="template-path">Template Path</Label>
                      <Input
                        id="template-path"
                        placeholder="/templates/default.html"
                      />
                    </div>
                  </>
                )}

                <div className="flex items-center space-x-2">
                  <Switch
                    id="tool-enabled"
                    checked={toolStates[selectedTool.id] || false}
                    onCheckedChange={() => toggleTool(selectedTool.id)}
                  />
                  <Label htmlFor="tool-enabled">Enable this tool</Label>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button className="flex-1">
                    <Settings className="h-4 w-4 mr-2" />
                    Save Configuration
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsConfigOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AgentTools;
