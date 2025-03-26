import { Schema, model } from 'mongoose';
import { handleMongooseError } from '../helpers/index.js';
import Joi from 'joi';

const expenseSchema = new Schema(
  {
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

expenseSchema.post('save', handleMongooseError);

const Expense = model('expense', expenseSchema);

const addSchema = Joi.object({
  category: Joi.string().required(),
  description: Joi.string().required(),
  amount: Joi.number().required(),
  date: Joi.date().default(Date.now),
});

export { Expense, addSchema };
