import app from './app.js';
import mongoose from 'mongoose';

const { DB_HOST } = process.env;

const port = process.env.PORT || 3000;

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log('Connected to the database');
    app.listen(port, () => console.log(`Server started on port ${port}`));
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
