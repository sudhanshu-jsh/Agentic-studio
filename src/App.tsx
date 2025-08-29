import React, { Suspense, useState } from "react";
import AgentBuilder from "./components/AgentBuilder";
import Dashboard from "./components/Dashboard";
import AgentTools from "./components/AgentTools";
import Marketplace from "./components/Marketplace";
import Collaboration from "./components/Collaboration";
import Observability from "./components/Observability";
import LeftNavigation from "./components/LeftNavigation";
import AgentHome from "./components/home";

function App() {
  const [activeView, setActiveView] = useState("observability");
  const [navigationCollapsed, setNavigationCollapsed] = useState(false);

  const renderContent = () => {
    switch (activeView) {
      case "observability":
        return <Observability />;
      case "agent-builder":
        return <AgentBuilder onNavigationCollapse={setNavigationCollapsed} />;
      case "agent-tools":
        return <AgentTools />;
      case "marketplace":
        return <Marketplace />;
      case "collaboration":
        return <Collaboration />;
      case "dashboard":
        return <Dashboard />;
      case "home":
        return <AgentHome />;
      default:
        return <Observability />;
    }
  };

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <p>Loading...</p>
        </div>
      }
    >
      <div className="flex h-screen bg-background overflow-hidden">
        <LeftNavigation
          activeView={activeView}
          onViewChange={setActiveView}
          forceCollapsed={navigationCollapsed}
        />
        <div className="flex-1 overflow-auto">{renderContent()}</div>
      </div>
    </Suspense>
  );
}

export default App;
