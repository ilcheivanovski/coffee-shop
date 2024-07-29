import "reflect-metadata"; //allows the decorator to work
import express from "express";
import "./controllers/starter.controller";
//This is the dependency injection container that will allow us to retrieve and resolve some instances from the Dependency injection container
import { Container } from "inversify";
import CoffeeRepository from "./repos/Coffee.repository";
import CoffeeService from "./services/Coffee.service";
import { InversifyExpressServer } from "inversify-express-utils";
import CoffeTypesResolver from "./resolvers/Coffee.resolver";
import { ICoffeeService } from "./interfaces/ICoffee.service";
import { ICoffeeRepository } from "./interfaces/ICoffee.repository";

const app = express();
app.use(express.json());

const container = new Container();
container.bind<ICoffeeRepository>(CoffeeRepository).toSelf();
container.bind<ICoffeeService>(CoffeeService).toSelf();
container.bind(CoffeTypesResolver).to(CoffeTypesResolver).inSingletonScope();

//http://localhost:8000/api/users/
let server = new InversifyExpressServer(
  container,
  null,
  { rootPath: "/api" },
  app
);

let appConfigured = server.build();

//You need to avoid calling app when appConfigured listens when you run tests.So we don't listen in this file
export { app, appConfigured, container };
