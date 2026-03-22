// Complete Moss Life Cycle
// Alternation of generations: step-through 10-stage circular diagram
// MicroSim version 2026.03

let containerWidth;
let canvasWidth = 400;
let drawHeight = 430;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 10;

let currentStage = 0;
let isPlaying = false;
let playTimer = 0;
let prevBtn, nextBtn, playBtn, speedSlider;

const stageData = [
    {
        name: 'Spore',
        ploidy: 'Haploid (n)',
        generation: 'Gametophyte',
        desc: 'A tiny golden spore lands on moist soil. This single haploid cell contains all the genetic information needed to grow a new moss plant. GAMETOPHYTE GENERATION begins.',
        color: [200, 170, 50],
        icon: 'spore'
    },
    {
        name: 'Protonema',
        ploidy: 'Haploid (n)',
        generation: 'Gametophyte',
        desc: 'The spore germinates into a protonema — a green branching filament that looks like algae. Still haploid, grown entirely by mitosis. It spreads across the substrate.',
        color: [120, 180, 80],
        icon: 'protonema'
    },
    {
        name: 'Gametophyte Bud',
        ploidy: 'Haploid (n)',
        generation: 'Gametophyte',
        desc: 'Buds develop from the protonema, growing into upright shoots. Each bud will become a leafy gametophyte plant.',
        color: [80, 160, 60],
        icon: 'bud'
    },
    {
        name: 'Mature Gametophyte',
        ploidy: 'Haploid (n)',
        generation: 'Gametophyte',
        desc: 'The fully grown gametophyte produces reproductive organs: antheridia (male, producing sperm) and archegonia (female, producing eggs). Both are haploid (n).',
        color: [50, 140, 50],
        icon: 'gametophyte'
    },
    {
        name: 'Sperm Swimming',
        ploidy: 'Haploid (n)',
        generation: 'Gametophyte',
        desc: 'Sperm cells swim through a water film on the moss surface toward the archegonium. Water is essential — without it, fertilization cannot occur.',
        color: [60, 120, 200],
        icon: 'sperm'
    },
    {
        name: 'Fertilization',
        ploidy: 'n + n = 2n',
        generation: 'Transition',
        desc: 'A sperm cell (n) fuses with the egg (n) inside the archegonium to form a diploid zygote (2n). SPOROPHYTE GENERATION begins here.',
        color: [180, 100, 180],
        icon: 'fertilization'
    },
    {
        name: 'Young Sporophyte',
        ploidy: 'Diploid (2n)',
        generation: 'Sporophyte',
        desc: 'The zygote divides by mitosis to grow into a young sporophyte. It remains attached to and dependent on the gametophyte for nutrition.',
        color: [160, 120, 60],
        icon: 'young_sporo'
    },
    {
        name: 'Mature Sporophyte',
        ploidy: 'Diploid (2n)',
        generation: 'Sporophyte',
        desc: 'The sporophyte grows a foot (anchor), seta (stalk), and capsule (sporangium) at the top. It is fully formed and ready for spore production.',
        color: [140, 100, 50],
        icon: 'mature_sporo'
    },
    {
        name: 'Meiosis',
        ploidy: '2n → n',
        generation: 'Sporophyte',
        desc: 'Inside the capsule, spore mother cells (2n) undergo MEIOSIS, producing haploid spores (n). This halves the chromosome number.',
        color: [180, 80, 80],
        icon: 'meiosis'
    },
    {
        name: 'Spore Release',
        ploidy: 'Haploid (n)',
        generation: 'Gametophyte (restart)',
        desc: 'The capsule opens, and haploid spores disperse on the wind. Each spore can start the cycle anew. The cycle restarts!',
        color: [210, 180, 60],
        icon: 'release'
    }
];

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    prevBtn = createButton('◀ Previous');
    prevBtn.position(10, drawHeight + 10);
    prevBtn.mousePressed(() => { currentStage = (currentStage - 1 + 10) % 10; isPlaying = false; });
    styleBtn(prevBtn, '#666');

    nextBtn = createButton('Next ▶');
    nextBtn.position(110, drawHeight + 10);
    nextBtn.mousePressed(() => { currentStage = (currentStage + 1) % 10; isPlaying = false; });
    styleBtn(nextBtn, '#4caf50');

    playBtn = createButton('▶ Auto');
    playBtn.position(200, drawHeight + 10);
    playBtn.mousePressed(() => { isPlaying = !isPlaying; });
    styleBtn(playBtn, '#2196f3');

    speedSlider = createSlider(1, 10, 4, 1);
    speedSlider.position(canvasWidth - 130, drawHeight + 14);
    speedSlider.size(80);

    describe('Interactive step-through diagram of the complete moss life cycle showing alternation of generations', LABEL);
}

