import { injectable } from "inversify";
import "reflect-metadata";
import Coffee from "../models/coffee.model";
import Ingredient from "../models/ingredients.model";
//CRUD operations

@injectable()
export default class CoffeeRepository {
  async getAllCoffeTypes(): Promise<Coffee[]> {
    return await Coffee.findAll({
      include: [
        {
          association: Ingredient.associations.ingredients,
          as: "ingredients",
        },
      ],
    });
  }
  async createCoffee(name: string, ingredients: Ingredient[]): Promise<Coffee> {
    // simulation for optimistic response on client side
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return await Coffee.create(
      {
        name: name,
        ingredients: ingredients,
      } as Coffee,
      {
        include: [
          {
            association: Ingredient.associations.ingredients,
            as: "ingredients",
          },
        ],
      }
    );
  }
  async updateCoffee(
    id: number,
    name: string,
    ingredients: Ingredient[]
  ): Promise<Coffee> {
    const coffee = await Coffee.findOne({
      where: { id: id },
      include: [
        {
          association: Ingredient.associations.ingredients,
          as: "ingredients",
        },
      ],
    });
    if (coffee) {
      coffee.name = name;
      coffee.save();
    }

    const ingredientsIds = coffee?.ingredients.map((i) => i.id);
    await Ingredient.destroy({
      where: { id: ingredientsIds },
    });

    await Ingredient.bulkCreate(
      ingredients.map((i: any) => ({
        name: i.name,
        size: +i.size,
        CoffeeId: coffee?.id,
      })) as any
    );

    return { id, name, ingredients } as Coffee;
  }
  async deleteCoffee(id: number): Promise<number> {
    await Coffee.destroy({
      where: { id: id },
    });
    await Ingredient.destroy({
      where: { CoffeeId: id },
    });
    return id;
  }
}
