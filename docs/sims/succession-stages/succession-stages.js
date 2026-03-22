// Succession Stages on a Rock Surface
// Interactive five-stage primary succession with moss as pioneer
// MicroSim version 2026.03

let containerWidth;
let canvasWidth = 400;
let drawHeight = 380;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 10;

let selectedStage = -1;
let isRunning = false;
let animProgress = 0;
let playBtn;

const stages = [
    {
        name: 'Bare Rock',
        years: 'Year 0',
        soilDepth: 0,
        color: [160, 160, 150],
        description: 'Exposed rock surface after glacial retreat, volcanic activity, or landslide. No soil, no life. Only rain, wind, and temperature extremes begin the slow process of physical weathering.',
        tooltip: ''
    },
    {
        name: 'Lichen Stage',
        years: 'Years 1-50',
        soilDepth: 5,
        color: [180, 170, 140],
        description: 'Pioneer lichens colonize bare rock. These symbiotic organisms (fungus + algae) secrete acids that dissolve rock minerals, creating the first thin film of proto-soil. Organic material begins to accumulate.',
        tooltip: 'Lichens produce acids that chemically weather rock'
    },
    {
        name: 'Moss Stage',
        years: 'Years 50-200',
        soilDepth: 20,
        color: [120, 150, 100],
        description: 'Moss colonizes the substrate created by lichens. Moss traps debris, retains moisture, and adds organic matter when it dies. Soil builds 10x faster than weathering alone. A thin but real soil layer forms.',
        tooltip: 'Moss traps debris and moisture, building soil 10x faster than weathering alone'
    },
    {
        name: 'Herbaceous Stage',
        years: 'Years 200-500',
        soilDepth: 40,
        color: [100, 130, 80],
        description: 'With enough soil, grasses, ferns, and small herbaceous plants take root. Their deeper roots further break rock and add organic matter. Moss persists in shaded understory areas.',
        tooltip: 'Grasses and ferns root into moss-built soil'
    },
    {
        name: 'Woodland Stage',
        years: 'Years 500+',
        soilDepth: 70,
        color: [80, 120, 60],
        description: 'Shrubs and young trees establish in the deepening soil. A full ecosystem develops with diverse plant and animal life. Moss continues growing on tree trunks, rocks, and forest floor — still an essential part of the ecosystem.',
        tooltip: 'Full forest ecosystem with moss still present'
    }
];

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    playBtn = createButton('▶ Play Succession');
    playBtn.position(10, drawHeight + 10);
    playBtn.mousePressed(togglePlay);
    playBtn.style('padding', '6px 16px');
    playBtn.style('border-radius', '4px');
    playBtn.style('border', '2px solid #4caf50');
    playBtn.style('background', '#4caf50');
    playBtn.style('color', 'white');
    playBtn.style('font-weight', 'bold');
    playBtn.style('cursor', 'pointer');

    describe('Interactive five-stage ecological succession diagram with moss as pioneer species', LABEL);
}

function togglePlay() {
    isRunning = !isRunning;
    if (isRunning) {
        animProgress = 0;
        selectedStage = 0;
        playBtn.html('⏸ Pause');
    } else {
        playBtn.html('▶ Play Succession');
    }
}

function draw() {
    updateCanvasSize();

    // Auto-play animation
    if (isRunning) {
        animProgress += 0.005;
        let stageIdx = floor(animProgress * 5);
        if (stageIdx >= 5) {
            isRunning = false;
            selectedStage = 4;
            playBtn.html('▶ Replay');
        } else {
            selectedStage = stageIdx;
        }
    }

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
    textSize(18);
    text('Primary Succession: Rock to Forest', canvasWidth / 2, 6);

    // Stage panels
    let panelW = (canvasWidth - 2 * margin - 4 * 4) / 5;
    let panelTop = 32;
    let panelH = 200;
    let infoY = panelTop + panelH + 10;

    for (let i = 0; i < stages.length; i++) {
        let px = margin + i * (panelW + 4);
        let stage = stages[i];
        let isSelected = (selectedStage === i);
        let isHovered = (mouseX >= px && mouseX <= px + panelW && mouseY >= panelTop && mouseY <= panelTop + panelH);

        // Panel background
        stroke(isSelected ? color(76, 175, 80) : color(200));
        strokeWeight(isSelected ? 3 : 1);
        fill(245);
        rect(px, panelTop, panelW, panelH, 4);

        // Draw cross-section
        drawStageScene(px, panelTop, panelW, panelH, i, isSelected || isHovered);

        // Stage label
        noStroke();
        fill(40);
        textSize(max(9, min(12, panelW / 7)));
        textAlign(CENTER, BOTTOM);
        textStyle(BOLD);
        text(stage.name, px + panelW / 2, panelTop + panelH - 16);
        textStyle(NORMAL);
        textSize(max(8, min(10, panelW / 8)));
        fill(100);
        text(stage.years, px + panelW / 2, panelTop + panelH - 4);
    }

    // Arrow indicators between stages
    for (let i = 0; i < 4; i++) {
        let px = margin + (i + 1) * (panelW + 4) - 2;
        fill(150);
        noStroke();
        textSize(14);
        textAlign(CENTER, CENTER);
        text('→', px, panelTop + panelH / 2);
    }

    // Soil depth indicator on right
    let sdX = canvasWidth - 40;
    let sdTop = panelTop + 10;
    let sdH = panelH - 30;
    stroke(120, 90, 50);
    strokeWeight(1);
    line(sdX, sdTop, sdX, sdTop + sdH);
    line(sdX - 4, sdTop, sdX + 4, sdTop);
    line(sdX - 4, sdTop + sdH, sdX + 4, sdTop + sdH);
    noStroke();
    fill(80);
    textSize(8);
    textAlign(CENTER, CENTER);
    push();
    translate(sdX + 12, sdTop + sdH / 2);
    rotate(HALF_PI);
    text('Soil Depth', 0, 0);
    pop();

    // Show soil depth for selected stage
    if (selectedStage >= 0) {
        let sd = stages[selectedStage].soilDepth;
        let barH = map(sd, 0, 70, 0, sdH);
        fill(140, 100, 50, 150);
        noStroke();
        rect(sdX - 8, sdTop + sdH - barH, 16, barH, 2);
        fill(80);
        textSize(9);
        textAlign(CENTER, BOTTOM);
        text(sd + ' cm', sdX, sdTop + sdH - barH - 2);
    }

    // Info panel below
    if (selectedStage >= 0) {
        let stage = stages[selectedStage];
        fill(255);
        stroke(180);
        strokeWeight(1);
        rect(margin, infoY, canvasWidth - 2 * margin, drawHeight - infoY - 5, 6);

        noStroke();
        fill(40);
        textAlign(LEFT, TOP);
        textSize(14);
        textStyle(BOLD);
        text(stage.name + ' (' + stage.years + ')', margin + 10, infoY + 6);
        textStyle(NORMAL);
        textSize(11);
        fill(60);
        textWrap(WORD);
        text(stage.description, margin + 10, infoY + 24, canvasWidth - 2 * margin - 20);
    } else {
        fill(120);
        noStroke();
        textSize(12);
        textAlign(CENTER, CENTER);
        text('Click any stage to learn more, or press Play to animate', canvasWidth / 2, infoY + 40);
    }

    // Control label
    fill(100);
    textSize(11);
    textAlign(RIGHT, CENTER);
    noStroke();
    text('Click any stage panel above', canvasWidth - 15, drawHeight + 25);
}

