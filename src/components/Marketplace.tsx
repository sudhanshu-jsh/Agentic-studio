import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
} from "lucide-react";

const Marketplace: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const featuredAgents = [
    {
      id: 1,
      name: "Incident Response Agent",
      description:
        "Automatically triages and routes incident tickets based on severity and category",
      category: "ITSM",
      rating: 4.8,
      downloads: 1247,
      price: "Free",
      author: "ITSM Solutions Inc",
      tags: ["Incident", "Triage", "Routing"],
      featured: true,
    },
    {
      id: 2,
      name: "O365 Password Reset Agent",
      description:
        "Handles Office 365 password reset requests with security verification",
      category: "Security",
      rating: 4.9,
      downloads: 892,
      price: "$29/month",
      author: "Security Bot Co",
      tags: ["O365", "Password", "Security"],
      featured: true,
    },
    {
      id: 3,
      name: "Hardware Procurement Agent",
      description:
        "Processes hardware procurement requests with approval workflow",
      category: "Procurement",
      rating: 4.7,
      downloads: 2156,
      price: "$19/month",
      author: "Procurement Labs",
      tags: ["Hardware", "Procurement", "Approval"],
      featured: true,
    },
  ];

  const allAgents = [
    ...featuredAgents,
    {
      id: 4,
      name: "Service Request Routing Agent",
      description: "Intelligently routes service requests to appropriate teams",
      category: "ITSM",
      rating: 4.6,
      downloads: 567,
      price: "$39/month",
      author: "ServiceDesk Pro",
      tags: ["Service Request", "Routing", "Teams"],
      featured: false,
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
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search agents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
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
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Bot className="h-6 w-6 text-primary" />
                    <div>
                      <CardTitle className="text-lg">{agent.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        by {agent.author}
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800">
                    Featured
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {agent.description}
                </p>

                <div className="flex flex-wrap gap-1">
                  {agent.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
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
                      <Bot className="h-5 w-5 text-primary" />
                      <div>
                        <CardTitle className="text-base">
                          {agent.name}
                        </CardTitle>
                        <p className="text-xs text-muted-foreground">
                          by {agent.author}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline">{agent.category}</Badge>
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
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        <span>{agent.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Download className="h-3 w-3 text-muted-foreground" />
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
