// pH Scale for Moss Environments
// Interactive pH visualization showing optimal ranges for moss species
// MicroSim version 2026.03

let containerWidth;
let canvasWidth = 400;
let drawHeight = 280;
let controlHeight = 40;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let sliderLeftMargin = 80;

let phSlider;
let currentPH = 5.5;

// pH reference substances
const substances = [
    { name: 'Lemon Juice', ph: 2.0 },
    { name: 'Vinegar', ph: 2.8 },
    { name: 'Coffee', ph: 5.0 },
    { name: 'Pure Water', ph: 7.0 },
    { name: 'Seawater', ph: 8.1 },
    { name: 'Soap', ph: 10.0 },
    { name: 'Bleach', ph: 12.5 }
];

// pH descriptions for moss
function getMossDescription(ph) {
    if (ph < 3.0) return "Extremely acidic — too harsh for most mosses. Only extremophile species survive here.";
    if (ph < 4.5) return "Very acidic — Sphagnum (peat moss) thrives in acidic bogs at this pH range.";
    if (ph < 5.0) return "Acidic — approaching the sweet spot. Many forest floor mosses do well here.";
    if (ph < 6.5) return "Ideal range! Most moss species thrive between pH 5.0 and 6.5. Slightly acidic soil is perfect.";
    if (ph < 7.5) return "Neutral — some mosses tolerate this, but growth may be slower than in acidic conditions.";
    if (ph < 9.0) return "Alkaline — challenging for most mosses. Only a few limestone-loving species survive here.";
    return "Highly alkaline — too basic for nearly all moss species. Moss cannot establish in this environment.";
}

function getMossHealth(ph) {
    // Returns 0 (dead) to 1 (thriving) based on pH
    if (ph >= 5.0 && ph <= 6.5) return 1.0;
    if (ph >= 4.5 && ph < 5.0) return 0.7;
    if (ph > 6.5 && ph <= 7.0) return 0.7;
    if (ph >= 3.5 && ph < 4.5) return 0.4;
    if (ph > 7.0 && ph <= 8.0) return 0.4;
    if (ph >= 2.5 && ph < 3.5) return 0.2;
    if (ph > 8.0 && ph <= 9.0) return 0.2;
    return 0.05;
}

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    phSlider = createSlider(0, 140, 55, 1);
    phSlider.position(sliderLeftMargin, drawHeight + 10);
    phSlider.size(canvasWidth - sliderLeftMargin - margin);

    describe('Interactive pH scale showing optimal ranges for moss growth with a draggable slider', LABEL);
}

function draw() {
    updateCanvasSize();
    currentPH = phSlider.value() / 10.0;

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
    text('pH Scale for Moss Environments', canvasWidth / 2, 8);

    // pH bar dimensions
    let barX = margin + 10;
    let barW = canvasWidth - 2 * margin - 20;
    let barY = 50;
    let barH = 30;

    // Draw pH gradient bar
    noStroke();
    for (let i = 0; i < barW; i++) {
        let ph = map(i, 0, barW, 0, 14);
        let c = getPHColor(ph);
        fill(c);
        rect(barX + i, barY, 1, barH);
    }

    // Moss sweet spot highlight
    let sweetLeft = map(5.0, 0, 14, barX, barX + barW);
    let sweetRight = map(6.5, 0, 14, barX, barX + barW);
    stroke(34, 139, 34);
    strokeWeight(3);
    noFill();
    rect(sweetLeft, barY - 3, sweetRight - sweetLeft, barH + 6, 4);
    noStroke();
    fill(34, 139, 34);
    textSize(11);
    textAlign(CENTER, TOP);
    text('Moss Sweet Spot', (sweetLeft + sweetRight) / 2, barY + barH + 6);

    // pH number labels
    fill(60);
    textSize(10);
    textAlign(CENTER, TOP);
    for (let p = 0; p <= 14; p++) {
        let x = map(p, 0, 14, barX, barX + barW);
        text(p, x, barY + barH + 20);
        stroke(60);
        strokeWeight(1);
        line(x, barY + barH, x, barY + barH + 4);
        noStroke();
    }

    // Substance markers
    textSize(9);
    for (let i = 0; i < substances.length; i++) {
        let s = substances[i];
        let x = map(s.ph, 0, 14, barX, barX + barW);
        stroke(80);
        strokeWeight(1);
        line(x, barY - 6, x, barY);
        noStroke();
        fill(80);
        textAlign(CENTER, BOTTOM);
        // Alternate above positions
        let yOff = (i % 2 === 0) ? barY - 8 : barY - 20;
        text(s.name, x, yOff);
    }

    // Current pH indicator (triangle)
    let indicatorX = map(currentPH, 0, 14, barX, barX + barW);
    fill(0);
    noStroke();
    triangle(indicatorX - 8, barY + barH + 16, indicatorX + 8, barY + barH + 16, indicatorX, barY + barH + 4);

    // Current pH display
    textSize(16);
    textAlign(LEFT, TOP);
    fill(0);
    text('pH: ' + nf(currentPH, 1, 1), margin, barY + barH + 38);

    // Acidic/Basic labels
    textSize(11);
    fill(200, 50, 50);
    textAlign(LEFT, TOP);
    text('← Acidic', barX, barY + barH + 38);
    fill(50, 50, 200);
    textAlign(RIGHT, TOP);
    text('Basic →', barX + barW, barY + barH + 38);

    // Draw moss character
    let health = getMossHealth(currentPH);
    drawMossCharacter(canvasWidth / 2, 180, health);

    // Description
    fill(60);
    textSize(12);
    textAlign(CENTER, TOP);
    textWrap(WORD);
    let desc = getMossDescription(currentPH);
    text(desc, canvasWidth / 2, 230, canvasWidth - 2 * margin);

    // Control label
    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(14);
    text('pH: ' + nf(currentPH, 1, 1), 10, drawHeight + 20);
}

