// Water Transport Comparison: Vascular Plant vs Moss
// Split-screen animation comparing internal vascular transport with external capillary action
// MicroSim version 2026.03

// Canvas dimensions
let containerWidth;
let canvasWidth = 400;
let drawHeight = 410;
let controlHeight = 40;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let sliderLeftMargin = 170;
let defaultTextSize = 16;

// Controls
let addWaterButton;
let speedSlider;
let labelCheckbox;

// Simulation state
let isRaining = false;
let rainTimer = 0;
let rainDuration = 120; // frames of rain

// Particles for vascular plant
let xylemParticles = [];
let phloemParticles = [];

// Particles for moss
let capillaryParticles = [];

// Rain drops
let rainDrops = [];

// Plant geometry (calculated in setup based on panel width)
let panelWidth;
let leftCenter;
let rightCenter;

// Vascular plant structure
let stemX, stemTop, stemBottom, stemWidth;
let xylemTubes = [];
let phloemTubes = [];

// Moss structure
let mossBaseY, mossStemX;
let mossLeaves = [];
let mossCapillaryPaths = [];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));

  // Controls
  addWaterButton = createButton('Add Water');
  addWaterButton.position(10, drawHeight + 8);
  addWaterButton.mousePressed(triggerRain);

  speedSlider = createSlider(1, 10, 3, 1);
  speedSlider.position(sliderLeftMargin, drawHeight + 8);
  speedSlider.size(canvasWidth - sliderLeftMargin - margin - 140);

  labelCheckbox = createCheckbox('Show Labels', true);
  labelCheckbox.position(canvasWidth - 130, drawHeight + 8);
  labelCheckbox.style('font-size', '14px');

  initPlantStructures();

  describe('Split-screen comparison of water transport in a vascular plant versus moss, showing internal xylem/phloem transport on the left and external capillary action on the right', LABEL);
}

function initPlantStructures() {
  panelWidth = canvasWidth / 2;
  leftCenter = panelWidth / 2;
  rightCenter = panelWidth + panelWidth / 2;

  // Vascular plant stem
  stemX = leftCenter;
  stemTop = 132;
  stemBottom = 340;
  stemWidth = 60;

  // Create xylem tubes (left side of stem)
  xylemTubes = [];
  for (let i = 0; i < 3; i++) {
    xylemTubes.push({
      x: stemX - stemWidth/2 + 10 + i * 10,
      top: stemTop,
      bottom: stemBottom
    });
  }

  // Create phloem tubes (right side of stem)
  phloemTubes = [];
  for (let i = 0; i < 3; i++) {
    phloemTubes.push({
      x: stemX + stemWidth/2 - 30 + i * 10,
      top: stemTop,
      bottom: stemBottom
    });
  }

  // Moss structure
  mossBaseY = 340;
  mossStemX = rightCenter;

  // Generate moss leaf positions (overlapping leaves along stem)
  mossLeaves = [];
  for (let ly = mossBaseY; ly > 140; ly -= 22) {
    let side = (mossLeaves.length % 2 === 0) ? -1 : 1;
    mossLeaves.push({
      x: mossStemX + side * 8,
      y: ly,
      side: side,
      len: 25 + random(-5, 5),
      angle: side * 0.4 + random(-0.1, 0.1)
    });
  }

  // Generate capillary paths along outside of moss stem and leaves
  mossCapillaryPaths = [];
  // Left side path
  for (let py = mossBaseY; py > 130; py -= 3) {
    let wobble = sin(py * 0.05) * 3;
    mossCapillaryPaths.push({
      x: mossStemX - 5 + wobble,
      y: py,
      side: -1
    });
  }
  // Right side path
  for (let py = mossBaseY; py > 130; py -= 3) {
    let wobble = sin(py * 0.05 + PI) * 3;
    mossCapillaryPaths.push({
      x: mossStemX + 5 + wobble,
      y: py,
      side: 1
    });
  }

  // Initialize some particles
  for (let i = 0; i < 8; i++) {
    addXylemParticle();
    addPhloemParticle();
    addCapillaryParticle();
  }
}

function triggerRain() {
  isRaining = true;
  rainTimer = 0;
}

function addXylemParticle() {
  let tube = random(xylemTubes);
  xylemParticles.push({
    x: tube.x + random(-2, 2),
    y: tube.bottom + random(0, 20),
    tubeX: tube.x,
    speed: random(0.5, 1.5),
    size: random(4, 7)
  });
}

