import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server-express';
import {
  ApolloServerPluginCacheControl,
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from 'apollo-server-core';
import express from 'express';
import http from 'http';
import path from 'path';

import connectMongo from './db';
import schema from './graphql/schema';

dotenv.config();

const port = process.env.PORT || 5000;

const app = express();

app.use(express.static('client/build'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

const httpServer = http.createServer(app);

const server = new ApolloServer({
  schema,
  csrfPrevention: true,
  cache: 'bounded',
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ApolloServerPluginCacheControl({ defaultMaxAge: 5 }),
  ],
});

connectMongo()
  .then(() => {
    console.log('Connected to mongo successfully');
    return server.start();
  }).then(() => {
    server.applyMiddleware({ app });
    return new Promise<void>(resolve => { httpServer.listen({ port }, resolve); });
  })
  .then(() => {
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath} \nFrontend: http://localhost:${port}`);
  });
