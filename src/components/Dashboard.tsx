import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Bot,
  TrendingUp,
  Users,
  Activity,
  Plus,
  Play,
  Settings,
  BarChart3,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: "Total Requests",
      value: "47,832",
      change: "+18.7% from last period",
      icon: TrendingUp,
      color: "text-green-600",
    },
    {
      title: "Active Agents",
      value: "12",
      change: "+2 from last period",
      icon: Bot,
      color: "text-blue-600",
    },
    {
      title: "Success Rate",
      value: "97.8%",
      change: "+1.2% from last period",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      title: "Error Rate",
      value: "2.2%",
      change: "+0.4% from last period",
      icon: AlertTriangle,
      color: "text-red-600",
    },
  ];

  const recentAgents = [
    {
      id: 1,
      name: "Customer Support Agent",
      status: "active",
      interactions: 12847,
      lastUsed: "3 minutes ago",
    },
    {
      id: 2,
      name: "Sales Assistant",
      status: "active",
      interactions: 8934,
      lastUsed: "12 minutes ago",
    },
    {
      id: 3,
      name: "Content Generator",
      status: "active",
      interactions: 6721,
      lastUsed: "1 hour ago",
    },
    {
      id: 4,
      name: "Data Analyzer",
      status: "active",
      interactions: 4892,
      lastUsed: "2 hours ago",
    },
    {
      id: 5,
      name: "Email Marketing Bot",
      status: "active",
      interactions: 3456,
      lastUsed: "4 hours ago",
    },
    {
      id: 6,
      name: "Lead Qualification Agent",
      status: "draft",
      interactions: 0,
      lastUsed: "Never",
    },
    {
      id: 7,
      name: "Social Media Manager",
      status: "active",
      interactions: 2134,
      lastUsed: "6 hours ago",
    },
    {
      id: 8,
      name: "Document Processor",
      status: "active",
      interactions: 1876,
      lastUsed: "8 hours ago",
    },
  ];

  return (
    <div className="p-6 space-y-6 bg-background">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor performance, track metrics, and manage alerts for your AI
            agents
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm">
            <BarChart3 className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline">Export Report</Button>
          <select className="px-3 py-2 border rounded-md text-sm">
            <option>Last 24 Hours</option>
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
          </select>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="relative">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
                {stat.title === "Error Rate" && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute top-2 right-2 h-6 px-2 text-xs"
                  >
                    <BarChart3 className="h-3 w-3 mr-1" />
                    Review
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span
                    className={
                      stat.title === "Error Rate"
                        ? "text-red-600"
                        : "text-green-600"
                    }
                  >
                    {stat.change.includes("+") ? "↗" : "↘"} {stat.change}
                  </span>
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Agents and Usage Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Agents */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              Recent Agents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAgents.map((agent) => (
                <div
                  key={agent.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Bot className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{agent.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {agent.interactions} interactions • {agent.lastUsed}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        agent.status === "active" ? "default" : "secondary"
                      }
                    >
                      {agent.status}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Play className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Usage Distribution Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Usage Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative w-48 h-48 mx-auto">
                <svg
                  className="w-full h-full transform -rotate-90"
                  viewBox="0 0 100 100"
                >
                  {/* Customer Support - 35% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="8"
                    strokeDasharray="87.96 251.33"
                    strokeDashoffset="0"
                  />
                  {/* Sales Assistant - 25% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="8"
                    strokeDasharray="62.83 251.33"
                    strokeDashoffset="-87.96"
                  />
                  {/* Content Generator - 20% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="8"
                    strokeDasharray="50.27 251.33"
                    strokeDashoffset="-150.79"
                  />
                  {/* Others - 20% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="8"
                    strokeDasharray="50.27 251.33"
                    strokeDashoffset="-201.06"
                  />
                </svg>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">Customer Support (35%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Sales Assistant (25%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm">Content Generator (20%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-sm">Others (20%)</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Agent Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Agent Performance Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 p-4">
            <div className="flex items-end justify-between h-full space-x-2">
              {[
                { name: "Customer Support", value: 98.9, color: "bg-blue-500" },
                { name: "Sales Assistant", value: 97.2, color: "bg-green-500" },
                {
                  name: "Content Generator",
                  value: 96.8,
                  color: "bg-yellow-500",
                },
                { name: "Data Analyzer", value: 95.4, color: "bg-purple-500" },
                { name: "Email Marketing", value: 98.1, color: "bg-pink-500" },
                { name: "Social Media", value: 94.7, color: "bg-orange-500" },
                {
                  name: "Document Processor",
                  value: 97.5,
                  color: "bg-indigo-500",
                },
              ].map((agent, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div className="w-full flex flex-col items-center">
                    <div
                      className={`w-8 ${agent.color} rounded-t transition-all hover:opacity-80`}
                      style={{ height: `${(agent.value / 100) * 180}px` }}
                    ></div>
                    <div className="text-xs font-medium mt-2 text-center">
                      {agent.value}%
                    </div>
                    <div className="text-xs text-muted-foreground text-center mt-1 max-w-16">
                      {agent.name.split(" ")[0]}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">
                Success Rate by Agent (Last 24 Hours)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alerts & Issues */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Alerts & Issues
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <div>
                  <h4 className="font-medium">High Error Rate Detected</h4>
                  <p className="text-sm text-muted-foreground">
                    Customer Support Agent experiencing 15% error rate
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                <Button size="sm">Resolve</Button>
                <Badge className="bg-green-100 text-green-800">Resolved</Badge>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div>
                  <h4 className="font-medium">API Rate Limit Warning</h4>
                  <p className="text-sm text-muted-foreground">
                    Sales Assistant approaching rate limits
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                <Button size="sm">Resolve</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
