// Nutrient Cycles in a Moss Ecosystem
// Toggle carbon, nitrogen, and phosphorus cycle overlays
// MicroSim version 2026.03

let containerWidth;
let canvasWidth = 400;
let drawHeight = 430;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 15;

let showCarbon = true;
let showNitrogen = false;
let showPhosphorus = false;

let carbonBtn, nitrogenBtn, phosphorusBtn, showAllBtn;
let hoveredArrow = '';
let animOffset = 0;

// Arrow path definitions (computed in draw based on canvas size)
const carbonSteps = [
    { label: 'CO2 absorbed', desc: 'Moss absorbs CO2 from the atmosphere via photosynthesis, converting it to organic carbon.' },
    { label: 'Photosynthesis', desc: 'Using sunlight and water, moss converts CO2 into glucose and oxygen.' },
    { label: 'Dead moss falls', desc: 'When moss tissue dies, organic carbon enters the soil as dead organic matter.' },
    { label: 'Decomposition', desc: 'Soil microbes break down dead moss, releasing some CO2 back to the atmosphere.' },
    { label: 'Peat storage', desc: 'In waterlogged conditions, dead moss accumulates as peat, storing carbon for thousands of years.' }
];

const nitrogenSteps = [
    { label: 'N2 fixation', desc: 'Cyanobacteria living on moss surfaces convert atmospheric N2 into usable nitrogen compounds.' },
    { label: 'Moss uptake', desc: 'Moss absorbs fixed nitrogen directly through its leaf surfaces (no roots needed).' },
    { label: 'Dead moss', desc: 'Nitrogen-containing organic molecules enter the soil when moss dies.' },
    { label: 'Decomposition', desc: 'Decomposers break down dead moss, releasing ammonium into the soil.' },
    { label: 'Denitrification', desc: 'Some soil bacteria convert nitrogen compounds back to N2 gas, returning it to the atmosphere.' }
];

const phosphorusSteps = [
    { label: 'Rock weathering', desc: 'Phosphorus is released from rock substrate through slow chemical and physical weathering.' },
    { label: 'Soil phosphorus', desc: 'Dissolved phosphate ions become available in the soil solution.' },
    { label: 'Moss uptake', desc: 'Moss absorbs phosphorus directly from rainwater and substrate through its tissues.' },
    { label: 'Dead moss', desc: 'When moss dies, phosphorus-containing molecules return to the soil.' },
    { label: 'Recycled', desc: 'Decomposition releases phosphorus back into the soil pool, completing the cycle.' }
];

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    carbonBtn = createButton('Carbon');
    carbonBtn.position(10, drawHeight + 8);
    carbonBtn.mousePressed(() => { showCarbon = !showCarbon; });
    carbonBtn.style('padding', '5px 12px');
    carbonBtn.style('border-radius', '4px');
    carbonBtn.style('border', '2px solid #4caf50');
    carbonBtn.style('cursor', 'pointer');
    carbonBtn.style('font-weight', 'bold');

    nitrogenBtn = createButton('Nitrogen');
    nitrogenBtn.position(90, drawHeight + 8);
    nitrogenBtn.mousePressed(() => { showNitrogen = !showNitrogen; });
    nitrogenBtn.style('padding', '5px 12px');
    nitrogenBtn.style('border-radius', '4px');
    nitrogenBtn.style('border', '2px solid #2196f3');
    nitrogenBtn.style('cursor', 'pointer');
    nitrogenBtn.style('font-weight', 'bold');

    phosphorusBtn = createButton('Phosphorus');
    phosphorusBtn.position(180, drawHeight + 8);
    phosphorusBtn.mousePressed(() => { showPhosphorus = !showPhosphorus; });
    phosphorusBtn.style('padding', '5px 12px');
    phosphorusBtn.style('border-radius', '4px');
    phosphorusBtn.style('border', '2px solid #ff9800');
    phosphorusBtn.style('cursor', 'pointer');
    phosphorusBtn.style('font-weight', 'bold');

    showAllBtn = createButton('Show All');
    showAllBtn.position(280, drawHeight + 8);
    showAllBtn.mousePressed(() => { showCarbon = true; showNitrogen = true; showPhosphorus = true; });
    showAllBtn.style('padding', '5px 12px');
    showAllBtn.style('border-radius', '4px');
    showAllBtn.style('border', '2px solid #666');
    showAllBtn.style('cursor', 'pointer');
    showAllBtn.style('font-weight', 'bold');

    describe('Animated diagram showing carbon, nitrogen, and phosphorus cycling through a moss ecosystem', LABEL);
}

