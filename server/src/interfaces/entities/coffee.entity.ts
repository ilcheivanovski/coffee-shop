import { IIngredient } from "./ingredient.entity";

export interface ICoffee {
  id: number | null;
  name: string;
  ingredients: IIngredient[];
}
