import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, RefreshCw, Code, MessageSquare } from "lucide-react";

interface PreviewPanelProps {
  isOpen?: boolean;
  agentName?: string;
  agentDescription?: string;
  onClose?: () => void;
}

const PreviewPanel = ({
  isOpen = true,
  agentName = "Test Agent",
  agentDescription = "This is a preview of your agent configuration. Test it by sending messages below.",
  onClose = () => {},
}: PreviewPanelProps) => {
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<
    Array<{ role: string; content: string; timestamp: Date }>
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("chat");

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = {
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate agent response after a delay
    setTimeout(() => {
      const agentMessage = {
        role: "agent",
        content: `This is a simulated response to your message: "${input}". In a real implementation, this would be the actual response from your configured agent.`,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, agentMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  if (!isOpen) return null;

  return (
    <Card className="w-full h-full max-w-md bg-background border shadow-md flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg">{agentName}</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              {agentDescription}
            </CardDescription>
          </div>
          <Badge variant="outline" className="ml-2">
            Preview
          </Badge>
        </div>
      </CardHeader>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex-1 flex flex-col"
      >
        <TabsList className="grid grid-cols-2 mx-4">
          <TabsTrigger value="chat" className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" />
            Chat
          </TabsTrigger>
          <TabsTrigger value="debug" className="flex items-center gap-1">
            <Code className="h-4 w-4" />
            Debug
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="flex-1 flex flex-col p-0 m-0">
          <ScrollArea className="flex-1 p-4">
            {messages.length === 0 ? (
              <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
                Send a message to test your agent
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <div className="text-sm">{msg.content}</div>
                      <div className="text-xs opacity-70 mt-1 text-right">
                        {formatTime(msg.timestamp)}
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                      <div className="flex space-x-2 items-center">
                        <div className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse"></div>
                        <div className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse delay-150"></div>
                        <div className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse delay-300"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </ScrollArea>

          <CardFooter className="border-t p-3 gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="min-h-9 h-9 resize-none py-2"
            />
            <Button
              size="icon"
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading}
            >
              <Send className="h-4 w-4" />
            </Button>
          </CardFooter>
        </TabsContent>

        <TabsContent value="debug" className="flex-1 flex flex-col p-0 m-0">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-2">
              <div className="text-sm font-medium">Agent Configuration</div>
              <pre className="text-xs bg-muted p-2 rounded overflow-auto">
                {JSON.stringify(
                  {
                    name: agentName,
                    description: agentDescription,
                    tools: ["search", "calculator"],
                    model: "gpt-4",
                    temperature: 0.7,
                    maxTokens: 1000,
                  },
                  null,
                  2,
                )}
              </pre>

              <div className="text-sm font-medium mt-4">Execution Logs</div>
              <div className="space-y-2">
                {messages.map((msg, index) => (
                  <div key={index} className="text-xs bg-muted p-2 rounded">
                    <div className="font-medium">
                      {msg.role.toUpperCase()} ({formatTime(msg.timestamp)})
                    </div>
                    <div className="mt-1">{msg.content}</div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollArea>

          <CardFooter className="border-t p-3">
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={clearChat}
              disabled={messages.length === 0}
            >
              <RefreshCw className="h-3 w-3 mr-2" />
              Clear Session
            </Button>
          </CardFooter>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default PreviewPanel;
