// Dichotomous Key for Common Mosses
// Interactive decision tree using vis-network
// MicroSim version 2026.03

const descriptions = {
    'q1': { title: 'Start: Growth Direction', text: 'Look at how the moss grows. Does it grow upright (vertical stems) or does it creep and spread horizontally?' },
    'q2': { title: 'Stem Height', text: 'For upright mosses: Is the plant tall (over 5 cm) with stiff, pointed leaves?' },
    'q3': { title: 'Leaf Curvature', text: 'Do the leaves curve to one side (falcate) or are they straight?' },
    'q4': { title: 'Leaf Color', text: 'Is the moss pale whitish-green, or a deeper green color?' },
    'q5': { title: 'Branching Pattern', text: 'Does the moss show fern-like (pinnate) branching, or is it irregularly branched?' },
    'q6': { title: 'Surface Texture', text: 'Does the moss form smooth, flat, closely-pressed mats, or is it more raised and feathery?' },
    'haircap': { title: 'Haircap Moss (Polytrichum commune)', text: 'The tallest common moss, growing up to 40 cm. Has stiff, pointed leaves arranged in a star pattern when viewed from above. The sporophyte capsule is covered by a hairy calyptra. Found in forests, heaths, and bogs. Prefers acidic, moist soil.' },
    'rock-cap': { title: 'Rock Cap Moss (Dicranum scoparium)', text: 'Medium-sized acrocarpous moss with distinctive curved (falcate) leaves, all sweeping in the same direction like wind-blown hair. Forms loose tufts on rocks, logs, and forest floors. Very common in temperate forests.' },
    'cushion': { title: 'Cushion Moss (Leucobryum glaucum)', text: 'Forms distinctive pale whitish-green cushions. The pale color comes from large empty hyaline cells that store water. Turns bright green when wet, whitish when dry. Found on acidic forest floors.' },
    'mood': { title: 'Mood Moss (Dicranum scoparium var.)', text: 'Forms rounded bright green mounds on forest floors and logs. Known as "mood moss" because its color changes dramatically with moisture. Popular in terrariums and floral design.' },
    'fern-moss': { title: 'Fern Moss (Thuidium delicatulum)', text: 'A beautiful pleurocarpous moss with delicate, fern-like branching. Each branch is divided into smaller branchlets in a regular pattern. Forms lacy mats on soil, rocks, and tree bases in moist forests.' },
    'sheet': { title: 'Sheet Moss (Hypnum curvifolium)', text: 'Forms smooth, flat, glossy mats on rocks, logs, and soil. The leaves are closely pressed and curved, giving a sleek appearance. One of the most common forest floor mosses. Popular for green roofs and gardens.' },
    'plume': { title: 'Plume Moss (Ptilium crista-castrensis)', text: 'An elegant pleurocarpous moss with distinctive feather-like branches. Forms soft, light green mats in coniferous forests. The regularly pinnate branching pattern is one of the most beautiful in the moss world.' }
};

const nodeData = [
    { id: 'q1', label: 'Upright\ngrowth?', x: -400, y: 0, shape: 'diamond', group: 'question' },
    { id: 'q2', label: 'Tall (>5 cm),\nstiff leaves?', x: -200, y: -120, shape: 'diamond', group: 'question' },
    { id: 'q3', label: 'Leaves curve\none direction?', x: -200, y: 60, shape: 'diamond', group: 'question' },
    { id: 'q4', label: 'Pale\nwhitish-green?', x: 0, y: 60, shape: 'diamond', group: 'question' },
    { id: 'q5', label: 'Fern-like\nbranching?', x: -200, y: 180, shape: 'diamond', group: 'question' },
    { id: 'q6', label: 'Smooth,\nflat mats?', x: 0, y: 180, shape: 'diamond', group: 'question' },
    { id: 'haircap', label: 'Haircap\nMoss', x: 0, y: -180, shape: 'box', group: 'species1' },
    { id: 'rock-cap', label: 'Rock Cap\nMoss', x: 0, y: -60, shape: 'box', group: 'species2' },
    { id: 'cushion', label: 'Cushion\nMoss', x: 200, y: 0, shape: 'box', group: 'species3' },
    { id: 'mood', label: 'Mood\nMoss', x: 200, y: 100, shape: 'box', group: 'species4' },
    { id: 'fern-moss', label: 'Fern\nMoss', x: -200, y: 300, shape: 'box', group: 'species5' },
    { id: 'sheet', label: 'Sheet\nMoss', x: 0, y: 300, shape: 'box', group: 'species6' },
    { id: 'plume', label: 'Plume\nMoss', x: 200, y: 300, shape: 'box', group: 'species7' }
];

