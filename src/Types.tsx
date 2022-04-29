export enum ItemSlot {
  Head = "Head",
  Neck = "Neck",
  Shoulders = "Shoulders",
  Back = "Back",
  Chest = "Chest",
  Wrist = "Wrist",
  Hands = "Hands",
  Waist = "Waist",
  Legs = "Legs",
  Feet = "Feet",
  Finger = "Finger",
  Trinket = "Trinket",
  Weapon = "Weapon",
  OffHand = "OffHand",
  Wand = "Wand",
}

export enum ItemSlotDetailed {
  Head = "Head",
  Neck = "Neck",
  Shoulders = "Shoulders",
  Back = "Back",
  Chest = "Chest",
  Wrist = "Wrist",
  Hands = "Hands",
  Waist = "Waist",
  Legs = "Legs",
  Feet = "Feet",
  Finger1 = "Finger1",
  Finger2 = "Finger2",
  Trinket1 = "Trinket1",
  Trinket2 = "Trinket2",
  Weapon = "Weapon",
  OffHand = "OffHand",
  Wand = "Wand",
}

export interface Item {
  Name: string;
  Id: ItemId;
  ItemSlot: ItemSlot;
  Quality: Quality;
  Stats: StatsCollection;
  IconName: string;
  Sockets?: SocketColor[];
  SocketBonus?: StatsCollection;
  Set?: ItemSet;
  DisplayId?: ItemId;
  Unique?: boolean;
  Source: ItemSource;
  Phase: Phase;
  IsTwoHand?: boolean;
}

export interface Enchant {
  Name: string;
  ItemSlot: ItemSlot;
  Quality: Quality;
  Stats: StatsCollection;
  Id: EnchantId;
  Source: ItemSource;
  Phase: Phase;
}

export interface Aura {
  Name: string;
  Group?: AuraGroup;
  Id: AuraId;
  IconName: string;
  Stats?: StatsCollection;
  Drums?: boolean;
  WeaponOil?: boolean;
  FoodBuff?: boolean;
  ForPet?: boolean;
  DemonicRune?: boolean;
  GuardianElixir?: boolean;
  BattleElixir?: boolean;
  Potion?: boolean;
  Alcohol?: boolean;
  AgilityAndStrength?: boolean;
  AttackPower?: boolean;
  AttackPowerPercent?: boolean;
  DamagePercent?: boolean;
  HastePercent?: boolean;
  Health?: boolean;
  Intellect?: boolean;
  Mp5?: boolean;
  Crit?: boolean;
  MeleeCrit?: boolean;
  MeleeHaste?: boolean;
  Replenishment?: boolean;
  SpellCrit?: boolean;
  SpellHaste?: boolean;
  SpellPower?: boolean;
  Spirit?: boolean;
  StatPercent?: boolean;
  ArmorMajor?: boolean;
  ArmorMinor?: boolean;
  AttackPowerReduction?: boolean;
  ManaRestore?: boolean;
  PhysicalVulnerability?: boolean;
  SpellCritDebuff?: boolean;
  SpellDamagePercent?: boolean;
  SpellHit?: boolean;
}

export enum Pet {
  Imp = "Imp",
  Succubus = "Succubus",
  Felhunter = "Felhunter",
  Felguard = "Felguard",
}

export interface Spell {
  Group?: RotationGroup;
  Name: string;
  IconName: string;
  Id: SpellId;
}

export enum RotationGroup {
  Dots = "Dots",
  Filler = "Filler",
  Aoe = "Aoe",
  Curse = "Curse",
  Finishers = "Finishers",
  Other = "Other",
}

export interface IRotationGroup {
  Header: RotationGroup;
}

export const RotationGroups: IRotationGroup[] = [
  { Header: RotationGroup.Dots },
  { Header: RotationGroup.Filler },
  { Header: RotationGroup.Aoe },
  { Header: RotationGroup.Curse },
  { Header: RotationGroup.Finishers },
  { Header: RotationGroup.Other },
];

