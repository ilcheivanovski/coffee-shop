import { injectable } from "inversify";
import { Resolver, Query, Mutation, Args, Int } from "type-graphql";
import "reflect-metadata";

import Coffee from "../graphql/types/Coffee";
import CoffeeModel from "../models/coffee.model";
import CreateCoffeeArgs from "../graphql/args/CreateCoffee.args";
import UpdateCoffeeArgs from "../graphql/args/UpdateCoffee.args";
import DeleteCoffeeArgs from "../graphql/args/DeleteCoffee.args";
import CoffeeService from "../services/Coffee.service";

@injectable()
@Resolver((of) => Coffee)
class CoffeTypesResolver {
  public constructor(public coffeeService: CoffeeService) {}

  @Query((returns) => [Coffee])
  async allCoffeTypes(): Promise<CoffeeModel[]> {
    return this.coffeeService.getAllCoffeTypes();
  }
  @Mutation((returns) => Coffee)
  async createCoffee(
    @Args() { name, ingredients }: CreateCoffeeArgs
  ): Promise<CoffeeModel> {
    return this.coffeeService.createCoffee(name, ingredients as any);
  }
  @Mutation((returns) => Coffee)
  async updateCoffee(
    @Args() { id, name, ingredients }: UpdateCoffeeArgs
  ): Promise<CoffeeModel> {
    return this.coffeeService.updateCoffee(id, name, ingredients as any);
  }
  @Mutation((returns) => Int)
  async deleteCoffee(@Args() { id }: DeleteCoffeeArgs): Promise<number> {
    return this.coffeeService.deleteCoffee(id);
  }
}

export default CoffeTypesResolver;