function draw() {
    updateCanvasSize();
    animOffset += 0.02;

    // Update button styles
    carbonBtn.style('background', showCarbon ? '#4caf50' : '#fff');
    carbonBtn.style('color', showCarbon ? '#fff' : '#4caf50');
    nitrogenBtn.style('background', showNitrogen ? '#2196f3' : '#fff');
    nitrogenBtn.style('color', showNitrogen ? '#fff' : '#2196f3');
    phosphorusBtn.style('background', showPhosphorus ? '#ff9800' : '#fff');
    phosphorusBtn.style('color', showPhosphorus ? '#fff' : '#ff9800');

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
    text('Nutrient Cycles in a Moss Ecosystem', canvasWidth / 2, 6);

    // Draw cross-section layers
    let layerTop = 30;
    let atmoH = 70;
    let mossH = 60;
    let soilH = 80;
    let rockH = 40;

    let atmoY = layerTop;
    let mossY = atmoY + atmoH;
    let soilY = mossY + mossH;
    let rockY = soilY + soilH;

    // Atmosphere
    noStroke();
    fill(200, 220, 250);
    rect(0, atmoY, canvasWidth, atmoH);
    fill(100, 130, 180);
    textSize(12);
    textAlign(LEFT, TOP);
    text('Atmosphere', 8, atmoY + 4);
    fill(80, 110, 160);
    textSize(11);
    text('CO2    N2', 8, atmoY + 20);

    // Moss carpet
    fill(80, 160, 80);
    rect(0, mossY, canvasWidth, mossH);
    // Draw moss plants
    for (let x = 10; x < canvasWidth; x += 18) {
        stroke(50, 130, 50);
        strokeWeight(2);
        let h = 15 + sin(x * 0.1) * 5;
        line(x, mossY + mossH / 2 + 5, x, mossY + mossH / 2 + 5 - h);
        // Tiny leaves
        noStroke();
        fill(60, 170, 60);
        ellipse(x - 4, mossY + mossH / 2 + 5 - h + 3, 6, 4);
        ellipse(x + 4, mossY + mossH / 2 + 5 - h + 5, 6, 4);
    }
    noStroke();
    fill(40, 110, 40);
    textSize(12);
    textAlign(LEFT, TOP);
    text('Moss Carpet', 8, mossY + 4);

    // Soil
    fill(140, 100, 60);
    rect(0, soilY, canvasWidth, soilH);
    // Decomposing material
    for (let x = 20; x < canvasWidth; x += 40) {
        fill(110, 80, 40);
        ellipse(x + random(-2, 2), soilY + 20, 8, 5);
        fill(90, 70, 35);
        ellipse(x + 15, soilY + 45, 6, 4);
    }
    fill(100, 70, 30);
    textSize(12);
    textAlign(LEFT, TOP);
    text('Soil (organic matter)', 8, soilY + 4);

    // Rock
    fill(160, 160, 150);
    rect(0, rockY, canvasWidth, rockH);
    fill(130, 130, 120);
    textSize(12);
    textAlign(LEFT, TOP);
    text('Rock Substrate', 8, rockY + 4);

    // Tooltip area
    let tooltipY = rockY + rockH + 5;
    hoveredArrow = '';

    // Draw cycle arrows
    if (showCarbon) drawCarbonCycle(atmoY, mossY, soilY, rockY, atmoH, mossH, soilH, rockH, tooltipY);
    if (showNitrogen) drawNitrogenCycle(atmoY, mossY, soilY, rockY, atmoH, mossH, soilH, rockH, tooltipY);
    if (showPhosphorus) drawPhosphorusCycle(atmoY, mossY, soilY, rockY, atmoH, mossH, soilH, rockH, tooltipY);

    // Draw tooltip
    if (hoveredArrow) {
        fill(0, 0, 0, 200);
        noStroke();
        textSize(11);
        textAlign(CENTER, TOP);
        textWrap(WORD);
        fill(255);
        rect(margin, tooltipY, canvasWidth - 2 * margin, 50, 4);
        fill(40);
        text(hoveredArrow, canvasWidth / 2, tooltipY + 4, canvasWidth - 2 * margin - 10);
    }

    // Legend
    let legY = drawHeight - 22;
    textSize(10);
    textAlign(LEFT, CENTER);
    noStroke();
    fill(76, 175, 80); ellipse(canvasWidth - 220, legY, 8, 8);
    fill(60); text('Carbon', canvasWidth - 213, legY);
    fill(33, 150, 243); ellipse(canvasWidth - 165, legY, 8, 8);
    fill(60); text('Nitrogen', canvasWidth - 158, legY);
    fill(255, 152, 0); ellipse(canvasWidth - 100, legY, 8, 8);
    fill(60); text('Phosphorus', canvasWidth - 93, legY);
}

