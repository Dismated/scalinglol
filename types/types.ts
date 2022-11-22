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
  available: boolean;
}

export type SpellsType = Record<string, SpellStats>;

export interface SpellStats {
  dmgType: string;
  initialDmg?: number;
  dmgPerSkillLvl?: number;
  dmgPerChampLvl?: number;
  apModifier?: number;
  adModifier?: number;
}

export interface SpellProps {
  name: string;
  section: "basic" | "basicAttack";
  count: number;
}
