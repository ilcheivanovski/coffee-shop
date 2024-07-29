import { ArgsType, Field, InputType, Int } from "type-graphql";
import Ingredient from "../types/Ingredient";

@InputType()
export class UpdateIngredientsInput {
  @Field({ nullable: false })
  name: string;

  @Field({ nullable: false })
  size: number;
}

@ArgsType()
class UpdateCoffeeArgs {
  @Field(() => Int, { nullable: false })
  id: number;

  @Field({ nullable: false })
  name: string;

  @Field((type) => [UpdateIngredientsInput], { nullable: false })
  ingredients: Ingredient[];
}

export default UpdateCoffeeArgs;
