import { useState } from "react";
import { Button } from "@/components/ui/button";
import { QrCode, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

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

interface AuthFormProps {
  onProcessing: () => void;
}

export const AuthForm = ({ onProcessing }: AuthFormProps) => {
  const [apiKey, setApiKey] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const hasApiKey = apiKey.trim().length > 0;
    const hasCredentials = username.trim().length > 0 && password.trim().length > 0;
    
    if (!hasApiKey && !hasCredentials) {
      toast({
        title: t("auth.required"),
        description: t("auth.requiredDescription"),
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Brief loading state before processing screen
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setIsLoading(false);
    onProcessing();
  };

  return (
    <div className="w-full max-w-md animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">{t("auth.title")}</h1>
        <p className="text-muted-foreground">
          {t("auth.subtitle")}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <AuthInput
          label={t("auth.apiKey")}
          value={apiKey}
          onChange={setApiKey}
          placeholder={t("auth.apiKeyPlaceholder")}
          showQrIcon
        />

        <div className="flex items-center justify-center py-4">
          <div className="flex-1 border-t border-border"></div>
          <div className="px-4 text-sm text-muted-foreground font-medium">{t("auth.or")}</div>
          <div className="flex-1 border-t border-border"></div>
        </div>

        <AuthInput
          label={t("auth.username")}
          value={username}
          onChange={setUsername}
          placeholder={t("auth.usernamePlaceholder")}
        />

        <AuthInput
          label={t("auth.password")}
          value={password}
          onChange={setPassword}
          placeholder={t("auth.passwordPlaceholder")}
          showPasswordToggle
        />

        <Button
          type="submit"
          variant="auth"
          size="lg"
          className="w-full mt-8 h-12"
          disabled={isLoading}
        >
          {isLoading ? t("auth.validating") : t("auth.login")}
        </Button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          {t("auth.needHelp")} <button className="text-primary hover:underline font-medium">{t("auth.contactSupport")}</button>
        </p>
      </div>
    </div>
  );
};