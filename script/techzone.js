const techData = {
    engine: {
        title: "1.6L V6 TURBO HYBRID",
        subtitle: "⚡ 50/50 POWER SPLIT BETWEEN ICE AND ELECTRIC",
        imgSrc: "../images/monopost/mono1.avif",
        stats: [
            "1.6L V6 Turbocharged",
            "350 kW (470 hp)",
            "15,000 RPM",
            "Removed for 2026",
            "3,000 MJ/h Energy Flow"
        ],
        overview: "<p>The 2026 Formula 1 power unit represents a massive leap toward sustainable motorsport. While retaining the high-revving 1.6-liter V6 internal combustion engine, the electrical output increases dramatically.</p><p>By eliminating the complex MGU-H and boosting the MGU-K to 350kW, electric power now provides roughly 50% of the overall horsepower output.</p>"
    },
    aero: {
        title: "ACTIVE AERODYNAMICS",
        subtitle: "💨 Z-MODE & X-MODE DYNAMIC WING CONTROL",
        imgSrc: "../images/monopost/mono4.avif",
        stats: [
            "Active Front & Rear Wings",
            "Cornering Downforce Mode",
            "Low Drag Straight Mode",
            "30% Drag Reduction",
            "Fully Integrated Override"
        ],
        overview: "<p>Formula 1 is moving away from traditional DRS in favor of full Active Aerodynamics. Both front and rear wings adjust positions on the fly depending on where the car is on track.</p><p>Z-Mode deploys high downforce in corners for maximum cornering speeds, while X-Mode sheds drag on straights to boost top speed and facilitate overtaking.</p>"
    },
    chassis: {
        title: "COMPACT CHASSIS & WEIGHT",
        subtitle: "🏎️ 30KG LIGHTER AND SHORTER WHEELBASE",
        imgSrc: "../images/monopost/mono2.avif",
        stats: [
            "768 kg (Minimum Mass)",
            "3,400 mm Wheelbase",
            "1,900 mm Car Width",
            "18-inch Wheels",
            "Carbon Monocoque"
        ],
        overview: "<p>Addressing the growing weight of modern race cars, 2026 regulations enforce 'nimble car' concepts with smaller dimensions and reduced total weight.</p><p>With a reduced wheelbase and narrower track width, cars become significantly more responsive in low-speed corners, encouraging closer wheel-to-wheel racing.</p>"
    },
    fuel: {
        title: "100% SUSTAINABLE FUEL",
        subtitle: "🌱 ZERO-NET CARBON EMISSION SYNTHETICS",
        imgSrc: "../images/monopost/mono8.avif",
        stats: [
            "100% Advanced Synthetic",
            "Net-Zero Carbon Footprint",
            "Drop-in Fuel Spec",
            "Non-Food Biomass Origin",
            "Full Combustion Efficiency"
        ],
        overview: "<p>F1 power units will operate on 100% sustainable fuels derived from non-food municipal waste or carbon capture technologies.</p><p>This drop-in synthetic fuel allows maximum power output without producing additional atmospheric carbon, setting a benchmark for future automotive technology.</p>"
    }
};

function switchTech(key, btnElement) {
    document.querySelectorAll('.tech-btn').forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');

    const item = techData[key];
    if (!item) return;

    document.getElementById('tech-hero-title').textContent = item.title;
    document.getElementById('tech-hero-subtitle').textContent = item.subtitle;

    // Dynamická změna obrázku v banneru
    const imgEl = document.getElementById('tech-hero-img');
    if (imgEl) {
        imgEl.src = item.imgSrc;
    }

    document.getElementById('tech-stat-1').textContent = item.stats[0];
    document.getElementById('tech-stat-2').textContent = item.stats[1];
    document.getElementById('tech-stat-3').textContent = item.stats[2];
    document.getElementById('tech-stat-4').textContent = item.stats[3];
    document.getElementById('tech-stat-5').textContent = item.stats[4];

    document.getElementById('tech-overview-text').innerHTML = item.overview;
}