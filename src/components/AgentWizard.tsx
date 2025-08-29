import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
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
  ArrowLeft,
  ArrowRight,
  Plus,
  X,
  Check,
  Bot,
  MessageSquare,
  Globe,
  Zap,
  Settings,
  Wrench,
} from "lucide-react";

interface AgentWizardProps {
  onBack: () => void;
  onComplete: (agentData: any) => void;
}

interface InputField {
  id: string;
  label: string;
  type: string;
  description: string;
}

interface OutputField {
  id: string;
  label: string;
  type: string;
  description: string;
}

const AgentWizard: React.FC<AgentWizardProps> = ({ onBack, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [agentData, setAgentData] = useState({
    name: "",
    description: "",
    outcome: "",
    channel: "",
    inputs: [] as InputField[],
    outputs: [] as OutputField[],
    enabledTools: [] as string[],
    systemPrompt: "",
    userPromptTemplate: "",
    additionalInstructions: "",
    memoryEnabled: false,
    memorySize: 1000,
    temperature: 0.7,
    maxTokens: 2000,
  });

  const [toolsEnabled, setToolsEnabled] = useState(false);

  const steps = [
    { id: 1, title: "Basic Information", icon: Bot },
    { id: 2, title: "Input & Output", icon: MessageSquare },
    { id: 3, title: "Prompt & Instructions", icon: Settings },
    { id: 4, title: "Context & Memory", icon: Wrench },
    { id: 5, title: "Publish & Deploy", icon: Zap },
  ];

  const channels = [
    { value: "teams", label: "Microsoft Teams" },
    { value: "slack", label: "Slack" },
    { value: "web", label: "Web Chat" },
    { value: "http-api", label: "HTTP API" },
    { value: "discord", label: "Discord" },
    { value: "whatsapp", label: "WhatsApp" },
  ];

  const availableTools = [
    { id: "web-scraper", name: "Web Scraper", enabled: true },
    { id: "email-sender", name: "Email Sender", enabled: true },
    { id: "database-query", name: "Database Query", enabled: true },
    { id: "rest-api-client", name: "REST API Client", enabled: true },
    { id: "pdf-generator", name: "PDF Generator", enabled: false },
    { id: "image-generator", name: "Image Generator", enabled: false },
  ];

  const inputTypes = [
    { value: "text", label: "Text" },
    { value: "number", label: "Number" },
    { value: "email", label: "Email" },
    { value: "url", label: "URL" },
    { value: "file", label: "File" },
    { value: "date", label: "Date" },
  ];

  const outputTypes = [
    { value: "text", label: "Text" },
    { value: "json", label: "JSON" },
    { value: "html", label: "HTML" },
    { value: "markdown", label: "Markdown" },
    { value: "file", label: "File" },
  ];

  const addInput = () => {
    const newInput: InputField = {
      id: `input-${Date.now()}`,
      label: "",
      type: "text",
      description: "",
    };
    setAgentData({
      ...agentData,
      inputs: [...agentData.inputs, newInput],
    });
  };

  const removeInput = (id: string) => {
    setAgentData({
      ...agentData,
      inputs: agentData.inputs.filter((input) => input.id !== id),
    });
  };

  const updateInput = (id: string, field: string, value: string) => {
    setAgentData({
      ...agentData,
      inputs: agentData.inputs.map((input) =>
        input.id === id ? { ...input, [field]: value } : input,
      ),
    });
  };

  const addOutput = () => {
    const newOutput: OutputField = {
      id: `output-${Date.now()}`,
      label: "",
      type: "text",
      description: "",
    };
    setAgentData({
      ...agentData,
      outputs: [...agentData.outputs, newOutput],
    });
  };

  const removeOutput = (id: string) => {
    setAgentData({
      ...agentData,
      outputs: agentData.outputs.filter((output) => output.id !== id),
    });
  };

  const updateOutput = (id: string, field: string, value: string) => {
    setAgentData({
      ...agentData,
      outputs: agentData.outputs.map((output) =>
        output.id === id ? { ...output, [field]: value } : output,
      ),
    });
  };

  const toggleTool = (toolId: string) => {
    const isEnabled = agentData.enabledTools.includes(toolId);
    if (isEnabled) {
      setAgentData({
        ...agentData,
        enabledTools: agentData.enabledTools.filter((id) => id !== toolId),
      });
    } else {
      setAgentData({
        ...agentData,
        enabledTools: [...agentData.enabledTools, toolId],
      });
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    onComplete(agentData);
  };

  const renderStepIndicator = () => {
    return (
      <div className="space-y-6">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;

          return (
            <div key={step.id} className="flex items-center relative">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full border-2 z-10 bg-background ${
                  isCompleted
                    ? "bg-green-500 border-green-500 text-white"
                    : isActive
                      ? "bg-primary border-primary text-white"
                      : "bg-background border-muted-foreground text-muted-foreground"
                }`}
              >
                {isCompleted ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Icon className="h-4 w-4" />
                )}
              </div>
              <div className="ml-4 flex-1">
                <div
                  className={`text-sm font-medium ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {step.title}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Step {step.id} of {steps.length}
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="absolute left-4 top-8 w-0.5 h-6 bg-muted z-0" />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const renderBasicInformation = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="agent-name">Agent Name *</Label>
            <Input
              id="agent-name"
              placeholder="Enter agent name"
              value={agentData.name}
              onChange={(e) =>
                setAgentData({ ...agentData, name: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="agent-description">Description *</Label>
            <Textarea
              id="agent-description"
              placeholder="Describe what your agent does"
              value={agentData.description}
              onChange={(e) =>
                setAgentData({ ...agentData, description: e.target.value })
              }
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="agent-outcome">Expected Outcome *</Label>
            <Textarea
              id="agent-outcome"
              placeholder="What should this agent accomplish?"
              value={agentData.outcome}
              onChange={(e) =>
                setAgentData({ ...agentData, outcome: e.target.value })
              }
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="deployment-channel">Deployment Channel *</Label>
            <Select
              value={agentData.channel}
              onValueChange={(value) =>
                setAgentData({ ...agentData, channel: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select deployment channel" />
              </SelectTrigger>
              <SelectContent>
                {channels.map((channel) => (
                  <SelectItem key={channel.value} value={channel.value}>
                    {channel.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderInputOutput = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Input & Output Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="input" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="input">Input</TabsTrigger>
              <TabsTrigger value="output">Output</TabsTrigger>
            </TabsList>

            <TabsContent value="input" className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Input Fields</h3>
                  <Button onClick={addInput} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Input
                  </Button>
                </div>

                {agentData.inputs.map((input) => (
                  <Card key={input.id} className="p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Label</Label>
                        <Input
                          placeholder="Input label"
                          value={input.label}
                          onChange={(e) =>
                            updateInput(input.id, "label", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Type</Label>
                        <Select
                          value={input.type}
                          onValueChange={(value) =>
                            updateInput(input.id, "type", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {inputTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="col-span-2 space-y-2">
                        <Label>Description</Label>
                        <Input
                          placeholder="Input description"
                          value={input.description}
                          onChange={(e) =>
                            updateInput(input.id, "description", e.target.value)
                          }
                        />
                      </div>
                      <div className="col-span-2 flex justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeInput(input.id)}
                        >
                          <X className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={toolsEnabled}
                      onCheckedChange={setToolsEnabled}
                    />
                    <Label>Enable Tools</Label>
                  </div>

                  {toolsEnabled && (
                    <Card className="p-4">
                      <h4 className="font-medium mb-3">Available Tools</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {availableTools
                          .filter((tool) => tool.enabled)
                          .map((tool) => (
                            <div
                              key={tool.id}
                              className="flex items-center space-x-2"
                            >
                              <Switch
                                checked={agentData.enabledTools.includes(
                                  tool.id,
                                )}
                                onCheckedChange={() => toggleTool(tool.id)}
                              />
                              <Label className="text-sm">{tool.name}</Label>
                            </div>
                          ))}
                      </div>
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="output" className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Output Fields</h3>
                  <Button onClick={addOutput} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Output
                  </Button>
                </div>

                {agentData.outputs.map((output) => (
                  <Card key={output.id} className="p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Label</Label>
                        <Input
                          placeholder="Output label"
                          value={output.label}
                          onChange={(e) =>
                            updateOutput(output.id, "label", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Type</Label>
                        <Select
                          value={output.type}
                          onValueChange={(value) =>
                            updateOutput(output.id, "type", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {outputTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="col-span-2 space-y-2">
                        <Label>Description</Label>
                        <Input
                          placeholder="Output description"
                          value={output.description}
                          onChange={(e) =>
                            updateOutput(
                              output.id,
                              "description",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                      <div className="col-span-2 flex justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeOutput(output.id)}
                        >
                          <X className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    );
  };

  const renderPromptInstructions = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Prompt & Instructions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="system-prompt">System Prompt *</Label>
            <Textarea
              id="system-prompt"
              placeholder="You are a helpful assistant that..."
              value={agentData.systemPrompt}
              onChange={(e) =>
                setAgentData({ ...agentData, systemPrompt: e.target.value })
              }
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="user-prompt-template">User Prompt Template</Label>
            <Textarea
              id="user-prompt-template"
              placeholder="Template for user prompts with variables like {input}"
              value={agentData.userPromptTemplate}
              onChange={(e) =>
                setAgentData({
                  ...agentData,
                  userPromptTemplate: e.target.value,
                })
              }
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="additional-instructions">
              Additional Instructions
            </Label>
            <Textarea
              id="additional-instructions"
              placeholder="Any additional instructions or constraints"
              value={agentData.additionalInstructions}
              onChange={(e) =>
                setAgentData({
                  ...agentData,
                  additionalInstructions: e.target.value,
                })
              }
              rows={3}
            />
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderContextMemory = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Context & Memory Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-2">
            <Switch
              checked={agentData.memoryEnabled}
              onCheckedChange={(checked) =>
                setAgentData({ ...agentData, memoryEnabled: checked })
              }
            />
            <Label>Enable Memory</Label>
          </div>

          {agentData.memoryEnabled && (
            <div className="space-y-2">
              <Label htmlFor="memory-size">Memory Size (tokens)</Label>
              <Input
                id="memory-size"
                type="number"
                placeholder="1000"
                value={agentData.memorySize}
                onChange={(e) =>
                  setAgentData({
                    ...agentData,
                    memorySize: parseInt(e.target.value) || 1000,
                  })
                }
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="temperature">Temperature</Label>
            <Input
              id="temperature"
              type="number"
              step="0.1"
              min="0"
              max="2"
              placeholder="0.7"
              value={agentData.temperature}
              onChange={(e) =>
                setAgentData({
                  ...agentData,
                  temperature: parseFloat(e.target.value) || 0.7,
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="max-tokens">Max Tokens</Label>
            <Input
              id="max-tokens"
              type="number"
              placeholder="2000"
              value={agentData.maxTokens}
              onChange={(e) =>
                setAgentData({
                  ...agentData,
                  maxTokens: parseInt(e.target.value) || 2000,
                })
              }
            />
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderPublishDeploy = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Publish & Deploy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted/50 p-4 rounded-lg space-y-4">
            <h3 className="font-medium">Agent Summary</h3>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Name:</span>{" "}
                {agentData.name || "Not specified"}
              </div>
              <div>
                <span className="font-medium">Channel:</span>{" "}
                {channels.find((c) => c.value === agentData.channel)?.label ||
                  "Not specified"}
              </div>
              <div className="col-span-2">
                <span className="font-medium">Description:</span>{" "}
                {agentData.description || "Not specified"}
              </div>
              <div className="col-span-2">
                <span className="font-medium">Outcome:</span>{" "}
                {agentData.outcome || "Not specified"}
              </div>
              <div>
                <span className="font-medium">Inputs:</span>{" "}
                {agentData.inputs.length} configured
              </div>
              <div>
                <span className="font-medium">Outputs:</span>{" "}
                {agentData.outputs.length} configured
              </div>
              <div>
                <span className="font-medium">Tools:</span>{" "}
                {agentData.enabledTools.length} enabled
              </div>
              <div>
                <span className="font-medium">Memory:</span>{" "}
                {agentData.memoryEnabled ? "Enabled" : "Disabled"}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Deployment Options</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Switch defaultChecked />
                <Label>Auto-deploy after creation</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch />
                <Label>Enable monitoring and analytics</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch />
                <Label>Send deployment notifications</Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderBasicInformation();
      case 2:
        return renderInputOutput();
      case 3:
        return renderPromptInstructions();
      case 4:
        return renderContextMemory();
      case 5:
        return renderPublishDeploy();
      default:
        return renderBasicInformation();
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return (
          agentData.name &&
          agentData.description &&
          agentData.outcome &&
          agentData.channel
        );
      case 2:
        return true; // Input/Output is optional
      case 3:
        return agentData.systemPrompt;
      case 4:
        return true; // Context/Memory settings have defaults
      case 5:
        return true; // Final step
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Create New Agent
            </h1>
            <p className="text-muted-foreground mt-2">
              Follow the guided steps to configure and deploy your AI agent with
              custom tools and workflows.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={onBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Templates
          </Button>
        </div>
      </div>

      <div className="flex h-[calc(100vh-120px)]">
        {/* Left Sidebar - Steps */}
        <div className="w-80 bg-muted/30 border-r p-6">
          {/* Step Indicator */}
          <div className="relative">{renderStepIndicator()}</div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            {/* Current Step Badge */}
            <div className="mb-6">
              <Badge variant="outline" className="mb-4">
                Step {currentStep} of {steps.length}
              </Badge>
              <h2 className="text-2xl font-bold">
                {steps.find((s) => s.id === currentStep)?.title}
              </h2>
            </div>

            {/* Step Content */}
            <div className="mb-8 max-w-3xl">{renderCurrentStep()}</div>

            {/* Navigation */}
            <div className="flex items-center justify-between max-w-3xl">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              {currentStep === steps.length ? (
                <Button
                  onClick={handleComplete}
                  disabled={!isStepValid()}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Create Agent
                </Button>
              ) : (
                <Button onClick={nextStep} disabled={!isStepValid()}>
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentWizard;
