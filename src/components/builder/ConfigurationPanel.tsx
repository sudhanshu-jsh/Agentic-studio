import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, ChevronDown, ChevronUp, Copy, Eye, EyeOff } from "lucide-react";

interface ConfigurationPanelProps {
  selectedComponent?: {
    type: string;
    name: string;
    id: string;
  };
  onClose?: () => void;
}

const ConfigurationPanel: React.FC<ConfigurationPanelProps> = ({
  selectedComponent = { type: "agent", name: "Agent", id: "agent-1" },
  onClose = () => {},
}) => {
  const [showApiKey, setShowApiKey] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  // Configuration sections based on component type
  const renderConfigurationFields = () => {
    switch (selectedComponent.type) {
      case "agent":
        return (
          <>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="agent-instructions">Agent Instructions</Label>
                <Textarea
                  id="agent-instructions"
                  placeholder="Define the agent's instructions, then enter a task to complete using tools."
                  className="min-h-[100px]"
                  defaultValue="You are a helpful assistant that responds to user queries accurately and concisely."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="model-provider">Model Provider</Label>
                <Select defaultValue="openai">
                  <SelectTrigger>
                    <SelectValue placeholder="Select model provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="openai">OpenAI</SelectItem>
                    <SelectItem value="anthropic">Anthropic</SelectItem>
                    <SelectItem value="google">Google AI</SelectItem>
                    <SelectItem value="mistral">Mistral AI</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="model-name">Model Name</Label>
                <Select defaultValue="gpt-4o">
                  <SelectTrigger>
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt-4o">gpt-4o</SelectItem>
                    <SelectItem value="gpt-4-turbo">gpt-4-turbo</SelectItem>
                    <SelectItem value="gpt-3.5-turbo">gpt-3.5-turbo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="api-key">OpenAI API Key</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="h-6 w-6 p-0"
                  >
                    {showApiKey ? <EyeOff size={14} /> : <Eye size={14} />}
                  </Button>
                </div>
                <div className="relative">
                  <Input
                    id="api-key"
                    type={showApiKey ? "text" : "password"}
                    placeholder="Enter your API key"
                    defaultValue="sk-..."
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
                  >
                    <Copy size={14} />
                  </Button>
                </div>
              </div>
            </div>
          </>
        );

      case "language-model":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="model-provider">Model Provider</Label>
              <Select defaultValue="openai">
                <SelectTrigger>
                  <SelectValue placeholder="Select model provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="openai">OpenAI</SelectItem>
                  <SelectItem value="anthropic">Anthropic</SelectItem>
                  <SelectItem value="google">Google AI</SelectItem>
                  <SelectItem value="mistral">Mistral AI</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="model-name">Model Name</Label>
              <Select defaultValue="gpt-4o-mini">
                <SelectTrigger>
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-4o">gpt-4o</SelectItem>
                  <SelectItem value="gpt-4o-mini">gpt-4o-mini</SelectItem>
                  <SelectItem value="gpt-3.5-turbo">gpt-3.5-turbo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="api-key">OpenAI API Key</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="h-6 w-6 p-0"
                >
                  {showApiKey ? <EyeOff size={14} /> : <Eye size={14} />}
                </Button>
              </div>
              <Input
                id="api-key"
                type={showApiKey ? "text" : "password"}
                placeholder="Enter your API key"
              />
            </div>

            <div className="space-y-2">
              <Label>Model Parameters</Label>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="temperature" className="text-xs">
                    Temperature
                  </Label>
                  <Input
                    id="temperature"
                    type="number"
                    defaultValue="0.7"
                    min="0"
                    max="2"
                    step="0.1"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="max-tokens" className="text-xs">
                    Max Tokens
                  </Label>
                  <Input
                    id="max-tokens"
                    type="number"
                    defaultValue="1024"
                    min="1"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case "structured-output":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="output-schema">Output Schema</Label>
              <Textarea
                id="output-schema"
                placeholder="Define JSON schema for structured output"
                className="min-h-[150px] font-mono text-sm"
                defaultValue={`{
  "type": "object",
  "properties": {
    "title": { "type": "string" },
    "summary": { "type": "string" },
    "categories": { "type": "array", "items": { "type": "string" } }
  },
  "required": ["title", "summary"]
}`}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Format</Label>
                <Badge variant="outline">JSON</Badge>
              </div>
              <Select defaultValue="json">
                <SelectTrigger>
                  <SelectValue placeholder="Select output format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="json">JSON</SelectItem>
                  <SelectItem value="yaml">YAML</SelectItem>
                  <SelectItem value="xml">XML</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case "chat-input":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="input-placeholder">Placeholder Text</Label>
              <Input
                id="input-placeholder"
                placeholder="Enter placeholder text"
                defaultValue="Type your message here..."
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="enable-file-upload" />
              <Label htmlFor="enable-file-upload">Enable file uploads</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="enable-streaming" defaultChecked />
              <Label htmlFor="enable-streaming">
                Enable streaming responses
              </Label>
            </div>
          </div>
        );

      default:
        return (
          <div className="py-8 text-center text-muted-foreground">
            Select a component on the canvas to configure its settings
          </div>
        );
    }
  };

  return (
    <Card className="w-full h-full bg-background border-l rounded-none shadow-none">
      <CardHeader className="px-4 py-3 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            {selectedComponent ? (
              <>
                <Badge variant="outline" className="font-normal">
                  {selectedComponent.type}
                </Badge>
                <span>{selectedComponent.name}</span>
              </>
            ) : (
              "Configuration"
            )}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X size={16} />
          </Button>
        </div>
      </CardHeader>

      {selectedComponent && (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-4 border-b">
            <TabsList className="w-full justify-start bg-transparent p-0 h-auto">
              <TabsTrigger
                value="general"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-2 px-3"
              >
                General
              </TabsTrigger>
              <TabsTrigger
                value="connections"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-2 px-3"
              >
                Connections
              </TabsTrigger>
              <TabsTrigger
                value="advanced"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-2 px-3"
              >
                Advanced
              </TabsTrigger>
            </TabsList>
          </div>

          <ScrollArea className="h-[calc(100vh-10rem)]">
            <CardContent className="p-4">
              <TabsContent value="general" className="mt-0 p-0">
                {renderConfigurationFields()}
              </TabsContent>

              <TabsContent value="connections" className="mt-0 p-0">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Input Connections</Label>
                    <div className="border rounded-md p-2 bg-muted/20">
                      <div className="flex items-center justify-between p-2 hover:bg-muted/50 rounded">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-blue-50">
                            Input
                          </Badge>
                          <span className="text-sm">Chat Message</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                        >
                          <X size={14} />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Output Connections</Label>
                    <div className="border rounded-md p-2 bg-muted/20">
                      <div className="flex items-center justify-between p-2 hover:bg-muted/50 rounded">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-green-50">
                            Output
                          </Badge>
                          <span className="text-sm">Response</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                        >
                          <X size={14} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="advanced" className="mt-0 p-0">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="component-id">Component ID</Label>
                    <Input
                      id="component-id"
                      value={selectedComponent.id}
                      readOnly
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="custom-css">Custom CSS</Label>
                    <Textarea
                      id="custom-css"
                      placeholder="Add custom CSS styles"
                      className="font-mono text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Debug Mode</Label>
                      <Switch id="debug-mode" />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Enable detailed logging for this component
                    </p>
                  </div>
                </div>
              </TabsContent>
            </CardContent>
          </ScrollArea>
        </Tabs>
      )}
    </Card>
  );
};

export default ConfigurationPanel;
