import type {QueryResolvers} from "@src/schema/__generated__/resolvers-types";
import {todos} from "@src/resolvers/query/resolvers/Todos";

export const Query: QueryResolvers = {
  todos
};
