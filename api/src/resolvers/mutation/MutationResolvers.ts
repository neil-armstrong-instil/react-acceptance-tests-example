import type {MutationResolvers} from "@shared/graphql/schema/__generated__/resolvers-types";
import {todoAdded} from "@src/resolvers/mutation/resolvers/TodoAdded";
import {todoDeleted} from "@src/resolvers/mutation/resolvers/TodoDeleted";
import {todosReordered} from "@src/resolvers/mutation/resolvers/TodosReordered";
import {todoUpdated} from "@src/resolvers/mutation/resolvers/TodoUpdated";

export const Mutation: MutationResolvers = {
  todoAdded,
  todoDeleted,
  todosReordered,
  todoUpdated
};