export interface IAuraGroup {
  Heading: AuraGroup;
  Type: "spell" | "item";
}

export enum AuraGroup {
  Buffs = "Buffs",
  Debuffs = "Debuffs",
  Consumables = "Consumables",
  PetBuffs = "Pet Buffs (your pet also inherits group-wide auras selected above)",
}

export enum Race {
  Gnome = "Gnome",
  Human = "Human",
  Orc = "Orc",
  Undead = "Undead",
  BloodElf = "BloodElf",
}

export enum Stat {
  Health = "Health",
  HealthModifier = "HealthModifier",
  Mana = "Mana",
  ManaModifier = "ManaModifier",
  Stamina = "Stamina",
  Intellect = "Intellect",
  Spirit = "Spirit",
  SpellPower = "SpellPower",
  ShadowPower = "ShadowPower",
  FirePower = "FirePower",
  CritRating = "CritRating",
  CritChance = "CritChance",
  HitRating = "HitRating",
  HitChance = "HitChance",
  HasteRating = "HasteRating",
  ShadowModifier = "ShadowModifier",
  FireModifier = "FireModifier",
  Mp5 = "Mp5",
  EnemyArmor = "EnemyArmor",
  ArcaneResist = "ArcaneResist",
  IntellectModifier = "IntellectModifier",
  SpiritModifier = "SpiritModifier",
  PetDamageModifier = "PetDamageModifier",
  ShadowResist = "ShadowResist",
  FireResist = "FireResist",
  FrostResist = "FrostResist",
  NatureResist = "NatureResist",
  StaminaModifier = "StaminaModifier",
  ArcaneModifier = "ArcaneModifier",
  FrostModifier = "FrostModifier",
  NatureModifier = "NatureModifier",
  FrostPower = "FrostPower",
  SpellPenetration = "SpellPenetration",
}

export interface CombatLogBreakdownData {
  Name: string;
  Casts: number;
  Crits: number;
  Misses: number;
  Count: number;
  Uptime: number;
  Dodges: number;
  GlancingBlows: number;
  Damage: number;
  ManaGain: number;
}

export type StatsCollection = {
  [key in Stat]?: number;
};

export type PlayerStats = {
  Base: StatsCollection;
  Auras: StatsCollection;
  Items: StatsCollection;
  Gems: StatsCollection;
  Enchants: StatsCollection;
  Talents: StatsCollection;
};

// TODO change to PascalCase
export enum Setting {
  race = "race",
  iterations = "iterations",
  minFightLength = "minFightLength",
  maxFightLength = "maxFightLength",
  targetLevel = "targetLevel",
  petChoice = "petChoice",
  petMode = "petMode",
  enemyArmor = "enemyArmor",
  targetShadowResistance = "targetShadowResistance",
  targetFireResistance = "targetFireResistance",
  improvedExposeArmor = "improvedExposeArmor",
  improvedFaerieFire = "improvedFaerieFire",
  survivalHunterAgility = "survivalHunterAgility",
  exposeWeaknessUptime = "exposeWeaknessUptime",
  lashOfPainUsage = "lashOfPainUsage",
  automaticallyOpenSimDetails = "automaticallyOpenSimDetails",
  customIsbUptime = "customIsbUptime",
  customIsbUptimeValue = "customIsbUptimeValue",
  randomizeValues = "randomizeValues",
  infinitePlayerMana = "infinitePlayerMana",
  infinitePetMana = "infinitePetMana",
  prepopBlackBook = "prepopBlackBook",
  rotationOption = "rotationOption",
  fightType = "fightType",
  enemyAmount = "enemyAmount",
  powerInfusionAmount = "powerInfusionAmount",
  innervateAmount = "innervateAmount",
  ferociousInspirationAmount = "ferociousInspirationAmount",
  improvedImpSetting = "improvedImpSetting",
  maxWebWorkers = "maxWebWorkers",
}

export type Settings = {
  [key in Setting]: string;
};

