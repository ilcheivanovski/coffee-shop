import Coffee from '../models/coffee.model'; // Import your models appropriately
import Ingredient from '../models/ingredients.model'; // Import your models appropriately
import sequelize from '../database';

export default class DB {
  private environment: string;
  private migrate: boolean;

  constructor(environment: string, migrate: boolean) {
    this.environment = environment;
    this.migrate = migrate;
  }

  private async authenticateDB() {
    return sequelize.authenticate();
  }

  private async dropDB() {
    return sequelize.drop();
  }

  private async syncDB() {
    return sequelize.sync();
  }

  private successfulDBStart() {
    console.info('connection to the database has been established successfully');
  }

  private errorDBStart(err: any) {
    console.info('unable to connect to the database:', err);
  }

  private wrongEnvironment() {
    console.warn(`only development, staging, test, and production are valid NODE_ENV variables but ${this.environment} is specified`);
    process.exit(1);
  }

  private async startMigrateTrue() {
    try {
      await this.syncDB();
      this.successfulDBStart();
    } catch (err) {
      this.errorDBStart(err);
    }
  }

  private async startMigrateFalse() {
    try {
      await this.dropDB();
      await this.syncDB();
      this.successfulDBStart();
    } catch (err) {
      this.errorDBStart(err);
    }
  }

  private async startDev() {
    try {
      await this.authenticateDB();

      if (this.migrate) {
        return this.startMigrateTrue();
      }

      // if we want to drop database uncomment this
      // await this.startMigrateFalse();
    } catch (err) {
      this.errorDBStart(err);
    }
  }

  private async startStage() {
    try {
      await this.authenticateDB();

      if (this.migrate) {
        return this.startMigrateTrue();
      }

      return this.startMigrateFalse();
    } catch (err) {
      this.errorDBStart(err);
    }
  }

  private async startTest() {
    try {
      await this.authenticateDB();
      await this.startMigrateFalse();
    } catch (err) {
      this.errorDBStart(err);
    }
  }

  private async startProd() {
    try {
      await this.authenticateDB();
      await this.startMigrateFalse();
    } catch (err) {
      this.errorDBStart(err);
    }
  }

  public async start() {
    switch (this.environment) {
      case 'development':
        await this.startDev();
        break;
      case 'staging':
        await this.startStage();
        break;
      case 'testing':
        await this.startTest();
        break;
      case 'production':
        await this.startProd();
        break;
      default:
        this.wrongEnvironment();
    }
  }

  public async createPredefinedCoffees() {
    const allCoffees = await Coffee.findAll();
    if (allCoffees.length === 0) {
      await Coffee.create(
        {
          name: 'Latte',
          ingredients: [
            { name: 'Espresso', size: 30 },
            { name: 'Steamed milk', size: 200 },
            { name: 'Milk foam', size: 20 }
          ]
        } as Coffee,
        {
          include: [
            {
              association: Ingredient.associations.ingredients,
              as: 'ingredients'
            }
          ]
        }
      );

      await Coffee.create(
        {
          name: 'Cappuccino',
          ingredients: [
            { name: 'Espresso', size: 30 },
            { name: 'Steamed milk', size: 60 },
            { name: 'Milk foam', size: 60 },
            { name: 'Cinnamon', size: 1 }
          ]
        } as Coffee,
        {
          include: [
            {
              association: Ingredient.associations.ingredients,
              as: 'ingredients'
            }
          ]
        }
      );

      await Coffee.create(
        {
          name: 'Americano',
          ingredients: [
            { name: 'Espresso', size: 30 },
            { name: 'Hot water', size: 120 }
          ]
        } as Coffee,
        {
          include: [
            {
              association: Ingredient.associations.ingredients,
              as: 'ingredients'
            }
          ]
        }
      );

      await Coffee.create(
        {
          name: 'Macchiato',
          ingredients: [
            { name: 'Espresso', size: 30 },
            { name: 'Steamed milk', size: 20 }
          ]
        } as Coffee,
        {
          include: [
            {
              association: Ingredient.associations.ingredients,
              as: 'ingredients'
            }
          ]
        }
      );

      await Coffee.create(
        {
          name: 'Mocha',
          ingredients: [
            { name: 'Espresso', size: 30 },
            { name: 'Steamed milk', size: 150 },
            { name: 'Chocolate syrup', size: 30 },
            { name: 'Whipped cream', size: 20 }
          ]
        } as Coffee,
        {
          include: [
            {
              association: Ingredient.associations.ingredients,
              as: 'ingredients'
            }
          ]
        }
      );
    }
  }
}
