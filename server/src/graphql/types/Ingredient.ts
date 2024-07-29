import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
class Ingredient {
  @Field((type) => ID, { nullable: false })
  id: number;

  @Field({ nullable: false })
  name: string;

  @Field({ nullable: false })
  size: number;
}

export default Ingredient;