export const InitialSettings: { [key in Setting]: string } = {
  [Setting.race]: Race.Gnome,
  [Setting.iterations]: "30000",
  [Setting.minFightLength]: "150",
  [Setting.maxFightLength]: "210",
  [Setting.targetLevel]: "83",
  [Setting.petChoice]: "2",
  [Setting.petMode]: "1",
  [Setting.enemyArmor]: "7700",
  [Setting.targetShadowResistance]: "0",
  [Setting.targetFireResistance]: "0",
  [Setting.improvedExposeArmor]: "0",
  [Setting.improvedFaerieFire]: "no",
  [Setting.survivalHunterAgility]: "1000",
  [Setting.exposeWeaknessUptime]: "90",
  [Setting.lashOfPainUsage]: "noISB",
  [Setting.automaticallyOpenSimDetails]: "no",
  [Setting.customIsbUptime]: "yes",
  [Setting.customIsbUptimeValue]: "70",
  [Setting.randomizeValues]: "no",
  [Setting.infinitePlayerMana]: "no",
  [Setting.infinitePetMana]: "no",
  [Setting.prepopBlackBook]: "no",
  [Setting.rotationOption]: "simChooses",
  [Setting.fightType]: "singleTarget",
  [Setting.enemyAmount]: "6",
  [Setting.powerInfusionAmount]: "1",
  [Setting.innervateAmount]: "1",
  [Setting.ferociousInspirationAmount]: "1",
  [Setting.improvedImpSetting]: "0",
  [Setting.maxWebWorkers]: "0",
};

export type TalentStore = {
  [key in TalentName]: number;
};

export type ItemSlotDetailedStruct = {
  [key in ItemSlotDetailed]: number;
};

export type SelectedGemsStruct = {
  [key in ItemSlot]: {
    [key: string]: number[];
  };
};

// TODO
export enum ItemSet {
  T6 = "670",
  T7 = "-32",
}

export const InitialSelectedItemsAndEnchants: ItemSlotDetailedStruct = {
  [ItemSlotDetailed.Head]: 0,
  [ItemSlotDetailed.Neck]: 0,
  [ItemSlotDetailed.Shoulders]: 0,
  [ItemSlotDetailed.Back]: 0,
  [ItemSlotDetailed.Chest]: 0,
  [ItemSlotDetailed.Wrist]: 0,
  [ItemSlotDetailed.Hands]: 0,
  [ItemSlotDetailed.Waist]: 0,
  [ItemSlotDetailed.Legs]: 0,
  [ItemSlotDetailed.Feet]: 0,
  [ItemSlotDetailed.Finger1]: 0,
  [ItemSlotDetailed.Finger2]: 0,
  [ItemSlotDetailed.Trinket1]: 0,
  [ItemSlotDetailed.Trinket2]: 0,
  [ItemSlotDetailed.Weapon]: 0,
  [ItemSlotDetailed.OffHand]: 0,
  [ItemSlotDetailed.Wand]: 0,
};

export const InitialPlayerStats: StatsCollection = {
  [Stat.Health]: 0,
  [Stat.HealthModifier]: 1,
  [Stat.Mana]: 0,
  [Stat.ManaModifier]: 1,
  [Stat.Stamina]: 0,
  [Stat.Intellect]: 0,
  [Stat.Spirit]: 0,
  [Stat.SpellPower]: 0,
  [Stat.ShadowPower]: 0,
  [Stat.FirePower]: 0,
  [Stat.CritRating]: 0,
  [Stat.CritChance]: 0,
  [Stat.HitRating]: 0,
  [Stat.HitChance]: 0,
  [Stat.HasteRating]: 0,
  [Stat.ShadowModifier]: 1,
  [Stat.FireModifier]: 1,
  [Stat.Mp5]: 0,
  [Stat.EnemyArmor]: 0,
  [Stat.ArcaneResist]: 0,
  [Stat.StaminaModifier]: 1,
  [Stat.IntellectModifier]: 1,
  [Stat.SpiritModifier]: 1,
  [Stat.PetDamageModifier]: 1,
  [Stat.ArcaneModifier]: 1,
  [Stat.FrostModifier]: 1,
  [Stat.NatureModifier]: 1,
  [Stat.ShadowResist]: 0,
  [Stat.FireResist]: 0,
  [Stat.FrostResist]: 0,
  [Stat.NatureResist]: 0,
  [Stat.FrostPower]: 0,
  [Stat.SpellPenetration]: 0,
};

