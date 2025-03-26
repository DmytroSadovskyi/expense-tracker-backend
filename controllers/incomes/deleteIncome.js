import { Income } from '../../models/income.js';
import { HttpError } from '../../helpers/index.js';

const deleteIncome = async (req, res) => {
  const { id } = req.params;
  const result = await Income.findByIdAndDelete(id);

  if (!result) {
    throw HttpError(404, 'Not found');
  }

  return res.json({
    message: 'Income deleted successfully.',
  });
};

export default deleteIncome;
