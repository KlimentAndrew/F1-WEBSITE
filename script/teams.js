document.addEventListener("DOMContentLoaded", () => {
    fetchAndRenderTeamsGrid();
    
    document.getElementById("back-to-teams-btn").addEventListener("click", () => {
        document.getElementById("team-detail-view").style.display = "none";
        document.getElementById("teams-grid-section").style.display = "block";
    });
});

const teamDetailsData = {
    "ferrari": {
        fullName: "Scuderia Ferrari HP",
        base: "Maranello, Italy",
        principal: "Frédéric Vasseur",
        powerUnit: "Ferrari V6 Turbo Hybrid (2026 Spec)",
        titles: "16 Constructors' Championships",
        color: "#e10600",
        gradientBg: "linear-gradient(135deg, #000000 1%, #e10600 100%)",
        drivers: [
            { name: "Charles LECLERC", number: "#16" },
            { name: "Lewis HAMILTON", number: "#44" }
        ],
        historyHtml: `
            <h1>SCUDERIA FERRARI: THE ULTIMATE HISTORY OF A FORMULA ONE PHENOMENON</h1>
            <p>Scuderia Ferrari is the oldest, most successful, and most iconic racing team in Formula One history, cementing an unmatched legacy since the sport's inception. Founded by the legendary Enzo Ferrari, the Maranello-based team has become the ultimate global symbol of motorsport passion and excellence. With a record-breaking 16 Constructors' Championships and 15 Drivers' Championships, the "Prancing Horse" remains the only team to have competed in every single era of the world championship, rewriting the history books across eight decades.</p>
            <h2>FOUNDING AND THE RACING DNA</h2>
            <p>The story of Ferrari began long before the creation of the Formula One World Championship. Enzo Ferrari, a former racing driver himself, founded the Scuderia in 1929 in Modena, Italy, originally to prepare and race Alfa Romeo cars for wealthy gentlemen drivers. Enzo’s DNA was entirely flush with a fiery passion for racing. For him, selling road cars was merely a necessary chore to fund his true love: the racing team. When the Formula One World Championship was created in 1950, Ferrari was right there at the starting grid, establishing a culture of fierce determination and mechanical perfection that would define the sport.</p>
            <h2>THE EARLY GLORY AND FIRST CHAMPIONS</h2>
            <p>Ferrari did not have to wait long to taste ultimate success at the pinnacle of motorsport. José Froilán González secured the team's historic first-ever Formula One victory at the 1951 British Grand Prix. The following year, Alberto Ascari dominated the field to become Ferrari’s first World Drivers' Champion, a feat he repeated in 1953. Throughout the 1950s and 1960s, legendary drivers like Juan Manuel Fangio, Mike Hawthorn, and John Surtees steered the scarlet cars to championship glory, cementing Ferrari's status as a dominant powerhouse despite the constant underlying danger of the era.</p>
            <h2>THE NIKI LAUDA ERA AND REBOUND TO THE TOP</h2>
            <p>After a slump in the late 1960s and early 1970s, Ferrari underwent a massive restructuring that brought the team back to the top. The arrival of a clinical, analytical young Austrian driver named Niki Lauda completely transformed the team's trajectory. Lauda won world titles in 1975 and 1977, displaying incredible resilience by returning to the cockpit just weeks after a near-fatal crash at the Nürburgring in 1976. Alongside teammate Jody Scheckter, who won the drivers' title in 1979, Ferrari dominated the late 70s before entering a prolonged, dramatic twenty-year championship drought.</p>
            <h2>THE SCHUMACHER GOLDEN ERA AND TOTAL DOMINANCE</h2>
            <p>The turn of the millennium marked the greatest era of total dominance ever seen in motorsport history. Ferrari built a dream team led by Jean Todt, technical genius Ross Brawn, and the peerless Michael Schumacher. From 2000 to 2004, Schumacher smashed every existing record, winning five consecutive Drivers' Championships. Ferrari became an unstoppable machine, characterized by flawless strategy, bulletproof reliability, and Schumacher's relentless speed. This golden era yielded six consecutive Constructors' titles and firmly established Ferrari as an unrivaled empire.</p>
            <h2>THE MODERN QUEST FOR GLORY</h2>
            <p>Following Kimi Räikkönen’s dramatic world title triumph in 2007 and the team's last Constructors' title in 2008, Ferrari entered a challenging modern era. Despite fielding all-time greats like Fernando Alonso and Sebastian Vettel, the team repeatedly finished as runners-up during dominant eras by Red Bull and Mercedes. The intense pressure of the Italian media and the weight of history created a highly turbulent environment, yet the team never wavered in its relentless pursuit to return to the absolute top of the podium.</p>
            <h2>A NEW CHAPTER OF RENAISSANCE</h2>
            <p>Today, Scuderia Ferrari is undergoing a major modern renaissance to reclaim its throne. Under the leadership of Team Principal Frédéric Vasseur, the team has built a formidable powerhouse. Led by the immense homegrown talent of Charles Leclerc and bolstered by the historic signing of seven-time world champion Lewis Hamilton, the Prancing Horse is armed with one of the most decorated driver lineups in history. As Formula One pushes forward into new technological frontiers, Ferrari's hunger for victory remains as fierce as it was in 1950.</p>

            <div class="team-custom-photos">
                <img src="../images/teams/ferrari1.avif" alt="Ferrari 1" onerror="this.style.display='none'">
                <img src="../images/teams/ferrari2.avif" alt="Ferrari 2" onerror="this.style.display='none'">
            </div>
        `
    },
    "red_bull": {
        fullName: "Oracle Red Bull Racing",
        base: "Milton Keynes, United Kingdom",
        principal: "Christian Horner",
        powerUnit: "Red Bull Ford Powertrains",
        titles: "6 Constructors' Championships",
        color: "#0d3cb3",
        gradientBg: "linear-gradient(135deg, #000000 1%, #0d3cb3 100%)",
        drivers: [
            { name: "Max VERSTAPPEN", number: "#3" },
            { name: "Isack HADJAR", number: "#6" }
        ],
        historyHtml: `
            <h1>RED BULL RACING: THE ULTIMATE HISTORY OF A FORMULA ONE PHENOMENON</h1>
            <p>Red Bull Racing is one of the most successful, innovative, and dominant forces in modern Formula One history, completely disrupting the traditional motorsport establishment. Founded by the energy drink tycoon Dietrich Mateschitz, the Milton Keynes-based team transformed from a high-energy marketing operation into an elite engineering powerhouse. With multiple Drivers' and Constructors' World Championships, Red Bull Racing has rewritten the pinnacle of motorsport with its aggressive tactical decisions, aerodynamic mastery, and a relentless culture of winning.</p>
            <h2>THE BEGINNING AND THE ENERGY DRINK DNA</h2>
            <p>The story of Red Bull Racing began in late 2004 when the Austrian energy drink company purchased the struggling Jaguar Racing team from Ford. While rival teams and traditionalists initially dismissed them as just a "party team" looking for media exposure, Dietrich Mateschitz had a fiercely competitive vision. He infused the team with a bold corporate DNA focused on extreme sports, youth development, and absolute technical excellence. By hiring Christian Horner as the youngest Team Principal in F1 history and convincing legendary design genius Adrian Newey to join, Red Bull laid down a rock-solid foundation for future dominance.</p>
            <h2>THE JUNIOR PROGRAM PRODIGIES AND FIRST WINS</h2>
            <p>Unlike traditional teams that relied heavily on established superstar drivers, Red Bull built a revolutionary young driver academy to scout and nurture raw talent. The investment paid off spectacularly with a young German prodigy named Sebastian Vettel. Moving through the ranks from Scuderia Toro Rosso, Vettel secured Red Bull Racing's historic first-ever pole position and race victory at the 2009 Chinese Grand Prix. It was a crystal-clear message to the entire grid that a new global powerhouse had arrived, ready to challenge the status quo.</p>
            <h2>THE VETTEL GOLDEN ERA AND FOUR DOUBLE TITLES</h2>
            <p>The turn of the decade marked the beginning of an era of absolute supremacy for the team. From 2010 to 2013, Red Bull Racing and Sebastian Vettel dominated the sport, securing four consecutive Drivers' and Constructors' World Championships. Powered by Adrian Newey's pioneering blown-diffuser aerodynamics and a relentless pursuit of qualifying speed, Vettel smashed multiple records. Despite intense political battles within the sport and a fierce rivalry with Ferrari and McLaren, Red Bull established an unrivaled empire during the V8 engine era.</p>
            <h2>THE TURBO-HYBRID STRUGGLE AND MAX VERSTAPPEN PROMOTION</h2>
            <p>When Formula One transitioned to complex V6 turbo-hybrid engines in 2014, Red Bull faced a massive uphill battle due to a lack of competitive engine power. Despite the mechanical deficit, the team maintained its reputation for building the finest aerodynamic chassis on the grid. In 2016, they made a high-stakes decision to promote a 18-year-old Max Verstappen mid-season. Verstappen shocked the world by winning his very first race for the team in Spain, injecting a fresh wave of energy and signaling the arrival of the driver who would lead their next golden generation.</p>
            <h2>THE HONDA PARTNERSHIP AND RETURN TO THE APEX</h2>
            <p>Determined to break Mercedes' long-standing monopoly, Red Bull made a strategic gamble by partnering with Honda as their engine supplier. The collaboration proved to be a masterstroke of mechanical harmony. The fruits of this labor culminated in the legendary 2021 championship battle, where Max Verstappen engaged in a season-long, wheel-to-wheel war against Lewis Hamilton. In a dramatic final-lap showdown in Abu Dhabi, Verstappen secured his first World Championship, bringing the drivers' crown back to Milton Keynes after an eight-year wait.</p>
            <h2>ERA OF TOTAL DOMINANCE AND UNBROKEN RECORDS</h2>
            <p>Following that breakthrough title, Red Bull Racing entered a period of unparalleled historical dominance under the new ground-effect technical regulations. In 2022 and 2023, the team became an unstoppable machine, with the RB19 car breaking the record for the most dominant single season in Formula One history. Verstappen shattered records for consecutive wins and total victories in a season, while teammate Sergio Perez helped secure historic 1-2 championship finishes. Through clinical strategy, bulletproof reliability, and lightning-fast pit stops, Red Bull Racing firmly cemented its legacy among the greatest legends of motorsport.</p>
            <div class="team-custom-photos">
                <img src="../images/teams/redbull1.avif" alt="Red Bull 1" onerror="this.style.display='none'">
                <img src="../images/teams/redbull2.avif" alt="Red Bull 2" onerror="this.style.display='none'">
            </div>
        `
    },
    "mercedes": {
        fullName: "Mercedes-AMG PETRONAS F1 Team",
        base: "Brackley, United Kingdom",
        principal: "Toto Wolff",
        powerUnit: "Mercedes-AMG High Performance Powertrains",
        titles: "8 Constructors' Championships",
        color: "#00d2be",
        gradientBg: "linear-gradient(135deg, #000000 1%, #00d2be 100%)",
        drivers: [
            { name: "George RUSSELL", number: "#63" },
            { name: "Kimi ANTONELLI", number: "#12" }
        ],
        historyHtml: `
            <h1>MERCEDES-AMG PETRONAS: THE ULTIMATE HISTORY OF A FORMULA ONE PHENOMENON</h1>
            <p>Mercedes-AMG Petronas is the definition of modern engineering perfection and the most dominant force of the Formula One turbo-hybrid era. Operating from Brackley and Brixworth, the German manufacturer has a rich motorsport heritage dating back to the legendary "Silver Arrows" of the 1930s and 1950s. After returning as a full works team in 2010, Mercedes constructed an absolute empire, breaking historical records with an unprecedented streak of eight consecutive Constructors' Championships and establishing a culture of relentless excellence that redefined the limits of performance.</p>
            <h2>THE SILVER ARROWS HERITAGE AND F1 RETURN</h2>
            <p>The racing DNA of Mercedes is deeply rooted in motorsport history. In the 1950s, the legendary Juan Manuel Fangio drove the iconic Silver Arrows to back-to-back world titles before Mercedes withdrew from motorsport for decades due to safety concerns. The modern resurrection began in late 2009, when Mercedes purchased the championship-winning Brawn GP team. To signal their absolute serious intent, they brought the legendary seven-time world champion Michael Schumacher out of retirement to help build the foundation, pairing him with the young, hungry Nico Rosberg under the clinical strategic leadership of Ross Brawn.</p>
            <h2>THE TURBO-HYBRID REVOLUTION AND ENGINE SUPREMACY</h2>
            <p>The turning point in modern Formula One history came in 2014 with the introduction of highly complex V6 turbo-hybrid power units. While other manufacturers struggled with the immense technological challenge, Mercedes' engine division in Brixworth delivered a masterclass in engineering, creating the most powerful and efficient engine on the grid. With Toto Wolff taking the reins as Team Principal and Niki Lauda providing invaluable guidance as non-executive chairman, the team entered the 2014 season with a mechanical advantage that shocked the paddock and triggered a historic shift in power.</p>
            <h2>THE HAMILTON-ROSBERG RIVALRY AND INNER WAR</h2>
            <p>With a car that was lightyears ahead of the competition, the battle for the World Championship became an exclusive, explosive civil war between childhood friends Lewis Hamilton and Nico Rosberg. From 2014 to 2016, the Silver Arrows engaged in a fierce, wheel-to-wheel rivalry that pushed the team to its absolute psychological limits. Hamilton secured the crown in 2014 and 2015 with his blinding raw speed, but Rosberg executed a clinical, exhausting campaign in 2016 to snatch the title before shocking the world by immediately retiring from the sport.</p>
            <h2>THE ERA of UNPRECEDENTED TOTAL DOMINANCE</h2>
            <p>Following Rosberg's sudden departure, Lewis Hamilton became the undisputed leader of the team, partnered by the reliable Valtteri Bottas. What followed was a period of flawless execution and total championship monopoly. Mercedes shattered the record books year after year, with Hamilton matching Michael Schumacher's record of seven world titles. The team became a symbol of corporate perfection, characterized by the motto "No Blame Culture." By the end of 2021, Mercedes secured their eighth consecutive Constructors' Championship, a historic feat never achieved by any other team in the history of the sport.</p>
            <h2>THE GROUND-EFFECT STRUGGLE AND ARCHITECTURAL REBOOT</h2>
            <p>When Formula One introduced radical new ground-effect aerodynamic regulations in 2022, Mercedes faced its most severe technical crisis in a decade. The team struggled immensely with severe aerodynamic bouncing ("porpoising"), ending their long championship reign. Despite the mechanical setback, the team demonstrated immense resilience. George Russell secured a brilliant victory in Brazil in 2022, and through relentless data analysis and engineering grit, the team slowly dismantled their flawed car concept, fighting their way back to the top step of the podium in the following seasons.</p>
            <h2>A NEW DAWN AND EVOLUTION FOR THE FUTURE</h2>
            <p>Today, Mercedes-AMG Petronas is entering a fascinating new chapter of its legendary history. Following the historic departure of Lewis Hamilton, the team has embraced a major structural evolution to reclaim its throne at the pinnacle of motorsport. Under the continued, fiercely competitive guidance of Toto Wolff, Brackley is nurturing a formidable new generation of technical innovation and driving talent. As Formula One prepares for yet another massive engine regulation change, the Silver Arrows remain entirely focused on a single, uncompromising goal: returning to absolute global supremacy.</p>
            <div class="team-custom-photos">
                <img src="../images/teams/mercedes1.avif" alt="Mercedes 1" onerror="this.style.display='none'">
                <img src="../images/teams/mercedes2.avif" alt="Mercedes 2" onerror="this.style.display='none'">
            </div>
            `
    },
    "mclaren": {
        fullName: "McLaren Formula 1 Team",
        base: "Woking, United Kingdom",
        principal: "Andrea Stella",
        powerUnit: "Mercedes-AMG V6 Turbo Hybrid",
        titles: "8 Constructors' Championships",
        color: "#ff8000",
        gradientBg: "linear-gradient(135deg, #000000 1%, #ff8000 100%)",
        drivers: [
            { name: "Lando NORRIS", number: "#1" },
            { name: "Oscar PIASTRI", number: "#81" }
        ],
        historyHtml: `
            <h1>MCLAREN RACING: THE ULTIMATE HISTORY OF A FORMULA ONE PHENOMENON</h1>
            <p>McLaren Racing is the second-oldest active team and one of the most successful, innovative, and deeply respected forces in Formula One history. Founded by the visionary New Zealand racer Bruce McLaren, the Woking-based outfit transformed from a small, passionate group of engineers into an avant-garde technology empire. With an illustrious legacy that includes 12 Drivers' Championships and multiple Constructors' titles, the papaya-colored team has been defined by technological pioneering, fierce rivalries, and an extraordinary capacity to reinvent itself across generations.</p>
            <h2>THE FOUNDER'S VISION AND THE PAPAYA DNA</h2>
            <p>The story of McLaren began in 1963 when Bruce McLaren, a brilliant young driver and engineer, established his own racing team. Bruce infused the operation with a unique DNA combining raw racing grit with mechanical innovation, pioneering the iconic papaya orange livery that became the team's permanent signature. Tragically, Bruce lost his life in a testing crash in 1970, but his relentless spirit lived on. Led by Teddy Mayer, the team honored its founder's legacy by securing its first-ever Formula One World Championships with Emerson Fittipaldi in 1974 and James Hunt in a legendary 1976 battle.</p>
            <h2>THE RON DENNIS REVOLUTION AND ULTRA-PERFECTION</h2>
            <p>In 1980, a clinical and fiercely ambitious team principal named Ron Dennis took control of McLaren, initiating a revolutionary era of corporate perfectionism. Dennis introduced Project Four (MP4) and pioneered the sport's very first carbon-fiber composite chassis, a technological breakthrough that transformed racing safety and performance forever. Dennis demanded an uncompromising standard of cleanliness, presentation, and engineering precision, turning the McLaren headquarters into a clinical laboratory and setting a brand-new benchmark for how a modern Formula One team must operate.</p>
            <h2>THE PROST-SENNA WAR AND TOTAL SUPREMACY</h2>
            <p>The late 1980s and early 1990s marked the most dominant and explosive era ever witnessed within a single garage. Armed with unbeatable Honda engines, McLaren paired two of the greatest drivers in history: Alain Prost and Ayrton Senna. In 1988, the team achieved near-perfection, winning an astonishing 15 out of 16 races with the iconic MP4/4. However, the immense speed of both drivers quickly ignited a bitter, wheel-to-wheel psychological war that pushed the team to its absolute absolute limits, yielding multiple world titles and defining the golden era of motorsport folklore.</p>
            <h2>THE SILVER ERA AND THE HAKKINEN-HAMILTON LEGACY</h2>
            <p>Following a transition period, McLaren forged a highly successful partnership with Mercedes-Benz, turning their cars into the famous "Silver Arrows" of the late 90s. The clinical, analytical Finnish driver Mika Häkkinen steered the team back to the absolute top, winning back-to-back world titles in 1998 and 1999 after fierce duels with Michael Schumacher. A decade later, a homegrown McLaren prodigy named Lewis Hamilton shocked the world in his rookie season and dramatically secured the 2008 World Drivers' Championship on the final corner of the final lap in Brazil.</p>
            <h2>THE MODERN REBORN AND THE PAPAYA RENAISSANCE</h2>
            <p>After a highly turbulent decade in the 2010s marked by a painful engine partnership and structural declines, McLaren underwent a profound organizational reboot. Under the energetic leadership of CEO Zak Brown and strategic mastery of Team Principal Andrea Stella, the team returned to its roots and embraced a spectacular modern renaissance. By building a state-of-the-art wind tunnel and nurturing the elite driving talents of Lando Norris and Oscar Piastri, the team aggressively clawed its way back from the back of the grid to become a dominant, race-winning powerhouse once again.</p>
            <h2>A FUTURISTIC LEGACY OF RACING PASSION</h2>
            <p>Today, McLaren Racing stands at the absolute pinnacle of technological innovation, bridging its rich heritage with the future of sustainable motorsport. From the spectacular McLaren Technology Centre in Woking, the team continues to push boundaries across aerodynamics, data science, and vehicle dynamics. Armed with one of the youngest and most formidable driver lineups on the grid, the papaya army remains completely driven by Bruce McLaren's timeless philosophy: that life is measured in achievement, not in years alone.</p>
             <div class="team-custom-photos">
                <img src="../images/teams/mclaren1.avif" alt="McLaren 1" onerror="this.style.display='none'">
                <img src="../images/teams/mclaren2.avif" alt="McLaren 2" onerror="this.style.display='none'">
            </div>
            `
    },
    "aston_martin": {
        fullName: "Aston Martin Aramco F1 Team",
        base: "Silverstone, United Kingdom",
        principal: "Mike Krack",
        powerUnit: "Honda RBPT (2026 Factory Partnership)",
        titles: "0 Championships",
        color: "#229971",
        gradientBg: "linear-gradient(135deg, #000000 1%, #229971 100%)",
        drivers: [
            { name: "Fernando ALONSO", number: "#14" },
            { name: "Lance STROLL", number: "#18" }
        ],
        historyHtml: `
            <h1>ASTON MARTIN ARAMCO: THE ULTIMATE HISTORY OF A FORMULA ONE PHENOMENON</h1>
            <p>Aston Martin Aramco is the embodiment of British luxury, racing heritage, and aggressive modern ambition in Formula One. While the historic brand first dipped its toes into the sport in the late 1950s, its modern iteration represents a high-stakes, multi-million dollar transformation spearheaded by Canadian billionaire Lawrence Stroll. Operating from a state-of-the-art technology campus in Silverstone, the team has evolved from an underdog midfield outfit into an elite, cutting-edge powerhouse designed to disrupt the traditional hierarchy and capture World Championship glory.</p>
            <h2>THE LEGENDARY GREEN HERITAGE AND EARLY ORIGINS</h2>
            <p>The racing DNA of Aston Martin is deeply intertwined with the classic era of motorsport. In 1959, the British manufacturer made its official Formula One debut with the DBR4, sporting the iconic British Racing Green livery. However, the project was short-lived as the company shifted its primary focus to sports car racing, culminating in a historic victory at the 24 Hours of Le Mans. For over six decades, the Aston Martin name remained absent from the F1 grid, left to grow into a legendary global symbol of automotive elegance, cinematic fame, and timeless high-performance engineering.</p>
            <h2>THE SILVERSTONE UNDERDOG ROOT AND TRANSITION ERAS</h2>
            <p>The physical DNA of the modern Aston Martin team actually traces back to one of the most beloved underdog operations in F1 history: Jordan Grand Prix, founded in 1991. Operating from the Silverstone factory across from the legendary circuit, this specific entry evolved through multiple corporate identities over three decades, including Midland, Spyker, and Force India. Despite severe financial constraints, the team became famous for its incredible efficiency, repeatedly punching above its weight, scoring shocking podiums, and securing a famous victory with Sergio Perez under the Racing Point banner in 2020.</p>
            <h2>THE STROLL REVOLUTION AND THE BILLION-DOLLAR VISION</h2>
            <p>The turning point that transformed the team's trajectory came when a consortium led by Lawrence Stroll purchased the operation. Stroll injected unprecedented financial backing and officially rebranded the team as Aston Martin for the 2021 season, bringing the legendary British Racing Green back to the grid. Stroll established an uncompromising master plan for global supremacy, bankrolling the construction of a revolutionary, 400,000-square-foot smart factory and hiring top-tier engineering talents from rival teams to build a championship-winning infrastructure.</p>
            <h2>THE ALONSO EFFECT AND THE HYPER-DRIVE PODIUM SURGE</h2>
            <p>To accelerate their ascent to the absolute apex of the sport, Aston Martin made a blockbuster signing by bringing in two-time World Champion Fernando Alonso for the 2023 season. The pairing yielded immediate, electrifying results. The team shocked the entire paddock by engineering a massive performance leap, with Alonso piloting the AMR23 to a stunning string of podium finishes in the early part of the season. Partnered with Lance Stroll, Alonso's relentless drive and aggressive racing style firmly established Aston Martin as a genuine, front-running threat to the established elite.</p>
            <h2>THE NEWEY MASTERSTROKE AND MECHANICAL AUTONOMY</h2>
            <p>Determined to break through the final glass ceiling, Aston Martin secured the most coveted signature in motorsport history by signing legendary design genius Adrian Newey. Alongside this structural coup, the team finalized a blockbuster works engine partnership with Honda, set to take effect for the massive regulation change. These high-profile moves signaled the end of Aston Martin's reliance on customer components, giving the Silverstone-based squad complete mechanical autonomy and the ultimate weapon to engineer a dominant, world-class car chassis.</p>
            <h2>A FUTURISTIC FRONTIER OF LUXURY AND SPEED</h2>
            <p>Today, Aston Martin Aramco stands at the precipice of a defining new era in Formula One history. Armed with a revolutionary hyper-modern wind tunnel, the technical brilliance of Adrian Newey, and the backing of global giants like Aramco, the team has assembled all the necessary ingredients to conquer the pinnacle of motorsport. As the sport moves into a sustainable, tech-driven future, the green machines of Silverstone remain fiercely focused on a single, uncompromising destiny: transforming British luxury into absolute racetrack dominance.</p>
            <div class="team-custom-photos">
                <img src="../images/teams/aston_martin1.avif" alt="Aston Martin 1" onerror="this.style.display='none'">
                <img src="../images/teams/aston_martin2.avif" alt="Aston Martin 2" onerror="this.style.display='none'">
            </div>
        `,
    },
    "alpine": {
        fullName: "BWT Alpine F1 Team",
        base: "Enstone, United Kingdom / Viry-Châtillon, France",
        principal: "Oliver Oakes",
        powerUnit: "Mercedes-AMG V6 Turbo Hybrid",
        titles: "2 Championships (as Renault)",
        color: "#ff4096",
        gradientBg: "linear-gradient(135deg, #000000 1%, #ff4096 100%)",
        drivers: [
            { name: "Pierre GASLY", number: "#10" },
            { name: "Franco COLAPINTO", number: "#43" }
        ],
        historyHtml: `
            <h1>BWT ALPINE F1 TEAM: THE ULTIMATE HISTORY OF A FORMULA ONE PHENOMENON</h1>
            <p>BWT Alpine F1 Team represents the fierce intersection of French automotive heritage, cutting-edge British engineering, and a relentless passion for top-tier motorsport. Officially rebranded in 2021 to promote Renault's legendary sports car marque, the Enstone-based squad carries the historical weight of a seven-time World Championship-winning legacy. Operating across a unique cross-channel alliance, Alpine has transformed itself through multiple legendary eras, constantly pushing the boundaries of aerodynamic innovation and aggressive tactical execution to challenge the established giants of the grid.</p>
            <h2>THE ENSTONE ROOTS AND TOLEMAN'S REBEL SPIRIT</h2>
            <p>The structural DNA of Alpine is anchored in the famous factory at Enstone, Oxfordshire, which originally entered Formula One in 1981 as the underdog Toleman team. Infused with a rebellious and innovative spirit, Toleman became famous for giving the legendary Ayrton Senna his dramatic Formula One debut in 1984. This gritty, punch-above-your-weight mentality laid the foundation for the facility's future, establishing a culture where engineering resourcefulness and a pure hunger for racing could overcome massive corporate budgets.</p>
            <h2>THE BENETTON REVOLUTION AND SCHUMACHER'S FIRST CROWNS</h2>
            <p>In 1986, the team was acquired by the Benetton family, transforming the outfit into the colorful and high-energy Benetton Formula. Under the brilliant management of Flavio Briatore and the technical masterclasses of Ross Brawn and Rory Byrne, the team evolved into an absolute powerhouse. The breakthrough came with the signing of a young German phenomenon named Michael Schumacher. Piloting the aerodynamically supreme Benetton chassis, Schumacher stormed to back-to-back World Drivers' Championships in 1994 and 1995, delivering the team's historic first Constructors' title and shattering the dominance of Williams and McLaren.</p>
            <h2>THE RENAULT WORKS POWER AND THE ALONSO TITLES</h2>
            <p>The dawn of the new millennium brought another massive identity shift when French automotive giant Renault purchased the team, establishing a full works operation. The golden era of the mid-2000s belonged entirely to Renault and their young Spanish prodigy, Fernando Alonso. In 2005 and 2006, Alonso engaged in legendary, wheel-to-wheel warfare against Michael Schumacher and Ferrari. Driven by the revolutionary mass-damper technology and fierce mechanical reliability, Renault captured consecutive double World Championships, forever cementing the French manufacturer's name in motorsport folklore.</p>
            <h2>THE ALPINE REBRAND AND OCON'S SHOCK TRIUMPH</h2>
            <p>In 2021, the team embarked on a bold marketing and cultural renaissance, officially renaming the outfit BWT Alpine F1 Team and adopting a striking blue, white, and red livery. The new era yielded immediate, emotional dividends at the dramatic 2021 Hungarian Grand Prix. Exploiting a chaotic start and supported by a legendary, iron-clad defensive masterclass from teammate Fernando Alonso, Esteban Ocon crossed the finish line to secure a stunning debut victory for the Alpine brand, proving that the Enstone squad still possessed the magic to conquer the pinnacle of motorsport.</p>
            <h2>THE RADICAL REBOOT AND THE MERCEDES ALLIANCE</h2>
            <p>Following a highly volatile period of management restructuring and a challenging drop to the back of the standings, the Alpine board executed a high-stakes, historical course correction. To spearhead a complete modern revival, F1 veteran Flavio Briatore returned as Executive Advisor, initiating aggressive structural reforms. In a monumental shifting of gears, parent company Renault decided to terminate its decades-long in-house engine program, transforming Alpine into a highly optimized customer operation powered by race-winning Mercedes power units and gearboxes.</p>
            <h2>A NEW ERA OF CROSS-CHANNEL RENAISSANCE</h2>
            <p>Today, BWT Alpine F1 Team stands at the precipice of a fascinating technological frontier. Guided by Team Principal Oliver Oakes and the strategic vision of Flavio Briatore, Enstone is fully locked into a major competitive renaissance. Armed with an incredibly dynamic, high-speed driver lineup featuring Grand Prix winner Pierre Gasly and the sensational talent of Franco Colapinto, the team has engineered a much-improved aerodynamic platform. As Formula One charges forward into radical new regulatory eras, the French-backed squad remains completely driven by a singular, unyielding ambition: returning the legendary Alpine name to global supremacy.</p>
            <div class="team-custom-photos">
                <img src="../images/teams/alpine1.avif" alt="Alpine 1" onerror="this.style.display='none'">
                <img src="../images/teams/alpine2.avif" alt="Alpine 2" onerror="this.style.display='none'">
            </div>
        `
    },
    "haas": {
        fullName: "MoneyGram Haas F1 Team",
        base: "Kannapolis, USA / Banbury, UK",
        principal: "Ayao Komatsu",
        powerUnit: "Ferrari V6 Turbo Hybrid",
        titles: "0 Championships",
        color: "#8b8c8d",
        gradientBg: "linear-gradient(135deg, #000000 1%, #8b8c8d 100%)",
        drivers: [
            { name: "Esteban OCON", number: "#31" },
            { name: "Oliver BEARMAN", number: "#87" }
        ],
        historyHtml: `
        <h1>TGR HAAS F1 TEAM: THE ULTIMATE HISTORY OF A FORMULA ONE PHENOMENON</h1>
        <p>TGR Haas F1 Team is the ultimate embodiment of American entrepreneurial grit, lean operational efficiency, and aggressive technological disruption in Formula One. Founded by industrialist Gene Haas, the team made history by shattering traditional barriers to become the first all-American-led outfit on the grid in three decades. Operating across a unique tri-continental network spanning North Carolina, England, and Italy, Haas bypassed the astronomical costs of traditional manufacturing through pioneering technical partnerships, establishing a highly resilient, point-scoring model that refuses to back down from the multi-billion dollar manufacturer giants.</p>
        <h2>THE AMERICAN AMBITION AND THE NASCAR DNA</h2>
        <p>The story of Haas F1 Team began in April 2014 when Gene Haas, the billionaire founder of Haas Automation and co-owner of the championship-winning Stewart-Haas NASCAR team, secured an official entry into Formula One. Haas infused the project with a pure, competitive American DNA focused on lean efficiency and high-precision mechanical engineering. Rather than building a massive factory infrastructure from scratch, Gene Haas recognized that the fastest way to the grid was through innovation, choosing to establish the team's headquarters in Kannapolis, North Carolina, directly alongside his elite stock car racing operation.</p>
        <h2>THE ITALIAN ALLIANCE AND STUNNING DEBUT POINTS</h2>
        <p>To bypass the traditional learning curve of a startup team, Haas engineered a revolutionary, highly debated technical partnership that shook up the F1 paddock. They forged a far-reaching alliance with Scuderia Ferrari to supply engines, gearboxes, and mechanical components, while embedding their aerodynamic design staff with famed Italian racecar constructor Dallara. The brilliant operational strategy yielded immediate, historic dividends. At the 2016 Australian Grand Prix, French veteran Romain Grosjean piloted the VF-16 to a stunning sixth-place finish on the team's absolute debut, marking the most successful entry of a brand-new constructor in modern motorsport history.</p>
        <h2>THE MIDFIELD FIGHT AND HIGH-STAKES NETFLIX FAME</h2>
        <p>As the team established its footprint, they became an indispensable and highly entertaining anchor of the Formula One midfield. Led by the unfiltered, aggressively charismatic Team Principal Guenther Steiner, Haas captured the hearts of a massive global audience through the Netflix series "Drive to Survive." On the racetrack, the driver pairing of Romain Grosjean and Kevin Magnussen pushed the team to its absolute historical peak in 2018, securing a brilliant fifth place in the World Constructors' Championship. Despite intense financial pressure and a roller coaster of performance, the squad proved they could consistently punch well above their weight.</p>
        <h2>THE FIERY SACRIFICE AND THE MAGNUSSEN POLE MIRACLE</h2>
        <p>The turn of the decade brought immense adversity, testing the team's survival instincts to the absolute limit. In 2020, Romain Grosjean miraculously survived a horrific, fiery 67G crash in Bahrain—a defining moment of resilience that left a permanent mark on the sport's safety legacy. Following a grueling, point-less 2021 season dedicated entirely to saving resources for future regulations, Haas experienced a spectacular emotional rebirth in 2022. At a rain-swept Interlagos circuit in Brazil, Kevin Magnussen capitalized on a flawless tactical window to secure a shocking, maiden pole position, triggering wild celebrations across the entire pit lane.</p>
        <h2>THE JAPANESE LEADERSHIP SHIFT AND STRUCTURAL REVIVAL</h2>
        <p>Recognizing the need for a major technical evolution to break out of a persistent tire-wear slump, Gene Haas executed a high-stakes leadership shake-up, appointing long-time Director of Engineering Ayao Komatsu as Team Principal. Komatsu completely revitalized the team's internal culture, replacing viral marketing fame with cold, clinical engineering discipline. The cultural shift paid immediate dividends, with veterans Nico Hülkenberg and Kevin Magnussen unlocking a surge of consistent, double-points finishes that aggressively propelled the team back into the upper tiers of the midfield standings.</p>
        <h2>THE TOYOTA ALLIANCE AND A FUTURISTIC NEW DAWN</h2>
        <p>Today, TGR Haas F1 Team has officially entered a monumental and groundbreaking new era of technological supremacy. In a blockbuster alignment, the team finalized a massive title-sponsorship and technical partnership with Toyota Gazoo Racing, completely rebranding their visual identity into a striking, high-speed white-and-red aesthetic. Spearheaded by the race-winning pedigree of Esteban Ocon and the sensational raw speed of British rookie phenom Oliver Bearman, the team has unleashed a formidable modern powerhouse. With complete technical backing and a razor-sharp aerodynamic platform, the American squad is perfectly armed to conquer the sport's radical new frontiers.</p>
        <div class="team-custom-photos">
            <img src="../images/teams/haas1.avif" alt="Haas 1" onerror="this.style.display='none'">
            <img src="../images/teams/haas2.avif" alt="Haas 2" onerror="this.style.display='none'">
        </div>
        `
    },
    "rb": {
        fullName: "Visa Cash App RB F1 Team",
        base: "Faenza, Italy / Milton Keynes, UK",
        principal: "Laurent Mekies",
        powerUnit: "Red Bull Ford Powertrains",
        titles: "0 Championships",
        color: "#2f67f6",
        gradientBg: "linear-gradient(135deg, #000000 1%, #2f67f6 100%)",
        drivers: [
            { name: "Liam LAWSON", number: "#30" },
            { name: "Arvid LINDBLAD", number: "#41" }
        ],
        historyHtml: `
            <h1>VISA CASH APP RB: THE ULTIMATE HISTORY OF A FORMULA ONE PHENOMENON</h1>
            <p>Visa Cash App RB, widely known as VCARB or Racing Bulls, is the cutting-edge, high-energy sister team to Red Bull Racing, operating at the sharp edge of youth development and technical innovation. Based in Faenza, Italy, with an advanced engineering hub in Milton Keynes, England, this unique racing outfit has completely revolutionized how Formula One develops global superstars. Backed by corporate giants Visa and Cash App, the team bridges Italian racing passion with ultimate Red Bull performance, standing as an essential, fearsome force in the modern midfield hierarchy.</p>
            <h2>THE ITALIAN UNDERDOG ROOT AND MINARDI'S SPIRIT</h2>
            <p>The core physical DNA of the team is anchored in the historic factory at Faenza, which originally entered the sport in 1985 as the beloved Minardi team. Renowned for its passionate Italian grit and a rare ability to spot raw talent, Minardi became a legendary paddock underdog that gave future world champions like Fernando Alonso their grand debuts. When the Red Bull empire purchased the struggling outfit, they chose to keep the team's beating heart in Italy, building upon a rich culture of mechanical resourcefulness and a deep, multi-generational love for motorsport.</p>
            <h2>THE TORO ROSSO ERA AND VETTEL'S MONZA MIRACLE</h2>
            <p>Rebranded as Scuderia Toro Rosso in 2006, the Italian team officially transformed into Red Bull's ultimate proving ground for junior driver prodigies. The high-stakes investment paid off spectacularly at a rain-soaked 2008 Italian Grand Prix at Monza. A young German phenom named Sebastian Vettel shocked the entire sporting world by securing a sensational, historic pole position and race victory in an underdog car. This victory shattered records and proved that the Faenza squad could beat the multi-billion dollar manufacturer giants at their own game.</p>
            <h2>THE RED BULL ACADEMY ENGINE AND SUPERSTAR RISE</h2>
            <p>Following Vettel's breakthrough, Toro Rosso cemented its legacy as the ultimate incubator for pure motorsport royalty. The team's aggressive, pressure-filled environment served as the launchpad for a generation of elite drivers, including Daniel Ricciardo, Carlos Sainz, and the unstoppable Max Verstappen. Every single one of these drivers used their time in Faenza to hone their aggressive overtaking maneuvers and elite wet-weather skills, proving that the team's primary purpose was to forge the absolute fastest champions on the planet.</p>
            <h2>THE ALPHATAURI TRANSITION AND THE GASLY REDEMPTION</h2>
            <p>In 2020, the team underwent an elegant rebranding to Scuderia AlphaTauri, elevating its status from a pure junior squad to a highly competitive sister team tasked with promoting Red Bull's premium fashion brand. This stylish new era immediately delivered one of the most emotional chapters in modern F1 history. At the 2020 Italian Grand Prix, Pierre Gasly executed a flawless, high-stakes defensive drive to claim a stunning victory. The victory sent shockwaves through the paddock, proving that the team possessed the technical infrastructure to conquer the highest steps of the podium.</p>
            <h2>THE HYPER-DRIVE COMMERCIAL REBOOT AND NEW ERA</h2>
            <p>The team embarked on a massive, high-profile corporate transformation, officially rebranding as the Visa Cash App RB Formula One Team. This striking, tech-inspired identity brought unprecedented financial backing and triggered an aggressive, top-tier engineering reboot. Under the clinical strategic leadership of Team Principal Alan Permane and CEO Peter Bayer, the team pushed forward with severe aerodynamic upgrades, aggressively moving away from traditional customer limitations to establish a highly autonomous, point-scoring engineering machine.</p>
            <h2>THE REGULATION REVOLUTION AND FORD POWERTRAINS DAWN</h2>
            <p>Today, Visa Cash App RB stands on the precipice of a monumental, futuristic technological frontier. Driven by an elite, high-speed driver lineup featuring Grand Prix veteran Liam Lawson and the sensational raw speed of British rookie phenom Arvid Lindblad, the team has unleashed a striking, streamlined visual identity. As Formula One transitions into radical new structural eras, the team is armed with the cutting-edge Red Bull Ford Powertrains engine alliance. Locked into an unyielding pursuit of perfection, the Racing Bulls are fully prepared to conquer the sport's next generation.</p>
            <div class="team-custom-photos">
                <img src="../images/teams/rb1.avif" alt="RB 1" onerror="this.style.display='none'">
                <img src="../images/teams/rb2.avif" alt="RB 2" onerror="this.style.display='none'">
            </div>
        `
    },
    "williams": {
        fullName: "Williams Racing",
        base: "Grove, United Kingdom",
        principal: "James Vowles",
        powerUnit: "Mercedes-AMG V6 Turbo Hybrid",
        titles: "9 Constructors' Championships",
        color: "#00a3e0",
        gradientBg: "linear-gradient(135deg, #000000 1%, #00a3e0 100%)",
        drivers: [
            { name: "Alexander ALBON", number: "#23" },
            { name: "Carlos SAINZ", number: "#55" }
        ],
        historyHtml: `
            <h1>WILLIAMS RACING: THE ULTIMATE HISTORY OF A FORMULA ONE PHENOMENON</h1>
            <p>Williams Racing is one of the most legendary, resilient, and historically successful teams in the history of Formula One. Founded by the iconic Sir Frank Williams and engineering mastermind Sir Patrick Head, the Grove-based outfit is the absolute embodiment of pure, independent racing grit. With an illustrious legacy that includes 9 Constructors' Championships and 7 Drivers' Championships, Williams stands as a giant of the sport, famous for its groundbreaking technological innovations, fierce mechanical autonomy, and an unyielding family spirit that dominated the grid across multiple golden eras.</p>
            <h2>THE GARAGISTE DNA AND STRATTON HOUSE ORIGINS</h2>
            <p>The story of Williams began in 1977 after Sir Frank Williams overcame years of severe financial hardship and failed racing ventures to establish Williams Grand Prix Engineering. Operating from an empty warehouse in Didcot, Frank Williams infused the team with a relentless, uncompromising "garagiste" DNA. Together with Patrick Head, they focused entirely on engineering simplicity and aerodynamic efficiency. The breakthrough came rapidly, with Swiss driver Clay Regazzoni securing the team's historic first-ever victory at the 1979 British Grand Prix, launching an independent British powerhouse onto the global stage.</p>
            <h2>THE GROUND-EFFECT MASTERCLASS AND FIRST TITLES</h2>
            <p>The dawn of the 1980s marked the transformation of Williams from a gritty underdog into an absolute championship juggernaut. Patrick Head mastered the complex science of ground-effect aerodynamics, creating the legendary FW07 chassis. In 1980, Alan Jones drove the car to a dominant World Drivers' Championship, securing Williams' very first double title triumph. Throughout the decade, legendary champions like Keke Rosberg and Nelson Piquet steered the fierce, Honda-powered machines to absolute glory, firmly establishing Williams as a dominant powerhouse despite the immense corporate budgets of manufacturer rivals.</p>
            <h2>THE ACTIVE SUSPENSION EMPIRE AND TOTAL DOMINANCE</h2>
            <p>The early 1990s represented the absolute zenith of Williams' technological supremacy, driven by the design genius of Adrian Newey. Williams became an engineering empire, pioneering radical electronic driver aids such as active suspension, traction control, and anti-lock brakes. The 1992 FW14B was widely regarded as the most advanced car in F1 history, allowing Nigel Mansell to smash every existing record to claim the world title. This golden era of total dominance yielded consecutive double championships, with Alain Prost (1993), Damon Hill (1996), and Jacques Villeneuve (1997) cementing Williams' status as an unrivaled dynasty.</p>
            <h2>THE BMW PARTNERSHIP AND TRAGIC ADVERSITY</h2>
            <p>The team's historic success was constantly tested by profound personal and structural adversity. In 1986, Sir Frank Williams suffered a near-fatal car crash that left him wheelchair-bound, yet his fierce determination to lead the team never wavered. In 1994, the team faced its darkest hour when racing legend Ayrton Senna tragically lost his life in a Williams car at Imola. Showing immense resilience, the team fought through the grief to secure the Constructors' title that same year. At the turn of the millennium, a high-powered partnership with BMW brought blistering qualifying speed and multiple race wins with Juan Pablo Montoya, keeping Williams at the sharp end of the grid.</p>
            <h2>THE INDEPENDENT STRUGGLE AND DORILTON REBOOT</h2>
            <p>As Formula One transitioned into a multi-billion dollar, manufacturer-dominated era, Williams faced a challenging decade of financial constraints and structural decline. Despite a brilliant resurgence in the early turbo-hybrid era with Mercedes power, the team eventually slipped to the back of the grid. In 2020, marking the end of a historic era, the Williams family sold the team to American investment firm Dorilton Capital. Dorilton immediately stabilized the team's finances, injected massive infrastructure funding, and preserved the iconic Williams name and heritage while initiating a complete modern organizational reboot.</p>
            <h2>THE VOWLES REVOLUTION AND A FUTURISTIC NEW DAWN</h2>
            <p>Today, Williams Racing is undergoing an aggressive, high-tech renaissance to reclaim its rightful place at the absolute pinnacle of motorsport. Under the clinical strategic leadership of Team Principal James Vowles, the Grove-based squad has completely overhauled its engineering culture, replacing outdated systems with cutting-edge data management and aerodynamic infrastructure. Armed with the formidable world-class talent of Alex Albon and a bold, forward-looking vision, the team has unleashed a striking, high-speed blue visual identity. As Formula One pushes into radical new frontiers, the independent giants of Grove remain completely driven by a singular destiny: returning the legendary Williams name to global supremacy.</p>
            <div class="team-custom-photos">
                <img src="../images/teams/williams1.avif" alt="Williams 1" onerror="this.style.display='none'">
                <img src="../images/teams/williams2.avif" alt="Williams 2" onerror="this.style.display='none'">
            </div>
        `
    },
    "audi": {
        fullName: "Revolut Audi F1 Team",
        base: "Hinwil, Switzerland / Neuburg, Germany",
        principal: "Mattia Binotto",
        powerUnit: "Audi Power Unit 2026",
        titles: "0 Championships",
        color: "#ab0a0a",
        gradientBg: "linear-gradient(135deg, #000000 1%, #ab0a0a 100%)",
        drivers: [
            { name: "Nico HULKENBERG", number: "#27" },
            { name: "Gabriel BORTOLETO", number: "#5" }
        ],
        historyHtml: `
            <h1>AUDI REVOLUT F1 TEAM: THE ULTIMATE HISTORY OF A FORMULA ONE PHENOMENON</h1>
            <p>Audi Revolut F1 Team represents a monumental new frontier in Formula One, marking the historic first-ever entry of the legendary German manufacturer into the pinnacle of global motorsport. Operating under the famous corporate philosophy "Vorsprung durch Technik" (Advancement through Technology), the Neuburg and Hinwil-based manufacturer engineered a high-stakes corporate takeover of Sauber Motorsport to establish its full factory works presence. Backed by the financial power of the Volkswagen Group and title sponsor Revolut, Audi has disrupted the modern grid, combining historic engineering authority with a long-term, multi-million dollar master plan designed to secure ultimate World Championship supremacy.</p>
            <h2>THE AUTO UNION HERITAGE AND THE FOUR RINGS RACING DNA</h2>
            <p>While the Audi name is an exciting new addition to the Formula One grid, the brand's racing DNA is deeply rooted in the foundational history of motorsport. In the 1930s, Audi's historical predecessor, Auto Union, unleashed the legendary, silver mid-engined "Silver Arrows" driven by icons like Bernd Rosemeyer, battling Mercedes on the European Grand Prix circuits. Decades later, Audi completely revolutionized global rallying with the pioneering, four-wheel-drive Audi Quattro, followed by an era of total, historic dominance at the 24 Hours of Le Mans. This relentless culture of mechanical innovation laid a rock-solid foundation for their ultimate challenge: conquering Formula One.</p>
            <h2>THE CLEAN-SHEET POWER UNIT AND THE NEUBURG ENGINE FACTORY</h2>
            <p>Unlike traditional startup teams that enter the sport relying on customer components, Audi executed an uncompromising strategy centered around complete mechanical autonomy. Operating from a rapidly expanding, high-tech engineering facility in Neuburg an der Donau, Germany, the subsidiary Audi Formula Racing GmbH designed a brand-new, clean-sheet power unit completely in-house. Tailored specifically for radical engine regulations, Audi's engineering masterclass balances internal combustion with an advanced 350kW hybrid electrical layout, ensuring that every single component—from the turbocharger housing to the energy store—carries pure factory DNA.</p>
            <h2>THE SAUBER ACQUISITION AND SHIFTING SEATS AT HINWIL</h2>
            <p>To secure a world-class chassis infrastructure, Audi avoided the astronomical learning curve of building a factory from scratch by executing a 100 percent takeover of Sauber Motorsport. This strategic masterstroke anchored their race operations at Sauber's iconic headquarters in Hinwil, Switzerland, a facility famous for housing one of the most advanced aerodynamic wind tunnels in the world. By attaching a massive manufacturer engine program to an established, highly resilient independent grid entry, Audi created a highly optimized cross-border alliance, blending precise German power unit engineering with Swiss operational efficiency.</p>
            <h2>THE BINOTTO STRUCTURE AND CLINICAL STRATEGIC REBOOT</h2>
            <p>To spearhead their aggressive rollout into the upper echelons of the paddock, Audi implemented a high-stakes, comprehensive organizational restructure. They secured the signature of former Ferrari team chief Mattia Binotto to lead the entire Formula One project as CEO and Team Principal, establishing an unyielding culture of clinical engineering discipline. Backed by Technical Director James Key and Racing Director Allan McNish managing trackside operations, the team dismantled outdated structures, replacing them with a highly sophisticated data management network stretching across Germany, Switzerland, and a strategic technology satellite base in Britain's Motorsport Valley.</p>
            <h2>THE GRID FIRE-UP AND FIRST CHAMPIONSHIP POINTS</h2>
            <p>Audi officially unleashed its striking, high-speed visual identity onto the global stage, igniting a spectacular debut campaign. To spearhead their on-track charge, the team locked in a formidable, high-speed driver lineup blending rich engineering feedback with raw racing ambition. German veteran Nico Hülkenberg provides a trusted, clinical pair of hands to extract maximum technical data from the chassis, while Brazilian sensation and Formula 2 champion Gabriel Bortoleto injects a fierce wave of youthful energy. Through bold tactical execution and rapid, mid-season aerodynamic upgrades, the team immediately unlocked a surge of competitive form, securing crucial, double-points finishes.</p>
            <h2>A FUTURISTIC DESTINY OF GLOBAL SUPREMACISM</h2>
            <p>Today, Audi Revolut F1 Team stands at the absolute precipice of a defining technological revolution. Fully locked into a realistic, five-year roadmap toward the absolute top step of the podium, the German squad is expanding its computational fluid dynamics capabilities and hybrid harvesting systems to out-engineer traditional rivals. As Formula One pushes forward into sustainable, tech-driven frontiers, the four rings of Neuburg and Hinwil remain entirely fueled by a single, uncompromising goal: transforming German premium luxury into an unstoppable, world-conquering motorsport empire.</p>
            <div class="team-custom-photos">
                <img src="../images/teams/audi1.avif" alt="Audi 1" onerror="this.style.display='none'">
                <img src="../images/teams/audi2.avif" alt="Audi 2" onerror="this.style.display='none'">
            </div>
        `
    },
    "cadillac": {
        fullName: "Cadillac Formula 1 Team",
        base: "Fishers, Indiana, USA / Silverstone, UK",
        principal: "Graeme Lowdon",
        powerUnit: "Ferrari (2026-2027) / General Motors (2028+)",
        titles: "0 Championships",
        color: "#fefefe",
        gradientBg: "linear-gradient(135deg, #000000 1%, #4a4a5a 100%)",
        drivers: [
            { name: "Sergio PÉREZ", number: "#11" },
            { name: "Valtteri BOTTAS", number: "#77" }
        ],
        historyHtml: `
            <h1>CADILLAC FORMULA 1 TEAM: THE ULTIMATE HISTORY OF A FORMULA ONE PHENOMENON</h1>
            <p>The Cadillac Formula 1 Team represents a monumental and historic expansion of the modern grid, marking the spectacular arrival of an iconic American automotive giant at the pinnacle of global motorsport. Operating through a high-stakes, multi-million dollar collaboration between General Motors and TWG Motorsports, the team shattered decades of traditional barriers to join the grid as the sport's exclusive 11th entry. With deep-rooted racing DNA and an uncompromising corporate backing, the squad has established a highly advanced, multi-continental infrastructure designed to challenge the traditional European motorsport establishment and capture long-term global supremacy.</p>
            <h2>THE DETROIT LEGACY AND THE CHROME RACING DNA</h2>
            <p>The racing DNA of Cadillac is deeply intertwined with the classic and modern eras of endurance motorsport. Founded in 1902 in Detroit, Michigan, the luxury division of General Motors built an elite automotive reputation before dipping its toes into high-level competition at the 24 Hours of Le Mans as far back as the 1950s. Decades later, Cadillac conquered the American sports car scene, capturing dominant, multi-year championships in the IMSA WeatherTech SportsCar Championship and taking historic podiums at Le Mans with their V-Series.R hypercars. This relentless pursuit of mechanical engineering excellence laid the rock-solid foundation for their ultimate frontier: Formula One.</p>
            <h2>THE FOUR-SITE ENGINE AND AMERICAN INDEPENDENCE</h2>
            <p>Unlike traditional grid entries that confine their engineering operations to a single facility, Cadillac established a revolutionary, tri-continental network spanning four elite technical hubs. The squad synchronized operations across Fishers in Indiana, Concord in North Carolina, Warren in Michigan, and a cutting-edge engineering satellite facility in Silverstone, England. This massive infrastructural network was built to execute an aggressive long-term master plan for complete mechanical independence, combining legendary American manufacturing power with the highly specialized technical resources of Britain's Motorsport Valley.</p>
            <h2>THE 11TH TEAM EXPANSION AND THE F1 GRID BREAKTHROUGH</h2>
            <p>The journey to the starting grid was one of the most intense, high-stakes political battles in modern motorsport folklore. Initially emerging as an Andretti Global bid, the project faced heavy resistance from the established paddock elite before being reorganized under TWG Global and securing a massive $450 million expansion fee. In March 2025, Formula One officially granted final approval, cementing Cadillac's place on the grid as the first entirely brand-new constructor debut since 2016, injecting a fresh wave of corporate prestige and high-speed American ambition into the world championship.</p>
            <h2>THE PRAGMATIC VETERAN LINEUP AND MARANELLO POWER</h2>
            <p>To navigate the astronomical learning curve of their debut campaign, Cadillac adopted an incredibly pragmatic, high-experience driver strategy. They plucked a formidable veteran duo from free agency, signing 10-time Grand Prix winner Valtteri Bottas and 6-time Grand Prix winner Sergio "Checo" Perez to multi-year contracts, backed by Chinese star Zhou Guanyu as reserve driver. For their initial engineering platform, the team secured a crucial technical alliance with Scuderia Ferrari to supply race-winning 1.6-liter V6 turbo-hybrid engines and gearboxes, allowing the chassis division to mature rapidly while wrapped in a striking, asymmetrical half-black, half-white corporate livery.</p>
            <h2>THE BUDKOWSKI REBOOT AND CLINICAL ENGINEERING ROADMAP</h2>
            <p>Recognizing the need for a rapid shift toward cold, clinical engineering discipline after a challenging, pointless opening half to their debut season, Cadillac executed a sudden, high-profile leadership transition. They appointed former Alpine executive director and veteran F1 engineer Marcin Budkowski as Team Principal, replacing Graeme Lowdon. Budkowski immediately initiated aggressive structural overhauls across the team's data management and aerodynamic branches, implementing a highly analytical approach to maximize the technical feedback from Bottas and Perez and accelerate the team's mid-season development curve.</p>
            <h2>THE 2029 VISION AND AN UNSTOPPABLE MOTORSPORT EMPIRE</h2>
            <p>Today, the Cadillac Formula 1 Team stands at the absolute precipice of a definitive technological revolution. While competing fiercely in the modern midfield, the team's primary engineering focus is locked onto a state-of-the-art power unit facility under construction in Concord, North Carolina. Here, General Motors is aggressively developing its very own, clean-sheet proprietary power unit, set to unleash complete factory autonomy. As Formula One pushes forward into new sustainable frontiers, the American squad remains entirely driven by a single destiny: transforming iconic Detroit luxury into absolute racetrack dominance.</p>
            <div class="team-custom-photos">
                <img src="../images/teams/cadillac1.avif" alt="Cadillac 1" onerror="this.style.display='none'">
                <img src="../images/teams/cadillac2.avif" alt="Cadillac 2" onerror="this.style.display='none'">
            </div>
        `
    }
};

