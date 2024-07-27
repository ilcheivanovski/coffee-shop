import { gql } from '@apollo/client';

const DELETE_COFFEE_MUTATION = gql`
  mutation deleteCoffeeMutation($id: Int!) {
    deleteCoffee(id: $id)
  }
`;

export default DELETE_COFFEE_MUTATION;
