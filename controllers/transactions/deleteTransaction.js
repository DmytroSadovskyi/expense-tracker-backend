import { Transaction } from '../../models/transaction.js';
import { HttpError } from '../../helpers/index.js';

const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  const result = await Transaction.findByIdAndDelete(id);

  if (!result) {
    throw HttpError(404, 'Not found');
  }

  return res.json({
    message: 'Income deleted successfully.',
  });
};

export default deleteTransaction;
