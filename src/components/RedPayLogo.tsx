import { CheckCircle } from "lucide-react";

export const RedPayLogo = () => {
  return (
    <div className="flex items-center justify-center space-x-2 mb-8">
      <div className="relative">
        <CheckCircle className="w-8 h-8 text-accent" />
      </div>
      <div className="text-4xl font-bold">
        <span className="bg-gradient-brand bg-clip-text text-transparent">
          edpay
        </span>
      </div>
    </div>
  );
};