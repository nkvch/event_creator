import mongoose from 'mongoose';

export default () => {
  const connString = process.env.DB_CONNECTION_STRING;

  return mongoose.connect(connString as string);
};
