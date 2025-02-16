#include "../include/player.h"

#include <cmath>
#include <iostream>

#include "../include/aura.h"
#include "../include/aura_selection.h"
#include "../include/bindings.h"
#include "../include/combat_log_breakdown.h"
#include "../include/common.h"
#include "../include/damage_over_time.h"
#include "../include/item_slot.h"
#include "../include/life_tap.h"
#include "../include/mana_over_time.h"
#include "../include/mana_potion.h"
#include "../include/on_crit_proc.h"
#include "../include/on_damage_proc.h"
#include "../include/on_dot_tick_proc.h"
#include "../include/on_hit_proc.h"
#include "../include/on_resist_proc.h"
#include "../include/pet.h"
#include "../include/player_settings.h"
#include "../include/sets.h"
#include "../include/simulation.h"
#include "../include/spell.h"
#include "../include/stat.h"
#include "../include/talents.h"
#include "../include/trinket.h"

Player::Player(PlayerSettings& player_settings)
    : Entity(nullptr, player_settings, EntityType::kPlayer),
      selected_auras(player_settings.auras),
      talents(player_settings.talents),
      sets(player_settings.sets),
      items(player_settings.items) {
  name          = "Player";
  infinite_mana = player_settings.infinite_player_mana;

  if (recording_combat_log_breakdown) {
    combat_log_breakdown.insert({StatName::kMp5, std::make_shared<CombatLogBreakdown>(StatName::kMp5)});
  }

  if (player_settings.custom_stat == EmbindConstant::kStamina) {
    custom_stat = "stamina";
  } else if (player_settings.custom_stat == EmbindConstant::kIntellect) {
    custom_stat = "intellect";
  } else if (player_settings.custom_stat == EmbindConstant::kSpirit) {
    custom_stat = "spirit";
  } else if (player_settings.custom_stat == EmbindConstant::kSpellPower) {
    custom_stat = "spellPower";
  } else if (player_settings.custom_stat == EmbindConstant::kShadowPower) {
    custom_stat = "shadowPower";
  } else if (player_settings.custom_stat == EmbindConstant::kFirePower) {
    custom_stat = "firePower";
  } else if (player_settings.custom_stat == EmbindConstant::kCritRating) {
    custom_stat = "critRating";
  } else if (player_settings.custom_stat == EmbindConstant::kHitRating) {
    custom_stat = "hitRating";
  } else if (player_settings.custom_stat == EmbindConstant::kHasteRating) {
    custom_stat = "hasteRating";
  } else if (player_settings.custom_stat == EmbindConstant::kMp5) {
    custom_stat = "mp5";
  } else {
    custom_stat = "normal";
  }

  if (selected_auras.fel_armor) {
    stats.spell_power += 100 * (0 + 0.1 * talents.demonic_aegis);
  }

  stats.stamina_modifier *= 1 + (talents.demonic_embrace == 1   ? 0.04
                                 : talents.demonic_embrace == 2 ? 0.07
                                 : talents.demonic_embrace == 3 ? 0.1
                                                                : 0);

  // Enemy Armor Reduction
  if (selected_auras.faerie_fire) {
    player_settings.enemy_armor -= 610;
  }

  if (selected_auras.sunder_armor || selected_auras.expose_armor) {
    // TODO it reduces armor by 20%
    player_settings.enemy_armor -= 520 * 5;
  }

  if (selected_auras.annihilator) {
    player_settings.enemy_armor -= 600;
  }
  player_settings.enemy_armor = std::max(0, player_settings.enemy_armor);

  // Health & Mana
  stats.health = (stats.health + Entity::GetStamina() * StatConstant::kHealthPerStamina) *
                 (1 + 0.01 * static_cast<double>(talents.fel_vitality));
  stats.max_mana = (stats.mana + Entity::GetIntellect() * StatConstant::kManaPerIntellect) *
                   (1 + 0.01 * static_cast<double>(talents.fel_vitality));
}

