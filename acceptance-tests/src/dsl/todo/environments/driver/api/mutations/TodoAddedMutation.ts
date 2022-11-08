import {gql} from "@apollo/client";
import type {Mutation, MutationTodoAddedArgs} from "@shared/graphql/schema/__generated__/resolvers-types";

export type TodoAddedResponse = Pick<Mutation, "todoAdded">;
export type TodoAddedVariables = MutationTodoAddedArgs;

export const todoAddedMutation = gql`
  mutation TodoAdded($newTodo: TodoInput!) {
    todoAdded(newTodo: $newTodo) {
      result
      message
      todo {
        id
        message
      }
    }
  }
`;
