import { ObjectType, Field, Int } from "type-graphql";
import Ingredient from "./Ingredient";

@ObjectType()
class Coffee {
  @Field((type) => Int, { nullable: false })
  id: number;

  @Field({ nullable: false })
  name: string;

  @Field((type) => [Ingredient], { nullable: false })
  ingredients: Ingredient[];
}

export default Coffee;
