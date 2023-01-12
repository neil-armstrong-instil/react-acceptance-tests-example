export function reorder<Item>(list: Item[], oldLocation: number, newLocation: number): Item[] {
  const result = Array.from(list);
  const [removed] = result.splice(oldLocation, 1);
  result.splice(newLocation, 0, removed);

  return result;
}
