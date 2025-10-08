import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Search,
  Filter,
  Star,
  Download,
  Bot,
  Users,
  TrendingUp,
  Shield,
  Zap,
  MessageCircle,
  Target,
  BarChart,
  UserCheck,
  Settings,
} from "lucide-react";

const Marketplace: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const featuredAgents = [
    {
      id: 1,
      name: "Follow-up & Triage Agent",
      description:
        "Engages users to gather missing information through automated multi-channel communication. Collects device details, logs, and context to enrich tickets before agent assignment.",
      category: "ITSM",
      rating: 4.9,
      downloads: 1543,
      price: "Free",
      author: "TriageBot Solutions",
      tags: ["Triage", "Enrichment", "Multi-channel"],
      featured: true,
      icon: <MessageCircle className="h-6 w-6 text-primary" />,
      value: "60% reduction in back-and-forth, improved first-contact resolution",
    },
    {
      id: 2,
      name: "Automation Execution Agent",
      description:
        "Identifies eligible tickets for auto-resolution and safely executes routine tasks like password resets, software updates, and permission changes. Maintains audit trails and learns new automation opportunities.",
      category: "Automation",
      rating: 4.8,
      downloads: 2156,
      price: "$29/month",
      author: "AutomateIT Labs",
      tags: ["Automation", "Auto-resolution", "Audit"],
      featured: true,
      icon: <Settings className="h-6 w-6 text-primary" />,
      value: "30-50% of routine tickets resolved instantly, consistent execution quality",
    },
    {
      id: 3,
      name: "Agent Performance & Coaching Agent",
      description:
        "Monitors individual and team metrics including SLA compliance, CSAT, resolution times, and workload balance. Identifies skill gaps, suggests coaching opportunities, and detects burnout risks.",
      category: "Analytics",
      rating: 4.7,
      downloads: 987,
      price: "$39/month",
      author: "Performance Insights Co",
      tags: ["Performance", "Coaching", "Analytics"],
      featured: true,
      icon: <BarChart className="h-6 w-6 text-primary" />,
      value: "20-30% productivity improvement, reduced agent turnover",
    },
  ];

  const allAgents = [
    {
      id: 4,
      name: "Intelligent Escalation Monitor",
      description:
        "Analyze incident patterns, communication gaps, customer sentiment, team capacity, and context from similar past tickets to predict when human escalation will be needed before SLAs breach.",
      category: "ITSM",
      rating: 4.8,
      downloads: 1247,
      price: "Free",
      author: "ITSM Solutions Inc",
      tags: ["Detection", "Prediction", "PagerDuty"],
      featured: false,
      icon: <TrendingUp className="h-5 w-5 text-primary" />,
    },
    {
      id: 5,
      name: "Change Risk Advisor",
      description:
        "Estimates risk score from change plan, detects blast radius from past tickets, suggests guardrails, and dynamically chooses approval path.",
      category: "Change Management",
      rating: 4.7,
      downloads: 892,
      price: "$29/month",
      author: "Change Management Pro",
      tags: ["Risk-assessment", "Approval", "Escalation"],
      featured: false,
      icon: <Shield className="h-5 w-5 text-primary" />,
    },
    {
      id: 6,
      name: "Intelligent Change Approver",
      description:
        "Analyzes change requests to estimate risk score using risk factors, blast radius, timing, and historical patterns to auto-approve low-risk changes and flag high-risk ones for human review.",
      category: "Change Management",
      rating: 4.9,
      downloads: 1123,
      price: "$19/month",
      author: "Change Management Pro",
      tags: ["Risk-assessment", "Auto-approve"],
      featured: false,
      icon: <UserCheck className="h-5 w-5 text-primary" />,
    },
    {
      id: 7,
      name: "Proactive Problem Manager",
      description:
        "Clusters recurring incidents by categories, symptoms, and geographies. Flags all incidents for the problem records, alerts, and suggests fixes and temporary workarounds.",
      category: "Problem Management",
      rating: 4.6,
      downloads: 756,
      price: "$39/month",
      author: "Problem Management Labs",
      tags: ["Monitoring", "Clustering", "Workarounds"],
      featured: false,
      icon: <Target className="h-5 w-5 text-primary" />,
    },
    {
      id: 8,
      name: "Knowledge Articles Writer",
      description:
        "Finds high-volume intents with low deflection, drafts KB articles from past resolutions and available knowledge, and initiates knowledge review workflow for human review.",
      category: "Knowledge Management",
      rating: 4.7,
      downloads: 1034,
      price: "$29/month",
      author: "Knowledge Labs",
      tags: ["Low-deflection", "Auto-complete", "Knowledge"],
      featured: false,
      icon: <Bot className="h-5 w-5 text-primary" />,
    },
    {
      id: 9,
      name: "Incident Response Agent",
      description:
        "Automatically triages and routes incident tickets based on severity and category",
      category: "ITSM",
      rating: 4.8,
      downloads: 1247,
      price: "Free",
      author: "ITSM Solutions Inc",
      tags: ["Incident", "Triage", "Routing"],
      featured: false,
      icon: <Zap className="h-5 w-5 text-primary" />,
    },
    {
      id: 10,
      name: "O365 Password Reset Agent",
      description:
        "Handles Office 365 password reset requests with security verification",
      category: "Security",
      rating: 4.9,
      downloads: 892,
      price: "$29/month",
      author: "Security Bot Co",
      tags: ["O365", "Password", "Security"],
      featured: false,
      icon: <Shield className="h-5 w-5 text-primary" />,
    },
    {
      id: 11,
      name: "Hardware Procurement Agent",
      description:
        "Processes hardware procurement requests with approval workflow",
      category: "Procurement",
      rating: 4.7,
      downloads: 2156,
      price: "$19/month",
      author: "Procurement Labs",
      tags: ["Hardware", "Procurement", "Approval"],
      featured: false,
      icon: <Bot className="h-5 w-5 text-primary" />,
    },
    {
      id: 12,
      name: "Service Request Routing Agent",
      description: "Intelligently routes service requests to appropriate teams",
      category: "ITSM",
      rating: 4.6,
      downloads: 567,
      price: "$39/month",
      author: "ServiceDesk Pro",
      tags: ["Service Request", "Routing", "Teams"],
      featured: false,
      icon: <Users className="h-5 w-5 text-primary" />,
    },
  ];

  const categories = [
    { name: "All", count: allAgents.length },
    { name: "ITSM", count: 3 },
    { name: "Security", count: 1 },
    { name: "Procurement", count: 1 },
  ];

  const filteredAgents = allAgents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
  );

  return (
    <div className="p-6 space-y-6 bg-background">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Marketplace</h1>
          <p className="text-muted-foreground">
            Discover and deploy pre-built AI agents for your business
          </p>
        </div>
        <Button>
          <Bot className="h-4 w-4 mr-2" />
          Submit Agent
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center justify-end gap-4">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search agents..."
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
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="itsm">ITSM</SelectItem>
            <SelectItem value="security">Security</SelectItem>
            <SelectItem value="procurement">Procurement</SelectItem>
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="free">Free</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Featured Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Star className="h-5 w-5 text-yellow-500" />
          <h2 className="text-xl font-semibold">Featured Agents</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredAgents.map((agent) => (
            <Card
              key={agent.id}
              className="hover:shadow-lg transition-shadow border-2 border-yellow-200"
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    {agent.icon}
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-base leading-tight">
                        {agent.name}
                      </CardTitle>
                      <p className="text-xs text-muted-foreground">
                        by {agent.author}
                      </p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {agent.description}
                </p>

                {agent.value && (
                  <div className="bg-blue-50 border border-blue-200 rounded p-2">
                    <p className="text-xs text-blue-900 font-medium">
                      <span className="font-semibold">Value: </span>
                      {agent.value}
                    </p>
                  </div>
                )}

                <div className="flex flex-wrap gap-1">
                  {agent.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                      Featured
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span>{agent.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="h-4 w-4 text-muted-foreground" />
                      <span>{agent.downloads}</span>
                    </div>
                  </div>
                  <div className="font-semibold text-primary">
                    {agent.price}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Install
                  </Button>
                  <Button variant="outline">Preview</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Categories and All Agents */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          {categories.map((category) => (
            <TabsTrigger
              key={category.name}
              value={category.name.toLowerCase()}
            >
              {category.name} ({category.count})
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAgents.map((agent) => (
              <Card
                key={agent.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {agent.icon}
                      <div>
                        <CardTitle className="text-sm">
                          {agent.name}
                        </CardTitle>
                        <p className="text-xs text-muted-foreground">
                          by {agent.author}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs whitespace-nowrap flex-shrink-0">{agent.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {agent.description}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {agent.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Download className="h-4 w-4 text-muted-foreground" />
                        <span>{agent.downloads}</span>
                      </div>
                    </div>
                    <div className="font-semibold text-primary">
                      {agent.price}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      Install
                    </Button>
                    <Button variant="outline" size="sm">
                      Preview
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Marketplace;