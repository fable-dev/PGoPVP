// app.js

// --- League definitions ---
const LEAGUES = {
  great: {
    id: "great",
    name: "Great League",
    cpCap: 1500,
    note: "CP ≤ 1500"
  },
  ultra: {
    id: "ultra",
    name: "Ultra League",
    cpCap: 2500,
    note: "CP ≤ 2500"
  },
  master: {
    id: "master",
    name: "Master League",
    cpCap: Infinity,
    note: "No CP cap"
  }
};

// --- DOM references ---
const leagueSelect = document.getElementById("leagueSelect");
const pokemonSelect = document.getElementById("pokemonSelect");
const leagueCpCap = document.getElementById("leagueCpCap");
const detailsContent = document.getElementById("detailsContent");
const statusText = document.getElementById("statusText");
const searchInput = document.getElementById("pokemonSearchInput");

// --- Initialization ---
function initLeagueSelect() {
  Object.values(LEAGUES).forEach(league => {
    const option = document.createElement("option");
    option.value = league.id;
    option.textContent = league.name;
    leagueSelect.appendChild(option);
  });
}

function updateLeagueCpBadge(leagueId) {
  const league = LEAGUES[leagueId];
  if (!league) {
    leagueCpCap.textContent = "League: —";
    return;
  }
  const capText = league.cpCap === Infinity ? "No CP cap" : `CP cap: ${league.cpCap}`;
  leagueCpCap.textContent = `${league.name} · ${capText}`;
}

// Helper to get filtered Pokémon for current league + search text
function getFilteredPokemon(leagueId, searchTerm = "") {
  if (!leagueId) return [];

  const normalizedTerm = searchTerm.trim().toLowerCase();
  return POKEMON_DATA.filter(p => {
    if (!p.leagues.includes(leagueId)) return false;
    if (!normalizedTerm) return true;

    const nameMatch = p.name.toLowerCase().includes(normalizedTerm);
    const typeMatch = (p.types || []).some(t =>
      t.toLowerCase().includes(normalizedTerm)
    );
    return nameMatch || typeMatch;
  });
}

function populatePokemonSelect(leagueId, searchTerm = "") {
  pokemonSelect.innerHTML = "";
  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = leagueId
    ? "Select a core pick…"
    : "Select a league first…";
  pokemonSelect.appendChild(placeholder);

  if (!leagueId) {
    pokemonSelect.disabled = true;
    return;
  }

  const options = getFilteredPokemon(leagueId, searchTerm);

  options.forEach(p => {
    const opt = document.createElement("option");
    opt.value = p.slug;
    opt.textContent = p.name;
    pokemonSelect.appendChild(opt);
  });

  pokemonSelect.disabled = options.length === 0;
}

function renderPokemonDetails(slug, leagueId) {
  const league = LEAGUES[leagueId];
  const pokemon = POKEMON_DATA.find(p => p.slug === slug);

  if (!pokemon || !league) {
    detailsContent.innerHTML = `
      <p class="empty-state">
        No data found for that combination (yet). Try another Pokémon or league.
      </p>
    `;
    statusText.textContent = "No data available.";
    return;
  }

  statusText.textContent = `${pokemon.name} in ${league.name}`;

  const cpText = league.cpCap === Infinity
    ? "No CP cap (XL not required for cap)"
    : `CP ≤ ${league.cpCap}`;

  const typesHtml = (pokemon.types || [])
    .map(t => `<span class="pill type">${t}</span>`)
    .join("");

  const partnersHtml = pokemon.partners && pokemon.partners.length
    ? `<ul>${pokemon.partners.map(p => `<li>${p}</li>`).join("")}</ul>`
    : `<p class="muted">Add some recommended partners to the data model.</p>`;

  const countersHtml = pokemon.counters && pokemon.counters.length
    ? `<ul>${pokemon.counters.map(c => `<li>${c}</li>`).join("")}</ul>`
    : `<p class="muted">Add common counters to the data model.</p>`;

  const movesFastHtml = pokemon.movesFast && pokemon.movesFast.length
    ? pokemon.movesFast.map(m => `<span class="pill">${m}</span>`).join("")
    : `<span class="muted">No fast moves listed yet.</span>`;

  const movesChargeHtml = pokemon.movesCharge && pokemon.movesCharge.length
    ? pokemon.movesCharge.map(m => `<span class="pill">${m}</span>`).join("")
    : `<span class="muted">No charge moves listed yet.</span>`;

  detailsContent.innerHTML = `
    <div class="value">
      <strong>${pokemon.name}</strong>
    </div>
    <div class="value">
      <span class="pill league">${league.name}</span>
      <span class="badge-cp">${cpText}</span>
    </div>
    <div class="value">
      <strong>Typing:</strong> ${typesHtml || "<span class='muted'>Unknown</span>"}
    </div>
    <div class="value">
      <strong>Role:</strong> <span class="pill role">${pokemon.role || "Not set"}</span>
    </div>
    <div class="value">
      <strong>Fast moves:</strong><br />
      ${movesFastHtml}
    </div>
    <div class="value">
      <strong>Charge moves:</strong><br />
      ${movesChargeHtml}
    </div>
    <div class="value">
      <strong>Recommended partners:</strong>
      ${partnersHtml}
    </div>
    <div class="value">
      <strong>Common counters:</strong>
      ${countersHtml}
    </div>
    <div class="value">
      <strong>Notes:</strong><br />
      <span class="muted">${pokemon.notes || "You can add matchup notes and IV comments here."}</span>
    </div>
  `;
}

// --- Event handlers ---
leagueSelect.addEventListener("change", () => {
  const leagueId = leagueSelect.value;
  updateLeagueCpBadge(leagueId);
  populatePokemonSelect(leagueId, searchInput.value);

  detailsContent.innerHTML = `
    <p class="empty-state">
      League selected. Now choose a core Pokémon for ${
        leagueId ? LEAGUES[leagueId].name : "this league"
      }.
    </p>
  `;
  statusText.textContent = leagueId
    ? `League: ${LEAGUES[leagueId].name}`
    : "Waiting for selection…";
});

pokemonSelect.addEventListener("change", () => {
  const leagueId = leagueSelect.value;
  const slug = pokemonSelect.value;
  if (!leagueId || !slug) {
    detailsContent.innerHTML = `<p class="empty-state">Choose a league and a Pokémon to see PvP details.</p>`;
    statusText.textContent = "Waiting for selection…";
    return;
  }
  renderPokemonDetails(slug, leagueId);
});

// Live search filtering
searchInput.addEventListener("input", () => {
  const leagueId = leagueSelect.value;
  populatePokemonSelect(leagueId, searchInput.value);

  // Reset details if no Pokémon is selected
  if (!pokemonSelect.value) {
    detailsContent.innerHTML = `<p class="empty-state">Choose a Pokémon to see PvP details.</p>`;
    statusText.textContent = leagueId
      ? `League: ${LEAGUES[leagueId].name}`
      : "Waiting for selection…";
  }
});

// --- Boot ---
initLeagueSelect();
updateLeagueCpBadge("");
populatePokemonSelect("");
