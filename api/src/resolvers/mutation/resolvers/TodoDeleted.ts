import type {MutationResolvers} from "@shared/graphql/schema/__generated__/resolvers-types";
import {MutationResult} from "@shared/graphql/schema/__generated__/resolvers-types";

export const todoDeleted: MutationResolvers["todoDeleted"] = (parent, {id}, {database}) => {
  try {
    database.deleteTodo(id);

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
