import {createUuid} from "@shared/stdlib/Uuid";
import type {MutationResolvers} from "@src/schema/__generated__/resolvers-types";
import {MutationResult} from "@src/schema/__generated__/resolvers-types";
import type {Todo} from "@src/database/types/Todo";

export const todoAdded: MutationResolvers["todoAdded"] = (parent, {newTodo}, {database}) => {
  try {
    const todo: Todo = {
      id: createUuid(),
      message: newTodo.message
    };

    database.addTodo(todo);

    return {
      result: MutationResult.Success,
      todo: {
        __typename: "Todo",
        ...todo
      }
    };
  } catch (error) {
    console.error(error);
    return {
      result: MutationResult.Failure,
      message: "Failed to add todo"
    };
  }
};
