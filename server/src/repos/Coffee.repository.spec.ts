let coffee = {
  id: 1,
  name: "Latte",
  ingredients: [{ id: 1, name: "Sugar", size: 200 }],
};

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

describe("coffee repository", () => {
  it("should have a method called findUsers", async () => {
    expect(mockCoffeeRepo.getAllCoffeTypes).toBeDefined();
  });

  it("should have a method called createCoffee", async () => {
    expect(mockCoffeeRepo.createCoffee).toBeDefined();
  });

  it("getAllCoffeTypes method should return coffees", async () => {
    expect(await mockCoffeeRepo.getAllCoffeTypes()).toEqual(coffees);
  });

  it("create method should return created value", async () => {
    const jsonData = {
      name: "Latte",
      ingredients: [{ name: "Sugar", size: 200 }],
    };
    const response = await mockCoffeeRepo.createCoffee(
      jsonData.name,
      jsonData.ingredients as any
    );

    expect(response).toEqual(jsonData);
  });

  it("update method should return updated value", async () => {
    const jsonData = {
      name: "Latte",
      ingredients: [{ name: "Sugar", size: 200 }],
    };
    const response = await mockCoffeeRepo.createCoffee(
      jsonData.name,
      jsonData.ingredients as any
    );

    expect(response).toEqual(jsonData);
  });

  it("delete method should return deleted id", async () => {
    const jsonData = {
      id: 1,
    };
    const response = await mockCoffeeRepo.deleteCoffee(1);

    expect(response).toEqual(jsonData.id);
  });
});