function drawStageScene(px, py, w, h, stageIdx, highlight) {
    let groundY = py + h * 0.55;
    let soilH = map(stages[stageIdx].soilDepth, 0, 70, 2, h * 0.3);
    let rockY = groundY + soilH;

    push();
    // Sky
    noStroke();
    fill(200, 220, 245);
    rect(px + 1, py + 1, w - 2, groundY - py - 1);

    // Rock
    fill(160, 160, 150);
    rect(px + 1, rockY, w - 2, py + h - rockY - 20);

    // Soil
    if (soilH > 2) {
        fill(140, 100, 60);
        rect(px + 1, groundY, w - 2, soilH);
    }

    // Stage-specific vegetation
    if (stageIdx >= 1) {
        // Lichens
        for (let lx = px + 8; lx < px + w - 5; lx += 12) {
            fill(200, 180, 100, 180);
            ellipse(lx, groundY + soilH + 3, 8, 4);
            fill(210, 170, 80, 150);
            ellipse(lx + 5, groundY + soilH + 5, 6, 3);
        }
    }

    if (stageIdx >= 2) {
        // Moss
        for (let mx = px + 5; mx < px + w - 3; mx += 8) {
            stroke(50, 130, 50);
            strokeWeight(1.5);
            let mh = 8 + sin(mx * 0.3) * 3;
            line(mx, groundY, mx, groundY - mh);
            noStroke();
            fill(60, 170, 60);
            ellipse(mx - 2, groundY - mh + 1, 4, 3);
            ellipse(mx + 2, groundY - mh + 2, 4, 3);
        }
    }

    if (stageIdx >= 3) {
        // Grasses and small plants
        for (let gx = px + 10; gx < px + w - 8; gx += 15) {
            stroke(80, 140, 50);
            strokeWeight(1);
            let gh = 18 + sin(gx * 0.2) * 5;
            line(gx, groundY - 8, gx - 3, groundY - 8 - gh);
            line(gx, groundY - 8, gx + 3, groundY - 8 - gh + 3);
            line(gx, groundY - 8, gx, groundY - 8 - gh + 2);
        }
    }

    if (stageIdx >= 4) {
        // Trees
        let treeX = px + w / 2;
        stroke(120, 80, 40);
        strokeWeight(4);
        line(treeX, groundY - 15, treeX, groundY - 55);
        noStroke();
        fill(50, 120, 40);
        ellipse(treeX, groundY - 60, 30, 25);
        // Smaller tree
        stroke(120, 80, 40);
        strokeWeight(2);
        line(treeX - 15, groundY - 10, treeX - 15, groundY - 35);
        noStroke();
        fill(60, 130, 50);
        ellipse(treeX - 15, groundY - 38, 18, 14);
    }

    // Highlight border
    if (highlight) {
        noFill();
        stroke(76, 175, 80, 100);
        strokeWeight(2);
        rect(px + 1, py + 1, w - 2, h - 2, 4);
    }

    pop();
}

function mousePressed() {
    let panelW = (canvasWidth - 2 * margin - 4 * 4) / 5;
    let panelTop = 32;
    let panelH = 200;

    for (let i = 0; i < stages.length; i++) {
        let px = margin + i * (panelW + 4);
        if (mouseX >= px && mouseX <= px + panelW && mouseY >= panelTop && mouseY <= panelTop + panelH) {
            selectedStage = i;
            break;
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
