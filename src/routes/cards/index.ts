import  { Request, Response, Router } from 'express';
import { DeckService } from '../../services/deck';
import { Card } from '../../models/card';
import { CardService } from '../../services/card';

const router = Router();

router.get('/cards/:id/edit', async (req: Request, res: Response) => {
  let card = await new CardService().getCard(Number(req.params.id));
  if (!card) {
    res.status(404).send('Card not found');
    return;
  }
  let deck = await new DeckService().getDeck(card.deck_id);
  res.render('pages/cardCreate', { card, deck });
});

router.get('/cards/:id/delete', async (req: Request, res: Response) => {
  let card = await new CardService().getCard(Number(req.params.id));
  if (!card) {
    res.status(404).send('Card not found');
    return;
  }
  await new CardService().deleteCard(Number(req.params.id));
  res.redirect(`/decks/${card.deck_id}/cards`);
});

router.post('/cards/:id/edit', async (req: Request, res: Response) => {
  let card: Card = {
    id: Number(req.params.id),
    question: req.body.question,
    answer: req.body.answer,
    deck_id: Number(req.body.deck_id)
  }
  new CardService().updateCard(card)
  res.redirect(`/decks/${card.deck_id}/cards`);
});

export default router;