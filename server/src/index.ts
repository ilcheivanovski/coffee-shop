import express from "express";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { buildSchema } from "type-graphql";

import { appConfigured, container } from "./app";
import CoffeTypesResolver from "./resolvers/Coffee.resolver";
import DB from "./services/DB.service";

const PORT = process.env.PORT || 5050;

// Note we must call `start()` on the `ApolloServer`
// instance before passing the instance to `expressMiddleware`
(async () => {
  const schema = await buildSchema({
    // Array of resolvers
    resolvers: [CoffeTypesResolver],
    container,
  });
  const server = new ApolloServer({
    schema,
  });

  // Usage:
  const dbService = new DB(process.env.NODE_ENV || "development", true);

  await dbService.start();
  await dbService.createPredefinedCoffees();
  await server.start();

  appConfigured.use(
    "/graphql",
    cors(),
    express.json(),
    expressMiddleware(server)
  );

  // start the Express server
  appConfigured.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
})();
