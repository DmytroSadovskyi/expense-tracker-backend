import { Transaction } from '../../models/transaction.js';

const getAllTransactions = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Transaction.find({ owner });

  return res.status(200).json(result);
};

export default getAllTransactions;
