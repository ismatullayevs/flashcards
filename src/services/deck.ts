import { Deck, DeckIn } from '../models/deck';
import { Database } from 'sqlite3';
import fs from 'fs';

export class DeckService {
  db: Database;

  constructor() {
    this.db = new Database('./flashcards.db');
    const schema = fs.readFileSync('src/services/schema.sql').toString();
    this.db.exec(schema);
  }

  public async getDecks(): Promise<Deck[]> {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM deck', (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(<Deck[]>rows);
        }
      });
    });
  }

  public async getDeck(id: Number): Promise<Deck> {
    return new Promise((resolve, reject) => {
      this.db.get('SELECT * FROM deck WHERE id=?', [id], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(<Deck>rows);
        }
      });
    });
  }

  public async createDeck(deck: DeckIn): Promise<number> {
    return new Promise((resolve, reject) => {
      this.db.run('INSERT INTO deck (name) VALUES (?)', [deck.name], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });
    });
  }

  public async deleteDeck(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run('DELETE FROM deck WHERE id=?;', [id], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  public async updateDeck(deck: Deck): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run('UPDATE deck SET name=? WHERE id=?;', [deck.name, deck.id], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}