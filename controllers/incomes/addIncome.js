import { Income, addSchema } from '../../models/income.js';
import { HttpError } from '../../helpers/index.js';

const addIncome = async (req, res) => {
  const { error } = addSchema.validate(req.body);
  if (error) {
    throw HttpError(400, 'missing required name field');
  }

  const { _id: owner } = req.user;
  const result = await Income.create({
    ...req.body,
    owner,
  });
  return res.status(201).json(result);
};

export default addIncome;
