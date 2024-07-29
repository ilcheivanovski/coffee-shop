import { ArgsType, Field, InputType, Int } from "type-graphql";
import Ingredient from "../types/Ingredient";

@InputType()
export class CreateIngredientsInput {
  @Field({ nullable: false })
  name: string;

  @Field({ nullable: false })
  size: number;
}

@ArgsType()
class CreateCoffeeArgs {
  @Field({ nullable: true })
  id: string;

  @Field({ nullable: false })
  name: string;

  @Field((type) => [CreateIngredientsInput], { nullable: false })
  ingredients: Ingredient[];
}

export default CreateCoffeeArgs;
