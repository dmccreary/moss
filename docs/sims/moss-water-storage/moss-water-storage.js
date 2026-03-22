// Moss Water Absorption and Storage - Cross-section showing how moss stores water
// MicroSim version 2026.03

let containerWidth;
let canvasWidth = 400;
let drawHeight = 430;
let controlHeight = 30;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 15;

let hoveredRegion = -1;

const regions = [
  {
    name: "Rain Interception",
    yPct: 0.05, hPct: 0.1,
    color: [135, 206, 250],
    desc: "Raindrops are intercepted by the moss canopy before reaching the soil. A dense moss carpet can intercept 100% of light rainfall."
  },
  {
    name: "Leaf Surface Film",
    yPct: 0.15, hPct: 0.12,
    color: [80, 180, 80],
    desc: "A thin film of water clings to the outer surface of each tiny moss leaf by adhesion. This surface tension holds water externally."
  },
  {
    name: "Capillary Channels",
    yPct: 0.27, hPct: 0.13,
    color: [60, 160, 60],
    desc: "Narrow spaces between overlapping leaves create capillary channels. Water is drawn upward and held between leaves by capillary action."
  },
  {
    name: "Stem Transport Zone",
    yPct: 0.40, hPct: 0.12,
    color: [45, 130, 45],
    desc: "Water moves between densely packed stems via external capillary forces. Unlike vascular plants, moss has no internal plumbing."
  },
  {
    name: "Cell Vacuoles",
    yPct: 0.52, hPct: 0.11,
    color: [100, 180, 220],
    desc: "Inside each moss cell, a large central vacuole stores water. Cells can lose most of this water during drought and refill when wetted."
  },
  {
    name: "Cell Wall Absorption",
    yPct: 0.63, hPct: 0.11,
    color: [140, 200, 160],
    desc: "Cellulose cell walls act like tiny sponges, absorbing and holding water within their fibrous matrix."
  },
  {
    name: "Intercellular Water",
    yPct: 0.74, hPct: 0.1,
    color: [120, 190, 220],
    desc: "Spaces between cells fill with water. This reservoir provides a buffer that moss draws upon as conditions dry."
  },
  {
    name: "Hyaline Cells (Sphagnum)",
    yPct: 0.84, hPct: 0.11,
    color: [180, 210, 240],
    desc: "Sphagnum moss has specialized large, hollow hyaline cells with pores. These can hold 20x the moss's dry weight in water - nature's super sponge!"
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
  text("How Moss Stores Water", canvasWidth / 2, 8);
  textStyle(NORMAL);
  textSize(12);
  fill(100);
  text("Cross-section from canopy to cellular level", canvasWidth / 2, 30);

  // Main diagram area
  let diagramX = margin;
  let diagramW = canvasWidth * 0.5;
  let diagramY = 50;
  let diagramH = drawHeight - 70;

  // Info panel area
  let infoX = diagramX + diagramW + 15;
  let infoW = canvasWidth - infoX - margin;

  hoveredRegion = -1;

  // Draw layers
  for (let i = 0; i < regions.length; i++) {
    let r = regions[i];
    let y = diagramY + r.yPct * diagramH;
    let h = r.hPct * diagramH;

    // Check hover
    if (mouseX >= diagramX && mouseX <= diagramX + diagramW &&
        mouseY >= y && mouseY < y + h) {
      hoveredRegion = i;
    }

    let isHovered = (hoveredRegion === i);

    // Layer background
    fill(r.color[0], r.color[1], r.color[2], isHovered ? 240 : 180);
    stroke(isHovered ? color(0, 100, 200) : color(180));
    strokeWeight(isHovered ? 2 : 0.5);
    rect(diagramX, y, diagramW, h);

    // Layer decorations
    noStroke();
    drawLayerDetail(i, diagramX, y, diagramW, h);

    // Layer label
    fill(isHovered ? 0 : 50);
    textAlign(LEFT, CENTER);
    textSize(isHovered ? 12 : 11);
    textStyle(isHovered ? BOLD : NORMAL);
    text(r.name, diagramX + 8, y + h / 2);
    textStyle(NORMAL);
  }

  // Blue water arrows on left side
  let arrowX = diagramX - 5;
  stroke(50, 120, 220);
  strokeWeight(2);
  fill(50, 120, 220);
  // Downward arrow
  line(arrowX - 15, diagramY + 20, arrowX - 15, diagramY + diagramH * 0.6);
  triangle(arrowX - 15, diagramY + diagramH * 0.62, arrowX - 20, diagramY + diagramH * 0.58, arrowX - 10, diagramY + diagramH * 0.58);
  // Upward arrow (capillary)
  line(arrowX - 30, diagramY + diagramH * 0.55, arrowX - 30, diagramY + diagramH * 0.2);
  triangle(arrowX - 30, diagramY + diagramH * 0.18, arrowX - 35, diagramY + diagramH * 0.22, arrowX - 25, diagramY + diagramH * 0.22);

  noStroke();
  fill(50, 120, 220);
  textSize(9);
  textAlign(CENTER, CENTER);
  push();
  translate(arrowX - 15, diagramY + diagramH * 0.35);
  rotate(-HALF_PI);
  text("gravity", 0, 0);
  pop();
  push();
  translate(arrowX - 30, diagramY + diagramH * 0.38);
  rotate(-HALF_PI);
  text("capillary", 0, 0);
  pop();

  // Scale labels
  noStroke();
  fill(100);
  textAlign(CENTER, TOP);
  textSize(10);
  let scaleX = diagramX + diagramW + 5;
  text("Colony", scaleX, diagramY + diagramH * 0.05);
  text("Plant", scaleX, diagramY + diagramH * 0.35);
  text("Cell", scaleX, diagramY + diagramH * 0.6);
  text("Sphagnum", scaleX, diagramY + diagramH * 0.85);

  // Info panel
  if (hoveredRegion >= 0) {
    let r = regions[hoveredRegion];
    fill(255, 255, 240);
    stroke(180);
    strokeWeight(1);
    rect(infoX, diagramY + 30, infoW, 150, 8);

    noStroke();
    fill(r.color[0], r.color[1], r.color[2]);
    rect(infoX + 8, diagramY + 38, 6, 25, 3);

    fill(30);
    textAlign(LEFT, TOP);
    textSize(14);
    textStyle(BOLD);
    text(r.name, infoX + 20, diagramY + 40);
    textStyle(NORMAL);
    textSize(12);
    fill(60);
    text(r.desc, infoX + 10, diagramY + 62, infoW - 20, 110);
  } else {
    fill(150);
    textAlign(CENTER, CENTER);
    textSize(13);
    text("Hover over a layer\nto learn more", infoX + infoW / 2, diagramY + 100);
  }

  // Water capacity comparison at bottom of info panel
  fill(255, 255, 255, 220);
  stroke(200);
  strokeWeight(1);
  rect(infoX, diagramY + 200, infoW, 100, 6);
  noStroke();
  fill(40);
  textAlign(LEFT, TOP);
  textSize(12);
  textStyle(BOLD);
  text("Water Holding Capacity", infoX + 10, diagramY + 208);
  textStyle(NORMAL);
  textSize(11);
  fill(80);
  let facts = [
    "Regular moss: 8-10x dry weight",
    "Sphagnum: up to 20x dry weight",
    "No roots needed!",
    "Absorbs via entire surface"
  ];
  for (let i = 0; i < facts.length; i++) {
    fill(50, 120, 50);
    text("\u2022 ", infoX + 12, diagramY + 226 + i * 18);
    fill(60);
    text(facts[i], infoX + 22, diagramY + 226 + i * 18);
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
  text("Hover over layers to explore how moss absorbs and stores water at every scale", canvasWidth / 2, drawHeight + controlHeight / 2);
}

function drawLayerDetail(idx, x, y, w, h) {
  // Add visual details to each layer
  switch (idx) {
    case 0: // Rain
      fill(100, 150, 255, 120);
      for (let i = 0; i < 6; i++) {
        let dx = x + w * 0.5 + i * w * 0.07;
        ellipse(dx, y + h * 0.4 + i * 2, 3, 6);
      }
      break;
    case 1: // Leaf surface
      fill(40, 140, 40, 80);
      for (let i = 0; i < 8; i++) {
        let lx = x + w * 0.6 + i * 12;
        ellipse(lx, y + h / 2, 10, h * 0.5);
      }
      break;
    case 2: // Capillary
      stroke(80, 160, 220, 100);
      strokeWeight(1);
      for (let i = 0; i < 5; i++) {
        let cx2 = x + w * 0.6 + i * 15;
        line(cx2, y, cx2, y + h);
      }
      noStroke();
      break;
    case 3: // Stems
      stroke(30, 100, 30, 80);
      strokeWeight(2);
      for (let i = 0; i < 6; i++) {
        let sx = x + w * 0.55 + i * 18;
        line(sx, y, sx, y + h);
      }
      noStroke();
      break;
    case 4: // Vacuoles
      fill(80, 160, 220, 100);
      for (let i = 0; i < 4; i++) {
        ellipse(x + w * 0.6 + i * 22, y + h / 2, 16, h * 0.6);
      }
      break;
    case 5: // Cell walls
      stroke(100, 170, 120, 100);
      strokeWeight(1);
      for (let i = 0; i < 5; i++) {
        rect(x + w * 0.55 + i * 20, y + 2, 16, h - 4, 2);
      }
      noStroke();
      break;
    case 6: // Intercellular
      fill(90, 170, 220, 80);
      for (let i = 0; i < 6; i++) {
        ellipse(x + w * 0.6 + i * 15, y + h / 2, 8, 8);
      }
      break;
    case 7: // Hyaline
      fill(160, 200, 240, 100);
      for (let i = 0; i < 3; i++) {
        let hx = x + w * 0.6 + i * 28;
        rect(hx, y + 3, 22, h - 6, 4);
        // Pores
        fill(100, 160, 220, 120);
        ellipse(hx + 5, y + h * 0.3, 4, 4);
        ellipse(hx + 15, y + h * 0.6, 4, 4);
        fill(160, 200, 240, 100);
      }
      break;
  }
}

function mouseMoved() {
  redraw();
}
