// Seasonal Moss Care Calendar - Interactive circular calendar
// MicroSim version 2026.03

let containerWidth;
let canvasWidth = 400;
let drawHeight = 470;
let controlHeight = 30;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 12;

let selectedMonth = -1;
let hoveredMonth = -1;
let climateZone = 0;

const climateZones = ["Humid Continental", "Humid Subtropical", "Oceanic", "Mediterranean"];

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const fullMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const seasonColors = [
  [100, 150, 200], // Winter - cool blue (Dec, Jan, Feb)
  [100, 150, 200],
  [144, 202, 119], // Spring - light green (Mar, Apr, May)
  [144, 202, 119],
  [144, 202, 119],
  [34, 120, 34],   // Summer - deep green (Jun, Jul, Aug)
  [34, 120, 34],
  [34, 120, 34],
  [210, 170, 80],  // Autumn - golden (Sep, Oct, Nov)
  [210, 170, 80],
  [210, 170, 80],
  [100, 150, 200]  // Winter
];

// Tasks by month (index 0-11). Varies slightly by climate zone but core tasks are the same.
const monthTasks = [
  { tasks: ["Monitor for frost heave", "Avoid walking on frozen moss", "Plan spring planting"], season: "Winter" },
  { tasks: ["Check for winter damage", "Remove fallen debris gently", "Order moss starter material"], season: "Winter" },
  { tasks: ["Begin new plantings", "Clear leaf litter", "Test soil pH", "Start regular misting"], season: "Spring" },
  { tasks: ["Plant new moss patches", "Increase watering frequency", "Press down lifted edges", "Weed removal"], season: "Spring" },
  { tasks: ["Monitor moisture levels", "Continue weed removal", "Fragment and spread to fill gaps"], season: "Spring" },
  { tasks: ["Water deeply in heat", "Provide shade if needed", "Watch for browning edges"], season: "Summer" },
  { tasks: ["Peak watering season", "Early morning misting", "Check for algae growth", "Remove competing plants"], season: "Summer" },
  { tasks: ["Continue watering", "Reduce foot traffic", "Check for pest damage"], season: "Summer" },
  { tasks: ["Reduce watering gradually", "Plant fall moss patches", "Remove fallen leaves promptly"], season: "Autumn" },
  { tasks: ["Clear autumn leaves daily", "Final planting window", "Apply buttermilk slurry to bare spots"], season: "Autumn" },
  { tasks: ["Last leaf cleanup", "Prepare for winter dormancy", "Reduce watering"], season: "Autumn" },
  { tasks: ["Allow natural dormancy", "Minimize disturbance", "Enjoy snow-covered moss garden"], season: "Winter" }
];

