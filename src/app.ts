import express from 'express';
import { Request, Response } from 'express';
import path from 'path';
import { Deck, DeckIn } from './models/deck';
import { DeckService } from './services/deck';
import { Card, CardIn, CardUpdate } from './models/card';
import { CardService } from './services/card';

const app = express()
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.redirect('/decks');
})

app.get('/decks', async (req: Request, res: Response) => {
  let decks = await new DeckService().getDecks();
  res.render('pages/decks', { decks });
})

app.post('/decks', async (req: Request, res: Response) => {
  let deck: DeckIn = {
    name: req.body.name
  }
  await new DeckService().createDeck(deck);
  res.redirect('/decks');
});

app.post('/decks/:id/edit', async (req: Request, res: Response) => {
  let deck: Deck = {
    id: Number(req.params.id),
    name: req.body.name
  }
  await new DeckService().updateDeck(deck);
  res.redirect('/decks');
});

app.get('/decks/:id/delete', async (req: Request, res: Response) => {
  await new DeckService().deleteDeck(Number(req.params.id));
  res.redirect('/decks');
});

app.get('/decks/:id/cards/create', async (req: Request, res: Response) => {
  let deck = await new DeckService().getDeck(Number(req.params.id));
  if (!deck) {
    res.status(404).send('Deck not found');
    return;
  }
  res.render('pages/cardCreate', { deck, card: null });
});

app.get('/decks/:id/cards', async (req: Request, res: Response) => {
  let deck = await new DeckService().getDeck(Number(req.params.id));
  if (!deck) {
    res.status(404).send('Deck not found');
    return;
  }
  let cards = await new CardService().getCards(Number(req.params.id));
  res.render('pages/cards', { deck, cards });
});

app.post('/decks/:id/cards', async (req: Request, res: Response) => {
  let card: CardIn = {
    question: req.body.question,
    answer: req.body.answer,
    deck_id: Number(req.params.id)
  }
  let deck = await new DeckService().getDeck(Number(req.params.id));
  if (!deck) {
    res.status(404).send('Deck not found');
    return;
  }
  new CardService().createCard(card)
  res.redirect(`/decks/${req.params.id}/cards`);
});

app.get('/cards/:id/edit', async (req: Request, res: Response) => {
  let card = await new CardService().getCard(Number(req.params.id));
  if (!card) {
    res.status(404).send('Card not found');
    return;
  }
  let deck = await new DeckService().getDeck(card.deck_id);
  res.render('pages/cardCreate', { card, deck });
});

app.get('/cards/:id/delete', async (req: Request, res: Response) => {
  let card = await new CardService().getCard(Number(req.params.id));
  if (!card) {
    res.status(404).send('Card not found');
    return;
  }
  await new CardService().deleteCard(Number(req.params.id));
  res.redirect(`/decks/${card.deck_id}/cards`);
});

app.post('/cards/:id/edit', async (req: Request, res: Response) => {
  let card: Card = {
    id: Number(req.params.id),
    question: req.body.question,
    answer: req.body.answer,
    deck_id: Number(req.body.deck_id)
  }
  new CardService().updateCard(card)
  res.redirect(`/decks/${card.deck_id}/cards`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