function styleBtn(btn, col) {
    btn.style('padding', '5px 10px');
    btn.style('border-radius', '4px');
    btn.style('border', '2px solid ' + col);
    btn.style('background', col);
    btn.style('color', 'white');
    btn.style('font-weight', 'bold');
    btn.style('cursor', 'pointer');
    btn.style('font-size', '12px');
}

function draw() {
    updateCanvasSize();

    // Auto-play
    if (isPlaying) {
        playTimer++;
        let interval = map(speedSlider.value(), 1, 10, 90, 20);
        if (playTimer > interval) {
            playTimer = 0;
            currentStage = (currentStage + 1) % 10;
        }
        playBtn.html('⏸ Pause');
    } else {
        playBtn.html('▶ Auto');
    }

    // Drawing area
    fill('aliceblue');
    stroke('silver');
    strokeWeight(1);
    rect(0, 0, canvasWidth, drawHeight);

    // Control area
    fill('white');
    stroke('silver');
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Title
    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(18);
    text('Moss Life Cycle', canvasWidth / 2, 6);

    // Circular diagram
    let cx = canvasWidth * 0.38;
    let cy = 210;
    let radius = min(canvasWidth * 0.28, 140);

    // Draw generation arcs
    // Gametophyte arc (stages 0-4, green)
    noFill();
    stroke(76, 175, 80, 60);
    strokeWeight(radius * 0.7);
    let startAngle = -HALF_PI + TWO_PI * 0 / 10 - TWO_PI / 20;
    let endAngle = -HALF_PI + TWO_PI * 5 / 10 - TWO_PI / 20;
    arc(cx, cy, radius * 2.1, radius * 2.1, startAngle, endAngle);

    // Sporophyte arc (stages 6-9, brown)
    stroke(160, 120, 60, 60);
    startAngle = -HALF_PI + TWO_PI * 5.5 / 10 - TWO_PI / 20;
    endAngle = -HALF_PI + TWO_PI * 10 / 10 - TWO_PI / 20;
    arc(cx, cy, radius * 2.1, radius * 2.1, startAngle, endAngle);

    // Generation labels
    noStroke();
    fill(40, 100, 40, 150);
    textSize(10);
    textAlign(CENTER, CENTER);
    text('GAMETOPHYTE (n)', cx - radius * 0.5, cy - radius * 0.15);
    fill(120, 80, 30, 150);
    text('SPOROPHYTE (2n)', cx + radius * 0.4, cy + radius * 0.2);

    // Draw stage nodes
    for (let i = 0; i < 10; i++) {
        let angle = -HALF_PI + TWO_PI * i / 10;
        let nx = cx + cos(angle) * radius;
        let ny = cy + sin(angle) * radius;
        let stage = stageData[i];
        let isActive = (i === currentStage);

        // Arrow to next stage
        let nextAngle = -HALF_PI + TWO_PI * ((i + 1) % 10) / 10;
        let nnx = cx + cos(nextAngle) * radius;
        let nny = cy + sin(nextAngle) * radius;

        // Draw connecting arrow
        let midAngle = (angle + nextAngle) / 2;
        if (i === 9) midAngle = angle + (TWO_PI + nextAngle - angle) / 2;
        stroke(150);
        strokeWeight(1.5);
        let arrowMid = 0.5;
        let ax = lerp(nx, nnx, arrowMid);
        let ay = lerp(ny, nny, arrowMid);
        line(nx + cos(angle) * 2, ny + sin(angle) * 2, nnx - cos(nextAngle) * 14, nny - sin(nextAngle) * 14);

        // Node circle
        let nodeR = isActive ? 18 : 12;
        fill(stage.color[0], stage.color[1], stage.color[2], isActive ? 255 : 160);
        stroke(stage.color[0] - 30, stage.color[1] - 30, stage.color[2] - 30);
        strokeWeight(isActive ? 3 : 1);
        ellipse(nx, ny, nodeR * 2);

        // Stage number
        fill(255);
        noStroke();
        textSize(isActive ? 12 : 9);
        textAlign(CENTER, CENTER);
        text(i + 1, nx, ny);

        // Stage name label
        let labelDist = radius + (isActive ? 28 : 22);
        let lx = cx + cos(angle) * labelDist;
        let ly = cy + sin(angle) * labelDist;
        fill(isActive ? 0 : 120);
        textSize(isActive ? 10 : 8);
        textStyle(isActive ? BOLD : NORMAL);
        text(stage.name, lx, ly);
        textStyle(NORMAL);
    }

    // Info panel on right
    let infoX = canvasWidth * 0.68;
    let infoY = 35;
    let infoW = canvasWidth - infoX - 8;
    let infoH = drawHeight - infoY - 10;

    fill(255, 255, 255, 240);
    stroke(180);
    strokeWeight(1);
    rect(infoX, infoY, infoW, infoH, 6);

    let stage = stageData[currentStage];
    noStroke();

    // Stage title
    fill(stage.color[0], stage.color[1], stage.color[2]);
    textSize(14);
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    text('Stage ' + (currentStage + 1) + ': ' + stage.name, infoX + 8, infoY + 8, infoW - 16);
    textStyle(NORMAL);

    // Ploidy badge
    let badgeY = infoY + 30;
    let isHaploid = stage.generation.includes('Gametophyte');
    fill(isHaploid ? color(76, 175, 80) : color(160, 120, 60));
    rect(infoX + 8, badgeY, infoW - 16, 20, 3);
    fill(255);
    textSize(10);
    textAlign(CENTER, CENTER);
    text(stage.ploidy, infoX + infoW / 2, badgeY + 10);

    // Generation
    let genY = badgeY + 26;
    fill(100);
    textSize(11);
    textAlign(LEFT, TOP);
    text('Generation: ' + stage.generation, infoX + 8, genY);

    // Description
    fill(50);
    textSize(11);
    textWrap(WORD);
    text(stage.desc, infoX + 8, genY + 20, infoW - 16);

    // Draw mini illustration
    drawStageIcon(infoX + infoW / 2, infoY + infoH - 60, stage.icon, 40);

    // Speed label
    fill(80);
    textSize(10);
    textAlign(RIGHT, CENTER);
    noStroke();
    text('Speed: ' + speedSlider.value(), canvasWidth - 135, drawHeight + 25);
}

