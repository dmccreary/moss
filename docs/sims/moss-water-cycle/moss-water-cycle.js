// Moss in the Water Cycle - Animation of water cycle with moss's role
// MicroSim version 2026.03

let containerWidth;
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 15;

let rainfallSlider;
let mossToggle = true;
let toggleBtn;
let isRunning = false;
let playBtn;

let raindrops = [];
let waterParticles = [];
let vaporParticles = [];
let waterStored = 0;
let maxStorage = 100;
let runoffAmount = 0;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  let sliderLeftMargin = 130;
  rainfallSlider = createSlider(1, 10, 4, 1);
  rainfallSlider.position(sliderLeftMargin, drawHeight + 10);
  rainfallSlider.size(130);

  toggleBtn = createButton('With Moss');
  toggleBtn.position(sliderLeftMargin + 150, drawHeight + 8);
  toggleBtn.mousePressed(() => {
    mossToggle = !mossToggle;
    toggleBtn.html(mossToggle ? 'With Moss' : 'Without Moss');
    toggleBtn.style('background', mossToggle ? '#4CAF50' : '#f44336');
    waterStored = 0;
    runoffAmount = 0;
  });
  toggleBtn.style('padding', '4px 12px');
  toggleBtn.style('border-radius', '4px');
  toggleBtn.style('border', '2px solid #388E3C');
  toggleBtn.style('background', '#4CAF50');
  toggleBtn.style('color', 'white');
  toggleBtn.style('font-weight', 'bold');
  toggleBtn.style('cursor', 'pointer');

  playBtn = createButton('Play');
  playBtn.position(sliderLeftMargin + 280, drawHeight + 8);
  playBtn.mousePressed(() => {
    isRunning = !isRunning;
    playBtn.html(isRunning ? 'Pause' : 'Play');
  });
  playBtn.style('padding', '4px 12px');
  playBtn.style('border-radius', '4px');
  playBtn.style('border', '2px solid #666');
  playBtn.style('cursor', 'pointer');
  playBtn.style('font-weight', 'bold');

  textFont('Arial');
}

function updateCanvasSize() {
  const mainEl = document.querySelector('main');
  if (mainEl) {
    containerWidth = mainEl.offsetWidth;
  } else {
    containerWidth = windowWidth;
  }
  canvasWidth = containerWidth;
  canvasHeight = drawHeight + controlHeight;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  rainfallSlider.size(min(130, canvasWidth * 0.2));
}

