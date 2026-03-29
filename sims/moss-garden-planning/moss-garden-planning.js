// Moss Garden Planning Checklist - Interactive site assessment tool
// MicroSim version 2026.03

let containerWidth;
let canvasWidth = 400;
let drawHeight = 470;
let controlHeight = 30;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 12;

let resetBtn;

const sections = [
  {
    name: "Light",
    color: [255, 193, 7],
    items: ["Full shade", "Partial shade", "Dappled light", "Full sun"]
  },
  {
    name: "Moisture",
    color: [33, 150, 243],
    items: ["Naturally moist", "Average drainage", "Dry/fast-draining", "Near water source"]
  },
  {
    name: "Soil",
    color: [121, 85, 72],
    items: ["pH tested (5.0-6.0)", "pH needs adjustment", "Soil compacted", "Area cleared"]
  },
  {
    name: "Species",
    color: [76, 175, 80],
    items: ["Native species identified", "2+ species selected", "Starter material obtained"]
  },
  {
    name: "Preparation",
    color: [156, 39, 176],
    items: ["Grass removed", "Surface leveled", "Hardscape installed", "Irrigation planned"]
  }
];

let checked = {};
let hoveredItem = null;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  resetBtn = createButton('Reset All');
  resetBtn.position(canvasWidth - 90, drawHeight + 5);
  resetBtn.mousePressed(() => {
    checked = {};
  });
  resetBtn.style('padding', '4px 12px');
  resetBtn.style('border-radius', '4px');
  resetBtn.style('border', '2px solid #888');
  resetBtn.style('cursor', 'pointer');
  resetBtn.style('font-weight', 'bold');
  resetBtn.style('font-size', '12px');

  // Initialize all unchecked
  for (let s of sections) {
    for (let item of s.items) {
      checked[item] = false;
    }
  }

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
  resetBtn.position(canvasWidth - 90, drawHeight + 5);
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
  text("Moss Garden Planning Checklist", canvasWidth / 2, 8);
  textStyle(NORMAL);

  // Layout: checklist on left, gauge + recommendations on right
  let checkX = margin;
  let checkW = canvasWidth * 0.55;
  let rightX = checkX + checkW + 10;
  let rightW = canvasWidth - rightX - margin;
  let startY = 35;

  hoveredItem = null;

  // Draw sections
  let yPos = startY;
  for (let si = 0; si < sections.length; si++) {
    let s = sections[si];
    let secH = 18 + s.items.length * 22;

    // Section header
    fill(s.color[0], s.color[1], s.color[2]);
    noStroke();
    rect(checkX, yPos, checkW, 18, 4, 4, 0, 0);
    fill(255);
    textAlign(LEFT, CENTER);
    textSize(12);
    textStyle(BOLD);
    text(s.name, checkX + 8, yPos + 9);
    textStyle(NORMAL);

    // Items
    for (let ii = 0; ii < s.items.length; ii++) {
      let itemY = yPos + 20 + ii * 22;
      let item = s.items[ii];
      let isChecked = checked[item];
      let isHov = (mouseX >= checkX && mouseX <= checkX + checkW &&
                   mouseY >= itemY && mouseY < itemY + 20);
      if (isHov) hoveredItem = item;

      // Background
      fill(isHov ? 235 : 248);
      stroke(220);
      strokeWeight(0.5);
      rect(checkX, itemY, checkW, 20);

      // Checkbox
      let cbX = checkX + 10;
      let cbY = itemY + 3;
      stroke(150);
      strokeWeight(1);
      fill(isChecked ? color(76, 175, 80) : 255);
      rect(cbX, cbY, 14, 14, 2);
      if (isChecked) {
        stroke(255);
        strokeWeight(2);
        line(cbX + 3, cbY + 7, cbX + 6, cbY + 11);
        line(cbX + 6, cbY + 11, cbX + 11, cbY + 3);
      }

      // Label
      noStroke();
      fill(isChecked ? color(60, 120, 60) : 60);
      textAlign(LEFT, CENTER);
      textSize(11);
      text(item, cbX + 20, itemY + 10);
    }

    yPos += secH + 6;
  }

  // Calculate readiness
  let totalItems = 0;
  let checkedCount = 0;
  for (let key in checked) {
    totalItems++;
    if (checked[key]) checkedCount++;
  }
  let readiness = totalItems > 0 ? (checkedCount / totalItems) * 100 : 0;

  // Readiness gauge
  let gaugeY = startY;
  fill(255);
  stroke(200);
  strokeWeight(1);
  rect(rightX, gaugeY, rightW, 80, 6);

  noStroke();
  fill(40);
  textAlign(CENTER, TOP);
  textSize(13);
  textStyle(BOLD);
  text("Readiness Meter", rightX + rightW / 2, gaugeY + 6);
  textStyle(NORMAL);

  // Gauge bar
  let barX = rightX + 10;
  let barW = rightW - 20;
  let barY = gaugeY + 28;
  let barH = 20;
  fill(230);
  rect(barX, barY, barW, barH, 10);

  let gaugeColor = readiness < 40 ? color(244, 67, 54) : readiness < 70 ? color(255, 193, 7) : color(76, 175, 80);
  fill(gaugeColor);
  rect(barX, barY, barW * (readiness / 100), barH, 10);

  fill(30);
  textAlign(CENTER, CENTER);
  textSize(14);
  textStyle(BOLD);
  text(Math.round(readiness) + "%", rightX + rightW / 2, barY + barH / 2);
  textStyle(NORMAL);

  // Status label
  let statusText = readiness < 30 ? "Not Ready" : readiness < 60 ? "Needs Attention" : readiness < 85 ? "Almost Ready" : "Ready to Plant!";
  let statusColor = readiness < 40 ? color(244, 67, 54) : readiness < 70 ? color(255, 152, 0) : color(76, 175, 80);
  fill(statusColor);
  textSize(12);
  text(statusText, rightX + rightW / 2, gaugeY + 65);

  // Species recommendations
  let recY = gaugeY + 90;
  fill(255);
  stroke(200);
  strokeWeight(1);
  rect(rightX, recY, rightW, drawHeight - recY - 10, 6);

  noStroke();
  fill(40);
  textAlign(LEFT, TOP);
  textSize(12);
  textStyle(BOLD);
  text("Recommended Species", rightX + 8, recY + 8);
  textStyle(NORMAL);

  let recs = getRecommendations();
  textSize(11);
  for (let i = 0; i < recs.length; i++) {
    fill(50, 120, 50);
    text("\u2022 " + recs[i].name, rightX + 10, recY + 28 + i * 36);
    fill(100);
    textSize(10);
    text(recs[i].reason, rightX + 18, recY + 42 + i * 36, rightW - 26, 20);
    textSize(11);
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
  text("Click checkboxes to assess your garden site", canvasWidth / 2, drawHeight + controlHeight / 2);
}

