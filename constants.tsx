
import React from 'react';
import type { StageDetails } from './types';
import { Stage } from './types';
import { SunIcon, CloudIcon, DropletsIcon, WaterIcon } from './components/Icons';

export const STAGE_DETAILS: Record<Stage, StageDetails> = {
  [Stage.EVAPORATION]: {
    title: 'Evaporació',
    description: "El sol escalfa l'aigua de rius, llacs i mars. L'aigua es converteix en un gas anomenat vapor d'aigua i puja cap al cel. És com si l'aigua s'evaporés!",
    icon: <SunIcon />,
  },
  [Stage.CONDENSATION]: {
    title: 'Condensació',
    description: "A dalt, al cel, fa més fred. El vapor d'aigua es refreda i es torna a convertir en petites gotes d'aigua. Aquestes gotetes s'ajunten i formen els núvols.",
    icon: <CloudIcon />,
  },
  [Stage.PRECIPITATION]: {
    title: 'Precipitació',
    description: "Quan els núvols s'omplen de moltes gotes d'aigua, es tornen pesats. Llavors, l'aigua cau a la terra en forma de pluja, neu o calamarsa. Això és la precipitació!",
    icon: <DropletsIcon />,
  },
  [Stage.COLLECTION]: {
    title: 'Recollida',
    description: "L'aigua que cau a la terra es recull en rius, llacs i oceans. Una part també es filtra a la terra. I des d'aquí, el cicle torna a començar amb l'evaporació.",
    icon: <WaterIcon />,
  },
};
