import express from 'express';
import { ctrlWrapper } from '../../helpers/index.js';
import { authenticate, isValidId } from '../../middlewares/index.js';
import ctrl from '../../controllers/incomes/index.js';

const incomeRouter = express.Router();

incomeRouter.post('/', authenticate, ctrlWrapper(ctrl.addIncome));
incomeRouter.get('/', authenticate, ctrlWrapper(ctrl.getAllIncomes));
incomeRouter.get('/:id', authenticate, isValidId, ctrlWrapper(ctrl.getById));
incomeRouter.patch(
  '/:id',
  authenticate,
  isValidId,
  ctrlWrapper(ctrl.updateById),
);
incomeRouter.delete(
  '/:id',
  authenticate,
  isValidId,
  ctrlWrapper(ctrl.deleteIncome),
);

export default incomeRouter;
