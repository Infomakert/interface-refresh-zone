import { useState } from "react";
import { Button } from "@/components/ui/button";
import { QrCode, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface AuthInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  showQrIcon?: boolean;
  showPasswordToggle?: boolean;
}

const AuthInput = ({ 
  label, 
  value, 
  onChange, 
  type = "text", 
  placeholder,
  showQrIcon,
  showPasswordToggle
}: AuthInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  const inputType = showPasswordToggle ? (showPassword ? "text" : "password") : type;

  return (
    <div className="relative mb-6">
      <label className="block text-sm font-medium text-muted-foreground mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            "w-full bg-transparent text-foreground placeholder:text-muted-foreground/60",
            "border-0 border-b-2 border-border focus:border-primary",
            "pb-3 pt-2 px-0 focus:outline-none transition-all duration-300",
            "text-base",
            isFocused && "border-primary shadow-input",
            showQrIcon && "pr-10",
            showPasswordToggle && "pr-10"
          )}
        />
        {showQrIcon && (
          <button 
            type="button"
            className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-primary hover:text-primary/80 transition-colors"
          >
            <QrCode className="w-5 h-5" />
          </button>
        )}
        {showPasswordToggle && (
          <button 
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      </div>
    </div>
  );
};

export const AuthForm = () => {
  const [apiKey, setApiKey] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    console.log("Auth data:", { apiKey, username, password });
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">Authorize Reader</h1>
        <p className="text-muted-foreground">
          Generate your API Key on the merchant Portal
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <AuthInput
          label="API Key"
          value={apiKey}
          onChange={setApiKey}
          placeholder="Enter your API key"
          showQrIcon
        />

        <div className="flex items-center justify-center py-4">
          <div className="flex-1 border-t border-border"></div>
          <div className="px-4 text-sm text-muted-foreground font-medium">OR</div>
          <div className="flex-1 border-t border-border"></div>
        </div>

        <AuthInput
          label="Username"
          value={username}
          onChange={setUsername}
          placeholder="Enter your username"
        />

        <AuthInput
          label="Password"
          value={password}
          onChange={setPassword}
          placeholder="Enter your password"
          showPasswordToggle
        />

        <Button
          type="submit"
          variant="auth"
          size="lg"
          className="w-full mt-8 h-12"
          disabled={isLoading}
        >
          {isLoading ? "Authorizing..." : "Login"}
        </Button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          Need help? <button className="text-primary hover:underline font-medium">Contact Support</button>
        </p>
      </div>
    </div>
  );
};