async function fetchAndRenderTeamsGrid() {
    const gridContainer = document.getElementById("teams-grid");
    gridContainer.innerHTML = "";
    
    Object.keys(teamDetailsData).forEach(key => {
        const team = teamDetailsData[key];
        renderTeamCard(key, team.fullName, team.base);
    });
}

function renderTeamCard(key, name, meta) {
    const gridContainer = document.getElementById("teams-grid");
    const details = teamDetailsData[key];

    const card = document.createElement("div");
    card.className = "team-card";
    card.style.setProperty('--card-accent-color', details.color);

    card.innerHTML = `
        <div>
            <h3>${name}</h3>
            <p>${meta}</p>
            <span class="team-card-badge">${details.powerUnit}</span>
        </div>
        <div class="team-card-watermark">${key.toUpperCase()}</div>
    `;

    card.addEventListener("click", () => {
        showTeamDetail(key);
    });

    gridContainer.appendChild(card);
}

function showTeamDetail(key) {
    const team = teamDetailsData[key];

    document.getElementById("teams-grid-section").style.display = "none";
    document.getElementById("team-detail-view").style.display = "block";

    document.getElementById("detail-team-name").innerText = team.fullName;
    document.getElementById("detail-team-meta").innerText = `${team.base} • ${team.powerUnit}`;
    document.getElementById("detail-team-watermark").innerText = key.toUpperCase();

    // Nastavení obrázku monopostu
    const carImg = document.getElementById("detail-car-img");
    carImg.src = `../images/teams/${key}-car.avif`; 
    carImg.onerror = () => {
        carImg.style.display = "none";
    };
    carImg.style.display = "block";

    // Nastavení pozadí banneru
    const banner = document.getElementById("team-profile-banner");
    banner.style.setProperty('--team-color', team.color);
    banner.style.background = team.gradientBg;

    document.getElementById("stat-full-name").innerText = team.fullName;
    document.getElementById("stat-base").innerText = team.base;
    document.getElementById("stat-principal").innerText = team.principal;
    document.getElementById("stat-power-unit").innerText = team.powerUnit;
    document.getElementById("stat-titles").innerText = team.titles;

    document.getElementById("detail-custom-team-bio").innerHTML = team.historyHtml;

    const driversContainer = document.getElementById("detail-team-drivers");
    driversContainer.innerHTML = "";
    team.drivers.forEach(driver => {
        const item = document.createElement("div");
        item.className = "team-driver-item";
        item.style.setProperty('--team-color', team.color);
        item.innerHTML = `
            <span class="team-driver-item-name">${driver.name}</span>
            <span class="team-driver-item-num">${driver.number}</span>
        `;
        driversContainer.appendChild(item);
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
}