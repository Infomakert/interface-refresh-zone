import { CheckCircle } from "lucide-react";

export const RedPayLogo = () => {
  return (
    <div className="flex items-center justify-center space-x-2 mb-8">
      <div className="relative">
        <CheckCircle className="w-8 h-8 text-accent" />
      </div>
      <img 
        src="/lovable-uploads/76a59f3f-50d2-427c-a6b2-0fa574d467e0.png" 
        alt="abcy Pay" 
        className="h-8 w-auto"
      />
    </div>
  );
};