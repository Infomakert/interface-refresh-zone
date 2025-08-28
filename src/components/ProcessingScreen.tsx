import { CheckCircle, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProcessingScreenProps {
  onComplete?: () => void;
}

export const ProcessingScreen = ({ onComplete }: ProcessingScreenProps) => {
  const [stage, setStage] = useState<'processing' | 'success'>('processing');
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => {
      setStage('success');
      
      // Call onComplete after showing success
      if (onComplete) {
        setTimeout(onComplete, 1500);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center z-50 animate-fade-in">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-white/10 rounded-full animate-pulse-slow" />
        <div className="absolute top-3/4 right-1/4 w-24 h-24 border border-white/10 rounded-full animate-pulse-slow" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-1/4 left-1/3 w-16 h-16 border border-white/10 rounded-full animate-pulse-slow" style={{ animationDelay: "2s" }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center">
        {/* Logo */}
        <div className="flex items-center justify-center space-x-3 mb-8 animate-scale-in">
          <div className="relative">
            <CheckCircle className="w-10 h-10 text-teal-400" />
          </div>
          <div className="text-5xl font-bold">
            <span className="text-white">ed</span>
            <span className="text-white">pay</span>
          </div>
          <div className="text-teal-400 text-lg font-semibold">
            PCG
          </div>
        </div>

        {/* Processing Animation */}
        <div className="mb-6">
          {stage === 'processing' ? (
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="w-8 h-8 text-teal-400 animate-spin-slow" />
              <p className="text-white text-lg font-medium">{t("processing.title")}</p>
              <p className="text-gray-400 text-sm">{t("processing.subtitle")}</p>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-4 animate-scale-in">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <p className="text-white text-lg font-medium">{t("processing.success")}</p>
              <p className="text-gray-400 text-sm">{t("processing.redirect")}</p>
            </div>
          )}
        </div>

        {/* Progress Indicator */}
        <div className="w-64 bg-gray-700 rounded-full h-1 mx-auto overflow-hidden">
          <div 
            className={`h-full bg-gradient-to-r from-purple-500 to-teal-400 rounded-full transition-all ease-out ${
              stage === 'processing' ? 'w-3/4 duration-[3000ms]' : 'w-full duration-1000'
            }`}
          />
        </div>

        {/* Status Dots */}
        <div className="flex justify-center space-x-2 mt-6">
          {[1, 2, 3].map((dot) => (
            <div
              key={dot}
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                stage === 'success' || dot <= 2
                  ? 'bg-teal-400' 
                  : 'bg-gray-600'
              } animate-pulse-slow`}
              style={{ animationDelay: `${dot * 0.3}s` }}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 text-center">
        <p className="text-gray-500 text-xs">
          {t("processing.security")}
        </p>
      </div>
    </div>
  );
};