import express from 'express';
import { ctrlWrapper } from '../../helpers/index.js';
import { authenticate, validateBody } from '../../middlewares/index.js';
import ctrl from '../../controllers/user/index.js';
import { schemas } from '../../models/user.js';

const authRouter = express.Router();

/** POST Methods */
/**
 * @openapi
 * '/api/auth/register':
 *  post:
 *     tags:
 *     - User
 *     summary: Create a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - email
 *              - password
 *            properties:
 *              name:
 *                type: string
 *                default: johndoe
 *              email:
 *                type: string
 *                default: johndoe@mail.com
 *              password:
 *                type: string
 *                default: johnDoe20!@
 *     responses:
 *      201:
 *        description: User was created.
 *      409:
 *        description: Conflict.
 *      500:
 *        description: Server Error.
 */

authRouter.post(
  '/register',
  validateBody(schemas.registerSchema),
  ctrlWrapper(ctrl.register),
);

/**
 * @openapi
 * '/api/auth/login':
 *  post:
 *     tags:
 *     - User
 *     summary: Login as a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - email
 *            properties:
 *              email:
 *                type: string
 *                default: johndoe@mail.com
 *              password:
 *                type: string
 *                default: johnDoe20!@
 *     responses:
 *      200:
 *        description: User is logged in.
 *      400:
 *        description: Bad request.
 *      500:
 *        description: Server Error.
 */

authRouter.post(
  '/login',
  validateBody(schemas.loginSchema),
  ctrlWrapper(ctrl.login),
);

/**
 * @openapi
 * '/api/auth/current':
 *  get:
 *     tags:
 *     - User
 *     summary: Get information about the current user
 *     security:
 *     - bearerAuth: []
 *     parameters:
 *         - in: header
 *           name: Authorization
 *           schema:
 *             type: string
 *           required: true
 *           description: The token issued to the current user.
 *     responses:
 *      200:
 *        description: Information found.
 *      401:
 *        description: Missing header with authorization token.
 *      500:
 *        description: Server Error.
 */

authRouter.get('/current', authenticate, ctrlWrapper(ctrl.getCurrent));

/**
 * @openapi
 * '/api/auth/logout':
 *  post:
 *     tags:
 *     - User
 *     summary: Log out user
 *     security:
 *     - bearerAuth: []
 *     parameters:
 *         - in: header
 *           name: Authorization
 *           schema:
 *             type: string
 *           required: true
 *           description: The token issued to the current user.
 *     responses:
 *      204:
 *        description: The user is logged out.
 *      401:
 *        description: Missing header with authorization token.
 *      500:
 *        description: Server Error.
 */

authRouter.post('/logout', authenticate, ctrlWrapper(ctrl.logout));

export default authRouter;