void Player::Initialize(Simulation* simulation_ptr) {
  std::vector equipped_trinket_ids{items.trinket_1, items.trinket_2};
  std::vector equipped_ring_ids{items.finger_1, items.finger_2};

  Entity::Initialize(simulation_ptr);
  player = this;
  pet    = std::make_shared<Pet>(*this, settings.selected_pet);
  pet->Initialize(simulation_ptr);

  for (const auto& kTrinketId : equipped_trinket_ids) {
    if (kTrinketId == ItemId::kSkullOfGuldan) {
      trinkets.push_back(SkullOfGuldan(*this));
    }

    if (kTrinketId == ItemId::kShiftingNaaruSliver) {
      trinkets.push_back(ShiftingNaaruSliver(*this));
    }
  }

  // Auras
  if (settings.fight_type == EmbindConstant::kSingleTarget) {
    if (talents.improved_shadow_bolt > 0) {
      auras.shadow_mastery = std::make_shared<ShadowMasteryAura>(*this);
    }

    if (settings.has_corruption || settings.rotation_option == EmbindConstant::kSimChooses) {
      auras.corruption = std::make_shared<CorruptionDot>(*this);
    }

    if (talents.unstable_affliction == 1 &&
        (settings.has_unstable_affliction || settings.rotation_option == EmbindConstant::kSimChooses)) {
      auras.unstable_affliction = std::make_shared<UnstableAfflictionDot>(*this);
    }

    if (settings.has_immolate || settings.rotation_option == EmbindConstant::kSimChooses) {
      auras.immolate = std::make_shared<ImmolateDot>(*this);
    }

    if (settings.has_curse_of_agony || settings.has_curse_of_doom) {
      auras.curse_of_agony = std::make_shared<CurseOfAgonyDot>(*this);
    }

    if (settings.has_curse_of_the_elements) {
      auras.curse_of_the_elements = std::make_shared<CurseOfTheElementsAura>(*this);
    }

    if (settings.has_curse_of_doom) {
      auras.curse_of_doom = std::make_shared<CurseOfDoomDot>(*this);
    }

    if (talents.nightfall > 0) {
      auras.shadow_trance = std::make_shared<ShadowTranceAura>(*this);
    }

    if (settings.has_drain_soul || settings.rotation_option == EmbindConstant::kSimChooses) {
      auras.drain_soul = std::make_shared<DrainSoulDot>(*this);
    }

    if (talents.shadow_embrace > 0) {
      auras.shadow_embrace = std::make_shared<ShadowEmbraceAura>(*this);
    }

    if (talents.eradication > 0) {
      auras.eradication = std::make_shared<EradicationAura>(*this);
    }

    if (talents.molten_core > 0) {
      auras.molten_core = std::make_shared<MoltenCoreAura>(*this);
    }

    if (talents.decimation > 0) {
      auras.decimation = std::make_shared<DecimationAura>(*this);
    }

    if (talents.pyroclasm > 0) {
      auras.pyroclasm = std::make_shared<PyroclasmAura>(*this);
    }

    if (talents.improved_soul_leech > 0) {
      auras.improved_soul_leech = std::make_shared<ImprovedSoulLeechAura>(*this);
    }

    if (talents.backdraft > 0) {
      auras.backdraft = std::make_shared<BackdraftAura>(*this);
    }

    if (talents.empowered_imp > 0) {
      auras.empowered_imp = std::make_shared<EmpoweredImpAura>(*this);
    }
  }

  if (talents.metamorphosis == 1) {
    auras.metamorphosis = std::make_shared<MetamorphosisAura>(*this);
  }

  if (talents.demonic_pact > 0) {
    auras.demonic_pact = std::make_shared<DemonicPactAura>(*this);
  }

  if (selected_auras.mana_tide_totem) {
    auras.mana_tide_totem = std::make_shared<ManaTideTotemAura>(*this);
  }

  if (selected_auras.power_infusion) {
    auras.power_infusion = std::make_shared<PowerInfusionAura>(*this);
  }

  if (selected_auras.innervate) {
    auras.innervate = std::make_shared<InnervateAura>(*this);
  }

  if (selected_auras.bloodlust) {
    auras.bloodlust = std::make_shared<BloodlustAura>(*this);
  }

  if (selected_auras.flame_cap) {
    auras.flame_cap = std::make_shared<FlameCapAura>(*this);
  }

  if (settings.race == EmbindConstant::kOrc) {
    auras.blood_fury = std::make_shared<BloodFuryAura>(*this);
  }

  if (std::find(equipped_trinket_ids.begin(), equipped_trinket_ids.end(), ItemId::kTheLightningCapacitor) !=
      equipped_trinket_ids.end()) {
    auras.the_lightning_capacitor = std::make_shared<TheLightningCapacitorAura>(*this);
  }

  // Spells
  spells.life_tap = std::make_shared<LifeTap>(*this);

  if (settings.fight_type == EmbindConstant::kAoe) {
    spells.seed_of_corruption = std::make_shared<SeedOfCorruption>(*this);
  } else {
    if (settings.has_shadow_bolt || talents.nightfall > 0 || settings.rotation_option == EmbindConstant::kSimChooses) {
      spells.shadow_bolt = std::make_shared<ShadowBolt>(*this);
    }

    if (settings.has_incinerate || settings.rotation_option == EmbindConstant::kSimChooses) {
      spells.incinerate = std::make_shared<Incinerate>(*this);
    }

    if (settings.has_searing_pain || settings.rotation_option == EmbindConstant::kSimChooses) {
      spells.searing_pain = std::make_shared<SearingPain>(*this);
    }

    if (settings.has_death_coil || settings.rotation_option == EmbindConstant::kSimChooses) {
      spells.death_coil = std::make_shared<DeathCoil>(*this);
    }

    if (talents.conflagrate == 1 &&
        (settings.has_conflagrate || settings.rotation_option == EmbindConstant::kSimChooses)) {
      spells.conflagrate = std::make_shared<Conflagrate>(*this);
    }

    if (talents.shadowburn == 1 &&
        (settings.has_shadow_burn || settings.rotation_option == EmbindConstant::kSimChooses)) {
      spells.shadowburn = std::make_shared<Shadowburn>(*this);
    }

    if (talents.shadowfury == 1 &&
        (settings.has_shadowfury || settings.rotation_option == EmbindConstant::kSimChooses)) {
      spells.shadowfury = std::make_shared<Shadowfury>(*this);
    }

    if (auras.corruption != nullptr) {
      spells.corruption              = std::make_shared<Corruption>(*this, nullptr, auras.corruption);
      auras.corruption->parent_spell = spells.corruption;
    }

    if (auras.unstable_affliction != nullptr) {
      spells.unstable_affliction = std::make_shared<UnstableAffliction>(*this, nullptr, auras.unstable_affliction);
      auras.unstable_affliction->parent_spell = spells.unstable_affliction;
    }

    if (auras.immolate != nullptr) {
      spells.immolate              = std::make_shared<Immolate>(*this, nullptr, auras.immolate);
      auras.immolate->parent_spell = spells.immolate;
    }

    if (auras.curse_of_agony != nullptr || auras.curse_of_doom != nullptr) {
      spells.curse_of_agony              = std::make_shared<CurseOfAgony>(*this, nullptr, auras.curse_of_agony);
      auras.curse_of_agony->parent_spell = spells.curse_of_agony;
    }

    if (auras.curse_of_the_elements != nullptr) {
      spells.curse_of_the_elements = std::make_shared<CurseOfTheElements>(*this, auras.curse_of_the_elements);
    }

    if (auras.curse_of_doom != nullptr) {
      spells.curse_of_doom              = std::make_shared<CurseOfDoom>(*this, nullptr, auras.curse_of_doom);
      auras.curse_of_doom->parent_spell = spells.curse_of_doom;
    }

    if (auras.drain_soul != nullptr) {
      spells.drain_soul              = std::make_shared<DrainSoul>(*this, nullptr, auras.drain_soul);
      auras.drain_soul->parent_spell = spells.drain_soul;
    }

    if (auras.shadow_mastery != nullptr) {
      spells.improved_shadow_bolt = std::make_shared<ImprovedShadowBolt>(*this, auras.shadow_mastery);
    }

    if (auras.pyroclasm != nullptr) {
      spells.pyroclasm = std::make_shared<Pyroclasm>(*this, auras.pyroclasm);
    }

    if (auras.improved_soul_leech != nullptr) {
      spells.soul_leech = std::make_shared<SoulLeech>(*this, auras.improved_soul_leech);
    }
  }

  if (auras.mana_tide_totem != nullptr) {
    spells.mana_tide_totem = std::make_shared<ManaTideTotem>(*this, auras.mana_tide_totem);
  }

  if (selected_auras.demonic_rune) {
    spells.demonic_rune = std::make_shared<DemonicRune>(*this);
  }

  if (selected_auras.runic_mana_potion) {
    spells.runic_mana_potion = std::make_shared<RunicManaPotion>(*this);
  }

  if (talents.dark_pact == 1 && (settings.has_dark_pact || settings.rotation_option == EmbindConstant::kSimChooses)) {
    spells.dark_pact = std::make_shared<DarkPact>(*this);
  }

  if (auras.flame_cap != nullptr) {
    spells.flame_cap = std::make_shared<FlameCap>(*this, auras.flame_cap);
  }

  if (auras.blood_fury != nullptr) {
    spells.blood_fury = std::make_shared<BloodFury>(*this, auras.blood_fury);
  }

  if (auras.metamorphosis != nullptr) {
    spells.metamorphosis = std::make_shared<Metamorphosis>(*this, auras.metamorphosis);
  }

  if (selected_auras.judgement_of_wisdom) {
    spells.judgement_of_wisdom = std::make_shared<JudgementOfWisdom>(*this);
  }

  if (auras.power_infusion != nullptr) {
    for (int i = 0; i < settings.power_infusion_amount; i++) {
      spells.power_infusion.push_back(std::make_shared<PowerInfusion>(*this, auras.power_infusion));
    }
  }

  if (auras.bloodlust != nullptr) {
    spells.bloodlust = std::make_shared<Bloodlust>(*this, auras.bloodlust);
  }

  if (auras.innervate != nullptr) {
    for (int i = 0; i < settings.innervate_amount; i++) {
      spells.innervate.push_back(std::make_shared<Innervate>(*this, auras.innervate));
    }
  }

  // Set the filler property
  if (settings.has_incinerate) {
    filler = spells.incinerate;
  } else if (settings.has_searing_pain) {
    filler = spells.searing_pain;
  } else {
    filler = spells.shadow_bolt;
  }

  // Set the curseSpell and curseAura properties
  if (spells.curse_of_the_elements != nullptr) {
    curse_spell = spells.curse_of_the_elements;
    curse_aura  = auras.curse_of_the_elements;
  } else if (spells.curse_of_doom != nullptr) {
    curse_spell = spells.curse_of_doom;
  } else if (spells.curse_of_agony != nullptr) {
    curse_spell = spells.curse_of_agony;
  }

  SendPlayerInfoToCombatLog();
}

