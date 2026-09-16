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
                <h3>${driver.givenName} <strong>${driver.familyName.toUpperCase()}</strong></h3>
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

// Slovník pro vlastní životopisy a fotky na míru (klíč je příjmení malými písmeny bez diakritiky)
const customBiographies = {
    "verstappen": ` 
        <H1>MAX VERSTAPPEN: THE ULTIMATE BIOGRAPHY OF A FORMULA ONE PHENOMENON</H1>
        <p>Max Emilian Verstappen, born on September 30, 1997, in Hasselt, Belgium, is a professional racing driver who competes in Formula One for Red Bull Racing under the Dutch flag. He is widely regarded as one of the greatest talents the sport of motorsport has ever seen. Known for his aggressive driving style, incredible wet-weather skills, and unmatched determination, Verstappen has rewritten the Formula One record books from the moment he stepped into a racing cockpit.</p>
        <H2>EARLY LIFE AND RACING DNA</H2>
        <p>Max was destined for speed from the day he was born. His racing DNA is entirely flush with motorsport royalty. His father, Jos Verstappen, was a former Formula One driver who competed throughout the 1990s and early 2000s. His mother, Sophie Kumpen, was an elite and highly successful kart racer who competed against future F1 drivers. Growing up in this environment, Max started karting at the age of four. Under the strict and intense mentorship of his father, he dominated junior categories across Europe, winning multiple karting championships and demonstrating an unusual level of maturity and raw speed.</p>
        <H2>METEORIC RISE THROUGH JUNIOR FORMULAS</H2>
        <p>In 2014, Verstappen transitioned from karts to single-seater cars, revealing his extraordinary adaptability. Competing in the FIA European Formula 3 Championship, he won ten races and finished third overall in the standings, despite it being his rookie year. His fearless overtaking maneuvers and dominance in wet conditions immediately caught the attention of top-tier F1 teams. Red Bull acted fast, signing the young prodigy to their junior driver program and shocking the entire motorsport world by offering him a full-time Formula One seat for the very next season.</p>
        <H2>THE YOUNGEST DRIVER IN FORMULA ONE HISTORY</H2>
        <p>Max Verstappen made his official Formula One debut at the 2015 Australian Grand Prix driving for Scuderia Toro Rosso. At just 17 years and 166 days old, he became the youngest driver ever to start a Formula One race. Despite the immense pressure and initial criticism regarding his age, he scored points in his second race in Malaysia. He finished his rookie season with several impressive rewards, repeatedly proving that he belonged at the pinnacle of motorsport with his bold racing style.</p>
        <H2>RED BULL RACING PROMOTION AND HISTORIC FIRST WIN</H2>
        <p>Just four races into the 2016 season, Red Bull Racing made a bold decision to promote Verstappen to the main team, swapping seats with Daniil Kvyat. What happened next entered motorsport history. At the 2016 Spanish Grand Prix, his first ever race for Red Bull Racing, Verstappen managed to defend his position against Kimi Raikkonen to win the race. At the age of 18 years and 228 days, he became the youngest race winner in Formula One history, a record that stands unbroken to this day. Over the next few years, he secured multiple victories and established himself as the leader of the Red Bull team.</p>
        <H2>THE LEGENDARY 2021 CHAMPIONSHIP BATTLE</H2>
        <p>The year 2021 will forever be remembered as one of the most intense and controversial seasons in Formula One. Max Verstappen engaged in a season-long, wheel-to-wheel battle against seven-time world champion Lewis Hamilton. The championship came down to the absolute final lap of the final race in Abu Dhabi. In a dramatic and highly debated restart after a late safety car, Verstappen overtook Hamilton to win the race and secure his first ever Formula One World Drivers' Championship, becoming the first Dutch driver to do so.</p>
        <H2>ERA OF TOTAL DOMINANCE</H2>
        <p>Following his first title, Verstappen and Red Bull Racing entered an era of unparalleled dominance. In 2022, he won 15 races, comfortably securing his second world title. The 2023 season saw him smash even more records, winning an astonishing 19 out of 22 races, including a record-breaking streak of 10 consecutive victories. He continued this championship reign into the following seasons, cementing his legacy among the greatest legends of the sport and proving that his drive for perfection and speed shows no signs of slowing down.</p>
        <div class="driver-custom-photos" style="display: flex; gap: 20px; margin-top: 15px; margin-right: -2%;">
            <img src="../images/bio/max1.avif" alt="Max Verstappen 1" style="width: 48%; border-radius: 6px; object-fit: cover;">
            <img src="../images/bio/max2.avif" alt="Max Verstappen 2" style="width: 48%; border-radius: 6px; object-fit: cover;">
        </div>
    `,
    "hadjar": `
        <H1>ISACK HADJAR: THE RISING STAR OF THE RED BULL RACING FAMILY</H1>
        <p>Isack Alexandre Hadjar, born on September 28, 2004, in Paris, France, is a professional racing driver competing in Formula One for Oracle Red Bull Racing alongside Max Verstappen. Of French-Algerian descent, Hadjar rose rapidly through the open-wheel ranks to become one of the most promising young talents in the paddock, nicknamed "Le Petit Prost" by the French media for his smart racing style and tactical awareness.</p>
        <H2>EARLY CAREER AND THE RED BULL JUNIOR TEAM</H2>
        <p>Hadjar started competitive karting at a young age and transitioned to single-seater cars in 2019. After proving his extraordinary talent in the French F4 and Formula Regional European Championship, he caught the eye of the Red Bull team hierarchy. Signed to the prestigious Red Bull Junior Team in 2022, Hadjar finished third in his rookie FIA Formula 3 season and went on to claim the runner-up spot in the 2024 FIA Formula 2 Championship with Campos Racing.</p>
        <H2>FORMULA ONE DEBUT WITH RACING BULLS</H2>
        <p>In 2025, Hadjar graduated to Formula One, picking up a full-time seat at the Visa Cash App Racing Bulls alongside Yuki Tsunoda. He adjusted quickly to the immense pressure of the sport, putting together an impressive rookie campaign that was highlighted by a spectacular maiden podium with a third-place finish at the Dutch Grand Prix. His consistency and raw speed throughout his first year convinced the Red Bull hierarchy that he was ready for an immediate step up to the main squad.</p>
        <H2>THE JUMP TO ORACLE RED BULL RACING</H2>
        <p>For the 2026 season, Oracle Red Bull Racing promoted Hadjar to the senior team to serve as Max Verstappen's full-time teammate. Facing a tough midfield car development battle and the formidable challenge of partnering a multi-time world champion, Hadjar has already shown flashes of brilliance, scoring points and consistently fighting at the front of the grid. After scoring strong results in the early stages of the year, his momentum was temporarily paused during the summer break due to a minor wrist injury, briefly sidelining his cockpit duties for recovery.</p>
        <div class="driver-custom-photos" style="display: flex; gap: 20px; margin-top: 15px; margin-right: -2%;">
            <img src="../images/bio/hadjar1.avif" alt="Isack Hadjar 1" style="width: 48%; border-radius: 6px; object-fit: cover;">
            <img src="../images/bio/hadjar2.avif" alt="Isack Hadjar 2" style="width: 48%; border-radius: 6px; object-fit: cover;">
        </div>
    `,

    "hamilton": `
        <H1>LEWIS HAMILTON: THE SEVEN-TIME WORLD CHAMPION AND RACING ICON</H1>
        <p>Sir Lewis Carl Davidson Hamilton, born on January 7, 1985, in Stevenage, England, is a British professional racing driver and one of the most successful figures in the history of Formula One. He holds the all-time records for the most pole positions, podium finishes, and race wins in the sport. Beyond his incredible achievements on the track, Hamilton is globally recognized for his activism, fashion influence, and efforts to increase diversity and environmental awareness within motorsport.</p>
        <H2>EARLY LIFE AND RECORD-BREAKING KARTING CAREER</H2>
        <p>Hamilton grew up in a working-class family and began his racing journey with remote-controlled cars before moving into karting at the age of eight. His extraordinary talent was immediately obvious to everyone watching. At just ten years old, he approached McLaren team principal Ron Dennis at an award ceremony and told him that he wanted to race for his team one day. Realizing his massive potential, McLaren and Mercedes signed the young prodigy to their driver development program, making him the youngest driver ever to secure a future Formula One contract.</p>
        <H2>MCLAREN DEBUT AND FIRST WORLD TITLE</H2>
        <p>Hamilton made a spectacular Formula One debut with McLaren in 2007, partnering with defending champion Fernando Alonso. He shocked the motorsport world by finishing on the podium in his first nine consecutive races and missed out on winning the world title by a single point. He made up for it the very next year in 2008, overtaking Timo Glock on the final lap of the final race in Brazil to win his first World Drivers' Championship, becoming the youngest champion in F1 history at the time.</p>
        <H2>THE MERCEDES GOLDEN ERA AND TOTAL DOMINANCE</H2>
        <p>In 2013, Hamilton made a highly criticized decision to leave McLaren and move to Mercedes, a choice that proved to be a masterstroke. With the introduction of the V6 turbo-hybrid engines in 2014, Mercedes became an unstoppable force. Hamilton entered an era of unprecedented dominance, capturing six additional world titles in 2014, 2015, 2017, 2018, 2019, and 2020. This incredible run tied him with Michael Schumacher for the record of seven World Drivers' Championships and cemented his place as a true sporting legend.</p>
        <H2>A LEGENDARY RIVALRY AND THE HISTORIC MOVE TO FERRARI</H2>
        <p>The year 2021 saw Hamilton engage in an intense, season-long, wheel-to-wheel battle against Max Verstappen, which ended in a controversial final-lap showdown in Abu Dhabi. After several tough seasons developing challenging cars with Mercedes, Hamilton shocked the sporting world once again by announcing his departure to join Scuderia Ferrari for the 2025 season. Racing in the iconic red car alongside Charles Leclerc, Hamilton began a brand new chapter in his career, continuing to chase an unprecedented eighth world title while bringing his immense experience to the Italian squad.</p>
        <div class="driver-custom-photos" style="display: flex; gap: 15px; margin-top: 15px; margin-right: -2%;">
            <img src="../images/bio/lewis1.avif" alt="Lewis Hamilton 1" style="width: 48%; border-radius: 6px; object-fit: cover;">
            <img src="../images/bio/lewis2.avif" alt="Lewis Hamilton 2" style="width: 48%; border-radius: 6px; object-fit: cover;">
        </div>
    `,
    "leclerc": `
        <H1>CHARLES LECLERC: THE MONÉGASQUE PRODIGY RACING FOR FERRARI</H1>
        <p>Charles Marc Hervé Perceval Leclerc, born on October 16, 1997, in Monte Carlo, Monaco, is a professional racing driver competing in Formula One for Scuderia Ferrari. Widely regarded as one of the fastest drivers on the grid over a single lap, Leclerc has earned a reputation for his breathtaking qualifying performances and immense emotional connection to the Tifosi. His journey to the pinnacle of motorsport is driven by incredible natural talent and a fierce determination to bring the world championship back to Maranello.</p>
        <H2>EARLY LIFE, TRAGEDY, AND JUNIOR DOMINANCE</H2>
        <p>Leclerc began karting at a young age at the track owned by the father of his late godfather and close friend, Jules Bianchi. His junior career was defined by immense speed but also personal heartbreak, losing both Bianchi and his own father, Hervé Leclerc, during his rise to Formula One. Despite these tragic losses, Leclerc showed incredible mental strength, dominating the 2016 GP3 Series and putting together an unforgettable 2017 FIA Formula 2 campaign with Prema Racing, where he won the title as a rookie and caught the eye of the Ferrari Driver Academy.</p>
        <H2>FORMULA ONE DEBUT AND THE DREAM FERRARI PROMOTION</H2>
        <p>Leclerc made his Formula One debut in 2018 with Sauber, scoring points consistently and proving he was ready for the big stage after just one season. In 2019, he achieved his dream by moving to Scuderia Ferrari as teammate to four-time world champion Sebastian Vettel. Leclerc wasted no time making his mark, securing his first pole position in Bahrain and taking emotional back-to-back victories at Spa-Francorchamps and Ferrari's home track in Monza. He finished the season ahead of Vettel, instantly establishing himself as the future of the Italian team.</p>
        <H2>CHAMPIONSHIP BATTLES AND THE PARTNERSHIP WITH HAMILTON</H2>
        <p>In 2022, Leclerc spearheaded Ferrari's return to the front, winning multiple races early in the year and engaging in an intense but respectful championship battle against Max Verstappen, ultimately finishing the season as world championship runner-up. After continuing to collect spectacular pole positions and podiums through the following seasons, his career entered a historic new chapter in 2025. Partnered with seven-time world champion Lewis Hamilton at Ferrari, Leclerc faced the ultimate challenge, working alongside a racing icon to develop the car while proving his own status as a championship-caliber team leader.</p>
        <div class="driver-custom-photos" style="display: flex; gap: 15px; margin-top: 15px; margin-right: -2%;">
            <img src="../images/bio/charles1.avif" alt="Charles Leclerc 1" style="width: 48%; border-radius: 6px; object-fit: cover;">
            <img src="../images/bio/charles2.avif" alt="Charles Leclerc 2" style="width: 48%; border-radius: 6px; object-fit: cover;">
        </div>
    `,
    "norris": `
        <H1>LANDO NORRIS: THE BRITISH SPEEDSTER LEADING MCLAREN'S RESURGENCE</H1>
        <p>Lando Norris, born on November 13, 1999, in Bristol, England, is a British-Belgian professional racing driver competing in Formula One for McLaren. Known for his exceptional qualifying pace, incredible consistency, and charismatic personality, Norris has grown from a popular fan-favorite into a premier championship contender. His career is defined by his deep loyalty to McLaren and his crucial role in bringing the historic British team back to the very front of the grid.</p>
        <H2>EARLY LIFE AND A RECORD-BREAKING JUNIOR CAREER</H2>
        <p>Norris grew up in a wealthy family and initially developed a passion for motorbike racing before switching his focus to four wheels at the age of seven. His rise through the karting ranks was spectacular, culminating in 2014 when he became the youngest karting world champion, a record previously held by Lewis Hamilton. Norris then dominated the junior single-seater categories, winning the MSA Formula championship, the Toyota Racing Series, and the FIA Formula 3 European Championship, before finishing as runner-up in the 2018 Formula 2 season.</p>
        <H2>FORMULA ONE DEBUT AND RISE WITH MCLAREN</H2>
        <p>Norris made his Formula One debut with McLaren in 2019 alongside Carlos Sainz. He immediately impressed the paddock with his raw speed, securing a brilliant top-five qualifying spot in just his second race in Bahrain. In 2020, he secured his maiden Formula One podium at the Austrian Grand Prix, becoming the third-youngest podium finisher in the sport's history. Over the next few years, Norris established himself as McLaren's undisputed team leader, consistently extracting maximum performance from the car and scoring multiple podium finishes.</p>
        <H2>BREAKTHROUGH VICTORIES AND CHAMPIONSHIP CONTENDER</H2>
        <p>The 2024 season proved to be the ultimate turning point for Norris and McLaren. At the Miami Grand Prix, he drove a flawless race to secure his highly anticipated, maiden Formula One victory. With a heavily upgraded and highly dominant car, Norris went on to claim multiple wins and engaged in a fierce, high-stakes battle against Max Verstappen for the World Drivers' Championship. Continuing his championship form into the following seasons, Norris has cemented his status as a true Formula One superstar, leading McLaren's charge for world championship glory.</p>
        <div class="driver-custom-photos" style="display: flex; gap: 15px; margin-top: 15px; margin-right: -2%;">
            <img src="../images/bio/lando1.avif" alt="Lando Norris 1" style="width: 48%; border-radius: 6px; object-fit: cover;">
            <img src="../images/bio/lando2.avif" alt="Lando Norris 2" style="width: 48%; border-radius: 6px; object-fit: cover;">
        </div>
    `,
    "piastri": `
        <H1>OSCAR PIASTRI: THE AUSTRALIAN PRODIGY AND FORMULA ONE WINNER</H1>
        <p>Oscar Jack Piastri, born on April 6, 2001, in Melbourne, Australia, is a professional racing driver competing in Formula One for McLaren alongside Lando Norris. Widely considered one of the most naturally talented and mentally composed young drivers of his generation, Piastri made a massive impact on the sport from the moment he arrived. Known for his exceptionally smooth driving style, precise tire management, and calm demeanor under immense pressure, he quickly established himself as a future world champion.</p>
        <H2>UNPRECEDENTED DOMINANCE IN THE JUNIOR CATEGORIES</H2>
        <p>Piastri began karting in Australia at the age of nine before moving to Europe to pursue his motorsport dream. His rise through the junior single-seater ranks was historic and unparalleled. He achieved a spectacular hat-trick of consecutive championships, winning the Formula Renault Eurocup in 2019, the FIA Formula 3 Championship in 2020, and dominating the 2021 FIA Formula 2 Championship as a rookie with Prema Racing. This extraordinary run put him in an elite club of drivers who won the F3 and F2 titles in back-to-back rookie seasons.</p>
        <H2>THE CONTRACT DRAMA AND SENSATIONAL MCLAREN DEBUT</H2>
        <p>After spending a year on the sidelines as Alpine's reserve driver, Piastri became the center of a major high-profile contract dispute in the summer of 2022, ultimately choosing to sign a multi-year deal with McLaren. He made his official Formula One debut in 2023 and immediately proved the hype was justified. He scored his maiden podium at Suzuka and won the Sprint race at the Qatar Grand Prix, wrapping up a stellar rookie campaign that earned him the FIA Rookie of the Year award and universal praise from the paddock.</p>
        <H2>BREAKTHROUGH VICTORIES AND FORMING A SUPER-TEAM</H2>
        <p>The 2024 season saw Piastri elevate his game to a world-class level as McLaren developed a championship-winning car. He achieved his breakthrough maiden Grand Prix victory at the Hungarian Grand Prix and followed it up with a brilliant, defensive masterclass win at the Azerbaijan Grand Prix. Together with Lando Norris, Piastri formed the most formidable and statistically dominant driver lineup on the grid, helping McLaren capture constructors' titles and consistently fighting for race wins at every circuit on the calendar.</p>
        <div class="driver-custom-photos" style="display: flex; gap: 15px; margin-top: 15px; margin-right: -2%;">
            <img src="../images/bio/oscar1.avif" alt="Oscar Piastri 1" style="width: 48%; border-radius: 6px; object-fit: cover;">
            <img src="../images/bio/oscar2.avif" alt="Oscar Piastri 2" style="width: 48%; border-radius: 6px; object-fit: cover;">
        </div>
    `,
    "russell": `
        <H1>GEORGE RUSSELL: THE BRITISH TALENT LEADING THE MERCEDES REVOLUTION</H1>
        <p>George William Russell, born on February 15, 1998, in King's Lynn, England, is a British professional racing driver competing in Formula One for Mercedes. Known for his exceptional qualifying speed, analytical approach to car setup, and immense work ethic, Russell was groomed by the Mercedes junior program to become the future leader of the Silver Arrows. His career is a story of patience, raw determination, and maximizing every single opportunity on his path to the front of the grid.</p>
        <H2>DOMINANCE IN JUNIOR CATEGORIES AND THE WILLIAMS APPRENTICESHIP</H2>
        <p>Russell enjoyed a highly decorated junior career, winning the BRDC Formula 4 Championship before moving to the international stage. He put together a sensational run by winning the GP3 Series in 2017 and dominating the 2018 FIA Formula 2 Championship as a rookie, beating future rivals Lando Norris and Alexander Albon. He made his Formula One debut in 2019 with Williams, spending three tough seasons dragging the uncompetitive car to positions it did not belong, earning the nickname "Mr. Saturday" for his miraculous qualifying performances.</p>
        <H2>PROMOTION TO MERCEDES AND BREAKTHROUGH VICTORIES</H2>
        <p>In 2022, Russell earned his dream promotion to the main Mercedes team alongside seven-time world champion Lewis Hamilton. Despite the team struggling with the new ground-effect regulations, Russell showed incredible consistency, finishing in the top five in nearly every race and securing his maiden Grand Prix victory with a flawless weekend at the São Paulo Grand Prix. He continued to establish himself as a premier race winner over the following seasons, including a spectacular victory at the 2024 Austrian Grand Prix.</p>
        <H2>BECOMING THE UNDISPUTED LEADER OF THE SILVER ARROWS</H2>
        <p>The 2025 season marked a major turning point in Russell's career as Lewis Hamilton departed for Ferrari, leaving George as the undisputed team leader at Mercedes. Partnered with young prodigy Andrea Kimi Antonelli, Russell took on the massive responsibility of leading car development and guiding the team back to championship-winning form. His technical feedback and mature leadership on and off the track have been instrumental as Mercedes fights to regain its status at the absolute pinnacle of Formula One.</p>
        <div class="driver-custom-photos" style="display: flex; gap: 15px; margin-top: 15px; margin-right: -2%;">
            <img src="../images/bio/george1.avif" alt="George Russell 1" style="width: 48%; border-radius: 6px; object-fit: cover;">
            <img src="../images/bio/george2.avif" alt="George Russell 2" style="width: 48%; border-radius: 6px; object-fit: cover;">
        </div>
    `,
    "antonelli": `
        <H1>ANDREA KIMI ANTONELLI: THE ITALIAN PRODIGY REWRITING THE RECORD BOOKS</H1>
        <p>Andrea Kimi Antonelli, born on August 25, 2006, in Bologna, Italy, is a professional racing driver competing in Formula One for the Mercedes-AMG Petronas F1 Team. Widely regarded as one of the most sensational young talents in modern motorsport history, Antonelli was fast-tracked to the pinnacle of racing by Mercedes team principal Toto Wolff. Known for his breathtaking raw speed, phenomenal wet-weather mastery, and emotional resilience, he has taken the sport by storm and broken multiple youngest-ever records.</p>
        <H2>A METEORIC RISE THROUGH JUNIOR CATEGORIES</H2>
        <p>The son of racing driver Marco Antonelli, Kimi was introduced to motorsport at a very young age and quickly established himself as a karting phenom, securing back-to-back European Karting Championships. After joining the Mercedes Junior Team in 2019, his transition to single-seaters was historically dominant. He captured both the Italian and ADAC Formula 4 titles in 2022, followed by the Formula Regional European Championship in 2023. In a bold move that shocked the paddock, Mercedes skipped him past Formula 3 entirely. He completed a single season in Formula 2 during 2024, securing multiple race wins and proving he was ready for the global stage.</p>
        <H2>FORMULA ONE DEBUT AND TAKING OVER FOR A LEGEND</H2>
        <p>Antonelli made his official Formula One debut in 2025 at just 18 years old, stepping into the highly coveted Mercedes seat vacated by seven-time world champion Lewis Hamilton. Partnered alongside George Russell, the young Italian handled the immense pressure of his rookie campaign with maturity beyond his years. He collected numerous point finishes and podium positions during his first year, successfully silencing critics and establishing himself as the centerpiece of Mercedes' future long-term plans.</p>
        <H2>THE 2026 CHAMPIONSHIP SURGE AND MONZA MASTERCLASS</H2>
        <p>The 2026 season became a historic turning point as Mercedes developed a world-beating car, allowing Antonelli to emerge as the leading candidate for the World Drivers' Championship. He secured his maiden Grand Prix victory early in the season and put together a stunning run of form, including a dominant lights-to-flag victory at the Monaco Grand Prix. His defining moment arrived at his home race, the Italian Grand Prix at Monza, where he took an engine penalty and started 19th on the grid. In front of a passionate Tifosi crowd, Antonelli executed a masterpiece recovery drive, carving through the field to claim an epic victory over his teammate George Russell.</p>
        <div class="driver-custom-photos" style="display: flex; gap: 15px; margin-top: 15px; margin-right: -2%;">
            <img src="../images/bio/kimi1.avif" alt="Andrea Kimi Antonelli 1" style="width: 48%; border-radius: 6px; object-fit: cover;">
            <img src="../images/bio/kimi2.avif" alt="Andrea Kimi Antonelli 2" style="width: 48%; border-radius: 6px; object-fit: cover;">
        </div>
    `,
    "gasly": `
        <H1>PIERRE GASLY: THE RESILIENT FRENCHMAN LEADING ALPINE'S CHARGE</H1>
        <p>Pierre Jean-Jacques Gasly, born on February 7, 1996, in Rouen, France, is a professional racing driver competing in Formula One for the Alpine F1 Team. Renowned for his exceptional resilience, tactical intelligence, and fierce overtaking ability, Gasly has navigated one of the most dramatic rollercoaster careers in modern motorsport. After enduring immense setbacks early in his Formula One journey, he completely rebuilt his reputation to establish himself as a proven race winner and the undisputed spearhead of France's national racing project.</p>
        <H2>EARLY LIFE, EUROPEAN TITLES, AND THE RED BULL CALL-UP</H2>
        <p>Gasly grew up in a family deeply rooted in motorsport and moved away from home at a young age to pursue professional karting. His junior career was highly decorated, highlighted by a dominant championship title in the Eurocup Formula Renault 2.0 in 2013 and a sensational crown in the 2016 GP2 Series with Prema Racing. His immense speed caught the eye of the Red Bull Junior Team, leading to his Formula One debut with Scuderia Toro Rosso in late 2017. Following an impressive full campaign in 2018, Gasly was quickly promoted to the senior Red Bull Racing team for the 2019 season to partner Max Verstappen.</p>
        <H2>RED BULL HEARTBREAK AND THE EMOTIONAL MONZA MIRACLE</H2>
        <p>Gasly's stint at Red Bull Racing proved to be incredibly difficult, as he struggled to adapt to a temperamental car under intense scrutiny, resulting in a sudden mid-season demotion back to Toro Rosso. Tragically, just days after his demotion, his closest childhood friend Anthoine Hubert lost his life in a racing accident. Displaying extraordinary mental fortitude, Gasly channeled his grief into his driving, securing his maiden podium later that year in Brazil. His ultimate redemption arrived at the 2020 Italian Grand Prix at Monza, where he drove a flawless race for AlphaTauri to capture an emotional, historic maiden victory, becoming the first French F1 race winner in 24 years.</p>
        <H2>THE ALL-FRENCH DREAM TEAM AT ALPINE</H2>
        <p>Seeking a fresh start and a manufacturer-backed future, Gasly made the high-profile switch to the Alpine F1 Team in 2023, joining forces with countryman Esteban Ocon to form an all-French lineup. He adapted swiftly, securing a brilliant podium finish at Zandvoort in his first season. As the team transitioned into a new era, Gasly emerged as Alpine's definitive team leader, consistently dragging the car into the points and playing a vital role in car development. His experience and technical feedback remain the foundation of Alpine's ambitions to climb back to the top of the Formula One grid.</p>
        <div class="driver-custom-photos" style="display: flex; gap: 15px; margin-top: 15px; margin-right: -2%;">
            <img src="../images/bio/pierre1.avif" alt="Pierre Gasly 1" style="width: 48%; border-radius: 6px; object-fit: cover;">
            <img src="../images/bio/pierre2.avif" alt="Pierre Gasly 2" style="width: 48%; border-radius: 6px; object-fit: cover;">
        </div>
    `,
    "lawson": `
        <H1>LIAM LAWSON: THE FEARLESS KIWI MAKING HIS MARK IN FORMULA ONE</H1>
        <p>Liam Jared Lawson, born on February 11, 2002, in Hastings, New Zealand, is a professional racing driver competing in Formula One for Racing Bulls, while also serving as a crucial stand-in driver within the Red Bull family. Recognized for his incredible adaptability, exceptional tire management, and calm composure under immense pressure, Lawson has repeatedly proven his ability to jump into uncompetitive machinery and immediately deliver points, earning a reputation as one of the most reliable grid operators in modern motorsport.</p>
        <H2>EARLY SUCCESS AND HIGHS AND LOWS IN THE JUNIOR RANKS</H2>
        <p>Lawson began competitive karting at the age of seven and dominated local championships in New Zealand before moving to Europe to pursue his open-wheel dreams. He quickly caught the eye of the Red Bull Junior Team and put together highly competitive rookie campaigns in both FIA Formula 3 and the FIA Formula 2 Championship, where he claimed multiple high-profile victories. His extreme versatility was further showcased in the 2023 Japanese Super Formula Championship, where he won multiple races on debut and pushed the title fight down to the absolute final round.</p>
        <H2>BREAKTHROUGH FORMULA ONE DEBUTS AND SYSTEM ROADBLOCKS</H2>
        <p>Lawson made a shocking and highly praised Formula One debut in 2023 with AlphaTauri, stepping in for an injured Daniel Ricciardo at the Dutch Grand Prix on just a few hours' notice. He finished a stellar ninth in Singapore, scoring his maiden points and turning heads across the paddock. Despite his immediate impact, the brutal nature of the Red Bull driver program meant he spent the early part of 2025 in a brief two-race stint with the senior squad before being returned to Racing Bulls, navigating massive political hurdles as he fought to secure a permanent home on the grid.</p>
        <H2>THE 2026 CAMPAIGN AND THE SENIOR RED BULL CALL-UP</H2>
        <p>The 2026 season saw Lawson assume the role of senior leader at Racing Bulls alongside rookie Arvid Lindblad, consistently dragging the car into point-scoring positions. His season took a dramatic turn when he was called back up to Red Bull Racing to substitute for his former teammate Isack Hadjar, who suffered a wrist injury during the summer break. Lawson seized the opportunity perfectly, scoring points in two of his three replacement races and matching his season-best finish with a stellar sixth place at the inaugural Spanish Grand Prix in Madrid, cementing his status as a world-class competitor.</p>
        <div class="driver-custom-photos" style="display: flex; gap: 15px; margin-top: 15px; margin-right: -2%;">
            <img src="../images/bio/liam1.avif" alt="Liam Lawson 1" style="width: 48%; border-radius: 6px; object-fit: cover;">
            <img src="../images/bio/liam2.avif" alt="Liam Lawson 2" style="width: 48%; border-radius: 6px; object-fit: cover;">
        </div>
    `,
    "lindblad": `
        <H1>ARVID LINDBLAD: THE BRITISH PHENOMENON BREAKING F1 RECORDS</H1>
        <p>Arvid Anand Olof Lindblad, born on August 8, 2007, in Virginia Water, England, is a British professional racing driver competing in Formula One for Visa Cash App Racing Bulls. Born to a Swedish father and a British Indian mother, Lindblad was fast-tracked through the motorsport ranks as a standout talent of the Red Bull Junior Team. Known for his incredible tactical calm and immediate adaptability, he entered Formula One as the youngest British driver in history and the grid's sole rookie for the 2026 season.</p>
        <H2>RAPID RISE AND HISTORIC JUNIOR RECORD</H2>
        <p>Lindblad began competitive kart racing at the age of seven and immediately showed champion potential, later joining the Red Bull driver program in 2021. His transition into open-wheel racing was meteoric. After a strong top-three campaign in Italian F4, Lindblad swept through the higher categories with unprecedented speed. He won the 2025 Formula Regional Oceania title, advanced to Formula 2 with Campos Racing, and became the youngest race winner in both FIA Formula 3 and FIA Formula 2 history, convincing Red Bull management that he was ready for the absolute top level after just one season in F2.</p>
        <H2>FORMULA ONE DEBUT WITH RACING BULLS</H2>
        <p>In 2026, Lindblad made his highly anticipated Formula One debut with Racing Bulls alongside teammate Liam Lawson. He immediately silenced any doubts about his age by finishing eighth in his very first race at the Australian Grand Prix, becoming the third-youngest point scorer in Formula One history. His rookie season continued to impress the paddock as he demonstrated remarkable consistency, extracting maximum performance from the midfield car and picking up massive point finishes, including an outstanding sixth-place drive through the streets of Monaco.</p>
        <H2>THE 2026 MID-SEASON BATTLE</H2>
        <p>As the 2026 European season progressed, Lindblad established himself as a future world championship contender. He delivered another stellar performance in front of his home crowd at the British Grand Prix, bringing his Racing Bulls home in seventh place. Showing incredible resilience against much more experienced grid veterans, Lindblad bounced back from a practice crash at the challenging new street circuit in Madrid to qualify in the top ten and score another crucial championship point, cementing his position as the most successful rookie graduate of his generation.</p>
        <div class="driver-custom-photos" style="display: flex; gap: 15px; margin-top: 15px; margin-right: -2%;">
            <img src="../images/bio/arvid1.avif" alt="Arvid Lindblad 1" style="width: 48%; border-radius: 6px; object-fit: cover;">
            <img src="../images/bio/arvid2.avif" alt="Arvid Lindblad 2" style="width: 48%; border-radius: 6px; object-fit: cover;">
        </div>
    `,
    "colapinto": `
        <H1>FRANCO COLAPINTO: THE ARGENTINE HERO REVIVING A RACING NATION</H1>
        <p>Franco Alejandro Colapinto, born on May 27, 2003, in Pilar, Argentina, is a professional racing driver competing in Formula One. As the first Argentine driver to race in the sport in over two decades, Colapinto has triggered a massive wave of motorsport enthusiasm across South America. Known for his aggressive yet precise driving style, exceptional overtaking ability, and charismatic personality, he quickly proved to the paddock that he possesses the raw speed and mental strength required to compete at the absolute highest level of motorsport.</p>
        <H2>EARLY CAREER AND THE WILLIAMS RACING ACADEMY</H2>
        <p>Colapinto began karting at the age of nine and moved to Europe as a teenager to pursue his dream of reaching Formula One. He made an immediate impact by dominating the 2019 Spanish F4 Championship in his rookie year. His consistent speed in the Formula Regional European Championship and a strong campaign in FIA Formula 3 caught the attention of the Williams Racing Driver Academy, which signed him in early 2023. He graduated to the FIA Formula 2 Championship for the 2024 season, taking a spectacular victory at Imola and establishing himself as a top-tier talent.</p>
        <H2>SHOCK MID-SEASON DEBUT AND IMMEDIATE IMPACT</H2>
        <p>Colapinto's big breakthrough came in late 2024 when Williams made the bold decision to promote him to a full-time Formula One race seat, replacing Logan Sargeant. Despite having minimal preparation time, he shocked the motorsport world with his immediate pace. In just his second race weekend, Colapinto drove a brilliant race through the streets of Baku to finish eighth, scoring his maiden Formula One points and becoming the first Argentine to score points since Carlos Reutemann in 1982. He followed this up with another points finish in Austin, cementing his reputation as a breakout star.</p>
        <H2>ESTABLISHING HIS PLACE ON THE GRID</H2>
        <p>Following his spectacular debut performances, Colapinto secured his long-term future in the paddock. Continuing his development into the subsequent seasons, he has focused on building consistency and improving his technical feedback to help his team move up the midfield order. With massive backing from his home country and a growing list of impressive on-track performances, Colapinto has transformed from a surprise mid-season replacement into an essential and highly valued member of the modern Formula One grid.</p>
        <div class="driver-custom-photos" style="display: flex; gap: 15px; margin-top: 15px; margin-right: -2%;">
            <img src="../images/bio/franco1.avif" alt="Franco Colapinto 1" style="width: 48%; border-radius: 6px; object-fit: cover;">
            <img src="../images/bio/franco2.avif" alt="Franco Colapinto 2" style="width: 48%; border-radius: 6px; object-fit: cover;">
        </div>
    `,
    "bearman": `
        <H1>OLIVER BEARMAN: THE BRITISH PRODIGY SHINING FOR TOYOTA GAZOO RACING HAAS</H1>
        <p>Oliver James Bearman, born on May 8, 2005, in Chelmsford, England, is a British professional racing driver competing in Formula One for the TGR Haas F1 Team. Known for his incredible adaptability, outstanding defensive driving skills, and immense mental composure under pressure, Bearman shocked the motorsport world with historic performances before securing a multi-year deal to become one of the foundational blocks of the American team's long-term future.</p>
        <H2>EARLY LIFE AND DOMINANCE IN THE JUNIOR RANKS</H2>
        <p>Bearman began competitive karting at the age of eight and showed an abundant amount of raw speed almost immediately. His transition to single-seaters was historic; in 2021, he became the first driver ever to win both the Italian and ADAC Formula 4 Championships in the same calendar year. This massive success earned him a highly coveted spot in the prestigious Ferrari Driver Academy. He advanced rapidly through the ranks, finishing a stellar third in his rookie FIA Formula 3 season and collecting dominant race victories in FIA Formula 2.</p>
        <H2>THE HISTORIC FERRARI DEBUT AND SHOCK PROMOTION</H2>
        <p>Bearman entered Formula One folklore in 2024 when he was called up by Scuderia Ferrari at the Saudi Arabian Grand Prix to replace an ill Carlos Sainz Jr. on just a few hours' notice. At 18 years old, he became the youngest British driver to start an F1 race and the youngest driver ever to race for Ferrari, driving a brilliant race to finish seventh. Later that year, he substituted for Kevin Magnussen at Haas in Baku and Brazil, becoming the first driver in F1 history to score points for two different teams in his first two career races. These stellar performances earned him a full-time promotion for the 2025 season.</p>
        <H2>THE 2026 CAMPAIGN AND MIDFIELD REVOLUTION</H2>
        <p>The 2026 season saw Bearman continue his development as a premier grid operator for TGR Haas F1 Team alongside his experienced teammate Esteban Ocon. He demonstrated sensational consistency, putting together multiple point finishes and matching his career-best results with top-tier performances. Despite encountering massive hurdles during the European season—including a heavy practice crash at the brand-new street circuit in Madrid that forced him to start the Spanish Grand Prix from the pit lane—Bearman remains highly praised for his technical feedback and maturity, solidifying his status as a key pillar for Haas and Ferrari's long-term partnership.</p>
        <div class="driver-custom-photos" style="display: flex; gap: 15px; margin-top: 15px; margin-right: -2%;">
            <img src="../images/bio/oliver1.avif" alt="Oliver Bearman 1" style="width: 48%; border-radius: 6px; object-fit: cover;">
            <img src="../images/bio/oliver2.avif" alt="Oliver Bearman 2" style="width: 48%; border-radius: 6px; object-fit: cover;">
        </div>
    `,
    "bortoleto": `
        <H1>GABRIEL BORTOLETO: THE BRAZILIAN PRODIGY LEADING AUDI'S NEW ERA</H1>
        <p>Gabriel Lourenzo Bortoleto Oliveira, born on October 14, 2004, in Osasco, São Paulo, is a professional racing driver competing in Formula One for the Audi Revolut F1 Team. As the first full-time Brazilian driver to compete in the sport since Felipe Massa, Bortoleto carries the immense hopes of a historic racing nation. Managed by two-time world champion Fernando Alonso's A14 management company, he is widely recognized for his supreme tactical intelligence, calm temperament, and an extraordinary ability to execute clean, mistake-free races even under intense midfield pressure.</p>
        <H2>HISTORIC BACK-TO-BACK JUNIOR CHAMPIONSHIPS</H2>
        <p>Bortoleto began competitive karting at the age of seven and moved to Europe at eleven to pursue a professional career, inspired by his childhood idol Ayrton Senna. After developing his skills in Italian F4 and Formula Regional, his career shifted into overdrive. He delivered a spectacular rookie campaign to capture the 2023 FIA Formula 3 Championship title with Trident. He followed this with a truly historic 2024 FIA Formula 2 Championship crown with Invicta Racing, which included a legendary victory at Monza where he became the first driver in history to win an F2 feature race from the very back of the grid.</p>
        <H2>FORMULA ONE DEBUT WITH SAUBER</H2>
        <p>Originally a member of the McLaren Driver Development Programme, Bortoleto was released in late 2024 to sign a multi-year Formula One contract with Sauber for the 2025 season, pairing up with the highly experienced Nico Hülkenberg. Despite driving uncompetitive machinery at the back of the field, the young Brazilian earned widespread praise across the paddock for his consistency and development feedback. He secured five top-ten finishes during his debut year—including a magnificent season-best sixth-place drive at the Hungarian Grand Prix—comfortably proving he belonged at the pinnacle of motorsport.</p>
        <H2>SPEARHEADING THE WORKS AUDI F1 PROJECT</H2>
        <p>For the 2026 season, Bortoleto was successfully retained as a cornerstone driver as the team officially transitioned into the Audi factory works squad. Navigating a fiercely contested midfield battle under the sport's new regulations, Bortoleto has continued his steady progression, capturing points in the opening rounds of the calendar. During the high-stakes European stretch, he demonstrated his exceptional team-player qualities, notably executing a marathon defensive tire strategy at the highly challenging street circuit in Madrid to occupy the chasing pack and help secure a crucial double-points finish for the German manufacturer.</p>
        <div class="driver-custom-photos" style="display: flex; gap: 15px; margin-top: 15px; margin-right: -2%;">
            <img src="../images/bio/gabriel1.avif" alt="Gabriel Bortoleto 1" style="width: 48%; border-radius: 6px; object-fit: cover;">
            <img src="../images/bio/gabriel2.avif" alt="Gabriel Bortoleto 2" style="width: 48%; border-radius: 6px; object-fit: cover;">
        </div>
    `,
    "hulkenberg": `
        <H1>NICO HÜLKENBERG: THE EXPERT GRID VETERAN SPEARHEADING AUDI</H1>
        <p>Nico Hülkenberg, born on August 19, 1987, in Emmerich am Rhein, Germany, is a professional racing driver competing in Formula One for the Audi Revolut F1 Team. Widely regarded as one of the most talented, technically gifted, and reliable drivers of his generation, Hülkenberg has built a legendary reputation as a midfield master and a qualifying specialist. Known for his incredible wet-weather skills and analytical approach to car setup, he serves as the perfect experienced spearhead for the German manufacturer's ambitious factory program.</p>
        <H2>DOMINANCE IN JUNIOR CATEGORIES AND THE FORMULA ONE DEBUT</H2>
        <p>Hülkenberg enjoyed one of the most successful junior careers in motorsport history, earning the nickname "The Hulk" for his unstoppable pace. He won the Formula 3 Euro Series, dominated the A1 Grand Prix series for Team Germany, and captured the 2009 GP2 Series championship as a rookie. He made his Formula One debut in 2010 with Williams, famously scoring a sensational maiden pole position in changing conditions at the Brazilian Grand Prix. Over the next decade, he became a highly sought-after driver, delivering stellar performances for Force India, Sauber, and Renault.</p>
        <H2>LE MANS GLORY, THE SUPER-SUB ERA, AND THE HAAS RESURGENCE</H2>
        <p>In 2015, while competing full-time in Formula One, Hülkenberg made history by winning the legendary 24 Hours of Le Mans on his first attempt with Porsche. After losing his full-time F1 seat at the end of 2019, he became the paddock's ultimate "super-sub," stepping into the Racing Point and Aston Martin cars with zero preparation to score brilliant points. His incredible adaptability earned him a full-time comeback with Haas in 2023. He transformed the American team's fortunes, regularly dragging the car into Q3 and scoring crucial points that caught the attention of top manufacturers.</p>
        <H2>LEADING THE WORKS AUDI FACTORY PROJECT</H2>
        <p>Hülkenberg signed a multi-year deal to join Sauber for 2025, a move specifically designed to position him at the center of Audi's official factory entrance for the 2026 season. Paired with young Brazilian prodigy Gabriel Bortoleto, Hülkenberg has taken on the massive responsibility of leading the technical development of the new power unit and chassis. His immense experience and consistent point-scoring finishes have been instrumental during the highly competitive 2026 season, helping Audi lay a solid foundation as they fight to climb towards the front of the grid.</p>
        <div class="driver-custom-photos" style="display: flex; gap: 15px; margin-top: 15px; margin-right: -2%;">
            <img src="../images/bio/nico1.avif" alt="Nico Hülkenberg 1" style="width: 48%; border-radius: 6px; object-fit: cover;">
            <img src="../images/bio/nico2.avif" alt="Nico Hülkenberg 2" style="width: 48%; border-radius: 6px; object-fit: cover;">
        </div>
    `,
    "tsunoda": `
        <H1>YUKI TSUNODA: THE EXPLOSIVE JAPANESE TALENT FIGHTING FOR HIS PLACE</H1>
        <p>Yuki Tsunoda, born on May 11, 2000, in Sagamihara, Kanagawa, Japan, is a professional racing driver serving as the official test and reserve driver for Oracle Red Bull Racing and Visa Cash App Racing Bulls. Known for his blistering raw speed, aggressive racecraft, and highly passionate, outspoken radio messages, Tsunoda became a beloved fan favorite. Supported throughout his career by Honda, he has consistently proven that he possesses the outright pace to challenge the very best on the grid.</p>
        <H2>RAPID RISE AND THE SECTOR OF HONDA'S BACKING</H2>
        <p>Tsunoda began competitive karting at the age of nine and advanced rapidly through the Japanese junior formulas with the backing of the Honda Formula Dream Project. After capturing the 2018 F4 Japanese Championship, he moved to Europe and joined the prestigious Red Bull Junior Team. His transition to international racing was spectacular; he finished a brilliant third in his rookie 2020 FIA Formula 2 Championship season with Carlin, collecting multiple wins and earning a swift promotion to the pinnacle of motorsport.</p>
        <H2>FORMULA ONE DEBUT AND TRICKY PROGRESSION</H2>
        <p>Tsunoda made his official Formula One debut in 2021 with Scuderia AlphaTauri, making an immediate impact by scoring points in his very first race in Bahrain. Over the next few seasons alongside Pierre Gasly and Daniel Ricciardo, Tsunoda underwent a massive maturation process. He gradually transformed his emotional outbursts into measured track performances, culminating in a brilliant career-best fourth-place finish at the 2021 Abu Dhabi Grand Prix. By 2024, he had established himself as the undisputed leader of the rebranded Racing Bulls squad.</p>
        <H2>THE RED BULL PROMOTION AND THE 2026 RESERVE ROLE</H2>
        <p>The 2025 season brought a major milestone when Red Bull promoted Tsunoda to the senior squad alongside Max Verstappen from the Japanese Grand Prix onwards, following a seat swap with Liam Lawson. However, navigating a difficult car alongside a multi-time world champion proved challenging. For the 2026 season, Red Bull elected to shift Tsunoda into a vital reserve and simulator role for both teams while introducing Isack Hadjar to the race seat. Showing immense resilience, Tsunoda made a surprise racing return at the 2026 Dutch Grand Prix, jumping into the Racing Bulls cockpit to replace an injured Hadjar and remind the paddock of his unrelenting hunger to race.</p>
        <div class="driver-custom-photos" style="display: flex; gap: 15px; margin-top: 15px; margin-right: -2%;">
            <img src="../images/bio/yuki1.avif" alt="Yuki Tsunoda 1" style="width: 48%; border-radius: 6px; object-fit: cover;">
            <img src="../images/bio/yuki2.avif" alt="Yuki Tsunoda 2" style="width: 48%; border-radius: 6px; object-fit: cover;">
        </div>
    `,
    "sainz": `
        <H1>CARLOS SAINZ: THE TECHNICAL MASTERCLASS AND WILLIAMS ANCHOR</H1>
        <p>Carlos Sainz Vázquez de Castro, born on September 1, 1994, in Madrid, Spain, is a professional racing driver competing in Formula One for Williams Racing. Known across the paddock as "The Smooth Operator," Sainz is highly regarded for his exceptional intelligent racecraft, superb technical feedback, and a rare ability to adapt to varying car characteristics. The son of a legendary double World Rally Champion, he has successfully built his own legacy as a proven Grand Prix winner and one of the most meticulous drivers on the modern grid.</p>
        <H2>EARLY LIFE, RED BULL ACADEMY, AND MIDFIELD EDUCATION</H2>
        <p>Growing up under the guidance of Carlos Sainz Sr., young Carlos began karting at an early age and joined the prestigious Red Bull Junior Team in 2010. After securing a dominant title in the 2014 Formula Renault 3.5 Series, he earned his promotion to Formula One, debuting alongside Max Verstappen at Scuderia Toro Rosso in 2015. Seeking to control his own destiny, Sainz embarked on a highly educational journey through the midfield, delivering strong campaigns for Renault before moving to McLaren in 2019. In Woking, he scored his maiden F1 podium in Brazil and played a key role in rebuilding the team's fortunes.</p>
        <H2>THE FERRARI YEARS AND HISTORIC VICTORIES</H2>
        <p>Sainz achieved a major career milestone in 2021 when he joined Scuderia Ferrari to replace Sebastian Vettel. He wasted no time matching the pace of Charles Leclerc, famously securing his maiden pole position and a historic first Grand Prix victory at the 2022 British Grand Prix at Silverstone. He went on to take further spectacular wins, notably breaking Red Bull's historic winning streak at the 2023 Singapore Grand Prix and storming to an emotional victory at the 2024 Australian Grand Prix just ten days after undergoing surgery for appendicitis.</p>
        <H2>ANCHORING THE WILLIAMS PROJECT INTO THE NEW ERA</H2>
        <p>Following Lewis Hamilton's shock move to Maranello, Sainz shifted his talents to Williams Racing for the 2025 season to partner Alexander Albon, instantly elevating the team with two podium finishes in Azerbaijan and Qatar during his debut year. Navigating a heavily contested midfield challenge through the 2026 season, Sainz chose to cement his long-term dedication to the project by signing a new multi-year contract extending his stay until at least the end of 2027. His experience and tactical guidance remain completely essential as Williams fights to climb back to the top flights of the sport.</p>
        <div class="driver-custom-photos" style="display: flex; gap: 15px; margin-top: 15px; margin-right: -2%;">
            <img src="../images/bio/carlos1.avif" alt="Carlos Sainz 1" style="width: 48%; border-radius: 6px; object-fit: cover;">
            <img src="../images/bio/carlos2.avif" alt="Carlos Sainz 2" style="width: 48%; border-radius: 6px; object-fit: cover;">
        </div>
    `,
    "ocon": `
        <H1>ESTEBAN OCON: THE MIDFIELD MASTER AND HAAS ANCHOR</H1>
        <p>Esteban José Jean-Pierre Ocon-Khelfane, born on September 17, 1996, in Évreux, France, is a professional racing driver competing in Formula One for the Toyota Gazoo Racing Haas F1 Team. Known for his incredible height, defensive wheel-to-wheel combat skills, and relentless consistency, Ocon has carved out a reputation as one of the grid's toughest competitors. After rising through the ranks as a member of the Mercedes development program, he went on to become a proven Grand Prix winner and a valuable technical anchor for his team.</p>
        <H2>FROM WORKING-CLASS SACRIFICE TO JUNIOR GLORY</H2>
        <p>Ocon's road to Formula One is a story of immense family sacrifice, with his parents selling their home and garage to live in a caravan while traveling between karting circuits across Europe. His exceptional talent made the gamble pay off. He enjoyed a historically dominant junior career, winning the 2014 FIA Formula 3 European Championship ahead of Max Verstappen, and following it up by capturing the 2015 GP3 Series title as a rookie. These stellar performances forced the Formula One paddock to take notice, earning him a mid-season global debut with Manor Racing at the 2016 Belgian Grand Prix.</p>
        <H2>THE POINT-SCORING STREAKS AND THE MONZA MIRACLE</H2>
        <p>In 2017, Ocon moved to Force India, where he formed a notoriously explosive partnership with Sergio Pérez and set an all-time record by finishing his first 27 consecutive career races. After a brief year on the sidelines as Mercedes' reserve driver, he returned to the grid full-time with Renault in 2020, securing his maiden F1 podium at the Sakhir Grand Prix. His career milestone arrived at the 2021 Hungarian Grand Prix with Alpine, where he delivered a defensive masterclass to hold off the entire pack and secure a sensational, emotional maiden Formula One victory.</p>
        <H2>SPEARHEADING THE TOYOTA GAZOO RACING HAAS PROJECT</H2>
        <p>Following a tense conclusion to his tenure at Alpine, Ocon signed a multi-year deal to transition to the Haas F1 Team alongside young British prodigy Oliver Bearman. Navigating a heavily contested midfield landscape through the subsequent seasons, Ocon's role became central to the squad's adaptation to new car characteristics. Despite facing tough intra-team battles and intense paddock rumors during the high-stakes calendar, Ocon remains completely focused on refining the American team's long-term technical architecture and dragging his machinery into point-scoring flights.</p>
        <div class="driver-custom-photos" style="display: flex; gap: 15px; margin-top: 15px; margin-right: -2%;">
            <img src="../images/bio/esteban1.avif" alt="Esteban Ocon 1" style="width: 48%; border-radius: 6px; object-fit: cover;">
            <img src="../images/bio/esteban2.avif" alt="Esteban Ocon 2" style="width: 48%; border-radius: 6px; object-fit: cover;">
        </div>
    `,
    "albon": `
        <H1>ALEXANDER ALBON: THE RESILIENT MIDFIELD LEADER OF WILLIAMS RACING</H1>
        <p>Alexander Albon Ansusinha, born on March 23, 1996, in London, England, is a British-Thai professional racing driver competing in Formula One for Williams Racing under the Thai flag. Known for his exceptionally smooth tire management, sharp overtaking skills, and a remarkably calm, positive demeanor under pressure, Albon has built a reputation as one of the most reliable and highly respected drivers on the grid. After a volatile early career within the Red Bull system, he successfully reinvented himself to become the long-term leader and technical anchor of the historic Grove-based team.</p>
        <H2>JUNIOR SUCCESS AND THE DRAMATIC RED BULL ROLLERCOASTER</H2>
        <p>Albon enjoyed a highly competitive junior career, finishing as runner-up to Charles Leclerc in the 2016 GP3 Series and placing third in the 2018 FIA Formula 2 Championship behind George Russell and Lando Norris. He made his Formula One debut in 2019 with Toro Rosso, but just twelve races into the season, he was rapidly promoted to Red Bull Racing to partner Max Verstappen. Despite scoring his maiden podium finishes at Mugello and Bahrain in 2020, Albon struggled with a temperamental car and intense pressure, leading to him being dropped to a reserve and simulator role for the 2021 season.</p>
        <H2>THE REBOOT AND SPEARHEADING THE WILLIAMS RESURGENCE</H2>
        <p>Albon made a triumphant full-time return to the grid in 2022 with Williams Racing, instantly filling the leadership void left by George Russell. He consistently dragged uncompetitive machinery into point-scoring positions with brilliant, unorthodox defensive strategies, highlighted by a marathon tire stint in Australia. By 2023 and 2024, Albon had established himself as the team's undisputed spearhead, scoring nearly all of Williams' points and convincing the team's management to build their long-term technical architecture around him with a multi-year contract extension.</p>
        <H2>THE 2026 MIDFIELD CAMPAIGN AND THE SAINZ PARTNERSHIP</H2>
        <p>The 2026 Formula One season brought a thrilling new chapter for Albon as he was partnered with the highly experienced Carlos Sainz, forming one of the most formidable and technically proficient driver lineups in the midfield. Navigating a heavily contested championship battle under the sport's new regulations, Albon has continued to show flashes of brilliance, routinely fighting for points in the opening rounds of the calendar. His exceptional feedback and deep chemistry with the crew remain completely essential as Williams fights to climb back into the top flights of the sport.</p>
        <div class="driver-custom-photos" style="display: flex; gap: 15px; margin-top: 15px; margin-right: -2%;">
            <img src="../images/bio/alex1.avif" alt="Alexander Albon 1" style="width: 48%; border-radius: 6px; object-fit: cover;">
            <img src="../images/bio/alex2.avif" alt="Alexander Albon 2" style="width: 48%; border-radius: 6px; object-fit: cover;">
        </div>
    `,
    "alonso": `
        <H1>FERNANDO ALONSO: THE TIMELESS LEGEND AND ASTON MARTIN SPEARHEAD</H1>
        <p>Fernando Alonso Díaz, born on July 29, 1981, in Oviedo, Spain, is a Spanish professional racing driver competing in Formula One for the Aston Martin Aramco F1 Team. Widely regarded as one of the greatest and most complete drivers in the history of motorsport, Alonso is a double World Drivers' Champion who has built a legendary reputation for his fierce racecraft, unmatched tactical intelligence, and extraordinary longevity. As the oldest and most experienced driver on the grid, his relentless hunger for victory continues to inspire generations of racing fans worldwide.</p>
        <H2>EARLY LIFE AND THE REVOLUTIONARY RENAULT CHAMPIONSHIP YEARS</H2>
        <p>Alonso began karting at the age of three when his father built a kart originally intended for his older sister. His raw talent immediately became obvious as he swept through domestic and international karting championships. He made his Formula One debut in 2001 with Minardi before moving to Renault, where he made history. In 2005 and 2006, Alonso put together a monumental run to secure back-to-back World Drivers' Championships with Renault, famously ending the era of Michael Schumacher's dominance and becoming the youngest world champion in the history of the sport at that time.</p>
        <H2>THE GLOBAL MOTORSPORT ODYSSEY AND THE TRIUMPHANT F1 RETURN</H2>
        <p>Following highly competitive stints with McLaren and Ferrari, where he narrowly missed out on additional titles, Alonso took a brief hiatus from Formula One at the end of 2018 to pursue other iconic motorsport challenges. He proved his legendary versatility by winning the 24 Hours of Le Mans twice, capturing the FIA World Endurance Championship, and conquering the grueling Dakar Rally. Unable to resist the pull of the pinnacle of motorsport, he made a triumphant return to Formula One in 2021 with Alpine before securing a high-profile move to Aston Martin, where he experienced a sensational resurgence with multiple podium finishes.</p>
        <H2>ANCHORING THE HONDA ERA AND CONTINUING THE FIGHT</H2>
        <p>The 2026 season brought a monumental transformation for Aston Martin as the team officially partnered with Honda to introduce a brand-new factory power unit, reuniting Alonso with the Japanese manufacturer. Navigating a challenging technical transition under the sport's new regulations, Alonso's immense experience and precise technical feedback have remained completely central to the team's development. Despite enduring a difficult midfield scrap and intense paddock speculation regarding his multi-year extension plans into 2027, the Spanish icon remains a formidable master grid operator, pushing his machinery to the absolute limit at every circuit.</p>
        <div class="driver-custom-photos" style="display: flex; gap: 15px; margin-top: 15px; margin-right: -2%;">
            <img src="../images/bio/fernando1.avif" alt="Fernando Alonso 1" style="width: 48%; border-radius: 6px; object-fit: cover;">
            <img src="../images/bio/fernando2.avif" alt="Fernando Alonso 2" style="width: 48%; border-radius: 6px; object-fit: cover;">
        </div>
    `,
    "stroll": `
        <H1>LANCE STROLL: THE AMBITIOUS CANADIAN IN ASTON MARTIN'S NEW FACTORY ERA</H1>
        <p>Lance Strulovitch, known globally as Lance Stroll, born on October 29, 1998, in Montreal, Canada, is a professional racing driver competing in Formula One for the Aston Martin Aramco F1 Team. As the son of billionaire fashion mogul and team owner Lawrence Stroll, Lance has spent his career under intense public scrutiny, yet he has repeatedly proven his raw talent with historic podiums, front-row starts, and a pole position in treacherous wet conditions. Known for his exceptional lightning-fast starts and bravery in unpredictable weather, he remains a key part of his team's ambitions.</p>
        <H2>RAPID RISE AND HISTORIC DEBUT PODIUM WITH WILLIAMS</H2>
        <p>Stroll enjoyed a highly decorated junior career, winning the Italian F4 Championship in 2014, the Toyota Racing Series in 2015, and dominating the 2016 FIA Formula 3 European Championship. He made his Formula One debut in 2017 with Williams at just 18 years old, becoming the second-youngest driver to start an F1 race. Despite a difficult start, he silenced critics at his home race in Canada by scoring his maiden points, and just a few weeks later, he drove a brilliant race to finish third at the Azerbaijan Grand Prix, making him the youngest rookie podium finisher in Formula One history.</p>
        <H2>THE RACING POINT YEARS AND A THRILLING WET-WEATHER POLE</H2>
        <p>In 2019, Stroll moved to Racing Point after his father purchased the team, launching a brand new chapter in his career. The 2020 season proved to be a major breakout year for the Canadian. He secured an incredible podium finish at the Italian Grand Prix and went on to claim a sensational, historic maiden pole position in extreme wet conditions at the Turkish Grand Prix, completely out-qualifying the entire field. He added another spectacular podium at the Sakhir Grand Prix, helping the team secure a strong fourth place in the constructors' championship.</p>
        <H2>PARTNERING ALONSO AND THE MONUMENTAL HONDA ERA</H2>
        <p>As the team transitioned into Aston Martin, Stroll faced the ultimate challenge of partnering four-time world champion Sebastian Vettel and later two-time world champion Fernando Alonso. The 2026 season brought a monumental shift as Aston Martin officially partnered with Honda to introduce a brand-new factory power unit. Navigating a fiercely contested midfield environment under the sport's new regulations, Stroll has focused heavily on finding consistency. His developmental feedback remains central to the project as he continues to race alongside Alonso, pushing the team to climb towards the front of the grid.</p>
        <div class="driver-custom-photos" style="display: flex; gap: 15px; margin-top: 15px; margin-right: -2%;">
            <img src="../images/bio/lance1.avif" alt="Lance Stroll 1" style="width: 48%; border-radius: 6px; object-fit: cover;">
            <img src="../images/bio/lance2.avif" alt="Lance Stroll 2" style="width: 48%; border-radius: 6px; object-fit: cover;">
        </div>
    `,
    "perez": `
        <H1>SERGIO PÉREZ: THE EXPERIENCED MIDFIELD GENERAL DRIVING FOR CADILLAC</H1>
        <p>Sergio Michel Pérez Mendoza, born on January 26, 1990, in Guadalajara, Mexico, is a professional racing driver competing in Formula One for the newly formed Cadillac Formula 1 Team. Famously known across the paddock by his nickname "Checo," Pérez has built a legendary reputation as a fierce combatant, a master of tire management, and one of the sport's ultimate street circuit specialists. As a proud representative of Mexico, his historic career has inspired millions of motorsport fans across Latin America.</p>
        <H2>EARLY LIFE, SACRIFICE, AND RISE TO THE GRID</H2>
        <p>Pérez began competitive karting at the age of six and left his home country alone as a teenager to move to Europe, chasing his dream under difficult financial constraints. After dominating the British Formula 3 Championship in 2007, he graduated to the GP2 Series, finishing as the championship runner-up in 2010. His impressive speed earned him a spot in the Ferrari Driver Academy, leading to his spectacular Formula One debut with Sauber in 2011. He secured his first emotional podium finishes with the team in 2012, immediately establishing himself as a rising star.</p>
        <H2>THE FORCE INDIA RESURGENCE AND THE SACHIR MIRACLE</H2>
        <p>Following a highly scrutinized and difficult single season at McLaren, Pérez rebuilt his career by joining Force India in 2014, anchoring the team through several transitions into Racing Point. He consistently dragged midfield machinery onto the podium with brilliant tire strategies. His defining career moment arrived at the 2020 Sakhir Grand Prix; after dropping to the very back of the grid on the opening lap, Pérez executed a masterpiece recovery drive to claim a sensational and historic maiden Formula One victory, proving his status as a world-class competitor.</p>
        <H2>THE RED BULL YEAR AND THE FRESH START WITH CADILLAC</H2>
        <p>In 2021, Pérez joined Red Bull Racing to partner Max Verstappen, playing a monumental role in the team's constructors' titles and famously finishing as the World Championship runner-up in 2023. Following his departure from the squad at the end of 2024 and taking a one-year hiatus from regular racing duties, Pérez made a high-profile return to the grid for the 2026 season to lead the all-new Cadillac factory project. Partnered alongside fellow grid veteran Valtteri Bottas, Pérez brings his immense experience to the American team, spearheading their development battle as they fight to conquer the sport's technical midfield frontier.</p>
        <div class="driver-custom-photos" style="display: flex; gap: 15px; margin-top: 15px; margin-right: -2%;">
            <img src="../images/bio/sergio1.avif" alt="Sergio Pérez 1" style="width: 48%; border-radius: 6px; object-fit: cover;">
            <img src="../images/bio/sergio2.avif" alt="Sergio Pérez 2" style="width: 48%; border-radius: 6px; object-fit: cover;">
        </div>
    `,
    "bottas": `
        <H1>VALTTERI BOTTAS: THE EXPERIENCED RACING MAESTRO ANCHORING CADILLAC</H1>
        <p>Valtteri Viktor Bottas, born on August 28, 1989, in Nastola, Finland, is a professional racing driver competing in Formula One for the Cadillac Formula 1 Team. Renowned for his exceptional single-lap speed, precise technical feedback, and unmatched team-player qualities, Bottas is a multi-time Grand Prix winner and a former World Championship runner-up. Known outside the cockpit for his calm Finnish demeanor, love for cycling, and charismatic fan-favorite personality, he serves as an invaluable anchor for his team's technical progression.</p>
        <H2>EARLY LIFE, DOMINANT JUNIOR TITLES, AND THE WILLIAMS DEBUT</H2>
        <p>Bottas began competitive karting at the age of six and spent years dominating domestic and international karting championships. His junior single-seater career was highly decorated, highlighted by back-to-back victories at the Masters of Formula 3 and a dominant championship crown in the 2011 GP3 Series. He made his official Formula One debut in 2013 with Williams, quickly proving his immense speed by scoring nine impressive podium finishes and anchoring the historic British team near the front of the constructor standings during the early V6 turbo-hybrid era.</p>
        <H2>THE MERCEDES SILVER ARROWS ERA AND WORLD TITLES</H2>
        <p>In early 2017, Bottas earned a high-profile promotion to Mercedes to partner Lewis Hamilton following the sudden retirement of Nico Rosberg. He made an immediate impact, securing his maiden pole position in Bahrain and storming to his first emotional victory at the Russian Grand Prix. Over his five highly successful seasons with the Silver Arrows, Bottas collected 10 Grand Prix victories, 20 pole positions, and played a monumental role in helping Mercedes capture five consecutive Constructors' World Championships, twice finishing the season as the Drivers' Championship runner-up.</p>
        <H2>LEADING THE SAUBER TRANSITION AND THE CADILLAC FRONTIER</H2>
        <p>Seeking a fresh project and a long-term leadership role, Bottas moved to Alfa Romeo Sauber in 2022, completely transforming the team's atmosphere and dragging his machinery to vital point-scoring positions. Following a transitional phase and a brief period on the sidelines after the 2024 season, Bottas made a spectacular, high-profile return to the grid for the 2026 season to spearhead the newly formed Cadillac factory racing team. Partnered alongside fellow grid veteran Sergio Pérez, Bottas brings his immense tactical experience and raw speed to the American manufacturer, leading their development charge into the sport's new era.</p>
        <div class="driver-custom-photos" style="display: flex; gap: 15px; margin-top: 15px; margin-right: -2%;">
            <img src="../images/bio/valtteri1.avif" alt="Valtteri Bottas 1" style="width: 48%; border-radius: 6px; object-fit: cover;">
            <img src="../images/bio/valtteri2.avif" alt="Valtteri Bottas 2" style="width: 48%; border-radius: 6px; object-fit: cover;">
        </div>
    `,
    

};

