// Taxonomy Classification Explorer
// Interactive nested-box visualization showing taxonomic hierarchy for mosses
// MicroSim version 2026.03

let containerWidth;
let canvasWidth = 400;
let drawHeight = 480;
let controlHeight = 40;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 20;
let sliderLeftMargin = 100;

let selectedLevel = -1;
let hoveredLevel = -1;

// Taxonomic hierarchy levels
const levels = [
    {
        name: 'Domain Eukarya',
        color: [220, 220, 220],
        hoverColor: [200, 200, 200],
        description: 'All organisms with cells containing a nucleus. Includes plants, animals, fungi, and protists. Eukaryotic cells are typically 10-100 micrometers in diameter.'
    },
    {
        name: 'Kingdom Plantae',
        color: [200, 230, 200],
        hoverColor: [180, 220, 180],
        description: 'Multicellular organisms that photosynthesize using chlorophyll. Plants produce their own food from sunlight, water, and CO2. Over 380,000 known species.'
    },
    {
        name: 'Division Bryophyta',
        color: [150, 210, 150],
        hoverColor: [130, 200, 130],
        description: 'Non-vascular land plants including mosses. Bryophytes lack true roots, stems, and leaves. They absorb water directly through their tissues and reproduce via spores, not seeds.'
    },
    {
        name: 'Class',
        color: [100, 190, 100],
        hoverColor: [80, 180, 80],
        description: 'Mosses are divided into classes based on structural features. The three examples shown belong to different classes: Polytrichopsida, Sphagnopsida, and Leucobryopsida.'
    }
];

// Three example species
const species = [
    {
        name: 'Polytrichum commune',
        common: 'Haircap Moss',
        className: 'Polytrichopsida',
        family: 'Polytrichaceae',
        color: [34, 120, 34],
        description: 'One of the tallest mosses, growing up to 40 cm. Has a complex internal structure with water-conducting cells. Found in forests and heathlands worldwide. Its hairy calyptra covers the spore capsule.'
    },
    {
        name: 'Sphagnum palustre',
        common: 'Peat Moss',
        className: 'Sphagnopsida',
        family: 'Sphagnaceae',
        color: [60, 140, 60],
        description: 'The bog builder. Sphagnum can hold 20x its dry weight in water. It acidifies its environment, creating conditions hostile to competitors. Peat bogs store one-third of all terrestrial carbon.'
    },
    {
        name: 'Leucobryum glaucum',
        common: 'Cushion Moss',
        className: 'Bryopsida',
        family: 'Leucobryaceae',
        color: [80, 160, 80],
        description: 'Forms distinctive pale green cushions on acidic forest floors. Its whitish color comes from large, empty hyaline cells that store water. When dry, it turns white; when wet, it glows bright green.'
    }
];

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));
    textFont('Arial');
    describe('Interactive nested boxes showing taxonomic classification of three moss species', LABEL);
}

