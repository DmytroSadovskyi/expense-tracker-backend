import express from 'express';
import ctrl from '../../controllers/transactions/index.js';
import { ctrlWrapper } from '../../helpers/index.js';
import { authenticate, isValidId } from '../../middlewares/index.js';

const transactionRouter = express.Router();

transactionRouter.post('/', authenticate, ctrlWrapper(ctrl.addTransaction));
transactionRouter.get('/', authenticate, ctrlWrapper(ctrl.getAllTransactions));
transactionRouter.get(
  '/:id',
  authenticate,
  isValidId,
  ctrlWrapper(ctrl.getById),
);
transactionRouter.patch(
  '/:id',
  authenticate,
  isValidId,
  ctrlWrapper(ctrl.updateById),
);
transactionRouter.delete(
  '/:id',
  authenticate,
  isValidId,
  ctrlWrapper(ctrl.deleteTransaction),
);

export default transactionRouter;