function addPhloemParticle() {
  let tube = random(phloemTubes);
  phloemParticles.push({
    x: tube.x + random(-2, 2),
    y: tube.top + random(-10, 10),
    tubeX: tube.x,
    speed: random(0.4, 1.2),
    size: random(4, 6)
  });
}

function addCapillaryParticle() {
  let sideIndex = random() > 0.5 ? 0 : 1;
  let startIdx = sideIndex === 0 ? 0 : floor(mossCapillaryPaths.length / 2);
  capillaryParticles.push({
    pathProgress: 0,
    sideStart: startIdx,
    pathLen: floor(mossCapillaryPaths.length / 2),
    speed: random(0.3, 0.8),
    size: random(4, 7)
  });
}

function draw() {
  updateCanvasSize();

  let spd = speedSlider.value();
  let showLabels = labelCheckbox.checked();

  // Drawing area
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Divider line between panels
  stroke(180);
  strokeWeight(2);
  line(canvasWidth / 2, 35, canvasWidth / 2, drawHeight);

  panelWidth = canvasWidth / 2;
  leftCenter = panelWidth / 2;
  rightCenter = panelWidth + panelWidth / 2;

  // Update stem positions for responsive width
  stemX = leftCenter;
  mossStemX = rightCenter;

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(20);
  text('Water Transport Comparison', canvasWidth / 2, 8);

  // Panel subtitles
  textSize(16);
  fill('darkgreen');
  text('Vascular Plant', leftCenter, 45);
  fill('forestgreen');
  text('Moss', rightCenter, 45);

  // Draw height scales
  drawHeightScales(showLabels);

  // Draw vascular plant
  drawVascularPlant(showLabels);

  // Draw moss
  drawMoss(showLabels);

  // Update and draw rain
  if (isRaining) {
    rainTimer++;
    if (rainTimer < rainDuration) {
      // Add rain drops
      if (frameCount % 2 === 0) {
        rainDrops.push({ x: random(margin, canvasWidth - margin), y: 55, speed: random(4, 8) });
      }
    }
    if (rainTimer > rainDuration + 60) {
      isRaining = false;
    }
  }

  // Draw and update rain drops
  for (let i = rainDrops.length - 1; i >= 0; i--) {
    let drop = rainDrops[i];
    drop.y += drop.speed * spd * 0.5;
    fill(100, 150, 255, 180);
    noStroke();
    ellipse(drop.x, drop.y, 3, 8);
    if (drop.y > drawHeight - 60) {
      rainDrops.splice(i, 1);
    }
  }

  // Update xylem particles (moving UP)
  for (let i = xylemParticles.length - 1; i >= 0; i--) {
    let p = xylemParticles[i];
    p.y -= p.speed * spd * 0.3;
    p.x = p.tubeX + sin(p.y * 0.1) * 1.5;

    // Draw particle
    fill(30, 100, 220, 200);
    noStroke();
    ellipse(p.x, p.y, p.size);

    // Reset when reaching top
    if (p.y < stemTop - 10) {
      p.y = stemBottom + random(0, 30);
    }
  }

  // Update phloem particles (moving DOWN)
  for (let i = phloemParticles.length - 1; i >= 0; i--) {
    let p = phloemParticles[i];
    p.y += p.speed * spd * 0.25;
    p.x = p.tubeX + sin(p.y * 0.08) * 1.5;

    // Draw particle
    fill(50, 180, 50, 200);
    noStroke();
    ellipse(p.x, p.y, p.size);

    // Reset when reaching bottom
    if (p.y > stemBottom + 20) {
      p.y = stemTop - random(0, 20);
    }
  }

  // Update capillary particles (creeping UP along outside)
  for (let i = capillaryParticles.length - 1; i >= 0; i--) {
    let cp = capillaryParticles[i];
    cp.pathProgress += cp.speed * spd * 0.15;

    let idx = floor(cp.pathProgress) + cp.sideStart;
    if (idx >= cp.sideStart + cp.pathLen) {
      cp.pathProgress = 0;
      idx = cp.sideStart;
    }

    if (idx < mossCapillaryPaths.length) {
      let pt = mossCapillaryPaths[idx];
      // Offset for responsive width
      let offsetX = mossStemX - rightCenter;
      fill(30, 120, 230, 180);
      noStroke();
      ellipse(pt.x + (mossStemX - mossCapillaryPaths[0].x) * 0.02, pt.y, cp.size);
    }
  }

  // Add particles during rain
  if (isRaining && rainTimer < rainDuration && frameCount % 8 === 0) {
    addXylemParticle();
    addCapillaryParticle();
  }

  // Control labels
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Speed: ' + spd, 95, drawHeight + 20);
}

