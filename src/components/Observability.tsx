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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
  Bot,
  ArrowRight,
  Minus,
  Sparkles,
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
      title: "Success Rate",
      value: "97.8%",
      change: "+1.2%",
      trend: "up",
      icon: CheckCircle,
      color: "text-green-600",
      aiRecommendation: {
        title: "Enable Change Risk Advisor Agent",
        description:
          "Enable Change Risk Advisor Agent to analyze blast radius. Could prevent 73% of failed changes based on pattern analysis.",
        tags: ["Risk-assessment", "Approval"],
      },
    },
    {
      title: "Error Rate",
      value: "2.3%",
      change: "+0.5%",
      trend: "up",
      icon: AlertTriangle,
      color: "text-red-600",
      subtitle: "needs review",
      hasReviewButton: true,
      aiRecommendation: {
        title: "Error Pattern Analyzer Agent",
        description:
          "Error Pattern Analyzer Agent detected recurring authentication failures. Implementing auto-retry logic could reduce error rate by 60%.",
        tags: ["Error-reduction", "Auto-retry"],
      },
    },
    {
      title: "MTTR (Mean Time to Resolve)",
      value: "3.4h",
      change: "+18%",
      trend: "up",
      icon: Clock,
      color: "text-orange-600",
      subtitle: "vs last week",
      aiRecommendation: {
        title: "Deploy Intelligent Escalation Monitor Agent",
        description:
          "Deploy Intelligent Escalation Monitor Agent to predict escalations upto 2 hours earlier, potentially reducing MTTR by 35%.",
        tags: ["Detection", "Prediction"],
      },
    },
    {
      title: "Major Incidents (24h)",
      value: "27.7",
      change: "+140%",
      trend: "up",
      icon: AlertTriangle,
      color: "text-red-600",
      subtitle: "spike detected",
      aiRecommendation: {
        title: "Activate Major Incident Swarmer Agent",
        description:
          "Activate Major Incident Swarmer Agent to auto-coordinate response teams. Past data shows 45% faster resolution with swarming.",
        tags: ["Swarming", "Timeline"],
      },
    },

    {
      title: "Knowledge Deflection Rate",
      value: "38%",
      change: "0%",
      trend: "neutral",
      icon: MessageSquare,
      color: "text-gray-600",
      subtitle: "No change",
      aiRecommendation: {
        title: "Knowledge Articles Writer Agent",
        description:
          "Knowledge Articles Writer Agent identified 47 high-volume queries lacking documentation. Auto-drafting could boost deflection to 45%.",
        tags: ["Low-deflection", "Auto-complete"],
      },
    },
    {
      title: "Recurring Incidents",
      value: "274.3",
      change: "+32%",
      trend: "up",
      icon: RefreshCw,
      color: "text-red-600",
      subtitle: "increase",
      aiRecommendation: {
        title: "Proactive Problem Manager Agent",
        description:
          "Proactive Problem Manager Agent detected 6 clusters affecting 180+ incidents. Suggested workarounds ready for deployment.",
        tags: ["Clustering", "Workarounds"],
      },
    },
    {
      title: "Manual Approval Backlog",
      value: "24.3",
      change: "+",
      trend: "up",
      icon: Users,
      color: "text-yellow-600",
      subtitle: "Growing queue",
      aiRecommendation: {
        title: "Intelligent Change Approver Agent",
        description:
          "Intelligent Change Approver Agent can auto-approve 62 low-risk changes immediately, reducing backlog by 74%.",
        tags: ["Auto-approve", "Risk-assessment"],
      },
    },
  ];

  const agentPerformance = [
    {
      name: "Intake & Routing Agent",
      requests: 18234,
      successRate: 98.7,
      avgResponseTime: 132,
      status: "healthy",
      uptime: "99.9%",
    },
    {
      name: "Solution Identification Agent",
      requests: 15847,
      successRate: 97.8,
      avgResponseTime: 189,
      status: "healthy",
      uptime: "99.5%",
    },
    {
      name: "SLA Management & Risk Agent",
      requests: 12934,
      successRate: 98.2,
      avgResponseTime: 156,
      status: "healthy",
      uptime: "99.7%",
    },
    {
      name: "Customer Experience & CSAT Agent",
      requests: 9721,
      successRate: 96.9,
      avgResponseTime: 245,
      status: "healthy",
      uptime: "98.8%",
    },
    {
      name: "Problem & Major Incident Detection Agent",
      requests: 8456,
      successRate: 95.8,
      avgResponseTime: 378,
      status: "warning",
      uptime: "97.9%",
    },
    {
      name: "Follow-up & Triage Agent",
      requests: 7892,
      successRate: 97.4,
      avgResponseTime: 198,
      status: "healthy",
      uptime: "99.2%",
    },
    {
      name: "Automation Execution Agent",
      requests: 6543,
      successRate: 98.9,
      avgResponseTime: 143,
      status: "healthy",
      uptime: "99.6%",
    },
    {
      name: "Agent Performance & Coaching Agent",
      requests: 3876,
      successRate: 97.1,
      avgResponseTime: 267,
      status: "healthy",
      uptime: "98.9%",
    },
  ];

  const recentAlerts = [
    {
      id: 1,
      severity: "warning",
      message: "Problem & Major Incident Detection Agent response time above threshold (378ms)",
      timestamp: "2 minutes ago",
      agent: "Problem & Major Incident Detection Agent",
      resolved: false,
    },
    {
      id: 2,
      severity: "info",
      message: "Intake & Routing Agent scaled up due to high ticket volume",
      timestamp: "8 minutes ago",
      agent: "Intake & Routing Agent",
      resolved: true,
    },
    {
      id: 3,
      severity: "warning",
      message: "Customer Experience & CSAT Agent detected sentiment drop in 15 tickets",
      timestamp: "23 minutes ago",
      agent: "Customer Experience & CSAT Agent",
      resolved: false,
    },
    {
      id: 4,
      severity: "info",
      message: "Automation Execution Agent completed 127 password resets",
      timestamp: "1 hour ago",
      agent: "Automation Execution Agent",
      resolved: true,
    },
    {
      id: 5,
      severity: "critical",
      message: "SLA Management & Risk Agent detected 8 at-risk tickets approaching breach",
      timestamp: "2 hours ago",
      agent: "SLA Management & Risk Agent",
      resolved: false,
    },
    {
      id: 6,
      severity: "info",
      message: "Solution Identification Agent knowledge base sync completed",
      timestamp: "3 hours ago",
      agent: "Solution Identification Agent",
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
          <h1 className="text-3xl font-bold text-text-heading"> Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor agent performance, track service metrics, and manage IT
            service alerts
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
            <SelectItem value="intake-routing">
              Intake & Routing Agent
            </SelectItem>
            <SelectItem value="solution-identification">
              Solution Identification Agent
            </SelectItem>
            <SelectItem value="sla-management">
              SLA Management & Risk Agent
            </SelectItem>
            <SelectItem value="customer-experience">
              Customer Experience & CSAT Agent
            </SelectItem>
            <SelectItem value="problem-detection">
              Problem & Major Incident Detection Agent
            </SelectItem>
            <SelectItem value="followup-triage">
              Follow-up & Triage Agent
            </SelectItem>
            <SelectItem value="automation-execution">
              Automation Execution Agent
            </SelectItem>
            <SelectItem value="agent-performance">
              Agent Performance & Coaching Agent
            </SelectItem>
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
          const getBackgroundColor = (color: string) => {
            const colorMap: { [key: string]: string } = {
              "text-blue-600": "#dbeafe",
              "text-green-600": "#dcfce7",
              "text-purple-600": "#f3e8ff",
              "text-red-600": "#fef2f2",
              "text-orange-600": "#fed7aa",
              "text-yellow-600": "#fef3c7",
              "text-gray-600": "#f3f4f6",
            };
            return colorMap[color] || "#f3f4f6";
          };

          return (
            <Card key={index} className="relative">
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <div
                  className={`w-8 h-8 rounded flex items-center justify-center mr-3`}
                  style={{
                    backgroundColor: getBackgroundColor(metric.color),
                  }}
                >
                  <Icon className={`h-4 w-4 ${metric.color}`} />
                </div>
                <CardTitle className="text-sm font-medium">
                  {metric.title}
                </CardTitle>
              </CardHeader>
              <CardContent
                className={
                  metric.title !== "Total Requests" &&
                  metric.title !== "Active Agents"
                    ? "pb-12"
                    : ""
                }
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="text-2xl font-bold">{metric.value}</div>
                    <div className="flex items-center text-xs">
                      {metric.trend === "up" ? (
                        <TrendingUp
                          className={`h-3 w-3 mr-1 ${
                            metric.title.includes("Success")
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        />
                      ) : metric.trend === "down" ? (
                        <TrendingDown className="h-3 w-3 text-red-600 mr-1" />
                      ) : (
                        <Minus className="h-3 w-3 text-gray-600 mr-1" />
                      )}
                      <span
                        className={
                          metric.trend === "up"
                            ? metric.title.includes("Success")
                              ? "text-green-600"
                              : "text-red-600"
                            : metric.trend === "down"
                              ? "text-red-600"
                              : "text-gray-600"
                        }
                      >
                        {metric.change}
                      </span>
                      <span className="text-muted-foreground ml-1">
                        {metric.subtitle || "from last period"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Review Button for Error Rate */}
                {metric.hasReviewButton && (
                  <div className="absolute top-3 right-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 px-3 text-xs bg-white border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      Review
                    </Button>
                  </div>
                )}

                {/* AI Agent Recommendation Badge - Only show for specific metrics */}
                {metric.title !== "Total Requests" &&
                  metric.title !== "Active Agents" && (
                    <div className="absolute bottom-2 left-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2 text-xs bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-300/50 text-blue-700 hover:from-blue-500/20 hover:to-purple-500/20 hover:border-blue-400/70 shadow-sm transition-all duration-300 rounded-lg backdrop-blur-sm"
                          >
                            <Sparkles className="h-3 w-3 mr-1.5 text-blue-600" />
                            <span className="font-medium">
                              AI Agent Recommendation
                            </span>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-80 p-0 bg-white border border-gray-200 shadow-xl"
                          side="bottom"
                          align="start"
                        >
                          <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-100">
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                <Sparkles className="h-4 w-4 text-white" />
                              </div>
                              <span className="text-sm font-semibold text-blue-700 uppercase tracking-wide">
                                AI AGENT RECOMMENDATION
                              </span>
                            </div>

                            <h4 className="font-semibold text-gray-900 mb-2">
                              {metric.aiRecommendation.title}
                            </h4>

                            <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                              {metric.aiRecommendation.description}
                            </p>

                            <div className="flex gap-2">
                              {metric.aiRecommendation.tags.map(
                                (tag, tagIndex) => (
                                  <Badge
                                    key={tagIndex}
                                    className="bg-purple-100 text-purple-700 hover:bg-purple-200 text-xs px-2 py-1"
                                  >
                                    {tag}
                                  </Badge>
                                ),
                              )}
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
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
          <TabsTrigger value="performance"> Agent Performance</TabsTrigger>
          <TabsTrigger value="alerts">Service Alerts & Issues</TabsTrigger>
          <TabsTrigger value="logs"> System Logs</TabsTrigger>
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
            <h3 className="text-lg font-semibold">Recent Service Alerts</h3>
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
              <CardTitle> System Activity Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    time: "14:32:15",
                    type: "info",
                    message:
                      "Intake & Routing Agent processed 1,847 tickets with 98.7% auto-categorization",
                    agent: "Intake & Routing Agent",
                    details:
                      "Routed to optimal queues based on team capacity analysis",
                  },
                  {
                    time: "14:28:42",
                    type: "warning",
                    message:
                      "Problem & Major Incident Detection Agent response time increased to 378ms",
                    agent: "Problem & Major Incident Detection Agent",
                    details: "Analyzing correlation patterns across 47 incidents",
                  },
                  {
                    time: "14:25:18",
                    type: "success",
                    message:
                      "Automation Execution Agent completed 127 routine tasks automatically",
                    agent: "Automation Execution Agent",
                    details:
                      "Password resets, software updates, and permission changes executed",
                  },
                  {
                    time: "14:21:03",
                    type: "error",
                    message:
                      "SLA Management & Risk Agent detected 8 tickets at risk of breach",
                    agent: "SLA Management & Risk Agent",
                    details:
                      "Proactive escalation triggered for high-priority tickets",
                  },
                  {
                    time: "14:18:56",
                    type: "info",
                    message:
                      "Follow-up & Triage Agent engaged 23 users for missing information",
                    agent: "Follow-up & Triage Agent",
                    details:
                      "Multi-channel communication initiated to enrich tickets",
                  },
                  {
                    time: "14:15:22",
                    type: "success",
                    message:
                      "Solution Identification Agent provided ranked solutions for 156 tickets",
                    agent: "Solution Identification Agent",
                    details:
                      "Searched historical resolutions and KB articles - 94% accuracy",
                  },
                  {
                    time: "14:12:07",
                    type: "warning",
                    message: "Customer Experience & CSAT Agent detected sentiment drop in 15 tickets",
                    agent: "Customer Experience & CSAT Agent",
                    details:
                      "Supervisor alerts triggered for at-risk customer interactions",
                  },
                  {
                    time: "14:08:41",
                    type: "info",
                    message: "Agent Performance & Coaching Agent completed team metrics analysis",
                    agent: "Agent Performance & Coaching Agent",
                    details:
                      "Identified 3 skill gaps and suggested coaching opportunities",
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