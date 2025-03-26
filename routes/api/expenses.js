import express from 'express';
import ctrl from '../../controllers/expenses/index.js';
import { ctrlWrapper } from '../../helpers/index.js';
import { authenticate, isValidId } from '../../middlewares/index.js';

const expenseRouter = express.Router();

expenseRouter.post('/', authenticate, ctrlWrapper(ctrl.addExpense));
expenseRouter.get('/', authenticate, ctrlWrapper(ctrl.getAllExpenses));
expenseRouter.get('/:id', authenticate, isValidId, ctrlWrapper(ctrl.getById));
expenseRouter.patch(
  '/:id',
  authenticate,
  isValidId,
  ctrlWrapper(ctrl.updateById),
);
expenseRouter.delete(
  '/:id',
  authenticate,
  isValidId,
  ctrlWrapper(ctrl.deleteExpense),
);

export default expenseRouter;
