import { RedPayLogo } from "@/components/RedPayLogo";
import { AuthForm } from "@/components/AuthForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl shadow-card backdrop-blur-sm border border-border/50 p-8">
          <RedPayLogo />
          <AuthForm />
        </div>
      </div>
    </div>
  );
};

export default Index;
