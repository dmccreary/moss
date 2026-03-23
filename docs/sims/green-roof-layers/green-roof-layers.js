// Green Roof Layer System - Cross-section diagram of green roof layers
// MicroSim version 2026.03

let containerWidth;
let canvasWidth = 400;
let drawHeight = 440;
let controlHeight = 30;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 15;

let hoveredLayer = -1;

const layers = [
  {
    name: "Moss Vegetation",
    yPct: 0.0, hPct: 0.12,
    color: [76, 175, 80],
    desc: "Living moss carpet on top. Mix of acrocarpous (cushion-forming) and pleurocarpous (mat-forming) species. Absorbs rainfall, provides evaporative cooling, insulates, and sequesters carbon.",
    weight: "5-15 kg/m\u00B2 saturated",
    function: "Primary vegetation. Requires no mowing, irrigation, or fertilizer."
  },
  {
    name: "Growing Substrate",
    yPct: 0.12, hPct: 0.17,
    color: [107, 66, 38],
    desc: "Lightweight growing medium: 60-80% mineral (expanded clay, pumice, crusite) and 20-40% organic (compost). 5-8 cm deep. pH 5.5-7.0 depending on moss species.",
    weight: "60-100 kg/m\u00B2 saturated",
    function: "Anchoring medium for moss. Stores moisture and provides minimal nutrients."
  },
  {
    name: "Filter Fabric",
    yPct: 0.29, hPct: 0.06,
    color: [224, 224, 224],
    desc: "Geotextile fabric that allows water to pass through while preventing fine substrate particles from clogging the drainage layer below.",
    weight: "0.2-0.5 kg/m\u00B2",
    function: "Separation layer. Keeps substrate out of drainage channels."
  },
  {
    name: "Drainage Mat",
    yPct: 0.35, hPct: 0.13,
    color: [91, 123, 138],
    desc: "Dimpled plastic mat or egg-crate drainage board. Creates channels for lateral water flow to roof drains. Dimple cups retain some water for dry periods.",
    weight: "2-5 kg/m\u00B2",
    function: "Removes excess water to prevent waterlogging. Some types retain water in cups."
  },
  {
    name: "Root Barrier",
    yPct: 0.48, hPct: 0.07,
    color: [74, 55, 40],
    desc: "Prevents root and rhizoid penetration into the waterproof membrane. Often a copper or polyethylene sheet. Sometimes integrated into the membrane itself.",
    weight: "0.5-1 kg/m\u00B2",
    function: "Protects the waterproof membrane from biological penetration."
  },
  {
    name: "Waterproof Membrane",
    yPct: 0.55, hPct: 0.08,
    color: [26, 26, 26],
    desc: "EPDM rubber or TPO membrane. The critical barrier protecting the building from moisture. Under a green roof, this membrane lasts 40-60 years (vs 20-25 years when exposed).",
    weight: "1-2 kg/m\u00B2",
    function: "Waterproofing. Green roof doubles membrane lifespan by blocking UV and temperature extremes."
  },
  {
    name: "Structural Roof Deck",
    yPct: 0.63, hPct: 0.37,
    color: [128, 128, 128],
    desc: "Reinforced concrete slab or steel deck. Must support 40-80 kg/m\u00B2 total saturated load for an extensive moss roof. Much lighter than intensive green roofs (150-500 kg/m\u00B2).",
    weight: "Structural support",
    function: "Load-bearing structure. Moss roofs are the lightest green roof type."
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
  text("Green Roof Layer System", canvasWidth / 2, 8);
  textStyle(NORMAL);
  textSize(11);
  fill(100);
  text("Extensive moss green roof cross-section", canvasWidth / 2, 28);

  // Layout
  let crossX = margin;
  let crossW = canvasWidth * 0.5;
  let crossY = 48;
  let crossH = drawHeight - 60;
  let infoX = crossX + crossW + 20;
  let infoW = canvasWidth - infoX - margin;

  hoveredLayer = -1;

  // Sky above
  fill(135, 206, 235, 100);
  noStroke();
  rect(crossX, crossY, crossW, crossH * 0.03);

  // Rain drops
  stroke(100, 170, 240);
  strokeWeight(1.5);
  for (let i = 0; i < 8; i++) {
    let rx = crossX + 15 + i * (crossW / 8);
    line(rx, crossY - 8, rx - 2, crossY + 4);
  }

  // Draw layers
  for (let i = 0; i < layers.length; i++) {
    let l = layers[i];
    let ly = crossY + l.yPct * crossH;
    let lh = l.hPct * crossH;

    // Check hover
    if (mouseX >= crossX && mouseX <= crossX + crossW && mouseY >= ly && mouseY < ly + lh) {
      hoveredLayer = i;
    }

    let isHovered = (hoveredLayer === i);

    fill(l.color[0], l.color[1], l.color[2], isHovered ? 255 : 200);
    stroke(isHovered ? color(0, 100, 200) : color(180));
    strokeWeight(isHovered ? 2.5 : 0.5);
    rect(crossX, ly, crossW, lh);

    // Texture
    noStroke();
    drawRoofLayerTexture(i, crossX, ly, crossW, lh);

    // Label line to right
    let labelX = crossX + crossW + 5;
    let labelY = ly + lh / 2;
    stroke(isHovered ? 50 : 160);
    strokeWeight(isHovered ? 1.5 : 0.5);
    line(crossX + crossW, labelY, labelX + 3, labelY);

    noStroke();
    fill(isHovered ? 0 : 80);
    textAlign(LEFT, CENTER);
    textSize(isHovered ? 11 : 10);
    textStyle(isHovered ? BOLD : NORMAL);
    text(l.name, labelX + 6, labelY);
  }
  textStyle(NORMAL);

  // Water flow arrow (blue, downward on left side)
  let arrowX = crossX - 12;
  stroke(70, 150, 230);
  strokeWeight(2);
  fill(70, 150, 230);
  line(arrowX, crossY + 10, arrowX, crossY + crossH * 0.45);
  triangle(arrowX, crossY + crossH * 0.47, arrowX - 4, crossY + crossH * 0.43, arrowX + 4, crossY + crossH * 0.43);

  // Heat arrow (red, upward)
  stroke(230, 80, 50);
  fill(230, 80, 50);
  line(arrowX - 15, crossY + crossH * 0.5, arrowX - 15, crossY + 15);
  triangle(arrowX - 15, crossY + 13, arrowX - 19, crossY + 19, arrowX - 11, crossY + 19);

  noStroke();
  fill(70, 150, 230);
  textSize(8);
  push();
  translate(arrowX + 2, crossY + crossH * 0.25);
  rotate(-HALF_PI);
  textAlign(CENTER);
  text("water", 0, 0);
  pop();
  fill(230, 80, 50);
  push();
  translate(arrowX - 13, crossY + crossH * 0.3);
  rotate(-HALF_PI);
  textAlign(CENTER);
  text("heat blocked", 0, 0);
  pop();

  // Info panel
  if (hoveredLayer >= 0) {
    let l = layers[hoveredLayer];
    fill(255, 255, 240);
    stroke(200);
    strokeWeight(1);
    rect(infoX, crossY + crossH * 0.35, infoW, 240, 8);

    noStroke();
    fill(l.color[0], l.color[1], l.color[2]);
    rect(infoX + 8, crossY + crossH * 0.35 + 10, 8, 25, 4);

    fill(30);
    textAlign(LEFT, TOP);
    textSize(15);
    textStyle(BOLD);
    text(l.name, infoX + 22, crossY + crossH * 0.35 + 12);
    textStyle(NORMAL);

    fill(100);
    textSize(11);
    text("Weight: " + l.weight, infoX + 22, crossY + crossH * 0.35 + 32);

    fill(50);
    textSize(12);
    text(l.desc, infoX + 8, crossY + crossH * 0.35 + 52, infoW - 16, 100);

    fill(34, 120, 34);
    textStyle(BOLD);
    textSize(11);
    text("Function:", infoX + 8, crossY + crossH * 0.35 + 160);
    textStyle(NORMAL);
    fill(60);
    text(l.function, infoX + 8, crossY + crossH * 0.35 + 176, infoW - 16, 50);
  } else {
    // Benefits summary when nothing is hovered
    fill(255, 255, 240);
    stroke(200);
    strokeWeight(1);
    rect(infoX, crossY + crossH * 0.35, infoW, 200, 8);

    noStroke();
    fill(40);
    textAlign(LEFT, TOP);
    textSize(13);
    textStyle(BOLD);
    text("Moss Green Roof Benefits", infoX + 8, crossY + crossH * 0.35 + 10);
    textStyle(NORMAL);
    textSize(11);
    fill(60);
    let benefits = [
      "Absorbs 50-80% of rainfall",
      "Reduces cooling costs 25%",
      "Doubles membrane lifespan",
      "Lightest green roof type",
      "No mowing or irrigation",
      "Sequesters carbon"
    ];
    for (let i = 0; i < benefits.length; i++) {
      fill(76, 175, 80);
      text("\u2713", infoX + 10, crossY + crossH * 0.35 + 34 + i * 22);
      fill(60);
      text(benefits[i], infoX + 24, crossY + crossH * 0.35 + 34 + i * 22);
    }

    fill(140);
    textAlign(CENTER, BOTTOM);
    textSize(11);
    text("Hover layers for details", infoX + infoW / 2, crossY + crossH * 0.35 + 195);
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
  text("Hover over each layer to learn its function in the green roof system", canvasWidth / 2, drawHeight + controlHeight / 2);
}

function drawRoofLayerTexture(idx, x, y, w, h) {
  switch (idx) {
    case 0: // Moss vegetation - bumpy green
      fill(60, 190, 60, 120);
      for (let i = 0; i < 20; i++) {
        let mx = x + 5 + i * (w / 20);
        ellipse(mx, y + 4, 10, 6);
      }
      // Some cushion types
      fill(46, 145, 50, 150);
      for (let i = 0; i < 5; i++) {
        ellipse(x + 20 + i * (w / 5), y + h * 0.5, 18, h * 0.5);
      }
      break;
    case 1: // Substrate - perlite specks
      fill(240, 240, 240, 100);
      for (let i = 0; i < 15; i++) {
        ellipse(x + (i * 43 + 12) % int(w), y + (i * 17 + 5) % int(h), 4, 4);
      }
      break;
    case 2: // Filter fabric - weave pattern
      stroke(200, 200, 200, 80);
      strokeWeight(0.5);
      for (let i = 0; i < 30; i++) {
        let fx = x + i * (w / 30);
        line(fx, y, fx, y + h);
      }
      noStroke();
      break;
    case 3: // Drainage mat - dimples
      fill(70, 100, 120, 100);
      for (let i = 0; i < 12; i++) {
        let dx = x + 8 + i * (w / 12);
        let dy = y + h * 0.4;
        arc(dx, dy, 14, h * 0.6, 0, PI);
      }
      // Water in dimples
      fill(100, 180, 240, 80);
      for (let i = 0; i < 6; i++) {
        let dx = x + 8 + i * 2 * (w / 12);
        ellipse(dx, y + h * 0.65, 8, 4);
      }
      break;
    case 4: // Root barrier
      stroke(90, 70, 55, 80);
      strokeWeight(0.5);
      for (let i = 0; i < 20; i++) {
        line(x + i * (w / 20), y, x + i * (w / 20), y + h);
      }
      noStroke();
      break;
    case 5: // Waterproof membrane
      fill(40, 40, 40, 60);
      rect(x + 2, y + 1, w - 4, h - 2);
      break;
    case 6: // Structural deck - rebar pattern
      stroke(100, 100, 100, 60);
      strokeWeight(1.5);
      for (let i = 0; i < 8; i++) {
        let ry = y + 15 + i * (h / 8);
        line(x + 10, ry, x + w - 10, ry);
      }
      for (let i = 0; i < 15; i++) {
        let rx = x + 10 + i * (w / 15);
        line(rx, y + 10, rx, y + h - 10);
      }
      noStroke();
      break;
  }
}

function mouseMoved() {
  redraw();
}
