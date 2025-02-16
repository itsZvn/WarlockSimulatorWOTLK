#include "../include/life_tap.h"

#include "../include/combat_log_breakdown.h"
#include "../include/common.h"
#include "../include/entity.h"
#include "../include/pet.h"
#include "../include/player.h"
#include "../include/talents.h"

// TODO make a class a parent to life tap and dark pact instead of life tap being a parent to dark pact
LifeTap::LifeTap(Entity& entity_param)
    : Spell(entity_param), mana_return(2400), modifier(1 * (1 + 0.1 * entity_param.player->talents.improved_life_tap)) {
  name         = SpellName::kLifeTap;
  coefficient  = 0.6;
  spell_school = SpellSchool::kShadow;
  Spell::Setup();
}

double LifeTap::ManaGain() const {
  return (mana_return + entity.GetSpellPower(spell_school) * coefficient) * modifier;
}

void LifeTap::Cast() {
  const double kCurrentPlayerMana = entity.stats.mana;
  const double kManaGain          = this->ManaGain();

  entity.stats.mana        = std::min(entity.stats.max_mana, entity.stats.mana + kManaGain);
  const double kManaGained = entity.stats.mana - kCurrentPlayerMana;

  if (entity.recording_combat_log_breakdown) {
    entity.combat_log_breakdown.at(name)->casts++;
    entity.combat_log_breakdown.at(name)->iteration_mana_gain += kManaGained;
  }

  if (entity.ShouldWriteToCombatLog()) {
    entity.CombatLog(name + " " + DoubleToString(kManaGained) + " (" +
                     DoubleToString(entity.GetSpellPower(spell_school)) + " Spell Power - " +
                     DoubleToString(coefficient, 3) + " Coefficient - " + DoubleToString(modifier * 100, 2) +
                     "% Modifier)");

    if (kCurrentPlayerMana + kManaGain > entity.stats.max_mana) {
      entity.CombatLog(name + " used at too high mana (mana wasted)");
    }
  }

  if (entity.player->talents.mana_feed == 1 && entity.pet != nullptr) {
    const double kCurrentPetMana = entity.pet->stats.mana;

    entity.pet->stats.mana = std::min(kCurrentPetMana + kManaGain, entity.pet->CalculateMaxMana());

    if (entity.ShouldWriteToCombatLog()) {
      entity.CombatLog(entity.pet->name + " gains " + DoubleToString(entity.pet->stats.mana - kCurrentPetMana) +
                       " mana from Mana Feed");
    }
  }

  if (name == SpellName::kDarkPact) {
    entity.pet->stats.mana = std::max(0.0, entity.pet->stats.mana - kManaGain);
  }
}

DarkPact::DarkPact(Entity& entity_param) : LifeTap(entity_param) {
  name         = SpellName::kDarkPact;
  mana_return  = 1200;
  coefficient  = 0.96;
  modifier     = 1;
  spell_school = SpellSchool::kShadow;
  Spell::Setup();
}

bool DarkPact::Ready() {
  return Spell::Ready() && entity.pet->stats.mana >= ManaGain();
}
