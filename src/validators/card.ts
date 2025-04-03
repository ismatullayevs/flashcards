import { body } from 'express-validator';

const cardValidationRules = () => {
  return [
    body('question')
      .notEmpty()
      .withMessage('Question is required'),
    body('answer')
      .notEmpty()
      .withMessage('Answer is required'),
  ];
}

export default cardValidationRules;

