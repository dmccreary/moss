// Life Cycle Assessment: Moss vs Turf Grass
// Side-by-side comparison infographic
// MicroSim version 2026.03

let containerWidth;
let canvasWidth = 400;
let drawHeight = 480;
let controlHeight = 40;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 15;
let sliderLeftMargin = 100;

let selectedPhase = -1;

const phases = [
    {
        name: 'Raw Materials',
        turf: { label: 'Seed, fertilizer, irrigation pipes, soil amendments', co2: 45, water: 200, cost: 150 },
        moss: { label: 'Small moss patch or fragments, no chemicals needed', co2: 2, water: 5, cost: 20 },
        turfIcon: 'bag+pipe',
        mossIcon: 'patch'
    },
    {
        name: 'Installation',
        turf: { label: 'Tilling, grading, sod laying or seeding, starter fertilizer', co2: 30, water: 500, cost: 200 },
        moss: { label: 'Hand transplanting, gentle pressing into substrate', co2: 1, water: 20, cost: 30 },
        turfIcon: 'machine',
        mossIcon: 'hands'
    },
    {
        name: 'Use Phase (per year)',
        turf: { label: 'Weekly mowing, watering, fertilizing 4x/year, pesticide application', co2: 80, water: 40000, cost: 400 },
        moss: { label: 'Occasional misting in dry spells, no mowing, no chemicals', co2: 3, water: 500, cost: 15 },
        turfIcon: 'mower',
        mossIcon: 'bird'
    },
    {
        name: 'End of Life',
        turf: { label: 'Chemical runoff, soil compaction, removal to landfill if replaced', co2: 25, water: 0, cost: 100 },
        moss: { label: 'Garden persists indefinitely, enriches soil, self-propagates', co2: -5, water: 0, cost: 0 },
        turfIcon: 'waste',
        mossIcon: 'growth'
    }
];

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));
    textFont('Arial');
    describe('Side-by-side life cycle assessment comparing moss garden versus turf grass lawn', LABEL);
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
    text('Moss Garden vs. Turf Grass', canvasWidth / 2, 6);

    // Column headers
    let colW = (canvasWidth - 2 * margin) / 2;
    let leftX = margin;
    let rightX = margin + colW;

    // Turf header
    fill(139, 90, 43);
    textSize(15);
    textAlign(CENTER, TOP);
    text('Turf Grass', leftX + colW / 2, 30);

    // Moss header
    fill(34, 120, 34);
    text('Moss Garden', rightX + colW / 2, 30);

    // Phase rows
    let rowH = 90;
    let startY = 50;

    for (let i = 0; i < phases.length; i++) {
        let y = startY + i * rowH;
        let phase = phases[i];
        let isSelected = (selectedPhase === i);
        let isHovered = (mouseY >= y && mouseY <= y + rowH && mouseX >= margin && mouseX <= canvasWidth - margin);

        // Row background
        if (isSelected) {
            fill(230, 245, 230);
        } else if (isHovered) {
            fill(240, 248, 255);
        } else {
            fill(i % 2 === 0 ? 250 : 255);
        }
        noStroke();
        rect(margin, y, canvasWidth - 2 * margin, rowH);

        // Phase label (left side)
        fill(60);
        textSize(13);
        textStyle(BOLD);
        textAlign(CENTER, TOP);
        text(phase.name, canvasWidth / 2, y + 2);
        textStyle(NORMAL);

        // Divider
        stroke(200);
        strokeWeight(1);
        line(canvasWidth / 2, y + 18, canvasWidth / 2, y + rowH - 2);
        noStroke();

        // Turf side
        drawPhaseIcon(leftX + 15, y + 25, phase.turfIcon, false);
        fill(100, 60, 20);
        textSize(10);
        textAlign(LEFT, TOP);
        textWrap(WORD);
        text(phase.turf.label, leftX + 45, y + 20, colW - 55);

        // Moss side
        drawPhaseIcon(rightX + 15, y + 25, phase.mossIcon, true);
        fill(30, 100, 30);
        textSize(10);
        textAlign(LEFT, TOP);
        text(phase.moss.label, rightX + 45, y + 20, colW - 55);

        // Show metrics if selected
        if (isSelected) {
            let metricY = y + 55;
            textSize(9);
            textStyle(BOLD);

            // Turf metrics
            fill(180, 50, 50);
            textAlign(LEFT, TOP);
            text('CO2: ' + phase.turf.co2 + ' kg', leftX + 10, metricY);
            fill(50, 100, 180);
            text('Water: ' + formatWater(phase.turf.water), leftX + 10, metricY + 12);
            fill(100, 60, 20);
            text('Cost: $' + phase.turf.cost, leftX + 10, metricY + 24);

            // Moss metrics
            fill(phase.moss.co2 < 0 ? [34, 139, 34] : [180, 50, 50]);
            textAlign(LEFT, TOP);
            text('CO2: ' + phase.moss.co2 + ' kg', rightX + 10, metricY);
            fill(50, 100, 180);
            text('Water: ' + formatWater(phase.moss.water), rightX + 10, metricY + 12);
            fill(30, 100, 30);
            text('Cost: $' + phase.moss.cost, rightX + 10, metricY + 24);

            textStyle(NORMAL);
        }

        // Row separator
        stroke(210);
        strokeWeight(1);
        line(margin, y + rowH, canvasWidth - margin, y + rowH);
        noStroke();
    }

    // Environmental score at bottom
    let scoreY = startY + phases.length * rowH + 5;
    let turfTotal = phases.reduce((s, p) => s + p.turf.co2, 0);
    let mossTotal = phases.reduce((s, p) => s + p.moss.co2, 0);
    let savings = turfTotal - mossTotal;

    fill(40);
    textSize(13);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    text('Environmental Score (CO2 kg/year)', canvasWidth / 2, scoreY);
    textStyle(NORMAL);

    // Score bars
    let barW = (canvasWidth - 100) / 2 - 20;
    let barY = scoreY + 18;
    let maxCO2 = turfTotal;

    // Turf bar
    fill(180, 100, 60);
    rect(margin + 10, barY, map(turfTotal, 0, maxCO2, 0, barW), 16, 3);
    fill(100, 50, 20);
    textSize(11);
    textAlign(LEFT, CENTER);
    text(turfTotal + ' kg CO2', margin + 10 + map(turfTotal, 0, maxCO2, 0, barW) + 5, barY + 8);

    // Moss bar
    fill(76, 175, 80);
    rect(canvasWidth / 2 + 10, barY, map(max(mossTotal, 1), 0, maxCO2, 0, barW), 16, 3);
    fill(30, 100, 30);
    textAlign(LEFT, CENTER);
    text(mossTotal + ' kg CO2', canvasWidth / 2 + 10 + map(max(mossTotal, 1), 0, maxCO2, 0, barW) + 5, barY + 8);

    // Savings
    fill(34, 139, 34);
    textSize(12);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    text('Moss saves ' + savings + ' kg CO2 (' + round(savings / turfTotal * 100) + '% reduction)', canvasWidth / 2, barY + 22);
    textStyle(NORMAL);

    // Control area
    fill(100);
    textSize(12);
    textAlign(CENTER, CENTER);
    text('Click any phase row to see detailed metrics', canvasWidth / 2, drawHeight + 20);
}

