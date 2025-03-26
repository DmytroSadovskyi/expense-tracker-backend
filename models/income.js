import { Schema, model } from 'mongoose';
import { handleMongooseError } from '../helpers/index.js';
import Joi from 'joi';

const incomeSchema = new Schema(
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

incomeSchema.post('save', handleMongooseError);
const Income = model('income', incomeSchema);

const addSchema = Joi.object({
  category: Joi.string().required(),
  description: Joi.string().required(),
  amount: Joi.number().required(),
  date: Joi.date().default(Date.now),
});

export { Income, addSchema };
