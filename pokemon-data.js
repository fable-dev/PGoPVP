// pokemon-data.js
// Static Pokémon GO PvP data used by the app.
// You can extend this array over time.

const POKEMON_DATA = [
  {
    slug: "azumarill",
    name: "Azumarill",
    leagues: ["great"],
    types: ["Water", "Fairy"],
    role: "Bulky safe swap / closer",
    movesFast: ["Bubble"],
    movesCharge: ["Play Rough", "Hydro Pump", "Ice Beam"],
    partners: ["Galarian Stunfisk", "Trevenant", "Registeel"],
    counters: ["Lanturn", "Venusaur", "Registeel", "Toxicroak"],
    notes: "Very strong in Great League with flexible coverage; needs good IVs for bulk."
  },
  {
    slug: "galarian-stunfisk",
    name: "Galarian Stunfisk",
    leagues: ["great"],
    types: ["Ground", "Steel"],
    role: "Anti-flyer / generalist",
    movesFast: ["Mud Shot"],
    movesCharge: ["Rock Slide", "Earthquake"],
    partners: ["Azumarill", "Medicham", "Trevenant"],
    counters: ["Swampert", "Medicham", "Fighting-types", "Water-types"],
    notes: "Hard walls many Flyers and Steel-weak mons. Watch out for Fighters and strong Waters."
  },
  {
    slug: "medicham",
    name: "Medicham",
    leagues: ["great"],
    types: ["Fighting", "Psychic"],
    role: "Flexible fighter / core breaker",
    movesFast: ["Counter"],
    movesCharge: ["Ice Punch", "Psychic", "Dynamic Punch"],
    partners: ["Lanturn", "Galarian Stunfisk", "Noctowl"],
    counters: ["Sableye", "Ghost-types", "Fairy-types"],
    notes: "Core to Great League. XL investment helps; strong coverage vs Steels and Normals."
  },
  {
    slug: "cresselia-ultra",
    name: "Cresselia",
    leagues: ["ultra"],
    types: ["Psychic"],
    role: "Bulky closer / safe swap",
    movesFast: ["Psycho Cut"],
    movesCharge: ["Moonblast", "Grass Knot", "Future Sight"],
    partners: ["Registeel", "Giratina (Altered)", "Talonflame"],
    counters: ["Dark-types", "Giratina (Altered)", "Steel-types"],
    notes: "Extremely bulky and spammy in Ultra League; Grass Knot gives great anti-Water coverage."
  },
  {
    slug: "giratina-altered",
    name: "Giratina (Altered)",
    leagues: ["ultra", "master"],
    types: ["Ghost", "Dragon"],
    role: "Safe swap / midgame tank",
    movesFast: ["Shadow Claw", "Dragon Breath"],
    movesCharge: ["Dragon Claw", "Shadow Sneak", "Ancient Power"],
    partners: ["Cresselia", "Registeel", "Togekiss"],
    counters: ["Charmers", "Dark-types", "Dragon-types with strong Dragon moves"],
    notes: "Central to Ultra and viable in some Master formats. Watch out for Charm and Dark."
  },
  {
    slug: "mewtwo",
    name: "Mewtwo",
    leagues: ["master"],
    types: ["Psychic"],
    role: "High-pressure closer",
    movesFast: ["Psycho Cut"],
    movesCharge: ["Psystrike", "Shadow Ball", "Focus Blast", "Ice Beam"],
    partners: ["Dialga", "Lugia", "Groudon"],
    counters: ["Dark-types", "Steel-types like Metagross and Dialga"],
    notes: "Extremely high damage with elite moves; flexible but fragile compared to bulky legends."
  }
];
