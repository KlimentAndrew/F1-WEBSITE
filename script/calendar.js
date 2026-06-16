document.addEventListener("DOMContentLoaded", () => {
    loadCalendar();
});

const circuitSpecs = {
    "albert_park": { length: "5.278 km", laps: 58, firstGp: "1996" },
    "shanghai": { length: "5.451 km", laps: 56, firstGp: "2004" },
    "suzuka": { length: "5.807 km", laps: 53, firstGp: "1987" },
    "bahrain": { length: "5.412 km", laps: 57, firstGp: "2004" },
    "jeddah": { length: "6.174 km", laps: 50, firstGp: "2021" },
    "miami": { length: "5.412 km", laps: 57, firstGp: "2022" },
    "monaco": { length: "3.337 km", laps: 78, firstGp: "1950" },
    "catalunya": { length: "4.657 km", laps: 66, firstGp: "1991" },
    "villeneuve": { length: "4.361 km", laps: 70, firstGp: "1978" },
    "red_bull_ring": { length: "4.318 km", laps: 71, firstGp: "1970" },
    "silverstone": { length: "5.891 km", laps: 52, firstGp: "1950" },
    "hungaroring": { length: "4.381 km", laps: 70, firstGp: "1986" },
    "spa": { length: "7.004 km", laps: 44, firstGp: "1950" },
    "zandvoort": { length: "4.259 km", laps: 72, firstGp: "1952" },
    "monza": { length: "5.793 km", laps: 53, firstGp: "1950" },
    "baku": { length: "6.003 km", laps: 51, firstGp: "2016" },
    "marina_bay": { length: "4.940 km", laps: 62, firstGp: "2008" },
    "americas": { length: "5.513 km", laps: 56, firstGp: "2012" },
    "rodriguez": { length: "4.304 km", laps: 71, firstGp: "1963" },
    "interlagos": { length: "4.309 km", laps: 71, firstGp: "1973" },
    "las_vegas": { length: "6.201 km", laps: 50, firstGp: "1981" },
    "losail": { length: "5.419 km", laps: 57, firstGp: "2021" },
    "yas_marina": { length: "5.281 km", laps: 58, firstGp: "2009" }
};

const teamColors = {
    "red_bull": "#1d2a4a",
    "ferrari": "#e10600",
    "mercedes": "#00d2be",
    "mclaren": "#ff8700",
    "sauber": "#52e252",
    "alpine": "#ff4096",
    "williams": "#00a3e0",
    "rb": "#6692ff",
    "haas": "#b6babd",
    "aston_martin": "#229971"
};



function getFileNameByCountry(country) {

    

    const mapping = {
        "Australia": "Australia",
        "China": "China",
        "Japan": "Suzuka",
        "Bahrain": "Bahrain",
        "Saudi Arabia": "Saudi-Arabia",
        "USA": "Miami",
        "Monaco": "Monaco",
        "Spain": "Barcelona",
        "Canada": "Canada",
        "Austria": "Austria",
        "UK": "Britian", 
        "Hungary": "Hungary",
        "Belgium": "Belgium",
        "Netherlands": "Zandvoort",
        "Italy": "Monza",
        "Spain": "Madrid",
        "Azerbaijan": "Azerbaijan",
        "Singapore": "Singapore",
        "Mexico": "Mexico",
        "Brazil": "Brazil",
        "United States": "COTA",
        "Las Vegas": "Las-Vegas",
        "Qatar": "Qatar",
        "UAE": "Abu-Dhabi"
    };
    return mapping[country] || country;
}

