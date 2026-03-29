// Spore Dispersal Mechanism
// Interactive simulation of peristome teeth responding to humidity
// MicroSim version 2026.03

let containerWidth;
let canvasWidth = 400;
let drawHeight = 320;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 15;

let humiditySlider;
let releaseBtn;
let spores = [];
let windParticles = [];
let sporesReleased = 0;
let totalDistance = 0;
let framesSinceRelease = 0;
let manualRelease = false;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    humiditySlider = createSlider(0, 100, 30, 1);
    humiditySlider.position(100, drawHeight + 10);
    humiditySlider.size(canvasWidth - 240);

    releaseBtn = createButton('Release Spores');
    releaseBtn.position(canvasWidth - 130, drawHeight + 8);
    releaseBtn.mousePressed(() => { manualRelease = true; });
    releaseBtn.style('padding', '5px 14px');
    releaseBtn.style('border-radius', '4px');
    releaseBtn.style('border', '2px solid #e65100');
    releaseBtn.style('background', '#ff9800');
    releaseBtn.style('color', 'white');
    releaseBtn.style('font-weight', 'bold');
    releaseBtn.style('cursor', 'pointer');

    // Initialize wind particles
    for (let i = 0; i < 20; i++) {
        windParticles.push({
            x: random(-50, canvasWidth),
            y: random(30, drawHeight - 80),
            speed: random(1, 3),
            len: random(8, 20),
            alpha: random(40, 100)
        });
    }

    describe('Interactive simulation showing how peristome teeth respond to humidity and control spore release', LABEL);
}

