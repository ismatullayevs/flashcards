import { Request, Response, Router } from 'express';
import { Deck, DeckIn } from '../../models/deck';
import { DeckService } from '../../services/deck';
import { CardIn } from '../../models/card';
import { CardService } from '../../services/card';

const router = Router();


router.get('/', (req: Request, res: Response) => {
  res.redirect('/decks');
})

router.get('/decks', async (req: Request, res: Response) => {
  let decks = await new DeckService().getDecks();
  res.render('pages/decks', { decks });
})

router.post('/decks', async (req: Request, res: Response) => {
  let deck: DeckIn = {
    name: req.body.name
  }
  await new DeckService().createDeck(deck);
  res.redirect('/decks');
});

router.post('/decks/:id/edit', async (req: Request, res: Response) => {
  let deck: Deck = {
    id: Number(req.params.id),
    name: req.body.name
  }
  await new DeckService().updateDeck(deck);
  res.redirect('/decks');
});

router.get('/decks/:id/delete', async (req: Request, res: Response) => {
  await new DeckService().deleteDeck(Number(req.params.id));
  res.redirect('/decks');
});

router.get('/decks/:id/cards/create', async (req: Request, res: Response) => {
  let deck = await new DeckService().getDeck(Number(req.params.id));
  if (!deck) {
    res.status(404).send('Deck not found');
    return;
  }
  res.render('pages/cardCreate', { deck, card: null });
});

router.get('/decks/:id/cards', async (req: Request, res: Response) => {
  let deck = await new DeckService().getDeck(Number(req.params.id));
  if (!deck) {
    res.status(404).send('Deck not found');
    return;
  }
  let cards = await new CardService().getCards(Number(req.params.id));
  res.render('pages/cards', { deck, cards });
});

router.post('/decks/:id/cards', async (req: Request, res: Response) => {
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

export default router;