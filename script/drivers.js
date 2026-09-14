document.addEventListener("DOMContentLoaded", () => {
    fetchAndRenderDriversGrid();
    
    document.getElementById("back-to-grid-btn").addEventListener("click", () => {
        document.getElementById("driver-detail-view").style.display = "none";
        document.getElementById("drivers-grid-section").style.display = "block";
    });
});

async function fetchAndRenderDriversGrid() {
    const gridContainer = document.getElementById("drivers-grid");
    
    try {
        const response = await fetch("https://api.jolpi.ca/ergast/f1/2026/driverstandings.json");
        const data = await response.json();
        
        const standingsList = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
        gridContainer.innerHTML = "";

        standingsList.forEach(item => {
            const driver = item.Driver;
            const constructor = item.Constructors ? item.Constructors[0] : { name: "N/A" };
            
            const card = document.createElement("div");
            card.className = "driver-card";
            card.innerHTML = `
                <h3>${driver.givenName} <strong>${driver.familyName}</strong></h3>
                <p>${constructor.name}</p>
                <span class="driver-card-num">#${driver.permanentNumber || "--"}</span>
            `;

            card.addEventListener("click", () => {
                showDriverDetail(item, constructor.name);
            });

            gridContainer.appendChild(card);
        });

    } catch (error) {
        console.error("Error loading drivers:", error);
        gridContainer.innerHTML = `<p style="color: #e10600;">Failed to load driver data.</p>`;
    }
}

function showDriverDetail(item, teamName) {
    const driver = item.Driver;

    document.getElementById("drivers-grid-section").style.display = "none";
    document.getElementById("driver-detail-view").style.display = "block";

    // Dvouřádkové jméno (tenké křestní nahoře, velké tučné příjmení dole)
    document.getElementById("detail-name").innerHTML = `
        <span class="given-name">${driver.givenName}</span>
        <span>${driver.familyName}</span>
    `;
    
    document.getElementById("detail-meta").innerText = `${driver.nationality} • ${teamName} • #${driver.permanentNumber || "--"}`;
    document.getElementById("detail-watermark").innerText = driver.permanentNumber || "--";

    // Načtení fotky v .avif formátu
    const driverImg = document.getElementById("detail-driver-img");
    const driverKey = driver.familyName
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z]/g, "");

    const imagePath = `../images/drivers/${driverKey}.avif`;
    driverImg.src = imagePath;
    driverImg.onerror = () => {
        driverImg.style.display = "none";
    };
    driverImg.style.display = "block";

    // Týmové barvy a přechody
    const banner = document.getElementById("driver-profile-banner");
    let teamColor = "#e10600";
    let gradientBg = "linear-gradient(135deg, #000000 10%, #e10600 100%)";

    const lowerTeam = teamName.toLowerCase();
    if (lowerTeam.includes("ferrari")) {
        teamColor = "#e10600";
        gradientBg = "linear-gradient(135deg, #000000 10%, #e10600 100%)";
    } else if (lowerTeam.includes("mercedes")) {
        teamColor = "#00d2be";
        gradientBg = "linear-gradient(135deg, #000000 10%, #00d2be 100%)";
    } else if (lowerTeam.includes("red bull")) {
        teamColor = "#0d3cb3";
        gradientBg = "linear-gradient(135deg, #000000 10%, #1d2a4a 100%)";
    } else if (lowerTeam.includes("mclaren")) {
        teamColor = "#ff8000";
        gradientBg = "linear-gradient(135deg, #000000 10%, #ff8000 100%)";
    } else if (lowerTeam.includes("aston martin")) {
        teamColor = "#229971";
        gradientBg = "linear-gradient(135deg, #000000 10%, #229971 100%)";
    } else if (lowerTeam.includes("alpine")) {
        teamColor = "#ff4096";
        gradientBg = "linear-gradient(135deg, #000000 10%, #ff4096 100%)";
    } else if (lowerTeam.includes("haas")) {
        teamColor = "#8b8c8d";
        gradientBg = "linear-gradient(135deg, #000000 10%, #8b8c8d 100%)";
    } else if (lowerTeam.includes("rb")) {
        teamColor = "#2f67f6";
        gradientBg = "linear-gradient(135deg, #000000 10%, #2f67f6 100%)";
    } else if (lowerTeam.includes("williams")) {
        teamColor = "#00a3e0";
        gradientBg = "linear-gradient(135deg, #000000 10%, #00a3e0 100%)";
    } else if (lowerTeam.includes("cadillac")) {
        teamColor = "#fefefe";
        gradientBg = "linear-gradient(135deg, #000000 10%, #fefefe 100%)";
    } else if (lowerTeam.includes("audi")) {
        teamColor = "#ab0a0a";
        gradientBg = "linear-gradient(135deg, #000000 10%, #ab0a0a 100%)";
    }

    banner.style.setProperty('--team-color', teamColor);
    banner.style.background = gradientBg;

    // Statistiky a životopis
    document.getElementById("stat-num").innerText = `#${driver.permanentNumber || "N/A"}`;
    document.getElementById("stat-pos").innerText = `P${item.position}`;
    document.getElementById("stat-points").innerText = `${item.points} PTS`;
    document.getElementById("stat-nationality").innerText = driver.nationality;
    document.getElementById("stat-dob").innerText = driver.dateOfBirth;

    document.getElementById("detail-bio").innerHTML = `
        <p><strong>${driver.givenName} ${driver.familyName}</strong> is competing in the 2026 FIA Formula One World Championship, representing <strong>${teamName}</strong>.</p>
        <p>Born on ${driver.dateOfBirth} in ${driver.nationality}, ${driver.givenName} drives under the permanent racing number <strong>#${driver.permanentNumber || "N/A"}</strong>.</p>
        <p>Throughout the 2026 season, ${driver.familyName} aims to maximize performance on track, contributing vital technical feedback and fighting for top positions in the championship standings.</p>
    `;

    window.scrollTo({ top: 0, behavior: 'smooth' });
}