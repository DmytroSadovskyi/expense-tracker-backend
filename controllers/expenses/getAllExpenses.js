import { Expense } from '../../models/expense.js';

const getAllExpenses = async (req, res) => {
  const { _id: owner } = req.user;

  const result = await Expense.find({ owner });

  return res.status(200).json(result);
};

export default getAllExpenses;
