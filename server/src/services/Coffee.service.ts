import { injectable } from "inversify";
import "reflect-metadata";
import CoffeeRepository from "../repos/Coffee.repository";
import Ingredient from "../models/ingredients.model";
import Coffee from "../models/coffee.model";

@injectable()
export default class CoffeeService {
  //coffeeRepository property is a dependency
  constructor(public readonly coffeeRepository: CoffeeRepository) {}

  async getAllCoffeTypes(): Promise<Coffee[]> {
    return this.coffeeRepository.getAllCoffeTypes();
  }
  async createCoffee(name: string, ingredients: Ingredient[]): Promise<Coffee> {
    return this.coffeeRepository.createCoffee(name, ingredients);
  }
  async updateCoffee(
    id: number,
    name: string,
    ingredients: Ingredient[]
  ): Promise<Coffee> {
    return this.coffeeRepository.updateCoffee(id, name, ingredients);
  }
  async deleteCoffee(id: number): Promise<number> {
    return this.coffeeRepository.deleteCoffee(id);
  }
}
