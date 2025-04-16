import { Transaction } from '../../models/transaction.js';
import { HttpError } from '../../helpers/index.js';

const getById = async (req, res) => {
  const { id } = req.params;

  const result = await Transaction.findById(id);

  if (!result) {
    throw HttpError(404, 'not found');
  }

  res.json(result);
};

export default getById;
