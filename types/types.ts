export interface ChampNameType {
  [key: string]: ChampStatsType;
}

export interface ChampStatsType {
  name: string;
  key: string;
  title: string;
  image: string;
  stats: { [key: string]: number };
  spells: Record<string, SpellsType>;
}

export interface SpellsType {
  basic?: Basic;
  basicAttack?: BasicAttack;
}

export interface Basic {
  dmgType: string;
  initialDmg: number;
  dmgPerSkillLvl: number;
  apModifier: number;
}

export interface BasicAttack {
  dmgType: string;
  initialDmg: number;
  dmgPerChampLvl: number;
}

export interface SpellsUserChoice {
  name: string;
  section: string;
  count: number;
}
