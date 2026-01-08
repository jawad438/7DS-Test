
import React, { useState } from 'react';
import { SINS } from '../constants';
import { SinData } from '../types';

interface LandingProps {
  onStart: () => void;
}

const Landing: React.FC<LandingProps> = ({ onStart }) => {
  const [hoveredSin, setHoveredSin] = useState<SinData | null>(null);
  const sinArray = Object.values(SINS);

  // Equalized radii to ensure a perfect 1:1 geometric shape
  const radius = 38; // 38% of the square container

  return (
    <div className="animate-in fade-in duration-1000 py-12 flex flex-col items-center overflow-x-hidden min-h-screen">
      <header className="text-center mb-8 z-30 relative">
        <h1 className="text-7xl md:text-9xl font-serif text-white tracking-[0.4em] mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">VITIUM</h1>
        <div className="flex items-center justify-center gap-6">
          <div className="h-px w-16 bg-neutral-800"></div>
          <p className="text-neutral-500 text-sm md:text-base tracking-[0.6em] uppercase italic font-light">
            Seven Paths of Descent
          </p>
          <div className="h-px w-16 bg-neutral-800"></div>
        </div>
      </header>

      {/* Heptagon Visualization Container - Enforced Aspect Square */}
      <div className="relative w-full aspect-square max-w-screen-md flex items-center justify-center mb-8">
        
        {/* Central Information Overlay */}
        <div className="absolute z-40 text-center max-w-[280px] md:max-w-[400px] transition-all duration-700 pointer-events-none">
          {hoveredSin ? (
            <div className="space-y-6 animate-in fade-in zoom-in-95 backdrop-blur-md bg-black/40 p-8 rounded-full border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.8)]">
              <h3 className={`text-4xl md:text-6xl font-serif text-${hoveredSin.color} tracking-[0.2em] uppercase`}>
                {hoveredSin.type}
              </h3>
              <p className="text-neutral-200 text-xs md:text-base leading-relaxed italic font-light tracking-wide px-4">
                {hoveredSin.description}
              </p>
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in flex flex-col items-center">
              <p className="text-neutral-400 text-base md:text-xl leading-relaxed font-light px-8 italic tracking-[0.15em] opacity-80">
                "The soul is dyed by the color of its thoughts."
              </p>
              <div className="h-16 w-px bg-gradient-to-b from-neutral-800 to-transparent"></div>
              <p className="text-neutral-600 text-[10px] md:text-xs uppercase tracking-[0.5em] animate-pulse">Hover the icons to begin</p>
            </div>
          )}
        </div>

        {/* Geometric Web Layer - Square Viewbox */}
        <svg 
          className="absolute inset-0 w-full h-full z-10 opacity-20 pointer-events-none overflow-visible" 
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Main Heptagon Perimeter */}
          <polygon 
            points={sinArray.map((_, i) => {
              const a = (i * (2 * Math.PI) / 7) - (Math.PI / 2);
              return `${50 + Math.cos(a) * radius},${50 + Math.sin(a) * radius}`;
            }).join(' ')}
            className="fill-none stroke-neutral-500 stroke-[0.2]"
          />

          {/* Inner Connecting Lines (Web) */}
          {sinArray.map((_, i) => {
            const a1 = (i * (2 * Math.PI) / 7) - (Math.PI / 2);
            return sinArray.map((_, j) => {
              if (i === j) return null;
              const a2 = (j * (2 * Math.PI) / 7) - (Math.PI / 2);
              return (
                <line 
                  key={`line-${i}-${j}`}
                  x1={50 + Math.cos(a1) * radius} y1={50 + Math.sin(a1) * radius}
                  x2={50 + Math.cos(a2) * radius} y2={50 + Math.sin(a2) * radius}
                  className="stroke-neutral-800 stroke-[0.05] opacity-40"
                />
              );
            });
          })}
        </svg>

        {/* Heptagon Points (Images) */}
        <div className="absolute inset-0 z-20">
          {sinArray.map((sin, index) => {
            const angle = (index * (2 * Math.PI) / 7) - (Math.PI / 2);
            const isHovered = hoveredSin?.type === sin.type;
            
            // Percentage positions matching the SVG polygon points
            const xPos = 50 + Math.cos(angle) * radius;
            const yPos = 50 + Math.sin(angle) * radius;

            return (
              <div 
                key={sin.type}
                onMouseEnter={() => setHoveredSin(sin)}
                onMouseLeave={() => setHoveredSin(null)}
                className="absolute group cursor-pointer transition-all duration-1000 ease-out"
                style={{
                  left: `${xPos}%`,
                  top: `${yPos}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                {/* Visual Circle Point */}
                <div className="flex flex-col items-center justify-center">
                   <div className={`relative w-28 h-28 md:w-48 md:h-48 overflow-hidden rounded-full border transition-all duration-700 shadow-[0_0_60px_rgba(0,0,0,1)] bg-neutral-950 ${isHovered ? `border-${sin.color} scale-110 shadow-${sin.color}/30` : 'border-neutral-900 group-hover:border-neutral-700 scale-100'}`}>
                      <img 
                        src={sin.imageUrl} 
                        alt={sin.type} 
                        className={`w-full h-full object-cover transition-all duration-1000 ${isHovered ? 'opacity-100 grayscale-0 scale-100' : 'opacity-30 grayscale group-hover:opacity-60 group-hover:grayscale-[40%] scale-105'}`}
                      />
                      
                      {/* Gradient Overlays */}
                      <div className={`absolute inset-0 bg-gradient-to-t from-black/100 via-black/20 to-transparent transition-opacity duration-700 ${isHovered ? 'opacity-40' : 'opacity-80'}`}></div>
                      
                      {/* Floating Text Label */}
                      <div className="absolute inset-0 flex items-end justify-center pb-5 md:pb-8 pointer-events-none">
                        <span className={`text-[9px] md:text-xs tracking-[0.5em] font-serif uppercase transition-all duration-500 ${isHovered ? `text-${sin.color} translate-y-[-5px]` : 'text-neutral-600'}`}>
                          {sin.type}
                        </span>
                      </div>
                      
                      {/* Inner Glow on Hover */}
                      <div className={`absolute inset-0 bg-${sin.color}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>
                   </div>

                   {/* Underglow Effect */}
                   <div className={`absolute -inset-8 rounded-full blur-3xl transition-opacity duration-1000 opacity-0 group-hover:opacity-10 bg-${sin.color}`}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Area */}
      <div className="flex flex-col items-center justify-center gap-12 mt-4 md:mt-8 z-50 relative pb-24">
        <button
          onClick={onStart}
          className="group relative px-28 py-8 bg-white text-black font-bold text-2xl tracking-[0.6em] uppercase transition-all duration-700 rounded-none overflow-hidden hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.1)]"
        >
          <span className="relative z-10 group-hover:text-white transition-colors duration-500">Initiate Rite</span>
          <div className="absolute inset-0 bg-neutral-950 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
        </button>
        <div className="flex flex-col items-center gap-6">
          <p className="text-neutral-500 text-sm tracking-[0.7em] uppercase font-light opacity-50">One Hundred Inquiries</p>
          <div className="flex items-center gap-6 opacity-20">
             <div className="h-px w-20 bg-white"></div>
             <div className="w-2 h-2 rotate-45 border border-white"></div>
             <div className="h-px w-20 bg-white"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
