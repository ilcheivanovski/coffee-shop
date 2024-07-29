import Coffee from "../models/coffee.model";
import CoffeModel from "../interfaces/entities/coffee.entity";
import Ingredient from "../models/ingredients.model";

export interface ICoffeeRepository {
  getAllCoffeTypes(): Promise<Coffee[]>;
  createCoffee(name: string, ingredients: Ingredient[]): Promise<Coffee>;
  updateCoffee(
    id: number,
    name: string,
    ingredients: Ingredient[]
  ): Promise<CoffeModel>;
  deleteCoffee(id: number): Promise<CoffeModel>;
}