function drawAnimatedArrow(x1, y1, x2, y2, col, weight, steps, stepIndex) {
    stroke(col);
    strokeWeight(weight);
    line(x1, y1, x2, y2);

    // Arrowhead
    let angle = atan2(y2 - y1, x2 - x1);
    let ax = x2 - cos(angle) * 2;
    let ay = y2 - sin(angle) * 2;
    fill(col);
    noStroke();
    push();
    translate(ax, ay);
    rotate(angle);
    triangle(0, 0, -10, -5, -10, 5);
    pop();

    // Animated dot
    let t = (animOffset + stepIndex * 0.2) % 1;
    let dx = lerp(x1, x2, t);
    let dy = lerp(y1, y2, t);
    fill(col);
    noStroke();
    ellipse(dx, dy, 7, 7);

    // Label
    let mx = (x1 + x2) / 2;
    let my = (y1 + y2) / 2;
    let step = steps[stepIndex];

    // Check hover
    let d = distToSegment(mouseX, mouseY, x1, y1, x2, y2);
    if (d < 15) {
        hoveredArrow = step.label + ': ' + step.desc;
        strokeWeight(weight + 2);
        stroke(red(col), green(col), blue(col), 100);
        line(x1, y1, x2, y2);
    }

    // Small label
    noStroke();
    fill(red(col), green(col), blue(col));
    textSize(9);
    textAlign(CENTER, CENTER);
    let offsetX = (x2 - x1) > 0 ? 0 : ((x1 - x2) > canvasWidth * 0.3 ? -20 : 20);
    text(step.label, mx + offsetX, my - 8);
}

function drawCarbonCycle(atmoY, mossY, soilY, rockY, atmoH, mossH, soilH, rockH, tooltipY) {
    let col = color(76, 175, 80);
    let cx = canvasWidth * 0.25;
    // CO2 -> moss (photosynthesis)
    drawAnimatedArrow(cx, atmoY + 20, cx, mossY + 10, col, 3, carbonSteps, 0);
    // Moss -> soil (dead moss)
    drawAnimatedArrow(cx + 30, mossY + mossH - 5, cx + 30, soilY + 15, col, 3, carbonSteps, 2);
    // Soil -> atmosphere (decomposition)
    drawAnimatedArrow(cx + 80, soilY + 10, cx + 80, atmoY + atmoH - 5, col, 2, carbonSteps, 3);
    // Peat storage arrow (downward, stays in soil)
    drawAnimatedArrow(cx - 20, soilY + 20, cx - 20, soilY + soilH - 5, col, 2, carbonSteps, 4);
}

function drawNitrogenCycle(atmoY, mossY, soilY, rockY, atmoH, mossH, soilH, rockH, tooltipY) {
    let col = color(33, 150, 243);
    let cx = canvasWidth * 0.5;
    // N2 fixation
    drawAnimatedArrow(cx, atmoY + 25, cx, mossY + 10, col, 3, nitrogenSteps, 0);
    // Moss uptake
    drawAnimatedArrow(cx - 20, mossY + 15, cx - 20, mossY + mossH - 10, col, 2, nitrogenSteps, 1);
    // Dead moss to soil
    drawAnimatedArrow(cx + 20, mossY + mossH - 5, cx + 20, soilY + 15, col, 3, nitrogenSteps, 2);
    // Decomposition
    drawAnimatedArrow(cx + 50, soilY + 15, cx + 50, soilY + soilH - 10, col, 2, nitrogenSteps, 3);
    // Denitrification back to atmo
    drawAnimatedArrow(cx + 70, soilY + 5, cx + 70, atmoY + atmoH - 5, col, 2, nitrogenSteps, 4);
}

function drawPhosphorusCycle(atmoY, mossY, soilY, rockY, atmoH, mossH, soilH, rockH, tooltipY) {
    let col = color(255, 152, 0);
    let cx = canvasWidth * 0.75;
    // Rock weathering
    drawAnimatedArrow(cx, rockY + 5, cx, soilY + soilH - 5, col, 3, phosphorusSteps, 0);
    // Soil phosphorus available
    drawAnimatedArrow(cx - 20, soilY + soilH - 10, cx - 20, soilY + 15, col, 2, phosphorusSteps, 1);
    // Moss uptake
    drawAnimatedArrow(cx - 40, soilY + 5, cx - 40, mossY + mossH - 5, col, 3, phosphorusSteps, 2);
    // Dead moss
    drawAnimatedArrow(cx + 20, mossY + mossH - 5, cx + 20, soilY + 15, col, 2, phosphorusSteps, 3);
    // Recycled in soil
    drawAnimatedArrow(cx + 40, soilY + 20, cx + 40, soilY + soilH - 10, col, 2, phosphorusSteps, 4);
}

function distToSegment(px, py, x1, y1, x2, y2) {
    let dx = x2 - x1;
    let dy = y2 - y1;
    let lenSq = dx * dx + dy * dy;
    if (lenSq === 0) return dist(px, py, x1, y1);
    let t = max(0, min(1, ((px - x1) * dx + (py - y1) * dy) / lenSq));
    let projX = x1 + t * dx;
    let projY = y1 + t * dy;
    return dist(px, py, projX, projY);
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