void Player::Reset() {
  Entity::Reset();
  stats.mana            = stats.max_mana;
  iteration_damage      = 0;
  power_infusions_ready = settings.power_infusion_amount;

  for (auto& trinket : trinkets) { trinket.Reset(); }
}

void Player::EndAuras() {
  Entity::EndAuras();

  for (auto& trinket : trinkets) {
    if (trinket.is_active) {
      trinket.Fade();
    }
  }

  for (const auto& kDot : dot_list) {
    if (kDot->is_active) {
      kDot->Fade();
    }
  }
}

double Player::GetHastePercent() {
  auto haste_percent = stats.spell_haste_percent;

  // If both Bloodlust and Power Infusion are active then remove the 20% PI
  // bonus since they don't stack
  if (auras.bloodlust != nullptr && auras.power_infusion != nullptr && auras.bloodlust->is_active &&
      auras.power_infusion->is_active) {
    for (auto& stat : auras.power_infusion->stats) {
      if (stat.name == StatName::kSpellHastePercent) {
        haste_percent /= stat.value;
      }
    }
  }

  return haste_percent * (1 + stats.spell_haste_rating / StatConstant::kHasteRatingPerPercent / 100.0);
}

double Player::GetSpellPower(const SpellSchool kSchool) {
  auto spell_power = stats.spell_power;

  if (pet != nullptr && talents.demonic_knowledge > 0) {
    spell_power += (pet->GetStamina() + pet->GetIntellect()) * 0.04 * talents.demonic_knowledge;
  }

  if (kSchool == SpellSchool::kShadow) {
    spell_power += stats.shadow_power;
  } else if (kSchool == SpellSchool::kFire) {
    spell_power += stats.fire_power;
  }

  auto highest_spell_power = 0.0;

  if (selected_auras.totem_of_wrath) {
    highest_spell_power = std::max(highest_spell_power, 280.0);
  }

  if (selected_auras.flametongue_totem) {
    highest_spell_power = std::max(highest_spell_power, 144.0);
  }

  // TODO add demonic pact from selected_auras
  if (auras.demonic_pact != nullptr && auras.demonic_pact->is_active) {
    highest_spell_power = std::max(highest_spell_power, spell_power * 0.02 * talents.demonic_pact);
  }

  return spell_power;
}

