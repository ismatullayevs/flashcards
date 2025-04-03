import { Database } from "sqlite3";
import fs from "fs";
import { Card, CardIn } from "../models/card";

export class CardService {
  db: Database;

  constructor() {
    this.db = new Database("./flashcards.db");
    const schema = fs.readFileSync("src/services/schema.sql").toString();
    this.db.exec(schema);
  }

  public async getCards(deckId: number): Promise<Card[]> {
    return new Promise((resolve, reject) => {
      this.db.all(
        "SELECT * FROM card WHERE deck_id=?",
        [deckId],
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(<Card[]>rows);
          }
        }
      );
    });
  }

  public async createCard(card: CardIn): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run(
        "INSERT INTO card (question, answer, deck_id) VALUES (?, ?, ?)",
        [card.question, card.answer, card.deck_id],
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }

  public async getCard(id: number): Promise<Card | null> {
    return new Promise((resolve, reject) => {
      this.db.get("SELECT * FROM card WHERE id=?", [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(<Card>row);
        }
      });
    });
  }

  public async updateCard(card: Card): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run(
        "UPDATE card SET question=?, answer=? WHERE id=?",
        [card.question, card.answer, card.id],
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }

  public async deleteCard(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run("DELETE FROM card WHERE id=?", [id], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}
