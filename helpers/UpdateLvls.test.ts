import updateLvls, { emptyLvls } from "./UpdateLvls";

describe("tests for lvl up array", () => {
  test("Max first ability", () => {
    expect(updateLvls("W", [1, 4, 5, 7, 9], emptyLvls)).toMatchObject([
      "W",
      "Q",
      "Q",
      "W",
      "W",
      "Q",
      "W",
      "Q",
      "W",
      "Q",
      "Q",
      "Q",
      "Q",
      "Q",
      "Q",
      "Q",
      "Q",
      "Q",
    ]);
  });
});
