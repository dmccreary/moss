// Primary Succession on Rock - Step-through stages
// MicroSim version 2026.03

let containerWidth;
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 15;

let currentStage = 0;
let prevBtn, nextBtn;

const stages = [
  {
    name: "Bare Rock",
    time: "0 years",
    desc: "Newly exposed rock surface after volcanic eruption, glacier retreat, or landslide. No soil, no life. Only minerals and weathering forces.",
    mossRole: "Not yet present. Physical weathering (freeze-thaw, wind, rain) slowly breaks down the rock surface."
  },
  {
    name: "Lichen Colonization",
    time: "0 - 10 years",
    desc: "Pioneer lichens arrive as spores carried by wind. They attach to bare rock and begin chemical weathering by producing acids that dissolve minerals.",
    mossRole: "Not yet present, but lichens are preparing the surface. Their acids create tiny crevices and the first traces of organic material when they die."
  },
  {
    name: "Moss Colonization",
    time: "10 - 50 years",
    desc: "Moss spores land in crevices created by lichens. Moss colonies establish, trapping dust and organic debris. A thin soil layer begins forming.",
    mossRole: "KEY ROLE: Moss accelerates soil formation by trapping particles, retaining water, and adding organic matter when it dies. Moss is the bridge between bare rock and soil."
  },
  {
    name: "Herbaceous Plants",
    time: "50 - 200 years",
    desc: "Grasses, ferns, and small herbs take root in the soil accumulated by moss. Root systems deepen and stabilize the growing soil layer.",
    mossRole: "Moss persists in shaded areas and continues to retain moisture and build soil. It provides a moist microhabitat for seeds to germinate."
  },
  {
    name: "Mature Community",
    time: "200+ years",
    desc: "Shrubs and eventually trees establish. A developed soil layer supports a complex ecosystem. The rock is now hidden beneath rich, living soil.",
    mossRole: "Moss thrives on the forest floor, tree bases, and fallen logs. It continues its role in water retention and nutrient cycling in the mature forest."
  }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  prevBtn = createButton('< Previous');
  prevBtn.position(margin, drawHeight + 8);
  prevBtn.mousePressed(() => { if (currentStage > 0) currentStage--; });
  prevBtn.style('padding', '5px 14px');
  prevBtn.style('border-radius', '4px');
  prevBtn.style('border', '2px solid #888');
  prevBtn.style('cursor', 'pointer');
  prevBtn.style('font-weight', 'bold');
  prevBtn.style('font-size', '13px');

  nextBtn = createButton('Next >');
  nextBtn.position(margin + 110, drawHeight + 8);
  nextBtn.mousePressed(() => { if (currentStage < stages.length - 1) currentStage++; });
  nextBtn.style('padding', '5px 14px');
  nextBtn.style('border-radius', '4px');
  nextBtn.style('border', '2px solid #388E3C');
  nextBtn.style('background', '#4CAF50');
  nextBtn.style('color', 'white');
  nextBtn.style('cursor', 'pointer');
  nextBtn.style('font-weight', 'bold');
  nextBtn.style('font-size', '13px');

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
}

function draw() {
  // Drawing region
  fill(240, 248, 255);
  noStroke();
  rect(0, 0, canvasWidth, drawHeight);

  // Title
  fill(30);
  textAlign(CENTER, TOP);
  textSize(18);
  textStyle(BOLD);
  text("Primary Succession: From Bare Rock to Forest", canvasWidth / 2, 8);
  textStyle(NORMAL);

  // Timeline bar
  let tlY = 34;
  let tlX = margin + 20;
  let tlW = canvasWidth - margin * 2 - 40;
  stroke(200);
  strokeWeight(3);
  line(tlX, tlY + 8, tlX + tlW, tlY + 8);

  for (let i = 0; i < stages.length; i++) {
    let x = tlX + (i / (stages.length - 1)) * tlW;
    let isActive = (i === currentStage);
    let isPast = (i < currentStage);

    fill(isActive ? color(76, 175, 80) : isPast ? color(139, 195, 74) : color(200));
    noStroke();
    ellipse(x, tlY + 8, isActive ? 18 : 12, isActive ? 18 : 12);

    if (isActive) {
      fill(255);
      textAlign(CENTER, CENTER);
      textSize(11);
      text(i + 1, x, tlY + 8);
    }
  }

  // Stage info
  let s = stages[currentStage];
  noStroke();
  fill(40);
  textAlign(LEFT, TOP);
  textSize(15);
  textStyle(BOLD);
  text("Stage " + (currentStage + 1) + ": " + s.name, margin, tlY + 28);
  textStyle(NORMAL);
  fill(100);
  textSize(12);
  text("Time: " + s.time, canvasWidth - margin - 120, tlY + 30);

  // Landscape scene
  let sceneY = tlY + 50;
  let sceneH = 160;
  drawLandscape(currentStage, margin, sceneY, canvasWidth - margin * 2, sceneH);

  // Description panel
  let descY = sceneY + sceneH + 10;
  fill(255, 255, 240);
  stroke(200);
  strokeWeight(1);
  rect(margin, descY, canvasWidth - margin * 2, drawHeight - descY - 5, 6);

  noStroke();
  fill(50);
  textAlign(LEFT, TOP);
  textSize(12);
  text(s.desc, margin + 10, descY + 8, canvasWidth - margin * 2 - 20, 40);

  // Moss role
  fill(34, 120, 34);
  textStyle(BOLD);
  textSize(11);
  text("Moss's Role:", margin + 10, descY + 52);
  textStyle(NORMAL);
  fill(60);
  text(s.mossRole, margin + 10, descY + 66, canvasWidth - margin * 2 - 20, 50);

  // Control region
  fill(255);
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);
  stroke(200);
  line(0, drawHeight, canvasWidth, drawHeight);

  // Stage counter
  noStroke();
  fill(100);
  textAlign(CENTER, CENTER);
  textSize(12);
  text("Stage " + (currentStage + 1) + " of " + stages.length, canvasWidth / 2, drawHeight + 18);
  fill(140);
  textSize(10);
  text("Navigate through succession stages to see moss's role in building ecosystems", canvasWidth / 2, drawHeight + 42);
}