const edgeData = [
    { from: 'q1', to: 'q2', label: 'Yes\n(upright)', id: 'e1' },
    { from: 'q1', to: 'q5', label: 'No\n(creeping)', id: 'e2' },
    { from: 'q2', to: 'haircap', label: 'Yes', id: 'e3' },
    { from: 'q2', to: 'q3', label: 'No', id: 'e4' },
    { from: 'q3', to: 'rock-cap', label: 'Yes', id: 'e5' },
    { from: 'q3', to: 'q4', label: 'No', id: 'e6' },
    { from: 'q4', to: 'cushion', label: 'Yes', id: 'e7' },
    { from: 'q4', to: 'mood', label: 'No', id: 'e8' },
    { from: 'q5', to: 'fern-moss', label: 'Yes', id: 'e9' },
    { from: 'q5', to: 'q6', label: 'No', id: 'e10' },
    { from: 'q6', to: 'sheet', label: 'Yes', id: 'e11' },
    { from: 'q6', to: 'plume', label: 'No', id: 'e12' }
];

const speciesColors = {
    question: { background: '#bbdefb', border: '#1565c0', font: '#1a237e' },
    species1: { background: '#006400', border: '#004d00', font: '#ffffff' },
    species2: { background: '#2e8b57', border: '#1b5e20', font: '#ffffff' },
    species3: { background: '#b8d8b8', border: '#6b8e6b', font: '#1b3a1b' },
    species4: { background: '#32cd32', border: '#228b22', font: '#003300' },
    species5: { background: '#9acd32', border: '#6b8e23', font: '#1b3a00' },
    species6: { background: '#32cd32', border: '#228b22', font: '#003300' },
    species7: { background: '#90ee90', border: '#5cb85c', font: '#003300' }
};

let nodes, edges, network;
let highlightedPath = [];

function isInIframe() {
    try { return window.self !== window.top; }
    catch (e) { return true; }
}

function buildNodes() {
    return nodeData.map(n => {
        const gc = speciesColors[n.group];
        return {
            id: n.id,
            label: n.label,
            x: n.x,
            y: n.y,
            shape: n.shape,
            color: { background: gc.background, border: gc.border, highlight: { background: gc.background, border: '#ff9800' } },
            font: { color: gc.font, size: 14, face: 'Arial', multi: true },
            borderWidth: 2,
            size: n.shape === 'diamond' ? 22 : 20,
            margin: n.shape === 'box' ? { top: 8, right: 12, bottom: 8, left: 12 } : undefined
        };
    });
}

function buildEdges() {
    return edgeData.map(e => ({
        id: e.id,
        from: e.from,
        to: e.to,
        label: e.label,
        color: { color: '#666666', hover: '#333333', highlight: '#ff9800' },
        width: 2,
        font: { size: 11, color: '#444', strokeWidth: 3, strokeColor: '#ffffff', face: 'Arial', align: 'horizontal' },
        smooth: { type: 'cubicBezier', roundness: 0.2 },
        arrows: { to: { enabled: true, scaleFactor: 0.8 } }
    }));
}

function findPath(targetId) {
    // BFS backwards from target to q1
    let path = [];
    let current = targetId;
    while (current !== 'q1') {
        path.unshift(current);
        let parentEdge = edgeData.find(e => e.to === current);
        if (!parentEdge) break;
        current = parentEdge.from;
    }
    path.unshift('q1');
    return path;
}

function highlightPath(targetId) {
    let path = findPath(targetId);
    highlightedPath = path;

    // Reset all nodes and edges
    let freshNodes = buildNodes();
    let freshEdges = buildEdges();

    // Dim non-path nodes
    freshNodes.forEach(n => {
        if (!path.includes(n.id)) {
            n.color = { background: '#e8e8e8', border: '#ccc', highlight: { background: '#e8e8e8', border: '#ccc' } };
            n.font = { color: '#bbb', size: 14, face: 'Arial', multi: true };
        } else {
            n.borderWidth = 4;
            n.color.border = '#ff9800';
        }
    });

    // Dim non-path edges
    freshEdges.forEach(e => {
        let fromInPath = path.includes(e.from);
        let toInPath = path.includes(e.to);
        let fromIdx = path.indexOf(e.from);
        let toIdx = path.indexOf(e.to);
        if (fromInPath && toInPath && toIdx === fromIdx + 1) {
            e.color = { color: '#ff9800', hover: '#ff9800', highlight: '#ff9800' };
            e.width = 4;
        } else {
            e.color = { color: '#ddd', hover: '#ddd', highlight: '#ddd' };
            e.width = 1;
            e.font = { color: '#ddd', strokeColor: '#fff', size: 11, face: 'Arial' };
        }
    });

    freshNodes.forEach(n => nodes.update(n));
    freshEdges.forEach(e => edges.update(e));
}