function drawVascularPlant(showLabels) {
  let plantLeft = stemX - stemWidth / 2;
  let plantRight = stemX + stemWidth / 2;

  // Roots at bottom
  stroke(139, 90, 43);
  strokeWeight(3);
  noFill();
  for (let i = -2; i <= 2; i++) {
    let rx = stemX + i * 12;
    let ry = stemBottom;
    bezier(rx, ry, rx + i * 8, ry + 25, rx + i * 15, ry + 35, rx + i * 20, ry + 50);
  }

  // Stem (cross-section style)
  fill(160, 120, 60);
  stroke(120, 80, 30);
  strokeWeight(2);
  rect(plantLeft, stemTop, stemWidth, stemBottom - stemTop, 5);

  // Outer bark layer
  fill(139, 100, 50, 80);
  noStroke();
  rect(plantLeft, stemTop, 6, stemBottom - stemTop);
  rect(plantRight - 6, stemTop, 6, stemBottom - stemTop);

  // Xylem tubes (blue)
  for (let tube of xylemTubes) {
    fill(100, 160, 230, 120);
    stroke(60, 120, 200);
    strokeWeight(1);
    rect(tube.x - 3, tube.top, 6, tube.bottom - tube.top);
  }

  // Phloem tubes (green)
  for (let tube of phloemTubes) {
    fill(120, 200, 120, 120);
    stroke(60, 160, 60);
    strokeWeight(1);
    rect(tube.x - 3, tube.top, 6, tube.bottom - tube.top);
  }

  // Leaves at top
  fill(34, 139, 34);
  stroke(20, 100, 20);
  strokeWeight(1);
  // Left leaf
  beginShape();
  vertex(stemX - 5, stemTop + 10);
  bezierVertex(stemX - 50, stemTop - 20, stemX - 60, stemTop - 40, stemX - 30, stemTop - 50);
  bezierVertex(stemX - 10, stemTop - 55, stemX - 5, stemTop - 20, stemX - 5, stemTop + 10);
  endShape(CLOSE);
  // Right leaf
  beginShape();
  vertex(stemX + 5, stemTop + 10);
  bezierVertex(stemX + 50, stemTop - 20, stemX + 60, stemTop - 40, stemX + 30, stemTop - 50);
  bezierVertex(stemX + 10, stemTop - 55, stemX + 5, stemTop - 20, stemX + 5, stemTop + 10);
  endShape(CLOSE);
  // Center leaf
  beginShape();
  vertex(stemX, stemTop + 5);
  bezierVertex(stemX - 15, stemTop - 30, stemX - 10, stemTop - 60, stemX, stemTop - 65);
  bezierVertex(stemX + 10, stemTop - 60, stemX + 15, stemTop - 30, stemX, stemTop + 5);
  endShape(CLOSE);

  // Labels
  if (showLabels) {
    fill(30, 80, 200);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(12);

    // Xylem label with arrow
    let labelX = plantLeft - 70;
    let labelY = stemTop + (stemBottom - stemTop) * 0.35;
    text('Xylem', labelX, labelY);
    text('(water up) ↑', labelX, labelY + 14);

    // Draw arrow line to xylem
    stroke(30, 80, 200);
    strokeWeight(1);
    line(labelX + 50, labelY, xylemTubes[0].x - 4, labelY);

    // Phloem label with arrow
    fill(40, 140, 40);
    noStroke();
    labelY = stemTop + (stemBottom - stemTop) * 0.65;
    let pLabelX = plantRight + 10;
    text('Phloem', pLabelX, labelY);
    text('(sugars down) ↓', pLabelX, labelY + 14);

    // Draw arrow line to phloem
    stroke(40, 140, 40);
    strokeWeight(1);
    line(phloemTubes[2].x + 4, labelY, pLabelX - 2, labelY);
  }
}

