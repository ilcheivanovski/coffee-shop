import { gql } from '@apollo/client';

const UPDATE_COFFEE_MUTATION = gql`
  mutation updateCoffeeMutation($id: Int!, $name: String!, $ingredients: [UpdateIngredientsInput!]!) {
    updateCoffee(name: $name, id: $id, ingredients: $ingredients) {
      id
      name
      ingredients {
        name
        size
      }
    }
  }
`;

export default UPDATE_COFFEE_MUTATION;
