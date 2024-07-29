import { ArgsType, Field, Int } from "type-graphql";

@ArgsType()
class DeleteCoffeeArgs {
  @Field(() => Int, { nullable: false })
  id: number;
}

export default DeleteCoffeeArgs;
