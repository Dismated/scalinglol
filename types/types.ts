export type ChampionType = {
  [key in ChampName]: Champion;
};

export type ChampName =
  | "Alistar"
  | "Annie"
  | "Twisted Fate"
  | "Soraka"
  | "Teemo"
  | "Jax";

export interface Champion {
  name: ChampName;
  key: string;
  title: string;
  image: string;
  stats: Stats;
  spells: Spells[];
  color: string;
}

interface Stats {
  hp: number;
  hpperlevel: number;
  mp: number;
  mpperlevel: number;
  movespeed: number;
  armor: number;
  armorperlevel: number;
  spellblock: number;
  spellblockperlevel: number;
  attackrange: number;
  hpregen: number;
  hpregenperlevel: number;
  mpregen: number;
  mpregenperlevel: number;
  crit: number;
  critperlevel: number;
  attackdamage: number;
  attackdamageperlevel: number;
  attackspeedperlevel: number;
  attackspeed: number;
  dmgCrit: number;
}

export type Spells = {
  name: SpellName;
  variant: SpellVariant[];
};

export type SpellVariant = { name: string; stats: SpellStats };

export type SpellStats = {
  dmgType: DmgType;
  initialDmg?: number;
  dmgPerSkillLvl?: number;
  dmgPerChampLvl?: number;
  apModifier?: number;
  adModifier?: number;
};

export type DmgType = "magic" | "physical" | "true";
export type SpellName = "Q" | "W" | "E" | "R" | "A" | "P";
export interface SpellProps {
  name: number;
  section: number;
  count: number;
}

export type LvlsType = { [key in SpellName]: number };
