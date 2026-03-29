// Common Moss Types Gallery - Interactive gallery of common moss species
// MicroSim version 2026.03

let containerWidth;
let canvasWidth = 400;
let drawHeight = 450;
let controlHeight = 30;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 12;

let selectedMoss = -1;
let hoveredMoss = -1;

const mossTypes = [
  {
    name: "Sheet Moss",
    scientific: "Hypnum curvifolium",
    color: "#32CD32",
    form: "Pleurocarpous",
    desc: "Flat, carpet-like mats that spread horizontally. One of the most popular mosses for garden use. Thrives in shade on moist soil.",
    features: "Flat spreading habit, bright green, smooth texture"
  },
  {
    name: "Cushion Moss",
    scientific: "Leucobryum glaucum",
    color: "#B8D8B8",
    form: "Acrocarpous",
    desc: "Rounded, dome-shaped cushions with a distinctive pale whitish-green color. Holds water like a sponge. Grows on acidic soils.",
    features: "Dome shape, pale whitish-green, soft and spongy"
  },
  {
    name: "Haircap Moss",
    scientific: "Polytrichum commune",
    color: "#006400",
    form: "Acrocarpous",
    desc: "Tall upright stems resembling miniature fir trees. One of the tallest mosses. Produces distinctive hairy capsules on long stalks.",
    features: "Tall stems (up to 40cm), star-shaped tops, hairy capsules"
  },
  {
    name: "Rock Cap Moss",
    scientific: "Dicranum scoparium",
    color: "#2E8B57",
    form: "Acrocarpous",
    desc: "Forms emerald-green tufts with all leaves curving in one direction (wind-swept look). Common on rocks and tree bases.",
    features: "Leaves curve one direction, emerald green, dense tufts"
  },
  {
    name: "Sphagnum Moss",
    scientific: "Sphagnum spp.",
    color: "#8B4513",
    form: "Unique",
    desc: "Branching stems with star-shaped capitula. Can hold 20x its weight in water. Forms peat bogs. Mixed green and reddish tones.",
    features: "Star-shaped tips, red-green mix, huge water capacity"
  },
  {
    name: "Fern Moss",
    scientific: "Thuidium delicatulum",
    color: "#9ACD32",
    form: "Pleurocarpous",
    desc: "Delicate fern-like branching pattern. Feathery, triangular fronds. Excellent ground cover in shaded, moist woodlands.",
    features: "Fern-like branches, yellow-green, delicate texture"
  },
  {
    name: "Mood Moss",
    scientific: "Dicranum scoparium",
    color: "#32CD32",
    form: "Acrocarpous",
    desc: "Soft, fluffy bright green mounds. Popular in terrariums and floral design. Named for its lush, inviting appearance.",
    features: "Fluffy mounds, bright green, soft to touch"
  },
  {
    name: "Plume Moss",
    scientific: "Ptilium crista-castrensis",
    color: "#90EE90",
    form: "Pleurocarpous",
    desc: "Feathery, flowing plumes that resemble tiny ostrich feathers. Elegant spreading habit. Found in coniferous forests.",
    features: "Feathery plumes, pale green, flowing habit"
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
  text("Common Moss Types Gallery", canvasWidth / 2, 8);

  // 4x2 grid
  let cols = 4;
  let rows = 2;
  let gridW = canvasWidth - margin * 2;
  let cellW = gridW / cols;
  let cellH = 115;
  let topY = 38;

  hoveredMoss = -1;

  for (let i = 0; i < mossTypes.length; i++) {
    let r = Math.floor(i / cols);
    let c = i % cols;
    let cx = margin + c * cellW + cellW / 2;
    let cy = topY + r * (cellH + 6) + cellH / 2;

    if (mouseX > cx - cellW / 2 + 4 && mouseX < cx + cellW / 2 - 4 &&
        mouseY > cy - cellH / 2 + 4 && mouseY < cy + cellH / 2 - 4) {
      hoveredMoss = i;
    }

    let isSelected = (selectedMoss === i);
    let isHovered = (hoveredMoss === i);
    stroke(isSelected ? color(0, 100, 200) : isHovered ? color(100, 150, 200) : color(200));
    strokeWeight(isSelected ? 3 : isHovered ? 2 : 1);
    fill(isSelected ? color(230, 240, 255) : isHovered ? color(240, 245, 255) : 255);
    rect(cx - cellW / 2 + 4, cy - cellH / 2 + 4, cellW - 8, cellH - 8, 8);

    // Draw moss illustration
    drawMossType(i, cx, cy - 10, cellW * 0.55, cellH * 0.45);

    // Label
    noStroke();
    fill(40);
    textAlign(CENTER, BOTTOM);
    textSize(11);
    textStyle(BOLD);
    text(mossTypes[i].name, cx, cy + cellH / 2 - 6);
    textStyle(NORMAL);
  }

  // Info panel
  let infoY = topY + rows * (cellH + 6) + 8;
  let infoH = drawHeight - infoY - 5;
  if (selectedMoss >= 0) {
    let m = mossTypes[selectedMoss];
    fill(255, 255, 240);
    stroke(180);
    strokeWeight(1);
    rect(margin, infoY, canvasWidth - margin * 2, infoH, 6);

    noStroke();
    textAlign(LEFT, TOP);

    // Name and scientific
    fill(30);
    textSize(15);
    textStyle(BOLD);
    text(m.name, margin + 10, infoY + 8);
    textStyle(ITALIC);
    textSize(12);
    fill(100);
    text(m.scientific, margin + 10, infoY + 26);
    textStyle(NORMAL);

    // Form badge
    let badgeX = canvasWidth - margin - 120;
    fill(m.form === "Acrocarpous" ? color(46, 139, 87) : m.form === "Pleurocarpous" ? color(65, 105, 225) : color(139, 69, 19));
    rect(badgeX, infoY + 8, 110, 20, 10);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(11);
    text(m.form, badgeX + 55, infoY + 18);

    // Description
    textAlign(LEFT, TOP);
    fill(60);
    textSize(12);
    text(m.desc, margin + 10, infoY + 44, canvasWidth - margin * 2 - 20, 50);

    // Features
    fill(80, 100, 60);
    textSize(11);
    textStyle(BOLD);
    text("Key Features: ", margin + 10, infoY + 88);
    textStyle(NORMAL);
    fill(80);
    text(m.features, margin + 90, infoY + 88, canvasWidth - margin * 2 - 100, 30);
  } else {
    noStroke();
    fill(140);
    textAlign(CENTER, CENTER);
    textSize(14);
    text("Click a moss species above to see details", canvasWidth / 2, infoY + infoH / 2);
  }

  // Control area
  noStroke();
  fill(120);
  textAlign(CENTER, CENTER);
  textSize(11);
  text("Click any moss type to view species information", canvasWidth / 2, drawHeight + controlHeight / 2);
}

function drawMossType(idx, cx, cy, w, h) {
  let c = color(mossTypes[idx].color);
  let dark = lerpColor(c, color(0), 0.25);
  noStroke();

  switch (idx) {
    case 0: // Sheet Moss - flat carpet
      fill(c);
      rect(cx - w * 0.45, cy - h * 0.05, w * 0.9, h * 0.25, 4);
      for (let i = 0; i < 8; i++) {
        fill(lerpColor(c, dark, 0.1 + i * 0.02));
        ellipse(cx - w * 0.35 + i * w * 0.1, cy + h * 0.02, w * 0.12, h * 0.18);
      }
      break;

    case 1: // Cushion Moss - pale dome
      fill(c);
      ellipse(cx, cy, w * 0.7, h * 0.5);
      fill(lerpColor(c, color(255), 0.3));
      ellipse(cx - w * 0.05, cy - h * 0.05, w * 0.35, h * 0.2);
      break;

    case 2: // Haircap Moss - tall stems with stars
      for (let i = 0; i < 5; i++) {
        let sx = cx - w * 0.25 + i * w * 0.12;
        stroke(dark);
        strokeWeight(2);
        line(sx, cy + h * 0.2, sx, cy - h * 0.2);
        noStroke();
        fill(c);
        // Star top
        for (let a = 0; a < 5; a++) {
          let angle = a * TWO_PI / 5 - HALF_PI;
          triangle(sx, cy - h * 0.2,
                   sx + cos(angle) * w * 0.04, cy - h * 0.2 + sin(angle) * h * 0.08,
                   sx + cos(angle + 0.5) * w * 0.03, cy - h * 0.2 + sin(angle + 0.5) * h * 0.06);
        }
      }
      // Sporophyte on one
      stroke(150, 100, 50);
      strokeWeight(1);
      line(cx, cy - h * 0.2, cx + w * 0.03, cy - h * 0.4);
      noStroke();
      fill(150, 100, 50);
      ellipse(cx + w * 0.03, cy - h * 0.42, w * 0.06, h * 0.08);
      break;

    case 3: // Rock Cap Moss - tufts curving one way
      for (let i = 0; i < 7; i++) {
        let sx = cx - w * 0.3 + i * w * 0.1;
        stroke(dark);
        strokeWeight(1.5);
        noFill();
        beginShape();
        vertex(sx, cy + h * 0.15);
        bezierVertex(sx, cy, sx + w * 0.08, cy - h * 0.15, sx + w * 0.12, cy - h * 0.25);
        endShape();
      }
      noStroke();
      break;

    case 4: // Sphagnum - star capitula, red-green
      for (let i = 0; i < 5; i++) {
        let sx = cx - w * 0.25 + i * w * 0.12;
        stroke(lerpColor(c, color(50, 150, 50), 0.5));
        strokeWeight(1.5);
        line(sx, cy + h * 0.2, sx, cy - h * 0.1);
        noStroke();
        // Star capitulum
        fill(i % 2 === 0 ? color(139, 20, 20) : color(50, 180, 50));
        for (let a = 0; a < 5; a++) {
          let angle = a * TWO_PI / 5 - HALF_PI;
          ellipse(sx + cos(angle) * w * 0.03, cy - h * 0.15 + sin(angle) * h * 0.05, w * 0.04, h * 0.06);
        }
      }
      break;

    case 5: // Fern Moss - delicate fern-like branches
      stroke(lerpColor(c, dark, 0.1));
      strokeWeight(1.5);
      for (let i = 0; i < 4; i++) {
        let sx = cx - w * 0.2 + i * w * 0.15;
        line(sx, cy + h * 0.15, sx, cy - h * 0.2);
        for (let j = 0; j < 4; j++) {
          let by = cy + h * 0.05 - j * h * 0.08;
          line(sx, by, sx - w * 0.06, by + h * 0.04);
          line(sx, by, sx + w * 0.06, by + h * 0.04);
        }
      }
      noStroke();
      break;

    case 6: // Mood Moss - soft fluffy mounds
      fill(c);
      ellipse(cx - w * 0.15, cy, w * 0.35, h * 0.4);
      ellipse(cx + w * 0.12, cy - h * 0.05, w * 0.3, h * 0.35);
      ellipse(cx, cy + h * 0.05, w * 0.4, h * 0.35);
      fill(lerpColor(c, color(255), 0.2));
      ellipse(cx, cy - h * 0.05, w * 0.2, h * 0.15);
      break;

    case 7: // Plume Moss - feathery plumes
      for (let i = 0; i < 4; i++) {
        let sx = cx - w * 0.2 + i * w * 0.15;
        stroke(lerpColor(c, dark, 0.15));
        strokeWeight(1.5);
        noFill();
        beginShape();
        vertex(sx, cy + h * 0.15);
        bezierVertex(sx - w * 0.03, cy - h * 0.05, sx + w * 0.02, cy - h * 0.15, sx - w * 0.01, cy - h * 0.25);
        endShape();
        // Feathery side branches
        for (let j = 0; j < 5; j++) {
          let by = cy + h * 0.1 - j * h * 0.07;
          stroke(c);
          strokeWeight(0.8);
          line(sx, by, sx - w * 0.05, by + h * 0.02);
          line(sx, by, sx + w * 0.05, by + h * 0.02);
        }
      }
      noStroke();
      break;
  }
}

function mouseMoved() {
  redraw();
}

function mousePressed() {
  if (hoveredMoss >= 0) {
    selectedMoss = (selectedMoss === hoveredMoss) ? -1 : hoveredMoss;
    redraw();
  }
}
