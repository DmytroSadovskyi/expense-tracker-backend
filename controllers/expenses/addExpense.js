import { Expense, addSchema } from '../../models/expense.js';
import { HttpError } from '../../helpers/index.js';

const addExpense = async (req, res) => {
  const { error } = addSchema.validate(req.body);

  if (error) {
    throw HttpError(404, 'missing fields');
  }
  const { _id: owner } = req.user;
  const result = await Expense.create({ ...req.body, owner });

  return res.status(201).json(result);
};

export default addExpense;
