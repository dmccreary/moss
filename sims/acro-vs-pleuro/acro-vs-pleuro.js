// Acrocarpous vs Pleurocarpous Growth Forms
// Side-by-side botanical comparison with interactive callouts
// MicroSim version 2026.03

let containerWidth;
let canvasWidth = 400;
let drawHeight = 450;
let controlHeight = 40;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 10;

let hoveredCallout = -1;
let selectedCallout = -1;

const callouts = [
    { x: 0.18, y: 0.35, side: 'left', label: 'Upright stem', desc: 'Vertical growth direction — acrocarpous mosses grow straight up from the substrate, typically 2-10 cm tall.' },
    { x: 0.15, y: 0.2, side: 'left', label: 'Terminal sporophyte', desc: 'Sporophyte emerges from the tip (apex) of the main stem. "Acro" means tip. This is the defining feature of acrocarpous mosses.' },
    { x: 0.25, y: 0.52, side: 'left', label: 'Cushion form', desc: 'Dense cushion or turf growth form — upright stems pack tightly together, forming dome-shaped mounds.' },
    { x: 0.22, y: 0.72, side: 'left', label: 'Soil substrate', desc: 'Acrocarpous mosses are often found on soil in exposed, sunny sites. They tolerate drier conditions than pleurocarpous mosses.' },
    { x: 0.68, y: 0.42, side: 'right', label: 'Creeping stem', desc: 'Horizontal growth direction — pleurocarpous mosses grow laterally across surfaces, branching freely.' },
    { x: 0.72, y: 0.25, side: 'right', label: 'Lateral sporophyte', desc: 'Sporophyte emerges from the side of the stem, not the tip. "Pleuro" means side. This is the defining feature.' },
    { x: 0.82, y: 0.55, side: 'right', label: 'Mat form', desc: 'Flat mat or carpet growth form — creeping stems overlap to form a continuous sheet across the substrate.' },
    { x: 0.78, y: 0.72, side: 'right', label: 'Rock substrate', desc: 'Pleurocarpous mosses often grow on rocks, logs, and tree bases in sheltered, moist, shady sites.' }
];

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));
    textFont('Arial');
    describe('Side-by-side comparison of acrocarpous versus pleurocarpous moss growth forms with interactive labels', LABEL);
}

