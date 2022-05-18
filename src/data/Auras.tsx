import { Aura, AuraGroup, AuraId, Stat } from '../Types'

export const Auras: Aura[] = [
  // Buffs
  {
    Name: 'Fel Armor',
    Group: AuraGroup.Buffs,
    IconName: 'spell_shadow_felarmour',
    Id: AuraId.FelArmor,
    Stats: { [Stat.SpellPower]: 100 },
  },
  {
    Name: 'Blessing of Kings',
    Group: AuraGroup.Buffs,
    IconName: 'spell_magic_greaterblessingofkings',
    Id: AuraId.BlessingOfKings,
    Stats: {
      [Stat.StaminaModifier]: 1.1,
      [Stat.IntellectModifier]: 1.1,
      [Stat.SpiritModifier]: 1.1,
    },
    StatPercent: true,
  },
  {
    Name: 'Blessing of Sanctuary',
    Group: AuraGroup.Buffs,
    IconName: 'spell_holy_greaterblessingofsanctuary',
    Id: AuraId.BlessingOfSanctuary,
    StatPercent: true,
  },
  {
    Name: 'Blessing of Wisdom',
    Group: AuraGroup.Buffs,
    IconName: 'spell_holy_greaterblessingofwisdom',
    Id: AuraId.BlessingOfWisdom,
    Stats: { [Stat.Mp5]: 41 },
    Mp5: true,
  },
  {
    Name: 'Mana Spring Totem',
    Group: AuraGroup.Buffs,
    IconName: 'spell_nature_manaregentotem',
    Id: AuraId.ManaSpringTotem,
    Stats: { [Stat.Mp5]: 50 },
    Mp5: true,
  },
  {
    Name: 'Wrath of Air Totem',
    Group: AuraGroup.Buffs,
    IconName: 'spell_nature_slowingtotem',
    Id: AuraId.WrathOfAirTotem,
    Stats: { [Stat.SpellPower]: 101 },
    SpellHaste: true,
  },
  {
    Name: 'Totem of Wrath',
    Group: AuraGroup.Buffs,
    IconName: 'spell_fire_totemofwrath',
    Id: AuraId.TotemOfWrath,
    SpellPower: true,
    Crit: true,
  },
  {
    Name: 'Demonic Pact',
    Group: AuraGroup.Buffs,
    IconName: 'spell_shadow_demonicpact',
    Id: AuraId.DemonicPact,
    SpellPower: true,
  },
  {
    Name: 'Flametongue Totem',
    Group: AuraGroup.Buffs,
    IconName: 'spell_nature_guardianward',
    Id: AuraId.FlametongueTotem,
    SpellPower: true,
  },
  {
    Name: 'Mark of the Wild',
    Group: AuraGroup.Buffs,
    IconName: 'spell_nature_regeneration',
    Id: AuraId.MarkOfTheWild,
    Stats: {
      [Stat.Stamina]: 14,
      [Stat.Intellect]: 14,
      [Stat.Spirit]: 14,
      [Stat.ArcaneResist]: 25,
      [Stat.ShadowResist]: 25,
      [Stat.FrostResist]: 25,
      [Stat.FireResist]: 25,
      [Stat.NatureResist]: 25,
    },
  },
  {
    Name: 'Arcane Brilliance',
    Group: AuraGroup.Buffs,
    IconName: 'spell_holy_arcaneintellect',
    Id: AuraId.ArcaneBrilliance,
    Stats: { [Stat.Intellect]: 40 },
  },
  {
    Name: 'Prayer of Fortitude',
    Group: AuraGroup.Buffs,
    IconName: 'spell_holy_prayeroffortitude',
    Id: AuraId.PrayerOfFortitude,
    Stats: { [Stat.Stamina]: 79 },
  },
  {
    Name: 'Prayer of Spirit',
    Group: AuraGroup.Buffs,
    IconName: 'spell_holy_prayerofspirit',
    Id: AuraId.PrayerOfSpirit,
    Stats: { [Stat.Spirit]: 50 },
  },
  {
    Name: 'Blood Pact',
    Group: AuraGroup.Buffs,
    IconName: 'spell_shadow_bloodboil',
    Id: AuraId.BloodPact,
    Stats: { [Stat.Stamina]: 70 },
  },
  {
    Name: 'Inspiring Presence',
    Group: AuraGroup.Buffs,
    IconName: 'inv_staff_23',
    Id: AuraId.InspiringPresence,
  },
  {
    Name: 'Moonkin Aura',
    Group: AuraGroup.Buffs,
    IconName: 'spell_nature_moonglow',
    Id: AuraId.MoonkinAura,
    SpellCrit: true,
  },
  {
    Name: 'Elemental Oath',
    Group: AuraGroup.Buffs,
    IconName: 'spell_shaman_elementaloath',
    Id: AuraId.ElementalOath,
    SpellCrit: true,
  },
  {
    Name: 'Power Infusion',
    Group: AuraGroup.Buffs,
    IconName: 'spell_holy_powerinfusion',
    Id: AuraId.PowerInfusion,
  },
  {
    Name: 'Bloodlust',
    Group: AuraGroup.Buffs,
    IconName: 'spell_nature_bloodlust',
    Id: AuraId.Bloodlust,
  },
  {
    Name: 'Ferocious Inspiration',
    Group: AuraGroup.Buffs,
    IconName: 'ability_hunter_ferociousinspiration',
    Id: AuraId.FerociousInspiration,
  },
  {
    Name: 'Innervate',
    Group: AuraGroup.Buffs,
    IconName: 'spell_nature_lightning',
    Id: AuraId.Innervate,
  },
  {
    Name: 'Mana Tide Totem',
    Group: AuraGroup.Buffs,
    IconName: 'spell_frost_summonwaterelemental',
    Id: AuraId.ManaTideTotem,
  },
  {
    Name: 'Sanctified Retribution',
    Group: AuraGroup.Buffs,
    IconName: 'spell_holy_mindvision',
    Id: AuraId.SanctifiedRetribution,
  },
  {
    Name: 'Arcane Empowerment',
    Group: AuraGroup.Buffs,
    IconName: 'spell_nature_starfall',
    Id: AuraId.ArcaneEmpowerment,
  },
  {
    Name: 'Improved Moonkin Form',
    Group: AuraGroup.Buffs,
    IconName: 'ability_druid_improvedmoonkinform',
    Id: AuraId.ImprovedMoonkinForm,
    HastePercent: true,
  },
  {
    Name: 'Swift Retribution',
    Group: AuraGroup.Buffs,
    IconName: 'ability_paladin_swiftretribution',
    Id: AuraId.SwiftRetribution,
    HastePercent: true,
  },
  {
    Name: 'Fel Intelligence',
    Group: AuraGroup.Buffs,
    IconName: 'spell_shadow_brainwash',
    Id: AuraId.FelIntelligence,
    Intellect: true,
    Spirit: true,
  },
  {
    Name: 'Hunting Party',
    Group: AuraGroup.Buffs,
    IconName: 'ability_hunter_huntingparty',
    Id: AuraId.HuntingParty,
    Replenishment: true,
  },
  {
    Name: 'Enduring Winter',
    Group: AuraGroup.Buffs,
    IconName: 'spell_frost_summonwaterelemental_2',
    Id: AuraId.EnduringWinter,
    Replenishment: true,
  },
  {
    Name: 'Judgements of the Wise',
    Group: AuraGroup.Buffs,
    IconName: 'ability_paladin_judgementofthewise',
    Id: AuraId.JudgementsOfTheWise,
    Replenishment: true,
  },
  {
    Name: 'Improved Soul Leech',
    Group: AuraGroup.Buffs,
    IconName: 'ability_warlock_improvedsoulleech',
    Id: AuraId.ImprovedSoulLeech,
    Replenishment: true,
  },

  // Debuffs
  {
    Name: 'Curse of the Elements',
    Group: AuraGroup.Debuffs,
    IconName: 'spell_shadow_chilltouch',
    Id: AuraId.CurseOfTheElements,
    Stats: {
      [Stat.SpellPenetration]: 165,
      [Stat.ShadowModifier]: 1.13,
      [Stat.FireModifier]: 1.13,
    },
    SpellDamagePercent: true,
  },
  {
    Name: 'Shadow Weaving',
    Group: AuraGroup.Debuffs,
    IconName: 'spell_shadow_blackplague',
    Id: AuraId.ShadowWeaving,
    Stats: { [Stat.ShadowModifier]: 1.1 },
  },
  {
    Name: 'Improved Scorch',
    Group: AuraGroup.Debuffs,
    IconName: 'spell_fire_soulburn',
    Id: AuraId.ImprovedScorch,
    Stats: { [Stat.FireModifier]: 1.15 },
    SpellCritDebuff: true,
  },
  {
    Name: 'Misery',
    Group: AuraGroup.Debuffs,
    IconName: 'spell_shadow_misery',
    Id: AuraId.Misery,
    Stats: {
      [Stat.HitChance]: 3,
    },
    SpellHit: true,
  },
  {
    Name: 'Judgement of Wisdom',
    Group: AuraGroup.Debuffs,
    IconName: 'ability_paladin_judgementblue',
    Id: AuraId.JudgementOfWisdom,
    ManaRestore: true,
  },
  {
    Name: 'Vampiric Touch',
    Group: AuraGroup.Debuffs,
    IconName: 'spell_holy_stoicism',
    Id: AuraId.VampiricTouch,
    Replenishment: true,
  },
  {
    Name: 'Faerie Fire',
    Group: AuraGroup.Debuffs,
    IconName: 'spell_nature_faeriefire',
    ForPet: true,
    Id: AuraId.FaerieFire,
    ArmorMinor: true,
  },
  {
    Name: 'Sunder Armor',
    Group: AuraGroup.Debuffs,
    IconName: 'ability_warrior_sunder',
    ForPet: true,
    Id: AuraId.SunderArmor,
    ArmorMajor: true,
  },
  {
    Name: 'Expose Armor',
    Group: AuraGroup.Debuffs,
    IconName: 'ability_warrior_riposte',
    ForPet: true,
    Id: AuraId.ExposeArmor,
    ArmorMajor: true,
  },
  {
    Name: 'Blood Frenzy',
    Group: AuraGroup.Debuffs,
    IconName: 'ability_warrior_bloodfrenzy',
    ForPet: true,
    Id: AuraId.BloodFrenzy,
    PhysicalVulnerability: true,
  },
  {
    Name: 'Annihilator',
    Group: AuraGroup.Debuffs,
    IconName: 'inv_axe_12',
    ForPet: true,
    Id: AuraId.Annihilator,
  },
  {
    Name: "Improved Hunter's Mark",
    Group: AuraGroup.Debuffs,
    IconName: 'ability_hunter_snipershot',
    ForPet: true,
    Id: AuraId.ImprovedHuntersMark,
  },

  // Consumables
  {
    Name: 'Flask of the North',
    Group: AuraGroup.Consumables,
    Id: AuraId.FlaskOfTheNorth,
    IconName: 'inv_alchemy_endlessflask_05',
    BattleElixir: true,
    GuardianElixir: true,
    Stats: { [Stat.SpellPower]: 47 },
  },
  {
    Name: 'Flask of the Frost Wyrm',
    Group: AuraGroup.Consumables,
    Id: AuraId.FlaskOfTheFrostWyrm,
    IconName: 'inv_alchemy_endlessflask_04',
    BattleElixir: true,
    GuardianElixir: true,
    Stats: { [Stat.SpellPower]: 125 },
  },
  {
    Name: 'Potion of Speed',
    Group: AuraGroup.Consumables,
    Id: AuraId.PotionOfSpeed,
    IconName: 'inv_alchemy_elixir_04',
    Potion: true,
  },
  {
    Name: 'Potion of Wild Magic',
    Group: AuraGroup.Consumables,
    Id: AuraId.PotionOfWildMagic,
    IconName: 'inv_alchemy_elixir_01',
    Potion: true,
  },
  {
    Name: 'Runic Mana Potion',
    Group: AuraGroup.Consumables,
    Id: 33448,
    IconName: 'inv_alchemy_elixir_02',
    Potion: true,
  },
  {
    Name: 'Demonic Rune',
    Group: AuraGroup.Consumables,
    Id: 12662,
    IconName: 'inv_misc_rune_04',
    DemonicRune: true,
  },
  {
    Name: 'Grand Spellstone',
    Group: AuraGroup.Consumables,
    Id: AuraId.GrandSpellstone,
    IconName: 'inv_misc_gem_sapphire_01',
    WeaponOil: true,
  },

  // Pet Buffs
  {
    Name: 'Blessing of Kings',
    Group: AuraGroup.PetBuffs,
    IconName: 'spell_magic_greaterblessingofkings',
    Id: 25898,
    StatPercent: true,
  },
  {
    Name: 'Blessing of Wisdom',
    Group: AuraGroup.PetBuffs,
    IconName: 'spell_holy_greaterblessingofwisdom',
    Id: 27143,
  },
  {
    Name: 'Blessing of Might',
    Group: AuraGroup.PetBuffs,
    IconName: 'spell_holy_greaterblessingofkings',
    Id: AuraId.BlessingOfMight,
    AttackPower: true,
  },
  {
    Name: 'Battle Shout',
    Group: AuraGroup.PetBuffs,
    IconName: 'ability_warrior_battleshout',
    Id: AuraId.BattleShout,
    AttackPower: true,
  },
  {
    Name: 'Arcane Brilliance',
    Group: AuraGroup.PetBuffs,
    IconName: 'spell_holy_arcaneintellect',
    Id: 27127,
    Intellect: true,
  },
  {
    Name: 'Mark of the Wild',
    Group: AuraGroup.PetBuffs,
    IconName: 'spell_nature_regeneration',
    Id: 26990,
  },
  {
    Name: 'Prayer of Fortitude',
    Group: AuraGroup.PetBuffs,
    IconName: 'spell_holy_prayeroffortitude',
    Id: 25392,
  },
  {
    Name: 'Prayer of Spirit',
    Group: AuraGroup.PetBuffs,
    IconName: 'spell_holy_prayerofspirit',
    Id: 32999,
    Spirit: true,
  },
  {
    Name: "Kibler's Bits",
    Group: AuraGroup.PetBuffs,
    IconName: 'inv_misc_food_49',
    Id: AuraId.KiblersBits,
  },
  {
    Name: 'Heroic Presence',
    Group: AuraGroup.PetBuffs,
    IconName: 'inv_helmet_21',
    Id: AuraId.HeroicPresence,
  },
  {
    Name: 'Strength of Earth Totem',
    Group: AuraGroup.PetBuffs,
    IconName: 'spell_nature_earthbindtotem',
    Id: AuraId.StrengthOfEarthTotem,
    AgilityAndStrength: true,
  },
  {
    Name: 'Horn of Winter',
    Group: AuraGroup.PetBuffs,
    IconName: 'inv_misc_horn_02',
    Id: 57330,
    AgilityAndStrength: true,
  },
  {
    Name: 'Leader of the Pack',
    Group: AuraGroup.PetBuffs,
    IconName: 'spell_nature_unyeildingstamina',
    Id: AuraId.LeaderOfThePack,
    MeleeCrit: true,
  },
  {
    Name: 'Rampage',
    Group: AuraGroup.PetBuffs,
    IconName: 'ability_warrior_rampage',
    Id: 29801,
    MeleeCrit: true,
  },
  {
    Name: 'Trueshot Aura',
    Group: AuraGroup.PetBuffs,
    IconName: 'ability_trueshot',
    Id: AuraId.TrueshotAura,
    AttackPowerPercent: true,
  },
  {
    Name: 'Unleashed Rage',
    Group: AuraGroup.PetBuffs,
    IconName: 'spell_nature_unleashedrage',
    Id: AuraId.UnleashedRage,
    AttackPowerPercent: true,
  },
  {
    Name: `Abomination's Might`,
    Group: AuraGroup.PetBuffs,
    IconName: 'ability_warrior_intensifyrage',
    Id: 53138,
    AttackPowerPercent: true,
  },
  {
    Name: 'Improved Icy Talons',
    Group: AuraGroup.PetBuffs,
    IconName: 'spell_deathknight_icytalons',
    Id: 55610,
    MeleeHaste: true,
  },
  {
    Name: 'Scroll of Stamina VIII',
    Group: AuraGroup.PetBuffs,
    IconName: 'inv_scroll_07',
    Id: AuraId.ScrollOfStamina,
  },
  {
    Name: 'Scroll of Intellect VIII',
    Group: AuraGroup.PetBuffs,
    IconName: 'inv_scroll_01',
    Id: AuraId.ScrollOfIntellect,
  },
  {
    Name: 'Scroll of Strength VIII',
    Group: AuraGroup.PetBuffs,
    IconName: 'inv_scroll_02',
    Id: AuraId.ScrollOfStrength,
  },
  {
    Name: 'Scroll of Agility VIII',
    Group: AuraGroup.PetBuffs,
    IconName: 'inv_scroll_02',
    Id: AuraId.ScrollOfAgility,
  },
  {
    Name: 'Scroll of Spirit VIII',
    Group: AuraGroup.PetBuffs,
    IconName: 'inv_scroll_01',
    Id: AuraId.ScrollOfSpirit,
  },

  // Noncategorized
  {
    Name: 'Nightfall',
    IconName: 'spell_shadow_twilight',
    Id: 17941,
  },
  {
    Name: 'Improved Shadow Bolt',
    IconName: 'spell_shadow_shadowbolt',
    Id: 17800,
  },
]