double Player::GetSpellCritChance() {
  return stats.spell_crit_chance + GetIntellect() * StatConstant::kCritChancePerIntellect +
         stats.spell_crit_rating / StatConstant::kCritRatingPerPercent;
}

int Player::GetRand() {
  return rng.Range(0, 100 * kFloatNumberMultiplier);
}

bool Player::RollRng(const double kChance) {
  return GetRand() <= kChance * kFloatNumberMultiplier;
}

void Player::UseCooldowns() {
  // Only use PI if Bloodlust isn't selected or if Bloodlust isn't active since they don't stack, or if there are enough
  // Power Infusions available to last until the end of the fight for the mana cost reduction
  if (!spells.power_infusion.empty() && !auras.power_infusion->is_active &&
      (spells.bloodlust == nullptr || !auras.bloodlust->is_active ||
       power_infusions_ready * auras.power_infusion->duration >= simulation->fight_time_remaining)) {
    for (const auto& kPi : spells.power_infusion) {
      if (kPi->Ready()) {
        kPi->StartCast();
        break;
      }
    }
  }

  if (stats.mana / stats.max_mana <= 0.5 && !spells.innervate.empty() && !auras.innervate->is_active) {
    for (const auto& kInnervate : spells.innervate) {
      if (kInnervate->Ready()) {
        kInnervate->StartCast();
        break;
      }
    }
  }

  if (spells.demonic_empowerment != nullptr &&
      (pet->pet_name == PetName::kImp || pet->pet_name == PetName::kFelguard) &&
      settings.pet_mode == EmbindConstant::kAggressive && spells.demonic_empowerment->Ready()) {
    spells.demonic_empowerment->StartCast();
  }

  if (spells.flame_cap != nullptr && spells.flame_cap->Ready()) {
    spells.flame_cap->StartCast();
  }

  if (spells.metamorphosis != nullptr && spells.metamorphosis->Ready()) {
    spells.metamorphosis->StartCast();
  }

  if (spells.blood_fury != nullptr && spells.blood_fury->Ready()) {
    spells.blood_fury->StartCast();
  }

  for (auto i = 0; i < trinkets.size(); i++) {
    if (trinkets[i].Ready()) {
      trinkets[i].Use();
      // Set the other on-use trinket (if another is equipped) on cooldown for
      // the duration of the trinket just used if the trinkets share cooldown
      if (const auto kOtherTrinketSlot = i == 1 ? 0 : 1; trinkets.size() > kOtherTrinketSlot &&
                                                         trinkets[kOtherTrinketSlot].shares_cooldown &&
                                                         trinkets[i].shares_cooldown) {
        trinkets[kOtherTrinketSlot].cooldown_remaining =
            std::max(trinkets[kOtherTrinketSlot].cooldown_remaining, static_cast<double>(trinkets[i].duration));
      }
    }
  }
}

