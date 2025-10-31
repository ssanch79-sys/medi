import React, { useState } from 'react';
import { getAnswerFromGemini } from '../services/geminiService';
import { SparklesIcon } from './Icons';

interface AskViewProps {
  onQuestionAsked: () => void;
}

const AskView: React.FC<AskViewProps> = ({ onQuestionAsked }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) {
        setError("Per favor, escriu una pregunta.");
        return;
    }
    
    setIsLoading(true);
    setAnswer('');
    setError('');

    try {
        const result = await getAnswerFromGemini(question);
        setAnswer(result);
        onQuestionAsked();
    } catch (err) {
        setError("Hi ha hagut un error. Intenta-ho de nou.");
    } finally {
        setIsLoading(false);
    }
  };
  
  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
    if(error) setError('');
  }

  return (
    <div className="max-w-3xl mx-auto flex flex-col items-center h-full">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-blue-700">Tens algun dubte?</h2>
        <p className="text-gray-600 mt-2">Pregunta el que vulguis sobre el cicle de l'aigua i l'assistent t'ajudarà!</p>
      </div>
      
      <form onSubmit={handleSubmit} className="w-full flex gap-2 mb-6">
        <input
          type="text"
          value={question}
          onChange={handleQuestionChange}
          placeholder="Ex: Per què els núvols són blancs?"
          className="flex-grow p-4 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition-shadow"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="flex items-center gap-2 bg-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? (
             <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : <SparklesIcon />}
          <span>Pregunta</span>
        </button>
      </form>

      {error && <p className="text-red-500 font-semibold mb-4">{error}</p>}

      <div className="w-full flex-grow bg-blue-50/50 rounded-lg p-6 shadow-inner overflow-y-auto">
        {isLoading && (
            <div className="flex flex-col items-center justify-center h-full text-center text-blue-600">
                <SparklesIcon className="w-12 h-12 animate-pulse" />
                <p className="mt-2 text-lg font-semibold">Pensant una bona resposta...</p>
            </div>
        )}
        {answer && (
            <div className="prose max-w-none text-gray-700">
                <p style={{whiteSpace: 'pre-wrap'}}>{answer}</p>
            </div>
        )}
        {!isLoading && !answer && (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                <p>La resposta a la teva pregunta apareixerà aquí.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default AskView;