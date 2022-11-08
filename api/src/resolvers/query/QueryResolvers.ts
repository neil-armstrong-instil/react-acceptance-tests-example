import type {QueryResolvers} from "@shared/graphql/schema/__generated__/resolvers-types";
import {todos} from "@src/resolvers/query/resolvers/Todos";

export const Query: QueryResolvers = {
  todos
};
