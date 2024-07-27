import Coffee from '../models/Coffee';
import Ingredient from '../models/Ingredients';

export const patientTypeDefs = `
  type Coffee {
    id: Int!
    name: String!
    ingredients: [Ingredients!]
  }

  input CreateIngredientsInput {
    name: String!
    size: Int!
  }
  
  input UpdateIngredientsInput {
    name: String!
    size: Int!
  }

  input DeleteIngredientsInput {
    id: Int!
  }

  type Ingredients {
    id: Int!
    name: String!
    size: Int!
  }

  type Query {
    allCoffeTypes: [Coffee!]!
  }

  type Mutation {
    createCoffee(name: String!, ingredients: [CreateIngredientsInput!]!): Coffee
    updateCoffee(id: Int!, name: String!, ingredients: [UpdateIngredientsInput!]!): Coffee
    deleteCoffee(id: Int!): Int
  }
`;

export const coffeeTypesResolver = {
  Query: {
    allCoffeTypes: async () => {
      return await Coffee.findAll({
        include: [
          {
            association: Ingredient.associations.ingredients,
            as: 'ingredients'
          }
        ]
      });
    }
  },
  Mutation: {
    createCoffee: async (
      _: any,
      data: Coffee //TODO:add try catch
    ) => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      return await Coffee.create(
        {
          name: data.name,
          ingredients: data.ingredients
        } as any,
        {
          include: [
            {
              association: Ingredient.associations.ingredients,
              as: 'ingredients'
            }
          ]
        }
      );
    },
    updateCoffee: async (_: any, data: any) => {
      const coffee = await Coffee.findOne({
        where: { id: data.id },
        include: [
          {
            association: Ingredient.associations.ingredients,
            as: 'ingredients'
          }
        ]
      });
      if (coffee) {
        coffee.name = data.name;
        coffee.save();
      }

      const ingredientsIds = coffee?.ingredients.map((i) => i.id);
      await Ingredient.destroy({
        where: { id: ingredientsIds }
      });

      await Ingredient.bulkCreate(
        data.ingredients.map((i: Ingredient) => ({
          name: i.name,
          size: +i.size,
          CoffeeId: coffee?.id
        })) as any
      );

      return data;
    },
    deleteCoffee: async (_: any, data: any) => {
      await Coffee.destroy({
        where: { id: data.id }
      });
      await Ingredient.destroy({
        where: { CoffeeId: data.id }
      });
      return data.id;
    }
  }
};
