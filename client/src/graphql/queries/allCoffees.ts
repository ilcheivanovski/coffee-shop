import { gql } from "@apollo/client";

const ALL_COFFEES_QUERY = gql`
  query allCoffeTypesQuery {
    allCoffeTypes {
      id
      name
      ingredients {                             
        name
        size
      }
    }
  }
`;

export default ALL_COFFEES_QUERY;