
import React, { useState, useEffect } from 'react';

const MESSAGES = [
  "Opening the inner eye...",
  "Weighing the heart against the feather...",
  "Sifting through the void of your choices...",
  "Analyzing patterns of descent...",
  "Determining the architecture of your soul...",
  "The verdict is manifesting..."
];

const Calculating: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-neutral-950 z-[100] flex flex-col items-center justify-center animate-in fade-in duration-1000">
      <div className="relative w-64 h-64 mb-16">
        <div className="absolute inset-0 border border-white/5 rounded-full animate-ping duration-[3000ms]"></div>
        <div className="absolute inset-4 border border-white/10 rounded-full animate-pulse"></div>
        <div className="absolute inset-10 border border-white/20 rounded-full animate-spin-slow"></div>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-32 h-32 text-white/40" viewBox="0 0 100 100">
            <polygon 
              points="50,5 95,25 95,75 50,95 5,75 5,25" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="0.5"
              className="animate-pulse"
            />
            <circle cx="50" cy="50" r="1" fill="white" className="animate-ping" />
          </svg>
        </div>
      </div>

      <div className="text-center space-y-4">
        <h2 className="text-sm tracking-[0.8em] text-neutral-600 uppercase animate-pulse">
          Soul Appraisal in Progress
        </h2>
        <p className="text-white font-serif italic text-xl md:text-2xl tracking-widest min-h-[1.5em] transition-all duration-500">
          {MESSAGES[messageIndex]}
        </p>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}} />
    </div>
  );
};

export default Calculating;
