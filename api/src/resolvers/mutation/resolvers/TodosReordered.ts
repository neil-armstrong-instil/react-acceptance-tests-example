import type {MutationResolvers} from "@shared/graphql/schema/__generated__/resolvers-types";
import {MutationResult} from "@shared/graphql/schema/__generated__/resolvers-types";

export const todosReordered: MutationResolvers["todosReordered"] = (parent, {id, atIndex}, {database}) => {
  try {
    database.reorderTodos(id, atIndex);

    return {
      result: MutationResult.Success
    };
  } catch (error) {
    console.error(error);
    return {
      result: MutationResult.Failure,
      message: "Failed to reorder todos"
    };
  }
};
