import React, { useRef } from 'react';
import { Stage } from '../types';
import { ArrowDown, ArrowUp } from './Icons';

interface WaterCycleDiagramProps {
  onStageSelect: (stage: Stage) => void;
  unlockedStages: Set<Stage>;
}

const InteractiveElement: React.FC<{
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  label: string;
}> = ({ children, onClick, className, label }) => (
  <div className={`absolute group transition-transform duration-300 hover:scale-110 focus:scale-110 cursor-pointer ${className}`} onClick={onClick} onKeyDown={(e) => e.key === 'Enter' && onClick()} tabIndex={0} aria-label={label}>
    {children}
    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-max px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 pointer-events-none">
      {label}
    </div>
  </div>
);


const WaterCycleDiagram: React.FC<WaterCycleDiagramProps> = ({ onStageSelect, unlockedStages }) => {
  const isCycleJustStarted = unlockedStages.size === 1;

  const sunAudioRef = useRef<HTMLAudioElement>(null);
  const cloudAudioRef = useRef<HTMLAudioElement>(null);
  const rainAudioRef = useRef<HTMLAudioElement>(null);
  const waterAudioRef = useRef<HTMLAudioElement>(null);

  const handleStageClick = (stage: Stage) => {
    let audioRef: React.RefObject<HTMLAudioElement> | null = null;
    switch (stage) {
      case Stage.EVAPORATION:
        audioRef = sunAudioRef;
        break;
      case Stage.CONDENSATION:
        audioRef = cloudAudioRef;
        break;
      case Stage.PRECIPITATION:
        audioRef = rainAudioRef;
        break;
      case Stage.COLLECTION:
        audioRef = waterAudioRef;
        break;
    }

    if (audioRef?.current) {
      audioRef.current.currentTime = 0; // Rewind to start
      audioRef.current.play().catch(error => console.error("Error playing sound:", error));
    }

    onStageSelect(stage);
  };


  return (
    <div className="w-full h-full flex items-center justify-center">
      {/* Audio elements for sound effects */}
      <audio ref={sunAudioRef} src="/sounds/sun-hum.mp3" preload="auto"></audio>
      <audio ref={cloudAudioRef} src="/sounds/wind-whoosh.mp3" preload="auto"></audio>
      <audio ref={rainAudioRef} src="/sounds/rain-sound.mp3" preload="auto"></audio>
      <audio ref={waterAudioRef} src="/sounds/water-flow.mp3" preload="auto"></audio>
      
      <div className="relative w-full max-w-4xl aspect-[4/3] bg-gradient-to-b from-sky-300 to-sky-100 rounded-2xl shadow-lg overflow-hidden border-4 border-white">
        
        {/* Sun -> Evaporation */}
        {unlockedStages.has(Stage.EVAPORATION) && (
          <InteractiveElement onClick={() => handleStageClick(Stage.EVAPORATION)} className="top-2 right-2 sm:top-4 sm:right-4 w-24 h-24 sm:w-32 sm:h-32" label="Evaporació">
            <svg viewBox="0 0 150 150" className="w-full h-full drop-shadow-xl">
                <defs>
                    <radialGradient id="sunGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                        <stop offset="0%" stopColor="#FFF7AD"/>
                        <stop offset="60%" stopColor="#FDE047"/>
                        <stop offset="100%" stopColor="#FBBF24"/>
                    </radialGradient>
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                        <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                </defs>
                <g className="animate-spin-slow">
                    <path d="M75 0 C 85 20, 85 20, 75 35 S 65 20, 75 0" fill="#FBBF24"/>
                    <path d="M150 75 C 130 85, 130 85, 115 75 S 130 65, 150 75" fill="#FBBF24"/>
                    <path d="M75 150 C 65 130, 65 130, 75 115 S 85 130, 75 150" fill="#FBBF24"/>
                    <path d="M0 75 C 20 65, 20 65, 35 75 S 20 85, 0 75" fill="#FBBF24"/>
                    <g transform="rotate(45 75 75)">
                        <path d="M75 0 C 85 20, 85 20, 75 35 S 65 20, 75 0" fill="#FDE047"/>
                        <path d="M150 75 C 130 85, 130 85, 115 75 S 130 65, 150 75" fill="#FDE047"/>
                        <path d="M75 150 C 65 130, 65 130, 75 115 S 85 130, 75 150" fill="#FDE047"/>
                        <path d="M0 75 C 20 65, 20 65, 35 75 S 20 85, 0 75" fill="#FDE047"/>
                    </g>
                </g>
                <circle cx="75" cy="75" r="50" fill="url(#sunGradient)" filter="url(#glow)" className="animate-pulse-glow" />
                <circle cx="63" cy="70" r="5" fill="#422006" opacity="0.8"/>
                <circle cx="87" cy="70" r="5" fill="#422006" opacity="0.8"/>
                <path d="M60 85 Q 75 95, 90 85" stroke="#422006" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.8"/>
                 <circle cx="50" cy="80" r="8" fill="#FFCACA" opacity="0.7"/>
                 <circle cx="100" cy="80" r="8" fill="#FFCACA" opacity="0.7"/>
            </svg>
          </InteractiveElement>
        )}

        {/* Cloud -> Condensation */}
        {unlockedStages.has(Stage.CONDENSATION) && (
          <InteractiveElement onClick={() => handleStageClick(Stage.CONDENSATION)} className="top-12 left-1/2 -translate-x-1/2 w-40 h-24 sm:w-56 sm:h-32" label="Condensació">
            <svg viewBox="0 0 200 120" className="w-full h-full drop-shadow-lg animate-float">
                <defs>
                    <radialGradient id="cloudGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                        <stop offset="0%" stopColor="white"/>
                        <stop offset="100%" stopColor="#E0F2FE"/>
                    </radialGradient>
                </defs>
                <g opacity="0.95">
                    <circle cx="60" cy="70" r="40" fill="url(#cloudGradient)"/>
                    <circle cx="100" cy="80" r="45" fill="url(#cloudGradient)"/>
                    <circle cx="140" cy="70" r="40" fill="url(#cloudGradient)"/>
                    <circle cx="100" cy="50" r="40" fill="url(#cloudGradient)"/>
                </g>
            </svg>
          </InteractiveElement>
        )}

        {/* Rain -> Precipitation */}
        {unlockedStages.has(Stage.PRECIPITATION) && (
          <InteractiveElement onClick={() => handleStageClick(Stage.PRECIPITATION)} className="top-[45%] left-[calc(15%)] sm:left-[calc(20%)] -translate-y-1/2 w-32 h-24" label="Precipitació">
            <svg viewBox="0 0 150 150" className="w-full h-full drop-shadow-md">
                <defs>
                    <radialGradient id="rainCloudGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                        <stop offset="0%" stopColor="#A0AEC0"/>
                        <stop offset="100%" stopColor="#718096"/>
                    </radialGradient>
                </defs>
                <g opacity="0.95">
                    <circle cx="45" cy="50" r="30" fill="url(#rainCloudGradient)"/>
                    <circle cx="75" cy="55" r="35" fill="url(#rainCloudGradient)"/>
                    <circle cx="105" cy="50" r="30" fill="url(#rainCloudGradient)"/>
                    <circle cx="75" cy="35" r="30" fill="url(#rainCloudGradient)"/>
                </g>
                <g className="rain-animation">
                    <path d="M45 80 C 45 90, 55 90, 55 80 C 55 70, 50 65, 45 80 Z" fill="#60A5FA"/>
                    <path d="M75 90 C 75 100, 85 100, 85 90 C 85 80, 80 75, 75 90 Z" fill="#3B82F6"/>
                    <path d="M105 85 C 105 95, 115 95, 115 85 C 115 75, 110 70, 105 85 Z" fill="#60A5FA"/>
                </g>
            </svg>
          </InteractiveElement>
        )}

        {/* Water body + Landscape -> Collection */}
        <div className="absolute bottom-0 left-0 w-full h-2/5">
           <svg viewBox="0 0 400 120" preserveAspectRatio="none" className="w-full h-full">
                <defs>
                    <linearGradient id="waterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="100%" stopColor="#2563EB" />
                    </linearGradient>
                </defs>

                {/* Hills */}
                <path d="M -50,120 Q 80,0 250,120 Z" fill="#22c55e" />
                <path d="M 150,120 Q 300,-20 450,120 Z" fill="#16a34a" />
                
                {/* Forest Grove 1 */}
                <g transform="translate(60 55)">
                    <g transform="translate(0 0) scale(0.3)">
                      <rect x="45" y="70" width="10" height="30" fill="#78350f" rx="2"/>
                      <circle cx="50" cy="55" r="25" fill="#16a34a" />
                      <circle cx="35" cy="65" r="20" fill="#15803d" />
                    </g>
                    <g transform="translate(20 -10) scale(0.4)">
                      <rect x="45" y="70" width="10" height="30" fill="#78350f" rx="2"/>
                      <circle cx="50" cy="55" r="25" fill="#16a34a" />
                      <circle cx="65" cy="65" r="20" fill="#15803d" />
                    </g>
                     <g transform="translate(40 5) scale(0.25)">
                      <rect x="45" y="70" width="10" height="30" fill="#78350f" rx="2"/>
                      <circle cx="50" cy="55" r="25" fill="#16a34a" />
                    </g>
                </g>
                
                {/* Forest Grove 2 */}
                <g transform="translate(300 35)">
                   <g transform="translate(0 0) scale(0.35)">
                      <rect x="45" y="70" width="10" height="30" fill="#78350f" rx="2"/>
                      <circle cx="50" cy="55" r="25" fill="#166534" />
                      <circle cx="35" cy="65" r="20" fill="#14532d" />
                    </g>
                    <g transform="translate(25 -5) scale(0.25)">
                      <rect x="45" y="70" width="10" height="30" fill="#78350f" rx="2"/>
                      <circle cx="50" cy="55" r="25" fill="#166534" />
                    </g>
                </g>

                {/* Water */}
                <path d="M 0,80 C 50,60 100,100 150,80 C 200,60 250,100 300,80 C 350,60 400,100 400,80 V 120 H 0 Z" fill="url(#waterGradient)" />
                <path d="M 0,90 C 40,70 90,110 140,90 C 190,70 240,110 290,90 C 340,70 400,110 400,90 V 120 H 0 Z" fill="#60A5FA" opacity="0.8" className="animate-wave-back" />
                <path d="M 0,85 C 60,75 110,105 160,85 C 210,75 260,105 310,85 C 360,75 400,105 400,85 V 120 H 0 Z" fill="#93C5FD" opacity="0.6" className="animate-wave-front" />
           </svg>
        </div>

        {unlockedStages.has(Stage.COLLECTION) && (
            <InteractiveElement onClick={() => handleStageClick(Stage.COLLECTION)} className="bottom-0 left-0 w-full h-1/4" label="Recollida">
               <div className="w-full h-full relative">
                {isCycleJustStarted && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                    <div className="bg-white/80 text-blue-600 font-bold px-4 py-2 rounded-full animate-pulse shadow-lg">
                      Fes clic aquí per començar!
                    </div>
                  </div>
                )}
               </div>
            </InteractiveElement>
        )}

        {/* Arrows */}
        {unlockedStages.has(Stage.CONDENSATION) && (
            <div className="absolute bottom-[28%] right-[35%] w-12 h-12 sm:w-16 sm:h-16 text-sky-100/80 -rotate-[30deg]" title="Evaporació">
                <ArrowUp />
            </div>
        )}
        {unlockedStages.has(Stage.PRECIPITATION) && (
            <div className="absolute top-[38%] left-[35%] w-12 h-12 sm:w-16 sm:h-16 text-gray-500/70" title="Precipitació">
                <ArrowDown />
            </div>
        )}
      </div>
      {/* FIX: Removed unsupported "jsx" prop from style tag. */}
       <style>{`
        @keyframes spin-slow { 
          from { transform: rotate(0deg); } 
          to { transform: rotate(360deg); } 
        }
        .animate-spin-slow { 
          animation: spin-slow 40s linear infinite;
          transform-origin: center;
        }
        @keyframes pulse-glow {
            0%, 100% { transform: scale(1); opacity: 0.8; }
            50% { transform: scale(1.05); opacity: 1; }
        }
        .animate-pulse-glow {
            animation: pulse-glow 4s ease-in-out infinite;
            transform-origin: center;
        }
        @keyframes rain-fall { 
          0% { transform: translateY(-20px); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(20px); opacity: 0; }
        }
        .rain-animation > * {
          animation: rain-fall 1.2s linear infinite;
        }
        .rain-animation > *:nth-child(2) { animation-delay: 0.6s; }
        .rain-animation > *:nth-child(3) { animation-delay: 0.2s; }
        .rain-animation > *:nth-child(4) { animation-delay: 0.9s; }

        @keyframes wave-back-move { 
          from { transform: translateX(0); }
          to { transform: translateX(-40px); }
        }
        .animate-wave-back { 
          animation: wave-back-move 8s ease-in-out infinite alternate;
        }
        
        @keyframes wave-front-move { 
          from { transform: translateX(-20px); }
          to { transform: translateX(20px); }
        }
        .animate-wave-front { 
          animation: wave-front-move 6s ease-in-out infinite alternate;
        }

        @keyframes float {
          0% { transform: translateY(0px) translateX(5px); }
          50% { transform: translateY(-8px) translateX(0); }
          100% { transform: translateY(0px) translateX(5px); }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default WaterCycleDiagram;
