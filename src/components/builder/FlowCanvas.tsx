import React, { useState, useRef, useEffect } from "react";
import {
  PlusIcon,
  ZoomInIcon,
  ZoomOutIcon,
  ExpandIcon,
  PanelLeftIcon,
  PanelRightIcon,
  Code,
  Settings,
  Snowflake,
  ChevronDown,
  Expand,
  Play,
  X,
  Globe,
  Link,
  Info,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Card } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Switch } from "../ui/switch";
import { Slider } from "../ui/slider";

interface Node {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: any;
}

interface Edge {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
}

interface FlowCanvasProps {
  onNodeSelect?: (node: Node | null) => void;
  onEdgeSelect?: (edge: Edge | null) => void;
  showSidebar?: boolean;
  toggleSidebar?: () => void;
  showConfigPanel?: boolean;
  toggleConfigPanel?: () => void;
}

const FlowCanvas: React.FC<FlowCanvasProps> = ({
  onNodeSelect = () => {},
  onEdgeSelect = () => {},
  showSidebar = true,
  toggleSidebar = () => {},
  showConfigPanel = true,
  toggleConfigPanel = () => {},
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState<number>(0.7); // Set default zoom to 70%
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [nodes, setNodes] = useState<Node[]>([
    {
      id: "webhook-1",
      type: "webhook",
      position: { x: 50, y: 50 },
      data: { label: "Webhook", toolMode: true },
    },
    {
      id: "confluence-1",
      type: "confluence",
      position: { x: 50, y: 480 },
      data: { label: "Confluence", toolMode: true },
    },
    {
      id: "sharepoint-1",
      type: "sharepoint",
      position: { x: 50, y: 850 },
      data: { label: "SharePoint", toolMode: true },
    },
    {
      id: "salesforce-1",
      type: "salesforce-crm",
      position: { x: 480, y: 850 },
      data: { label: "Salesforce CRM", toolMode: true },
    },
    {
      id: "postgresql-1",
      type: "postgresql",
      position: { x: 910, y: 850 },
      data: { label: "PostgreSQL", toolMode: true },
    },
    {
      id: "agent-1",
      type: "agent",
      position: { x: 600, y: 120 },
      data: {
        label: "Major Incident Swarmer AI",
        instructions:
          "You are the **Major Incident Swarmer AI**, an ITSM expert for P1 incident response. Your mission: rapidly assemble teams, analyze data, and orchestrate resolution while ensuring SLA compliance.\n\n**Core Functions**\n\nAnalyze incident data and query knowledge bases (Confluence, SharePoint) for runbooks and architecture docs\n\nResearch historical incidents in PostgreSQL for patterns, root causes, and resolution times\n\nIdentify stakeholders via Salesforce CRM based on affected services and locations\n\nAssemble teams in MS Teams/Slack channels with role assignments\n\nCommunicate analysis with citations, timeline estimates, and action items\n\nMonitor SLA progress and trigger escalations at 50%, 75%, 90% thresholds\n\n**Key Behaviors**\n\n**Search Strategy:** Combine service name + [runbook, troubleshooting, architecture]\n\n**Historical Analysis:** Find similar incidents, predict root cause with confidence levels\n\n**Team Assembly:** Include service owners, on-call engineers, business stakeholders, SMEs\n\n**Communication:** Professional, urgent but calm tone with clear action items and citations\n\n**SLA Management:** Track investigation → mitigation → resolution state transitions\n\n**Output Format**\n\nAlways provide: incident summary, business impact, AI insights with confidence levels, relevant documentation links, stakeholder assignments, and SLA countdown.\n\n**Success Criteria**\n\nMinimize resolution time, maintain SLA compliance, ensure stakeholder engagement, and capture organizational learning.",
      },
    },
    {
      id: "teams-slack-1",
      type: "ms-teams-slack",
      position: { x: 1350, y: 50 },
      data: { label: "MS Teams / Slack", toolMode: true },
    },
    {
      id: "observe-1",
      type: "observe",
      position: { x: 1350, y: 350 },
      data: { label: "Observe" },
    },
    {
      id: "output-1",
      type: "output",
      position: { x: 1350, y: 650 },
      data: { label: "Output" },
    },
  ]);

  const [edges, setEdges] = useState<Edge[]>([
    { id: "e-webhook-agent", source: "webhook-1", target: "agent-1" },
    { id: "e-confluence-agent", source: "confluence-1", target: "agent-1" },
    { id: "e-sharepoint-agent", source: "sharepoint-1", target: "agent-1" },
    { id: "e-salesforce-agent", source: "salesforce-1", target: "agent-1" },
    { id: "e-postgresql-agent", source: "postgresql-1", target: "agent-1" },
    { id: "e-agent-teams", source: "agent-1", target: "teams-slack-1" },
    { id: "e-agent-observe", source: "agent-1", target: "observe-1" },
    { id: "e-agent-output", source: "agent-1", target: "output-1" },
  ]);

  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<Edge | null>(null);
  const [draggedNode, setDraggedNode] = useState<string | null>(null);
  const [nodeDragStart, setNodeDragStart] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [connectionStart, setConnectionStart] = useState<string | null>(null);
  const [connectionLine, setConnectionLine] = useState<{
    start: { x: number; y: number };
    end: { x: number; y: number };
  } | null>(null);
  const [animatingEdges, setAnimatingEdges] = useState<Set<string>>(new Set());
  const [animationStartTime, setAnimationStartTime] = useState<number>(0);

  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (e.button === 0 && !target.closest(".node")) {
      // Left click on canvas (not on a node)
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;
      setPan((prevPan) => ({ x: prevPan.x + dx, y: prevPan.y + dy }));
      setDragStart({ x: e.clientX, y: e.clientY });
    }

    // Update connection line when connecting
    if (isConnecting && connectionStart && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const sourceNode = nodes.find((n) => n.id === connectionStart);
      if (sourceNode) {
        const sourceDimensions = getNodeDimensions(sourceNode.type);
        const startX = sourceNode.position.x + sourceDimensions.width;
        const startY = sourceNode.position.y + sourceDimensions.height / 2; // Node center height
        const endX = (e.clientX - rect.left - pan.x) / zoom;
        const endY = (e.clientY - rect.top - pan.y) / zoom;

        setConnectionLine({
          start: { x: startX, y: startY },
          end: { x: endX, y: endY },
        });
      }
    }
  };

  const handleCanvasMouseUp = () => {
    setIsDragging(false);
    // Cancel connection if clicking on empty canvas
    if (isConnecting) {
      setIsConnecting(false);
      setConnectionStart(null);
      setConnectionLine(null);
    }
  };

  const handleNodeClick = (node: Node) => (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedNode(node);
    setSelectedEdge(null);

    // Check if this is a trigger or tool node connected to agent input
    const isTriggerOrTool = [
      "webhook",
      "confluence",
      "sharepoint",
      "salesforce-crm",
      "postgresql",
      "ms-teams-slack",
    ].includes(node.type);

    if (isTriggerOrTool) {
      // Find edges connected to this node that go to an agent
      const connectedEdges = edges.filter((edge) => {
        const targetNode = nodes.find((n) => n.id === edge.target);
        return edge.source === node.id && targetNode?.type === "agent";
      });

      if (connectedEdges.length > 0) {
        const edgeIds = new Set(connectedEdges.map((edge) => edge.id));
        setAnimatingEdges(edgeIds);
        setAnimationStartTime(Date.now());
      }
    }

    // Check if this is an agent node - animate output connections
    if (node.type === "agent") {
      // Find edges connected from this agent to output nodes
      const outputEdges = edges.filter((edge) => {
        const targetNode = nodes.find((n) => n.id === edge.target);
        return (
          edge.source === node.id &&
          ["ms-teams-slack", "observe", "output"].includes(
            targetNode?.type || "",
          )
        );
      });

      if (outputEdges.length > 0) {
        const edgeIds = new Set(outputEdges.map((edge) => edge.id));
        setAnimatingEdges(edgeIds);
        setAnimationStartTime(Date.now());
      }
    }

    // Don't trigger configuration panel on node click
    // onNodeSelect(node);
  };

  const handleConnectionPointMouseDown =
    (nodeId: string, isOutputParam: boolean) => (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();

      // Start connection
      setIsConnecting(true);
      setConnectionStart(nodeId);

      // Initialize connection line
      const sourceNode = nodes.find((n) => n.id === nodeId);
      if (sourceNode && canvasRef.current) {
        const sourceDimensions = getNodeDimensions(sourceNode.type);
        const startX =
          sourceNode.position.x + (isOutputParam ? sourceDimensions.width : 0);
        const startY = sourceNode.position.y + sourceDimensions.height / 2;
        setConnectionLine({
          start: { x: startX, y: startY },
          end: { x: startX, y: startY },
        });
      }

      // Add global mouse move and mouse up listeners
      const handleGlobalMouseMove = (globalE: MouseEvent) => {
        if (canvasRef.current) {
          const rect = canvasRef.current.getBoundingClientRect();
          const sourceNode = nodes.find((n) => n.id === nodeId);
          if (sourceNode) {
            const sourceDimensions = getNodeDimensions(sourceNode.type);
            const startX =
              sourceNode.position.x +
              (isOutputParam ? sourceDimensions.width : 0);
            const startY = sourceNode.position.y + sourceDimensions.height / 2;
            const endX = (globalE.clientX - rect.left - pan.x) / zoom;
            const endY = (globalE.clientY - rect.top - pan.y) / zoom;

            setConnectionLine({
              start: { x: startX, y: startY },
              end: { x: endX, y: endY },
            });
          }
        }
      };

      const handleGlobalMouseUp = (globalE: MouseEvent) => {
        // Check if we're over a connection point
        const target = globalE.target as HTMLElement;
        const connectionPoint = target.closest(".connection-point");

        if (connectionPoint && canvasRef.current) {
          // Find the node this connection point belongs to
          const nodeElement = connectionPoint.closest(".node");
          if (nodeElement) {
            const targetNodeId = nodeElement.getAttribute("data-node-id");
            if (targetNodeId && targetNodeId !== nodeId) {
              // Create connection - determine source and target based on isOutputParam
              const newEdge: Edge = isOutputParam
                ? {
                    id: `e${nodeId}-${targetNodeId}`,
                    source: nodeId,
                    target: targetNodeId,
                  }
                : {
                    id: `e${targetNodeId}-${nodeId}`,
                    source: targetNodeId,
                    target: nodeId,
                  };

              // Check if edge already exists
              const edgeExists = edges.some(
                (edge) =>
                  (edge.source === newEdge.source &&
                    edge.target === newEdge.target) ||
                  (edge.source === newEdge.target &&
                    edge.target === newEdge.source),
              );

              if (!edgeExists) {
                setEdges((prev) => [...prev, newEdge]);
              }
            }
          }
        }

        // Clean up
        setIsConnecting(false);
        setConnectionStart(null);
        setConnectionLine(null);
        document.removeEventListener("mousemove", handleGlobalMouseMove);
        document.removeEventListener("mouseup", handleGlobalMouseUp);
      };

      document.addEventListener("mousemove", handleGlobalMouseMove);
      document.addEventListener("mouseup", handleGlobalMouseUp);
    };

  const handleConnectionPointMouseUp =
    (nodeId: string, isOutputParam: boolean) => (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();

      if (isConnecting && connectionStart && connectionStart !== nodeId) {
        // Complete connection
        const newEdge: Edge = {
          id: `e${connectionStart}-${nodeId}`,
          source: connectionStart,
          target: nodeId,
        };

        // Check if edge already exists
        const edgeExists = edges.some(
          (edge) =>
            (edge.source === newEdge.source &&
              edge.target === newEdge.target) ||
            (edge.source === newEdge.target && edge.target === newEdge.source),
        );

        if (!edgeExists) {
          setEdges((prev) => [...prev, newEdge]);
        }
      }

      // Reset connection state
      setIsConnecting(false);
      setConnectionStart(null);
      setConnectionLine(null);
    };

  const handleDeleteNode = (nodeId: string) => {
    setNodes((prev) => prev.filter((node) => node.id !== nodeId));
    setEdges((prev) =>
      prev.filter((edge) => edge.source !== nodeId && edge.target !== nodeId),
    );
    if (selectedNode?.id === nodeId) {
      setSelectedNode(null);
      onNodeSelect(null);
    }
  };

  const handleDeleteEdge = (edgeId: string) => {
    setEdges((prev) => prev.filter((edge) => edge.id !== edgeId));
    if (selectedEdge?.id === edgeId) {
      setSelectedEdge(null);
      onEdgeSelect(null);
    }
  };

  const handleNodeMouseDown = (node: Node) => (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    // Don't start dragging if clicking on connection points or control buttons
    if (
      target.closest(".connection-point") ||
      target.closest(".node-controls")
    ) {
      return;
    }
    e.stopPropagation();
    setDraggedNode(node.id);
    setNodeDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleNodeMouseMove = (e: React.MouseEvent) => {
    if (draggedNode) {
      const dx = (e.clientX - nodeDragStart.x) / zoom;
      const dy = (e.clientY - nodeDragStart.y) / zoom;

      setNodes((prevNodes) =>
        prevNodes.map((node) =>
          node.id === draggedNode
            ? {
                ...node,
                position: { x: node.position.x + dx, y: node.position.y + dy },
              }
            : node,
        ),
      );
      setNodeDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleNodeMouseUp = () => {
    setDraggedNode(null);
  };

  const handleCanvasDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const componentData = e.dataTransfer.getData("component");
    if (componentData) {
      const component = JSON.parse(componentData);
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) {
        const x = (e.clientX - rect.left - pan.x) / zoom;
        const y = (e.clientY - rect.top - pan.y) / zoom;

        const newNode: Node = {
          id: `node-${Date.now()}`,
          type: component.id,
          position: { x, y },
          data: {
            label: component.name,
            description: component.description || "",
          },
        };

        setNodes((prevNodes) => [...prevNodes, newNode]);
      }
    }
  };

  const handleCanvasDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleEdgeClick = (edge: Edge) => (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedEdge(edge);
    setSelectedNode(null);
    onEdgeSelect(edge);
  };

  const handleCanvasClick = () => {
    setSelectedNode(null);
    setSelectedEdge(null);
    setIsConnecting(false);
    setConnectionStart(null);
    setConnectionLine(null);
    setAnimatingEdges(new Set());
    onNodeSelect(null);
    onEdgeSelect(null);
  };

  const zoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.1, 2));
  };

  const zoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.1, 0.5));
  };

  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Get node color based on type
  const getNodeColor = (type: string) => {
    switch (type) {
      case "agent":
        return "border-red-300 hover:border-red-400";
      case "chat-input":
        return "border-blue-300 hover:border-blue-400";
      case "chat-output":
        return "border-blue-300 hover:border-blue-400";
      case "language-model":
        return "border-purple-300 hover:border-purple-400";
      case "structured-output":
        return "border-green-300 hover:border-green-400";
      case "parser":
        return "border-orange-300 hover:border-orange-400";
      case "input":
        return "border-green-300 hover:border-green-400";
      case "output":
        return "border-purple-300 hover:border-purple-400";
      case "languageModel":
        return "border-amber-300 hover:border-amber-400";
      case "tool":
        return "border-red-300 hover:border-red-400";
      default:
        return "border-gray-300 hover:border-gray-400";
    }
  };

  // Get node dimensions helper function
  const getNodeDimensions = (nodeType: string) => {
    switch (nodeType) {
      case "agent":
        return { width: 500, height: 400 };
      case "language-model":
      case "languageModel":
        return { width: 400, height: 400 };
      case "structured-output":
      case "parser":
        return { width: 380, height: 300 };
      default:
        return { width: 350, height: 200 };
    }
  };

  // Draw edges between nodes
  const renderEdges = () => {
    return (
      <svg
        className="absolute top-0 left-0 pointer-events-none"
        style={{
          zIndex: 1,
          width: "100%",
          height: "100%",
          overflow: "visible",
        }}
      >
        <defs>
          <linearGradient
            id="connectionGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient
            id="webhookConnectionGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#fb923c" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.8" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
          </marker>
          <marker
            id="flowArrow"
            markerWidth="8"
            markerHeight="6"
            refX="7"
            refY="3"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <polygon points="0 0, 8 3, 0 6" fill="#10b981" />
          </marker>
        </defs>
        {edges.map((edge) => {
          const sourceNode = nodes.find((n) => n.id === edge.source);
          const targetNode = nodes.find((n) => n.id === edge.target);

          if (!sourceNode || !targetNode) return null;

          // Get node dimensions
          const sourceDimensions = getNodeDimensions(sourceNode.type);
          const targetDimensions = getNodeDimensions(targetNode.type);

          // Calculate connection points
          let sourceX, sourceY, targetX, targetY;

          if (targetNode.type === "agent") {
            // For connections to agent node
            if (sourceNode.type === "webhook") {
              // Webhook connects to input (blue) connection point at the top
              sourceX = sourceNode.position.x + sourceDimensions.width;
              sourceY = sourceNode.position.y + sourceDimensions.height / 2;
              targetX = targetNode.position.x;
              targetY = targetNode.position.y + 50; // Updated to match new input position
            } else {
              // Other tools connect to tools (teal) connection point
              sourceX = sourceNode.position.x + sourceDimensions.width;
              sourceY = sourceNode.position.y + sourceDimensions.height / 2;
              targetX = targetNode.position.x;
              targetY = targetNode.position.y + 300;
            }
          } else if (sourceNode.type === "agent") {
            // For connections from agent node, use output connection point
            sourceX = sourceNode.position.x + sourceDimensions.width;
            sourceY = sourceNode.position.y + sourceDimensions.height / 2;
            targetX = targetNode.position.x;
            targetY = targetNode.position.y + targetDimensions.height / 2;
          } else {
            // Default connection points for other nodes
            sourceX = sourceNode.position.x + sourceDimensions.width;
            sourceY = sourceNode.position.y + sourceDimensions.height / 2;
            targetX = targetNode.position.x;
            targetY = targetNode.position.y + targetDimensions.height / 2;
          }

          // Ensure valid coordinates
          if (
            isNaN(sourceX) ||
            isNaN(sourceY) ||
            isNaN(targetX) ||
            isNaN(targetY)
          ) {
            console.warn(`Invalid coordinates for edge ${edge.id}:`, {
              sourceX,
              sourceY,
              targetX,
              targetY,
            });
            return null;
          }

          // Create a smooth curved path
          const dx = targetX - sourceX;
          const dy = targetY - sourceY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const controlPointOffset = Math.max(100, distance * 0.3);

          const path = `M ${sourceX} ${sourceY} C ${sourceX + controlPointOffset} ${sourceY}, ${targetX - controlPointOffset} ${targetY}, ${targetX} ${targetY}`;

          const isSelected = selectedEdge?.id === edge.id;
          const isAnimating = animatingEdges.has(edge.id);
          const isWebhookConnection =
            edge.source === "webhook-1" || edge.target === "webhook-1";
          const strokeColor = isSelected
            ? "#3b82f6"
            : isWebhookConnection
              ? "url(#webhookConnectionGradient)"
              : "url(#connectionGradient)";

          return (
            <g key={edge.id}>
              {/* Shadow/glow effect */}
              <path
                d={path}
                stroke={isSelected ? "#3b82f6" : "#94a3b8"}
                strokeWidth={isSelected ? 4 : 3}
                fill="none"
                opacity={isAnimating ? "0.1" : "0.3"}
                filter="url(#glow)"
                className="pointer-events-none"
                vectorEffect="non-scaling-stroke"
              />
              {/* Main connection line */}
              <path
                d={path}
                stroke={strokeColor}
                strokeWidth={isSelected ? 3 : 2}
                fill="none"
                markerEnd="url(#arrowhead)"
                className="pointer-events-auto cursor-pointer hover:stroke-blue-400 transition-all duration-200"
                onClick={handleEdgeClick(edge)}
                vectorEffect="non-scaling-stroke"
                pointerEvents="stroke"
                style={{
                  strokeDasharray: isAnimating
                    ? "8,4"
                    : isSelected
                      ? "none"
                      : "none",
                  opacity: isAnimating ? 0.6 : 1,
                  filter: isSelected
                    ? "drop-shadow(0 0 6px rgba(59, 130, 246, 0.5))"
                    : "none",
                }}
              />

              {/* Animated flow arrow */}
              {animatingEdges.has(edge.id) && (
                <AnimatedFlowArrow path={path} startTime={animationStartTime} />
              )}

              {/* Delete button when selected */}
              {isSelected && (
                <g>
                  <circle
                    cx={(sourceX + targetX) / 2}
                    cy={(sourceY + targetY) / 2}
                    r="10"
                    fill="#ef4444"
                    stroke="white"
                    strokeWidth="2"
                    className="pointer-events-auto cursor-pointer hover:fill-red-600 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteEdge(edge.id);
                    }}
                    style={{
                      filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))",
                    }}
                  />
                  <text
                    x={(sourceX + targetX) / 2}
                    y={(sourceY + targetY) / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="white"
                    fontSize="12"
                    fontWeight="bold"
                    className="pointer-events-none"
                  >
                    ×
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>
    );
  };

  return (
    <div className="relative flex flex-col w-full h-full bg-background">
      {/* Canvas toolbar */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 flex items-center gap-2 bg-background/80 backdrop-blur-sm p-1 rounded-lg border shadow-sm">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={zoomIn}>
                <ZoomInIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Zoom In</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={zoomOut}>
                <ZoomOutIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Zoom Out</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={resetView}>
                <ExpandIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Reset View</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="text-xs text-muted-foreground px-2">
          {Math.round(zoom * 100)}%
        </div>

        <div className="h-4 w-px bg-border mx-1" />

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                <PanelLeftIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {showSidebar ? "Hide" : "Show"} Component Sidebar
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={toggleConfigPanel}>
                <PanelRightIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {showConfigPanel ? "Hide" : "Show"} Configuration Panel
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Canvas area */}
      <div
        ref={canvasRef}
        className="flex-1 overflow-hidden relative"
        style={{
          backgroundColor: "#f8f9fa",
          backgroundImage:
            "radial-gradient(circle, #d1d5db 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
        onMouseDown={handleCanvasMouseDown}
        onMouseMove={(e) => {
          handleCanvasMouseMove(e);
          handleNodeMouseMove(e);
        }}
        onMouseUp={() => {
          handleCanvasMouseUp();
          handleNodeMouseUp();
        }}
        onMouseLeave={() => {
          handleCanvasMouseUp();
          handleNodeMouseUp();
        }}
        onClick={handleCanvasClick}
        onDrop={handleCanvasDrop}
        onDragOver={handleCanvasDragOver}
      >
        <div
          className="absolute w-full h-full"
          style={{
            transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
            transformOrigin: "0 0",
          }}
        >
          {/* Grid background */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Grid is provided by the bg-dot-pattern class */}
          </div>

          {/* Render edges */}
          <div className="absolute inset-0" style={{ zIndex: 1 }}>
            {renderEdges()}
          </div>

          {/* Render connection line when connecting */}
          {isConnecting && connectionLine && (
            <svg
              className="absolute top-0 left-0 pointer-events-none"
              style={{
                zIndex: 100,
                width: "100%",
                height: "100%",
                overflow: "visible",
              }}
            >
              <defs>
                <linearGradient
                  id="connectingGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
                </linearGradient>
                <marker
                  id="connectingArrowhead"
                  markerWidth="10"
                  markerHeight="7"
                  refX="9"
                  refY="3.5"
                  orient="auto"
                  markerUnits="strokeWidth"
                >
                  <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
                </marker>
              </defs>
              {/* Curved connection line */}
              <path
                d={(() => {
                  const dx = connectionLine.end.x - connectionLine.start.x;
                  const dy = connectionLine.end.y - connectionLine.start.y;
                  const distance = Math.sqrt(dx * dx + dy * dy);
                  const controlPointOffset = Math.max(100, distance * 0.3);
                  return `M ${connectionLine.start.x} ${connectionLine.start.y} C ${connectionLine.start.x + controlPointOffset} ${connectionLine.start.y}, ${connectionLine.end.x - controlPointOffset} ${connectionLine.end.y}, ${connectionLine.end.x} ${connectionLine.end.y}`;
                })()}
                stroke="url(#connectingGradient)"
                strokeWidth={4}
                strokeDasharray="8,4"
                fill="none"
                markerEnd="url(#connectingArrowhead)"
                className="animate-pulse"
                vectorEffect="non-scaling-stroke"
                pointerEvents="none"
                style={{
                  filter: "drop-shadow(0 0 8px rgba(59, 130, 246, 0.6))",
                }}
              />
            </svg>
          )}

          {/* Render indicator blocks */}
          {nodes.map((node) => {
            const shouldShowIndicator = [
              "webhook",
              "confluence",
              "sharepoint",
              "salesforce-crm",
              "postgresql",
              "ms-teams-slack",
              "output",
              "observe",
            ].includes(node.type);

            if (!shouldShowIndicator) return null;

            const isWebhook = node.type === "webhook";
            const isOutput = node.type === "output";
            const isObserve = node.type === "observe";
            const isMSTeams = node.type === "ms-teams-slack";
            let indicatorText, bgColor, textColor, borderColor;

            if (isWebhook) {
              indicatorText = "Trigger";
              bgColor = "#E79B04";
              textColor = "#FFFFFF";
              borderColor = "#B8860B";
            } else if (isOutput) {
              indicatorText = "Output";
              bgColor = "#229F54";
              textColor = "#FFFFFF";
              borderColor = "#2563EB";
            } else if (isObserve) {
              indicatorText = "Processing";
              bgColor = "#E79B04";
              textColor = "#FFFFFF";
              borderColor = "#B8860B";
            } else if (isMSTeams) {
              indicatorText = "Channel output";
              bgColor = "#229F54";
              textColor = "#FFFFFF";
              borderColor = "#2563EB";
            } else {
              indicatorText = "Tool";
              bgColor = "#2563EB";
              textColor = "#FFFFFF";
              borderColor = "#2563EB";
            }

            // Use fixed heights that match the actual component card heights
            let componentHeight = 200; // Base height for all components

            if (node.data.toolMode) {
              switch (node.type) {
                case "webhook":
                  componentHeight = 280;
                  break;
                case "confluence":
                  componentHeight = 240;
                  break;
                case "sharepoint":
                  componentHeight = 240;
                  break;
                case "salesforce-crm":
                  componentHeight = 240;
                  break;
                case "postgresql":
                  componentHeight = 240;
                  break;
                case "ms-teams-slack":
                  componentHeight = 240;
                  break;
                default:
                  componentHeight = 200;
              }
            } else {
              // Heights for non-tool mode components
              switch (node.type) {
                case "webhook":
                  componentHeight = 200;
                  break;
                case "confluence":
                case "sharepoint":
                case "salesforce-crm":
                case "postgresql":
                case "ms-teams-slack":
                  componentHeight = 200;
                  break;
                case "output":
                  componentHeight = 200;
                  break;
                case "observe":
                  componentHeight = 200;
                  break;
                default:
                  componentHeight = 200;
              }
            }

            return (
              <div
                key={`indicator-${node.id}`}
                className={`absolute px-2 text-xs font-medium border`}
                style={{
                  left: `${node.position.x - 20}px`,
                  top: `${node.position.y}px`,
                  transform: "rotate(180deg)",
                  borderTopRightRadius: "8px",
                  borderBottomRightRadius: "8px",
                  borderLeft: "none",
                  writingMode: "vertical-rl",
                  textOrientation: "sideways",
                  height: `100px`,
                  width: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 4,
                  backgroundColor: bgColor,
                  color: textColor,
                  borderColor: borderColor,
                }}
              >
                {indicatorText}
              </div>
            );
          })}

          {/* Render nodes */}
          {nodes.map((node) => (
            <NodeComponent
              key={node.id}
              node={node}
              isSelected={selectedNode?.id === node.id}
              isDragging={draggedNode === node.id}
              isConnecting={isConnecting}
              connectionStart={connectionStart}
              onNodeClick={handleNodeClick}
              onNodeMouseDown={handleNodeMouseDown}
              onConnectionPointMouseDown={handleConnectionPointMouseDown}
              onConnectionPointMouseUp={handleConnectionPointMouseUp}
              onDeleteNode={handleDeleteNode}
              onToolModeToggle={(nodeId: string) => {
                setNodes((prevNodes) =>
                  prevNodes.map((n) =>
                    n.id === nodeId
                      ? {
                          ...n,
                          data: { ...n.data, toolMode: !n.data.toolMode },
                        }
                      : n,
                  ),
                );
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Node Component with updated design
interface NodeComponentProps {
  node: Node;
  isSelected: boolean;
  isDragging: boolean;
  isConnecting: boolean;
  connectionStart: string | null;
  onNodeClick: (node: Node) => (e: React.MouseEvent) => void;
  onNodeMouseDown: (node: Node) => (e: React.MouseEvent) => void;
  onConnectionPointMouseDown: (
    nodeId: string,
    isOutput: boolean,
  ) => (e: React.MouseEvent) => void;
  onConnectionPointMouseUp: (
    nodeId: string,
    isOutput: boolean,
  ) => (e: React.MouseEvent) => void;
  onDeleteNode: (nodeId: string) => void;
  onToolModeToggle: (nodeId: string) => void;
}

const NodeComponent: React.FC<NodeComponentProps> = ({
  node,
  isSelected,
  isDragging,
  isConnecting,
  connectionStart,
  onNodeClick,
  onNodeMouseDown,
  onConnectionPointMouseDown,
  onConnectionPointMouseUp,
  onDeleteNode,
  onToolModeToggle,
}) => {
  const [showControls, setShowControls] = useState(false);
  const [showChatInputModal, setShowChatInputModal] = useState(false);
  const [showControlsOverlay, setShowControlsOverlay] = useState(false);
  const [showAgentControlsModal, setShowAgentControlsModal] = useState(false);
  const [showChatInputControlsModal, setShowChatInputControlsModal] =
    useState(false);
  const [showLanguageModelControlsModal, setShowLanguageModelControlsModal] =
    useState(false);
  const [showNodeExpandModal, setShowNodeExpandModal] = useState(false);
  const [nodeExpandText, setNodeExpandText] = useState("");
  const [showAgentInstructionModal, setShowAgentInstructionModal] =
    useState(false);
  const [agentInstructionText, setAgentInstructionText] = useState("");

  const getNodeColor = (type: string) => {
    switch (type) {
      case "agent":
        return "border-red-300 hover:border-red-400";
      case "chat-input":
        return "border-blue-300 hover:border-blue-400";
      case "chat-output":
        return "border-blue-300 hover:border-blue-400";
      case "language-model":
        return "border-purple-300 hover:border-purple-400";
      case "structured-output":
        return "border-green-300 hover:border-green-400";
      case "parser":
        return "border-orange-300 hover:border-orange-400";
      case "input":
        return "border-green-300 hover:border-green-400";
      case "output":
        return "border-purple-300 hover:border-purple-400";
      case "languageModel":
        return "border-amber-300 hover:border-amber-400";
      case "tool":
        return "border-red-300 hover:border-red-400";
      default:
        return "border-gray-300 hover:border-gray-400";
    }
  };

  const renderAgentNode = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Agent Name</label>
          <Info className="h-3 w-3 text-muted-foreground" />
        </div>
        <Input defaultValue="Major Incident Swarmer AI" className="h-10" />
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Agent Instructions</label>
          <Info className="h-3 w-3 text-muted-foreground" />
        </div>
        <div className="relative">
          <Textarea
            placeholder="Agent instructions..."
            defaultValue="You are the **Major Incident Swarmer AI**, an ITSM expert for P1 incident response. Your mission: rapidly assemble teams, analyze data, and orchestrate resolution while ensuring SLA compliance.\n\n**Core Functions**\n\nAnalyze incident data and query knowledge bases (Confluence, SharePoint) for runbooks and architecture docs\n\nResearch historical incidents in PostgreSQL for patterns, root causes, and resolution times\n\nIdentify stakeholders via Salesforce CRM based on affected services and locations\n\nAssemble teams in MS Teams/Slack channels with role assignments\n\nCommunicate analysis with citations, timeline estimates, and action items\n\nMonitor SLA progress and trigger escalations at 50%, 75%, 90% thresholds\n\n**Key Behaviors**\n\n**Search Strategy:** Combine service name + [runbook, troubleshooting, architecture]\n\n**Historical Analysis:** Find similar incidents, predict root cause with confidence levels\n\n**Team Assembly:** Include service owners, on-call engineers, business stakeholders, SMEs\n\n**Communication:** Professional, urgent but calm tone with clear action items and citations\n\n**SLA Management:** Track investigation → mitigation → resolution state transitions\n\n**Output Format**\n\nAlways provide: incident summary, business impact, AI insights with confidence levels, relevant documentation links, stakeholder assignments, and SLA countdown.\n\n**Success Criteria**\n\nMinimize resolution time, maintain SLA compliance, ensure stakeholder engagement, and capture organizational learning."
            className="min-h-[120px] pr-8 resize-none overflow-y-auto"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-6 w-6"
            onClick={() => {
              setAgentInstructionText(
                'You are the **Major Incident Swarmer AI**, an ITSM expert for P1 incident response. Your mission: rapidly assemble teams, analyze data, and orchestrate resolution while ensuring SLA compliance.\n\n**Core Functions**\n\n1. **Analyze** incident data and query knowledge bases (Confluence, SharePoint) for runbooks and architecture docs\n2. **Research** historical incidents in PostgreSQL for patterns, root causes, and resolution times\n3. **Identify** stakeholders via Salesforce CRM based on affected services and locations\n4. **Assemble** teams in MS Teams/Slack channels with role assignments\n5. **Communicate** analysis with citations, timeline estimates, and action items\n6. **Monitor** SLA progress and trigger escalations at 50%, 75%, 90% thresholds\n\n**Key Behaviors**\n\n• **Search Strategy:** Combine service name + ["runbook", "troubleshooting", "architecture"]\n• **Historical Analysis:** Find similar incidents, predict root cause with confidence levels\n• **Team Assembly:** Include service owners, on-call engineers, business stakeholders, SMEs\n• **Communication:** Professional, urgent but calm tone with clear action items and citations\n• **SLA Management:** Track investigation → mitigation → resolution state transitions\n\n**Output Format**\n\nAlways provide: incident summary, business impact, AI insights with confidence levels, relevant documentation links, stakeholder assignments, and SLA countdown.\n\n**Success Criteria**\n\nMinimize resolution time, maintain SLA compliance, ensure stakeholder engagement, and capture organizational learning.',
              );
              setShowAgentInstructionModal(true);
            }}
          >
            <Expand className="h-3 w-3" />
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Tools</label>
          <Info className="h-3 w-3 text-muted-foreground" />
          <div className="w-2 h-2 bg-teal-500 rounded-full ml-auto" />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Input</label>
          <Info className="h-3 w-3 text-muted-foreground" />
          <div className="w-2 h-2 bg-blue-500 rounded-full ml-auto" />
        </div>
        <div className="bg-muted/50 rounded-lg p-3 text-sm text-muted-foreground flex items-center gap-2">
          <div className="w-4 h-4 bg-muted rounded flex items-center justify-center">
            <span className="text-xs">📄</span>
          </div>
          Receiving input
        </div>
      </div>
    </div>
  );

  const renderChatInputNode = () => (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        Get chat inputs from the Playground.
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Input Text</label>
          <Info className="h-3 w-3 text-muted-foreground" />
        </div>
        <div className="relative">
          <Input
            placeholder="Amazon"
            defaultValue="Amazon"
            className="h-12 pr-8 text-base"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1/2 right-2 transform -translate-y-1/2 h-6 w-6"
            onClick={() => {
              setNodeExpandText("Amazon");
              setShowNodeExpandModal(true);
            }}
          >
            <Expand className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );

  const renderLanguageModelNode = () => (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        Runs a language model given a specified provider.
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Model Provider</label>
          <Info className="h-3 w-3 text-muted-foreground" />
        </div>
        <Select defaultValue="openai">
          <SelectTrigger className="h-10">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded-sm flex items-center justify-center">
                <span className="text-white text-xs font-bold">O</span>
              </div>
              <SelectValue />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="openai">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded-sm flex items-center justify-center">
                  <span className="text-white text-xs font-bold">O</span>
                </div>
                OpenAI
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Model Name</label>
          <Info className="h-3 w-3 text-muted-foreground" />
        </div>
        <Select defaultValue="gpt-4o-mini">
          <SelectTrigger className="h-10">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gpt-4o-mini">gpt-4o-mini</SelectItem>
            <SelectItem value="gpt-4o">gpt-4o</SelectItem>
            <SelectItem value="gpt-3.5-turbo">gpt-3.5-turbo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">OpenAI API Key</label>
          <Info className="h-3 w-3 text-muted-foreground" />
        </div>
        <div className="relative">
          <Input
            className="h-10 pr-16"
            placeholder="Enter API key"
            type="password"
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <Link className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Input</label>
          <Info className="h-3 w-3 text-muted-foreground" />
          <div className="w-2 h-2 bg-blue-500 rounded-full ml-auto" />
        </div>
        <div className="relative">
          <Input className="h-10 pr-8" placeholder="" />
          <Globe className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
      </div>
    </div>
  );

  const renderChatOutputNode = () => (
    <div className="space-y-4">
      <div className="border-t pt-4">
        <div className="bg-muted/50 rounded-lg p-3 text-sm text-muted-foreground">
          Share initial analysis in the created channel, with appropriate
          citations and source references
        </div>
      </div>
    </div>
  );

  const renderStructuredOutputNode = () => (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        Parse and format agent responses into structured data formats.
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Output Schema</label>
          <Info className="h-3 w-3 text-muted-foreground" />
        </div>
        <div className="relative">
          <Textarea
            placeholder="Define JSON schema..."
            defaultValue='{"type": "object", "properties": {"title": {"type": "string"}}}'
            className="min-h-[60px] pr-8 font-mono text-xs"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-6 w-6"
            onClick={() => {
              setNodeExpandText(
                '{"type": "object", "properties": {"title": {"type": "string"}}}',
              );
              setShowNodeExpandModal(true);
            }}
          >
            <Expand className="h-3 w-3" />
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Format</label>
          <Info className="h-3 w-3 text-muted-foreground" />
        </div>
        <Select defaultValue="json">
          <SelectTrigger className="h-10">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="json">JSON</SelectItem>
            <SelectItem value="yaml">YAML</SelectItem>
            <SelectItem value="xml">XML</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Input</label>
          <Info className="h-3 w-3 text-muted-foreground" />
          <div className="w-2 h-2 bg-blue-500 rounded-full ml-auto" />
        </div>
        <div className="bg-muted/50 rounded-lg p-3 text-sm text-muted-foreground flex items-center gap-2">
          <div className="w-4 h-4 bg-muted rounded flex items-center justify-center">
            <span className="text-xs">📋</span>
          </div>
          Receiving raw text data
        </div>
      </div>
    </div>
  );

  const renderParserNode = () => (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        Extract and parse specific data from text using patterns and rules.
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Parser Type</label>
          <Info className="h-3 w-3 text-muted-foreground" />
        </div>
        <Select defaultValue="regex">
          <SelectTrigger className="h-10">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="regex">Regular Expression</SelectItem>
            <SelectItem value="json">JSON Parser</SelectItem>
            <SelectItem value="csv">CSV Parser</SelectItem>
            <SelectItem value="xml">XML Parser</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Pattern</label>
          <Info className="h-3 w-3 text-muted-foreground" />
        </div>
        <div className="relative">
          <Input
            placeholder="Enter parsing pattern..."
            defaultValue="/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g"
            className="h-10 pr-8 font-mono text-xs"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1/2 right-2 transform -translate-y-1/2 h-6 w-6"
            onClick={() => {
              setNodeExpandText(
                "/\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b/g",
              );
              setShowNodeExpandModal(true);
            }}
          >
            <Expand className="h-3 w-3" />
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Input</label>
          <Info className="h-3 w-3 text-muted-foreground" />
          <div className="w-2 h-2 bg-blue-500 rounded-full ml-auto" />
        </div>
        <div className="bg-muted/50 rounded-lg p-3 text-sm text-muted-foreground flex items-center gap-2">
          <div className="w-4 h-4 bg-muted rounded flex items-center justify-center">
            <span className="text-xs">🔍</span>
          </div>
          Receiving text to parse
        </div>
      </div>
    </div>
  );

  const renderWebhookNode = () => (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        Webhook to be called on creation of Major incident
      </div>

      {node.data.toolMode && (
        <div className="border-t pt-4">
          <div className="text-sm font-medium mb-3">Input payload</div>

          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">
                Major incident ticket id
              </label>
              <Input className="h-8" placeholder="" />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">
                Service impacted
              </label>
              <Input className="h-8" placeholder="Enter service name" />
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderConfluenceNode = () => (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        Query the knowledge base to find any documents, relevant runbooks, or
        architecture diagrams around the major incident reported
      </div>

      {node.data.toolMode && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Query</label>
            <Info className="h-3 w-3 text-muted-foreground" />
          </div>
          <Input
            defaultValue="{knowledge_query}"
            className="h-10 font-mono text-sm"
          />
        </div>
      )}
    </div>
  );

  const renderSharePointNode = () => (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        Query SharePoint knowledge base to find relevant documents and
        information
      </div>

      {node.data.toolMode && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Query</label>
            <Info className="h-3 w-3 text-muted-foreground" />
          </div>
          <Input
            defaultValue="{knowledge_query}"
            className="h-10 font-mono text-sm"
          />
        </div>
      )}
    </div>
  );

  const renderSalesforceCRMNode = () => (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        Lookup CRM for team members on schedule and stakeholders as per impacted
        services
      </div>

      {node.data.toolMode && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Query</label>
            <Info className="h-3 w-3 text-muted-foreground" />
          </div>
          <Input
            defaultValue="{knowledge_query} and {Impacted_Geographies}"
            className="h-10 font-mono text-sm"
          />
        </div>
      )}
    </div>
  );

  const renderPostgreSQLNode = () => (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        Query database (PostgreSQL) to fetch historical incident data, patterns,
        and resolutions for similar past incidents
      </div>

      {node.data.toolMode && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Database Query</label>
            <Info className="h-3 w-3 text-muted-foreground" />
          </div>
          <Input
            defaultValue="{Database_Query}"
            className="h-10 font-mono text-sm"
          />
        </div>
      )}
    </div>
  );

  const renderMSTeamsSlackNode = () => (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        Creates an MS Teams / Slack channel with the identified set of humans
        agents and stakeholders
      </div>

      {node.data.toolMode && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Users List</label>
            <Info className="h-3 w-3 text-muted-foreground" />
          </div>
          <Input
            defaultValue="{Users_list []}"
            className="h-10 font-mono text-sm"
          />
        </div>
      )}
    </div>
  );

  const renderObserveNode = () => (
    <div className="space-y-4">
      <div className="border-t pt-4">
        <div className="bg-muted/50 rounded-lg p-3 text-sm text-muted-foreground">
          Monitoring (wait / delay / observe) set KPIs including State Time SLAs
          for state movements (investigating → mitigating → resolved) and
          Resolution time SLAs. Escalate (observe → trigger) in case of
          exceptions and breaches.
        </div>
      </div>
    </div>
  );

  const renderDefaultNode = () => (
    <div className="space-y-2">
      {node.data.description && (
        <div className="text-xs text-muted-foreground mb-2 line-clamp-2">
          {node.data.description}
        </div>
      )}

      {node.type === "language-model" && (
        <div className="text-xs text-muted-foreground">
          {node.data.provider || "OpenAI"} / {node.data.model || "gpt-4o"}
        </div>
      )}
    </div>
  );

  return (
    <div
      className={`absolute node cursor-move rounded-lg shadow-lg ${node.type === "webhook" ? getNodeColor(node.type) : `border-2 bg-white ${getNodeColor(node.type)}`} ${isSelected ? "ring-2 ring-primary shadow-xl" : ""} ${
        isDragging ? "opacity-80" : ""
      }`}
      data-node-id={node.id}
      style={{
        left: `${node.position.x}px`,
        top: `${node.position.y}px`,
        width:
          node.type === "agent"
            ? "500px"
            : node.type === "language-model" || node.type === "languageModel"
              ? "400px"
              : node.type === "structured-output" || node.type === "parser"
                ? "380px"
                : "350px",
        minHeight:
          node.type === "agent"
            ? "400px"
            : node.type === "language-model" || node.type === "languageModel"
              ? "400px"
              : node.type === "structured-output" || node.type === "parser"
                ? "300px"
                : "200px",
        zIndex: isSelected ? 10 : 5,
      }}
      onClick={onNodeClick(node)}
      onMouseDown={onNodeMouseDown(node)}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Control buttons */}
      {(showControls || isSelected) && (
        <div className="node-controls absolute -top-10 left-0 flex items-center gap-1 bg-white border rounded-lg shadow-sm p-1">
          {node.type === "agent" ? (
            <Dialog
              open={showAgentControlsModal}
              onOpenChange={setShowAgentControlsModal}
            >
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                  <Settings className="h-3 w-3 mr-1" />
                  Controls
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Agent - ID: Agent-w1fSl</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Define the agent's instructions, then enter a task to
                    complete using tools.
                  </p>

                  <div className="space-y-6">
                    <div className="grid grid-cols-4 gap-4 text-sm font-medium border-b pb-2">
                      <span>Show</span>
                      <span>Field Name</span>
                      <span>Description</span>
                      <span>Value</span>
                    </div>

                    {/* Temperature */}
                    <div className="grid grid-cols-4 gap-4 items-center">
                      <Switch defaultChecked={false} />
                      <span className="text-sm">Temperature</span>
                      <span className="text-sm text-muted-foreground"></span>
                      <div className="flex items-center gap-2">
                        <Slider
                          defaultValue={[0.7]}
                          max={2}
                          min={0}
                          step={0.1}
                          className="flex-1"
                        />
                        <span className="text-xs text-muted-foreground">
                          Precise
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Creative
                        </span>
                      </div>
                    </div>

                    {/* Seed */}
                    <div className="grid grid-cols-4 gap-4 items-center">
                      <Switch defaultChecked={false} />
                      <span className="text-sm">Seed</span>
                      <span className="text-sm text-muted-foreground">
                        The seed controls the reproducibility of the job.
                      </span>
                      <Input defaultValue="1" className="h-8" />
                    </div>

                    {/* Max Retries */}
                    <div className="grid grid-cols-4 gap-4 items-center">
                      <Switch defaultChecked={false} />
                      <span className="text-sm">Max Retries</span>
                      <span className="text-sm text-muted-foreground">
                        The maximum number of retries to make when generating.
                      </span>
                      <Input defaultValue="5" className="h-8" />
                    </div>

                    {/* Timeout */}
                    <div className="grid grid-cols-4 gap-4 items-center">
                      <Switch defaultChecked={false} />
                      <span className="text-sm">Timeout</span>
                      <span className="text-sm text-muted-foreground">
                        The timeout for requests to OpenAI completion API.
                      </span>
                      <Input defaultValue="700" className="h-8" />
                    </div>

                    {/* Agent Instructions */}
                    <div className="grid grid-cols-4 gap-4 items-start">
                      <Switch defaultChecked={true} />
                      <span className="text-sm">Agent Instructions</span>
                      <span className="text-sm text-muted-foreground">
                        System Prompt: Initial instructions and context provided
                        to guide the agent's behavior.
                      </span>
                      <div className="relative">
                        <Textarea
                          defaultValue="You are a helpful assistant that can use tools to help with tasks."
                          className="min-h-[60px] pr-8"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 h-6 w-6"
                        >
                          <Expand className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    {/* Number of Chat History Messages */}
                    <div className="grid grid-cols-4 gap-4 items-center">
                      <Switch defaultChecked={false} />
                      <span className="text-sm">
                        Number of Chat History Messages
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Number of chat history messages to retrieve.
                      </span>
                      <Input defaultValue="100" className="h-8" />
                    </div>

                    {/* Tools */}
                    <div className="grid grid-cols-4 gap-4 items-center">
                      <Switch defaultChecked={true} />
                      <span className="text-sm">Tools</span>
                      <span className="text-sm text-muted-foreground">
                        These are the tools that the agent can use to help with
                        tasks.
                      </span>
                      <div></div>
                    </div>

                    {/* Input */}
                    <div className="grid grid-cols-4 gap-4 items-center">
                      <Switch defaultChecked={true} />
                      <span className="text-sm">Input</span>
                      <span className="text-sm text-muted-foreground">
                        The input provided by the user for the agent to process.
                      </span>
                      <div></div>
                    </div>

                    {/* Handle Parse Errors */}
                    <div className="grid grid-cols-4 gap-4 items-center">
                      <Switch defaultChecked={false} />
                      <span className="text-sm">Handle Parse Errors</span>
                      <span className="text-sm text-muted-foreground">
                        Should the Agent fix errors when reading user input for
                        better processing?
                      </span>
                      <Switch defaultChecked={true} />
                    </div>

                    {/* Verbose */}
                    <div className="grid grid-cols-4 gap-4 items-center">
                      <Switch defaultChecked={false} />
                      <span className="text-sm">Verbose</span>
                      <span className="text-sm text-muted-foreground">
                        Should the Agent fix errors when reading user input for
                        better processing?
                      </span>
                      <Switch defaultChecked={true} />
                    </div>

                    {/* Max Iterations */}
                    <div className="grid grid-cols-4 gap-4 items-center">
                      <Switch defaultChecked={false} />
                      <span className="text-sm">Max Iterations</span>
                      <span className="text-sm text-muted-foreground">
                        The maximum number of attempts the agent can make to
                        complete its task before it stops.
                      </span>
                      <Input defaultValue="15" className="h-8" />
                    </div>

                    {/* Agent Description */}
                    <div className="grid grid-cols-4 gap-4 items-start">
                      <Switch defaultChecked={false} />
                      <span className="text-sm">
                        Agent Description [Deprecated]
                      </span>
                      <span className="text-sm text-muted-foreground">
                        The description of the agent. This is only used when in
                        Tool Mode. Defaults to 'A helpful assistant with access
                        to the following tools:' and tools are added
                        dynamically. This feature is deprecated and will be
                        removed in future versions.
                      </span>
                      <div className="relative">
                        <Textarea
                          defaultValue="A helpful assistant with access to the following tools:"
                          className="min-h-[60px] pr-8"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 h-6 w-6"
                        >
                          <Expand className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    {/* Current Date */}
                    <div className="grid grid-cols-4 gap-4 items-center">
                      <Switch defaultChecked={false} />
                      <span className="text-sm">Current Date</span>
                      <span className="text-sm text-muted-foreground">
                        If true, will add a tool to the agent that returns the
                        current date.
                      </span>
                      <Switch defaultChecked={true} />
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button
                      onClick={() => setShowAgentControlsModal(false)}
                      className="bg-black text-white hover:bg-gray-800"
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ) : node.type === "language-model" ||
            node.type === "languageModel" ? (
            <Dialog
              open={showLanguageModelControlsModal}
              onOpenChange={setShowLanguageModelControlsModal}
            >
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                  <Settings className="h-3 w-3 mr-1" />
                  Controls
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    Language Model - ID: LanguageModelComponent-wVrEc
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Runs a language model given a specified provider.
                  </p>

                  <div className="space-y-6">
                    <div className="grid grid-cols-4 gap-4 text-sm font-medium border-b pb-2">
                      <span>Show</span>
                      <span>Field Name</span>
                      <span>Description</span>
                      <span>Value</span>
                    </div>

                    {/* Model Provider */}
                    <div className="grid grid-cols-4 gap-4 items-center">
                      <Switch defaultChecked={true} />
                      <span className="text-sm">Model Provider</span>
                      <span className="text-sm text-muted-foreground">
                        Select the model provider
                      </span>
                      <Select defaultValue="openai">
                        <SelectTrigger className="h-8">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-green-500 rounded-sm flex items-center justify-center">
                              <span className="text-white text-xs font-bold">
                                O
                              </span>
                            </div>
                            <SelectValue />
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="openai">OpenAI</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Model Name */}
                    <div className="grid grid-cols-4 gap-4 items-center">
                      <Switch defaultChecked={true} />
                      <span className="text-sm">Model Name</span>
                      <span className="text-sm text-muted-foreground">
                        Select the model to use
                      </span>
                      <Select defaultValue="gpt-4o-mini">
                        <SelectTrigger className="h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gpt-4o-mini">
                            gpt-4o-mini
                          </SelectItem>
                          <SelectItem value="gpt-4o">gpt-4o</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* OpenAI API Key */}
                    <div className="grid grid-cols-4 gap-4 items-center">
                      <Switch defaultChecked={true} />
                      <span className="text-sm">OpenAI API Key</span>
                      <span className="text-sm text-muted-foreground">
                        Model Provider API key
                      </span>
                      <div className="flex gap-2">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <Link className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>

                    {/* Input */}
                    <div className="grid grid-cols-4 gap-4 items-center">
                      <Switch defaultChecked={true} />
                      <span className="text-sm">Input</span>
                      <span className="text-sm text-muted-foreground">
                        The input text to send to the model
                      </span>
                      <Globe className="h-4 w-4 text-muted-foreground" />
                    </div>

                    {/* System Message */}
                    <div className="grid grid-cols-4 gap-4 items-center">
                      <Switch defaultChecked={false} />
                      <span className="text-sm">System Message</span>
                      <span className="text-sm text-muted-foreground">
                        A system message that helps set the behavior of the
                        assistant
                      </span>
                      <div className="relative">
                        <Input
                          placeholder="Type something..."
                          className="h-8 pr-8"
                        />
                        <Expand className="absolute right-2 top-1/2 transform -translate-y-1/2 h-3 w-3" />
                      </div>
                    </div>

                    {/* Stream */}
                    <div className="grid grid-cols-4 gap-4 items-center">
                      <Switch defaultChecked={false} />
                      <span className="text-sm">Stream</span>
                      <span className="text-sm text-muted-foreground">
                        Whether to stream the response
                      </span>
                      <Switch defaultChecked={false} />
                    </div>

                    {/* Temperature */}
                    <div className="grid grid-cols-4 gap-4 items-center">
                      <Switch defaultChecked={false} />
                      <span className="text-sm">Temperature</span>
                      <span className="text-sm text-muted-foreground">
                        Controls randomness in responses
                      </span>
                      <div className="flex items-center gap-2">
                        <Slider
                          defaultValue={[0.1]}
                          max={2}
                          min={0}
                          step={0.1}
                          className="flex-1"
                        />
                        <span className="text-xs text-muted-foreground">
                          Precise
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Creative
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button
                      onClick={() => setShowLanguageModelControlsModal(false)}
                      className="bg-black text-white hover:bg-gray-800"
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ) : node.type === "structured-output" ? (
            <Dialog
              open={showControlsOverlay}
              onOpenChange={setShowControlsOverlay}
            >
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                  <Settings className="h-3 w-3 mr-1" />
                  Controls
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    Structured Output - ID: StructuredOutput-{node.id}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Parse and format agent responses into structured data
                    formats.
                  </p>

                  <div className="space-y-6">
                    <div className="grid grid-cols-4 gap-4 text-sm font-medium border-b pb-2">
                      <span>Show</span>
                      <span>Field Name</span>
                      <span>Description</span>
                      <span>Value</span>
                    </div>

                    <div className="grid grid-cols-4 gap-4 items-start">
                      <Switch defaultChecked={true} />
                      <span className="text-sm">Output Schema</span>
                      <span className="text-sm text-muted-foreground">
                        JSON schema defining the structure of the output
                      </span>
                      <div className="relative">
                        <Textarea
                          defaultValue='{"type": "object", "properties": {"title": {"type": "string"}}}'
                          className="min-h-[60px] pr-8 font-mono text-xs"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 h-6 w-6"
                        >
                          <Expand className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4 items-center">
                      <Switch defaultChecked={true} />
                      <span className="text-sm">Format</span>
                      <span className="text-sm text-muted-foreground">
                        Output format type
                      </span>
                      <Select defaultValue="json">
                        <SelectTrigger className="h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="json">JSON</SelectItem>
                          <SelectItem value="yaml">YAML</SelectItem>
                          <SelectItem value="xml">XML</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-4 gap-4 items-center">
                      <Switch defaultChecked={false} />
                      <span className="text-sm">Validation</span>
                      <span className="text-sm text-muted-foreground">
                        Enable strict schema validation
                      </span>
                      <Switch defaultChecked={true} />
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button
                      onClick={() => setShowControlsOverlay(false)}
                      className="bg-black text-white hover:bg-gray-800"
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ) : node.type === "parser" ? (
            <Dialog
              open={showControlsOverlay}
              onOpenChange={setShowControlsOverlay}
            >
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                  <Settings className="h-3 w-3 mr-1" />
                  Controls
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Parser - ID: Parser-{node.id}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Extract and parse specific data from text using patterns and
                    rules.
                  </p>

                  <div className="space-y-6">
                    <div className="grid grid-cols-4 gap-4 text-sm font-medium border-b pb-2">
                      <span>Show</span>
                      <span>Field Name</span>
                      <span>Description</span>
                      <span>Value</span>
                    </div>

                    <div className="grid grid-cols-4 gap-4 items-center">
                      <Switch defaultChecked={true} />
                      <span className="text-sm">Parser Type</span>
                      <span className="text-sm text-muted-foreground">
                        Type of parser to use
                      </span>
                      <Select defaultValue="regex">
                        <SelectTrigger className="h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="regex">
                            Regular Expression
                          </SelectItem>
                          <SelectItem value="json">JSON Parser</SelectItem>
                          <SelectItem value="csv">CSV Parser</SelectItem>
                          <SelectItem value="xml">XML Parser</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-4 gap-4 items-start">
                      <Switch defaultChecked={true} />
                      <span className="text-sm">Pattern</span>
                      <span className="text-sm text-muted-foreground">
                        Parsing pattern or expression
                      </span>
                      <div className="relative">
                        <Input
                          defaultValue="/\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b/g"
                          className="h-8 pr-8 font-mono text-xs"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-1/2 right-2 transform -translate-y-1/2 h-6 w-6"
                        >
                          <Expand className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4 items-center">
                      <Switch defaultChecked={false} />
                      <span className="text-sm">Case Sensitive</span>
                      <span className="text-sm text-muted-foreground">
                        Enable case-sensitive matching
                      </span>
                      <Switch defaultChecked={false} />
                    </div>

                    <div className="grid grid-cols-4 gap-4 items-center">
                      <Switch defaultChecked={false} />
                      <span className="text-sm">Global Match</span>
                      <span className="text-sm text-muted-foreground">
                        Find all matches in the text
                      </span>
                      <Switch defaultChecked={true} />
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button
                      onClick={() => setShowControlsOverlay(false)}
                      className="bg-black text-white hover:bg-gray-800"
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ) : node.type === "chat-input" ? (
            <Dialog
              open={showChatInputControlsModal}
              onOpenChange={setShowChatInputControlsModal}
            >
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                  <Settings className="h-3 w-3 mr-1" />
                  Controls
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Chat Input - ID: ChatInput-zHup9</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Get chat inputs from the Playground.
                  </p>

                  <div className="space-y-6">
                    <div className="grid grid-cols-4 gap-4 text-sm font-medium border-b pb-2">
                      <span>Show</span>
                      <span>Field Name</span>
                      <span>Description</span>
                      <span>Value</span>
                    </div>

                    {/* Input Text */}
                    <div className="grid grid-cols-4 gap-4 items-center">
                      <Switch defaultChecked={true} />
                      <span className="text-sm">Input Text</span>
                      <span className="text-sm text-muted-foreground">
                        Message to be passed as input.
                      </span>
                      <Input defaultValue="Amazon" className="h-8" />
                    </div>

                    {/* Store Messages */}
                    <div className="grid grid-cols-4 gap-4 items-center">
                      <Switch defaultChecked={false} />
                      <span className="text-sm">Store Messages</span>
                      <span className="text-sm text-muted-foreground">
                        Store messages in chat history.
                      </span>
                      <Switch defaultChecked={true} />
                    </div>

                    {/* Sender Type */}
                    <div className="grid grid-cols-4 gap-4 items-center">
                      <Switch defaultChecked={false} />
                      <span className="text-sm">Sender Type</span>
                      <span className="text-sm text-muted-foreground">
                        Type of sender (user/assistant).
                      </span>
                      <Select defaultValue="user">
                        <SelectTrigger className="h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">User</SelectItem>
                          <SelectItem value="assistant">Assistant</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Sender Name */}
                    <div className="grid grid-cols-4 gap-4 items-center">
                      <Switch defaultChecked={false} />
                      <span className="text-sm">Sender Name</span>
                      <span className="text-sm text-muted-foreground">
                        Name of the message sender.
                      </span>
                      <Input placeholder="Enter sender name" className="h-8" />
                    </div>

                    {/* Session ID */}
                    <div className="grid grid-cols-4 gap-4 items-center">
                      <Switch defaultChecked={false} />
                      <span className="text-sm">Session ID</span>
                      <span className="text-sm text-muted-foreground">
                        Unique identifier for the chat session.
                      </span>
                      <Input placeholder="Enter session ID" className="h-8" />
                    </div>

                    {/* Files */}
                    <div className="grid grid-cols-4 gap-4 items-center">
                      <Switch defaultChecked={false} />
                      <span className="text-sm">Files</span>
                      <span className="text-sm text-muted-foreground">
                        Allow file uploads with messages.
                      </span>
                      <Switch defaultChecked={false} />
                    </div>

                    {/* Background Color */}
                    <div className="grid grid-cols-4 gap-4 items-center">
                      <Switch defaultChecked={false} />
                      <span className="text-sm">Background Color</span>
                      <span className="text-sm text-muted-foreground">
                        Background color of the chat input.
                      </span>
                      <Input defaultValue="#ffffff" className="h-8" />
                    </div>

                    {/* Icon */}
                    <div className="grid grid-cols-4 gap-4 items-center">
                      <Switch defaultChecked={false} />
                      <span className="text-sm">Icon</span>
                      <span className="text-sm text-muted-foreground">
                        Icon to display with the chat input.
                      </span>
                      <Input placeholder="Enter icon name" className="h-8" />
                    </div>

                    {/* Text Color */}
                    <div className="grid grid-cols-4 gap-4 items-center">
                      <Switch defaultChecked={false} />
                      <span className="text-sm">Text Color</span>
                      <span className="text-sm text-muted-foreground">
                        Text color of the chat input.
                      </span>
                      <Input defaultValue="#000000" className="h-8" />
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button
                      onClick={() => setShowChatInputControlsModal(false)}
                      className="bg-black text-white hover:bg-gray-800"
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ) : (
            <Dialog
              open={showControlsOverlay}
              onOpenChange={setShowControlsOverlay}
            >
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                  <Settings className="h-3 w-3 mr-1" />
                  Controls
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Component Controls</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p>Control settings for {node.data.label} component.</p>
                  {/* Add control settings here */}
                </div>
              </DialogContent>
            </Dialog>
          )}
          <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
            <Code className="h-3 w-3 mr-1" />
            Code
          </Button>
          <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
            <Snowflake className="h-3 w-3 mr-1" />
            Freeze
          </Button>
          {isSelected && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0 text-red-500 hover:text-red-600"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteNode(node.id);
              }}
            >
              ×
            </Button>
          )}
        </div>
      )}

      <div
        className={`p-4 ${node.type === "webhook" ? "bg-white rounded-lg" : ""}`}
      >
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          <div className="w-8 h-8 rounded-md bg-primary/20 flex items-center justify-center text-lg font-medium flex-shrink-0">
            {node.type === "agent" ? (
              "🤖"
            ) : node.type === "chat-input" || node.type === "input" ? (
              "💬"
            ) : node.type === "chat-output" || node.type === "output" ? (
              "📤"
            ) : node.type === "language-model" ||
              node.type === "languageModel" ? (
              "🧠"
            ) : node.type === "structured-output" ? (
              "📋"
            ) : node.type === "parser" ? (
              "🔍"
            ) : node.type === "webhook" ? (
              <img
                src="https://i.ibb.co/d0kJBH6t/webhook.png"
                alt="Webhook"
                className="w-5 h-5"
              />
            ) : node.type === "confluence" ? (
              <img
                src="https://i.ibb.co/yn7b29H6/confluence.png"
                alt="Confluence"
                className="w-5 h-5"
              />
            ) : node.type === "sharepoint" ? (
              <img
                src="https://i.ibb.co/sd1z518G/share-Point.png"
                alt="SharePoint"
                className="w-5 h-5"
              />
            ) : node.type === "salesforce-crm" ? (
              <img
                src="https://i.ibb.co/3yjDgVBH/salesforce.png"
                alt="Salesforce"
                className="w-5 h-5"
              />
            ) : node.type === "postgresql" ? (
              "🗄️"
            ) : node.type === "ms-teams-slack" ? (
              <img
                src="https://i.ibb.co/Wpdr2QGs/teams.jpg"
                alt="Teams/Slack"
                className="w-5 h-5"
              />
            ) : node.type === "observe" ? (
              "👁️"
            ) : (
              "N"
            )}
          </div>
          <div className="flex-1">
            <div className="font-medium text-sm">
              {node.type === "agent"
                ? "Agent"
                : node.type === "chat-input" || node.type === "input"
                  ? "Input"
                  : node.type === "chat-output" || node.type === "output"
                    ? "Output"
                    : node.type === "language-model" ||
                        node.type === "languageModel"
                      ? "Language Model"
                      : node.type === "structured-output"
                        ? "Structured Output"
                        : node.type === "parser"
                          ? "Parser"
                          : node.type === "webhook"
                            ? "Webhook"
                            : node.type === "confluence"
                              ? "Confluence"
                              : node.type === "sharepoint"
                                ? "SharePoint"
                                : node.type === "salesforce-crm"
                                  ? "Salesforce CRM"
                                  : node.type === "postgresql"
                                    ? "PostgreSQL"
                                    : node.type === "ms-teams-slack"
                                      ? "MS Teams / Slack"
                                      : node.type === "observe"
                                        ? "Observe"
                                        : node.data.label}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {node.type === "agent"
                ? "AI agent with tools and instructions"
                : node.type === "chat-input" || node.type === "input"
                  ? "Receives user input messages"
                  : node.type === "chat-output" || node.type === "output"
                    ? "Displays agent responses"
                    : node.type === "language-model" ||
                        node.type === "languageModel"
                      ? "Processes text with AI models"
                      : node.type === "structured-output"
                        ? "Formats data into structured formats"
                        : node.type === "parser"
                          ? "Extracts data using patterns"
                          : node.type === "webhook"
                            ? "Receives external HTTP requests"
                            : node.type === "confluence"
                              ? "Searches knowledge base documents"
                              : node.type === "sharepoint"
                                ? "Queries SharePoint documents"
                                : node.type === "salesforce-crm"
                                  ? "Looks up CRM data and contacts"
                                  : node.type === "postgresql"
                                    ? "Queries database for historical data"
                                    : node.type === "ms-teams-slack"
                                      ? "Creates team communication channels"
                                      : node.type === "observe"
                                        ? "Monitors and tracks KPIs"
                                        : "Component description"}
            </div>
          </div>
          {/* Tool Mode Toggle in Header */}
          {(node.type === "webhook" ||
            node.type === "confluence" ||
            node.type === "sharepoint" ||
            node.type === "salesforce-crm" ||
            node.type === "postgresql" ||
            node.type === "ms-teams-slack") && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Tool Mode</span>
              <Switch
                checked={node.data.toolMode}
                onCheckedChange={() => onToolModeToggle(node.id)}
                className="scale-75"
              />
            </div>
          )}
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <Play className="h-3 w-3" />
          </Button>
        </div>

        {/* Content based on node type */}
        {node.type === "agent" && renderAgentNode()}
        {(node.type === "chat-input" || node.type === "input") &&
          renderChatInputNode()}
        {(node.type === "language-model" || node.type === "languageModel") &&
          renderLanguageModelNode()}
        {(node.type === "chat-output" || node.type === "output") &&
          renderChatOutputNode()}
        {node.type === "structured-output" && renderStructuredOutputNode()}
        {node.type === "parser" && renderParserNode()}
        {node.type === "webhook" && renderWebhookNode()}
        {node.type === "confluence" && renderConfluenceNode()}
        {node.type === "sharepoint" && renderSharePointNode()}
        {node.type === "salesforce-crm" && renderSalesforceCRMNode()}
        {node.type === "postgresql" && renderPostgreSQLNode()}
        {node.type === "ms-teams-slack" && renderMSTeamsSlackNode()}
        {node.type === "observe" && renderObserveNode()}
        {node.type !== "agent" &&
          node.type !== "chat-input" &&
          node.type !== "input" &&
          node.type !== "language-model" &&
          node.type !== "languageModel" &&
          node.type !== "chat-output" &&
          node.type !== "output" &&
          node.type !== "structured-output" &&
          node.type !== "parser" &&
          node.type !== "webhook" &&
          node.type !== "confluence" &&
          node.type !== "sharepoint" &&
          node.type !== "salesforce-crm" &&
          node.type !== "postgresql" &&
          node.type !== "ms-teams-slack" &&
          node.type !== "observe" &&
          renderDefaultNode()}
      </div>

      {/* Connection points - Fixed position during drag */}
      {node.type === "agent" ? (
        <>
          {/* Tools connection point */}
          <div
            className={`connection-point absolute -left-2 w-4 h-4 rounded-full border-2 border-white cursor-crosshair hover:scale-110 transition-transform duration-150 z-20 ${
              isConnecting && connectionStart === node.id
                ? "bg-green-500 shadow-lg shadow-green-500/50"
                : "bg-teal-500 shadow-md hover:shadow-lg hover:shadow-teal-500/50"
            }`}
            style={{
              top: "300px", // Position near Tools label
              filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))",
              pointerEvents: "all",
              position: "absolute",
            }}
            onMouseDown={(e) => {
              e.stopPropagation();
              onConnectionPointMouseDown(node.id, false)(e);
            }}
            onMouseUp={(e) => {
              e.stopPropagation();
              onConnectionPointMouseUp(node.id, false)(e);
            }}
            data-connection-point="tools"
            data-node-id={node.id}
          />
          {/* Input connection point */}
          <div
            className={`connection-point absolute -left-2 w-4 h-4 rounded-full border-2 border-white cursor-crosshair hover:scale-110 transition-transform duration-150 z-20 ${
              isConnecting && connectionStart === node.id
                ? "bg-green-500 shadow-lg shadow-green-500/50"
                : "bg-blue-500 shadow-md hover:shadow-lg hover:shadow-blue-500/50"
            }`}
            style={{
              top: "50px", // Position moved down by 15px
              filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))",
              pointerEvents: "all",
              position: "absolute",
            }}
            onMouseDown={(e) => {
              e.stopPropagation();
              onConnectionPointMouseDown(node.id, false)(e);
            }}
            onMouseUp={(e) => {
              e.stopPropagation();
              onConnectionPointMouseUp(node.id, false)(e);
            }}
            data-connection-point="input"
            data-node-id={node.id}
          />
          {/* Output connection point */}
          <div
            className={`connection-point absolute -right-2 top-1/2 w-4 h-4 rounded-full transform -translate-y-1/2 border-2 border-white cursor-crosshair hover:scale-110 transition-transform duration-150 z-20 ${
              isConnecting && connectionStart === node.id
                ? "bg-green-500 shadow-lg shadow-green-500/50"
                : "bg-purple-500 shadow-md hover:shadow-lg hover:shadow-purple-500/50"
            }`}
            onMouseDown={(e) => {
              e.stopPropagation();
              onConnectionPointMouseDown(node.id, true)(e);
            }}
            onMouseUp={(e) => {
              e.stopPropagation();
              onConnectionPointMouseUp(node.id, true)(e);
            }}
            data-connection-point="output"
            data-node-id={node.id}
            style={{
              filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))",
              pointerEvents: "all",
              position: "absolute",
            }}
          />
        </>
      ) : (
        <>
          <div
            className={`connection-point absolute -left-2 top-1/2 w-4 h-4 rounded-full transform -translate-y-1/2 border-2 border-white cursor-crosshair hover:scale-110 transition-transform duration-150 z-20 ${
              isConnecting && connectionStart === node.id
                ? "bg-green-500 shadow-lg shadow-green-500/50"
                : "bg-blue-500 shadow-md hover:shadow-lg hover:shadow-blue-500/50"
            }`}
            onMouseDown={(e) => {
              e.stopPropagation();
              onConnectionPointMouseDown(node.id, false)(e);
            }}
            onMouseUp={(e) => {
              e.stopPropagation();
              onConnectionPointMouseUp(node.id, false)(e);
            }}
            data-connection-point="input"
            data-node-id={node.id}
            style={{
              filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))",
              pointerEvents: "all",
              position: "absolute",
            }}
          />
          <div
            className={`connection-point absolute -right-2 top-1/3 w-4 h-4 rounded-full transform -translate-y-1/2 border-2 border-white cursor-crosshair hover:scale-110 transition-transform duration-150 z-20 ${
              isConnecting && connectionStart === node.id
                ? "bg-green-500 shadow-lg shadow-green-500/50"
                : "bg-purple-500 shadow-md hover:shadow-lg hover:shadow-purple-500/50"
            }`}
            onMouseDown={(e) => {
              e.stopPropagation();
              onConnectionPointMouseDown(node.id, true)(e);
            }}
            onMouseUp={(e) => {
              e.stopPropagation();
              onConnectionPointMouseUp(node.id, true)(e);
            }}
            data-connection-point="output"
            data-node-id={node.id}
            style={{
              filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))",
              pointerEvents: "all",
              position: "absolute",
            }}
          />
        </>
      )}

      {/* Node Expand Modal */}
      <Dialog open={showNodeExpandModal} onOpenChange={setShowNodeExpandModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Expanded Text</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              value={nodeExpandText}
              onChange={(e) => setNodeExpandText(e.target.value)}
              className="min-h-[400px] font-mono text-sm"
            />
          </div>
          <div className="flex justify-end pt-4">
            <Button
              onClick={() => setShowNodeExpandModal(false)}
              className="bg-black text-white hover:bg-gray-800"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Agent Instruction RTE Modal */}
      <Dialog
        open={showAgentInstructionModal}
        onOpenChange={setShowAgentInstructionModal}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Agent Instructions - Rich Text Editor</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="border rounded-lg p-6 bg-white min-h-[500px] max-h-[600px] overflow-y-auto">
              <div className="prose prose-sm max-w-none">
                <div
                  dangerouslySetInnerHTML={{
                    __html: agentInstructionText
                      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                      .replace(
                        /^(\d+\.)\s+\*\*(.*?)\*\*/gm,
                        '<div class="mb-2"><strong>$1 $2</strong></div>',
                      )
                      .replace(
                        /^•\s+\*\*(.*?):\*\*/gm,
                        '<div class="mb-1 ml-4"><strong>• $1:</strong>',
                      )
                      .replace(
                        /^•\s+(.*)/gm,
                        '<div class="mb-1 ml-4">• $1</div>',
                      )
                      .replace(/\n\n/g, '</div><div class="mb-4">')
                      .replace(/\n/g, "<br/>")
                      .replace(/^(.*)$/gm, '<div class="mb-2">$1</div>')
                      .replace(/<div class="mb-2"><\/div>/g, "")
                      .replace(/→/g, "→"),
                  }}
                />
              </div>
            </div>
            <div className="border-t pt-4">
              <Textarea
                value={agentInstructionText}
                onChange={(e) => setAgentInstructionText(e.target.value)}
                className="min-h-[200px] font-mono text-sm"
                placeholder="Edit the raw markdown text here..."
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button
              variant="outline"
              onClick={() => setShowAgentInstructionModal(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => setShowAgentInstructionModal(false)}
              className="bg-black text-white hover:bg-gray-800"
            >
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Animated Flow Arrow Component
interface AnimatedFlowArrowProps {
  path: string;
  startTime: number;
}

const AnimatedFlowArrow: React.FC<AnimatedFlowArrowProps> = ({
  path,
  startTime,
}) => {
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, []);

  // Calculate animation progress (0 to 1, repeating every 2 seconds)
  const elapsed = (currentTime - startTime) / 1000; // Convert to seconds
  const progress = (elapsed % 2) / 2; // 2-second cycle

  // Parse the curved path to get control points
  const pathMatch = path.match(
    /M\s*([\d.-]+)\s*([\d.-]+)\s*C\s*([\d.-]+)\s*([\d.-]+),\s*([\d.-]+)\s*([\d.-]+),\s*([\d.-]+)\s*([\d.-]+)/,
  );
  if (!pathMatch) return null;

  const startX = parseFloat(pathMatch[1]);
  const startY = parseFloat(pathMatch[2]);
  const cp1X = parseFloat(pathMatch[3]);
  const cp1Y = parseFloat(pathMatch[4]);
  const cp2X = parseFloat(pathMatch[5]);
  const cp2Y = parseFloat(pathMatch[6]);
  const endX = parseFloat(pathMatch[7]);
  const endY = parseFloat(pathMatch[8]);

  // Calculate position along the cubic Bezier curve
  const t = progress;
  const oneMinusT = 1 - t;
  const oneMinusTSquared = oneMinusT * oneMinusT;
  const oneMinusTCubed = oneMinusTSquared * oneMinusT;
  const tSquared = t * t;
  const tCubed = tSquared * t;

  const currentX =
    oneMinusTCubed * startX +
    3 * oneMinusTSquared * t * cp1X +
    3 * oneMinusT * tSquared * cp2X +
    tCubed * endX;
  const currentY =
    oneMinusTCubed * startY +
    3 * oneMinusTSquared * t * cp1Y +
    3 * oneMinusT * tSquared * cp2Y +
    tCubed * endY;

  // Calculate tangent for rotation (derivative of Bezier curve)
  const tangentX =
    3 * oneMinusTSquared * (cp1X - startX) +
    6 * oneMinusT * t * (cp2X - cp1X) +
    3 * tSquared * (endX - cp2X);
  const tangentY =
    3 * oneMinusTSquared * (cp1Y - startY) +
    6 * oneMinusT * t * (cp2Y - cp1Y) +
    3 * tSquared * (endY - cp2Y);
  const angle = Math.atan2(tangentY, tangentX) * (180 / Math.PI);

  return (
    <g>
      {/* Moving arrow */}
      <g transform={`translate(${currentX}, ${currentY}) rotate(${angle})`}>
        <polygon
          points="-12,-6 12,0 -12,6 -6,0"
          fill="#10b981"
          stroke="#059669"
          strokeWidth="2"
          style={{
            filter: "drop-shadow(0 2px 8px rgba(16, 185, 129, 0.8))",
          }}
        />
      </g>
    </g>
  );
};

export default FlowCanvas;
