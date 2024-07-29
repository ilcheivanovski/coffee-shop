import CoffeeModel from "../models/coffee.model";
import Coffee from "../graphql/types/Coffee";
import Ingredient from "../models/ingredients.model";

export interface ICoffeeService {
  getAllCoffeTypes(): Promise<any>;
  createCoffee(name: string, ingredients: Ingredient[]): Promise<CoffeeModel>;
  updateCoffee(
    id: number,
    name: string,
    ingredients: Ingredient[]
  ): Promise<any>;
  deleteCoffee(id: number): Promise<any>;
}