function draw() {
  let skyH = drawHeight * 0.35;
  let mossY = drawHeight * 0.55;
  let mossH = drawHeight * 0.1;
  let soilY = mossY + mossH;
  let soilH = drawHeight - soilY;
  let rainfall = rainfallSlider.value();

  // Sky gradient
  for (let y = 0; y < skyH; y++) {
    let c = lerpColor(color(135, 206, 250), color(200, 220, 240), y / skyH);
    stroke(c);
    line(0, y, canvasWidth, y);
  }

  // Cloud
  noStroke();
  fill(220, 220, 230, 200);
  ellipse(canvasWidth * 0.3, skyH * 0.4, 120, 50);
  ellipse(canvasWidth * 0.35, skyH * 0.35, 80, 40);
  ellipse(canvasWidth * 0.7, skyH * 0.45, 100, 45);

  // Ground below sky
  fill(139, 120, 80);
  rect(0, skyH, canvasWidth, drawHeight - skyH);

  // Soil layers
  fill(120, 85, 50);
  rect(0, soilY, canvasWidth, soilH);
  fill(100, 70, 40);
  rect(0, soilY + soilH * 0.5, canvasWidth, soilH * 0.5);

  // Rock
  fill(150, 140, 130);
  rect(0, drawHeight - 15, canvasWidth, 15);

  // Moss layer (if toggled on)
  if (mossToggle) {
    // Dense moss mat
    fill(34, 120, 34);
    rect(0, mossY, canvasWidth, mossH);
    // Texture bumps
    fill(50, 160, 50);
    for (let x = 0; x < canvasWidth; x += 12) {
      let bh = 5 + sin(x * 0.1) * 3;
      ellipse(x, mossY, 14, bh);
    }
    // Water storage indicator inside moss
    let storePct = waterStored / maxStorage;
    fill(50, 100, 200, storePct * 150);
    rect(0, mossY + mossH * 0.3, canvasWidth, mossH * 0.6);
  } else {
    // Bare ground
    fill(160, 130, 90);
    rect(0, mossY, canvasWidth, mossH);
  }

  if (isRunning) {
    // Generate rain
    for (let i = 0; i < rainfall; i++) {
      if (random() < 0.5) {
        raindrops.push({ x: random(0, canvasWidth), y: random(-20, 0), speed: random(4, 7) });
      }
    }

    // Update rain
    for (let i = raindrops.length - 1; i >= 0; i--) {
      let r = raindrops[i];
      r.y += r.speed;
      if (r.y >= mossY) {
        if (mossToggle) {
          // Moss absorbs most water
          if (waterStored < maxStorage) {
            waterStored = min(maxStorage, waterStored + 0.5);
            // Some drips to soil slowly
            if (random() < 0.1) {
              waterParticles.push({ x: r.x, y: mossY + mossH, speed: 0.5, type: 'drip' });
            }
          } else {
            // Saturated - runoff
            runoffAmount = min(100, runoffAmount + 0.3);
            if (random() < 0.3) {
              waterParticles.push({ x: r.x, y: mossY, speed: 2, type: 'runoff' });
            }
          }
          // Evapotranspiration
          if (random() < 0.02 * (waterStored / maxStorage)) {
            vaporParticles.push({ x: r.x + random(-10, 10), y: mossY, alpha: 200 });
          }
        } else {
          // No moss - fast runoff
          runoffAmount = min(100, runoffAmount + 0.8);
          if (random() < 0.5) {
            waterParticles.push({ x: r.x, y: mossY, speed: 3, type: 'runoff' });
          }
        }
        raindrops.splice(i, 1);
      }
    }

    // Decay
    waterStored = max(0, waterStored - 0.05);
    runoffAmount = max(0, runoffAmount - 0.2);
  }

  // Draw rain
  stroke(100, 150, 255);
  strokeWeight(1.5);
  for (let r of raindrops) {
    line(r.x, r.y, r.x - 1, r.y + 8);
  }

  // Draw water particles
  noStroke();
  for (let i = waterParticles.length - 1; i >= 0; i--) {
    let p = waterParticles[i];
    if (p.type === 'runoff') {
      p.x += p.speed * (p.x < canvasWidth / 2 ? -1 : 1);
      fill(70, 130, 230, 180);
      ellipse(p.x, p.y + 2, 5, 3);
    } else {
      p.y += p.speed;
      fill(70, 130, 230, 150);
      ellipse(p.x, p.y, 3, 4);
    }
    if (p.x < -10 || p.x > canvasWidth + 10 || p.y > drawHeight) {
      waterParticles.splice(i, 1);
    }
  }

  // Draw vapor
  for (let i = vaporParticles.length - 1; i >= 0; i--) {
    let v = vaporParticles[i];
    v.y -= 0.8;
    v.alpha -= 1.5;
    fill(200, 220, 255, v.alpha);
    ellipse(v.x, v.y, 6, 6);
    if (v.alpha <= 0) vaporParticles.splice(i, 1);
  }

  // Labels
  noStroke();
  fill(255);
  textSize(12);
  textAlign(LEFT, TOP);
  if (mossToggle) {
    fill(255, 255, 200);
    text("Absorption", 10, mossY + 2);
    text("Slow release", 10, soilY + 5);
    // Evapotranspiration label
    fill(200, 220, 255);
    textAlign(RIGHT, BOTTOM);
    text("Evapotranspiration", canvasWidth - 10, mossY - 3);
  }

  // Gauges
  let gaugeX = canvasWidth - 120;
  let gaugeW = 100;
  let gaugeH = 14;

  // Storage gauge
  fill(255, 255, 255, 200);
  noStroke();
  rect(gaugeX - 5, skyH + 5, gaugeW + 10, 50, 6);
  fill(50);
  textAlign(LEFT, TOP);
  textSize(10);
  text("Water Stored", gaugeX, skyH + 8);
  stroke(150);
  noFill();
  rect(gaugeX, skyH + 22, gaugeW, gaugeH, 3);
  noStroke();
  fill(50, 130, 220);
  rect(gaugeX, skyH + 22, gaugeW * (waterStored / maxStorage), gaugeH, 3);

  // Runoff gauge
  fill(50);
  textSize(10);
  text("Surface Runoff", gaugeX, skyH + 40);
  stroke(150);
  noFill();
  rect(gaugeX, skyH + 53, gaugeW, gaugeH, 3);
  noStroke();
  fill(220, 100, 50);
  rect(gaugeX, skyH + 53, gaugeW * (runoffAmount / 100), gaugeH, 3);

  // Title
  fill(30, 50, 100);
  textSize(18);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text("Moss in the Water Cycle", canvasWidth / 2, 8);
  textStyle(NORMAL);

  // Control region
  fill(255);
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);
  stroke(200);
  line(0, drawHeight, canvasWidth, drawHeight);
  noStroke();
  fill(50);
  textAlign(LEFT, CENTER);
  textSize(12);
  text("Rainfall: " + rainfallSlider.value(), 10, drawHeight + 18);

  fill(120);
  textSize(11);
  textAlign(CENTER, CENTER);
  text("Adjust rainfall and toggle moss to compare water flow", canvasWidth / 2, drawHeight + 48);
}
