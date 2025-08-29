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
  BarChart3,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  Zap,
  Users,
  MessageSquare,
  RefreshCw,
  Filter,
  Eye,
} from "lucide-react";

const Observability: React.FC = () => {
  const [selectedAgent, setSelectedAgent] = useState("all");
  const [selectedDuration, setSelectedDuration] = useState("24h");

  const metrics = [
    {
      title: "Total Requests",
      value: "47,832",
      change: "+18.7%",
      trend: "up",
      icon: Activity,
      color: "text-blue-600",
    },
    {
      title: "Active Agents",
      value: "12",
      change: "+2",
      trend: "up",
      icon: Zap,
      color: "text-purple-600",
    },
    {
      title: "Success Rate",
      value: "97.8%",
      change: "+1.2%",
      trend: "up",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      title: "Error Rate",
      value: "2.2%",
      change: "+0.4%",
      trend: "down",
      icon: AlertTriangle,
      color: "text-red-600",
      showReview: true,
    },
  ];

  const agentPerformance = [
    {
      name: "Customer Support Agent",
      requests: 12847,
      successRate: 98.9,
      avgResponseTime: 165,
      status: "healthy",
      uptime: "99.8%",
    },
    {
      name: "Sales Assistant",
      requests: 8934,
      successRate: 97.2,
      avgResponseTime: 198,
      status: "healthy",
      uptime: "99.3%",
    },
    {
      name: "Content Generator",
      requests: 6721,
      successRate: 96.8,
      avgResponseTime: 287,
      status: "healthy",
      uptime: "98.9%",
    },
    {
      name: "Data Analyzer",
      requests: 4892,
      successRate: 95.4,
      avgResponseTime: 412,
      status: "warning",
      uptime: "97.6%",
    },
    {
      name: "Email Marketing Bot",
      requests: 3456,
      successRate: 98.1,
      avgResponseTime: 156,
      status: "healthy",
      uptime: "99.1%",
    },
    {
      name: "Social Media Manager",
      requests: 2134,
      successRate: 94.7,
      avgResponseTime: 523,
      status: "critical",
      uptime: "94.2%",
    },
    {
      name: "Document Processor",
      requests: 1876,
      successRate: 97.5,
      avgResponseTime: 234,
      status: "healthy",
      uptime: "98.7%",
    },
  ];

  const recentAlerts = [
    {
      id: 1,
      severity: "critical",
      message: "Social Media Manager experiencing high error rate (5.3%)",
      timestamp: "2 minutes ago",
      agent: "Social Media Manager",
      resolved: false,
    },
    {
      id: 2,
      severity: "warning",
      message: "Data Analyzer response time above threshold (412ms)",
      timestamp: "8 minutes ago",
      agent: "Data Analyzer",
      resolved: false,
    },
    {
      id: 3,
      severity: "info",
      message: "Customer Support Agent scaled up due to high demand",
      timestamp: "23 minutes ago",
      agent: "Customer Support Agent",
      resolved: true,
    },
    {
      id: 4,
      severity: "warning",
      message: "Memory usage spike detected in Content Generator",
      timestamp: "1 hour ago",
      agent: "Content Generator",
      resolved: true,
    },
    {
      id: 5,
      severity: "info",
      message: "Email Marketing Bot deployment completed successfully",
      timestamp: "2 hours ago",
      agent: "Email Marketing Bot",
      resolved: true,
    },
    {
      id: 6,
      severity: "critical",
      message: "Database connection timeout in Document Processor",
      timestamp: "3 hours ago",
      agent: "Document Processor",
      resolved: true,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "healthy":
        return <Badge className="bg-green-100 text-green-800">Healthy</Badge>;
      case "warning":
        return <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>;
      case "critical":
        return <Badge className="bg-red-100 text-red-800">Critical</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return <Badge className="bg-red-100 text-red-800">Critical</Badge>;
      case "warning":
        return <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>;
      case "info":
        return <Badge className="bg-blue-100 text-blue-800">Info</Badge>;
      default:
        return <Badge variant="outline">{severity}</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6 bg-background">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-heading">Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor performance, track metrics, and manage alerts for your AI
            agents
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button>
            <BarChart3 className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>
      {/* Quick Filters */}
      <div className="flex gap-2 justify-end">
        <Select value={selectedAgent} onValueChange={setSelectedAgent}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by Agent" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Agents</SelectItem>
            <SelectItem value="customer-support">
              Customer Support Agent
            </SelectItem>
            <SelectItem value="sales-assistant">Sales Assistant</SelectItem>
            <SelectItem value="content-generator">Content Generator</SelectItem>
            <SelectItem value="data-analyzer">Data Analyzer</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedDuration} onValueChange={setSelectedDuration}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by Duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1h">Last 1 Hour</SelectItem>
            <SelectItem value="24h">Last 24 Hours</SelectItem>
            <SelectItem value="7d">Last 7 Days</SelectItem>
            <SelectItem value="30d">Last 30 Days</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="relative">
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <div
                  className={`w-8 h-8 rounded flex items-center justify-center mr-3`}
                  style={{
                    backgroundColor: `${metric.color.replace("text-", "").replace("-600", "") === "blue" ? "#dbeafe" : metric.color.replace("text-", "").replace("-600", "") === "green" ? "#dcfce7" : metric.color.replace("text-", "").replace("-600", "") === "purple" ? "#f3e8ff" : "#fef2f2"}`,
                  }}
                >
                  <Icon className={`h-4 w-4 ${metric.color}`} />
                </div>
                <CardTitle className="text-sm font-medium">
                  {metric.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="text-2xl font-bold">{metric.value}</div>
                    <div className="flex items-center text-xs">
                      {metric.trend === "up" ? (
                        <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-red-600 mr-1" />
                      )}
                      <span
                        className={
                          metric.trend === "up"
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        {metric.change}
                      </span>
                      <span className="text-muted-foreground ml-1">
                        from last period
                      </span>
                    </div>
                  </div>
                </div>
                {metric.showReview && (
                  <div className="absolute top-2 right-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-6 px-2 text-xs"
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      Review
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
      {/* Main Content */}
      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList>
          <TabsTrigger value="performance">Agent Performance</TabsTrigger>
          <TabsTrigger value="alerts">Alerts & Issues</TabsTrigger>
          <TabsTrigger value="logs">System Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Agent Performance Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {agentPerformance.map((agent, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Zap className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{agent.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {agent.requests.toLocaleString()} requests • Uptime:{" "}
                          {agent.uptime}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="text-center">
                        <p className="font-medium">{agent.successRate}%</p>
                        <p className="text-muted-foreground">Success Rate</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium">{agent.avgResponseTime}ms</p>
                        <p className="text-muted-foreground">Avg Response</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(agent.status)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Recent Alerts</h3>
            <div className="flex gap-2">
              <Badge variant="outline">
                {recentAlerts.filter((a) => !a.resolved).length} Active
              </Badge>
              <Badge variant="outline">
                {recentAlerts.filter((a) => a.resolved).length} Resolved
              </Badge>
            </div>
          </div>

          <div className="space-y-3">
            {recentAlerts.map((alert) => (
              <Card
                key={alert.id}
                className={alert.resolved ? "opacity-60" : ""}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <AlertTriangle
                        className={`h-5 w-5 ${
                          alert.severity === "critical"
                            ? "text-red-600"
                            : alert.severity === "warning"
                              ? "text-yellow-600"
                              : "text-blue-600"
                        }`}
                      />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          {getSeverityBadge(alert.severity)}
                          <span className="text-sm font-medium">
                            {alert.agent}
                          </span>
                        </div>
                        <p className="text-sm">{alert.message}</p>
                        <p className="text-xs text-muted-foreground">
                          {alert.timestamp}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {alert.resolved ? (
                        <Badge className="bg-green-100 text-green-800">
                          Resolved
                        </Badge>
                      ) : (
                        <>
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                          <Button size="sm" variant="outline">
                            Resolve
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Activity Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    time: "14:32:15",
                    type: "info",
                    message:
                      "Customer Support Agent processed 1,247 requests in the last hour",
                    agent: "Customer Support Agent",
                    details:
                      "Peak performance maintained with 98.9% success rate",
                  },
                  {
                    time: "14:28:42",
                    type: "warning",
                    message: "Data Analyzer response time increased to 412ms",
                    agent: "Data Analyzer",
                    details: "Investigating potential database bottleneck",
                  },
                  {
                    time: "14:25:18",
                    type: "success",
                    message:
                      "Sales Assistant completed batch processing of 500 leads",
                    agent: "Sales Assistant",
                    details: "Generated 127 qualified prospects for follow-up",
                  },
                  {
                    time: "14:21:03",
                    type: "error",
                    message: "Social Media Manager encountered API rate limit",
                    agent: "Social Media Manager",
                    details: "Implementing exponential backoff strategy",
                  },
                  {
                    time: "14:18:56",
                    type: "info",
                    message:
                      "Content Generator started new article generation workflow",
                    agent: "Content Generator",
                    details:
                      "Processing 15 content requests from marketing team",
                  },
                  {
                    time: "14:15:22",
                    type: "success",
                    message:
                      "Email Marketing Bot sent 2,340 personalized emails",
                    agent: "Email Marketing Bot",
                    details:
                      "Campaign: Q4 Product Launch - 23.4% open rate achieved",
                  },
                  {
                    time: "14:12:07",
                    type: "warning",
                    message: "Document Processor memory usage at 78%",
                    agent: "Document Processor",
                    details:
                      "Processing large PDF batch - monitoring resource usage",
                  },
                  {
                    time: "14:08:41",
                    type: "info",
                    message: "System health check completed successfully",
                    agent: "System Monitor",
                    details:
                      "All agents operational - 97.8% overall success rate",
                  },
                ].map((log, index) => (
                  <div
                    key={index}
                    className="flex gap-4 pb-4 border-b border-muted last:border-b-0"
                  >
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          log.type === "error"
                            ? "bg-red-500"
                            : log.type === "warning"
                              ? "bg-yellow-500"
                              : log.type === "success"
                                ? "bg-green-500"
                                : "bg-blue-500"
                        }`}
                      />
                      {index < 7 && <div className="w-px h-8 bg-muted mt-2" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-mono text-muted-foreground">
                          {log.time}
                        </span>
                        <Badge
                          variant={
                            log.type === "error"
                              ? "destructive"
                              : log.type === "warning"
                                ? "secondary"
                                : "outline"
                          }
                          className="text-xs"
                        >
                          {log.type.toUpperCase()}
                        </Badge>
                        <span className="text-sm font-medium text-primary">
                          {log.agent}
                        </span>
                      </div>
                      <p className="text-sm font-medium mb-1">{log.message}</p>
                      <p className="text-xs text-muted-foreground">
                        {log.details}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Observability;
