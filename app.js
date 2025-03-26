import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import logger from 'morgan';
import authRouter from './routes/api/auth.js';
import incomeRouter from './routes/api/incomes.js';
import expenseRouter from './routes/api/expenses.js';

dotenv.config();

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(express.json());
app.use(logger(formatsLogger));
app.use(express.static('public'));
app.use(cors());

app.use('/api/auth', authRouter);
app.use('/api/income', incomeRouter);
app.use('/api/expense', expenseRouter);
app.get('/', (req, res) => {
  res.json('Hello from server');
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

export default app;
