import { Expense, addSchema } from '../../models/expense.js';
import { HttpError } from '../../helpers/index.js';
import UpdateById from '../incomes/updateById.js';

const updateById = async (req, res) => {
  const { error } = addSchema.validate(req.body);

  if (error) {
    throw HttpError(400, 'missing fields');
  }
  const { id } = req.params;

  const result = await Expense.findByIdAndUpdate(id, req.body, { new: true });

  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.json(result);
};

export default updateById;
