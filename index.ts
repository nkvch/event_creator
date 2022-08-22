import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginCacheControl } from 'apollo-server-core';

import connectMongo from './db';
import schema from './graphql/schema';

dotenv.config();

const port = process.env.PORT;

const server = new ApolloServer({
  schema,
  plugins: [ApolloServerPluginCacheControl({ defaultMaxAge: 5 })],
});

connectMongo()
  .then(() => {
    console.log('Connected to mongo successfully');
    return server.listen({ port });
  }).then(res => {
    console.log(`Server is running at ${res.url}`);
  });
