import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import sequelize from '../database';
import Coffee from './Coffee';
import Ingredient from './Ingredients';

// must use declare on your class properties typings to ensure TypeScript does not emit those class properties    ]
// InferAttributes, and InferCreationAttributes. They will extract Attribute typings directly from the Model:
class CoffeeIngredients extends Model<InferAttributes<CoffeeIngredients>, InferCreationAttributes<CoffeeIngredients>> {
    declare id: CreationOptional<string>;;
    declare coffeeId: number;
    declare ingredientId: number;
}

CoffeeIngredients.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        coffeeId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        ingredientId: {
            type: DataTypes.INTEGER, // from 1 to 5
            allowNull: false
        },
    },
    {
        tableName: 'coffeeIngredients',
        sequelize // passing the `sequelize` instance is required
    }
);


export default CoffeeIngredients