import type {QueryResolvers} from "@shared/graphql/schema/__generated__/resolvers-types";

export const todos: QueryResolvers["todos"] = (parent, args, {database}) => {
  return database.getTodos().map(todo => ({
    __typename: "Todo",
    ...todo
  }));
};
