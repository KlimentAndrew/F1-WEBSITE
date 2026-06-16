// THE 3 CATEGORIES STRUCTURE
const techzoneContent = {
    "monopost": [
        { key: "mono1", tag: "FIA REGULATION", title: "Front Wing Morphology", hotspots: [{ x: 12.0, y: 48.0, label: "Inwash Endplate Geometry", text: "The front wing endplates are curved inward to manage wheel wake." }, { x: 50.0, y: 65.0, label: "Narrower Wing Span", text: "The overall front wing span is reduced by 100mm compared to previous regulations." }] },
        { key: "mono3", tag: "FIA REGULATION", title: "Front Wheel Wake Shrouds", hotspots: [{ x: 30.5, y: 52.0, label: "Tyre Deflector Installation", text: "Mandatory structural carbon deflectors sit over the inside of the front wheels." }] },
        { key: "mono2", tag: "FIA REGULATION", title: "Frontal Drag & Nose Geometry", hotspots: [{ x: 13.0, y: 55.0, label: "Nose Tip Profile", text: "Strict regulations define the lower nose tip volume to enforce a low-stagnation profile." }] },
        { key: "mono4", tag: "FIA REGULATION", title: "Active Aerodynamics", hotspots: [{ x: 45.0, y: 35.0, label: "Moveable Wing Elements", text: "The main wing elements shift state electronically. Flaps flatten out on straights (X-Mode)." }] },
        { key: "mono5", tag: "FIA REGULATION", title: "Sidepod Bounding Box", hotspots: [{ x: 38.5, y: 22.0, label: "Exclusion Sidepod Volume", text: "No aerodynamic winglets or turning vanes are permitted on the upper sidepod surfaces." }] },
        { key: "mono6", tag: "FIA REGULATION", title: "Venturi Tunnels & Floor", hotspots: [{ x: 42.0, y: 82.0, label: "Raised Tunnel Throat", text: "The underfloor venturi throat is raised relative to the reference plane to prevent porpoising." }] },
        { key: "mono7", tag: "FIA REGULATION", title: "Rear Wheel Wake & Floor Edge", hotspots: [{ x: 74.0, y: 55.0, label: "Tyre Squish Management", text: "Floor edges ahead of the rear tire manage tyre squish turbulence." }] },
        { key: "mono8", tag: "FIA REGULATION", title: "Diffuser & Rear Structure", hotspots: [{ x: 87.0, y: 78.0, label: "Diffuser Exit Profile", text: "The rear diffuser features a steeper, narrower exit profile to push trailing air upward." }] }
    ],
    "tires": [
        { key: "tires", tag: "PIRELLI MOTORSPORT", title: "2026 Tyre Specifications", hotspots: [{ x: 50.0, y: 50.0, label: "Chassis Tyre Scaling", text: "Front tyres are reduced from 305mm to 280mm, while rear compounds drop from 405mm to 375mm to control mechanical grip values." }] }
    ],
    "flags": [
        { key: "flags", tag: "FIA MARSHALING", title: "Circuit Signaling Flags", hotspots: [{ x: 50.0, y: 40.0, label: "Digital Flag Panels", text: "Advanced electronic light panels and physical flag signaling enforce safety tracking parameters across tracks." }] }
    ]
};

let currentCategory = "monopost";
let currentSlideIndex = 0;

// ELEMENTS
const navTabs = document.querySelectorAll('.nav-tab');
const mainShowcaseAsset = document.getElementById('mainShowcaseAsset');
const canvasHotspotOverlay = document.getElementById('canvasHotspotOverlay');
const monopostControls = document.getElementById('monopostControls');

const hudAssetCounter = document.getElementById('hudAssetCounter');
const hudAssetTitle = document.getElementById('hudAssetTitle');
const btnPrevAsset = document.getElementById('btnPrevAsset');
const btnNextAsset = document.getElementById('btnNextAsset');

const liquidModal = document.getElementById('liquidModal');
const modalTag = document.getElementById('modalTag');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const closeLiquidModal = document.getElementById('closeLiquidModal');

// CATEGORY SWITCHING LOGIC
navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        navTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        currentCategory = tab.getAttribute('data-category');
        currentSlideIndex = 0;
        
        // Zobrazit / Schovat spodní ovládací šipky podle vybrané sekce
        if (currentCategory === "monopost") {
            monopostControls.style.display = "flex";
        } else {
            monopostControls.style.display = "none";
        }
        
        renderActiveItem();
    });
});

function renderActiveItem() {
    const activeArray = techzoneContent[currentCategory];
    const item = activeArray[currentSlideIndex];
    if (!item) return;

    if (currentCategory === "monopost") {
        hudAssetTitle.textContent = item.title;
        hudAssetCounter.textContent = `${String(currentSlideIndex + 1).padStart(2, '0')} // ${String(activeArray.length).padStart(2, '0')}`;
    }

    mainShowcaseAsset.style.opacity = '0';
    dismissLiquidModal();
    
    mainShowcaseAsset.src = `../images/monopost/${item.key}.avif`;
    
    mainShowcaseAsset.onload = () => {
        mainShowcaseAsset.style.opacity = '1';
        drawHotspots(item.hotspots, item.tag);
    };
}

function drawHotspots(hotspots, sectionTag) {
    canvasHotspotOverlay.innerHTML = "";
    
    const w = mainShowcaseAsset.clientWidth;
    const h = mainShowcaseAsset.clientHeight;
    
    canvasHotspotOverlay.style.width = `${w}px`;
    canvasHotspotOverlay.style.height = `${h}px`;
    canvasHotspotOverlay.style.left = `${mainShowcaseAsset.offsetLeft}px`;
    canvasHotspotOverlay.style.top = `${mainShowcaseAsset.offsetTop}px`;

    hotspots.forEach(spot => {
        const dot = document.createElement('div');
        dot.classList.add('tech-glow-node');
        dot.style.left = `${spot.x}%`;
        dot.style.top = `${spot.y}%`;
        
        dot.addEventListener('click', (e) => {
            e.stopPropagation();
            
            document.querySelectorAll('.tech-glow-node').forEach(n => n.classList.remove('active'));
            dot.classList.add('active');
            
            // Decentní designový polotón fotky, když je zobrazen detail
            mainShowcaseAsset.style.opacity = '0.35';

            // Naplnění Liquid Glass Modalu daty
            modalTag.textContent = sectionTag;
            modalTitle.textContent = spot.label;
            modalDesc.textContent = spot.text;
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

// SLIDER TRIGGERS
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

// CLOSE CONTROLS
closeLiquidModal.addEventListener('click', (e) => {
    e.stopPropagation();
    dismissLiquidModal();
});

// Kliknutí mimo resetuje zatemnění a schová Liquid Glass box
document.addEventListener('click', dismissLiquidModal);

window.addEventListener('resize', () => {
    const activeArray = techzoneContent[currentCategory];
    if(activeArray[currentSlideIndex]) {
        drawHotspots(activeArray[currentSlideIndex].hotspots, activeArray[currentSlideIndex].tag);
    }
});

// LOAD ON BOOT
window.addEventListener('DOMContentLoaded', () => {
    renderActiveItem();
});