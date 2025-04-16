import { Schema, model } from 'mongoose';
import { handleMongooseError } from '../helpers/index.js';
import Joi from 'joi';

const typeEnum = ['витрата', 'дохід'];

const transactionSchema = new Schema(
  {
    type: { type: String, enum: typeEnum, default: 'дохід' },
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

transactionSchema.post('save', handleMongooseError);

const Transaction = model('transaction', transactionSchema);

const addSchema = Joi.object({
  type: Joi.string().default('дохід'),
  category: Joi.string().required(),
  description: Joi.string().required(),
  amount: Joi.number().required(),
  date: Joi.date().default(Date.now),
});

export { Transaction, addSchema };
