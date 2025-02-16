import { RotationGroup, Spell, SpellId } from '../Types'

export const Spells: Spell[] = [
  // Dots
  {
    Group: RotationGroup.Dots,
    Name: 'Immolate',
    IconName: 'spell_fire_immolation',
    Id: SpellId.Immolate,
  },
  {
    Group: RotationGroup.Dots,
    Name: 'Corruption',
    IconName: 'spell_shadow_abominationexplosion',
    Id: SpellId.Corruption,
  },
  {
    Group: RotationGroup.Dots,
    Name: 'Unstable Affliction',
    IconName: 'spell_shadow_unstableaffliction_3',
    Id: SpellId.UnstableAffliction,
  },

  // Fillers
  {
    Group: RotationGroup.Filler,
    Name: 'Searing Pain',
    IconName: 'spell_fire_soulburn',
    Id: SpellId.SearingPain,
  },
  {
    Group: RotationGroup.Filler,
    Name: 'Shadow Bolt',
    IconName: 'spell_shadow_shadowbolt',
    Id: SpellId.ShadowBolt,
  },
  {
    Group: RotationGroup.Filler,
    Name: 'Incinerate',
    IconName: 'spell_fire_burnout',
    Id: SpellId.Incinerate,
  },

  // Aoe
  {
    Group: RotationGroup.Aoe,
    Name: 'Seed of Corruption',
    IconName: 'spell_shadow_seedofdestruction',
    Id: SpellId.SeedOfCorruption,
  },
  {
    Group: RotationGroup.Aoe,
    Name: 'Hellfire',
    IconName: 'spell_fire_incinerate',
    Id: SpellId.Hellfire,
  },
  {
    Group: RotationGroup.Aoe,
    Name: 'Rain of Fire',
    IconName: 'spell_shadow_rainoffire',
    Id: SpellId.RainOfFire,
  },

  // Curses
  {
    Group: RotationGroup.Curse,
    Name: 'Curse of the Elements',
    IconName: 'spell_shadow_chilltouch',
    Id: SpellId.CurseOfTheElements,
  },
  {
    Group: RotationGroup.Curse,
    Name: 'Curse of Doom',
    IconName: 'spell_shadow_auraofdarkness',
    Id: SpellId.CurseOfDoom,
  },
  {
    Group: RotationGroup.Curse,
    Name: 'Curse of Agony',
    IconName: 'spell_shadow_curseofsargeras',
    Id: SpellId.CurseOfAgony,
  },

  // Finishers
  {
    Group: RotationGroup.Finishers,
    Name: 'Death Coil',
    IconName: 'spell_shadow_deathcoil',
    Id: SpellId.DeathCoil,
  },
  {
    Group: RotationGroup.Finishers,
    Name: 'Shadowburn',
    IconName: 'spell_shadow_scourgebuild',
    Id: SpellId.Shadowburn,
  },
  {
    Group: RotationGroup.Finishers,
    Name: 'Conflagrate',
    IconName: 'spell_fire_fireball',
    Id: SpellId.Conflagrate,
  },
  {
    Group: RotationGroup.Finishers,
    Name: 'Drain Soul',
    IconName: 'spell_shadow_haunting',
    Id: 47855,
  },

  // Other
  {
    Group: RotationGroup.Other,
    Name: 'Shadowfury',
    IconName: 'spell_shadow_shadowfury',
    Id: SpellId.Shadowfury,
  },
  {
    Group: RotationGroup.Other,
    Name: 'Dark Pact',
    IconName: 'spell_shadow_darkritual',
    Id: SpellId.DarkPact,
  },
  {
    Group: RotationGroup.Other,
    Name: 'Haunt',
    IconName: 'ability_warlock_haunt',
    Id: SpellId.Haunt,
  },

  // Uncategorized
  {
    Name: 'Mp5',
    IconName: 'inv_elemental_mote_mana',
    Id: 0,
  },
  {
    Name: 'Life Tap',
    IconName: 'spell_shadow_burningspirit',
    Id: 57946,
  },
]
