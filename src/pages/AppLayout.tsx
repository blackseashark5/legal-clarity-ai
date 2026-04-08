import { useState } from "react";
import { Scale } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Dashboard from "@/components/app/Dashboard";
import DocumentAnalyzer from "@/components/app/DocumentAnalyzer";
import LegalQA from "@/components/app/LegalQA";
import RiskDetector from "@/components/app/RiskDetector";
import ExploreConnect from "@/components/app/ExploreConnect";

const tabs = [
  { id: "dashboard", label: "Dashboard" },
  { id: "court-services", label: "Court Services" },
  { id: "document-analyzer", label: "Document Analyzer" },
  { id: "legal-qa", label: "Legal Q&A" },
  { id: "risk-detector", label: "Risk Detector" },
  { id: "explore", label: "Explore & Connect" },
];

const AppLayout = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  const handleTabClick = (tabId: string) => {
    if (tabId === "court-services") {
      window.location.href = "https://joyful-pegasus-57eb4c.netlify.app/";
      return;
    }
    setActiveTab(tabId);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <Scale className="h-6 w-6 text-primary" />
            <span className="font-heading text-lg font-bold text-foreground">RanveerAI</span>
          </div>
        </div>
        {/* Tabs */}
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto gap-1 -mb-px">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-6">
        {activeTab === "dashboard" && <Dashboard />}
        {activeTab === "document-analyzer" && <DocumentAnalyzer />}
        {activeTab === "legal-qa" && <LegalQA />}
        {activeTab === "risk-detector" && <RiskDetector />}
        {activeTab === "explore" && <ExploreConnect />}
      </main>
    </div>
  );
};

export default AppLayout;
