// Plant Family Tree
// Interactive evolutionary tree showing relationships among major plant groups
// vis-network with hierarchical left-to-right layout

// Node descriptions for the info panel
const descriptions = {
    'algae': {
        title: 'Green Algae',
        text: 'The aquatic ancestors of all land plants. Green algae (Charophyta) share a common ancestor with land plants and first appeared over 500 million years ago. They developed chlorophyll a and b for photosynthesis.'
    },
    'mosses': {
        title: 'Mosses (Bryophyta)',
        text: 'One of the earliest land plant groups, appearing ~470 MYA. Mosses lack true roots, stems, and leaves. They absorb water directly through their tissues and can hold up to 20 times their dry weight in water. Over 12,000 species exist worldwide.'
    },
    'liverworts': {
        title: 'Liverworts (Marchantiophyta)',
        text: 'Ancient non-vascular plants with flattened, lobed bodies (thalli) or leafy forms. Like mosses, they lack true roots and vascular tissue. They reproduce via spores and are found in moist habitats worldwide.'
    },
    'hornworts': {
        title: 'Hornworts (Anthocerotophyta)',
        text: 'Non-vascular plants named for their horn-shaped sporophytes. Unique among plants for having a single large chloroplast per cell. They have symbiotic relationships with nitrogen-fixing cyanobacteria.'
    },
    'vascular': {
        title: 'Vascular Plant Ancestor',
        text: 'An evolutionary branch point ~420 MYA where plants developed vascular tissue (xylem and phloem), enabling efficient water and nutrient transport. This innovation allowed plants to grow much taller.'
    },
    'ferns': {
        title: 'Ferns & Horsetails',
        text: 'Vascular plants that reproduce via spores rather than seeds. Ferns were the dominant land plants during the Carboniferous period (~360-300 MYA). They have true roots, stems, and leaves (fronds) with vascular tissue.'
    },
    'seed-ancestor': {
        title: 'Seed Plant Ancestor',
        text: 'Around 360 MYA, a major innovation emerged: the seed. Seeds protect plant embryos and provide nutrition for early growth, allowing plants to reproduce without standing water.'
    },
    'conifers': {
        title: 'Conifers & Cycads (Gymnosperms)',
        text: 'Seed plants that produce "naked" seeds not enclosed in fruit. Conifers include pines, spruces, and firs. Cycads are palm-like plants. Gymnosperms dominated during the Mesozoic era (~252-66 MYA).'
    },
    'flowering': {
        title: 'Flowering Plants (Angiosperms)',
        text: 'The most diverse plant group, appearing ~130 MYA. They produce flowers for reproduction and enclose seeds in fruit. With over 300,000 species, they dominate most terrestrial ecosystems today.'
    }
};

// Edge hover descriptions
const edgeDescriptions = {
    'algae-bryophytes': '~470 MYA: Land colonization. Plants moved from water to land, developing structures to prevent drying out.',
    'algae-vascular': '~420 MYA: Vascular tissue evolves. Xylem and phloem enabled efficient water/nutrient transport and taller growth.',
    'vascular-ferns': 'Spore-bearing vascular plants. Ferns have true roots, stems, and leaves but still reproduce with spores.',
    'vascular-seed': '~360 MYA: Seeds evolve. This freed plants from needing water for reproduction.',
    'seed-conifers': 'Naked seeds (gymnosperms). Seeds sit exposed on cone scales rather than enclosed in fruit.',
    'seed-flowering': '~130 MYA: Flowers evolve. Co-evolution with pollinators drove explosive diversification.'
};

// Node data with fixed positions for hierarchical left-to-right layout
const nodeData = [
    { id: 'algae',         label: 'Green\nAlgae',           x: -450, y: -20,  group: 'ancestor' },
    { id: 'mosses',        label: 'Mosses',                  x: -200, y: -120, group: 'bryophyte' },
    { id: 'liverworts',    label: 'Liverworts',              x: -200, y: -20,  group: 'bryophyte' },
    { id: 'hornworts',     label: 'Hornworts',               x: -200, y: 80,   group: 'bryophyte' },
    { id: 'vascular',      label: 'Vascular\nAncestor',      x: -200, y: 190,  group: 'ancestor' },
    { id: 'ferns',         label: 'Ferns &\nHorsetails',     x: 50,   y: 130,  group: 'fern' },
    { id: 'seed-ancestor', label: 'Seed Plant\nAncestor',    x: 50,   y: 260,  group: 'ancestor' },
    { id: 'conifers',      label: 'Conifers\n& Cycads',      x: 300,  y: 190,  group: 'gymnosperm' },
    { id: 'flowering',     label: 'Flowering\nPlants',        x: 300,  y: 310,  group: 'angiosperm' }
];