function drawStageIcon(cx, cy, iconType, s) {
    push();
    translate(cx, cy);
    let sc = s / 40;

    if (iconType === 'spore') {
        fill(200, 170, 50); noStroke();
        ellipse(0, 0, 14 * sc, 14 * sc);
        fill(220, 190, 70);
        ellipse(-2 * sc, -2 * sc, 6 * sc, 6 * sc);
    } else if (iconType === 'protonema') {
        stroke(100, 170, 60); strokeWeight(2 * sc); noFill();
        line(-15 * sc, 5 * sc, 0, 0);
        line(0, 0, 10 * sc, -8 * sc);
        line(0, 0, 12 * sc, 5 * sc);
        line(10 * sc, -8 * sc, 18 * sc, -3 * sc);
    } else if (iconType === 'bud') {
        stroke(60, 140, 50); strokeWeight(2 * sc);
        line(0, 10 * sc, 0, -8 * sc);
        noStroke(); fill(70, 160, 60);
        ellipse(-4 * sc, -2 * sc, 6 * sc, 4 * sc);
        ellipse(4 * sc, 0, 6 * sc, 4 * sc);
    } else if (iconType === 'gametophyte') {
        stroke(40, 120, 40); strokeWeight(2 * sc);
        line(0, 12 * sc, 0, -10 * sc);
        noStroke(); fill(50, 150, 50);
        for (let j = 0; j < 4; j++) {
            let ly = -8 * sc + j * 5 * sc;
            let side = j % 2 === 0 ? -1 : 1;
            ellipse(side * 6 * sc, ly, 10 * sc, 4 * sc);
        }
        fill(200, 100, 100); ellipse(0, -12 * sc, 5 * sc, 4 * sc);
    } else if (iconType === 'sperm') {
        fill(100, 160, 230, 100); noStroke();
        ellipse(0, 0, 30 * sc, 12 * sc);
        fill(60, 120, 200);
        for (let j = 0; j < 3; j++) {
            let sx = -8 * sc + j * 8 * sc;
            ellipse(sx, sin(frameCount * 0.1 + j) * 3 * sc, 4 * sc, 4 * sc);
            stroke(60, 120, 200); strokeWeight(1);
            line(sx + 2 * sc, 0, sx + 6 * sc, sin(frameCount * 0.15 + j) * 2 * sc);
            noStroke();
        }
    } else if (iconType === 'fertilization') {
        fill(200, 150, 200, 100); noStroke();
        ellipse(0, 0, 20 * sc, 16 * sc);
        fill(60, 120, 200); ellipse(-4 * sc, 0, 6 * sc, 6 * sc);
        fill(200, 100, 100); ellipse(4 * sc, 0, 8 * sc, 8 * sc);
    } else if (iconType === 'young_sporo') {
        stroke(50, 130, 50); strokeWeight(2 * sc);
        line(0, 12 * sc, 0, -2 * sc);
        stroke(140, 100, 50); strokeWeight(2 * sc);
        line(0, -2 * sc, 0, -12 * sc);
        noStroke(); fill(160, 120, 60);
        ellipse(0, -14 * sc, 6 * sc, 8 * sc);
    } else if (iconType === 'mature_sporo') {
        stroke(50, 130, 50); strokeWeight(2 * sc);
        line(0, 12 * sc, 0, 0);
        stroke(140, 100, 50); strokeWeight(2.5 * sc);
        line(0, 0, 0, -14 * sc);
        noStroke(); fill(140, 90, 40);
        ellipse(0, -16 * sc, 10 * sc, 12 * sc);
        fill(160, 110, 50);
        rect(-3 * sc, -20 * sc, 6 * sc, 3 * sc, 1);
    } else if (iconType === 'meiosis') {
        noStroke();
        fill(180, 80, 80, 100); ellipse(0, 0, 22 * sc, 22 * sc);
        fill(180, 80, 80);
        ellipse(-5 * sc, -3 * sc, 8 * sc, 8 * sc);
        ellipse(5 * sc, 3 * sc, 8 * sc, 8 * sc);
        fill(220, 120, 120);
        ellipse(-5 * sc, -3 * sc, 4 * sc, 4 * sc);
        ellipse(5 * sc, 3 * sc, 4 * sc, 4 * sc);
    } else if (iconType === 'release') {
        stroke(140, 100, 50); strokeWeight(2 * sc);
        line(0, 12 * sc, 0, -6 * sc);
        noStroke(); fill(140, 90, 40);
        arc(0, -8 * sc, 12 * sc, 10 * sc, PI, TWO_PI);
        fill(200, 170, 50);
        for (let j = 0; j < 5; j++) {
            let ang = -PI + j * PI / 4 + sin(frameCount * 0.05) * 0.2;
            let d = 10 * sc + sin(frameCount * 0.08 + j) * 4 * sc;
            ellipse(cos(ang) * d, -10 * sc + sin(ang) * d * 0.5 - 4 * sc, 4 * sc, 4 * sc);
        }
    }
    pop();
}

function mousePressed() {
    // Check if clicking on a stage node
    let cx = canvasWidth * 0.38;
    let cy = 210;
    let radius = min(canvasWidth * 0.28, 140);

    for (let i = 0; i < 10; i++) {
        let angle = -HALF_PI + TWO_PI * i / 10;
        let nx = cx + cos(angle) * radius;
        let ny = cy + sin(angle) * radius;
        if (dist(mouseX, mouseY, nx, ny) < 20) {
            currentStage = i;
            isPlaying = false;
            break;
        }
    }
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, canvasHeight);
    speedSlider.position(canvasWidth - 130, drawHeight + 14);
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);
    canvasWidth = containerWidth;
}