function draw() {
    updateCanvasSize();

    let humidity = humiditySlider.value();
    // Tooth openness: 0 = closed, 1 = fully open
    let openness;
    if (humidity < 40) openness = map(humidity, 0, 40, 1, 0.3);
    else if (humidity > 60) openness = map(humidity, 60, 100, 0.3, 0);
    else openness = map(humidity, 40, 60, 0.3, 0.3);
    // Below 40% fully open tendency
    if (humidity < 20) openness = 1;

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
    text('Spore Dispersal Mechanism', canvasWidth / 2, 6);

    // Simple ground
    fill(120, 160, 80);
    noStroke();
    rect(0, drawHeight - 40, canvasWidth, 40);

    // Wind particles
    for (let wp of windParticles) {
        wp.x += wp.speed * map(100 - humidity, 0, 100, 0.3, 1.5);
        if (wp.x > canvasWidth + 20) {
            wp.x = -20;
            wp.y = random(30, drawHeight - 80);
        }
        stroke(150, 200, 240, wp.alpha);
        strokeWeight(1.5);
        line(wp.x, wp.y, wp.x + wp.len, wp.y - 1);
    }

    // Draw capsule at center
    let capX = canvasWidth * 0.35;
    let capY = drawHeight - 120;

    // Seta (stalk)
    stroke(130, 90, 40);
    strokeWeight(4);
    line(capX, drawHeight - 40, capX, capY + 20);

    // Capsule body
    fill(140, 100, 45);
    stroke(120, 80, 35);
    strokeWeight(2);
    let capW = 40;
    let capH = 50;
    rect(capX - capW / 2, capY - capH / 2, capW, capH, 5, 5, 2, 2);

    // Spores inside capsule
    fill(200, 175, 60);
    noStroke();
    for (let i = 0; i < 12; i++) {
        let sx = capX + random(-capW / 2 + 6, capW / 2 - 6);
        let sy = capY + random(-capH / 2 + 6, capH / 2 - 6);
        ellipse(sx, sy, 4, 4);
    }

    // Peristome teeth (8 teeth around rim)
    let teethCount = 8;
    let rimY = capY - capH / 2;
    let toothLen = 18;

    for (let i = 0; i < teethCount; i++) {
        let baseX = capX - capW / 2 + 3 + i * (capW - 6) / (teethCount - 1);
        let angle = map(openness, 0, 1, 0, -PI / 3);
        let tipX, tipY;

        // Odd teeth curve left, even right for visual variety
        let curveFactor = (i % 2 === 0) ? 1 : -1;

        if (i < teethCount / 2) {
            // Left side teeth
            tipX = baseX + sin(angle) * toothLen * -0.5 * openness;
            tipY = rimY - cos(angle * 0.8) * toothLen;
        } else {
            tipX = baseX - sin(angle) * toothLen * -0.5 * openness;
            tipY = rimY - cos(angle * 0.8) * toothLen;
        }

        // When closed, teeth point inward
        if (openness < 0.3) {
            let inward = map(openness, 0, 0.3, 1, 0);
            tipX = lerp(tipX, capX, inward * 0.5);
            tipY = lerp(tipY, rimY - toothLen * 0.3, inward);
        }

        stroke(180, 140, 80);
        strokeWeight(2.5);
        line(baseX, rimY, tipX, tipY);

        // Tooth tip
        fill(190, 150, 90);
        noStroke();
        ellipse(tipX, tipY, 4, 4);
    }

    // Humidity indicator
    let indX = capX + capW + 30;
    let indY = capY - capH / 2;
    let indH = capH + 30;
    let indW = 18;

    // Background
    fill(230);
    stroke(180);
    strokeWeight(1);
    rect(indX, indY, indW, indH, 3);

    // Fill
    let humH = map(humidity, 0, 100, 0, indH);
    let humColor = lerpColor(color(255, 200, 100), color(30, 100, 200), humidity / 100);
    fill(humColor);
    noStroke();
    rect(indX + 2, indY + indH - humH, indW - 4, humH, 2);

    // Label
    fill(60);
    textSize(10);
    textAlign(CENTER, TOP);
    text(humidity + '%', indX + indW / 2, indY + indH + 4);
    text('Humidity', indX + indW / 2, indY + indH + 16);

    // Spore release logic
    let canRelease = openness > 0.4;
    if ((canRelease && frameCount % max(5, round(30 - openness * 25)) === 0) || manualRelease) {
        let numToRelease = manualRelease ? 8 : round(openness * 2);
        for (let i = 0; i < numToRelease; i++) {
            spores.push({
                x: capX + random(-capW / 3, capW / 3),
                y: rimY - random(5, 15),
                vx: random(-0.5, 2) * map(100 - humidity, 0, 100, 0.5, 2),
                vy: random(-2, -0.5),
                size: random(3, 5),
                alpha: 255,
                settled: false,
                startX: capX
            });
        }
        sporesReleased += numToRelease;
        manualRelease = false;
    }

    // Update and draw spores
    for (let i = spores.length - 1; i >= 0; i--) {
        let sp = spores[i];
        if (!sp.settled) {
            sp.vx += random(-0.05, 0.1) * map(100 - humidity, 0, 100, 0.3, 1.5);
            sp.vy += 0.03; // gravity
            sp.x += sp.vx;
            sp.y += sp.vy;
            sp.alpha -= 0.3;

            if (sp.y > drawHeight - 42) {
                sp.settled = true;
                sp.y = drawHeight - 42;
                let distance = abs(sp.x - sp.startX);
                totalDistance += distance;
            }
        }

        fill(200, 175, 60, sp.alpha);
        noStroke();
        ellipse(sp.x, sp.y, sp.size);

        if (sp.alpha <= 0 || sp.x > canvasWidth + 20) {
            if (!sp.settled) {
                totalDistance += abs(sp.x - sp.startX);
            }
            spores.splice(i, 1);
        }
    }

    // Stats display
    let statsY = 30;
    fill(40);
    noStroke();
    textSize(11);
    textAlign(RIGHT, TOP);
    text('Spores released: ' + sporesReleased, canvasWidth - 15, statsY);
    let avgDist = sporesReleased > 0 ? round(totalDistance / sporesReleased) : 0;
    text('Avg. distance: ' + avgDist + ' px', canvasWidth - 15, statsY + 16);

    // Teeth status text
    let statusText;
    if (openness > 0.7) statusText = 'Teeth OPEN — spores releasing freely';
    else if (openness > 0.3) statusText = 'Teeth partially open — some release';
    else statusText = 'Teeth CLOSED — spores retained';
    let statusColor = openness > 0.7 ? color(200, 120, 20) : openness > 0.3 ? color(150, 130, 60) : color(50, 100, 180);
    fill(statusColor);
    textSize(12);
    textAlign(CENTER, TOP);
    text(statusText, canvasWidth / 2, drawHeight - 50);

    // Adaptive advantage note
    fill(80);
    textSize(9);
    textAlign(LEFT, TOP);
    textWrap(WORD);
    text('Adaptive advantage: Spores release in dry, windy conditions for maximum dispersal distance.', 10, drawHeight - 35, canvasWidth * 0.5);

    // Control labels
    fill('black');
    noStroke();
    textSize(12);
    textAlign(LEFT, CENTER);
    text('Humidity: ' + humidity + '%', 10, drawHeight + 20);

    // Second row label
    textSize(10);
    fill(100);
    text('Low humidity = teeth open = spores fly', 10, drawHeight + 42);
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, canvasHeight);
    humiditySlider.size(canvasWidth - 240);
    releaseBtn.position(canvasWidth - 130, drawHeight + 8);
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);
    canvasWidth = containerWidth;
}