const edgeData = [
    { id: 'algae-bryophytes-m', from: 'algae', to: 'mosses',        label: '~470 MYA\nLand colonization',       edgeKey: 'algae-bryophytes' },
    { id: 'algae-bryophytes-l', from: 'algae', to: 'liverworts',    label: '',                                   edgeKey: 'algae-bryophytes' },
    { id: 'algae-bryophytes-h', from: 'algae', to: 'hornworts',     label: '',                                   edgeKey: 'algae-bryophytes' },
    { id: 'algae-vascular',     from: 'algae', to: 'vascular',      label: '~420 MYA\nVascular tissue',          edgeKey: 'algae-vascular' },
    { id: 'vascular-ferns',     from: 'vascular', to: 'ferns',      label: 'Spore-\nbearing',                    edgeKey: 'vascular-ferns' },
    { id: 'vascular-seed',      from: 'vascular', to: 'seed-ancestor', label: '~360 MYA\nSeeds evolve',          edgeKey: 'vascular-seed' },
    { id: 'seed-conifers',      from: 'seed-ancestor', to: 'conifers',  label: 'Naked\nseeds',                   edgeKey: 'seed-conifers' },
    { id: 'seed-flowering',     from: 'seed-ancestor', to: 'flowering', label: '~130 MYA\nFlowers evolve',       edgeKey: 'seed-flowering' }
];

// Color schemes per group
const groupColors = {
    ancestor:   { background: '#bdbdbd', border: '#757575', font: '#333333', highlight: { background: '#e0e0e0', border: '#616161' } },
    bryophyte:  { background: '#4caf50', border: '#2e7d32', font: '#ffffff', highlight: { background: '#66bb6a', border: '#388e3c' } },
    fern:       { background: '#66bb6a', border: '#43a047', font: '#ffffff', highlight: { background: '#81c784', border: '#2e7d32' } },
    gymnosperm: { background: '#5d4037', border: '#3e2723', font: '#ffffff', highlight: { background: '#795548', border: '#4e342e' } },
    angiosperm: { background: '#e91e63', border: '#c2185b', font: '#ffffff', highlight: { background: '#f06292', border: '#ad1457' } }
};

// Special moss highlight color
const mossHighlight = {
    background: '#00e676',
    border: '#00c853',
    font: '#000000'
};

// Dimmed color for non-moss nodes
const dimmedColor = {
    background: '#e0e0e0',
    border: '#bdbdbd',
    font: '#9e9e9e'
};

let nodes, edges, network;
let mossHighlighted = false;

function isInIframe() {
    try { return window.self !== window.top; }
    catch (e) { return true; }
}

function setupViewPosition() {
    network.once('afterDrawing', function() {
        const pos = network.getViewPosition();
        network.moveTo({
            position: { x: pos.x + 60, y: pos.y + 20 },
            animation: false
        });
    });
}

function buildNodes() {
    return nodeData.map(n => {
        const gc = groupColors[n.group];
        return {
            id: n.id,
            label: n.label,
            x: n.x,
            y: n.y,
            color: { background: gc.background, border: gc.border, highlight: gc.highlight },
            font: { color: gc.font, size: 14, face: 'Arial' },
            borderWidth: n.id === 'mosses' ? 4 : 2,
            size: n.id === 'mosses' ? 30 : 25
        };
    });
}

function buildEdges() {
    return edgeData.map(e => ({
        id: e.id,
        from: e.from,
        to: e.to,
        label: e.label,
        edgeKey: e.edgeKey,
        color: { color: '#666666', hover: '#333333', highlight: '#333333' },
        width: 2,
        font: { size: 10, color: '#555555', strokeWidth: 3, strokeColor: '#ffffff', align: 'top' },
        smooth: { type: 'cubicBezier', roundness: 0.3 }
    }));
}

