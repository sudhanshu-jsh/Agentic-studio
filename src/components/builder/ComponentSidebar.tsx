import React, { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Search,
  MessageSquare,
  Bot,
  Database,
  Globe,
  FileText,
  Zap,
  Code,
  Wrench,
  Settings,
  Play,
  Pause,
  RotateCcw,
  Bell,
  Repeat,
  FileInput,
  Save,
  Sparkles,
  SplitSquareHorizontal,
  RefreshCw,
  GitBranch,
  Workflow,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ComponentItem {
  id: string;
  name: string;
  icon?: React.ReactNode;
  description?: string;
}

interface ComponentCategory {
  id: string;
  name: string;
  icon?: React.ReactNode;
  components: ComponentItem[];
}

const ComponentSidebar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({
    "input-output": true,
    agents: true,
    models: false,
    data: false,
    "vector-store": false,
    processing: false,
    "tools-bundles": false,
    logic: false,
  });

  const categories: ComponentCategory[] = [
    {
      id: "input-output",
      name: "Input / Output",
      components: [
        {
          id: "input",
          name: "Input",
          icon: <MessageSquare className="h-4 w-4" />,
        },
        {
          id: "output",
          name: "Output",
          icon: <MessageSquare className="h-4 w-4" />,
        },
        {
          id: "text-input",
          name: "Text Input",
          icon: <FileText className="h-4 w-4" />,
        },
        {
          id: "text-output",
          name: "Text Output",
          icon: <FileText className="h-4 w-4" />,
        },
      ],
    },
    {
      id: "agents",
      name: "Agents",
      components: [
        { id: "agent", name: "Agent", icon: <Bot className="h-4 w-4" /> },
        {
          id: "mcp-tools",
          name: "MCP Tools",
          icon: <Zap className="h-4 w-4" />,
        },
      ],
    },
    {
      id: "models",
      name: "Models",
      components: [
        {
          id: "language-model",
          name: "Language Model",
          icon: <Bot className="h-4 w-4" />,
        },
        {
          id: "embedded-model",
          name: "Embedded Model",
          icon: <Bot className="h-4 w-4" />,
        },
      ],
    },
    {
      id: "data",
      name: "Data",
      components: [
        {
          id: "api-request",
          name: "API Request",
          icon: <Globe className="h-4 w-4" />,
        },
        {
          id: "directory",
          name: "Directory",
          icon: <FileText className="h-4 w-4" />,
        },
        { id: "files", name: "File", icon: <FileText className="h-4 w-4" /> },
        {
          id: "news-search",
          name: "News Search",
          icon: <Search className="h-4 w-4" />,
        },
        {
          id: "rss-reader",
          name: "RSS Reader",
          icon: <Globe className="h-4 w-4" />,
        },
        {
          id: "sql-database",
          name: "SQL Database",
          icon: <Database className="h-4 w-4" />,
        },
        { id: "url", name: "URL", icon: <Globe className="h-4 w-4" /> },
        {
          id: "webhook",
          name: "Webhook",
          icon: (
            <img
              src="https://i.ibb.co/d0kJBH6t/webhook.png"
              alt="Webhook"
              className="h-4 w-4"
            />
          ),
        },
      ],
    },
    {
      id: "vector-store",
      name: "Vector Store",
      components: [
        {
          id: "astra-db",
          name: "Astra DB",
          icon: <Database className="h-4 w-4" />,
        },
        {
          id: "astra-db-graph",
          name: "Astra DB Graph",
          icon: <Database className="h-4 w-4" />,
        },
        {
          id: "cassandra",
          name: "Cassandra",
          icon: <Database className="h-4 w-4" />,
        },
        {
          id: "chroma-db",
          name: "Chroma DB",
          icon: <Database className="h-4 w-4" />,
        },
        {
          id: "click-house",
          name: "Click House",
          icon: <Database className="h-4 w-4" />,
        },
      ],
    },
    {
      id: "processing",
      name: "Processing",
      components: [
        {
          id: "prompt-template",
          name: "Prompt Template",
          icon: <FileText className="h-4 w-4" />,
        },
        {
          id: "batch-run",
          name: "Batch Run",
          icon: <Play className="h-4 w-4" />,
        },
        {
          id: "data-operation",
          name: "Data Operation",
          icon: <Settings className="h-4 w-4" />,
        },
        {
          id: "llm-route",
          name: "LLM Route",
          icon: <GitBranch className="h-4 w-4" />,
        },
        { id: "parser", name: "Parser", icon: <Code className="h-4 w-4" /> },
        {
          id: "structured-output",
          name: "Structured Output",
          icon: <FileText className="h-4 w-4" />,
        },
        {
          id: "observe",
          name: "Observe",
          icon: <Settings className="h-4 w-4" />,
        },
        {
          id: "python-interpreter",
          name: "Python Interpreter",
          icon: <Code className="h-4 w-4" />,
        },
        {
          id: "save-file",
          name: "Save File",
          icon: <Save className="h-4 w-4" />,
        },
        {
          id: "smart-action",
          name: "Smart Action",
          icon: <Sparkles className="h-4 w-4" />,
        },
        {
          id: "split-text",
          name: "Split Text",
          icon: <SplitSquareHorizontal className="h-4 w-4" />,
        },
        {
          id: "type-converter",
          name: "Type Converter",
          icon: <RefreshCw className="h-4 w-4" />,
        },
      ],
    },
    {
      id: "tools-bundles",
      name: "Tools Bundles",
      components: [
        { id: "ai-ml", name: "AI/ML" },
        { id: "anthropic", name: "Anthropic" },
        { id: "agentql", name: "AgentQL" },
        { id: "amazon", name: "Amazon" },
        { id: "apify", name: "Apify" },
        { id: "azure", name: "Azure" },
        { id: "bing", name: "Bing" },
        { id: "email-sender", name: "Email Sender" },
        { id: "slack-integration", name: "Slack Integration" },
        { id: "rest-api-client", name: "REST API Client" },
        { id: "database-query", name: "Database Query" },
        { id: "web-scraper", name: "Web Scraper" },
        { id: "pdf-generator", name: "PDF Generator" },
        { id: "mcp-filesystem", name: "Filesystem MCP" },
        { id: "mcp-database", name: "Database MCP" },
        {
          id: "confluence",
          name: "Confluence",
          icon: (
            <img
              src="https://i.ibb.co/yn7b29H6/confluence.png"
              alt="Confluence"
              className="h-4 w-4"
            />
          ),
        },
        {
          id: "sharepoint",
          name: "SharePoint",
          icon: (
            <img
              src="https://i.ibb.co/sd1z518G/share-Point.png"
              alt="SharePoint"
              className="h-4 w-4"
            />
          ),
        },
        {
          id: "salesforce-crm",
          name: "Salesforce CRM",
          icon: (
            <img
              src="https://i.ibb.co/3yjDgVBH/salesforce.png"
              alt="Salesforce"
              className="h-4 w-4"
            />
          ),
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          icon: <Database className="h-4 w-4" />,
        },
        {
          id: "ms-teams-slack",
          name: "MS Teams / Slack",
          icon: (
            <img
              src="https://i.ibb.co/Wpdr2QGs/teams.jpg"
              alt="Teams/Slack"
              className="h-4 w-4"
            />
          ),
        },
        { id: "observe", name: "Observe" },
      ],
    },
    {
      id: "logic",
      name: "Logic",
      components: [
        {
          id: "if-else",
          name: "If Else",
          icon: <GitBranch className="h-4 w-4" />,
        },
        { id: "listen", name: "Listen", icon: <Pause className="h-4 w-4" /> },
        { id: "loop", name: "Loop", icon: <Repeat className="h-4 w-4" /> },
        { id: "notify", name: "Notify", icon: <Bell className="h-4 w-4" /> },
        {
          id: "run-flow",
          name: "Run Flow",
          icon: <Workflow className="h-4 w-4" />,
        },
      ],
    },
  ];

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const filteredCategories = categories
    .map((category) => ({
      ...category,
      components: category.components.filter((component) =>
        component.name.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((category) => category.components.length > 0);

  const handleDragStart = (e: React.DragEvent, component: ComponentItem) => {
    // Create a clean object without circular references
    const cleanComponent = {
      id: component.id,
      name: component.name,
      description: component.description || "",
    };
    e.dataTransfer.setData("component", JSON.stringify(cleanComponent));
  };

  return (
    <div className="w-[280px] h-full bg-background border-r flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold mb-2">Components</h2>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          {filteredCategories.map((category) => (
            <div key={category.id} className="mb-2">
              <Button
                variant="ghost"
                className="w-full justify-start p-2 font-medium text-sm"
                onClick={() => toggleCategory(category.id)}
              >
                {expandedCategories[category.id] ? (
                  <ChevronDown className="h-4 w-4 mr-2" />
                ) : (
                  <ChevronRight className="h-4 w-4 mr-2" />
                )}
                {category.name}
              </Button>

              {expandedCategories[category.id] && (
                <div className="ml-4 space-y-1 mt-1">
                  {category.components.map((component) => (
                    <div
                      key={component.id}
                      className="flex items-center p-2 rounded-md hover:bg-accent cursor-grab text-sm"
                      draggable
                      onDragStart={(e) => handleDragStart(e, component)}
                    >
                      <div className="h-6 w-6 rounded-md bg-primary/10 flex items-center justify-center mr-2">
                        {component.icon || (
                          <span className="text-xs font-medium">
                            {component.name.charAt(0)}
                          </span>
                        )}
                      </div>
                      <span>{component.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ComponentSidebar;