function drawPhaseIcon(x, y, iconType, isMoss) {
    push();
    translate(x, y);
    noStroke();

    if (iconType === 'bag+pipe') {
        fill(160, 130, 80); rect(0, 0, 12, 15, 2);
        fill(100, 100, 100); rect(16, 2, 4, 14, 1); rect(14, 8, 8, 3, 1);
    } else if (iconType === 'patch') {
        fill(60, 160, 60);
        ellipse(12, 8, 20, 14);
        fill(50, 140, 50);
        ellipse(8, 10, 10, 8);
    } else if (iconType === 'machine') {
        fill(120, 120, 120); rect(2, 2, 18, 10, 2);
        fill(80, 80, 80); ellipse(6, 14, 6, 6); ellipse(18, 14, 6, 6);
    } else if (iconType === 'hands') {
        fill(200, 160, 120);
        ellipse(10, 6, 14, 10);
        fill(60, 160, 60);
        ellipse(10, 12, 8, 6);
    } else if (iconType === 'mower') {
        fill(200, 50, 50); rect(2, 0, 16, 8, 2);
        fill(60); ellipse(6, 12, 7, 7); ellipse(16, 12, 7, 7);
    } else if (iconType === 'bird') {
        fill(100, 160, 220);
        ellipse(10, 6, 10, 8);
        fill(80, 140, 200);
        triangle(10, 4, 18, 6, 10, 8);
        fill(255, 180, 0);
        triangle(4, 6, 0, 5, 4, 8);
    } else if (iconType === 'waste') {
        fill(100, 80, 60); rect(3, 0, 14, 12, 2);
        fill(180, 50, 50);
        textSize(8); textAlign(CENTER, CENTER);
        text('X', 10, 6);
    } else if (iconType === 'growth') {
        fill(60, 180, 60);
        ellipse(10, 4, 12, 8);
        stroke(60, 140, 60); strokeWeight(2);
        line(10, 8, 10, 16);
        noStroke();
        fill(34, 139, 34);
        textSize(7); textAlign(CENTER, CENTER);
        text('✓', 10, 4);
    }
    pop();
}

function formatWater(liters) {
    if (liters >= 1000) return (liters / 1000).toFixed(0) + 'k L';
    return liters + ' L';
}

function mousePressed() {
    let startY = 50;
    let rowH = 90;
    for (let i = 0; i < phases.length; i++) {
        let y = startY + i * rowH;
        if (mouseY >= y && mouseY <= y + rowH && mouseX >= margin && mouseX <= canvasWidth - margin) {
            selectedPhase = (selectedPhase === i) ? -1 : i;
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
