const DRIVERS_URL = 'https://api.jolpi.ca/ergast/f1/current/driverStandings.json';
const TEAMS_URL = 'https://api.jolpi.ca/ergast/f1/current/constructorStandings.json';
const RACES_URL = 'https://api.jolpi.ca/ergast/f1/current.json';
const LAST_RESULTS_URL = "https://api.jolpica.io/f1/current/last/results.json";

document.addEventListener("DOMContentLoaded", () => {
    loadDriverStandings();
    loadConstructorStandings();
    loadCountdown();
    loadLastRaceResults();
});

async function loadDriverStandings() {
    try {
        const response = await fetch(DRIVERS_URL);
        const data = await response.json();
        
        const table = data.MRData.StandingsTable;
        const listContainer = table.StandingsLists ? table.StandingsLists[0] : table.StandingsList[0];
        const standings = listContainer.DriverStandings;
        
        const tbody = document.getElementById('drivers-preview');
        if (tbody) {
            tbody.innerHTML = ''; 
            standings.slice(0, 5).forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.position}</td>
                    <td><strong>${item.Driver.givenName} ${item.Driver.familyName}</strong></td>
                    <td class="team-name">${item.Constructors[0].name}</td>
                    <td class="points">${item.points} pts</td>
                `;
                tbody.appendChild(row);
            });
        }
    } catch (error) {
        console.error('Drivers error:', error);
        const tbody = document.getElementById('drivers-preview');
        if (tbody) tbody.innerHTML = '<tr><td>Live data temporarily unavailable.</td></tr>';
    }
}

async function loadConstructorStandings() {
    try {
        const response = await fetch(TEAMS_URL);
        const data = await response.json();
        
        const table = data.MRData.StandingsTable;
        const listContainer = table.StandingsLists ? table.StandingsLists[0] : table.StandingsList[0];
        const standings = listContainer.ConstructorStandings;
        
        const tbody = document.getElementById('constructors-preview');
        if (tbody) {
            tbody.innerHTML = '';
            standings.slice(0, 5).forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.position}</td>
                    <td><strong>${item.Constructor.name}</strong></td>
                    <td class="points">${item.points} pts</td>
                `;
                tbody.appendChild(row);
            });
        }
    } catch (error) {
        console.error('Teams error:', error);
        const tbody = document.getElementById('constructors-preview');
        if (tbody) tbody.innerHTML = '<tr><td>Live data temporarily unavailable.</td></tr>';
    }
}



