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
  Zap,
  MessageSquare,
  Clock,
  ArrowRight,
} from "lucide-react";

const AgentHome: React.FC = () => {
  const quickStats = [
    {
      title: "Active Agents",
      value: "12",
      change: "+2 from last week",
      icon: Bot,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Total Requests",
      value: "47.8K",
      change: "+18.7% from last month",
      icon: Activity,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Success Rate",
      value: "97.8%",
      change: "+1.2% improvement",
      icon: CheckCircle,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      title: "Avg Response",
      value: "245ms",
      change: "-12ms faster",
      icon: Zap,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  const recentAgents = [
    {
      id: 1,
      name: "Customer Support Agent",
      status: "active",
      lastUsed: "2 minutes ago",
      requests: "12.8K",
      successRate: "98.9%",
    },
    {
      id: 2,
      name: "Sales Assistant",
      status: "active",
      lastUsed: "15 minutes ago",
      requests: "8.9K",
      successRate: "97.2%",
    },
    {
      id: 3,
      name: "Content Generator",
      status: "active",
      lastUsed: "1 hour ago",
      requests: "6.7K",
      successRate: "96.8%",
    },
    {
      id: 4,
      name: "Data Analyzer",
      status: "warning",
      lastUsed: "2 hours ago",
      requests: "4.9K",
      successRate: "95.4%",
    },
  ];

  const quickActions = [
    {
      title: "Create New Agent",
      description: "Build a custom AI agent from scratch",
      icon: Plus,
      color: "bg-blue-600",
      action: "Create",
    },
    {
      title: "Browse Templates",
      description: "Start with pre-built agent templates",
      icon: Bot,
      color: "bg-green-600",
      action: "Browse",
    },
    {
      title: "View Analytics",
      description: "Monitor performance and metrics",
      icon: BarChart3,
      color: "bg-purple-600",
      action: "View",
    },
    {
      title: "Manage Tools",
      description: "Configure integrations and tools",
      icon: Settings,
      color: "bg-orange-600",
      action: "Manage",
    },
  ];

  const recentActivity = [
    {
      type: "deployment",
      message: "Customer Support Agent deployed successfully",
      time: "5 minutes ago",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      type: "alert",
      message: "Data Analyzer response time increased",
      time: "23 minutes ago",
      icon: AlertTriangle,
      color: "text-yellow-600",
    },
    {
      type: "update",
      message: "Sales Assistant configuration updated",
      time: "1 hour ago",
      icon: Settings,
      color: "text-blue-600",
    },
    {
      type: "message",
      message: "New collaboration request from team",
      time: "2 hours ago",
      icon: MessageSquare,
      color: "text-purple-600",
    },
  ];

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome back!</h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening with your AI agents today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Agent
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {stat.value}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <div
                    key={index}
                    className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${action.color}`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {action.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {action.description}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-2 p-0 h-auto font-medium text-primary hover:text-primary/80"
                        >
                          {action.action}
                          <ArrowRight className="h-3 w-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-0.5">
                      <Icon className={`h-4 w-4 ${activity.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground">
                        {activity.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Agents */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              Your Agents
            </CardTitle>
            <Button variant="outline" size="sm">
              View All
              <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAgents.map((agent) => (
              <div
                key={agent.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Bot className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">
                      {agent.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {agent.requests} requests • Last used {agent.lastUsed}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">
                      {agent.successRate}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Success Rate
                    </p>
                  </div>
                  <Badge
                    variant={
                      agent.status === "active" ? "default" : "secondary"
                    }
                    className={
                      agent.status === "warning"
                        ? "bg-yellow-100 text-yellow-800"
                        : ""
                    }
                  >
                    {agent.status}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Play className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentHome;