function draw() {
    updateCanvasSize();

    // Drawing area
    fill('aliceblue');
    stroke('silver');
    strokeWeight(1);
    rect(0, 0, canvasWidth, drawHeight);

    // Control area
    fill('white');
    stroke('silver');
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Title
    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(20);
    text('Taxonomy Classification Explorer', canvasWidth / 2, 8);

    // Calculate layout
    let boxMargin = 12;
    let boxTop = 38;
    let infoWidth = min(250, canvasWidth * 0.32);
    let diagramWidth = canvasWidth - infoWidth - 20;
    let boxWidth = diagramWidth - 2 * margin;

    // Check hover
    hoveredLevel = -1;
    let hoveredSpecies = -1;

    // Draw nested boxes (outer to inner)
    for (let i = 0; i < levels.length; i++) {
        let x = margin + i * boxMargin;
        let y = boxTop + i * boxMargin;
        let w = boxWidth - 2 * i * boxMargin;
        let h = (i < 3) ? (drawHeight - boxTop - 30 - 2 * i * boxMargin) : 0;

        if (i < 3) {
            // Outer levels
            let c = (selectedLevel === i) ? levels[i].hoverColor : levels[i].color;
            fill(c[0], c[1], c[2]);
            stroke(c[0] - 40, c[1] - 40, c[2] - 40);
            strokeWeight(2);
            rect(x, y, w, h, 6);

            // Label
            fill(40);
            noStroke();
            textAlign(LEFT, TOP);
            textSize(12);
            text(levels[i].name, x + 6, y + 4);

            // Check hover
            if (mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h) {
                hoveredLevel = i;
            }
        }
    }

    // Species boxes (innermost, three columns)
    let speciesTop = boxTop + 3 * boxMargin + 20;
    let speciesAreaWidth = boxWidth - 6 * boxMargin;
    let speciesAreaLeft = margin + 3 * boxMargin;
    let speciesWidth = (speciesAreaWidth - 20) / 3;
    let speciesHeight = drawHeight - speciesTop - 50;

    // Class label
    fill(40);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(12);
    text(levels[3].name + ' (varies)', speciesAreaLeft + 2, speciesTop - 16);

    for (let i = 0; i < species.length; i++) {
        let sx = speciesAreaLeft + i * (speciesWidth + 10);
        let sy = speciesTop;

        let isHovered = (mouseX >= sx && mouseX <= sx + speciesWidth && mouseY >= sy && mouseY <= sy + speciesHeight);
        if (isHovered) hoveredSpecies = i;

        // Box
        let sc = species[i].color;
        if (isHovered || selectedLevel === 10 + i) {
            fill(sc[0] + 30, sc[1] + 30, sc[2] + 30);
        } else {
            fill(sc[0], sc[1], sc[2]);
        }
        stroke(sc[0] - 20, sc[1] - 20, sc[2] - 20);
        strokeWeight(2);
        rect(sx, sy, speciesWidth, speciesHeight, 6);

        // Species info
        fill(255);
        noStroke();
        textAlign(CENTER, TOP);
        textSize(max(10, min(13, speciesWidth / 10)));
        textStyle(ITALIC);
        text(species[i].name, sx + speciesWidth / 2, sy + 8, speciesWidth - 8);
        textStyle(BOLD);
        textSize(max(9, min(11, speciesWidth / 12)));
        text(species[i].common, sx + speciesWidth / 2, sy + 38, speciesWidth - 8);
        textStyle(NORMAL);

        // Class and family
        textSize(max(8, min(10, speciesWidth / 13)));
        fill(220, 255, 220);
        text('Class: ' + species[i].className, sx + speciesWidth / 2, sy + 62, speciesWidth - 8);
        text('Family: ' + species[i].family, sx + speciesWidth / 2, sy + 80, speciesWidth - 8);
    }

    // Info panel on right
    let infoX = canvasWidth - infoWidth - 5;
    let infoY = 45;
    fill(255, 255, 255, 230);
    stroke(180);
    strokeWeight(1);
    rect(infoX, infoY, infoWidth, drawHeight - infoY - 10, 6);

    fill(30);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(14);
    textStyle(BOLD);

    let infoTitle = 'Click a Level or Species';
    let infoText = 'Click on any box to learn about that taxonomic level. Hover to preview.';

    // Determine what to show
    let showLevel = selectedLevel;
    if (hoveredLevel >= 0 && hoveredLevel < 4) showLevel = hoveredLevel;
    if (hoveredSpecies >= 0) showLevel = 10 + hoveredSpecies;

    if (showLevel >= 0 && showLevel < 4) {
        infoTitle = levels[showLevel].name;
        infoText = levels[showLevel].description;
    } else if (showLevel >= 10) {
        let sp = species[showLevel - 10];
        infoTitle = sp.common;
        infoText = sp.description;
    }

    text(infoTitle, infoX + 8, infoY + 8, infoWidth - 16);
    textStyle(NORMAL);
    textSize(12);
    fill(60);
    text(infoText, infoX + 8, infoY + 32, infoWidth - 16);

    // Control area instructions
    fill(100);
    textSize(12);
    textAlign(CENTER, CENTER);
    text('Click any box to select — hover for preview', canvasWidth / 2, drawHeight + 20);
}

function mousePressed() {
    // Check levels
    let boxMargin = 12;
    let boxTop = 38;
    let infoWidth = min(250, canvasWidth * 0.32);
    let diagramWidth = canvasWidth - infoWidth - 20;
    let boxWidth = diagramWidth - 2 * margin;

    for (let i = 2; i >= 0; i--) {
        let x = margin + i * boxMargin;
        let y = boxTop + i * boxMargin;
        let w = boxWidth - 2 * i * boxMargin;
        let h = drawHeight - boxTop - 30 - 2 * i * boxMargin;
        if (mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h) {
            selectedLevel = i;
            break;
        }
    }

    // Check species
    let speciesTop = boxTop + 3 * boxMargin + 20;
    let speciesAreaWidth = boxWidth - 6 * boxMargin;
    let speciesAreaLeft = margin + 3 * boxMargin;
    let speciesWidth = (speciesAreaWidth - 20) / 3;
    let speciesHeight = drawHeight - speciesTop - 50;

    for (let i = 0; i < species.length; i++) {
        let sx = speciesAreaLeft + i * (speciesWidth + 10);
        if (mouseX >= sx && mouseX <= sx + speciesWidth && mouseY >= speciesTop && mouseY <= speciesTop + speciesHeight) {
            selectedLevel = 10 + i;
        }
    }
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, canvasHeight);
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);
    canvasWidth = containerWidth;
}