function showDriverDetail(item, teamName) {
    const driver = item.Driver;

    document.getElementById("drivers-grid-section").style.display = "none";
    document.getElementById("driver-detail-view").style.display = "block";

    document.getElementById("detail-name").innerHTML = `
        <span class="given-name">${driver.givenName}</span>
        <span>${driver.familyName}</span>
    `;
    
    document.getElementById("detail-meta").innerText = `${driver.nationality} • ${teamName} • #${driver.permanentNumber || "--"}`;
    document.getElementById("detail-watermark").innerText = driver.permanentNumber || "--";

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
        gradientBg = "linear-gradient(135deg, #000000 10%, #0d3cb3 100%)";
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

    // Plnění statistik nahoře vlevo
    document.getElementById("stat-num").innerText = `#${driver.permanentNumber || "N/A"}`;
    document.getElementById("stat-pos").innerText = `P${item.position}`;
    document.getElementById("stat-points").innerText = `${item.points} PTS`;
    document.getElementById("stat-nationality").innerText = driver.nationality;
    document.getElementById("stat-dob").innerText = driver.dateOfBirth;

    // Plnění automatického textu vpravo nahoře
    document.getElementById("detail-auto-bio").innerHTML = `
        <p><strong>${driver.givenName} ${driver.familyName}</strong> is competing in the 2026 FIA Formula One World Championship, representing <strong>${teamName}</strong> with permanent number <strong>#${driver.permanentNumber || "N/A"}</strong>.</p>
        <p>Born on ${driver.dateOfBirth} in ${driver.nationality}, ${driver.givenName} drives under the permanent racing number <strong>#${driver.permanentNumber || "N/A"}</strong>.</p>
        <p>Throughout the 2026 season, ${driver.familyName} aims to maximize performance on track, contributing vital technical feedback and fighting for top positions in the championship standings.</p>
        `;

    // Plnění vlastního velkého životopisu a fotek dole
    const customText = customBiographies[driverKey] || `
        <p>Detailed biography and career history for ${driver.givenName} ${driver.familyName} coming soon. Stay tuned for exclusive insights and photo galleries!</p>
        
        `;
    document.getElementById("detail-custom-bio").innerHTML = customText;

    window.scrollTo({ top: 0, behavior: 'smooth' });      
}