function drawMoss(showLabels) {
  // Ground / substrate
  fill(120, 90, 50);
  noStroke();
  rect(panelWidth + 20, mossBaseY + 10, panelWidth - 40, 30, 5);

  // Moss stem (thin, non-vascular)
  stroke(80, 140, 60);
  strokeWeight(4);
  line(mossStemX, mossBaseY, mossStemX, 130);

  // Moss leaves (overlapping, simple)
  for (let leaf of mossLeaves) {
    let lx = mossStemX + leaf.side * 2;
    let ly = leaf.y;

    push();
    translate(lx, ly);
    rotate(leaf.angle);

    fill(60, 160, 50, 180);
    stroke(40, 120, 30);
    strokeWeight(1);

    beginShape();
    vertex(0, 0);
    bezierVertex(leaf.side * leaf.len * 0.5, -8,
                 leaf.side * leaf.len * 0.8, -4,
                 leaf.side * leaf.len, 0);
    bezierVertex(leaf.side * leaf.len * 0.8, 4,
                 leaf.side * leaf.len * 0.5, 6,
                 0, 2);
    endShape(CLOSE);
    pop();
  }

  // Water film on surface (thin blue sheen)
  stroke(100, 170, 240, 80);
  strokeWeight(2);
  noFill();
  // Left side water film
  beginShape();
  noFill();
  for (let py = mossBaseY; py > 140; py -= 5) {
    let wx = mossStemX - 7 + sin(py * 0.06) * 3;
    vertex(wx, py);
  }
  endShape();
  // Right side water film
  beginShape();
  for (let py = mossBaseY; py > 140; py -= 5) {
    let wx = mossStemX + 7 + sin(py * 0.06 + PI) * 3;
    vertex(wx, py);
  }
  endShape();

  // Sporophyte at top
  stroke(140, 100, 50);
  strokeWeight(2);
  line(mossStemX, 130, mossStemX, 100);
  fill(140, 100, 40);
  noStroke();
  ellipse(mossStemX, 95, 10, 14);

  // Rhizoids at base (hair-like, not true roots)
  stroke(100, 80, 50);
  strokeWeight(1);
  for (let i = -3; i <= 3; i++) {
    let rx = mossStemX + i * 5;
    line(rx, mossBaseY + 5, rx + i * 3, mossBaseY + 20);
  }

  // Labels
  if (showLabels) {
    fill(30, 100, 200);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(12);

    // Capillary action label
    let labelX = mossStemX + 40;
    let labelY = 240;
    text('Capillary action', labelX, labelY);
    text('(external) ↑', labelX, labelY + 14);

    stroke(30, 100, 200);
    strokeWeight(1);
    line(mossStemX + 10, labelY, labelX - 2, labelY);

    // No internal plumbing label
    fill(150, 80, 30);
    noStroke();
    labelY = 300;
    text('No internal', labelX, labelY);
    text('plumbing', labelX, labelY + 14);

    stroke(150, 80, 30);
    strokeWeight(1);
    line(mossStemX + 3, labelY + 5, labelX - 2, labelY + 5);
  }
}

function drawHeightScales(showLabels) {
  if (!showLabels) return;

  // Left panel height scale
  let scaleX = margin;
  let scaleTop = 70;
  let scaleBottom = 370;

  stroke(100);
  strokeWeight(1);
  line(scaleX, scaleTop, scaleX, scaleBottom);
  // Ticks
  line(scaleX - 4, scaleTop, scaleX + 4, scaleTop);
  line(scaleX - 4, scaleBottom, scaleX + 4, scaleBottom);

  fill(80);
  noStroke();
  textSize(10);
  textAlign(CENTER, CENTER);

  push();
  translate(scaleX - 10, (scaleTop + scaleBottom) / 2);
  rotate(-HALF_PI);
  text('up to 100+ meters', 0, 0);
  pop();

  // Right panel height scale
  scaleX = panelWidth + margin;
  scaleTop = 130;
  scaleBottom = 350;

  stroke(100);
  strokeWeight(1);
  line(scaleX, scaleTop, scaleX, scaleBottom);
  line(scaleX - 4, scaleTop, scaleX + 4, scaleTop);
  line(scaleX - 4, scaleBottom, scaleX + 4, scaleBottom);

  fill(80);
  noStroke();
  textSize(10);
  textAlign(CENTER, CENTER);

  push();
  translate(scaleX - 10, (scaleTop + scaleBottom) / 2);
  rotate(-HALF_PI);
  text('1-10 cm', 0, 0);
  pop();
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  speedSlider.size(canvasWidth - sliderLeftMargin - margin - 140);
  labelCheckbox.position(canvasWidth - 130, drawHeight + 8);
  initPlantStructures();
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
