import mongoose from 'mongoose';

export default () => {
  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;
  const dbName = process.env.DB_NAME;
  const cluster = process.env.MONGO_CLUSTER;

  const connString = `mongodb+srv://${user}:${password}@${cluster}/${dbName}?retryWrites=true&w=majority`;

  return mongoose.connect(connString);
};
