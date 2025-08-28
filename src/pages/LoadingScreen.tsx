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
        <svg
          width="200"
          height="80"
          viewBox="0 0 200 80"
          className="stroke-drawing-animation"
        >
          {/* abcY Pay Logo Text with Stroke Drawing Effect */}
          <g fill="none" stroke="hsl(12, 85%, 65%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {/* Letter 'a' */}
            <path
              d="M10 50 Q10 30, 25 30 Q40 30, 40 45 L40 60 M40 48 L10 48"
              className="draw-letter"
              style={{ animationDelay: '0.2s' }}
            />
            
            {/* Letter 'b' */}
            <path
              d="M50 20 L50 60 M50 30 Q65 30, 65 40 Q65 50, 50 50 M50 50 Q65 50, 65 58 Q65 66, 50 60"
              className="draw-letter"
              style={{ animationDelay: '0.6s' }}
            />
            
            {/* Letter 'c' */}
            <path
              d="M90 30 Q75 30, 75 45 Q75 60, 90 60"
              className="draw-letter"
              style={{ animationDelay: '1.0s' }}
            />
            
            {/* Letter 'Y' */}
            <path
              d="M100 30 L110 45 L120 30 M110 45 L110 60"
              className="draw-letter"
              style={{ animationDelay: '1.4s' }}
            />
            
            {/* Separator Line */}
            <line
              x1="135"
              y1="30"
              x2="135"
              y2="60"
              className="draw-letter"
              style={{ animationDelay: '1.8s' }}
            />
            
            {/* Letter 'P' */}
            <path
              d="M150 30 L150 60 M150 30 L165 30 Q175 30, 175 40 Q175 50, 165 50 L150 50"
              className="draw-letter"
              style={{ animationDelay: '2.2s' }}
            />
            
            {/* Letter 'a' */}
            <path
              d="M185 50 Q185 30, 200 30 Q215 30, 215 45 L215 60 M215 48 L185 48"
              className="draw-letter"
              style={{ animationDelay: '2.6s' }}
            />
            
            {/* Letter 'y' */}
            <path
              d="M225 35 L235 50 L245 35 M235 50 Q235 65, 225 70"
              className="draw-letter"
              style={{ animationDelay: '3.0s' }}
            />
          </g>
          
          {/* Glow Effect */}
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
        </svg>
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