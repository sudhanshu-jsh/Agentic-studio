import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Bot,
  MessageSquare,
  Search,
  FileText,
  Users,
  Zap,
  Filter,
} from "lucide-react";

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  icon: React.ReactNode;
  complexity: "Beginner" | "Intermediate" | "Advanced";
}

interface AgentTemplatesProps {
  onCreateNew: () => void;
  onSelectTemplate: (template: Template) => void;
  customAgents?: Template[];
}

const AgentTemplates: React.FC<AgentTemplatesProps> = ({
  onCreateNew,
  onSelectTemplate,
  customAgents = [],
}) => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const templates: Template[] = [
    {
      id: "major-incident-swarmer",
      name: "Major Incident Swarmer",
      description:
        "Detects P1 spikes, spins up an MS Teams / Slack channel, invites stakeholders, enables stakeholders with analysis based on knowledge and past tickets, posts situation updates, and tracks timeline.",
      category: "ITSM",
      tags: ["Detection", "Swarming", "Timeline"],
      icon: <Zap className="h-6 w-6" />,
      complexity: "Advanced",
    },
    {
      id: "intelligent-escalation-monitor",
      name: "Intelligent Escalation Monitor",
      description:
        "Analyze incident patterns, communication gaps, customer sentiment, team capacity, and context from similar past tickets to predict when human escalation will be needed before SLAs breach.",
      category: "ITSM",
      tags: ["Detection", "Prediction", "PagerDuty"],
      icon: <Bot className="h-6 w-6" />,
      complexity: "Advanced",
    },
    {
      id: "change-risk-advisor",
      name: "Change Risk Advisor",
      description:
        "Estimates risk score from change plan, detects blast radius from past tickets, suggests guardrails, and dynamically chooses approval path.",
      category: "Change Management",
      tags: ["Risk-assessment", "Approval", "Escalation"],
      icon: <FileText className="h-6 w-6" />,
      complexity: "Advanced",
    },
    {
      id: "intelligent-change-approver",
      name: "Intelligent Change Approver",
      description:
        "Analyzes change requests to estimate risk score using risk factors, blast radius, timing, and historical patterns to auto-approve low-risk changes and flag high-risk ones for human review.",
      category: "Change Management",
      tags: ["Risk-assessment", "Auto-approve"],
      icon: <MessageSquare className="h-6 w-6" />,
      complexity: "Intermediate",
    },
    {
      id: "proactive-problem-manager",
      name: "Proactive Problem Manager",
      description:
        "Clusters recurring incidents by categories, symptoms, and geographies. Flags all incidents for the problem records, alerts, and suggests fixes and temporary workarounds.",
      category: "Problem Management",
      tags: ["Monitoring", "Clustering", "Workarounds"],
      icon: <Users className="h-6 w-6" />,
      complexity: "Advanced",
    },
    {
      id: "knowledge-articles-writer",
      name: "Knowledge Articles Writer",
      description:
        "Finds high-volume intents with low deflection, drafts KB articles from past resolutions and available knowledge, and initiates knowledge review workflow for human review.",
      category: "Knowledge Management",
      tags: ["Low-deflection", "Auto-complete", "Knowledge"],
      icon: <Search className="h-6 w-6" />,
      complexity: "Intermediate",
    },
  ];

  const categories = [
    "all",
    "ITSM",
    "Change Management",
    "Problem Management",
    "Knowledge Management",
  ];

  const filteredTemplates =
    selectedCategory === "all"
      ? templates
      : templates.filter((template) => template.category === selectedCategory);

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "Beginner":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "Advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-heading">
            Rezolve Agentic Studio
          </h1>
          <p className="text-muted-foreground">
            Build intelligent ITSM agents from scratch or templates
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category === "all" ? "All Templates" : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            onClick={onCreateNew}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Agent
          </Button>
        </div>
      </div>

      {/* Tabs for Templates and Custom Agents */}
      <Tabs
        defaultValue={customAgents.length > 0 ? "custom-agents" : "templates"}
        className="space-y-6"
      >
        <TabsList>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="custom-agents">Custom Agents</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Start from a template</h2>
            <p className="text-sm text-muted-foreground">
              Kickstart with best-practice ITSM blueprints
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <Card
                key={template.id}
                className="group relative hover:shadow-lg transition-all cursor-pointer border-2 hover:border-blue-200 overflow-hidden"
                onClick={() => onSelectTemplate(template)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        {template.icon}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg font-semibold leading-tight">
                          {template.name}
                        </CardTitle>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {template.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {template.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-end p-4">
                  <Button
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 absolute bottom-4 right-4"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectTemplate(template);
                    }}
                  >
                    Use this template
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="custom-agents" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Custom Agents</h2>
            <p className="text-sm text-muted-foreground">Your created agents</p>
          </div>

          {customAgents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {customAgents.map((agent) => (
                <Card
                  key={agent.id}
                  className="group relative hover:shadow-lg transition-all cursor-pointer border-2 hover:border-green-200 bg-green-50/50 overflow-hidden"
                  onClick={() => onSelectTemplate(agent)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <span className="text-lg">{agent.icon}</span>
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg font-semibold leading-tight">
                            {agent.name}
                          </CardTitle>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {agent.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {agent.tags.map((tag: string) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <Badge
                        className="text-xs bg-green-100 text-green-800"
                        variant="outline"
                      >
                        Custom
                      </Badge>
                    </div>
                  </CardContent>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-end p-4">
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 absolute bottom-4 right-4"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectTemplate(agent);
                      }}
                    >
                      Use this agent
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Bot className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                No custom agents yet
              </h3>
              <p className="text-muted-foreground mb-4">
                Create your first custom agent to get started
              </p>
              <Button
                onClick={onCreateNew}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create New Agent
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AgentTemplates;
