import assert from "assert";
import { mock } from "jest-mock-extended";
import CoffeeService from "./Coffee.service";
import { ICoffee } from "../interfaces/entities/coffee.entity";

const mockedCoffeeService = mock<CoffeeService>();

describe("Coffees service", () => {
  let coffee = {
    id: 1,
    name: "Latte",
    ingredients: [{ id: 1, name: "Sugar", size: 200 }],
  } as any;

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
  ] as any[];

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
  it("getCoffees method is called and returns all coffees", async () => {
    //mockResolvedValue accepts a value that will be returned whenever the mock function is called
    mockedCoffeeService.getAllCoffeTypes.mockResolvedValue(coffees);
    //assert.deepEqual tests if 2 objects are equal
    assert.deepEqual(await coffeeService.getAllCoffeTypes(), coffees);

    //jest.spyOn is used to track calls on a method
    const spy = jest.spyOn(coffeeService, "getAllCoffeTypes");
    await coffeeService.getAllCoffeTypes();
    expect(spy).toHaveBeenCalled();

    jest
      .spyOn(coffeeService, "getAllCoffeTypes")
      .mockImplementation(async () => await mockCoffeeRepo.getAllCoffeTypes());

    jest
      .spyOn(coffeeService, "getAllCoffeTypes")
      .mockReturnValue(Promise.resolve(coffees));
  });

  it("createCoffe is called and return is equal sent", async () => {
    const jsonData = {
      name: "Latte",
      ingredients: [{ id: 1, name: "Sugar", size: 200 }],
    };

    const spy = jest.spyOn(coffeeService, "createCoffee");
    assert.deepEqual(
      await coffeeService.createCoffee(
        jsonData.name,
        jsonData.ingredients as any
      ),
      jsonData
    );
    expect(spy).toHaveBeenCalled();
  });

  it("updateCoffee is called and returns a single coffee", async () => {
    mockedCoffeeService.updateCoffee.mockResolvedValue(coffee);
    const spy = jest.spyOn(coffeeService, "updateCoffee");
    const jsonData = {
      id: 1,
      name: "Latte",
      ingredients: [{ id: 1, name: "Sugar", size: 200 }],
    };
    assert.deepEqual(
      await coffeeService.updateCoffee(
        jsonData.id,
        jsonData.name,
        jsonData.ingredients as any
      ),
      jsonData
    );
    expect(spy).toHaveBeenCalled();
  });
  it("deleteCoffee is called and returns a id", async () => {
    mockedCoffeeService.deleteCoffee.mockResolvedValue(coffee);
    const spy = jest.spyOn(coffeeService, "deleteCoffee");
    const jsonData = {
      id: 1,
      name: "Latte",
      ingredients: [{ id: 1, name: "Sugar", size: 200 }],
    };
    assert.deepEqual(
      await coffeeService.deleteCoffee(jsonData.id),
      jsonData.id
    );
    expect(spy).toHaveBeenCalled();
  });
});
