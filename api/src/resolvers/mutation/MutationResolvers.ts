import type {MutationResolvers} from "@src/schema/__generated__/resolvers-types";
import {todoAdded} from "@src/resolvers/mutation/resolvers/TodoAdded";
import {todoDeleted} from "@src/resolvers/mutation/resolvers/TodoDeleted";
import {todosReordered} from "@src/resolvers/mutation/resolvers/TodosReordered";

export const Mutation: MutationResolvers = {
  todoAdded,
  todoDeleted,
  todosReordered
};
