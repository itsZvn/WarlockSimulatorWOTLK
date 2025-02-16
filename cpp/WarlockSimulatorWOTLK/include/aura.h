#pragma once
#include <string>

struct Pet;
struct Stat;
struct Entity;
struct Player;
#include <vector>

struct Aura {
  virtual ~Aura() = default;
  Entity& entity;
  std::vector<Stat> stats;
  std::vector<Stat> stats_per_stack;
  std::string name;
  int duration                 = 0;
  double duration_remaining    = 0;
  bool is_active               = false;
  bool has_duration            = true;
  bool applies_with_max_stacks = true;
  bool group_wide              = false;  // true if it's an aura that applies to everyone in the group
  // (will apply to pets as well then)
  // dots
  int tick_timer_total        = 0;
  double tick_timer_remaining = 0;
  int ticks_remaining         = 0;
  int ticks_total             = 0;
  int stacks                  = 0;
  int max_stacks              = 0;
  // ISB
  double modifier = 1;
  // Bloodlust
  double haste_modifier = 0;

  explicit Aura(Entity& entity_param);
  virtual void Setup();
  virtual void Tick(double kTime);
  virtual void Apply();
  void Fade();
  virtual void DecrementStacks();
};

struct CurseOfTheElementsAura final : Aura {
  explicit CurseOfTheElementsAura(Player& player);
};

struct ShadowTranceAura final : Aura {
  explicit ShadowTranceAura(Player& player);
};

struct PowerInfusionAura final : Aura {
  explicit PowerInfusionAura(Player& player);
};

struct FlameCapAura final : Aura {
  explicit FlameCapAura(Player& player);
};

struct BloodFuryAura final : Aura {
  explicit BloodFuryAura(Player& player);
};

struct BloodlustAura final : Aura {
  explicit BloodlustAura(Player& player);
};

struct TheLightningCapacitorAura final : Aura {
  explicit TheLightningCapacitorAura(Player& player);
};

struct InnervateAura final : Aura {
  explicit InnervateAura(Player& player);
};

struct DemonicFrenzyAura final : Aura {
  explicit DemonicFrenzyAura(Pet& pet);
};

struct BlackBookAura final : Aura {
  explicit BlackBookAura(Pet& pet);
};

struct HauntAura final : Aura {
  explicit HauntAura(Player& player);
};

struct ShadowEmbraceAura final : Aura {
  explicit ShadowEmbraceAura(Player& player);
};

struct EradicationAura final : Aura {
  explicit EradicationAura(Player& player);
};

struct MoltenCoreAura final : Aura {
  explicit MoltenCoreAura(Player& player);
};

struct DemonicEmpowermentAura final : Aura {
  explicit DemonicEmpowermentAura(Pet& pet);
};

struct DecimationAura final : Aura {
  explicit DecimationAura(Player& player);
};

struct DemonicPactAura final : Aura {
  explicit DemonicPactAura(Player& player);
};

struct MetamorphosisAura final : Aura {
  explicit MetamorphosisAura(Player& player);
};

struct ShadowMasteryAura final : Aura {
  explicit ShadowMasteryAura(Player& player);
};

struct PyroclasmAura final : Aura {
  explicit PyroclasmAura(Player& player);
};

struct ImprovedSoulLeechAura final : Aura {
  explicit ImprovedSoulLeechAura(Player& player);
  void Apply() override;
};

struct BackdraftAura final : Aura {
  explicit BackdraftAura(Player& player);
};

struct EmpoweredImpAura final : Aura {
  explicit EmpoweredImpAura(Player& player);
};
