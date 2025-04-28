import express from 'express';
import ctrl from '../../controllers/transactions/index.js';
import { ctrlWrapper } from '../../helpers/index.js';
import { authenticate, isValidId } from '../../middlewares/index.js';

const transactionRouter = express.Router();

/**
 * @openapi
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Transaction:
 *       type: object
 *       required:
 *         - type
 *         - category
 *         - description
 *         - amount
 *         - date
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the transaction
 *         type:
 *           type: string
 *           description: The type of your transaction
 *         category:
 *           type: string
 *           description: The transaction category
 *         description:
 *           type: string
 *           description: Description of your transaction
 *         amount:
 *           type: number
 *           description: amount of your transaction
 *         date:
 *           type: string
 *           format: date-time
 *           description: The date the transaction was added
 *       example:
 *          type: "витрата"
 *          category: "Їжа"
 *          description: "похід в магазин"
 *          amount: 1256
 *          date: "2025-04-28T09:24:44.202Z"
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the User
 *         name:
 *           type: string
 *           description: Username
 *         email:
 *           type: string
 *           description: E-mail address
 *         password:
 *           type: string
 *           description: Password
 *       example:
 *         name: johndoe
 *         email: johndoe@mail.com
 *         password: johnDoe20!@
 */

/**
 * @openapi
 * '/api/transactions':
 *  post:
 *     tags:
 *     - Transaction
 *     summary: Create a transaction
 *     security:
 *     - bearerAuth: []
 *     parameters:
 *     - in: header
 *       name: Authorization
 *       schema:
 *         type: string
 *       required: true
 *       description: The token issued to the current user.
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - type
 *              - category
 *              - description
 *              - amount
 *              - date
 *            properties:
 *              type:
 *                type: string
 *                default: "витрата"
 *              category:
 *                type: string
 *                default: "Їжа"
 *              description:
 *                type: string
 *                default: "похід в магазин"
 *              amount:
 *                type: number
 *                default: 1256
 *              date:
 *                type: string
 *                format: date-time
 *     responses:
 *      201:
 *        description: The transaction was successfully created.
 *      400:
 *        description: Error creating transaction.
 *      401:
 *        description: Missing header with authorization token.
 *      500:
 *        description: Server Error.
 */
transactionRouter.post('/', authenticate, ctrlWrapper(ctrl.addTransaction));

/**
 * @openapi
 * '/api/transactions':
 *  get:
 *     tags:
 *     - Transaction
 *     summary: Get all transactions for the authenticated user
 *     security:
 *     - bearerAuth: []
 *     parameters:
 *     - in: header
 *       name: Authorization
 *       schema:
 *         type: string
 *       required: true
 *       description: The token issued to the current user.
 *     responses:
 *      200:
 *        description: A list of transactions.
 *      401:
 *        description: Missing or invalid authorization token.
 *      500:
 *        description: Server Error.
 */
transactionRouter.get('/', authenticate, ctrlWrapper(ctrl.getAllTransactions));

/**
 * @openapi
 * '/api/transactions/{id}':
 *  get:
 *     tags:
 *     - Transaction
 *     summary: Get a transaction by ID
 *     security:
 *     - bearerAuth: []
 *     parameters:
 *     - in: header
 *       name: Authorization
 *       schema:
 *         type: string
 *       required: true
 *       description: The token issued to the current user.
 *     - in: path
 *       name: id
 *       schema:
 *         type: string
 *       required: true
 *       description: The transaction ID.
 *     responses:
 *      200:
 *        description: Transaction details by ID.
 *      400:
 *        description: Invalid ID supplied.
 *      401:
 *        description: Missing or invalid authorization token.
 *      404:
 *        description: Transaction not found.
 *      500:
 *        description: Server Error.
 */
transactionRouter.get(
  '/:id',
  authenticate,
  isValidId,
  ctrlWrapper(ctrl.getById),
);

/**
 * @openapi
 * '/api/transactions/{id}':
 *  patch:
 *     tags:
 *     - Transaction
 *     summary: Update a transaction by ID
 *     security:
 *     - bearerAuth: []
 *     parameters:
 *     - in: header
 *       name: Authorization
 *       schema:
 *         type: string
 *       required: true
 *       description: The token issued to the current user.
 *     - in: path
 *       name: id
 *       schema:
 *         type: string
 *       required: true
 *       description: The transaction ID.
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            properties:
 *              type:
 *                type: string
 *                example: "дохід"
 *              category:
 *                type: string
 *                example: "Зарплата"
 *              description:
 *                type: string
 *                example: "Отримав зарплату"
 *              amount:
 *                type: number
 *                example: 5000
 *              date:
 *                type: string
 *                format: date-time
 *     responses:
 *      200:
 *        description: Transaction successfully updated.
 *      400:
 *        description: Invalid ID supplied or validation error.
 *      401:
 *        description: Missing or invalid authorization token.
 *      404:
 *        description: Transaction not found.
 *      500:
 *        description: Server Error.
 */
transactionRouter.patch(
  '/:id',
  authenticate,
  isValidId,
  ctrlWrapper(ctrl.updateById),
);

/**
 * @openapi
 * '/api/transactions/{id}':
 *  delete:
 *     tags:
 *     - Transaction
 *     summary: Delete a transaction by ID
 *     security:
 *     - bearerAuth: []
 *     parameters:
 *     - in: header
 *       name: Authorization
 *       schema:
 *         type: string
 *       required: true
 *       description: The token issued to the current user.
 *     - in: path
 *       name: id
 *       schema:
 *         type: string
 *       required: true
 *       description: The transaction ID.
 *     responses:
 *      204:
 *        description: Transaction successfully deleted.
 *      400:
 *        description: Invalid ID supplied.
 *      401:
 *        description: Missing or invalid authorization token.
 *      404:
 *        description: Transaction not found.
 *      500:
 *        description: Server Error.
 */
transactionRouter.delete(
  '/:id',
  authenticate,
  isValidId,
  ctrlWrapper(ctrl.deleteTransaction),
);

export default transactionRouter;