function draw() {
    updateCanvasSize();

    // Drawing area
    fill(252, 250, 245);
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
    text('Acrocarpous vs. Pleurocarpous Moss', canvasWidth / 2, 6);

    let halfW = canvasWidth / 2;

    // Subtitles
    fill(34, 100, 34);
    textSize(15);
    textStyle(BOLD);
    text('Acrocarpous', halfW / 2, 28);
    text('Pleurocarpous', halfW + halfW / 2, 28);
    textStyle(NORMAL);

    // Divider
    stroke(200);
    strokeWeight(1);
    line(halfW, 45, halfW, drawHeight - 60);

    // Draw acrocarpous side (left)
    drawAcrocarpous(halfW / 2, drawHeight * 0.45, halfW - 30);

    // Draw pleurocarpous side (right)
    drawPleurocarpous(halfW + halfW / 2, drawHeight * 0.45, halfW - 30);

    // Check hover
    hoveredCallout = -1;
    for (let i = 0; i < callouts.length; i++) {
        let c = callouts[i];
        let cx = c.x * canvasWidth;
        let cy = c.y * drawHeight;
        if (dist(mouseX, mouseY, cx, cy) < 18) {
            hoveredCallout = i;
        }
    }

    // Draw callout markers
    for (let i = 0; i < callouts.length; i++) {
        let c = callouts[i];
        let cx = c.x * canvasWidth;
        let cy = c.y * drawHeight;
        let isActive = (hoveredCallout === i || selectedCallout === i);

        // Marker
        fill(isActive ? color(255, 100, 50) : color(50, 120, 200));
        stroke(255);
        strokeWeight(2);
        ellipse(cx, cy, isActive ? 16 : 12);

        // Number
        fill(255);
        noStroke();
        textSize(9);
        textAlign(CENTER, CENTER);
        text(i + 1, cx, cy);

        // Label on hover
        if (isActive) {
            let labelX = cx + (c.side === 'left' ? 15 : -15);
            let labelAlign = c.side === 'left' ? LEFT : RIGHT;
            fill(0, 0, 0, 200);
            noStroke();
            let tw = textWidth(c.label) + 12;
            let lx = c.side === 'left' ? labelX - 4 : labelX - tw + 4;
            rect(lx, cy - 10, tw, 20, 4);
            fill(255);
            textSize(11);
            textAlign(labelAlign, CENTER);
            text(c.label, labelX, cy);
        }
    }

    // Info panel at bottom
    let infoY = drawHeight - 55;
    fill(255, 255, 255, 240);
    stroke(180);
    strokeWeight(1);
    rect(margin, infoY, canvasWidth - 2 * margin, 50, 4);

    let activeIdx = selectedCallout >= 0 ? selectedCallout : hoveredCallout;
    if (activeIdx >= 0) {
        let c = callouts[activeIdx];
        fill(50, 120, 200);
        noStroke();
        textSize(12);
        textStyle(BOLD);
        textAlign(LEFT, TOP);
        text(c.label, margin + 8, infoY + 5);
        textStyle(NORMAL);
        fill(60);
        textSize(11);
        textWrap(WORD);
        text(c.desc, margin + 8, infoY + 22, canvasWidth - 2 * margin - 16);
    } else {
        fill(120);
        textSize(12);
        textAlign(CENTER, CENTER);
        noStroke();
        text('Hover or click numbered markers to learn about each feature', canvasWidth / 2, infoY + 25);
    }

    // Control label
    fill(100);
    textSize(11);
    textAlign(CENTER, CENTER);
    noStroke();
    text('Click markers for details — acrocarpous grows UP, pleurocarpous grows OUT', canvasWidth / 2, drawHeight + 20);
}

function drawAcrocarpous(cx, cy, w) {
    push();
    let baseY = cy + 80;
    let soilY = baseY + 10;

    // Soil
    fill(139, 105, 70);
    noStroke();
    rect(cx - w / 2, soilY, w, 40, 0, 0, 4, 4);

    // Soil texture
    fill(120, 85, 50);
    for (let i = 0; i < 8; i++) {
        ellipse(cx - w / 2 + random(w), soilY + random(5, 35), random(3, 8), random(2, 5));
    }

    // Draw cushion of upright moss plants
    let plantCount = 9;
    let spacing = w * 0.5 / plantCount;

    for (let i = 0; i < plantCount; i++) {
        let px = cx - (plantCount / 2) * spacing + i * spacing;
        let stemH = 50 + sin(i * 0.7) * 10;

        // Stem
        stroke(80, 140, 60);
        strokeWeight(3);
        line(px, baseY, px, baseY - stemH);

        // Spiral leaves
        noStroke();
        for (let j = 0; j < 6; j++) {
            let ly = baseY - j * (stemH / 6);
            let side = j % 2 === 0 ? -1 : 1;
            fill(60 + j * 5, 150 + j * 5, 50, 200);
            push();
            translate(px, ly);
            rotate(side * 0.3);
            ellipse(side * 6, 0, 12, 5);
            pop();
        }
    }

    // Sporophyte at tip of center stem
    let sporoX = cx;
    let sporoBaseY = baseY - 55;
    stroke(160, 110, 50);
    strokeWeight(2);
    line(sporoX, sporoBaseY, sporoX, sporoBaseY - 35);
    noStroke();
    fill(160, 100, 45);
    ellipse(sporoX, sporoBaseY - 38, 10, 14);

    // Dome outline to show cushion form
    noFill();
    stroke(100, 100, 100, 80);
    strokeWeight(1);
    setLineDash([4, 4]);
    arc(cx, baseY, w * 0.6, stemH * 1.5, PI, TWO_PI);
    setLineDash([]);

    // Growth direction arrow
    fill(100);
    noStroke();
    textSize(10);
    textAlign(CENTER, CENTER);
    let arrowX = cx + w * 0.35;
    text('↑ Growth', arrowX, baseY - 40);

    pop();
}

