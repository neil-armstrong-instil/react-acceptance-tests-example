import {gql} from "@apollo/client";
import type {Query} from "@shared/graphql/schema/__generated__/resolvers-types";

export type GetTodosResponse = Pick<Query, "todos">;

export const getTodosQuery = gql`
  query GetTodos {
    todos {
      id
      message
    }
  }
`;
