import { Expense } from '../../models/expense.js';
import { HttpError } from '../../helpers/index.js';

const deleteExpense = async (req, res) => {
  const { id } = req.params;

  const result = await Expense.findByIdAndDelete(id);

  if (!result) {
    throw HttpError(404, 'Not Found');
  }

  res.json({
    message: 'Expense deleted successfully.',
  });
};

export default deleteExpense;
