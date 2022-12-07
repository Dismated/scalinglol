import spellDmg from "./calculations";

describe("Calculation check", () => {
  test("add all arguments", () => {
    expect(
      spellDmg({
        initialDmg: 10,
        apModifier: 0.1,
        ap: 100,
        adModifier: 0.1,
        ad: 100,
        count: 1,
        dmgPerSkillLvl: 10,
        skillLvl: 1,
        dmgPerChampLvl: 10,
        champLvl: 1,
      })
    ).toBe(40);
  });
  test("basic attack", () => {
    expect(spellDmg({ ad: 63, count: 1, adModifier: 1 })).toBe(63);
  });
});
