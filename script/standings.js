const DRIVERS_URL = 'https://api.jolpi.ca/ergast/f1/current/driverStandings.json';
const TEAMS_URL = 'https://api.jolpi.ca/ergast/f1/current/constructorStandings.json';
const RACES_URL = 'https://api.jolpi.ca/ergast/f1/current.json';
const LAST_RESULTS_URL = "https://api.jolpica.io/f1/current/last/results.json";


document.addEventListener("DOMContentLoaded", () => {
    // Kontrola, zda jsme na podstránce standings.html (podle přítomnosti ID v HTML)
    if (document.getElementById("drivers-full-standings")) {
        loadFullStandings();
    }
});

async function loadFullStandings() {
    try {
        // Načtení dat pro jezdce i konstruktéry najednou
        const [driversResponse, constructorsResponse] = await Promise.all([
            fetch(DRIVERS_URL),
            fetch(TEAMS_URL)
        ]);

        const driversData = await driversResponse.json();
        const constructorsData = await constructorsResponse.json();

        // 1. VYKRESLENÍ JEZDCŮ
        const driverList = driversData.MRData.StandingsTable.StandingsLists[0].DriverStandings;
        const driversContainer = document.getElementById("drivers-full-standings");
        driversContainer.innerHTML = ""; // Smaže text "Loading..."

        driverList.forEach(item => {
            const row = document.createElement("tr");
            const isLeader = item.position === "1";
            const posContent = isLeader ? ` ${item.position}` : item.position;
            const nameStyle = isLeader ? `style="color: #D3AF37;"` : "";
            row.innerHTML = `
                <td>${posContent}</td>
                <td><strong ${nameStyle}>${item.Driver.givenName} ${item.Driver.familyName}</strong></td>
                <td style="color: #888;">${item.Constructors[0].name}</td>
                <td class="points">${item.points} pts</td>
            `;
            driversContainer.appendChild(row);
        });
        

        // 2. VYKRESLENÍ KONSTRUKTÉRŮ
        const constructorList = constructorsData.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
        const constructorsContainer = document.getElementById("constructors-full-standings");
        constructorsContainer.innerHTML = ""; // Smaže text "Loading..."

        constructorList.forEach(item => {
            const row = document.createElement("tr");
            
            // 1. Zkontrolujeme, zda jde o první místo v poháru konstruktérů
            const isLeader = item.position === "1";
            
            // 2. Pokud ano, přidáme pohár, jinak necháme jen číslo pozice
            const posContent = isLeader ? ` ${item.position}` : item.position;
            
            // 3. Pokud ano, obarvíme název týmu na červeno, jinak nic
            const nameStyle = isLeader ? `style="color: #D3AF37;"` : "";

            // 4. Vygenerujeme řádek s proměnnými a třídou pro body
            row.innerHTML = `
                <td>${posContent}</td>
                <td><strong ${nameStyle}>${item.Constructor.name}</strong></td>
                <td class="points">${item.points} pts</td>
            `;
            constructorsContainer.appendChild(row);
        });

    } catch (error) {
        console.error("Chyba při načítání šampionátu:", error);
        const errorRow = `<tr><td colspan="4" style="color: #e10600; text-align:center;">Failed to load data.</td></tr>`;
        if (document.getElementById("drivers-full-standings")) {
            document.getElementById("drivers-full-standings").innerHTML = errorRow;
            document.getElementById("constructors-full-standings").innerHTML = errorRow;
        }
    }
}