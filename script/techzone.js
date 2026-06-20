const techzoneContent = {
    "monopost": [
        { key: "mono1", tag: "FIA REGULATION", title: "Downsizing & Weight", hotspots: [{ x: 25.0, y: 65.0, label: "Downsizing & Weight", text: "Highlights the strict 768 kg minimum weight limit (a 30 kg reduction). The downsized, lightweight carbon-composite chassis is optimized for maximum low-speed agility." },] },
        { key: "mono2", tag: "FIA REGULATION", title: "Width & Length", hotspots: [{ x: 75.5, y: 75.0, label: "Width", text: "Limited to a maximum of 1900 mm (reduced from 2000 mm) to narrow the aerodynamic profile and create more overtaking space on track." },{ x: 17.5, y: 50.0, label: "Length", text: "The total bumper-to-bumper length is approximately 5500 mm, while the technical wheelbase (axle-to-axle) is restricted to 3100 mm to force a more compact chassis." }] },
        { key: "mono3", tag: "FIA REGULATION", title: "Front Wheel Custom Engineering", hotspots: [{ x: 20.0, y: 55.0, label: "Front Wheel Custom Engineering", text: "Focuses on the front wheel assembly, now featuring a narrower 280 mm tyre width. Teams engineer these rims entirely in-house for bespoke aerodynamic ducting." }] },
        { key: "mono4", tag: "FIA REGULATION", title: "Active Aerodynamics - Part 1", hotspots: [{ x: 70.0, y: 40.0, label: "Active Aerodynamics - Part 1", text: "Details the active front wing flaps. They dynamically adjust between Z-Mode (high downforce for cornering) and X-Mode (minimum drag for straights).." }] },
        { key: "mono5", tag: "FIA REGULATION", title: "Active Aerodynamics - Part 2", hotspots: [{ x: 40.0, y: 55.0, label: "Active Aerodynamics - Part 2", text: "Shows the active rear wing operating in sync with the front elements. The wing mechanically shifts into X-Mode on straightaways to unlock maximum top speed.." }] },
        { key: "mono6", tag: "FIA REGULATION", title: "The Halo Safety Device", hotspots: [{ x: 55.0, y: 50.0, label: "The Halo Safety Device", text: "Displays the mandatory titanium Halo structure, engineered to withstand a massive 125 kN load. Its aerodynamic fairing minimizes airflow disruption into the engine intake." }] }
        
    ],
    "tires": [
        { key: "all", tag: "PIRELLI MOTORSPORT", title: "P-Zero White - Hard Compound", htmlContent: "<p>Designed for maximum endurance and tracks with high-energy lateral loads (like Silverstone or Barcelona).</p><p>This compound uses a high-density thermal resistance polymer layout to ensure the lowest possible wear rate over extensive racing stints, though it requires longer preparation phases to reach optimum core operational temperature.</p>" },
        { key: "all", tag: "PIRELLI MOTORSPORT", title: "P-Zero Yellow - Medium Compound", htmlContent: "<p>The baseline specification compound used across nearly every race weekend format.</p><p>Strikes an absolute balance between immediate chemical grip scaling and mechanical degradation layout, serving as the core strategy tier for long distance endurance phases.</p>" },
        { key: "all", tag: "PIRELLI MOTORSPORT", title: "P-Zero Red - Soft Compound", htmlContent: "<p>Engineered strictly for ultimate peak mechanical adhesion during short-run qualifying trim.</p><p>This high-grip profile compound offers instant operating range compliance, but suffers high thermal degradation levels under full fuel loads.</p>" },
        { key: "all", tag: "PIRELLI MOTORSPORT", title: "Cinturato Green - Intermediate", htmlContent: "<p>The intermediate tyres are the most versatile of the rain tyres, designed for use on a damp track or in light rain.</p><p>The tread pattern features shallow grooves that efficiently disperse standing water while maintaining a high contact patch area, preventing aquaplaning without overheating too quickly if the track begins to dry out.</p>" },
        { key: "all", tag: "PIRELLI MOTORSPORT", title: "Cinturato Blue - Full Wet", htmlContent: "<p>The full wet tyres are engineered for heavy rain and extreme monsoonal track conditions.</p><p>Featuring deep tread grooves and a highly aggressive directional pattern, these tyres can disperse massive amounts of water per second at full racing speeds. The rubber compound is ultra-soft to generate mechanical grip on cold, fully flooded asphalt.</p>" }
    ],
    "flags": [
        { key: "flag_red", tag: "FIA MARSHALING", title: "Red Flag // Session Suspended", htmlContent: "<p>The race or practice session is immediately halted due to serious accident tracking or hazardous weather environments.</p><p>Drivers must reduce speed immediately, overtaking is strictly prohibited, and all cars must return to the pit lane directly.</p>" },
        { key: "flag_yellow", tag: "FIA MARSHALING", title: "Yellow Flag // Sector Danger", htmlContent: "<p>Indicates structural hazard parameters or tracking vectors on or adjacent to the racing line.</p><p>Single Yellow: Reduce speed and prepare to alter trajectory. Double Yellow: Massive track obstruction, reduce velocity significantly, be ready to come to a complete stop.</p>" }
    ]
};