export const InitialSelectedGems: SelectedGemsStruct = {
  [ItemSlot.Head]: {},
  [ItemSlot.Neck]: {},
  [ItemSlot.Shoulders]: {},
  [ItemSlot.Back]: {},
  [ItemSlot.Chest]: {},
  [ItemSlot.Wrist]: {},
  [ItemSlot.Hands]: {},
  [ItemSlot.Waist]: {},
  [ItemSlot.Legs]: {},
  [ItemSlot.Feet]: {},
  [ItemSlot.Finger]: {},
  [ItemSlot.Trinket]: {},
  [ItemSlot.Weapon]: {},
  [ItemSlot.OffHand]: {},
  [ItemSlot.Wand]: {},
};

export const InitialRotation: RotationStruct = {
  [RotationGroup.Curse]: [],
  [RotationGroup.Dots]: [],
  [RotationGroup.Filler]: [],
  [RotationGroup.Aoe]: [],
  [RotationGroup.Finishers]: [],
  [RotationGroup.Other]: [],
};

export type RotationStruct = {
  [key in RotationGroup]: number[];
};

export interface Profile {
  Auras: AuraId[];
  Gems: SelectedGemsStruct;
  Items: ItemSlotDetailedStruct;
  Talents: TalentStore;
  Rotation: RotationStruct;
  Enchants: ItemSlotDetailedStruct;
  Settings: Settings;
}

export type ProfileContainer = {
  Name: string;
  Profile: Profile;
};

export interface PlayerState {
  Talents: TalentStore;
  TalentPointsRemaining: number;
  SelectedItems: ItemSlotDetailedStruct;
  SelectedEnchants: ItemSlotDetailedStruct;
  SelectedGems: SelectedGemsStruct;
  Auras: AuraId[];
  Rotation: RotationStruct;
  Stats: PlayerStats;
  Settings: Settings;
  Profiles: ProfileContainer[];
  Sets: SetsStruct;
}

export enum MouseButtonClick {
  LeftClick = 0,
  RightClick = 2,
}

export type SetsStruct = {
  [key in ItemSet]: number;
};

export const InitialSetCounts: SetsStruct = {
  [ItemSet.T6]: 0,
  [ItemSet.T7]: 0,
};

export enum Quality {
  Legendary = "Legendary",
  Heirloom = "Heirloom",
  Epic = "Epic",
  Rare = "Rare",
  Uncommon = "Uncommon",
  Common = "Common",
}

export type SourcesStruct = Phase[];

export type SavedItemDps = {
  [key in ItemSlotDetailed]: {
    [key: number]: number;
  };
};

export interface UiState {
  Sources: SourcesStruct;
  GemSelectionTable: GemSelectionTableStruct;
  GemPreferences: { hidden: number[]; favorites: number[] };
  SelectedProfile: string;
  ImportExportWindowVisible: boolean;
  EquippedItemsWindowVisible: boolean;
  FillItemSocketsWindowVisible: boolean;
  HiddenItems: number[];
  SelectedItemSlot: ItemSlot;
  SelectedItemSubSlot: SubSlotValue;
  SavedItemDps: SavedItemDps;
  CombatLog: { Visible: boolean; Data: string[] };
  CombatLogBreakdown: CombatLogBreakdown;
  Histogram: { Visible: boolean; Data?: { [key: string]: number } };
  SimulationInProgress: boolean;
  StatWeights: {
    Visible: boolean;
    StatValues: { [key in Stat]?: number };
  };
}

