export interface Position {
  x: number;
  y: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isPosition(maybePosition: any): maybePosition is Position {
  return maybePosition.x !== undefined && typeof maybePosition.x === "number"
    && maybePosition.y !== undefined && typeof maybePosition.y === "number";
}
