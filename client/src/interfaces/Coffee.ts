export interface IIngredient {
    id: number;
    name: string
    size: number
}

export interface ICoffee {
    id: number | null;
    name: string
    ingredients: IIngredient[]
}