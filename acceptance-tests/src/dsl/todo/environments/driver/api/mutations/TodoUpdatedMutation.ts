import {gql} from "@apollo/client";
import type {Mutation, MutationTodoUpdatedArgs} from "@shared/graphql/schema/__generated__/resolvers-types";

export type TodoUpdatedResponse = Pick<Mutation, "todoUpdated">;
export type TodoUpdatedVariables = MutationTodoUpdatedArgs;

export const todoUpdatedMutation = gql`
  mutation TodoUpdated($id: String!, $todoUpdate: TodoInput!) {
    todoUpdated(id: $id, todoUpdate: $todoUpdate) {
      result
      message
    }
  }
`;
