import React, { useState, useEffect } from 'react';
import WaterCycleDiagram from './components/WaterCycleDiagram';
import StageInfoModal from './components/StageInfoModal';
import QuizView from './components/QuizView';
import AskView from './components/AskView';
import { STAGE_DETAILS } from './constants';
import { Stage, BadgeType } from './types';
import { BookOpenIcon, QuestionMarkCircleIcon, SparklesIcon, TrophyIcon, LightbulbIcon } from './components/Icons';

type View = 'diagram' | 'quiz' | 'ask';

const QUESTIONS_FOR_BADGE = 3;

const App: React.FC = () => {
  const [selectedStage, setSelectedStage] = useState<Stage | null>(null);
  const [activeView, setActiveView] = useState<View>('diagram');
  const [unlockedStages, setUnlockedStages] = useState<Set<Stage>>(new Set([Stage.COLLECTION]));
  const [badges, setBadges] = useState<Set<BadgeType>>(new Set());
  const [questionsAskedCount, setQuestionsAskedCount] = useState(0);

  useEffect(() => {
    if (questionsAskedCount >= QUESTIONS_FOR_BADGE && !badges.has('CURIOUS_EXPLORER')) {
        setBadges(prev => new Set(prev).add('CURIOUS_EXPLORER'));
    }
  }, [questionsAskedCount, badges]);

  const handleStageSelect = (stage: Stage) => {
    if (unlockedStages.has(stage)) {
      setSelectedStage(stage);
    }
  };

  const closeModal = () => {
    if (selectedStage) {
      setUnlockedStages(prev => {
        const newSet = new Set(prev);
        const nextStageMap: Partial<Record<Stage, Stage>> = {
          [Stage.COLLECTION]: Stage.EVAPORATION,
          [Stage.EVAPORATION]: Stage.CONDENSATION,
          [Stage.CONDENSATION]: Stage.PRECIPITATION,
        };
        
        const nextStage = nextStageMap[selectedStage];
        if (nextStage) {
          newSet.add(nextStage);
        }
        return newSet;
      });
    }
    setSelectedStage(null);
  };

  const handleQuizComplete = () => {
    if (!badges.has('QUIZ_MASTER')) {
      setBadges(prev => new Set(prev).add('QUIZ_MASTER'));
    }
  };

  const handleQuestionAsked = () => {
    setQuestionsAskedCount(prev => prev + 1);
  };

  const renderView = () => {
    switch (activeView) {
      case 'quiz':
        return <QuizView onQuizComplete={handleQuizComplete} />;
      case 'ask':
        return <AskView onQuestionAsked={handleQuestionAsked} />;
      case 'diagram':
      default:
        return <WaterCycleDiagram onStageSelect={handleStageSelect} unlockedStages={unlockedStages} />;
    }
  };

  const NavButton = ({ view, label, icon }: { view: View; label: string; icon: React.ReactNode }) => (
    <button
      onClick={() => setActiveView(view)}
      className={`flex-1 sm:flex-initial sm:w-48 flex items-center justify-center gap-2 px-4 py-3 text-sm sm:text-base font-bold rounded-t-lg transition-all duration-300 ${
        activeView === view
          ? 'bg-white text-blue-600 shadow-md'
          : 'bg-blue-500 text-white hover:bg-blue-600'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
  
  const Badge = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
      <div className="group relative">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/30 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer">
              {icon}
          </div>
          <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-max bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
              {label}
          </span>
      </div>
  );


  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 to-sky-400 text-gray-800 flex flex-col p-2 sm:p-4">
      <header className="relative text-center p-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white text-shadow" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.3)'}}>
          El Cicle de l'Aigua
        </h1>
        <p className="text-white text-lg mt-2 font-semibold">Una aventura interactiva per a joves exploradors!</p>

        <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex items-center gap-2 sm:gap-3">
          {badges.has('QUIZ_MASTER') && <Badge icon={<TrophyIcon className="w-6 h-6 sm:w-7 sm:h-7 text-yellow-400"/>} label="Mestre del Qüestionari!" />}
          {badges.has('CURIOUS_EXPLORER') && <Badge icon={<LightbulbIcon className="w-6 h-6 sm:w-7 sm:h-7 text-yellow-300"/>} label="Explorador Curiós!" />}
        </div>
      </header>
      
      <main className="flex-grow flex flex-col bg-white/70 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden">
        <nav className="flex flex-wrap sm:flex-nowrap justify-center bg-blue-600/80 shadow-lg p-1 gap-1 sm:gap-2">
           <NavButton view="diagram" label="Diagrama" icon={<BookOpenIcon />} />
           <NavButton view="quiz" label="Posa't a Prova" icon={<QuestionMarkCircleIcon />} />
           <NavButton view="ask" label="Pregunta a l'IA" icon={<SparklesIcon />} />
        </nav>
        <div className="flex-grow p-4 sm:p-6 md:p-8 relative">
          {renderView()}
        </div>
      </main>

      {selectedStage && (
        <StageInfoModal
          stageDetails={STAGE_DETAILS[selectedStage]}
          onClose={closeModal}
        />
      )}

      <footer className="text-center text-white text-sm p-2 mt-4">
        <p>Creat amb ❤️ per a l'aprenentatge divertit.</p>
      </footer>
    </div>
  );
};

export default App;