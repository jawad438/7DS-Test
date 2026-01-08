
export enum SinType {
  PRIDE = 'Pride',
  GREED = 'Greed',
  LUST = 'Lust',
  ENVY = 'Envy',
  GLUTTONY = 'Gluttony',
  WRATH = 'Wrath',
  SLOTH = 'Sloth'
}

export interface Question {
  id: number;
  text: string;
  sin: SinType;
}

export interface SinData {
  type: SinType;
  description: string;
  color: string;
  icon: string;
  imageUrl: string;
}

export type ViewState = 'landing' | 'quiz' | 'calculating' | 'results';

export type ResponseValue = 0 | 1 | 2 | 3; // Strongly Unrelatable to Strongly Relatable

export interface QuizResults {
  [SinType.PRIDE]: number;
  [SinType.GREED]: number;
  [SinType.LUST]: number;
  [SinType.ENVY]: number;
  [SinType.GLUTTONY]: number;
  [SinType.WRATH]: number;
  [SinType.SLOTH]: number;
}
