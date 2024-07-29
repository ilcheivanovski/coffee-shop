import CoffeeResolver from "./Coffee.resolver";
import CoffeeService from "../services/Coffee.service";

let coffees = [
  {
    id: 1,
    name: "Latte",
    ingredients: [{ id: 1, name: "Sugar", size: 200 }],
  },
  {
    id: 2,
    name: "Cappucino",
    ingredients: [{ id: 2, name: "Foam milk", size: 120 }],
  },
];

const mockCoffeeRepo = {
  getAllCoffeTypes: jest.fn().mockResolvedValue(coffees),
  createCoffee: jest
    .fn()
    .mockImplementation(
      async (name, ingredients) => await { name, ingredients }
    ),
  updateCoffee: jest
    .fn()
    .mockImplementation(
      async (id, name, ingredients) => await { id, name, ingredients }
    ),
  deleteCoffee: jest.fn().mockImplementation(async (id: number) => await id),
};

const coffeeService = new CoffeeService(mockCoffeeRepo);
const coffeeResolver = new CoffeeResolver(coffeeService);

describe("Controller test", () => {
  it("should have access to the coffee service", () => {
    expect(coffeeResolver.coffeeService).toBeDefined();
  });

  it("should return all coffees", async () => {
    const response = await coffeeResolver.allCoffeTypes();
    expect(response).toEqual(coffees);
  });

  it("should return create coffee", async () => {
    const jsonData = {
      name: "Latte",
      ingredients: [{ name: "Sugar", size: 200 }],
    };
    const response = await coffeeResolver.createCoffee({
      name: jsonData.name,
      ingredients: jsonData.ingredients,
    } as any);

    expect(response).toEqual(jsonData);
  });

  it("should return update coffee", async () => {
    const jsonData = {
      id: 1,
      name: "Latte",
      ingredients: [{ id: 1, name: "Sugar", size: 200 }],
    };
    const response = await coffeeResolver.updateCoffee({
      id: 1,
      name: jsonData.name,
      ingredients: jsonData.ingredients,
    });

    expect(response).toEqual(jsonData);
  });

  it("should delete coffee", async () => {
    const jsonData = {
      id: 1,
    };
    const response = await coffeeResolver.deleteCoffee({
      id: 1,
    });

    expect(response).toEqual(jsonData.id);
  });
});
