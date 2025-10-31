import React, { useState, useCallback } from 'react';
import { generateQuizQuestions } from '../services/geminiService';
import type { QuizQuestion, Difficulty } from '../types';
import { RefreshIcon } from './Icons';

interface QuizViewProps {
  onQuizComplete: () => void;
}

const QuizView: React.FC<QuizViewProps> = ({ onQuizComplete }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);

  const fetchQuestions = useCallback(async (selectedDifficulty: Difficulty) => {
    setIsLoading(true);
    const fetchedQuestions = await generateQuizQuestions(selectedDifficulty);
    setQuestions(fetchedQuestions);
    setIsLoading(false);
  }, []);

  const handleDifficultySelect = (selectedDifficulty: Difficulty) => {
    setDifficulty(selectedDifficulty);
    fetchQuestions(selectedDifficulty);
  };

  const handleAnswerSelect = (index: number) => {
    if (isAnswered) return;
    
    setSelectedAnswer(index);
    setIsAnswered(true);
    if (index === questions[currentQuestionIndex].correctAnswerIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      onQuizComplete();
    }
  };
  
  const handleRestart = () => {
      setDifficulty(null);
      setIsFinished(false);
      setCurrentQuestionIndex(0);
      setScore(0);
      setSelectedAnswer(null);
      setIsAnswered(false);
  };

  if (!difficulty) {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <h2 className="text-4xl font-bold text-blue-700 mb-6">Tria la dificultat</h2>
            <div className="flex flex-col sm:flex-row gap-4">
                <button
                    onClick={() => handleDifficultySelect('easy')}
                    className="bg-green-500 text-white font-bold py-4 px-8 rounded-lg text-xl hover:bg-green-600 transition-transform transform hover:scale-105"
                >
                    Fàcil
                </button>
                <button
                    onClick={() => handleDifficultySelect('hard')}
                    className="bg-yellow-500 text-white font-bold py-4 px-8 rounded-lg text-xl hover:bg-yellow-600 transition-transform transform hover:scale-105"
                >
                    Difícil
                </button>
            </div>
        </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-xl font-semibold text-blue-600">Preparant les preguntes...</p>
      </div>
    );
  }

  if (isFinished) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
        <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <h2 className="text-4xl font-bold text-blue-700">Qüestionari completat!</h2>
            <p className="text-2xl mt-4 text-gray-700">La teva puntuació és:</p>
            <p className="text-6xl font-extrabold text-yellow-500 my-4">{score} / {questions.length}</p>
            <div className="w-full max-w-sm bg-gray-200 rounded-full h-6 mt-2">
                <div className="bg-green-500 h-6 rounded-full text-white flex items-center justify-center text-sm font-bold" style={{ width: `${percentage}%` }}>
                    {percentage}%
                </div>
            </div>
            <button
                onClick={handleRestart}
                className="mt-8 flex items-center gap-2 bg-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                <RefreshIcon />
                Tria una altra dificultat
            </button>
        </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  const getButtonClass = (index: number) => {
    if (!isAnswered) {
      return "bg-white hover:bg-blue-100";
    }

    const isCorrectAnswer = index === currentQuestion.correctAnswerIndex;
    const isSelectedAnswer = index === selectedAnswer;

    if (isCorrectAnswer) {
      return "bg-green-200 border-green-500";
    }
    if (isSelectedAnswer && !isCorrectAnswer) {
      return "bg-red-200 border-red-500";
    }
    return "bg-white opacity-60";
  };


  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
      <div className="w-full mb-4">
        <div className="flex justify-between text-sm font-bold text-gray-600">
            <span>Pregunta {currentQuestionIndex + 1} de {questions.length}</span>
            <span>Puntuació: {score}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
            <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}></div>
        </div>
      </div>

      <div className="w-full p-6 bg-blue-50 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">{currentQuestion.question}</h2>
        <div className="space-y-4">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={isAnswered}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-300 font-semibold text-gray-700 ${getButtonClass(index)}`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      
      {isAnswered && (
          <button
            onClick={handleNextQuestion}
            className="mt-6 bg-green-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            {currentQuestionIndex < questions.length - 1 ? "Següent" : "Finalitzar"}
          </button>
      )}
    </div>
  );
};

export default QuizView;
