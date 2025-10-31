
import React, { useEffect, useRef } from 'react';
import type { StageDetails } from '../types';
import { XIcon } from './Icons';

interface StageInfoModalProps {
  stageDetails: StageDetails;
  onClose: () => void;
}

const StageInfoModal: React.FC<StageInfoModalProps> = ({ stageDetails, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    modalRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };


  return (
    <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={handleBackdropClick}
    >
      <div 
        ref={modalRef}
        tabIndex={-1}
        className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 w-full max-w-md mx-auto transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale"
        role="dialog"
        aria-modal="true"
        aria-labelledby="stage-title"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-500">
                {/* FIX: Cast ReactElement to allow adding className prop */}
                {React.cloneElement(stageDetails.icon as React.ReactElement<any>, {className: 'w-10 h-10'})}
            </div>
            <h2 id="stage-title" className="text-3xl font-bold text-gray-800">{stageDetails.title}</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition-colors" aria-label="Tancar">
            <XIcon />
          </button>
        </div>
        <p className="mt-6 text-gray-600 text-lg leading-relaxed">
          {stageDetails.description}
        </p>
        <div className="mt-8 text-right">
          <button onClick={onClose} className="bg-blue-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Entesos!
          </button>
        </div>
      </div>
      {/* FIX: Removed unsupported "jsx" prop from style tag. */}
      <style>{`
        @keyframes fade-in-scale {
            from {
                opacity: 0;
                transform: scale(0.95);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        .animate-fade-in-scale {
            animation: fade-in-scale 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default StageInfoModal;