async function loadCalendar() {
    try {
        const response = await fetch("https://api.jolpi.ca/ergast/f1/current.json");
        const data = await response.json();
        
        const races = data.MRData.RaceTable.Races;
        const calendarContainer = document.getElementById("calendar-table-body");
        calendarContainer.innerHTML = ""; 

        const today = new Date();

        races.forEach(race => {
            const circuitId = race.Circuit.circuitId;
            const country = race.Circuit.Location.country;
            const fileName = getFileNameByCountry(country);
            const specs = circuitSpecs[circuitId] || { length: "N/A", laps: "N/A", firstGp: "N/A" };

            const raceDate = new Date(race.date);
            const isPastRace = raceDate < today;

            const formattedDate = raceDate.toLocaleDateString("cs-CZ", {
                day: "2-digit", month: "2-digit", year: "numeric"
            });

            const imgPath = `images/tracks/${fileName}.svg`;

            const mainRow = document.createElement("tr");
            mainRow.classList.add("race-row");
            mainRow.innerHTML = `
                <td><strong>R${race.round}</strong></td>
                <td class="track-mini-cell">
                    <img src="${imgPath}" class="track-mini" alt="📍" onerror="this.src='/images/tracks/${fileName}.svg'; this.onerror=null;">
                </td>
                <td><strong>${race.raceName}</strong></td>
                <td style="color: #aaa;">${race.Circuit.circuitName}, <span style="color: #666;">${race.Circuit.Location.locality}</span></td>
                <td class="points">${formattedDate}</td>
            `;

            const detailRow = document.createElement("tr");
            detailRow.classList.add("detail-row");
            detailRow.style.display = "none"; 
            
            detailRow.innerHTML = `
                <td colspan="5" style="background-color: #09090d; padding: 25px; border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <div class="detail-container">
                        <div class="detail-image-box">
                            <img src="${imgPath}" class="track-large" alt="Circuit Layout" onerror="this.src='/images/tracks/${fileName}.svg'; this.onerror=null;">
                        </div>
                        <div class="detail-info-box">
                            <h4 style="color: #515151; margin-bottom: 12px; font-size: 25px; letter-spacing: 0.5px;">CIRCUIT DETAILS</h4>
                            <table class="specs-table">
                                <tr><td>First Grand Prix:</td><td>${specs.firstGp}</td></tr>
                                <tr><td>Number of Laps:</td><td>${specs.laps}</td></tr>
                                <tr><td>Circuit Length:</td><td>${specs.length}</td></tr>
                            </table>
                        </div>
                    </div>
                    <div class="podium-section" id="podium-r${race.round}" style="display: none;">
                        <h4 style="color: #ffffff; font-size: 13px; margin: 20px 0 10px 0; letter-spacing: 1px;">RACE PODIUM</h4>
                        <div class="podium-grid" id="podium-grid-r${race.round}"></div>
                    </div>
                </td>
            `;

            mainRow.addEventListener("click", async () => {
                const isHidden = detailRow.style.display === "none";
                
                document.querySelectorAll(".detail-row").forEach(r => r.style.display = "none");
                document.querySelectorAll(".race-row").forEach(r => r.classList.remove("active-row"));

                if (isHidden) {
                    detailRow.style.display = "table-row";
                    mainRow.classList.add("active-row");

                    if (isPastRace) {
                        const podiumGrid = document.getElementById(`podium-grid-r${race.round}`);
                        const podiumSection = document.getElementById(`podium-r${race.round}`);
                        
                        if (podiumGrid.children.length === 0) {
                            try {
                                const res = await fetch(`https://api.jolpi.ca/ergast/f1/2026/${race.round}/results.json`);
                                const resData = await res.json();
                                
                                const raceInfo = resData.MRData.RaceTable.Races[0];
                                const results = raceInfo ? raceInfo.Results : null;

                                if (results && results.length >= 3) {
                                    podiumSection.style.display = "block";
                                    podiumGrid.innerHTML = ""; 

                                    for (let i = 0; i < 3; i++) {
                                        const driver = results[i];
                                        const posLabel = i === 0 ? "1ST" : i === 1 ? "2ND" : "3RD";
                                        
                                        const teamId = driver.Constructor.constructorId;
                                        const teamColor = teamColors[teamId] || "#44444f";

                                        let timeOrGap = "";
                                        if (i === 0) {
                                            timeOrGap = driver.Time ? driver.Time.time : "WINNER";
                                        } else {
                                            timeOrGap = driver.Time ? driver.Time.time : `+${driver.laps} Laps`;
                                        }

                                        podiumGrid.innerHTML += `
                                            <div class="podium-card" style="border-left: 4px solid ${teamColor};">
                                                <div class="podium-pos">${posLabel}</div>
                                                <div class="podium-driver">
                                                    <strong>${driver.Driver.code || driver.Driver.familyName.substring(0,3).toUpperCase()}</strong>
                                                    <span style="font-size: 15px; color: ${teamColor}; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">${driver.Constructor.name}</span>
                                                    <span>${timeOrGap}</span>
                                                </div>
                                            </div>
                                        `;
                                    }
                                }
                            } catch (err) {
                                console.log("Výsledky zatím nedostupné.");
                            }
                        } else {
                            podiumSection.style.display = "block";
                        }
                    }
                } else {
                    detailRow.style.display = "none";
                }
            });

            calendarContainer.appendChild(mainRow);
            calendarContainer.appendChild(detailRow);
        });

    } catch (error) {
        console.error("Chyba:", error);
    }
}