function getRecommendations() {
  let recs = [];
  let hasShade = checked["Full shade"] || checked["Partial shade"] || checked["Dappled light"];
  let hasMoist = checked["Naturally moist"] || checked["Near water source"];
  let hasDry = checked["Dry/fast-draining"];
  let hasSun = checked["Full sun"];

  if (hasShade && hasMoist) {
    recs.push({ name: "Sheet Moss (Hypnum)", reason: "Thrives in moist shade, forms carpets" });
    recs.push({ name: "Fern Moss (Thuidium)", reason: "Loves humidity and shade" });
  }
  if (hasShade && !hasMoist) {
    recs.push({ name: "Mood Moss (Dicranum)", reason: "Tolerates drier shade conditions" });
    recs.push({ name: "Rock Cap Moss", reason: "Resilient in variable moisture" });
  }
  if (hasSun && hasDry) {
    recs.push({ name: "Haircap Moss (Polytrichum)", reason: "Most sun-tolerant moss species" });
  }
  if (hasMoist) {
    recs.push({ name: "Sphagnum Moss", reason: "Excellent for wet areas, holds water" });
  }
  if (recs.length === 0) {
    recs.push({ name: "Select conditions above", reason: "to see species recommendations" });
  }
  return recs.slice(0, 4);
}

function mousePressed() {
  // Check if a checkbox was clicked
  let checkX = margin;
  let checkW = canvasWidth * 0.55;
  let yPos = 35;

  for (let si = 0; si < sections.length; si++) {
    let s = sections[si];
    for (let ii = 0; ii < s.items.length; ii++) {
      let itemY = yPos + 20 + ii * 22;
      if (mouseX >= checkX && mouseX <= checkX + checkW &&
          mouseY >= itemY && mouseY < itemY + 20) {
        checked[s.items[ii]] = !checked[s.items[ii]];
        redraw();
        return;
      }
    }
    yPos += 18 + s.items.length * 22 + 6;
  }
}

function mouseMoved() {
  redraw();
}
