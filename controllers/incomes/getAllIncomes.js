import { Income } from '../../models/income.js';

const getAllIncomes = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Income.find({ owner });

  return res.status(200).json(result);
};

export default getAllIncomes;
