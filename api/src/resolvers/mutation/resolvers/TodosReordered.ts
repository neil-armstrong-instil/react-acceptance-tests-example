import type {MutationResolvers} from "@src/schema/__generated__/resolvers-types";
import {MutationResult} from "@src/schema/__generated__/resolvers-types";

export const todosReordered: MutationResolvers["todosReordered"] = (parent, {newOrderAsIds}, {database}) => {
  try {
    database.reorderTodos(newOrderAsIds);

    return {
      result: MutationResult.Success
    };
  } catch (error) {
    console.error(error);
    return {
      result: MutationResult.Failure,
      message: "Failed to delete todo"
    };
  }
};