function initializeNetwork() {
    mossHighlighted = false;
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
            shape: 'box',
            margin: { top: 10, right: 14, bottom: 10, left: 14 },
            font: { size: 14, face: 'Arial' },
            borderWidth: 2,
            shadow: {
                enabled: true,
                color: 'rgba(0,0,0,0.15)',
                size: 4,
                x: 2,
                y: 2
            }
        },
        edges: {
            arrows: { to: { enabled: true, scaleFactor: 1.0 } },
            width: 2,
            hoverWidth: 3,
            selectionWidth: 3
        }
    };

    const container = document.getElementById('network');
    network = new vis.Network(container, { nodes: nodes, edges: edges }, options);

    setupViewPosition();

    // Click node to show description
    network.on('click', function(params) {
        if (params.nodes.length > 0) {
            const nodeId = params.nodes[0];
            showNodeInfo(nodeId);
        } else if (params.edges.length > 0) {
            const edgeId = params.edges[0];
            const edge = edges.get(edgeId);
            if (edge && edge.edgeKey && edgeDescriptions[edge.edgeKey]) {
                showEdgeInfo(edge.edgeKey);
            }
        } else {
            resetInfoPanel();
        }
    });

    // Hover over edges to show tooltip
    network.on('hoverEdge', function(params) {
        const edge = edges.get(params.edge);
        if (edge && edge.edgeKey && edgeDescriptions[edge.edgeKey]) {
            showEdgeInfo(edge.edgeKey);
        }
    });

    resetInfoPanel();
    updateHighlightButton();
}

function showNodeInfo(nodeId) {
    const desc = descriptions[nodeId];
    if (!desc) return;
    document.getElementById('status-title').textContent = desc.title;
    document.getElementById('status-text').textContent = desc.text;
}

function showEdgeInfo(edgeKey) {
    document.getElementById('status-title').textContent = 'Evolutionary Innovation';
    document.getElementById('status-text').textContent = edgeDescriptions[edgeKey];
}

function resetInfoPanel() {
    document.getElementById('status-title').textContent = 'Plant Evolutionary Tree';
    document.getElementById('status-text').textContent =
        'Click any node to learn more about that plant group. Hover over edges to see evolutionary innovations at each branch point.';
}

function highlightMoss() {
    mossHighlighted = !mossHighlighted;

    if (mossHighlighted) {
        // Dim all nodes except mosses
        nodeData.forEach(n => {
            if (n.id === 'mosses') {
                nodes.update({
                    id: n.id,
                    color: { background: mossHighlight.background, border: mossHighlight.border },
                    font: { color: mossHighlight.font, size: 16, face: 'Arial' },
                    borderWidth: 5,
                    shadow: { enabled: true, color: 'rgba(0,230,118,0.4)', size: 10, x: 0, y: 0 }
                });
            } else {
                nodes.update({
                    id: n.id,
                    color: { background: dimmedColor.background, border: dimmedColor.border },
                    font: { color: dimmedColor.font, size: 14, face: 'Arial' },
                    borderWidth: 1
                });
            }
        });

        // Dim edges not connected to mosses, highlight the one that is
        edgeData.forEach(e => {
            if (e.to === 'mosses' || e.from === 'mosses') {
                edges.update({ id: e.id, color: { color: '#00c853' }, width: 3 });
            } else {
                edges.update({ id: e.id, color: { color: '#d0d0d0' }, width: 1,
                    font: { color: '#cccccc', strokeColor: '#ffffff' } });
            }
        });

        // Also keep algae slightly visible as the ancestor
        nodes.update({
            id: 'algae',
            color: { background: '#cfd8dc', border: '#90a4ae' },
            font: { color: '#607d8b', size: 14, face: 'Arial' },
            borderWidth: 2
        });

        showNodeInfo('mosses');
    } else {
        resetAllColors();
        resetInfoPanel();
    }

    updateHighlightButton();
}

function resetAllColors() {
    mossHighlighted = false;
    const freshNodes = buildNodes();
    freshNodes.forEach(n => {
        nodes.update({
            id: n.id,
            color: n.color,
            font: n.font,
            borderWidth: n.borderWidth,
            size: n.size,
            shadow: { enabled: true, color: 'rgba(0,0,0,0.15)', size: 4, x: 2, y: 2 }
        });
    });
    const freshEdges = buildEdges();
    freshEdges.forEach(e => {
        edges.update({
            id: e.id,
            color: e.color,
            width: e.width,
            font: e.font
        });
    });
    updateHighlightButton();
}

function updateHighlightButton() {
    const btn = document.getElementById('highlight-moss-btn');
    if (mossHighlighted) {
        btn.textContent = 'Show All';
        btn.style.backgroundColor = '#ff9800';
    } else {
        btn.textContent = 'Highlight Moss';
        btn.style.backgroundColor = '#4caf50';
    }
}

function reset() {
    resetAllColors();
    resetInfoPanel();
}

document.addEventListener('DOMContentLoaded', function() {
    initializeNetwork();
    document.getElementById('highlight-moss-btn').addEventListener('click', highlightMoss);
    document.getElementById('reset-btn').addEventListener('click', reset);
});
