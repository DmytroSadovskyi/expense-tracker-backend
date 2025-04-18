import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';
import { HttpError } from '../helpers/index.js';
import dotenv from 'dotenv';

dotenv.config();
const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer') {
    next(HttpError(401, 'Not authorized'));
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      next(HttpError(401, 'Not authorized'));
    }

    req.user = user;

    next();
  } catch {
    next(HttpError(401, 'Not authorized'));
  }
};

export default authenticate;