async function loadDriverStandings() {
    try {
        const response = await fetch(DRIVERS_URL);
        const data = await response.json();
        
        const table = data.MRData.StandingsTable;
        const listContainer = table.StandingsLists ? table.StandingsLists[0] : table.StandingsList[0];
        const standings = listContainer.DriverStandings;
        
        const tbody = document.getElementById('drivers-preview');
        if (tbody) {
            tbody.innerHTML = ''; 
            standings.slice(0, 5).forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.position}</td>
                    <td><strong>${item.Driver.givenName} ${item.Driver.familyName}</strong></td>
                    <td class="team-name">${item.Constructors[0].name}</td>
                    <td class="points">${item.points} pts</td>
                `;
                tbody.appendChild(row);
            });
        }

        generatePollGrid(standings);

    } catch (error) {
        console.error('Drivers error:', error);
        const tbody = document.getElementById('drivers-preview');
        if (tbody) tbody.innerHTML = '<tr><td>Live data temporarily unavailable.</td></tr>';
    }
}

function generatePollGrid(standings) {
    const container = document.getElementById('poll-container');
    if (!container) return;

    const drivers = standings.map(item => `${item.Driver.givenName} ${item.Driver.familyName}`);
    drivers.sort((a, b) => a.split(' ')[1].localeCompare(b.split(' ')[1]));

    container.innerHTML = ''; 

    drivers.forEach(driverName => {
        const btn = document.createElement('button');
        btn.className = 'poll-btn';
        btn.innerText = driverName;
        btn.onclick = () => selectDriver(driverName);
        container.appendChild(btn);
    });
}

function selectDriver(driverName) {
    const container = document.getElementById('poll-container');
    if (!container) return;


    container.removeAttribute('class'); 
    container.className = 'vote-confirmation';
    container.innerHTML = `
        <h3>🏁 SELECTION CONFIRMED</h3>
        <p>You have successfully selected <strong>${driverName.toUpperCase()}</strong> as your Favorite Driver.</p>
        <button class="poll-btn" style="margin-top: 15px; font-size: 0.7rem; border-color: #666;" onclick="location.reload()">Vote again</button>
    `;
}

async function loadCountdown() {
    try {
        const response = await fetch(RACES_URL);
        const data = await response.json();
        const races = data.MRData.RaceTable.Races;
        const now = new Date();
        
        let nextRaceIndex = races.findIndex(r => new Date(r.date) > now);
        if (nextRaceIndex === -1) nextRaceIndex = races.length - 1;
        let nextRace = races[nextRaceIndex];

        document.getElementById("race-name").innerText = nextRace.raceName.toUpperCase();
        document.getElementById("race-circuit").innerText = `🏁 ${nextRace.Circuit.circuitName}`;
        document.getElementById("race-date").innerText = new Date(nextRace.date).toLocaleDateString("en-US", { day: 'numeric', month: 'long', year: 'numeric' });

        
        const circuitId = nextRace.Circuit.circuitId;
        const trackPlaceholder = document.getElementById("race-circuit");
        
        if (trackPlaceholder) {
            let mapImg = document.getElementById("track-map-img");
            if (!mapImg) {
                mapImg = document.createElement("img");
                mapImg.id = "track-map-img";
                mapImg.className = "track-map-img";
                trackPlaceholder.parentNode.insertBefore(mapImg, trackPlaceholder.nextSibling);
            }
            mapImg.src = `https://raw.githubusercontent.com/bacinger/f1-circuits/master/svg/${circuitId}.svg`;
            mapImg.alt = `${nextRace.Circuit.circuitName} map`;
            
            mapImg.onerror = function() { this.style.display = 'none'; };
        }

        const target = new Date(`${nextRace.date}T${nextRace.time || "14:00:00Z"}`);
        
        setInterval(() => {
            const diff = target - new Date();
            if (diff <= 0) return;

            document.getElementById("days").innerText = Math.floor(diff / 86400000).toString().padStart(2, '0');
            document.getElementById("hours").innerText = Math.floor((diff % 86400000) / 3600000).toString().padStart(2, '0');
            document.getElementById("minutes").innerText = Math.floor((diff % 3600000) / 60000).toString().padStart(2, '0');
            document.getElementById("seconds").innerText = Math.floor((diff % 60000) / 1000).toString().padStart(2, '0');
        }, 1000);

       
        const calendarContainer = document.getElementById('calendar-preview-container');
        if (calendarContainer) {
            calendarContainer.innerHTML = ''; 
            
            const upcomingRaces = races.slice(nextRaceIndex + 1, nextRaceIndex + 4);
            
            if (upcomingRaces.length === 0) {
                calendarContainer.innerHTML = '<p style="color: #bbb;">No more races scheduled for this season.</p>';
                return;
            }

            upcomingRaces.forEach(race => {
                const card = document.createElement('div');
                card.className = 'race-card';
                
                const raceDate = new Date(race.date).toLocaleDateString("en-US", { 
                    day: 'numeric', 
                    month: 'short', 
                    year: 'numeric' 
                });

                card.innerHTML = `
                    <div>
                        <div class="round">ROUND ${race.round}</div>
                        <h3>${race.raceName.replace("Grand Prix", "GP")}</h3>
                        <div class="locality">📍 ${race.Circuit.Location.locality}, ${race.Circuit.Location.country}</div>
                    </div>
                    <div class="date-box">📅 ${raceDate}</div>
                `;
                calendarContainer.appendChild(card);
            });
        }

    } catch (error) {
        console.error('Countdown/Calendar error:', error);
        const calendarContainer = document.getElementById('calendar-preview-container');
        if (calendarContainer) calendarContainer.innerHTML = '<p style="color: #666;">Calendar temporary unavailable.</p>';
    }
}