void Player::CastLifeTapOrDarkPact() const {
  if (spells.dark_pact != nullptr && spells.dark_pact->Ready()) {
    spells.dark_pact->StartCast();
  } else {
    spells.life_tap->StartCast();
  }
}

void Player::ThrowError(const std::string& kError) const {
  SendCombatLogEntries();
  ErrorCallback(kError.c_str());
  throw std::runtime_error(kError);
}

void Player::SendCombatLogEntries() const {
  for (const auto& kValue : combat_log_entries) { CombatLogUpdate(kValue.c_str()); }
}

// TODO improve
int Player::GetActiveAfflictionEffectsCount() const {
  int count = 0;

  if (player->auras.corruption != nullptr && player->auras.corruption->is_active) {
    count++;
  }

  if (player->auras.curse_of_agony != nullptr && player->auras.curse_of_agony->is_active) {
    count++;
  }

  if (player->auras.curse_of_doom != nullptr && player->auras.curse_of_doom->is_active) {
    count++;
  }

  if (player->auras.curse_of_the_elements != nullptr && player->auras.curse_of_the_elements->is_active) {
    count++;
  }

  if (player->auras.haunt != nullptr && player->auras.haunt->is_active) {
    count++;
  }

  if (player->auras.unstable_affliction != nullptr && player->auras.unstable_affliction->is_active) {
    count++;
  }

  return count;
}

