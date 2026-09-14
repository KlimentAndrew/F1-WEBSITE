document.addEventListener("DOMContentLoaded", () => {
    loadRoundsDropdown();
});

async function loadRoundsDropdown() {
    try {
        const response = await fetch("https://api.jolpi.ca/ergast/f1/2026.json");
        const data = await response.json();
        const races = data.MRData.RaceTable.Races;
        const select = document.getElementById("round-select");

        races.forEach(race => {
            const option = document.createElement("option");
            option.value = race.round;
            option.textContent = `R${race.round} - ${race.raceName}`;
            select.appendChild(option);
        });

        if (races.length > 0) {
            const lastRaceRound = races[races.length - 1].round;
            select.value = lastRaceRound;
            loadRaceResults(lastRaceRound);
        }

        select.addEventListener("change", (e) => {
            if (e.target.value) {
                loadRaceResults(e.target.value);
            }
        });
    } catch (error) {
        console.error("Error loading rounds:", error);
    }
}

async function loadRaceResults(round) {
    const tbody = document.getElementById("race-results-body");
    tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: #aaa; padding: 30px;">Loading results...</td></tr>`;

    try {
        const response = await fetch(`https://api.jolpi.ca/ergast/f1/2026/${round}/results.json`);
        const data = await response.json();
        const races = data.MRData.RaceTable.Races;

        if (!races || races.length === 0 || !races[0].Results) {
            tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: #e10600; padding: 30px;">Results not available yet.</td></tr>`;
            return;
        }

        const results = races[0].Results;
        tbody.innerHTML = "";

        results.forEach(res => {
            const timeOrStatus = res.Time ? res.Time.time : res.status;
            let podiumClass = "";
            if (res.position === "1") podiumClass = "podium-1";
            else if (res.position === "2") podiumClass = "podium-2";
            else if (res.position === "3") podiumClass = "podium-3";

            const row = document.createElement("tr");
            if (podiumClass) row.classList.add(podiumClass);

            row.innerHTML = `
                <td><strong>${res.position}</strong></td>
                <td>${res.Driver.givenName} <strong>${res.Driver.familyName}</strong></td>
                <td style="color: #aaa;">${res.Constructor.name}</td>
                <td>${res.laps}</td>
                <td>${timeOrStatus}</td>
                <td class="points"><strong>${res.points}</strong></td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: #e10600; padding: 30px;">Failed to load results.</td></tr>`;
    }
}