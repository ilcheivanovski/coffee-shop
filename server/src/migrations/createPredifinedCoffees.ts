export default {
  up: (queryInterface: any, Sequelize: any) => {
    return queryInterface.bulkInsert("coffees", [
      {
        name: "Latte",
        ingredients: [{ name: "Espresso", size: 45 }],
      },
    ]);
  },
  down: (queryInterface: any, Sequelize: any) => {
    return queryInterface.bulkDelete("coffees", null, {});
  },
};
