import React, { useState, useEffect } from "react";
import ComponentSidebar from "./builder/ComponentSidebar";
import FlowCanvas from "./builder/FlowCanvas";
import ConfigurationPanel from "./builder/ConfigurationPanel";
import PreviewPanel from "./builder/PreviewPanel";
import AgentTemplates from "./AgentTemplates";
import AgentWizard from "./AgentWizard";
import { Button } from "@/components/ui/button";
import { Play, Save, Share, Settings, ArrowLeft } from "lucide-react";

interface Node {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: any;
}

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  icon: React.ReactNode;
  complexity: "Beginner" | "Intermediate" | "Advanced";
}

interface AgentBuilderProps {
  onNavigationCollapse?: (collapsed: boolean) => void;
}

const AgentBuilder: React.FC<AgentBuilderProps> = ({
  onNavigationCollapse,
}) => {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showConfigPanel, setShowConfigPanel] = useState(false);
  const [showPreviewPanel, setShowPreviewPanel] = useState(false);
  const [showTemplates, setShowTemplates] = useState(true);
  const [showWizard, setShowWizard] = useState(false);
  const [customAgents, setCustomAgents] = useState<any[]>([]);

  const handleNodeSelect = (node: Node | null) => {
    setSelectedNode(node);
    // Don't automatically show config panel on node selection
    // setShowConfigPanel(node !== null);
  };

  const togglePreview = () => {
    setShowPreviewPanel(!showPreviewPanel);
  };

  const handleCreateNew = () => {
    setShowTemplates(false);
    setShowWizard(true);
    // Don't collapse navigation when entering wizard
  };

  const handleSelectTemplate = (template: Template) => {
    // Load the template flow and switch to builder view
    setShowTemplates(false);
    setShowWizard(false);
    setShowSidebar(false); // Hide sidebar by default when template is selected
    // Collapse navigation when entering builder
    if (onNavigationCollapse) {
      onNavigationCollapse(true);
    }

    // Load the Major Incident Swarmer template flow
    if (template.id === "major-incident-swarmer") {
      // This will be handled by the FlowCanvas component
      console.log("Loading Major Incident Swarmer template flow");
    }
  };

  const handleBackToTemplates = () => {
    setShowTemplates(true);
    setShowWizard(false);
    // Don't change navigation state when going back to templates
  };

  const handleWizardComplete = (agentData: any) => {
    // Add the new agent to custom agents
    const newAgent = {
      id: `custom-${Date.now()}`,
      name: agentData.name,
      description: agentData.description,
      category: "Custom Agents",
      tags: [agentData.channel, "Custom"],
      icon: "🤖",
      complexity: "Custom" as const,
      data: agentData,
    };

    setCustomAgents([...customAgents, newAgent]);
    setShowWizard(false);
    setShowTemplates(true); // Go back to templates page

    // Don't collapse navigation when going back to templates
    if (onNavigationCollapse) {
      onNavigationCollapse(false);
    }
  };

  const handleDeploy = () => {
    // Create a new custom agent from the current template
    const deployedAgent = {
      id: `deployed-${Date.now()}`,
      name: "Major Incident Swarmer AI",
      description:
        "Deployed agent for major incident response and team coordination",
      category: "Custom Agents",
      tags: ["Incident Management", "Deployed"],
      icon: "🤖",
      complexity: "Advanced" as const,
      data: {
        name: "Major Incident Swarmer AI",
        description:
          "Deployed agent for major incident response and team coordination",
        channel: "Incident Management",
      },
    };

    setCustomAgents([...customAgents, deployedAgent]);

    // Show success message or redirect to templates
    setShowTemplates(true);

    // Don't collapse navigation when going back to templates
    if (onNavigationCollapse) {
      onNavigationCollapse(false);
    }
  };

  if (showWizard) {
    return (
      <AgentWizard
        onBack={handleBackToTemplates}
        onComplete={handleWizardComplete}
      />
    );
  }

  if (showTemplates) {
    return (
      <AgentTemplates
        onCreateNew={handleCreateNew}
        onSelectTemplate={handleSelectTemplate}
        customAgents={customAgents}
      />
    );
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="border-b p-4 flex items-center justify-between bg-background">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBackToTemplates}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Templates
          </Button>
          <div className="h-6 w-px bg-border" />
          <h1 className="text-xl font-semibold">Agent Builder</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={togglePreview}>
            <Play className="h-4 w-4 mr-2" />
            {showPreviewPanel ? "Hide Preview" : "Preview"}
          </Button>
          <Button size="sm" onClick={handleDeploy}>
            <Share className="h-4 w-4 mr-2" />
            Deploy
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Component Sidebar */}
        {showSidebar && <ComponentSidebar />}

        {/* Flow Canvas */}
        <div className="flex-1 relative">
          <FlowCanvas
            onNodeSelect={handleNodeSelect}
            showSidebar={showSidebar}
            toggleSidebar={() => setShowSidebar(!showSidebar)}
            showConfigPanel={showConfigPanel}
            toggleConfigPanel={() => setShowConfigPanel(!showConfigPanel)}
          />
        </div>

        {/* Configuration Panel */}
        {showConfigPanel && (
          <div className="w-80">
            <ConfigurationPanel
              selectedComponent={
                selectedNode
                  ? {
                      type: selectedNode.type,
                      name: selectedNode.data?.label || selectedNode.type,
                      id: selectedNode.id,
                    }
                  : undefined
              }
              onClose={() => setShowConfigPanel(false)}
            />
          </div>
        )}

        {/* Preview Panel */}
        {showPreviewPanel && (
          <div className="w-96">
            <PreviewPanel onClose={() => setShowPreviewPanel(false)} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentBuilder;
