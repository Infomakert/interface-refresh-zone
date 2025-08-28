import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Auth Form
    'auth.title': 'Authorize Reader',
    'auth.subtitle': 'Generate your API Key on the merchant Portal',
    'auth.apiKey': 'API Key',
    'auth.apiKeyPlaceholder': 'Enter your API key',
    'auth.username': 'Username',
    'auth.usernamePlaceholder': 'Enter your username',
    'auth.password': 'Password',
    'auth.passwordPlaceholder': 'Enter your password',
    'auth.or': 'OR',
    'auth.login': 'Login',
    'auth.validating': 'Validating...',
    'auth.needHelp': 'Need help?',
    'auth.contactSupport': 'Contact Support',
    'auth.authRequired': 'Authentication Required',
    'auth.authRequiredDesc': 'Please provide either an API Key or Username/Password',
    
    // Processing Screen
    'processing.title': 'Processing Authentication...',
    'processing.subtitle': 'Please wait while we verify your credentials',
    'processing.success': 'Authentication Successful!',
    'processing.redirect': 'Redirecting to dashboard...',
    'processing.footer': 'Secure connection established • 256-bit encryption',
    
    // Language Selector
    'language.english': 'English',
    'language.chinese': '中文'
  },
  zh: {
    // Auth Form
    'auth.title': '授权读卡器',
    'auth.subtitle': '在商户门户生成您的API密钥',
    'auth.apiKey': 'API密钥',
    'auth.apiKeyPlaceholder': '请输入您的API密钥',
    'auth.username': '用户名',
    'auth.usernamePlaceholder': '请输入您的用户名',
    'auth.password': '密码',
    'auth.passwordPlaceholder': '请输入您的密码',
    'auth.or': '或',
    'auth.login': '登录',
    'auth.validating': '验证中...',
    'auth.needHelp': '需要帮助？',
    'auth.contactSupport': '联系支持',
    'auth.authRequired': '需要身份验证',
    'auth.authRequiredDesc': '请提供API密钥或用户名/密码',
    
    // Processing Screen
    'processing.title': '正在处理身份验证...',
    'processing.subtitle': '请稍候，我们正在验证您的凭据',
    'processing.success': '身份验证成功！',
    'processing.redirect': '正在跳转到仪表板...',
    'processing.footer': '已建立安全连接 • 256位加密',
    
    // Language Selector
    'language.english': 'English',
    'language.chinese': '中文'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('redpay-language');
    return (saved as Language) || 'en';
  });

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    localStorage.setItem('redpay-language', newLanguage);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  useEffect(() => {
    // Add Chinese font class when language is Chinese
    if (language === 'zh') {
      document.documentElement.classList.add('font-chinese');
    } else {
      document.documentElement.classList.remove('font-chinese');
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};