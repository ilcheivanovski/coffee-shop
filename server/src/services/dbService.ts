import Coffee from '../models/Coffee';
import Ingredient from '../models/Ingredients';
import CoffeeIngredients from '../models/CoffeeIngredients';
import database from '../database';

// const Ingredients = Coffee.hasMany(Ingredient, { as: 'ingredients' });

const dbService = (environment: string, migrate: any) => {
  const authenticateDB = () => database.authenticate();

  const dropDB = () => database.drop();
  const syncDB = () => database.sync();

  const successfulDBStart = () => console.info('connection to the database has been established successfully');

  const errorDBStart = (err: any) => console.info('unable to connect to the database:', err);

  const wrongEnvironment = () => {
    console.warn(`only development, staging, test and production are valid NODE_ENV variables but ${environment} is specified`);
    return process.exit(1);
  };

  const startMigrateTrue = async () => {
    try {
      await syncDB();
      successfulDBStart();
    } catch (err) {
      errorDBStart(err);
    }
  };

  const startMigrateFalse = async () => {
    try {
      await dropDB();
      await syncDB();
      successfulDBStart();
    } catch (err) {
      errorDBStart(err);
    }
  };

  const startDev = async () => {
    try {
      await authenticateDB();

      if (migrate) {
        return startMigrateTrue();
      }

      // TODO: add this to set initial tables
      // await startMigrateFalse();
      // await createPredifendCoffees()
    } catch (err) {
      return errorDBStart(err);
    }
  };

  const startStage = async () => {
    try {
      await authenticateDB();

      if (migrate) {
        return startMigrateTrue();
      }

      return startMigrateFalse();
    } catch (err) {
      return errorDBStart(err);
    }
  };

  const startTest = async () => {
    try {
      await authenticateDB();
      await startMigrateFalse();
    } catch (err) {
      errorDBStart(err);
    }
  };

  const startProd = async () => {
    try {
      await authenticateDB();
      await startMigrateFalse();
    } catch (err) {
      errorDBStart(err);
    }
  };

  const start = async () => {
    switch (environment) {
      case 'development':
        await startDev();
        break;
      case 'staging':
        await startStage();
        break;
      case 'testing':
        await startTest();
        break;
      case 'production':
        await startProd();
        break;
      default:
        await wrongEnvironment();
    }
  };

  const createPredifendCoffees = async () => {
    // 1.Latte
    await Coffee.create(
      {
        name: 'Latte',
        ingredients: [
          { name: 'Espresso', size: 30 },
          {
            name: 'Steamed milk',
            size: 200
          },
          {
            name: 'Milk foam',
            size: 20
          }
        ]
      } as any,
      {
        include: [{ association: Ingredient.associations.ingredients, as: 'ingredients' }]
      }
    );

    // 2.Cappuccino
    await Coffee.create(
      {
        name: 'Cappuccino',
        ingredients: [
          { name: 'Espresso', size: 30 },
          {
            name: 'Steamed milk',
            size: 60
          },
          {
            name: 'Milk foam',
            size: 60
          },
          {
            name: 'Cinnamon',
            size: 1
          }
        ]
      } as any,
      {
        include: [{ association: Ingredient.associations.ingredients, as: 'ingredients' }]
      }
    );
    // 3.Americano
    await Coffee.create(
      {
        name: 'Americano',
        ingredients: [
          { name: 'Espresso', size: 30 },
          {
            name: 'Hot water',
            size: 120
          }
        ]
      } as any,
      {
        include: [{ association: Ingredient.associations.ingredients, as: 'ingredients' }]
      }
    );
    // 4.Macchiato
    await Coffee.create(
      {
        name: 'Macchiato',
        ingredients: [
          { name: 'Espresso', size: 30 },
          {
            name: 'Steamed milk',
            size: 20
          }
        ]
      } as any,
      {
        include: [{ association: Ingredient.associations.ingredients, as: 'ingredients' }]
      }
    );
    // 5.Mocha
    await Coffee.create(
      {
        name: 'Mocha',
        ingredients: [
          { name: 'Espresso', size: 30 },
          {
            name: 'Steamed milk',
            size: 150
          },
          {
            name: 'Chocolate syrup',
            size: 30
          },
          {
            name: 'Whipped cream',
            size: 20
          }
        ]
      } as any,
      {
        include: [{ association: Ingredient.associations.ingredients, as: 'ingredients' }]
      }
    );
  };

  return {
    start
  };
};

export default dbService;
