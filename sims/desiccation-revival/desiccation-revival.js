// Moss Desiccation and Revival Cycle
// Animation showing moss drying out and reviving when water is added
// MicroSim version 2026.03

let containerWidth;
let canvasWidth = 400;
let drawHeight = 370;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 15;

let hydration = 100;
let targetHydration = 100;
let isDrying = false;
let isWatering = false;
let isAutoCycle = false;
let autoCyclePhase = 'dry';
let autoCycleTimer = 0;
let dormantTime = 0;
let dormantStartFrame = 0;
let speedSlider;
let dryBtn, waterBtn, autoBtn;
let rainDrops = [];
let showFunFact = false;
let funFactTimer = 0;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    dryBtn = createButton('☀ Dry Out');
    dryBtn.position(10, drawHeight + 8);
    dryBtn.mousePressed(() => { isDrying = true; isWatering = false; targetHydration = 0; showFunFact = false; });
    dryBtn.style('padding', '5px 12px');
    dryBtn.style('border-radius', '4px');
    dryBtn.style('border', '2px solid #e65100');
    dryBtn.style('background', '#ff9800');
    dryBtn.style('color', 'white');
    dryBtn.style('font-weight', 'bold');
    dryBtn.style('cursor', 'pointer');

    waterBtn = createButton('💧 Add Water');
    waterBtn.position(105, drawHeight + 8);
    waterBtn.mousePressed(() => {
        isWatering = true;
        isDrying = false;
        targetHydration = 100;
        if (hydration < 20) { showFunFact = true; funFactTimer = 300; }
    });
    waterBtn.style('padding', '5px 12px');
    waterBtn.style('border-radius', '4px');
    waterBtn.style('border', '2px solid #1565c0');
    waterBtn.style('background', '#2196f3');
    waterBtn.style('color', 'white');
    waterBtn.style('font-weight', 'bold');
    waterBtn.style('cursor', 'pointer');

    autoBtn = createButton('🔄 Auto Cycle');
    autoBtn.position(215, drawHeight + 8);
    autoBtn.mousePressed(() => {
        isAutoCycle = !isAutoCycle;
        if (isAutoCycle) {
            autoCyclePhase = 'dry';
            autoCycleTimer = 0;
            isDrying = true;
            isWatering = false;
            targetHydration = 0;
        }
    });
    autoBtn.style('padding', '5px 12px');
    autoBtn.style('border-radius', '4px');
    autoBtn.style('border', '2px solid #666');
    autoBtn.style('cursor', 'pointer');
    autoBtn.style('font-weight', 'bold');

    speedSlider = createSlider(1, 10, 3, 1);
    speedSlider.position(canvasWidth - 140, drawHeight + 14);
    speedSlider.size(80);

    describe('Animation showing moss drying out and reviving when water is added, demonstrating desiccation tolerance', LABEL);
}