export interface StatWeightStats {
  [Stat.Stamina]: number;
  [Stat.Intellect]: number;
  [Stat.Spirit]: number;
  [Stat.SpellPower]: number;
  [Stat.ShadowPower]: number;
  [Stat.FirePower]: number;
  [Stat.HitRating]: number;
  [Stat.CritRating]: number;
  [Stat.HasteRating]: number;
  [Stat.Mp5]: number;
}

export type CombatLogBreakdown = {
  TotalDamageDone: number;
  TotalManaGained: number;
  TotalSimulationFightLength: number;
  TotalIterationAmount: number;
  SpellDamageDict: { [key: string]: number };
  SpellManaGainDict: { [key: string]: number };
  Data: CombatLogBreakdownData[];
};

export interface WorkerParams {
  PlayerSettings: {
    Auras: AuraId[];
    Items: ItemSlotDetailedStruct;
    Enchants: ItemSlotDetailedStruct;
    Gems: SelectedGemsStruct;
    Talents: TalentStore;
    Rotation: RotationStruct;
    Stats: StatsCollection;
    Sets: SetsStruct;
    Settings: Settings;
    MetaGemId: number;
  };
  SimulationSettings: {
    Iterations: number;
    MinTime: number;
    MaxTime: number;
  };
  RandomSeed: number;
  ItemId: number;
  SimulationType: SimulationType;
  ItemSubSlot: SubSlotValue;
  CustomStat: string;
  EquippedItemSimulation: boolean;
}

export enum SimulationType {
  Normal,
  AllItems,
  StatWeights,
}

export interface GemSelectionTableStruct {
  Visible: boolean;
  SocketNumber: number;
  ItemSlot: ItemSlot;
  ItemId: string;
  SocketColor: SocketColor;
  ItemSubSlot?: string;
}

export enum SocketColor {
  Meta = "Meta",
  Red = "Red",
  Yellow = "Yellow",
  Blue = "Blue",
}

export const InitialGemSelectionTableValue = {
  Visible: false,
  SocketNumber: 0,
  ItemSlot: ItemSlot.Weapon,
  ItemId: "0",
  SocketColor: SocketColor.Meta,
};

export enum GemColor {
  Meta = "Meta",
  Red = "Red",
  Yellow = "Yellow",
  Blue = "Blue",
  Orange = "Orange",
  Green = "Green",
  Purple = "Purple",
  Void = "Void",
}

export const Languages: { Iso: string; Name: string; WowheadPrefix: string }[] =
  [
    { Iso: "en", Name: "English", WowheadPrefix: "" },
    { Iso: "zh", Name: "中文", WowheadPrefix: "cn." },
  ];

export interface Gem {
  Name: string;
  Id: number;
  Color: GemColor;
  IconName: string;
  Phase: Phase;
  Stats?: StatsCollection;
}

export interface Talent {
  Name?: TalentName;
  RankIds?: number[];
  IconName?: string;
  Requirement?: TalentRequirement;
}

export interface TalentRequirement {
  Name: TalentName;
  Points: number;
}

export enum TalentTree {
  Affliction = "Affliction",
  Demonology = "Demonology",
  Destruction = "Destruction",
}

export enum ItemSource {
  Naxxramas25Normal = "Naxxramas 25m",
  Naxxramas10Normal = "Naxxramas 10m",
  KirinTorRevered = "Kirin Tor - Revered",
  Sunwell = "Sunwell Plateau",
  BlackTemple = "Black Temple",
}

export type Phase = 0 | 1 | 2 | 3 | 4 | 5;

export type SubSlotValue = "" | "1" | "2";

