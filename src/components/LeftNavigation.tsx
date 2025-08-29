import React, { useState } from "react";
import {
  LayoutDashboard,
  Bot,
  Wrench,
  Store,
  Users,
  BarChart3,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface LeftNavigationProps {
  activeView: string;
  onViewChange: (view: string) => void;
  forceCollapsed?: boolean;
}

const LeftNavigation: React.FC<LeftNavigationProps> = ({
  activeView,
  onViewChange,
  forceCollapsed = false,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  React.useEffect(() => {
    if (forceCollapsed !== undefined) {
      setIsCollapsed(forceCollapsed);
    }
  }, [forceCollapsed]);

  const navigationItems = [
    {
      id: "observability",
      label: "Dashboard",
      icon: BarChart3,
    },
    {
      id: "agent-builder",
      label: "Agent Builder",
      icon: Bot,
    },
    {
      id: "agent-tools",
      label: "Agent Tools",
      icon: Wrench,
    },
    {
      id: "marketplace",
      label: "Marketplace",
      icon: Store,
    },
    {
      id: "collaboration",
      label: "Collaboration",
      icon: Users,
    },
  ];

  return (
    <div
      className={`${isCollapsed ? "w-16" : "w-64"} bg-background border-r flex flex-col transition-all duration-300 relative`}
    >
      <div className={`${isCollapsed ? "p-2.5" : "p-6"} border-b relative`}>
        <div className="flex items-center gap-2">
          {isCollapsed ? (
            <img
              src="https://i.ibb.co/LTJZpGv/Rezolve-Monogram-Light.png"
              alt="Rezolve Logo"
              className="w-10 h-10 object-contain"
            />
          ) : (
            <img
              src="https://i.ibb.co/wFqKJCgC/logoMain.png"
              alt="Rezolve AI Logo"
              className="h-10 object-contain"
            />
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full bg-background border shadow-sm hover:bg-accent z-10"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <ChevronRight className="h-3 w-3" />
          ) : (
            <ChevronLeft className="h-3 w-3" />
          )}
        </Button>
      </div>

      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;

            return (
              <Button
                key={item.id}
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full h-10 px-3",
                  isCollapsed ? "justify-center" : "justify-start",
                  isActive && "bg-primary/10 text-primary font-medium",
                )}
                onClick={() => onViewChange(item.id)}
              >
                <Icon className={`h-4 w-4 ${isCollapsed ? "" : "mr-3"}`} />
                {!isCollapsed && (
                  <span className="flex-1 text-left">{item.label}</span>
                )}
              </Button>
            );
          })}
        </nav>
      </ScrollArea>

      <div className="p-4 border-t">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
            <span className="text-sm font-medium">SK</span>
          </div>
          {!isCollapsed && (
            <div className="flex-1">
              <p className="text-sm font-medium">Saurabh Kumar</p>
              <p className="text-xs text-muted-foreground">
                saurabh.kumar@rezolve.ai
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeftNavigation;
