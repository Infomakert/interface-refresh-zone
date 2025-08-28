import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "en" | "zh";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    "auth.title": "Authorize Reader",
    "auth.subtitle": "Generate your API Key on the merchant Portal",
    "auth.apiKey": "API Key",
    "auth.apiKeyPlaceholder": "Enter your API key",
    "auth.username": "Username", 
    "auth.usernamePlaceholder": "Enter your username",
    "auth.password": "Password",
    "auth.passwordPlaceholder": "Enter your password",
    "auth.login": "Login",
    "auth.validating": "Validating...",
    "auth.or": "OR",
    "auth.needHelp": "Need help?",
    "auth.contactSupport": "Contact Support",
    "auth.required": "Authentication Required",
    "auth.requiredDescription": "Please provide either an API Key or Username/Password",
    "processing.title": "Processing Authentication...",
    "processing.subtitle": "Please wait while we verify your credentials",
    "processing.success": "Authentication Successful!",
    "processing.redirect": "Redirecting to dashboard...",
    "processing.security": "Secure connection established • 256-bit encryption"
  },
  zh: {
    "auth.title": "授权读卡器",
    "auth.subtitle": "在商户门户生成您的API密钥",
    "auth.apiKey": "API密钥",
    "auth.apiKeyPlaceholder": "输入您的API密钥",
    "auth.username": "用户名",
    "auth.usernamePlaceholder": "输入您的用户名", 
    "auth.password": "密码",
    "auth.passwordPlaceholder": "输入您的密码",
    "auth.login": "登录",
    "auth.validating": "验证中...",
    "auth.or": "或",
    "auth.needHelp": "需要帮助？",
    "auth.contactSupport": "联系客服",
    "auth.required": "需要身份验证",
    "auth.requiredDescription": "请提供API密钥或用户名/密码",
    "processing.title": "正在处理身份验证...",
    "processing.subtitle": "请稍候，我们正在验证您的凭据",
    "processing.success": "身份验证成功！",
    "processing.redirect": "正在重定向到控制台...",
    "processing.security": "已建立安全连接 • 256位加密"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("redpay-language") as Language;
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "zh")) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("redpay-language", lang);
  };

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div className={language === "zh" ? "font-chinese" : ""}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};