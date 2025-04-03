export interface CardIn {
  question: string;
  answer: string;
  deck_id: number;
}

export interface Card {
  id: number;
  question: string;
  answer: string;
  deck_id: number;
}

export interface CardUpdate {
  id: number;
  question: string;
  answer: string;
}