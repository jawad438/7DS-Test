
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { ViewState, SinType, QuizResults, ResponseValue } from './types';
import { QUESTIONS } from './constants';
import Landing from './components/Landing';
import Quiz from './components/Quiz';
import Results from './components/Results';
import Calculating from './components/Calculating';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('landing');
  const [answers, setAnswers] = useState<Record<number, ResponseValue>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const startQuiz = useCallback(() => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setView('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const resetToLanding = useCallback(() => {
    setView('landing');
    setAnswers({});
    setCurrentQuestionIndex(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleAnswer = useCallback((questionId: number, value: ResponseValue) => {
    if (view !== 'quiz') return;

    setAnswers(prev => ({ ...prev, [questionId]: value }));
    
    const isLastQuestion = currentQuestionIndex >= QUESTIONS.length - 1;

    if (isLastQuestion) {
      setView('calculating');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  }, [currentQuestionIndex, view]);

  useEffect(() => {
    if (view === 'calculating') {
      const timer = setTimeout(() => {
        setView('results');
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [view]);

  const handleBack = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else {
      setView('landing');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentQuestionIndex]);

  const results = useMemo(() => {
    if (view !== 'results' && view !== 'calculating') return null;

    // Weight Map to ensure base resonance
    const weights: Record<ResponseValue, number> = {
      0: 1,  // Strongly Unrelatable
      1: 3,  // Unrelatable
      2: 7,  // Relatable
      3: 12  // Strongly Relatable
    };

    const rawScores: QuizResults = {
      [SinType.PRIDE]: 0,
      [SinType.GREED]: 0,
      [SinType.LUST]: 0,
      [SinType.ENVY]: 0,
      [SinType.GLUTTONY]: 0,
      [SinType.WRATH]: 0,
      [SinType.SLOTH]: 0,
    };

    QUESTIONS.forEach(q => {
      const val = answers[q.id] ?? 0;
      rawScores[q.sin] += weights[val];
    });

    const totalWeightedScore = Object.values(rawScores).reduce((acc, val) => acc + val, 0);
    
    const normalized: QuizResults = { ...rawScores };
    let currentSum = 0;
    const sinKeys = Object.keys(normalized) as SinType[];

    sinKeys.forEach((sin) => {
      const share = Math.round((rawScores[sin] / totalWeightedScore) * 100);
      normalized[sin] = share;
      currentSum += share;
    });

    // Adjust rounding to exactly 100
    if (currentSum !== 100) {
      const diff = 100 - currentSum;
      const dominantSin = sinKeys.reduce((a, b) => rawScores[a] > rawScores[b] ? a : b);
      normalized[dominantSin] += diff;
    }

    return normalized;
  }, [answers, view]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center py-6 px-4 transition-colors duration-700 bg-neutral-950">
      <div className="w-full max-w-screen-2xl">
        {view === 'landing' && <Landing onStart={startQuiz} />}
        
        {view === 'quiz' && (
          <div className="max-w-4xl mx-auto w-full pt-12">
            <Quiz 
              question={QUESTIONS[currentQuestionIndex]}
              index={currentQuestionIndex}
              total={QUESTIONS.length}
              onAnswer={handleAnswer}
              onBack={handleBack}
              onExit={resetToLanding}
              currentValue={answers[QUESTIONS[currentQuestionIndex].id]}
            />
          </div>
        )}

        {view === 'calculating' && <Calculating />}

        {view === 'results' && results && (
          <Results 
            scores={results} 
            onRestart={resetToLanding} 
          />
        )}
      </div>
    </div>
  );
};

export default App;
