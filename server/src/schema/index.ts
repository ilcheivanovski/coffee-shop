import { makeExecutableSchema } from "graphql-tools";
import { mergeResolvers, mergeTypes } from "merge-graphql-schemas";
import { patientTypeDefs, coffeeTypesResolver } from "../resolvers/coffeeTypesResolver";

export default makeExecutableSchema({
    typeDefs:
        patientTypeDefs,
    resolvers: mergeResolvers([coffeeTypesResolver])
});
