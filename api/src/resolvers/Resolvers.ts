import type {Resolvers} from "@shared/graphql/schema/__generated__/resolvers-types";
import {Query} from "@src/resolvers/query/QueryResolvers";
import {Mutation} from "@src/resolvers/mutation/MutationResolvers";

export const resolvers: Resolvers = {
  Query,
  Mutation
};
