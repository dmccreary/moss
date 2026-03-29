// Mossarium Substrate Cross-Section - Labeled horizontal layers with hover
// MicroSim version 2026.03

let containerWidth;
let canvasWidth = 400;
let drawHeight = 430;
let controlHeight = 30;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 15;

let hoveredLayer = -1;

const layers = [
  {
    name: "Living Moss",
    yPct: 0.0, hPct: 0.18,
    colors: [[76, 175, 80], [46, 125, 50]],
    desc: "Living moss species arranged on the soil surface. Press gently to ensure good contact with the substrate. Use 2-3 species for visual variety.",
    thickness: "1-2 cm",
    purpose: "The living display layer. Photosynthesizes, retains moisture, and creates the miniature landscape."
  },
  {
    name: "Soil Mix",
    yPct: 0.18, hPct: 0.28,
    colors: [[92, 64, 51], [80, 55, 40]],
    desc: "Acidic soil mix of peat moss, perlite, coarse sand, and garden soil. pH should be 5.0-6.0. Provides the growing surface for moss.",
    thickness: "2-3 cm",
    purpose: "Provides nutrients and anchoring surface. The acidic pH matches moss's preference."
  },
  {
    name: "Activated Charcoal",
    yPct: 0.46, hPct: 0.1,
    colors: [[44, 44, 44], [35, 35, 35]],
    desc: "A thin layer of activated charcoal granules. Filters toxins, absorbs odors, and prevents bacterial and fungal buildup in the closed system.",
    thickness: "0.5-1 cm",
    purpose: "Acts as a water purifier. Keeps the mossarium fresh and prevents stale smells."
  },
  {
    name: "Drainage Layer",
    yPct: 0.56, hPct: 0.25,
    colors: [[160, 160, 160], [128, 128, 128]],
    desc: "Rounded pebbles or gravel of varying sizes. Excess water collects here, preventing the soil from becoming waterlogged.",
    thickness: "2-3 cm",
    purpose: "Prevents root rot and waterlogging. Water pools here and slowly evaporates back upward."
  },
  {
    name: "Glass Container",
    yPct: 0.81, hPct: 0.19,
    colors: [[220, 235, 245], [200, 220, 235]],
    desc: "Clear glass jar (apothecary or mason jar style). Allows light in and creates a humid microclimate. The enclosed system recycles water vapor.",
    thickness: "Container walls",
    purpose: "Creates a self-sustaining terrarium ecosystem. Condensation on glass walls recycles moisture."
  }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textFont('Arial');
  noLoop();
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
  redraw();
}

