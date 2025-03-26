import { Expense } from '../../models/expense.js';
import { HttpError } from '../../helpers/index.js';

const getById = async (req, res) => {
  const { id } = req.params;

  const result = await Expense.findById(id);

  if (!result) {
    throw HttpError(404, 'Not Found');
  }

  res.json(result);
};

export default getById;
