import {gql} from "@apollo/client";
import type {Mutation, MutationTodoDeletedArgs} from "@shared/graphql/schema/__generated__/resolvers-types";

export type TodoDeletedResponse = Pick<Mutation, "todoDeleted">;
export type TodoDeletedVariables = MutationTodoDeletedArgs;

export const todoDeletedMutation = gql`
  mutation TodoDeleted($id: String!) {
    todoDeleted(id: $id) {
      result
      message
    }
  }
`;