export enum TalentName {
  ImprovedCurseOfAgony = "Improved Curse of Agony",
  Suppression = "Suppression",
  ImprovedCorruption = "Improved Corruption",
  ImprovedCurseOfWeakness = "Improved Curse of Weakness",
  ImprovedDrainSoul = "Improved Drain Soul",
  ImprovedLifeTap = "Improved Life Tap",
  SoulSiphon = "Soul Siphon",
  ImprovedFear = "Improved Fear",
  FelConcentration = "Fel Concentration",
  AmplifyCurse = "Amplify Curse",
  GrimReach = "Grim Reach",
  Nightfall = "Nightfall",
  EmpoweredCorruption = "Empowered Corruption",
  ShadowEmbrance = "Shadow Embrace",
  SiphonLife = "Siphon Life",
  CurseOfExhaustion = "Curse of Exhaustion",
  ImprovedFelhunter = "Improved Felhunter",
  ShadowMastery = "Shadow Mastery",
  Eradication = "Eradication",
  Contagion = "Contagion",
  DarkPact = "Dark Pact",
  ImprovedHowlOfTerror = "Improved Howl of Terror",
  Malediction = "Malediction",
  DeathsEmbrace = `Death's Embrace`,
  UnstableAffliction = "Unstable Affliction",
  Pandemic = "Pandemic",
  EverlastingAffliction = "Everlasting Affliction",
  Haunt = "Haunt",
  ImprovedHealthstone = "Improved Healthstone",
  ImprovedImp = "Improved Imp",
  DemonicEmbrace = "Demonic Embrace",
  FelSynergy = "Fel Synergy",
  ImprovedHealthFunnel = "Improved Health Funnel",
  DemonicBrutality = "Demonic Brutality",
  FelVitality = "Fel Vitality",
  ImprovedSuccubus = "Improved Succubus",
  SoulLink = "Soul Link",
  FelDomination = "Fel Domination",
  DemonicAegis = "Demonic Aegis",
  UnholyPower = "Unholy Power",
  MasterSummoner = "Master Summoner",
  ManaFeed = "Mana Feed",
  MasterConjuror = "Master Conjuror",
  MasterDemonologist = "Master Demonologist",
  MoltenCore = "Molten Core",
  DemonicResilience = "Demonic Resilience",
  DemonicEmpowerment = "Demonic Empowerment",
  DemonicKnowledge = "Demonic Knowledge",
  DemonicTactics = "Demonic Tactics",
  Decimation = "Decimation",
  ImprovedDemonicTactics = "Improved Demonic Tactics",
  SummonFelguard = "Summon Felguard",
  Nemesis = "Nemesis",
  DemonicPact = "Demonic Pact",
  Metamorphosis = "Metamorphosis",
  ImprovedShadowBolt = "Improved Shadow Bolt",
  Bane = "Bane",
  Aftermath = "Aftermath",
  MoltenSkin = "Molten Skin",
  Cataclysm = "Cataclysm",
  DemonicPower = "Demonic Power",
  Shadowburn = "Shadowburn",
  Ruin = "Ruin",
  Intensity = "Intensity",
  DestructiveReach = "Destructive Reach",
  ImprovedSearingPain = "Improved Searing Pain",
  Backlash = "Backlash",
  ImprovedImmolate = "Improved Immolate",
  Devastation = "Devastation",
  NetherProtection = "Nether Protection",
  Emberstorm = "Emberstorm",
  Conflagrate = "Conflagrate",
  SoulLeech = "Soul Leech",
  Pyroclasm = "Pyroclasm",
  ShadowAndFlame = "Shadow and Flame",
  ImprovedSoulLeech = "Improved Soul Leech",
  Backdraft = "Backdraft",
  Shadowfury = "Shadowfury",
  EmpoweredImp = "Empowered Imp",
  FireAndBrimstone = "Fire and Brimstone",
  ChaosBolt = "Chaos Bolt",
}

export const StatConstant = {
  HealthPerStamina: 10,
  ManaPerIntellect: 15,
  HitRatingPerPercent: 12.62,
  CritRatingPerPercent: 22.08,
  HasteRatingPerPercent: 15.77,
  CritPercentPerIntellect: 1 / 166.6,
  BaseCritChancePercent: 1.70458,
  HitPercentCap: 16,
};