function drawLandscape(stage, x, y, w, h) {
  // Sky
  fill(200, 220, 240);
  noStroke();
  rect(x, y, w, h * 0.5, 4, 4, 0, 0);

  // Ground level
  let groundY = y + h * 0.5;
  let groundH = h * 0.5;

  // Rock base (always present)
  fill(140, 135, 130);
  rect(x, groundY, w, groundH, 0, 0, 4, 4);
  // Rock texture
  fill(160, 155, 150);
  for (let i = 0; i < 10; i++) {
    let rx = x + (i * w / 10) + 5;
    let ry = groundY + groundH * 0.3 + (i % 3) * 8;
    ellipse(rx, ry, 30, 15);
  }

  if (stage >= 1) {
    // Lichens
    for (let i = 0; i < 15; i++) {
      let lx = x + random(10, w - 10);
      let ly = groundY + random(5, groundH * 0.4);
      fill(random() > 0.5 ? color(200, 160, 50, 180) : color(180, 140, 30, 180));
      ellipse(lx, ly, random(8, 18), random(5, 10));
    }
  }

  if (stage >= 2) {
    // Thin soil layer
    fill(120, 85, 55);
    rect(x, groundY - 5, w, 15);

    // Moss cushions
    for (let i = 0; i < 12; i++) {
      let mx = x + 15 + i * (w / 12);
      fill(50, random(140, 180), 50);
      ellipse(mx, groundY - 5, random(20, 35), random(10, 18));
    }
  }

  if (stage >= 3) {
    // Thicker soil
    fill(100, 70, 45);
    rect(x, groundY - 18, w, 28);
    fill(120, 85, 55);
    rect(x, groundY - 18, w, 10);

    // Moss still present
    for (let i = 0; i < 6; i++) {
      let mx = x + 10 + i * (w / 6);
      fill(50, 150, 50, 180);
      ellipse(mx, groundY - 18, 15, 8);
    }

    // Grasses and ferns
    stroke(60, 140, 40);
    strokeWeight(1.5);
    for (let i = 0; i < 15; i++) {
      let gx = x + 15 + i * (w / 15);
      let gh = random(20, 40);
      let sway = sin(gx * 0.05) * 5;
      line(gx, groundY - 18, gx + sway, groundY - 18 - gh);
      // Fern leaves
      if (i % 3 === 0) {
        line(gx + sway, groundY - 18 - gh, gx + sway - 6, groundY - 18 - gh + 5);
        line(gx + sway, groundY - 18 - gh, gx + sway + 6, groundY - 18 - gh + 5);
      }
    }
    noStroke();
  }

  if (stage >= 4) {
    // Deep soil
    fill(80, 55, 35);
    rect(x, groundY - 30, w, 40);
    fill(100, 70, 45);
    rect(x, groundY - 30, w, 15);

    // Trees
    for (let i = 0; i < 4; i++) {
      let tx = x + 40 + i * (w / 4);
      // Trunk
      fill(100, 70, 40);
      noStroke();
      rect(tx - 5, groundY - 80, 10, 55);
      // Canopy
      fill(40, random(110, 140), 40);
      ellipse(tx, groundY - 85, 50, 45);
      fill(50, random(130, 160), 50);
      ellipse(tx - 10, groundY - 78, 35, 30);
    }

    // Shrubs
    for (let i = 0; i < 6; i++) {
      let sx = x + 20 + i * (w / 6);
      fill(60, 130, 50);
      ellipse(sx, groundY - 35, 25, 20);
    }

    // Forest floor moss
    for (let i = 0; i < 8; i++) {
      let mx = x + 10 + i * (w / 8);
      fill(50, 160, 50, 150);
      ellipse(mx, groundY - 30, 18, 8);
    }
  }

  // Border
  noFill();
  stroke(180);
  strokeWeight(1);
  rect(x, y, w, h, 4);
}
