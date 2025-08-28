import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/LanguageContext";

export const LanguageSelector = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-card/80 backdrop-blur-sm border-border/50 shadow-sm hover:shadow-md transition-all duration-200"
        >
          <Globe className="w-4 h-4 mr-2" />
          {language === 'en' ? t('language.english') : t('language.chinese')}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="bg-card backdrop-blur-sm border-border/50 shadow-lg"
        sideOffset={8}
      >
        <DropdownMenuItem 
          onClick={() => setLanguage('en')}
          className={`cursor-pointer ${language === 'en' ? 'bg-accent' : ''}`}
        >
          <span className="mr-2">🇺🇸</span>
          {t('language.english')}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setLanguage('zh')}
          className={`cursor-pointer ${language === 'zh' ? 'bg-accent' : ''}`}
        >
          <span className="mr-2">🇨🇳</span>
          {t('language.chinese')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};