import express from 'express';
import { ctrlWrapper } from '../../helpers/index.js';
import { authenticate, validateBody } from '../../middlewares/index.js';
import ctrl from '../../controllers/user/index.js';
import { schemas } from '../../models/user.js';

const authRouter = express.Router();

authRouter.post(
  '/register',
  validateBody(schemas.registerSchema),
  ctrlWrapper(ctrl.register),
);

authRouter.post(
  '/login',
  validateBody(schemas.loginSchema),
  ctrlWrapper(ctrl.login),
);

authRouter.post('/logout', authenticate, ctrlWrapper(ctrl.logout));

export default authRouter;