function draw() {
    updateCanvasSize();

    let speed = speedSlider.value();

    // Update hydration
    let hydrationRate = speed * 0.4;
    if (isDrying && hydration > targetHydration) {
        hydration = max(0, hydration - hydrationRate);
        if (hydration <= 0) {
            isDrying = false;
            dormantStartFrame = frameCount;
        }
    }
    if (isWatering && hydration < targetHydration) {
        hydration = min(100, hydration + hydrationRate * 1.5);
        // Generate rain
        if (frameCount % 2 === 0) {
            for (let i = 0; i < 3; i++) {
                rainDrops.push({
                    x: random(canvasWidth * 0.2, canvasWidth * 0.8),
                    y: random(-10, 30),
                    speed: random(3, 7),
                    size: random(2, 4)
                });
            }
        }
        if (hydration >= 100) isWatering = false;
    }

    // Auto cycle logic
    if (isAutoCycle) {
        autoBtn.style('background', '#4caf50');
        autoBtn.style('color', 'white');
        autoCycleTimer++;
        if (autoCyclePhase === 'dry' && hydration <= 0) {
            if (autoCycleTimer > 60) {
                autoCyclePhase = 'wet';
                autoCycleTimer = 0;
                isWatering = true;
                isDrying = false;
                targetHydration = 100;
            }
        } else if (autoCyclePhase === 'wet' && hydration >= 100) {
            if (autoCycleTimer > 90) {
                autoCyclePhase = 'dry';
                autoCycleTimer = 0;
                isDrying = true;
                isWatering = false;
                targetHydration = 0;
            }
        }
    } else {
        autoBtn.style('background', '#eee');
        autoBtn.style('color', '#333');
    }

    // Dormant time tracking
    if (hydration <= 0) {
        dormantTime = floor((frameCount - dormantStartFrame) / 60);
    } else {
        dormantTime = 0;
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
    text('Moss Desiccation & Revival', canvasWidth / 2, 6);

    // Water meter on left
    let meterX = 30;
    let meterTop = 40;
    let meterH = 200;
    let meterW = 25;

    // Meter background
    fill(230);
    stroke(180);
    strokeWeight(1);
    rect(meterX, meterTop, meterW, meterH, 4);

    // Meter fill
    let fillH = map(hydration, 0, 100, 0, meterH);
    let meterColor = lerpColor(color(139, 90, 43), color(30, 144, 255), hydration / 100);
    fill(meterColor);
    noStroke();
    rect(meterX + 2, meterTop + meterH - fillH, meterW - 4, fillH, 2);

    // Meter label
    fill(60);
    textSize(11);
    textAlign(CENTER, BOTTOM);
    text('💧', meterX + meterW / 2, meterTop - 2);
    textSize(12);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    text(round(hydration) + '%', meterX + meterW / 2, meterTop + meterH + 5);
    textStyle(NORMAL);
    textSize(9);
    text('Hydration', meterX + meterW / 2, meterTop + meterH + 22);

    // Draw moss cushion
    let mossX = canvasWidth / 2;
    let mossY = 180;
    drawMossCushion(mossX, mossY, hydration);

    // Status text
    let statusY = 290;
    textSize(13);
    textAlign(CENTER, TOP);
    fill(60);
    if (hydration >= 80) {
        fill(34, 139, 34);
        text('Thriving! Bright green and fully hydrated.', canvasWidth / 2, statusY);
    } else if (hydration >= 50) {
        fill(120, 120, 30);
        text('Drying... leaves starting to curl inward.', canvasWidth / 2, statusY);
    } else if (hydration >= 25) {
        fill(150, 100, 30);
        text('Stressed. Turning brown, curling tightly.', canvasWidth / 2, statusY);
    } else if (hydration > 0) {
        fill(120, 70, 20);
        text('Nearly dormant. Dark and crispy.', canvasWidth / 2, statusY);
    } else {
        fill(80, 50, 20);
        text('Dormant. Completely desiccated.', canvasWidth / 2, statusY);
        if (dormantTime > 0) {
            textSize(11);
            fill(100);
            text('Time dormant: ' + dormantTime + 's', canvasWidth / 2, statusY + 18);
        }
    }

    // Rain drops
    for (let i = rainDrops.length - 1; i >= 0; i--) {
        let drop = rainDrops[i];
        drop.y += drop.speed;
        fill(100, 170, 255, 180);
        noStroke();
        ellipse(drop.x, drop.y, drop.size, drop.size * 2.5);
        if (drop.y > mossY + 30) {
            rainDrops.splice(i, 1);
        }
    }

    // Fun fact popup
    if (showFunFact && funFactTimer > 0) {
        funFactTimer--;
        let factAlpha = min(255, funFactTimer * 2);
        fill(255, 255, 220, factAlpha);
        stroke(200, 180, 100, factAlpha);
        strokeWeight(2);
        let factW = min(300, canvasWidth - 40);
        rect(canvasWidth / 2 - factW / 2, 315, factW, 40, 6);
        noStroke();
        fill(80, 60, 20, factAlpha);
        textSize(11);
        textAlign(CENTER, CENTER);
        text('Fun fact: Some mosses revive after 10+ years dry!', canvasWidth / 2, 335);
    }

    // Speed label
    fill(80);
    noStroke();
    textSize(11);
    textAlign(RIGHT, CENTER);
    text('Speed: ' + speed, canvasWidth - 145, drawHeight + 25);
}

function drawMossCushion(cx, cy, hyd) {
    push();
    translate(cx, cy);

    let h01 = hyd / 100;

    // Colors interpolated by hydration
    let baseGreen = lerpColor(color(80, 50, 20), color(50, 150, 50), h01);
    let leafGreen = lerpColor(color(100, 60, 15), color(40, 180, 40), h01);
    let darkGreen = lerpColor(color(60, 40, 15), color(30, 120, 30), h01);

    // Cushion base (gets flatter when dry)
    let cushionW = map(h01, 0, 1, 100, 120);
    let cushionH = map(h01, 0, 1, 20, 40);

    fill(darkGreen);
    noStroke();
    ellipse(0, 10, cushionW, cushionH);

    // Individual moss stems
    let stemCount = 15;
    for (let i = -stemCount / 2; i <= stemCount / 2; i++) {
        let sx = i * (cushionW / stemCount) * 0.8;
        let stemH = map(h01, 0, 1, 8, 28) + sin(i * 0.5) * 3;
        let curl = map(h01, 0, 1, 1.2, 0);

        // Stem
        stroke(baseGreen);
        strokeWeight(2);
        let topX = sx + sin(i * 0.3) * curl * 8;
        let topY = -stemH + abs(i) * curl * 2;
        line(sx, 5, topX, topY);

        // Leaves
        noStroke();
        fill(leafGreen);
        let leafLen = map(h01, 0, 1, 3, 8);
        let curlAngle = map(h01, 0, 1, 1.5, 0.3);

        for (let j = 0; j < 3; j++) {
            let ly = lerp(5, topY, (j + 1) / 4);
            let lx = lerp(sx, topX, (j + 1) / 4);
            let side = (j % 2 === 0) ? -1 : 1;

            push();
            translate(lx, ly);
            rotate(side * curlAngle);
            ellipse(side * leafLen / 2, 0, leafLen, leafLen * 0.4);
            pop();
        }
    }

    // Sheen when hydrated
    if (h01 > 0.7) {
        fill(200, 230, 255, map(h01, 0.7, 1, 0, 40));
        noStroke();
        ellipse(0, -10, cushionW * 0.6, cushionH * 0.3);
    }

    pop();
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, canvasHeight);
    speedSlider.position(canvasWidth - 140, drawHeight + 14);
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);
    canvasWidth = containerWidth;
}