double Player::FindTimeUntilNextAction() {
  auto time = Entity::FindTimeUntilNextAction();

  if (pet != nullptr) {
    if (const double kTimeUntilNextPetAction = pet->FindTimeUntilNextAction();
        kTimeUntilNextPetAction > 0 && kTimeUntilNextPetAction < time) {
      time = kTimeUntilNextPetAction;
    }
  }

  for (const auto& kTrinket : trinkets) {
    if (kTrinket.is_active && kTrinket.duration_remaining < time) {
      time = kTrinket.duration_remaining;
    }

    if (kTrinket.cooldown_remaining > 0 && kTrinket.cooldown_remaining < time) {
      time = kTrinket.cooldown_remaining;
    }
  }

  return time;
}

void Player::Tick(const double kTime) {
  Entity::Tick(kTime);

  for (auto& trinket : trinkets) { trinket.Tick(kTime); }

  if (mp5_timer_remaining <= 0) {
    mp5_timer_remaining = 5;

    if (stats.mp5 > 0 || five_second_rule_timer_remaining <= 0 ||
        auras.innervate != nullptr && auras.innervate->is_active) {
      const bool kInnervateis_active  = auras.innervate != nullptr && auras.innervate->is_active;
      const double kCurrentPlayerMana = stats.mana;

      // MP5
      if (stats.mp5 > 0) {
        stats.mana += stats.mp5;
      }

      // Spirit mana regen
      if (kInnervateis_active || five_second_rule_timer_remaining <= 0) {
        // Formula from https://wowwiki-archive.fandom.com/wiki/Spirit?oldid=1572910
        auto mp5_from_spirit = 5 * (0.001 + std::sqrt(GetIntellect()) * GetSpirit() * 0.009327);

        if (kInnervateis_active) {
          mp5_from_spirit *= 4;
        }

        stats.mana += mp5_from_spirit;
      }

      if (stats.mana > stats.max_mana) {
        stats.mana = stats.max_mana;
      }

      const double kManaGained = stats.mana - kCurrentPlayerMana;
      if (recording_combat_log_breakdown) {
        combat_log_breakdown.at(StatName::kMp5)->casts++;
        combat_log_breakdown.at(StatName::kMp5)->iteration_mana_gain += kManaGained;
      }

      if (ShouldWriteToCombatLog()) {
        CombatLog("Player gains " + DoubleToString(kManaGained) + " mana from MP5 (" +
                  DoubleToString(kCurrentPlayerMana) + " -> " + DoubleToString(stats.mana) + ")");
      }
    }
  }
}