function draw() {
  background(240, 248, 255);

  // Title
  noStroke();
  fill(30);
  textAlign(CENTER, TOP);
  textSize(18);
  textStyle(BOLD);
  text("Mossarium Substrate Layers", canvasWidth / 2, 8);
  textStyle(NORMAL);

  // Layout
  let jarX = margin + 30;
  let jarW = canvasWidth * 0.42;
  let jarY = 45;
  let jarH = drawHeight - 65;
  let infoX = jarX + jarW + 30;
  let infoW = canvasWidth - infoX - margin;

  hoveredLayer = -1;

  // Draw jar outline (glass container)
  stroke(180, 200, 220);
  strokeWeight(3);
  noFill();
  // Jar body
  rect(jarX, jarY + jarH * 0.05, jarW, jarH * 0.85, 8, 8, 15, 15);
  // Jar neck
  let neckW = jarW * 0.5;
  let neckX = jarX + (jarW - neckW) / 2;
  rect(neckX, jarY, neckW, jarH * 0.08, 5, 5, 0, 0);

  // Draw layers inside jar
  let layerStartY = jarY + jarH * 0.08;
  let layerTotalH = jarH * 0.82;

  for (let i = 0; i < layers.length - 1; i++) { // Skip glass container layer for drawing
    let l = layers[i];
    let ly = layerStartY + l.yPct * layerTotalH;
    let lh = l.hPct * layerTotalH;

    // Check hover
    if (mouseX >= jarX && mouseX <= jarX + jarW && mouseY >= ly && mouseY < ly + lh) {
      hoveredLayer = i;
    }

    let isHovered = (hoveredLayer === i);

    // Draw layer fill
    fill(l.colors[0][0], l.colors[0][1], l.colors[0][2], isHovered ? 255 : 200);
    stroke(isHovered ? color(0, 100, 200) : color(200, 210, 220));
    strokeWeight(isHovered ? 2 : 0.5);
    rect(jarX + 2, ly, jarW - 4, lh);

    // Layer details
    noStroke();
    drawLayerTexture(i, jarX + 2, ly, jarW - 4, lh);

    // Label
    fill(isHovered ? 0 : 255);
    textAlign(CENTER, CENTER);
    textSize(isHovered ? 13 : 12);
    textStyle(isHovered ? BOLD : NORMAL);
    // Use dark text on light layers, white on dark
    if (i === 0 || i === 3) fill(isHovered ? 0 : 40);
    else if (i === 2) fill(isHovered ? 255 : 220);
    text(l.name, jarX + jarW / 2, ly + lh / 2);
    textStyle(NORMAL);
  }

  // Check hover on glass container area (outside layers)
  if (mouseX >= jarX && mouseX <= jarX + jarW &&
      ((mouseY >= jarY && mouseY < layerStartY) ||
       (mouseY >= layerStartY + layers[3].yPct * layerTotalH + layers[3].hPct * layerTotalH && mouseY <= jarY + jarH))) {
    hoveredLayer = 4;
  }

  // Water cycle arrows
  stroke(70, 150, 230);
  strokeWeight(1.5);
  fill(70, 150, 230);
  // Drip down arrow
  let arrowX1 = jarX - 15;
  line(arrowX1, layerStartY + 20, arrowX1, layerStartY + layerTotalH * 0.7);
  triangle(arrowX1, layerStartY + layerTotalH * 0.72, arrowX1 - 4, layerStartY + layerTotalH * 0.68, arrowX1 + 4, layerStartY + layerTotalH * 0.68);
  // Evaporate up arrow
  let arrowX2 = jarX - 25;
  line(arrowX2, layerStartY + layerTotalH * 0.6, arrowX2, layerStartY + 10);
  triangle(arrowX2, layerStartY + 8, arrowX2 - 4, layerStartY + 14, arrowX2 + 4, layerStartY + 14);

  noStroke();
  fill(70, 150, 230);
  textSize(9);
  push();
  translate(arrowX1 - 2, layerStartY + layerTotalH * 0.4);
  rotate(-HALF_PI);
  textAlign(CENTER, CENTER);
  text("drains", 0, 0);
  pop();
  push();
  translate(arrowX2 - 2, layerStartY + layerTotalH * 0.3);
  rotate(-HALF_PI);
  textAlign(CENTER, CENTER);
  text("evaporates", 0, 0);
  pop();

  // Info panel
  if (hoveredLayer >= 0) {
    let l = layers[hoveredLayer];
    fill(255, 255, 240);
    stroke(200);
    strokeWeight(1);
    rect(infoX, jarY + 20, infoW, 280, 8);

    noStroke();
    // Color indicator
    fill(l.colors[0][0], l.colors[0][1], l.colors[0][2]);
    rect(infoX + 10, jarY + 30, 8, 30, 4);

    fill(30);
    textAlign(LEFT, TOP);
    textSize(16);
    textStyle(BOLD);
    text(l.name, infoX + 25, jarY + 32);
    textStyle(NORMAL);

    // Thickness
    fill(100);
    textSize(12);
    text("Thickness: " + l.thickness, infoX + 25, jarY + 54);

    // Description
    fill(50);
    textSize(12);
    text(l.desc, infoX + 10, jarY + 78, infoW - 20, 100);

    // Purpose
    fill(34, 120, 34);
    textSize(12);
    textStyle(BOLD);
    text("Purpose:", infoX + 10, jarY + 180);
    textStyle(NORMAL);
    fill(60);
    text(l.purpose, infoX + 10, jarY + 198, infoW - 20, 80);
  } else {
    fill(150);
    textAlign(CENTER, CENTER);
    textSize(13);
    text("Hover over a layer\nto learn about\neach substrate", infoX + infoW / 2, jarY + jarH / 2);
  }

  // Control region
  fill(255);
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);
  stroke(200);
  line(0, drawHeight, canvasWidth, drawHeight);
  noStroke();
  fill(120);
  textAlign(CENTER, CENTER);
  textSize(11);
  text("Hover over each layer to learn its purpose in the mossarium", canvasWidth / 2, drawHeight + controlHeight / 2);
}

function drawLayerTexture(idx, x, y, w, h) {
  switch (idx) {
    case 0: // Moss - bumpy green surface
      for (let i = 0; i < 15; i++) {
        let mx = x + 10 + i * (w / 15);
        fill(60, 180 + (i % 3) * 15, 60, 150);
        ellipse(mx, y + 5, 12, 8);
      }
      break;
    case 1: // Soil - perlite specks
      fill(240, 240, 240, 120);
      for (let i = 0; i < 20; i++) {
        let px = x + (i * 37 + 11) % int(w);
        let py = y + (i * 23 + 7) % int(h);
        ellipse(px, py, 4, 4);
      }
      break;
    case 2: // Charcoal - granules
      fill(55, 55, 55, 100);
      for (let i = 0; i < 25; i++) {
        let gx = x + (i * 29 + 5) % int(w);
        let gy = y + (i * 13 + 3) % int(h);
        rect(gx, gy, 5, 4, 1);
      }
      break;
    case 3: // Drainage - pebbles
      for (let i = 0; i < 18; i++) {
        let c = (i % 3 === 0) ? color(196, 168, 130, 150) : color(176, 176, 176, 120);
        fill(c);
        let px = x + (i * 41 + 8) % int(w);
        let py = y + (i * 29 + 10) % int(h);
        ellipse(px, py, 14 + (i % 4) * 3, 10 + (i % 3) * 2);
      }
      // Water droplets
      fill(100, 170, 240, 100);
      for (let i = 0; i < 6; i++) {
        let wx = x + (i * 53 + 20) % int(w);
        let wy = y + h - 8 - (i % 3) * 5;
        ellipse(wx, wy, 5, 6);
      }
      break;
  }
}

function mouseMoved() {
  redraw();
}
