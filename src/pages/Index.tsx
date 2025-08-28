import { useState } from "react";
import { RedPayLogo } from "@/components/RedPayLogo";
import { AuthForm } from "@/components/AuthForm";
import { ProcessingScreen } from "@/components/ProcessingScreen";
import { LanguageSelector } from "@/components/LanguageSelector";

const Index = () => {
  const [showProcessing, setShowProcessing] = useState(false);

  const handleProcessing = () => {
    setShowProcessing(true);
  };

  const handleProcessingComplete = () => {
    // Here you would typically navigate to the dashboard
    console.log("Authentication complete - redirect to dashboard");
    // For demo purposes, we'll just reset to login
    setTimeout(() => setShowProcessing(false), 1000);
  };

  if (showProcessing) {
    return <ProcessingScreen onComplete={handleProcessingComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-subtle flex flex-col">
      {/* Top Header with Language Selector */}
      <div className="w-full flex justify-between items-center p-6">
        <div className="flex items-center space-x-3">
          <div className="text-2xl font-bold">
            <span className="bg-gradient-brand bg-clip-text text-transparent">RedPay</span>
          </div>
        </div>
        <LanguageSelector />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-2xl shadow-card backdrop-blur-sm border border-border/50 p-8">
            <RedPayLogo />
            <AuthForm onProcessing={handleProcessing} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
