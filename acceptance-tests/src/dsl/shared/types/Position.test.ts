import * as target from "./Position";
import type {Position} from "./Position";

const validPosition: Position = {
  x: 10,
  y: 20
};

it("should return true if object is position", () => {
  const result = target.isPosition(validPosition);

  expect(result).toBe(true);
});

it("should return false if object is not position", () => {
  const result = target.isPosition("should fail");

  expect(result).toBe(false);
});
