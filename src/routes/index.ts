import { Router } from 'express';
import decks from "./decks";
import cards from "./cards";


const router = Router();
router.use('/', decks);
router.use('/', cards);

export default router;