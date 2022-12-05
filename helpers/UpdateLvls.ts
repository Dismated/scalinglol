import { LvlUpableSpellName } from "../types/types";

export const lvlUpR = [6, 11, 16];
export const lvlUpPatterns = [
  [1, 4, 5, 7, 9],
  [2, 8, 10, 12, 13],
  [3, 14, 15, 17, 18],
];

export const emptyLvls: LvlUpableSpellName[] = new Array(18).fill("Q");

const updateLvls = (
  spellName: LvlUpableSpellName,
  spellLvls: number[],
  startingLvls: LvlUpableSpellName[]
): LvlUpableSpellName[] =>
  startingLvls.map((startingLvl, i) => {
    if (spellLvls.find((spellLvl) => i === spellLvl - 1)) return spellName;
    return startingLvl;
  });

export default updateLvls;
