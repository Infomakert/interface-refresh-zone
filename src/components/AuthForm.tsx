import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { QrCode, Eye, EyeOff } from "lucide-react";

export const AuthForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    apiKey: "",
    username: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    navigate("/loading");
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
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              API Key
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.apiKey}
                onChange={(e) => setFormData({...formData, apiKey: e.target.value})}
                placeholder="Enter your API key"
                className="w-full bg-transparent text-foreground border-b-2 border-border focus:border-primary pb-3 pt-2 focus:outline-none transition-colors pr-10"
              />
              <QrCode className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
            </div>
          </div>

          <div className="flex items-center justify-center py-4">
            <div className="flex-1 border-t border-border"></div>
            <span className="px-4 text-sm text-muted-foreground">OR</span>
            <div className="flex-1 border-t border-border"></div>
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Username
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              placeholder="Enter your username"
              className="w-full bg-transparent text-foreground border-b-2 border-border focus:border-primary pb-3 pt-2 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                placeholder="Enter your password"
                className="w-full bg-transparent text-foreground border-b-2 border-border focus:border-primary pb-3 pt-2 focus:outline-none transition-colors pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          variant="auth"
          className="w-full mt-8 h-12"
          disabled={isLoading}
        >
          {isLoading ? "Authorizing..." : "Login"}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Need help? <button className="text-primary hover:underline">Contact Support</button>
        </p>
      </div>
    </div>
  );
};