let currentCategory = "monopost";
let currentSlideIndex = 0;

// DOM Elements
const subTabs = document.querySelectorAll('.sub-tab');
const interactiveStage = document.getElementById('interactiveStage');
const textCategoryLayout = document.getElementById('textCategoryLayout');

const mainShowcaseAsset = document.getElementById('mainShowcaseAsset');
const canvasHotspotOverlay = document.getElementById('canvasHotspotOverlay');
const liquidModal = document.getElementById('liquidModal');
const modalTag = document.getElementById('modalTag');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const closeLiquidModal = document.getElementById('closeLiquidModal');

// Text Side Layout Elements
const layoutSideImage = document.getElementById('layoutSideImage');
const textContentTag = document.getElementById('textContentTag');
const textContentTitle = document.getElementById('textContentTitle');
const textContentBody = document.getElementById('textContentBody');

// Universal HUD Controls
const hudAssetCounter = document.getElementById('hudAssetCounter');
const hudAssetTitle = document.getElementById('hudAssetTitle');
const btnPrevAsset = document.getElementById('btnPrevAsset');
const btnNextAsset = document.getElementById('btnNextAsset');

subTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        subTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        currentCategory = tab.getAttribute('data-category');
        currentSlideIndex = 0;
        
        renderActiveItem();
    });
});

function renderActiveItem() {
    const activeArray = techzoneContent[currentCategory];
    const item = activeArray[currentSlideIndex];
    if (!item) return;

    // Aktualizace spodní společné lišty HUD
    hudAssetTitle.textContent = item.title;
    hudAssetCounter.textContent = `${String(currentSlideIndex + 1).padStart(2, '0')} // ${String(activeArray.length).padStart(2, '0')}`;

    // VYČIŠTĚNÍ STARÝCH TEČEK před jakýmkoliv vykreslením
    document.querySelectorAll('.tech-glow-node').forEach(node => node.remove());
    dismissLiquidModal();

    if (currentCategory === "monopost") {
        // Zapnout interaktivní plochu s obrázkem na pozadí
        textCategoryLayout.style.display = "none";
        interactiveStage.style.display = "block";

        mainShowcaseAsset.style.opacity = '0';
        mainShowcaseAsset.src = `/images/monopost/${item.key}.avif`;
        mainShowcaseAsset.onload = () => {
            mainShowcaseAsset.style.opacity = '1';
            drawHotspots(item.hotspots, item.tag);
        };
    } else {
        interactiveStage.style.display = "none";
        textCategoryLayout.style.display = "flex";

        layoutSideImage.src = `/images/tech/${item.key}.jpg`;
        textContentTag.textContent = item.tag;
        textContentTitle.textContent = item.title;
        textContentBody.innerHTML = item.htmlContent;
    }
}

function drawHotspots(hotspots, sectionTag) {
    if (!hotspots) return;

    hotspots.forEach(spot => {
        const dot = document.createElement('div');
        dot.classList.add('tech-glow-node');
        dot.style.left = `${spot.x}%`;
        dot.style.top = `${spot.y}%`;
        
        dot.addEventListener('click', (e) => {
            e.stopPropagation();
            
            document.querySelectorAll('.tech-glow-node').forEach(n => n.classList.remove('active'));
            dot.classList.add('active');
            
            mainShowcaseAsset.style.opacity = '0.35';

            modalTag.textContent = sectionTag;
            modalTitle.textContent = spot.label;
            modalDesc.textContent = spot.text;

            liquidModal.style.left = `${spot.x}%`;
            liquidModal.style.top = `${spot.y}%`;
            liquidModal.classList.add('visible');
        });
        
        canvasHotspotOverlay.appendChild(dot);
    });
}

function dismissLiquidModal() {
    liquidModal.classList.remove('visible');
    mainShowcaseAsset.style.opacity = '1';
    document.querySelectorAll('.tech-glow-node').forEach(n => n.classList.remove('active'));
}

btnPrevAsset.addEventListener('click', () => {
    const total = techzoneContent[currentCategory].length;
    currentSlideIndex = (currentSlideIndex === 0) ? total - 1 : currentSlideIndex - 1;
    renderActiveItem();
});

btnNextAsset.addEventListener('click', () => {
    const total = techzoneContent[currentCategory].length;
    currentSlideIndex = (currentSlideIndex === total - 1) ? 0 : currentSlideIndex + 1;
    renderActiveItem();
});

closeLiquidModal.addEventListener('click', (e) => {
    e.stopPropagation();
    dismissLiquidModal();
});

document.addEventListener('click', (e) => {
    if (!liquidModal.contains(e.target)) {
        dismissLiquidModal();
    }
});

window.addEventListener('DOMContentLoaded', () => {
    renderActiveItem();
});