async function loadLastRaceResults() {
    try {
        const response = await fetch("https://api.jolpi.ca/ergast/f1/current/last/results.json");
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        const raceInfo = data.MRData.RaceTable.Races[0];
        
        if (!raceInfo || !raceInfo.Results) {
            throw new Error("No race results found in the response");
        }
        
        const results = raceInfo.Results;

        const cleanRaceName = raceInfo.raceName.toUpperCase().replace("GRAND PRIX", "GP");
        const titleEl = document.getElementById("last-race-title");
        if (titleEl) {
            titleEl.innerText = `${cleanRaceName} RESULTS`;
        }

        const container = document.getElementById("recent-results-container");
        if (container) {
            container.innerHTML = ""; 

            
            const topFive = results.slice(0, 10);

            topFive.forEach(result => {
                const tr = document.createElement("tr");
                
                const driverName = `${result.Driver.givenName} ${result.Driver.familyName}`;
                const teamName = result.Constructor.name;
                
                tr.innerHTML = `
                    <td class="position" style="font-weight: bold; color: #e10600; width: 80px;">${result.position}</td>
                    <td class="driver-name">
                        <strong>${result.Driver.familyName.toUpperCase()}</strong> 
                        <span style="font-size: 0.85rem; color: #bbb;">${result.Driver.givenName}</span>
                    </td>
                    <td class="team">${teamName}</td>
                    <td class="points" style="text-align: left; font-weight: bold;">${result.points} pts</td>
                `;
                
                container.appendChild(tr);
            });
        }
    } catch (error) {
        console.error("Error loading last race results:", error);
        const container = document.getElementById("recent-results-container");
        if (container) {
            container.innerHTML = `<tr><td colspan="4" style="text-align: center; color: #bbbbbb;">Results temporarily unavailable.</td></tr>`;
        }
    }
}

/* JavaScript: Vlož do script.js */
document.addEventListener("DOMContentLoaded", () => {
    fetchDrivers2026();
    setupModalClose();
});

async function fetchDrivers2026() {
    const gridContainer = document.getElementById("index-drivers-grid");
    
    try {
        const response = await fetch("https://api.jolpi.ca/ergast/f1/2026/driverstandings.json");
        const data = await response.json();
        
        const standingsTable = data.MRData.StandingsTable;
        if (!standingsTable || standingsTable.StandingsLists.length === 0) {
            gridContainer.innerHTML = `<p style="color: #e10600;">Data for 2026 is not available.</p>`;
            return;
        }

        const driversList = standingsTable.StandingsLists[0].DriverStandings;
        renderDriversGrid(driversList);

    } catch (error) {
        console.error("API error:", error);
        gridContainer.innerHTML = `<p style="color: #e10600;">Failed to load driver data.</p>`;
    }
}

function renderDriversGrid(driversList) {
    const gridContainer = document.getElementById("index-drivers-grid");
    gridContainer.innerHTML = ""; 

    driversList.forEach(item => {
        const driver = item.Driver;
        const constructor = item.Constructors ? item.Constructors[0] : { name: "N/A" };
        const teamName = constructor.name;
        const points = item.points;
        const position = item.position;

        const card = document.createElement("div");
        card.className = "driver-card-simple";

        card.onclick = () => {
            openModal(driver, teamName, points, position);
        };

        card.innerHTML = `
            <div class="driver-info">
                <h3>${driver.givenName} <strong>${driver.familyName}</strong></h3>
                <p>${teamName}</p>
                <span class="driver-num">#${driver.permanentNumber || ""}</span>
            </div>
        `;

        gridContainer.appendChild(card);
    });
}

