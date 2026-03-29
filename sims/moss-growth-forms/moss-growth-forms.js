// Moss Growth Forms - Visual guide showing different moss growth forms
// MicroSim version 2026.03

let containerWidth;
let canvasWidth = 400;
let drawHeight = 430;
let controlHeight = 30;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 15;

let selectedForm = -1;
let hoveredForm = -1;

const growthForms = [
  {
    name: "Cushion",
    color: "#32CD32",
    desc: "Dense, dome-shaped mounds. Grows upright (acrocarpous). Common on exposed rocks and walls. Retains water like a sponge.",
    example: "e.g., Leucobryum glaucum",
    habitat: "Rocks, walls, open ground"
  },
  {
    name: "Turf",
    color: "#228B22",
    desc: "Short, dense, upright stems forming a flat-topped lawn-like carpet. Acrocarpous growth. Stems packed tightly together.",
    example: "e.g., Polytrichum commune",
    habitat: "Soil, forest floors"
  },
  {
    name: "Mat",
    color: "#32CD32",
    desc: "Thin, flat, tightly woven carpet. Creeping stems (pleurocarpous) pressed close to the surface. Excellent ground cover.",
    example: "e.g., Hypnum cupressiforme",
    habitat: "Rocks, tree bark, soil"
  },
  {
    name: "Weft",
    color: "#9ACD32",
    desc: "Loose, fluffy interwoven carpet with visible individual stems. Pleurocarpous with loosely tangled branches.",
    example: "e.g., Thuidium delicatulum",
    habitat: "Logs, humus, shaded ground"
  },
  {
    name: "Pendant",
    color: "#90EE90",
    desc: "Long strands hanging downward from branches. Found in humid forests. Captures moisture from fog and mist.",
    example: "e.g., Meteorium (tropical)",
    habitat: "Tree branches in cloud forests"
  },
  {
    name: "Dendroid",
    color: "#2E8B57",
    desc: "Miniature tree shape with a distinct 'trunk' and 'crown' of branches. Upright with a tree-like branching pattern.",
    example: "e.g., Climacium dendroides",
    habitat: "Wet meadows, streambanks"
  },
  {
    name: "Fan",
    color: "#90EE90",
    desc: "Flattened, fan-shaped spray growing from a single point. Often found on vertical surfaces. Branches in one plane.",
    example: "e.g., Neckeropsis (tropical)",
    habitat: "Vertical rock faces, tree trunks"
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
  // Drawing region
  fill(240, 248, 255);
  noStroke();
  rect(0, 0, canvasWidth, drawHeight);

  // Control region
  fill(255);
  rect(0, drawHeight, canvasWidth, controlHeight);
  stroke(200);
  line(0, drawHeight, canvasWidth, drawHeight);

  // Title
  noStroke();
  fill(30);
  textAlign(CENTER, TOP);
  textSize(20);
  text("Moss Growth Forms", canvasWidth / 2, 10);

  // Grid layout: 4 top, 3 bottom
  let cols = 4;
  let cellW = (canvasWidth - margin * 2) / cols;
  let cellH = 150;
  let topY = 45;

  hoveredForm = -1;

  for (let i = 0; i < growthForms.length; i++) {
    let row = i < 4 ? 0 : 1;
    let col = i < 4 ? i : i - 4;
    let colsInRow = row === 0 ? 4 : 3;
    let rowCellW = (canvasWidth - margin * 2) / colsInRow;
    let offsetX = row === 1 ? (canvasWidth - margin * 2 - colsInRow * rowCellW) / 2 : 0;
    let cx = margin + offsetX + col * rowCellW + rowCellW / 2;
    let cy = topY + row * (cellH + 10) + cellH / 2;

    // Check hover
    if (mouseX > cx - rowCellW / 2 + 5 && mouseX < cx + rowCellW / 2 - 5 &&
        mouseY > cy - cellH / 2 + 5 && mouseY < cy + cellH / 2 - 5) {
      hoveredForm = i;
    }

    // Draw cell
    let isSelected = (selectedForm === i);
    let isHovered = (hoveredForm === i);
    stroke(isSelected ? color(0, 100, 200) : isHovered ? color(100, 150, 200) : color(200));
    strokeWeight(isSelected ? 3 : isHovered ? 2 : 1);
    fill(isSelected ? color(230, 240, 255) : isHovered ? color(240, 245, 255) : 255);
    rect(cx - rowCellW / 2 + 5, cy - cellH / 2 + 5, rowCellW - 10, cellH - 10, 8);

    // Draw growth form illustration
    drawGrowthForm(i, cx, cy - 15, rowCellW * 0.6, cellH * 0.5);

    // Label
    noStroke();
    fill(40);
    textAlign(CENTER, BOTTOM);
    textSize(13);
    text(growthForms[i].name, cx, cy + cellH / 2 - 10);
  }

  // Info panel at bottom
  let infoY = topY + 2 * (cellH + 10) + 5;
  if (selectedForm >= 0) {
    let gf = growthForms[selectedForm];
    fill(255, 255, 240);
    stroke(180);
    strokeWeight(1);
    rect(margin, infoY, canvasWidth - margin * 2, drawHeight - infoY - 10, 6);

    noStroke();
    fill(30);
    textAlign(LEFT, TOP);
    textSize(15);
    textStyle(BOLD);
    text(gf.name + " Form", margin + 10, infoY + 8);
    textStyle(NORMAL);
    textSize(12);
    fill(80);
    text(gf.desc, margin + 10, infoY + 28, canvasWidth - margin * 2 - 20, 60);
    fill(100, 60, 0);
    textStyle(ITALIC);
    text(gf.example + "  |  Habitat: " + gf.habitat, margin + 10, infoY + 75);
    textStyle(NORMAL);
  } else {
    noStroke();
    fill(140);
    textAlign(CENTER, CENTER);
    textSize(14);
    text("Click a growth form above to learn more", canvasWidth / 2, infoY + 30);
  }

  // Control area text
  noStroke();
  fill(120);
  textAlign(CENTER, CENTER);
  textSize(11);
  text("Click any growth form to see details. Hover to highlight.", canvasWidth / 2, drawHeight + controlHeight / 2);
}

function drawGrowthForm(idx, cx, cy, w, h) {
  let c = color(growthForms[idx].color);
  let dark = lerpColor(c, color(0), 0.3);
  noStroke();

  switch (idx) {
    case 0: // Cushion - dome
      fill(150);
      rect(cx - w / 2, cy + h * 0.2, w, h * 0.15, 2);
      for (let i = 0; i < 8; i++) {
        fill(lerpColor(c, dark, random(0, 0.3)));
        let bx = cx + random(-w * 0.3, w * 0.3);
        let by = cy + random(-h * 0.1, h * 0.15);
        ellipse(bx, by, w * 0.2, h * 0.25);
      }
      fill(c);
      ellipse(cx, cy, w * 0.7, h * 0.55);
      fill(lerpColor(c, color(255), 0.2));
      ellipse(cx - w * 0.05, cy - h * 0.05, w * 0.35, h * 0.25);
      break;

    case 1: // Turf - flat topped dense stems
      fill(139, 90, 43);
      rect(cx - w / 2, cy + h * 0.15, w, h * 0.2, 2);
      for (let i = 0; i < 20; i++) {
        let sx = cx - w * 0.4 + (i / 20) * w * 0.8;
        stroke(lerpColor(c, dark, random(0, 0.4)));
        strokeWeight(2);
        line(sx, cy + h * 0.15, sx + random(-2, 2), cy - h * 0.2 + random(-3, 3));
      }
      noStroke();
      fill(c);
      rect(cx - w * 0.4, cy - h * 0.22, w * 0.8, h * 0.08, 3);
      break;

    case 2: // Mat - thin flat carpet
      fill(150);
      rect(cx - w / 2, cy + h * 0.05, w, h * 0.2, 2);
      fill(c);
      rect(cx - w * 0.45, cy - h * 0.05, w * 0.9, h * 0.12, 4);
      fill(lerpColor(c, dark, 0.15));
      for (let i = 0; i < 6; i++) {
        let lx = cx - w * 0.35 + i * w * 0.13;
        ellipse(lx, cy, w * 0.1, h * 0.08);
      }
      break;

    case 3: // Weft - loose fluffy
      fill(139, 90, 43);
      ellipse(cx, cy + h * 0.2, w * 0.8, h * 0.15);
      for (let i = 0; i < 12; i++) {
        stroke(lerpColor(c, dark, random(0, 0.3)));
        strokeWeight(1.5);
        let sx = cx + random(-w * 0.3, w * 0.3);
        let sy = cy + random(-h * 0.1, h * 0.15);
        let angle = random(-PI / 4, PI / 4);
        let len = random(h * 0.15, h * 0.3);
        line(sx, sy, sx + cos(angle) * len, sy - sin(angle) * len);
      }
      noStroke();
      break;

    case 4: // Pendant - hanging strands
      fill(100, 70, 40);
      rect(cx - w * 0.4, cy - h * 0.35, w * 0.8, h * 0.1, 3);
      for (let i = 0; i < 7; i++) {
        stroke(lerpColor(c, dark, random(0, 0.3)));
        strokeWeight(2);
        noFill();
        let sx = cx - w * 0.3 + i * w * 0.1;
        beginShape();
        vertex(sx, cy - h * 0.25);
        bezierVertex(sx - 5, cy, sx + 5, cy + h * 0.1, sx + random(-8, 8), cy + h * 0.3);
        endShape();
      }
      noStroke();
      break;

    case 5: // Dendroid - miniature tree
      fill(139, 90, 43);
      rect(cx - w / 2, cy + h * 0.25, w, h * 0.1, 2);
      stroke(100, 70, 30);
      strokeWeight(3);
      line(cx, cy + h * 0.25, cx, cy - h * 0.1);
      noStroke();
      fill(c);
      ellipse(cx, cy - h * 0.15, w * 0.45, h * 0.35);
      fill(lerpColor(c, color(255), 0.15));
      ellipse(cx - w * 0.05, cy - h * 0.2, w * 0.2, h * 0.15);
      // Small side branches
      stroke(100, 70, 30);
      strokeWeight(1.5);
      line(cx, cy + h * 0.05, cx - w * 0.12, cy - h * 0.05);
      line(cx, cy + h * 0.05, cx + w * 0.12, cy - h * 0.05);
      noStroke();
      break;

    case 6: // Fan - flat fan shape
      fill(150);
      rect(cx - w * 0.05, cy, w * 0.1, h * 0.3);
      fill(c);
      arc(cx, cy, w * 0.7, h * 0.6, PI + 0.3, -0.3, PIE);
      fill(lerpColor(c, dark, 0.15));
      arc(cx, cy, w * 0.5, h * 0.4, PI + 0.5, -0.5, PIE);
      break;
  }
}

function mouseMoved() {
  redraw();
}

function mousePressed() {
  if (hoveredForm >= 0) {
    selectedForm = (selectedForm === hoveredForm) ? -1 : hoveredForm;
    redraw();
  }
}
