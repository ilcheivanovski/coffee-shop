import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, NonAttribute } from 'sequelize';
import sequelize from '../database';
import Ingredient from './Ingredients';

// must use declare on your class properties typings to ensure TypeScript does not emit those class properties    ]
// InferAttributes, and InferCreationAttributes. They will extract Attribute typings directly from the Model:
class Coffee extends Model<InferAttributes<Coffee>, InferCreationAttributes<Coffee>> {
    declare id: CreationOptional<string>;;
    declare name: string;
    // You can also pre-declare possible inclusions, these will only be populated if you
    // actively include a relation.
    declare ingredients: NonAttribute<Ingredient[]>; // Note this is optional since it's only populated when explicitly requested in code
    // declare static associations: {
    //     ingredients: Association<Coffee, CoffeeIngredients>;
    // };
}

Coffee.init(
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
    },
    {
        tableName: 'coffees',
        sequelize // passing the `sequelize` instance is required
    }
);

export default Coffee