function drawPleurocarpous(cx, cy, w) {
    push();
    let baseY = cy + 80;
    let rockY = baseY + 5;

    // Rock
    fill(140, 140, 135);
    stroke(120, 120, 115);
    strokeWeight(1);
    beginShape();
    vertex(cx - w / 2, rockY);
    vertex(cx - w / 2, rockY + 40);
    vertex(cx + w / 2, rockY + 40);
    vertex(cx + w / 2, rockY);
    bezierVertex(cx + w / 4, rockY - 5, cx - w / 4, rockY + 3, cx - w / 2, rockY);
    endShape(CLOSE);

    // Rock texture
    noStroke();
    fill(155, 155, 148);
    for (let i = 0; i < 6; i++) {
        ellipse(cx - w / 3 + random(w * 0.65), rockY + random(5, 35), random(5, 12), random(3, 6));
    }

    // Creeping moss stems
    let stemCount = 5;
    for (let i = 0; i < stemCount; i++) {
        let sy = baseY - 5 - i * 8;
        let startX = cx - w * 0.35;
        let endX = cx + w * 0.35;

        // Main creeping stem
        stroke(70, 140, 55);
        strokeWeight(2.5);
        noFill();
        beginShape();
        for (let x = startX; x <= endX; x += 5) {
            let yOff = sin(x * 0.05 + i) * 4;
            vertex(x, sy + yOff);
        }
        endShape();

        // Branch stems
        for (let bx = startX + 15; bx < endX - 10; bx += 20) {
            let by = sy + sin(bx * 0.05 + i) * 4;
            stroke(60, 130, 50);
            strokeWeight(1.5);
            line(bx, by, bx + random(-8, 8), by - random(5, 12));
        }

        // Small leaves along stem
        noStroke();
        fill(55, 155, 45, 180);
        for (let lx = startX + 5; lx < endX - 5; lx += 8) {
            let ly = sy + sin(lx * 0.05 + i) * 4;
            ellipse(lx, ly - 2, 6, 4);
        }
    }

    // Lateral sporophyte (from side of a stem)
    let sporoStemY = baseY - 25;
    let sporoStemX = cx + 10;
    stroke(160, 110, 50);
    strokeWeight(2);
    line(sporoStemX, sporoStemY, sporoStemX + 5, sporoStemY - 35);
    noStroke();
    fill(160, 100, 45);
    ellipse(sporoStemX + 5, sporoStemY - 38, 10, 14);

    // Mat outline
    noFill();
    stroke(100, 100, 100, 80);
    strokeWeight(1);
    setLineDash([4, 4]);
    rect(cx - w * 0.38, baseY - stemCount * 8 - 8, w * 0.76, stemCount * 8 + 12, 3);
    setLineDash([]);

    // Growth direction arrow
    fill(100);
    noStroke();
    textSize(10);
    textAlign(CENTER, CENTER);
    text('→ Growth', cx, baseY + 50);

    pop();
}

function setLineDash(pattern) {
    drawingContext.setLineDash(pattern);
}

function mousePressed() {
    for (let i = 0; i < callouts.length; i++) {
        let c = callouts[i];
        let cx = c.x * canvasWidth;
        let cy = c.y * drawHeight;
        if (dist(mouseX, mouseY, cx, cy) < 18) {
            selectedCallout = (selectedCallout === i) ? -1 : i;
            return;
        }
    }
    selectedCallout = -1;
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
