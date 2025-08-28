import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoadingScreen = () => {
  const navigate = useNavigate();
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    // Navigate after animation completes (about 4 seconds)
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="flex items-center justify-center">
        <div className="logo-animation-container">
          <img 
            src="/lovable-uploads/5f00196e-77e7-4275-b36b-5979f07c7ba7.png" 
            alt="abcY Pay" 
            className="logo-stroke-animation h-20 w-auto"
          />
          <div className="logo-overlay"></div>
        </div>
      </div>
      
      {/* Completion indicator */}
      {animationComplete && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
        </div>
      )}
    </div>
  );
};