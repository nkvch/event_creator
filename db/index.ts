import mongoose from 'mongoose';

export default () => {
  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;

  const connString = `mongodb://${user}:${password}@127.0.0.1:27017/iwent`;

  return mongoose.connect(connString);
};
