# Moss: Biology, Ecology, Design, and Sustainability

[![MkDocs](https://img.shields.io/badge/Made%20with-MkDocs-526CFE?logo=materialformkdocs)](https://www.mkdocs.org/)
[![Material for MkDocs](https://img.shields.io/badge/Material%20for%20MkDocs-526CFE?logo=materialformkdocs)](https://squidfunk.github.io/mkdocs-material/)
[![GitHub Pages](https://img.shields.io/badge/View%20on-GitHub%20Pages-blue?logo=github)](https://dmccreary.github.io/moss/)
[![GitHub](https://img.shields.io/badge/GitHub-dmccreary%2Fmoss-blue?logo=github)](https://github.com/dmccreary/moss)
[![Claude Code](https://img.shields.io/badge/Built%20with-Claude%20Code-DA7857?logo=anthropic)](https://claude.ai/code)
[![Claude Skills](https://img.shields.io/badge/Uses-Claude%20Skills-DA7857?logo=anthropic)](https://github.com/dmccreary/claude-skills)
[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![p5.js](https://img.shields.io/badge/p5.js-ED225D?logo=p5.js&logoColor=white)](https://p5js.org/)
[![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white)](https://www.python.org/)

## View the Live Site

Visit the interactive textbook at: [https://dmccreary.github.io/moss/](https://dmccreary.github.io/moss/)

## Overview

This is an interactive, AI-generated intelligent textbook on moss biology, ecology, garden design, and sustainability, designed for high school students (grades 10-12) and introductory college students. Built using MkDocs with the Material theme, it incorporates a learning graph of 400 concepts organized across 20 chapters, interactive MicroSims, chapter quizzes, a comprehensive glossary, and a pedagogical mascot named Mossby the Tree Frog.

The textbook follows Bloom's Taxonomy (2001 revision) for learning outcomes and uses a concept dependency graph to ensure proper prerequisite sequencing. Students explore moss from multiple perspectives: from cellular biology and ecology to Japanese garden design, living architecture, contemporary art, biomimicry, and future applications in space habitats and sustainable materials.

No prior botany experience is required. Whether you are a student discovering the hidden world of bryophytes or an educator looking for structured, hands-on course materials, this textbook provides comprehensive coverage with interactive elements that make 450 million years of evolutionary history accessible and engaging.

## Site Metrics

| Metric | Count |
|--------|-------|
| Concepts in Learning Graph | 400 |
| Chapters | 20 |
| Markdown Files | 79 |
| Total Words | 158,442 |
| MicroSims | 8 |
| Glossary Terms | 400 |
| FAQ Questions | 79 |
| Quiz Questions | 200 |
| Images | 21 |

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/dmccreary/moss.git
cd moss
```

### Install Dependencies

This project uses MkDocs with the Material theme:

```bash
pip install mkdocs
pip install mkdocs-material
pip install mkdocs-glightbox
```

### Build and Serve Locally

Build the site:

```bash
mkdocs build
```

Serve locally for development (with live reload):

```bash
mkdocs serve
```

Open your browser to [http://localhost:8000/moss/](http://localhost:8000/moss/)

### Deploy to GitHub Pages

```bash
mkdocs gh-deploy
```

This builds the site and pushes it to the `gh-pages` branch.

### Using the Book

**Navigation:**
- Use the left sidebar to browse chapters
- Click the search icon to search all content
- Each chapter includes a content page and a quiz

**Interactive MicroSims:**
- Found in the "MicroSims" section
- Each simulation runs standalone in your browser
- Adjust parameters with sliders and controls

**Learning Graph:**
- Explore the interactive concept dependency graph in the Learning Graph section
- 400 concepts with prerequisite relationships visualized as a network

## Repository Structure

```
moss/
├── docs/                          # MkDocs documentation source
│   ├── chapters/                  # 20 chapter directories
│   │   ├── 01-scientific-foundations/
│   │   │   ├── index.md          # Chapter content
│   │   │   └── quiz.md           # 10-question chapter quiz
│   │   └── ...
│   ├── sims/                      # Interactive MicroSims
│   │   ├── graph-viewer/          # Learning graph visualization
│   │   ├── bryophyte-comparison/  # Compare moss, liverworts, hornworts
│   │   ├── moss-cell-structure/   # Interactive cell diagram
│   │   └── ...
│   ├── learning-graph/            # Learning graph data and reports
│   │   ├── learning-graph.csv    # 400 concepts with dependencies
│   │   └── quality-metrics.md    # Quality analysis
│   ├── img/mascot/                # Mossby mascot images (7 poses)
│   ├── glossary.md                # 400 terms with definitions
│   ├── faq.md                     # 79 frequently asked questions
│   └── course-description.md     # Course overview and Bloom's outcomes
├── mkdocs.yml                     # MkDocs configuration
└── README.md                      # This file
```

## Reporting Issues

Found a bug, typo, or have a suggestion for improvement? Please report it:

[GitHub Issues](https://github.com/dmccreary/moss/issues)

When reporting issues, please include:

- Description of the problem or suggestion
- Steps to reproduce (for bugs)
- Expected vs actual behavior
- Screenshots (if applicable)
- Browser/environment details (for MicroSims)

## License

This work is licensed under the [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-nc-sa/4.0/).

**You are free to:**

- **Share** — copy and redistribute the material
- **Adapt** — remix, transform, and build upon the material

**Under the following terms:**

- **Attribution** — Give appropriate credit with a link to the original
- **NonCommercial** — No commercial use without permission
- **ShareAlike** — Distribute contributions under the same license

## Acknowledgements

This project is built on the shoulders of giants in the open source community:

- **[MkDocs](https://www.mkdocs.org/)** — Static site generator optimized for project documentation
- **[Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)** — Beautiful, responsive theme by Martin Donath
- **[p5.js](https://p5js.org/)** — Creative coding library for interactive MicroSims
- **[vis-network](https://visjs.org/)** — Network visualization library for the learning graph viewer
- **[Python](https://www.python.org/)** — Data processing and build tooling
- **[Claude AI](https://claude.ai)** by Anthropic — AI-assisted content generation
- **[GitHub Pages](https://pages.github.com/)** — Free hosting for open source projects

Special thanks to the educators, bryologists, and moss enthusiasts whose work makes this textbook possible.

## Contact

**Dan McCreary**

- LinkedIn: [linkedin.com/in/danmccreary](https://www.linkedin.com/in/danmccreary/)
- GitHub: [@dmccreary](https://github.com/dmccreary)

Questions, suggestions, or collaboration opportunities? Feel free to connect on LinkedIn or open an issue on GitHub.
