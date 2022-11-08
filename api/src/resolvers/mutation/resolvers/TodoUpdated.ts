import type {MutationResolvers} from "@shared/graphql/schema/__generated__/resolvers-types";
import {MutationResult} from "@shared/graphql/schema/__generated__/resolvers-types";

export const todoUpdated: MutationResolvers["todoUpdated"] = (parent, {id, todoUpdate}, {database}) => {
  try {
    database.updateTodo(id, {
      message: todoUpdate.message
    });

    return {
      result: MutationResult.Success
    };
  } catch (error) {
    console.error(error);
    return {
      result: MutationResult.Failure,
      message: "Failed to update todo"
    };
  }
};
