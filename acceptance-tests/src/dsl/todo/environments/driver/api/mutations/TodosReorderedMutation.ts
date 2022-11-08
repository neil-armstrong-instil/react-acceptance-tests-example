import {gql} from "@apollo/client";
import type {Mutation, MutationTodosReorderedArgs} from "@shared/graphql/schema/__generated__/resolvers-types";

export type TodosReorderedResponse = Pick<Mutation, "todosReordered">;
export type TodosReorderedVariables = MutationTodosReorderedArgs;

export const todosReorderedMutation = gql`
  mutation TodosReordered($id: String!, $atIndex: Int!) {
    todosReordered(id: $id, atIndex: $atIndex) {
      result
      message
    }
  }
`;
