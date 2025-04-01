import { Card } from "./card";

export interface Deck {
  id: string;
  name: string;
  description: string;
  cards: Card[];
}
