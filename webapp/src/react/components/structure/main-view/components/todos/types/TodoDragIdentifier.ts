export const todoDragIdentifiers = [
  "todo"
] as const;
export const todoDragIdentifiersAsStrings = todoDragIdentifiers as unknown as string[];
export type TodoDragIdentifier = typeof todoDragIdentifiers[number];

export const todoDragIdentifier = (_: TodoDragIdentifier): TodoDragIdentifier => _;