void Player::SendPlayerInfoToCombatLog() {
  combat_log_entries.emplace_back("---------------- Player stats ----------------");
  combat_log_entries.push_back("Health: " + DoubleToString(round(stats.health)));
  combat_log_entries.push_back("Mana: " + DoubleToString(round(stats.max_mana)));
  combat_log_entries.push_back("Stamina: " + DoubleToString(round(GetStamina())));
  combat_log_entries.push_back("Intellect: " + DoubleToString(round(GetIntellect())));
  combat_log_entries.push_back("Spell Power: " + DoubleToString(round(GetSpellPower())));
  combat_log_entries.push_back("Shadow Power: " + DoubleToString(stats.shadow_power));
  combat_log_entries.push_back("Fire Power: " + DoubleToString(stats.fire_power));
  combat_log_entries.push_back(
      "Crit Chance: " + DoubleToString(round((GetSpellCritChance() + 5 * talents.devastation) * 100) / 100, 2) + "%");
  combat_log_entries.push_back(
      "Hit Chance: " + DoubleToString(std::min(17.0, round(stats.extra_spell_hit_chance * 100) / 100), 2) + "%");
  combat_log_entries.push_back(
      "Haste: " +
      DoubleToString(round(stats.spell_haste_rating / StatConstant::kHasteRatingPerPercent * 100) / 100, 2) + "%");
  combat_log_entries.push_back(
      "Shadow Modifier: " + DoubleToString(stats.shadow_modifier * (1 + 0.03 * talents.shadow_mastery) * 100, 2) + "%");
  combat_log_entries.push_back(
      "Fire Modifier: " + DoubleToString(stats.fire_modifier * (1 + 0.02 * talents.emberstorm) * 100, 2) + "%");
  combat_log_entries.push_back("MP5: " + DoubleToString(stats.mp5));
  combat_log_entries.push_back("Spell Penetration: " + DoubleToString(stats.spell_penetration));
  if (pet != nullptr) {
    combat_log_entries.emplace_back("---------------- Pet stats ----------------");
    combat_log_entries.push_back("Stamina: " + DoubleToString(pet->GetStamina()));
    combat_log_entries.push_back("Intellect: " + DoubleToString(pet->GetIntellect()));
    combat_log_entries.push_back("Strength: " + DoubleToString(pet->GetStrength()));
    combat_log_entries.push_back("Agility: " + DoubleToString(pet->GetAgility()));
    combat_log_entries.push_back("Spirit: " + DoubleToString(pet->GetSpirit()));
    combat_log_entries.push_back("Attack Power: " + DoubleToString(round(pet->GetAttackPower())));
    combat_log_entries.push_back("Spell Power: " + DoubleToString(pet->GetSpellPower()));
    combat_log_entries.push_back("Mana: " + DoubleToString(pet->CalculateMaxMana()));
    combat_log_entries.push_back("MP5: " + DoubleToString(pet->stats.mp5));
    if (pet->pet_type == PetType::kMelee) {
      combat_log_entries.push_back(
          "Physical Hit Chance: " + DoubleToString(round(pet->stats.melee_hit_chance * 100) / 100.0, 2) + "%");
      combat_log_entries.push_back(
          "Physical Crit Chance: " + DoubleToString(round(pet->GetMeleeCritChance() * 100) / 100.0, 2) + "% (" +
          DoubleToString(StatConstant::kMeleeCritChanceSuppression, 2) + "% Crit Suppression Applied)");
      combat_log_entries.push_back("Glancing Blow Chance: " + DoubleToString(pet->glancing_blow_chance, 2) + "%");
      combat_log_entries.push_back(
          "Attack Power Modifier: " + DoubleToString(pet->stats.attack_power_modifier * 100, 2) + "%");
    }

    if (pet->pet_name == PetName::kImp || pet->pet_name == PetName::kSuccubus) {
      combat_log_entries.push_back(
          "Spell Hit Chance: " + DoubleToString(round(pet->GetSpellCritChance() * 100) / 100.0, 2) + "%");
      combat_log_entries.push_back(
          "Spell Crit Chance: " + DoubleToString(round(pet->GetSpellCritChance() * 100) / 100.0, 2) + "%");
    }
    combat_log_entries.push_back(
        "Damage Modifier: " +
        DoubleToString(round(pet->pet_name == PetName::kImp ? pet->spells.firebolt->GetDamageModifier()
                                                            : pet->spells.melee->GetDamageModifier() * 10000) /
                           100,
                       2) +
        "%");
  }
  combat_log_entries.emplace_back("---------------- Enemy stats ----------------");
  combat_log_entries.push_back("Level: " + std::to_string(settings.enemy_level));
  combat_log_entries.push_back("Shadow Resistance: " + std::to_string(std::max(settings.enemy_shadow_resist,
                                                                               enemy_level_difference_resistance)));
  combat_log_entries.push_back("Fire Resistance: " +
                               std::to_string(std::max(settings.enemy_fire_resist, enemy_level_difference_resistance)));
  if (pet != nullptr && pet->pet_name != PetName::kImp) {
    combat_log_entries.push_back("Dodge Chance: " + DoubleToString(StatConstant::kBaseEnemyDodgeChance, 2) + "%");
    combat_log_entries.push_back("Armor: " + std::to_string(settings.enemy_armor));
    combat_log_entries.push_back(
        "Damage Reduction From Armor: " +
        DoubleToString(round((1 - pet->enemy_damage_reduction_from_armor) * 10000) / 100.0, 2) + "%");
  }
  combat_log_entries.emplace_back("---------------------------------------------");
}
