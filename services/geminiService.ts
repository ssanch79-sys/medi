import { GoogleGenAI, Type } from "@google/genai";
import type { QuizQuestion, Difficulty } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const systemInstructionForQuestion = `
Ets un professor de ciències amable i pacient que explica conceptes a nens i nenes de 9-10 anys (4t de primària).
Respon a la pregunta de l'alumne sobre el cicle de l'aigua.
Fes servir un llenguatge senzill, clar i breu. Evita paraules complicades.
La teva resposta ha de ser educativa, segura i encoratjadora.
Respon sempre en català.
`;

export const getAnswerFromGemini = async (question: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `La pregunta de l'alumne és: "${question}"`,
      config: {
        systemInstruction: systemInstructionForQuestion,
        temperature: 0.5,
        topP: 0.9,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Error getting answer from Gemini:", error);
    return "Ups! Sembla que hi ha hagut un problema. Intenta-ho de nou més tard.";
  }
};


const quizSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      question: {
        type: Type.STRING,
        description: "La pregunta del qüestionari en català.",
      },
      options: {
        type: Type.ARRAY,
        items: {
          type: Type.STRING,
        },
        description: "Una llista de 3 possibles respostes en català.",
      },
      correctAnswerIndex: {
        type: Type.INTEGER,
        description: "L'índex (0, 1, o 2) de la resposta correcta a la llista d'opcions.",
      },
    },
    required: ["question", "options", "correctAnswerIndex"],
  },
};

export const generateQuizQuestions = async (difficulty: Difficulty): Promise<QuizQuestion[]> => {
  const easyPrompt = "Crea un qüestionari de 4 preguntes de selecció múltiple sobre el cicle de l'aigua per a nens de 9 anys. Cada pregunta ha de tenir 3 opcions i només una resposta correcta. Proporciona les preguntes en català.";
  const hardPrompt = "Crea un qüestionari de 4 preguntes de selecció múltiple sobre el cicle de l'aigua amb un nivell de dificultat més alt, per a nens d'11-12 anys. Inclou conceptes com transpiració, infiltració o escorrentia. Cada pregunta ha de tenir 3 opcions i només una resposta correcta. Proporciona les preguntes en català.";

  const prompt = difficulty === 'easy' ? easyPrompt : hardPrompt;

  try {
     const response = await ai.models.generateContent({
       model: "gemini-2.5-flash",
       contents: prompt,
       config: {
         responseMimeType: "application/json",
         responseSchema: quizSchema,
       },
     });

    const jsonText = response.text.trim();
    const questions = JSON.parse(jsonText);

    // Basic validation
    if (Array.isArray(questions) && questions.every(q => 'question' in q && 'options' in q && 'correctAnswerIndex' in q)) {
      return questions;
    } else {
      throw new Error("Invalid quiz format received from API");
    }
  } catch (error) {
    console.error("Error generating quiz questions:", error);
    // Fallback to hardcoded questions on API failure
    const fallbackQuestions: Record<Difficulty, QuizQuestion[]> = {
        easy: [
            { question: "Què fa el sol a l'aigua durant l'evaporació?", options: ["La congela", "L'escalfa", "La neteja"], correctAnswerIndex: 1 },
            { question: "Com es diu quan el vapor d'aigua forma núvols?", options: ["Precipitació", "Recollida", "Condensació"], correctAnswerIndex: 2 },
            { question: "La pluja és un tipus de...", options: ["Evaporació", "Precipitació", "Condensació"], correctAnswerIndex: 1 },
            { question: "On es recull l'aigua que cau a la terra?", options: ["Només als núvols", "Als arbres", "A rius, llacs i mars"], correctAnswerIndex: 2 },
        ],
        hard: [
            { question: "Quin procés és similar a l'evaporació, però ocorre a les plantes?", options: ["Infiltració", "Transpiració", "Condensació"], correctAnswerIndex: 1 },
            { question: "Com s'anomena l'aigua que flueix per la superfície terrestre cap a rius o llacs?", options: ["Aigua subterrània", "Escorrentia", "Aqüífer"], correctAnswerIndex: 1 },
            { question: "Quin és el principal motor energètic del cicle de l'aigua?", options: ["El vent", "La gravetat", "L'energia solar"], correctAnswerIndex: 2 },
            { question: "El procés pel qual l'aigua de la pluja s'absorbeix a terra s'anomena...", options: ["Recollida", "Infiltració", "Evaporació"], correctAnswerIndex: 1 },
        ]
    };
    return fallbackQuestions[difficulty];
  }
};
