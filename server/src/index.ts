require('dotenv').config();

import express from "express";
import cors from "cors";
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import schema from "./schema";
import dbService from './services/dbService'

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

const server = new ApolloServer({
  schema
});

// Note we must call `start()` on the `ApolloServer`
// instance before passing the instance to `expressMiddleware`
(async () => {
  await dbService(process.env.NODE_ENV || "development", process.env.MIGRATE).start();
  await server.start();
  app.use(
    '/graphql',
    cors(),
    express.json(),
    expressMiddleware(server),
  );

  // start the Express server
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });

})()


