import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const LoadingScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/"), 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="logo-animation-container">
        <img 
          src="/lovable-uploads/5f00196e-77e7-4275-b36b-5979f07c7ba7.png" 
          alt="abcY Pay" 
          className="logo-stroke-animation h-20 w-auto"
        />
        <div className="logo-overlay"></div>
      </div>
    </div>
  );
};