function resetHighlight() {
    highlightedPath = [];
    buildNodes().forEach(n => nodes.update(n));
    buildEdges().forEach(e => edges.update(e));
}

function initializeNetwork() {
    nodes = new vis.DataSet(buildNodes());
    edges = new vis.DataSet(buildEdges());

    const enableMouse = !isInIframe();

    const options = {
        layout: { improvedLayout: false },
        physics: { enabled: false },
        interaction: {
            selectConnectedEdges: false,
            zoomView: enableMouse,
            dragView: enableMouse,
            dragNodes: false,
            hover: true,
            tooltipDelay: 200,
            navigationButtons: true
        },
        nodes: {
            font: { size: 14, face: 'Arial' },
            shadow: { enabled: true, color: 'rgba(0,0,0,0.15)', size: 4, x: 2, y: 2 }
        },
        edges: {
            arrows: { to: { enabled: true, scaleFactor: 0.8 } },
            width: 2,
            hoverWidth: 3,
            selectionWidth: 3
        }
    };

    const container = document.getElementById('network');
    if (!container) {
        // Create the container structure if it doesn't exist
        const main = document.querySelector('main');
        main.innerHTML = `
            <div class="container" style="display:flex; flex-wrap:wrap; max-width:1100px; margin:0 auto; font-family:Arial,sans-serif;">
                <div style="flex:2; min-width:350px;">
                    <div id="network" style="width:100%; height:450px; border:1px solid #ddd; border-radius:8px; background:white;"></div>
                </div>
                <div style="flex:1; min-width:220px; padding:10px;">
                    <div style="margin-bottom:10px;">
                        <button id="reset-btn" style="padding:6px 16px; border-radius:4px; border:2px solid #666; background:#666; color:white; font-weight:bold; cursor:pointer;">Start Over</button>
                    </div>
                    <div id="status-info" style="background:#f9f9f9; border:1px solid #ddd; border-radius:6px; padding:12px; min-height:100px;">
                        <div id="status-title" style="font-size:16px; font-weight:bold; color:#1565c0; margin-bottom:6px;">Dichotomous Key</div>
                        <div id="status-text" style="font-size:13px; color:#555; line-height:1.5;">Click any node to trace the identification path. Start at "Upright growth?" and follow the Yes/No answers to identify a moss type.</div>
                    </div>
                    <div style="margin-top:12px; font-size:11px; color:#888;">
                        <strong>Legend:</strong><br>
                        <span style="color:#1565c0;">◆ Decision questions</span><br>
                        <span style="color:#2e8b57;">■ Moss species</span>
                    </div>
                </div>
            </div>
        `;
    }

    const networkContainer = document.getElementById('network');
    network = new vis.Network(networkContainer, { nodes: nodes, edges: edges }, options);

    // Center view
    network.once('afterDrawing', function() {
        network.fit({ animation: false });
    });

    // Click handler
    network.on('click', function(params) {
        if (params.nodes.length > 0) {
            const nodeId = params.nodes[0];
            const desc = descriptions[nodeId];
            if (desc) {
                document.getElementById('status-title').textContent = desc.title;
                document.getElementById('status-text').textContent = desc.text;
            }
            // Highlight path to this node
            highlightPath(nodeId);
        } else {
            resetHighlight();
            document.getElementById('status-title').textContent = 'Dichotomous Key';
            document.getElementById('status-text').textContent = 'Click any node to trace the identification path. Start at "Upright growth?" and follow the Yes/No answers to identify a moss type.';
        }
    });

    // Hover handler
    network.on('hoverNode', function(params) {
        const desc = descriptions[params.node];
        if (desc) {
            document.getElementById('status-title').textContent = desc.title;
            document.getElementById('status-text').textContent = desc.text;
        }
    });

    // Reset button
    document.getElementById('reset-btn').addEventListener('click', function() {
        resetHighlight();
        document.getElementById('status-title').textContent = 'Dichotomous Key';
        document.getElementById('status-text').textContent = 'Click any node to trace the identification path. Start at "Upright growth?" and follow the Yes/No answers to identify a moss type.';
        network.fit({ animation: true });
    });
}

document.addEventListener('DOMContentLoaded', initializeNetwork);
