import { Association, CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import sequelize from '../database';
import Coffee from './Coffee';

// must use declare on your class properties typings to ensure TypeScript does not emit those class properties    ]
// InferAttributes, and InferCreationAttributes. They will extract Attribute typings directly from the Model:
class Ingredient extends Model<InferAttributes<Ingredient>, InferCreationAttributes<Ingredient>> {
  declare id: CreationOptional<string>;
  declare CoffeeId: CreationOptional<string>;
  declare name: string;
  declare size: number;
  declare static associations: {
    ingredients: Association<Coffee, Ingredient>;
  };
}

Ingredient.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    size: {
      type: DataTypes.INTEGER, // ml
      allowNull: false
    },
    CoffeeId: {
      type: DataTypes.INTEGER, // ml
      allowNull: false
    }
  },
  {
    tableName: 'ingredients',
    sequelize // passing the `sequelize` instance is required
  }
);

Ingredient.associations.ingredients = Coffee.hasMany(Ingredient, { as: 'ingredients' });

export default Ingredient;
