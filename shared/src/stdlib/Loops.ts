export function repeatMap<MappedValue>(iterations: number, mapFunction: (index: number) => MappedValue): MappedValue[] {
  const mappedValues: MappedValue[] = [];
  for (let i = 0; i < iterations; i++) {
    mappedValues.push(mapFunction(i));
  }
  return mappedValues;
}
