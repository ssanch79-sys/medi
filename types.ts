import type { ReactElement } from 'react';

export enum Stage {
  EVAPORATION = 'EVAPORATION',
  CONDENSATION = 'CONDENSATION',
  PRECIPITATION = 'PRECIPITATION',
  COLLECTION = 'COLLECTION',
}

export interface StageDetails {
  title: string;
  description: string;
  icon: ReactElement;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

export type BadgeType = 'QUIZ_MASTER' | 'CURIOUS_EXPLORER';

export type Difficulty = 'easy' | 'hard';
