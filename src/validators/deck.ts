import { body } from 'express-validator';

const deckValidationRules = () => {
  return [
    body('name')
      .notEmpty()
      .withMessage('Deck name is required')
      .isLength({ max: 100 })
      .withMessage('Deck name must be less than 100 characters'),
  ];
}

export default deckValidationRules;
