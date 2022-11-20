interface AbilityDmgType {
  initialDmg: number;
  dmgPerSkillLvl: number;
  apModifier: number;
  ap: number;
  adModifier: number;
  ad: number;
  count: number;
  onHit: number;
  skillLvl: number;
  champLvl: number;
  dmgPerChampLvl: number;
}

const abilityDmg = ({
  initialDmg = 0,
  apModifier = 0,
  ap = 0,
  adModifier = 0,
  ad,
  count,
  onHit = 0,
  dmgPerSkillLvl = 0,
  skillLvl = 0,
  dmgPerChampLvl = 0,
  champLvl = 0,
}: AbilityDmgType) => {
  const dmg = skillLvl
    ? (initialDmg +
        dmgPerSkillLvl * (skillLvl - 1) +
        apModifier * ap +
        adModifier * ad +
        ad +
        onHit +
        dmgPerChampLvl * (champLvl - 1)) *
      count
    : 0;
  return dmg;
};

export default abilityDmg;
