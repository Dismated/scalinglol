interface AbilityDmgType {
  dmgType: "magic" | "physical" | "true";
  initialDmg: number;
  dmgPerSkillLvl: number;
  apModifier: number;
  ap: number;
  adModifier: number;
  ad: number;
  counts: boolean;
  basicAttack: number;
  onHit: number;
  skillLvl: number;
  champLvl: number;
  dmgPerChampLvl: number;
}

const abilityDmg = ({
  dmgType,
  initialDmg,
  apModifier,
  ap,
  adModifier,
  ad,
  counts,
  onHit,
  dmgPerSkillLvl,
  skillLvl,
  dmgPerChampLvl,
  champLvl,
}: AbilityDmgType) => {
  const dmg =
    (initialDmg +
      dmgPerSkillLvl * (skillLvl - 1) +
      apModifier * ap +
      adModifier * ad +
      ad +
      onHit +
      dmgPerChampLvl * (champLvl - 1)) *
    counts;
  return { dmgType, dmg };
};

export default abilityDmg;