let zoneBtn;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  zoneBtn = createButton(climateZones[0]);
  zoneBtn.position(margin, drawHeight + 5);
  zoneBtn.mousePressed(() => {
    climateZone = (climateZone + 1) % climateZones.length;
    zoneBtn.html(climateZones[climateZone]);
  });
  zoneBtn.style('padding', '4px 10px');
  zoneBtn.style('border-radius', '4px');
  zoneBtn.style('border', '2px solid #666');
  zoneBtn.style('cursor', 'pointer');
  zoneBtn.style('font-size', '11px');
  zoneBtn.style('font-weight', 'bold');

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
  text("Seasonal Moss Care Calendar", canvasWidth / 2, 8);
  textStyle(NORMAL);

  // Circular calendar
  let cx = canvasWidth * 0.35;
  let cy = 210;
  let outerR = 140;
  let innerR = 55;

  hoveredMonth = -1;

  // Draw month segments
  for (let i = 0; i < 12; i++) {
    let startAngle = (i * TWO_PI / 12) - HALF_PI;
    let endAngle = ((i + 1) * TWO_PI / 12) - HALF_PI;
    let midAngle = (startAngle + endAngle) / 2;

    // Check hover
    let dx = mouseX - cx;
    let dy = mouseY - cy;
    let dist2 = sqrt(dx * dx + dy * dy);
    let angle = atan2(dy, dx);
    if (angle < -HALF_PI) angle += TWO_PI;
    let normAngle = angle + HALF_PI;
    if (normAngle < 0) normAngle += TWO_PI;
    if (normAngle >= TWO_PI) normAngle -= TWO_PI;
    let segStart = i * TWO_PI / 12;
    let segEnd = (i + 1) * TWO_PI / 12;
    if (dist2 >= innerR && dist2 <= outerR && normAngle >= segStart && normAngle < segEnd) {
      hoveredMonth = i;
    }

    let sc = seasonColors[i];
    let isSelected = (selectedMonth === i);
    let isHovered = (hoveredMonth === i);
    let alpha = isSelected ? 255 : isHovered ? 230 : 180;

    fill(sc[0], sc[1], sc[2], alpha);
    stroke(isSelected ? color(0, 80, 160) : 255);
    strokeWeight(isSelected ? 3 : 1.5);
    arc(cx, cy, outerR * 2, outerR * 2, startAngle, endAngle, PIE);
  }

  // Inner circle (center)
  fill(240, 248, 255);
  stroke(200);
  strokeWeight(1);
  ellipse(cx, cy, innerR * 2, innerR * 2);

  // Center moss illustration (changes by selected month season)
  drawCenterMoss(cx, cy, innerR, selectedMonth >= 0 ? selectedMonth : 5);

  // Month labels
  noStroke();
  for (let i = 0; i < 12; i++) {
    let midAngle = ((i + 0.5) * TWO_PI / 12) - HALF_PI;
    let labelR = (outerR + innerR) / 2;
    let lx = cx + cos(midAngle) * labelR;
    let ly = cy + sin(midAngle) * labelR;

    fill(selectedMonth === i ? 255 : hoveredMonth === i ? 40 : 60);
    textAlign(CENTER, CENTER);
    textSize(11);
    textStyle(selectedMonth === i ? BOLD : NORMAL);
    text(monthNames[i], lx, ly);
  }
  textStyle(NORMAL);

  // Season labels around outside
  let seasonLabels = [
    { name: "Winter", angle: -HALF_PI, color: [80, 120, 170] },
    { name: "Spring", angle: 0, color: [80, 140, 60] },
    { name: "Summer", angle: HALF_PI, color: [20, 90, 20] },
    { name: "Autumn", angle: PI, color: [170, 130, 40] }
  ];

  for (let sl of seasonLabels) {
    let sx = cx + cos(sl.angle) * (outerR + 18);
    let sy = cy + sin(sl.angle) * (outerR + 18);
    fill(sl.color[0], sl.color[1], sl.color[2]);
    textAlign(CENTER, CENTER);
    textSize(10);
    textStyle(BOLD);
    text(sl.name, sx, sy);
  }
  textStyle(NORMAL);

  // Info panel on the right
  let infoX = canvasWidth * 0.62;
  let infoW = canvasWidth - infoX - margin;
  let infoY = 40;

  if (selectedMonth >= 0) {
    let mt = monthTasks[selectedMonth];
    fill(255, 255, 240);
    stroke(200);
    strokeWeight(1);
    rect(infoX, infoY, infoW, 330, 6);

    noStroke();
    fill(seasonColors[selectedMonth][0], seasonColors[selectedMonth][1], seasonColors[selectedMonth][2]);
    rect(infoX, infoY, infoW, 30, 6, 6, 0, 0);

    fill(255);
    textAlign(CENTER, CENTER);
    textSize(14);
    textStyle(BOLD);
    text(fullMonths[selectedMonth], infoX + infoW / 2, infoY + 15);
    textStyle(NORMAL);

    // Season badge
    fill(255, 255, 255, 180);
    rect(infoX + 8, infoY + 36, 60, 18, 9);
    fill(80);
    textAlign(LEFT, CENTER);
    textSize(10);
    text(mt.season, infoX + 16, infoY + 45);

    // Tasks
    fill(40);
    textAlign(LEFT, TOP);
    textSize(13);
    textStyle(BOLD);
    text("Care Tasks:", infoX + 10, infoY + 62);
    textStyle(NORMAL);
    textSize(12);

    for (let i = 0; i < mt.tasks.length; i++) {
      fill(76, 175, 80);
      ellipse(infoX + 18, infoY + 86 + i * 28, 6, 6);
      fill(50);
      text(mt.tasks[i], infoX + 28, infoY + 80 + i * 28, infoW - 40, 24);
    }

    // Climate zone note
    fill(100);
    textSize(10);
    textStyle(ITALIC);
    text("Zone: " + climateZones[climateZone], infoX + 10, infoY + 300);
    textStyle(NORMAL);
  } else {
    fill(255, 255, 240);
    stroke(200);
    strokeWeight(1);
    rect(infoX, infoY, infoW, 200, 6);

    noStroke();
    fill(140);
    textAlign(CENTER, CENTER);
    textSize(13);
    text("Click a month\non the calendar\nto see care tasks", infoX + infoW / 2, infoY + 100);
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
  text("Click month segments. Button changes climate zone.", canvasWidth / 2, drawHeight + controlHeight / 2);
}

function drawCenterMoss(cx, cy, r, month) {
  noStroke();
  // Seasonal appearance
  if (month >= 2 && month <= 4) {
    // Spring - lush green
    fill(80, 200, 80);
  } else if (month >= 5 && month <= 7) {
    // Summer - deep green
    fill(34, 140, 34);
  } else if (month >= 8 && month <= 10) {
    // Autumn - bronze/golden
    fill(160, 140, 60);
  } else {
    // Winter - dormant brownish
    fill(120, 110, 80);
  }

  // Simple moss mound
  ellipse(cx, cy + 5, r * 1.2, r * 0.7);
  // Lighter highlights
  let c2 = month >= 2 && month <= 7 ? color(120, 220, 100, 150) : color(150, 140, 100, 100);
  fill(c2);
  ellipse(cx - 5, cy, r * 0.6, r * 0.35);
}

function mousePressed() {
  if (hoveredMonth >= 0) {
    selectedMonth = (selectedMonth === hoveredMonth) ? -1 : hoveredMonth;
    redraw();
  }
}

function mouseMoved() {
  redraw();
}
