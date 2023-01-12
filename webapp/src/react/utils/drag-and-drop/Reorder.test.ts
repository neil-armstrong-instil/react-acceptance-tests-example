import * as target from "./Reorder";

const list = [1, 2, 3];

describe("on re-ordering a list from left to right", () => {
  let result: ReturnType<typeof target.reorder>;

  beforeEach(() => {
    result = target.reorder(list, 1, 2);
  });

  it("should return a new list with the elements re-ordered", () => {
    expect(result).toEqual([1, 3, 2]);
  });

  it("should not modify the original list", () => {
    expect(list).toEqual([1, 2, 3]);
  });
});

describe("on re-ordering a list from right to left", () => {
  let result: ReturnType<typeof target.reorder>;

  beforeEach(() => {
    result = target.reorder(list, 2, 0);
  });

  it("should return a new list with the elements re-ordered", () => {
    expect(result).toEqual([3, 1, 2]);
  });

  it("should not modify the original list", () => {
    expect(list).toEqual([1, 2, 3]);
  });
});
