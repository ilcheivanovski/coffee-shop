import { gql } from '@apollo/client';

const CREATE_COFFEE_MUTATION = gql`
  mutation createCoffeeMutation($name: String!, $ingredients: [CreateIngredientsInput!]!) {
    createCoffee(name: $name, ingredients: $ingredients) {
      id
      name
      ingredients {
        id
        name
        size
      }
    }
  }
`;

export default CREATE_COFFEE_MUTATION;
