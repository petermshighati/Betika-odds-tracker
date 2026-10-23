
const apiKeyInput = document.getElementById("apiKey");
const leagueInput = document.getElementById("league");
const regionsInput = document.getElementById("regions");
const loadBtn = document.getElementById("loadBtn");
const errorBox = document.getElementById("error");
const statusBox = document.getElementById("status");
const matchesBox = document.getElementById("matches");
const loadedAt = document.getElementById("loadedAt");

function showError(message) {
  errorBox.textContent = message;
  statusBox.textContent = "Not connected";
}

loadBtn.addEventListener("click", async () => {
  const apiKey = apiKeyInput.value.trim();

  if (!apiKey) {
    showError("Please enter your API key.");
    return;
  }

  loadBtn.disabled = true;
  loadBtn.textContent = "Loading...";
  errorBox.textContent = "";
  statusBox.textContent = "Connecting...";

  try {
    const sport = leagueInput.value;
    const regions = regionsInput.value;

    const url = new URL(
      `https://api.the-odds-api.com/v4/sports/${encodeURIComponent(sport)}/odds/`
    );

    url.search = new URLSearchParams({
      apiKey,
      regions,
      markets: "h2h",
      oddsFormat: "decimal"
    });

    const response = await fetch(url, {
      signal: AbortSignal.timeout(20000)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || `API request failed (${response.status})`
      );
    }

    if (!Array.isArray(data)) {
      throw new Error("Unexpected API response.");
    }

    matchesBox.replaceChildren();

    if (data.length === 0) {
      matchesBox.textContent =
        "No matches returned. Check the league and your API plan.";
    } else {
      data.forEach(match => {
        const card = document.createElement("div");
        card.className = "match-card";

        const title = document.createElement("h3");
        title.textContent =
          `${match.home_team} vs ${match.away_team}`;
        card.appendChild(title);

        const prices = document.createElement("p");
        const bookmaker = match.bookmakers?.[0];
        const market = bookmaker?.markets?.find(m => m.key === "h2h");

        prices.textContent = market
          ? market.outcomes
              .map(o => `${o.name}: ${o.price}`)
              .join(" | ")
          : "No 1X2 odds supplied for this match.";

        card.appendChild(prices);
        matchesBox.appendChild(card);
      });
    }

    statusBox.textContent = "Connected";
    loadedAt.textContent =
      `Updated: ${new Date().toLocaleString()}`;

  } catch (error) {
    showError(
      error.name === "TimeoutError"
        ? "Request timed out. Check your internet and try again."
        : error.message === "Failed to fetch"
          ? "Network request failed. Check internet access and API availability."
          : error.message || "Something went wrong."
    );
  } finally {
    loadBtn.disabled = false;
    loadBtn.textContent = "Fetch live odds";
  }
});
  
