
import React from 'react';
import { Question, ResponseValue } from '../types';

interface QuizProps {
  question: Question;
  index: number;
  total: number;
  onAnswer: (id: number, value: ResponseValue) => void;
  onBack: () => void;
  onExit: () => void;
  currentValue?: ResponseValue;
}

const Quiz: React.FC<QuizProps> = ({ question, index, total, onAnswer, onBack, onExit }) => {
  const progress = ((index + 1) / total) * 100;

  const options: { label: string; value: ResponseValue }[] = [
    { label: 'Strongly Unrelatable', value: 0 },
    { label: 'Unrelatable', value: 1 },
    { label: 'Relatable', value: 2 },
    { label: 'Strongly Relatable', value: 3 },
  ];

  return (
    <div className="flex flex-col min-h-[60vh] animate-in fade-in slide-in-from-bottom-8 duration-500">
      <div className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <span className="text-neutral-500 text-sm tracking-widest uppercase">Question {index + 1} / {total}</span>
          <div className="flex gap-6">
            <button 
              onClick={onBack}
              className="text-neutral-500 hover:text-white text-[10px] md:text-xs uppercase tracking-widest transition-colors flex items-center gap-2 group"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span> Go Back
            </button>
            <button 
              onClick={onExit}
              className="text-neutral-600 hover:text-red-500 text-[10px] md:text-xs uppercase tracking-widest transition-colors flex items-center gap-2 group"
            >
              ✕ Exit Test
            </button>
          </div>
        </div>
        <div className="w-full h-1 bg-neutral-900 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white transition-all duration-300" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-3xl md:text-4xl font-serif text-white mb-12 max-w-2xl leading-relaxed italic">
          "{question.text}"
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => onAnswer(question.id, option.value)}
              className="group relative px-6 py-5 bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-500 transition-all text-center uppercase tracking-widest font-medium text-sm md:text-base"
            >
              {option.label}
              <div className="absolute inset-0 border border-transparent group-hover:border-white/20 transition-all pointer-events-none"></div>
            </button>
          ))}
        </div>
      </div>
      
      <footer className="mt-12 text-center">
         <p className="text-neutral-600 text-xs italic">Be honest with yourself. Your soul already knows the truth.</p>
      </footer>
    </div>
  );
};

export default Quiz;
