#include "../include/aura_selection.h"
#include "../include/bindings.h"
#include "../include/character_stats.h"
#include "../include/item_slot.h"
#include "../include/player.h"
#include "../include/player_settings.h"
#include "../include/sets.h"
#include "../include/simulation.h"
#include "../include/simulation_settings.h"
#include "../include/stat.h"
#include "../include/talents.h"
#include "../include/trinket.h"

int main() {
  auto auras                  = AuraSelection();
  auras.fel_armor             = true;
  auras.mana_spring_totem     = true;
  auras.wrath_of_air_totem    = true;
  auras.totem_of_wrath        = true;
  auras.mark_of_the_wild      = true;
  auras.prayer_of_spirit      = true;
  auras.inspiring_presence    = true;
  auras.moonkin_aura          = true;
  auras.bloodlust             = true;
  auras.curse_of_the_elements = true;
  auras.shadow_weaving        = true;
  auras.misery                = true;
  auras.judgement_of_wisdom   = true;
  auras.demonic_rune          = true;

  auto talents                 = Talents();
  talents.demonic_aegis        = 3;
  talents.improved_shadow_bolt = 5;
  talents.bane                 = 5;
  talents.devastation          = 5;
  talents.improved_immolate    = 5;
  talents.ruin                 = 1;
  talents.emberstorm           = 5;
  talents.backlash             = 3;
  talents.shadow_and_flame     = 5;

  auto sets = Sets();
  sets.t6   = 4;

  auto stats               = CharacterStats();
  stats.health             = 3310;
  stats.mana               = 2335;
  stats.stamina            = 786;
  stats.intellect          = 516;
  stats.spirit             = 247;
  stats.spell_power        = 1451;
  stats.shadow_power       = 134;
  stats.fire_power         = 80;
  stats.spell_haste_rating = 227;
  stats.spell_hit_rating   = 163;
  stats.spell_crit_rating  = 316;
  stats.spell_crit_chance  = 0;
  stats.mp5                = 50;
  stats.mana_cost_modifier = 1;
  stats.spell_penetration  = 88;
  stats.fire_modifier      = 1.2075;
  stats.shadow_modifier    = 1.155;
  stats.stamina_modifier   = 1.1;
  stats.intellect_modifier = 1.155;
  stats.spirit_modifier    = 1.1;

  auto items      = ItemSlot();
  items.head      = 31051;
  items.neck      = 32349;
  items.shoulders = 31054;
  items.back      = 32331;
  items.chest     = 30107;
  items.wrist     = 32586;
  items.hands     = 31050;
  items.waist     = 32256;
  items.legs      = 31053;
  items.feet      = 32239;
  items.finger_1  = 32527;
  items.finger_2  = 32527;
  items.trinket_1 = 32483;
  items.trinket_2 = 27683;
  items.weapon    = 32374;
  items.wand      = 29982;

  auto iterations                                = 1000;
  auto player_settings                           = PlayerSettings(auras, talents, sets, stats, items);
  player_settings.equipped_item_simulation       = true;
  player_settings.random_seeds                   = AllocRandomSeeds(iterations);
  player_settings.selected_pet                   = EmbindConstant::kFelhunter;
  player_settings.fight_type                     = EmbindConstant::kSingleTarget;
  player_settings.enemy_amount                   = 15;
  player_settings.race                           = EmbindConstant::kGnome;
  player_settings.rotation_option                = EmbindConstant::kSimChooses;
  player_settings.meta_gem_id                    = 34220;
  player_settings.recording_combat_log_breakdown = true;
  player_settings.enemy_level                    = 73;
  player_settings.infinite_player_mana           = false;
  player_settings.has_curse_of_doom              = true;
  player_settings.prepop_black_book              = false;
  player_settings.pet_mode                       = EmbindConstant::kAggressive;
  player_settings.enemy_armor                    = 7700;
  player_settings.power_infusion_amount          = 1;
  player_settings.innervate_amount               = 1;
  player_settings.ferocious_inspiration_amount   = 1;
  player_settings.improved_faerie_fire           = true;
  player_settings.has_drain_soul                 = true;

  auto player                         = Player(player_settings);
  auto simulation_settings            = SimulationSettings();
  simulation_settings.iterations      = iterations;
  simulation_settings.min_time        = 150;
  simulation_settings.max_time        = 210;
  simulation_settings.simulation_type = SimulationType::kNormal;

  auto simulation = Simulation(player, simulation_settings);
  simulation.Start();
}