function drawMossCharacter(cx, cy, health) {
    push();
    translate(cx, cy);

    // Interpolate colors based on health
    let stemGreen = lerpColor(color(100, 70, 30), color(50, 140, 50), health);
    let leafGreen = lerpColor(color(120, 80, 20), color(40, 180, 40), health);

    // Curl factor (leaves curl when unhealthy)
    let curl = map(health, 0, 1, 0.8, 0);

    // Draw 5 moss stems
    for (let i = -2; i <= 2; i++) {
        let baseX = i * 14;
        let stemH = map(health, 0, 1, 15, 30);

        // Stem
        stroke(stemGreen);
        strokeWeight(3);
        line(baseX, 10, baseX, 10 - stemH);

        // Leaves (more curled when unhealthy)
        noStroke();
        fill(leafGreen);
        for (let j = 0; j < 4; j++) {
            let ly = 10 - stemH + j * (stemH / 4);
            let leafLen = map(health, 0, 1, 4, 10);
            let side = (j % 2 === 0) ? -1 : 1;
            let curlY = curl * 5;

            push();
            translate(baseX, ly);
            beginShape();
            vertex(0, 0);
            bezierVertex(side * leafLen * 0.5, -3 + curlY,
                         side * leafLen, -2 + curlY * 2,
                         side * leafLen * (1 - curl * 0.5), curlY * 2);
            bezierVertex(side * leafLen * 0.5, 2 + curlY,
                         side * leafLen * 0.3, 1,
                         0, 1);
            endShape(CLOSE);
            pop();
        }
    }

    // Face
    let faceY = -30;
    if (health > 0.6) {
        // Happy face
        fill(40, 180, 40);
        noStroke();
        ellipse(0, faceY, 20, 18);
        fill(0);
        ellipse(-4, faceY - 2, 3, 3);
        ellipse(4, faceY - 2, 3, 3);
        noFill();
        stroke(0);
        strokeWeight(1.5);
        arc(0, faceY + 2, 10, 6, 0, PI);
    } else if (health > 0.3) {
        // Neutral face
        let faceCol = lerpColor(color(180, 150, 50), color(40, 180, 40), (health - 0.3) / 0.3);
        fill(faceCol);
        noStroke();
        ellipse(0, faceY, 20, 18);
        fill(0);
        ellipse(-4, faceY - 2, 3, 3);
        ellipse(4, faceY - 2, 3, 3);
        stroke(0);
        strokeWeight(1.5);
        line(-4, faceY + 4, 4, faceY + 4);
    } else {
        // Sad face
        fill(120, 80, 30);
        noStroke();
        ellipse(0, faceY, 20, 18);
        fill(0);
        ellipse(-4, faceY - 2, 3, 3);
        ellipse(4, faceY - 2, 3, 3);
        noFill();
        stroke(0);
        strokeWeight(1.5);
        arc(0, faceY + 7, 10, 6, PI, TWO_PI);
    }

    pop();
}

function getPHColor(ph) {
    if (ph < 3) return lerpColor(color(255, 0, 0), color(255, 140, 0), ph / 3);
    if (ph < 6) return lerpColor(color(255, 140, 0), color(255, 255, 0), (ph - 3) / 3);
    if (ph < 8) return lerpColor(color(255, 255, 0), color(0, 180, 0), (ph - 6) / 2);
    if (ph < 11) return lerpColor(color(0, 180, 0), color(0, 100, 200), (ph - 8) / 3);
    return lerpColor(color(0, 100, 200), color(80, 0, 160), (ph - 11) / 3);
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, canvasHeight);
    phSlider.size(canvasWidth - sliderLeftMargin - margin);
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);
    canvasWidth = containerWidth;
}
