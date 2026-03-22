// Moss Ecosystem Food Web - Network diagram using vis-network
// MicroSim version 2026.03

document.addEventListener('DOMContentLoaded', function() {
  const mainEl = document.querySelector('main');

  // Create container
  const container = document.createElement('div');
  container.style.width = '100%';
  container.style.height = '480px';
  container.style.border = '1px solid #ddd';
  container.style.borderRadius = '8px';
  container.style.background = '#f8fbff';
  mainEl.insertBefore(container, mainEl.firstChild);

  // Title
  const title = document.createElement('h2');
  title.textContent = 'Moss Ecosystem Food Web';
  title.style.textAlign = 'center';
  title.style.margin = '8px 0 4px 0';
  title.style.fontSize = '20px';
  title.style.color = '#333';
  mainEl.insertBefore(title, container);

  // Info panel
  const infoPanel = document.createElement('div');
  infoPanel.id = 'infoPanel';
  infoPanel.style.padding = '10px';
  infoPanel.style.margin = '8px auto';
  infoPanel.style.maxWidth = '600px';
  infoPanel.style.background = '#fffff0';
  infoPanel.style.border = '1px solid #ddd';
  infoPanel.style.borderRadius = '6px';
  infoPanel.style.fontSize = '13px';
  infoPanel.style.minHeight = '40px';
  infoPanel.innerHTML = '<em style="color:#999">Click any organism to see its role in the moss ecosystem.</em>';
  mainEl.insertBefore(infoPanel, container.nextSibling);

  // Button
  const btnDiv = document.createElement('div');
  btnDiv.style.textAlign = 'center';
  btnDiv.style.margin = '6px 0';
  const highlightBtn = document.createElement('button');
  highlightBtn.textContent = 'Highlight Moss Connections';
  highlightBtn.style.padding = '6px 16px';
  highlightBtn.style.borderRadius = '20px';
  highlightBtn.style.border = '2px solid #388E3C';
  highlightBtn.style.background = '#4CAF50';
  highlightBtn.style.color = 'white';
  highlightBtn.style.fontWeight = 'bold';
  highlightBtn.style.cursor = 'pointer';
  highlightBtn.style.fontSize = '13px';
  btnDiv.appendChild(highlightBtn);
  mainEl.insertBefore(btnDiv, container.nextSibling);

  // Node data with info
  const nodeData = [
    { id: 1, label: 'Moss', group: 'producer', info: 'Primary producer. Foundation of the ecosystem, providing food and habitat for dozens of organisms. Photosynthesizes and builds soil.' },
    { id: 2, label: 'Algae\non moss', group: 'producer', info: 'Microscopic algae growing on moss surfaces. Additional primary producer providing food for tiny invertebrates.' },
    { id: 3, label: 'Cyanobacteria', group: 'producer', info: 'Nitrogen-fixing bacteria that live among moss. Convert atmospheric nitrogen into forms usable by plants.' },
    { id: 4, label: 'Fungi', group: 'decomposer', info: 'Decompose dead moss tissue. Return nutrients to the soil. Some form symbiotic relationships with moss.' },
    { id: 5, label: 'Bacteria', group: 'decomposer', info: 'Break down organic matter in the moss mat. Essential for nutrient recycling in the ecosystem.' },
    { id: 6, label: 'Tardigrades', group: 'primary', info: 'Microscopic "water bears" that graze on moss cells and algae. Famous for extreme survival abilities.' },
    { id: 7, label: 'Rotifers', group: 'primary', info: 'Tiny animals that filter-feed on bacteria and algae among moss. Important link in the micro food web.' },
    { id: 8, label: 'Nematodes', group: 'primary', info: 'Microscopic roundworms living in the water film on moss. Feed on bacteria, fungi, and other nematodes.' },
    { id: 9, label: 'Mites', group: 'primary', info: 'Oribatid mites are among the most abundant arthropods in moss. Feed on fungi, algae, and decaying matter.' },
    { id: 10, label: 'Springtails', group: 'primary', info: 'Tiny jumping hexapods that graze on fungi and decaying plant material in moss mats.' },
    { id: 11, label: 'Snails', group: 'primary', info: 'Small snails that graze on moss and algae. Their movement helps disperse moss spores.' },
    { id: 12, label: 'Spiders', group: 'secondary', info: 'Hunt mites, springtails, and other small invertebrates living in the moss layer.' },
    { id: 13, label: 'Ground\nBeetles', group: 'secondary', info: 'Predatory beetles that hunt springtails, mites, and other small prey in the moss understory.' },
    { id: 14, label: 'Centipedes', group: 'secondary', info: 'Active predators in the moss layer. Hunt worms, springtails, and other small invertebrates.' },
    { id: 15, label: 'Birds', group: 'tertiary', info: 'Many bird species forage in moss for invertebrates. Some use moss as nesting material.' },
    { id: 16, label: 'Frogs', group: 'tertiary', info: 'Frogs and tree frogs hunt insects in moist moss habitats. Moss provides essential humidity for their skin.' },
    { id: 17, label: 'Salamanders', group: 'tertiary', info: 'Woodland salamanders shelter under moss mats and hunt invertebrates. Moss maintains the moisture they need.' }
  ];

  const groupColors = {
    producer: { background: '#66BB6A', border: '#388E3C', font: { color: '#fff' } },
    decomposer: { background: '#8D6E63', border: '#5D4037', font: { color: '#fff' } },
    primary: { background: '#64B5F6', border: '#1976D2', font: { color: '#fff' } },
    secondary: { background: '#FFB74D', border: '#F57C00', font: { color: '#fff' } },
    tertiary: { background: '#EF5350', border: '#C62828', font: { color: '#fff' } }
  };

  const groupLevels = { producer: 4, decomposer: 3, primary: 2, secondary: 1, tertiary: 0 };

  const nodes = new vis.DataSet(nodeData.map(n => ({
    id: n.id,
    label: n.label,
    level: groupLevels[n.group],
    color: groupColors[n.group],
    shape: 'box',
    borderWidth: 2,
    font: { size: 12, multi: true, face: 'Arial' },
    margin: 8
  })));

  const edgeData = [
    { from: 1, to: 6, label: 'feeds on' },
    { from: 1, to: 11, label: 'feeds on' },
    { from: 2, to: 6, label: 'feeds on' },
    { from: 2, to: 7, label: 'feeds on' },
    { from: 3, to: 1, label: 'fixes N for' },
    { from: 4, to: 1, label: 'decomposes' },
    { from: 5, to: 1, label: 'decomposes' },
    { from: 5, to: 7, label: 'feeds on' },
    { from: 4, to: 9, label: 'feeds on' },
    { from: 4, to: 10, label: 'feeds on' },
    { from: 5, to: 8, label: 'feeds on' },
    { from: 1, to: 9, label: 'feeds on' },
    { from: 1, to: 10, label: 'feeds on' },
    { from: 6, to: 12, label: 'feeds on' },
    { from: 9, to: 12, label: 'feeds on' },
    { from: 10, to: 13, label: 'feeds on' },
    { from: 9, to: 13, label: 'feeds on' },
    { from: 8, to: 14, label: 'feeds on' },
    { from: 10, to: 14, label: 'feeds on' },
    { from: 11, to: 15, label: 'feeds on' },
    { from: 12, to: 15, label: 'feeds on' },
    { from: 10, to: 16, label: 'feeds on' },
    { from: 12, to: 16, label: 'feeds on' },
    { from: 9, to: 17, label: 'feeds on' },
    { from: 14, to: 17, label: 'feeds on' }
  ];

  const edges = new vis.DataSet(edgeData.map(e => ({
    from: e.from,
    to: e.to,
    label: e.label,
    arrows: 'to',
    color: { color: '#999', highlight: '#333' },
    font: { size: 9, color: '#888', strokeWidth: 2, strokeColor: '#fff' },
    smooth: { type: 'cubicBezier' }
  })));

  const options = {
    layout: {
      hierarchical: {
        direction: 'DU',
        sortMethod: 'directed',
        levelSeparation: 90,
        nodeSpacing: 100
      }
    },
    physics: { enabled: false },
    interaction: {
      hover: true,
      tooltipDelay: 200
    },
    edges: {
      width: 1.5,
      hoverWidth: 3
    }
  };

  const network = new vis.Network(container, { nodes: nodes, edges: edges }, options);

  // Click handler
  network.on('click', function(params) {
    if (params.nodes.length > 0) {
      const nodeId = params.nodes[0];
      const nd = nodeData.find(n => n.id === nodeId);
      if (nd) {
        const groupLabels = {
          producer: 'Primary Producer',
          decomposer: 'Decomposer',
          primary: 'Primary Consumer',
          secondary: 'Secondary Consumer',
          tertiary: 'Tertiary Consumer'
        };
        infoPanel.innerHTML = '<strong>' + nd.label.replace('\n', ' ') + '</strong> <span style="color:#888">(' + groupLabels[nd.group] + ')</span><br>' + nd.info;
      }
    }
  });

  // Highlight moss connections
  let mossHighlighted = false;
  highlightBtn.addEventListener('click', function() {
    mossHighlighted = !mossHighlighted;
    if (mossHighlighted) {
      highlightBtn.textContent = 'Show All';
      highlightBtn.style.background = '#f44336';
      highlightBtn.style.borderColor = '#c62828';
      // Find all nodes connected to moss (id=1)
      const connectedEdges = edges.get().filter(e => e.from === 1 || e.to === 1);
      const connectedNodeIds = new Set([1]);
      connectedEdges.forEach(e => { connectedNodeIds.add(e.from); connectedNodeIds.add(e.to); });

      nodes.get().forEach(n => {
        if (!connectedNodeIds.has(n.id)) {
          nodes.update({ id: n.id, opacity: 0.15, font: { color: '#ccc' } });
        }
      });
      edges.get().forEach(e => {
        if (e.from !== 1 && e.to !== 1) {
          edges.update({ id: e.id, color: { color: '#eee' }, font: { color: '#eee' } });
        } else {
          edges.update({ id: e.id, color: { color: '#333' }, width: 3 });
        }
      });
    } else {
      highlightBtn.textContent = 'Highlight Moss Connections';
      highlightBtn.style.background = '#4CAF50';
      highlightBtn.style.borderColor = '#388E3C';
      // Reset
      nodes.get().forEach(n => {
        const nd = nodeData.find(x => x.id === n.id);
        nodes.update({ id: n.id, opacity: 1, font: { color: '#fff', size: 12, multi: true, face: 'Arial' } });
      });
      edges.get().forEach(e => {
        edges.update({ id: e.id, color: { color: '#999', highlight: '#333' }, width: 1.5, font: { color: '#888' } });
      });
    }
  });
});
