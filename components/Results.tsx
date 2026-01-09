
import React, { useMemo } from 'react';
import { SinType, QuizResults } from '../types';
import { SINS } from '../constants';

interface ResultsProps {
  scores: QuizResults;
  onRestart: () => void;
}

const Results: React.FC<ResultsProps> = ({ scores, onRestart }) => {
  const { dominantSin, allEqual } = useMemo(() => {
    const scoreValues = Object.values(scores);
    const firstScore = scoreValues[0];
    const isAllEqual = scoreValues.every(val => val === firstScore);

    const sorted = Object.entries(scores)
      .sort(([, a], [, b]) => (b as number) - (a as number))
      .map(([type]) => type as SinType);

    return { 
      dominantSin: sorted[0],
      allEqual: isAllEqual
    };
  }, [scores]);

  const equalData = {
    type: "EQUAL",
    description: "Your soul exists in a state of perfect equilibrium. No single vice claims dominance, for they all reside within you in equal measure. You are the mirror that reflects the entirety of human failing.",
    color: "white",
    imageUrl: "" 
  };

  const dominantData = allEqual ? equalData : SINS[dominantSin];
  const displayTitle = allEqual ? "EQUAL" : dominantSin;

  const BalanceIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" className="w-3/5 h-3/5 text-white/40">
      <path d="M12 3v18" /><path d="M22 7c0 5.333-2 10-10 10S2 12.333 2 7" /><path d="M16 7c0 2.21-1.79 4-4 4s-4-1.79-4-4" /><circle cx="12" cy="7" r="1" fill="currentColor" />
    </svg>
  );

  const getColorHex = (colorClass: string) => {
    const map: Record<string, string> = {
      'amber-500': '#f59e0b', 'emerald-500': '#10b981', 'rose-500': '#f43f5e', 'indigo-500': '#6366f1', 'orange-500': '#f97316', 'red-600': '#dc2626', 'sky-500': '#0ea5e9', 'white': '#ffffff'
    };
    return map[colorClass] || '#ffffff';
  };

  return (
    <div className="animate-in fade-in duration-1000 max-w-5xl mx-auto py-12 px-4">
      <header className="text-center mb-20">
        <h2 className="text-sm tracking-[0.5em] text-neutral-500 uppercase mb-8 italic">The Verdict has been cast</h2>
        <div className="relative inline-block mb-10 group">
           <div className="absolute -inset-10 blur-[80px] rounded-full opacity-40" style={{ backgroundColor: `${getColorHex(dominantData.color)}22` }}></div>
           <div className="relative">
              <span className="block text-[10px] tracking-[1em] text-neutral-600 uppercase mb-4">{allEqual ? "The Absolute Singularity" : "Your Primary Affliction"}</span>
              <h1 className="text-6xl md:text-9xl font-serif text-white tracking-[0.2em] uppercase transition-all duration-700">{displayTitle}</h1>
              <div className="mt-4 h-1.5 w-32 mx-auto" style={{ backgroundColor: getColorHex(dominantData.color) }}></div>
           </div>
        </div>
        <p className="text-neutral-300 max-w-2xl mx-auto text-lg italic leading-relaxed font-light mt-12">{dominantData.description}</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
        <div className="space-y-8">
           <div className="flex justify-between items-end border-b border-neutral-900 pb-4 mb-8">
              <h3 className="text-xs tracking-[0.4em] text-neutral-500 uppercase font-mono">Soul Saturation</h3>
              <span className="text-[10px] text-neutral-700 font-mono uppercase tracking-widest">Individual Intensity Profile</span>
           </div>
           {Object.values(SINS).map((sin) => {
             const score = scores[sin.type];
             const hexColor = getColorHex(sin.color);
             const isActive = score > 0;
             return (
               <div key={sin.type} className="group relative">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full border border-neutral-800 overflow-hidden bg-black shadow-lg p-0.5 transition-all duration-500 group-hover:border-neutral-600" style={{ boxShadow: score > 30 ? `0 0 15px ${hexColor}44` : 'none' }}>
                        <img src={sin.imageUrl} alt={sin.type} className={`w-full h-full object-cover rounded-full transition-all duration-700 ${score > 10 ? 'grayscale-0' : 'grayscale opacity-40'}`} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold tracking-[0.3em] uppercase transition-colors duration-500" style={{ color: score > 20 ? hexColor : '#525252' }}>{sin.type}</span>
                        <span className="text-[9px] text-neutral-700 uppercase tracking-widest">Affinities Detected</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-neutral-400">{score}/100</span>
                  </div>
                  <div className="h-2 w-full bg-neutral-900/50 rounded-full overflow-hidden border border-white/5 p-[1px]">
                    <div className="h-full transition-all duration-[2000ms] ease-out rounded-full" style={{ width: `${score}%`, backgroundColor: hexColor, boxShadow: score > 50 ? `0 0 10px ${hexColor}88` : 'none' }}></div>
                  </div>
               </div>
             );
           })}
        </div>

        <div className="bg-neutral-900/10 border border-white/5 p-10 md:p-14 text-center backdrop-blur-md relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 opacity-60" style={{ backgroundColor: getColorHex(dominantData.color) }}></div>
          <div className="relative mb-12 flex items-center justify-center">
            <div className="absolute -inset-10 border rounded-full animate-spin-slow" style={{ borderColor: `${getColorHex(dominantData.color)}22` }}></div>
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border border-white/10 shadow-2xl relative z-10 flex items-center justify-center bg-neutral-950 transition-all duration-700" style={{ boxShadow: `0 0 40px ${getColorHex(dominantData.color)}33` }}>
               {allEqual ? <BalanceIcon /> : <img src={dominantData.imageUrl} alt={displayTitle} className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" />}
            </div>
          </div>
          <h3 className="text-3xl font-serif text-white mb-6 tracking-[0.3em] uppercase">Core Frequency: {displayTitle}</h3>
          <p className="text-neutral-400 leading-relaxed italic mb-10 text-sm md:text-lg font-light">
            {allEqual ? "The weights are identical. Your heart balances perfectly between every path of descent." : `Your soul colors its decisions through the lens of ${dominantSin.toLowerCase()}. It resonates with an intensity of ${scores[dominantSin]}%.`}
          </p>
          <div className="w-full p-8 bg-black/40 border border-white/5 text-[10px] text-neutral-500 tracking-[0.3em] leading-loose italic uppercase">"To know oneself is to know the universe and its shadows."</div>
        </div>
      </div>

      <div className="flex justify-center pt-8">
        <button onClick={onRestart} className="group relative px-20 py-8 bg-transparent border border-neutral-800 text-neutral-500 hover:text-white transition-all overflow-hidden uppercase tracking-[0.6em] text-xs font-bold">
          <span className="relative z-10">Return to the Void</span>
          <div className="absolute inset-0 bg-neutral-900 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700"></div>
        </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 40s linear infinite; }
      `}} />
    </div>
  );
};

export default Results;