function openModal(driver, teamName, points, position) {
    const overlay = document.getElementById("driver-modal-overlay");
    const contentBox = document.getElementById("driver-modal-content");

    overlay.style.display = "flex";

    contentBox.innerHTML = `
        <h2 style="margin-top: 0; color: #fff;">${driver.givenName} ${driver.familyName}</h2>
        <p style="color: #e10600; text-transform: uppercase; font-weight: bold; font-size: 14px; margin-bottom: 20px;">${teamName}</p>
        
        <div class="modal-stat-row">
            <span>Car Number</span>
            <strong>#${driver.permanentNumber || "N/A"}</strong>
        </div>
        <div class="modal-stat-row">
            <span>Championship Position</span>
            <strong>P${position}</strong>
        </div>
        <div class="modal-stat-row">
            <span>Points</span>
            <strong>${points} PTS</strong>
        </div>
        <div class="modal-stat-row">
            <span>Nationality</span>
            <strong>${driver.nationality}</strong>
        </div>
        <div class="modal-stat-row" style="border-bottom: none;">
            <span>Date of Birth</span>
            <strong>${driver.dateOfBirth}</strong>
        </div>
    `;
}

function setupModalClose() {
    const overlay = document.getElementById("driver-modal-overlay");
    const closeBtn = document.getElementById("modal-close-btn");

    closeBtn.onclick = () => {
        overlay.style.display = "none";
    };

    window.onclick = (event) => {
        if (event.target === overlay) {
            overlay.style.display = "none";
        }
    };
}

document.addEventListener("DOMContentLoaded", () => {
    fetchStatusTrivia();
});

async function fetchStatusTrivia() {
    const triviaContainer = document.getElementById("status-trivia-grid");
    
    try {
        // Stáhneme výsledky posledních závodů roku 2026
        const response = await fetch("https://api.jolpi.ca/ergast/f1/2026/results.json?limit=1000");
        const data = await response.json();
        
        const races = data.MRData.RaceTable.Races;
        if (!races || races.length === 0) {
            triviaContainer.innerHTML = `<p style="color: #888896;">No race data available yet for 2026.</p>`;
            return;
        }

        let totalFinishes = 0;
        let totalRetirements = 0;
        let engineFailures = 0;
        let accidentsOrCollisions = 0;
        let totalEntries = 0;

        // Projdeme všechny závody a všechny výsledky
        races.forEach(race => {
            race.Results.forEach(result => {
                totalEntries++;
                const status = result.status;

                // Vyhodnocení statusu
                if (status === "Finished") {
                    totalFinishes++;
                } else if (status.includes("Engine") || status.includes("Power Unit")) {
                    engineFailures++;
                    totalRetirements++;
                } else if (status.includes("Accident") || status.includes("Collision")) {
                    accidentsOrCollisions++;
                    totalRetirements++;
                } else {
                    totalRetirements++; // Ostatní typy odstoupení (Gearbox, Electrical, atd.)
                }
            });
        });

        // Výpočet procenta dojetí do cíle
        const finishPercentage = totalEntries > 0 ? ((totalFinishes / totalEntries) * 100).toFixed(1) : 0;

        // Vykreslení karet se zajímavostmi na index
        triviaContainer.innerHTML = `
            <div class="trivia-card">
                <h3>Reliability Rate</h3>
                <p class="trivia-number">${finishPercentage}%</p>
                <span class="trivia-desc">Of all car entries successfully crossed the finish line.</span>
            </div>
            <div class="trivia-card">
                <h3>Total Retirements</h3>
                <p class="trivia-number">${totalRetirements}</p>
                <span class="trivia-desc">Combined technical failures and race incidents so far.</span>
            </div>
            <div class="trivia-card">
                <h3>Power Unit Issues</h3>
                <p class="trivia-number">${engineFailures}</p>
                <span class="trivia-desc">Total engine or power unit related breakdowns.</span>
            </div>
            <div class="trivia-card">
                <h3>Accidents & Crashes</h3>
                <p class="trivia-number">${accidentsOrCollisions}</p>
                <span class="trivia-desc">Incidents ending up in walls or collisions.</span>
            </div>
        `;

    } catch (error) {
        console.error("Error loading status trivia:", error);
        triviaContainer.innerHTML = `<p style="color: #e10600;">Failed to load trivia insights.</p>`;
    }
}