export enum SpellId {
  ShadowBolt = 47809,
  Corruption = 47813,
  CurseOfAgony = 47864,
  CurseOfDoom = 47867,
  CurseOfTheElements = 47865,
  DeathCoil = 47860,
  DrainSoul = 47855,
  LifeTap = 57946,
  SeedOfCorruption = 47836,
  Hellfire = 47823,
  Immolate = 47811,
  Incinerate = 47838,
  RainOfFire = 47820,
  SearingPain = 47815,
  Shadowflame = 61290,
  SoulFire = 47825,
  SiphonLife = 63108,
  AmplifyCurse = 18288,
  UnstableAffliction = 30108,
  Haunt = 48181,
  SoulLink = 19028,
  Shadowburn = 17877,
  Conflagrate = 17962,
  Shadowfury = 30283,
  ChaosBolt = 50796,
  DarkPact = 59092,
  CurseOfRecklessness = 16231,
}

export enum AuraId {
  ScrollOfStamina = 33081,
  ScrollOfIntellect = 33078,
  UnleashedRage = 30811,
  LeaderOfThePack = 17007,
  TrueshotAura = 31519,
  BattleShout = 2048,
  StrengthOfEarthTotem = 25528,
  HeroicPresence = 6562,
  KiblersBits = 43771,
  DemonicRune = 12662,
  InspiringPresence = 28878,
  TotemOfWrath = 30706,
  FelArmor = 47893,
  BlessingOfKings = 25898,
  BlessingOfWisdom = 27143,
  ManaSpringTotem = 25570,
  WrathOfAirTotem = 3738,
  MarkOfTheWild = 26990,
  ArcaneBrilliance = 27127,
  PrayerOfFortitude = 25392,
  PrayerOfSpirit = 32999,
  BloodPact = 27268,
  ScrollOfAgility = 33077,
  ScrollOfSpirit = 33080,
  MoonkinAura = 24907,
  ScrollOfStrength = 33082,
  PowerInfusion = 10060,
  Bloodlust = 2825,
  Innervate = 29166,
  ManaTideTotem = 16190,
  FerociousInspiration = 34460,
  SanctifiedRetribution = 31869,
  ArcaneEmpowerment = 31583,
  ImprovedMoonkinForm = 48396,
  SwiftRetribution = 53648,
  FelIntelligence = 57567,
  HuntingParty = 53292,
  EnduringWinter = 44561,
  JudgementsOfTheWise = 31878,
  VampiricTouch = 48160,
  ImprovedSoulLeech = 54118,
  FlameCap = 22788,
  BlessingOfMight = 27141,
  ElementalOath = 51470,
  DemonicPact = 47240,
  FlametongueTotem = 58656,
  BlessingOfSanctuary = 20911,
  CurseOfTheElements = 27228,
  ShadowWeaving = 15334,
  ImprovedScorch = 12873,
  Misery = 33195,
  JudgementOfWisdom = 20354,
  ImprovedSealOfTheCrusader = 20337,
  FaerieFire = 26993,
  SunderArmor = 25225,
  ExposeArmor = 26866,
  CurseOfRecklessness = 27226,
  BloodFrenzy = 29859,
  ExposeWeakness = 34503,
  Annihilator = 16928,
  ImprovedHuntersMark = 19425,
  FlaskOfTheNorth = 47499,
  FlaskOfTheFrostWyrm = 46376,
  PotionOfSpeed = 40211,
  PotionOfWildMagic = 40212,
  GrandSpellstone = 41196,
}

export enum GemId {
  ChaoticSkyflareDiamond = 41285,
  RunedCardinalRuby = 40113,
  RigidKingsAmber = 40125,
  QuickKingsAmber = 40128,
  PurifiedDreadstone = 40133,
  ShiningEyeOfZul = 40172,
  VeiledAmetrine = 40153,
  RecklessAmetrine = 40155,
}

export enum ItemId {
  ValorousPlagueheartCirclet = 40421,
}

export enum EnchantId {
  ArcanumOfBurningMysteries = 59970,
}