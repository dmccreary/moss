// MathJax configuration for college placement Biology
// Enables standard math notation AND mhchem for chemical equations (\ce{})
//
// ── Rendering Pipeline ────────────────────────────────────────────────────────
//
//  1. Markdown author writes:   $E = mc^2$   or   $\ce{H2O}$
//  2. pymdownx.arithmatex (generic: true) intercepts the $ delimiters BEFORE
//     Python-Markdown runs, wrapping the content in protected spans:
//       $...$   →  <span class="arithmatex">\(...\)</span>
//       $$...$$ →  <span class="arithmatex">\[...\]</span>
//  3. Python-Markdown processes the rest of the document safely (no $ left to
//     misinterpret as Markdown link syntax).
//  4. MkDocs assembles the full HTML page.
//  5. This config file loads BEFORE the MathJax CDN bundle.
//  6. MathJax scans the DOM for \(...\) and \[...\] spans.
//  7. The mhchem extension resolves \ce{...} into typeset chemical notation.
//
// ── Delimiter rules for markdown authors ──────────────────────────────────────
//
//   Inline math:   $...$           e.g.  $E = mc^2$
//   Block math:    $$...$$         e.g.  $$\Delta G = \Delta H - T\Delta S$$
//   Chemistry:     $\ce{...}$      e.g.  $\ce{6CO2 + 6H2O -> C6H12O6 + 6O2}$
//
//   NEVER write \(...\) or \[...\] in .md files — Python-Markdown may corrupt
//   backslash sequences before MathJax ever sees them.
//   Always use $ and $$ in content files. No exceptions.
//
// ── Why both delimiter pairs are registered below ─────────────────────────────
//
//   Primary:  \(...\) and \[...\] — what arithmatex outputs into the HTML.
//   Fallback: $...$ and $$...$$ — catches any content that bypasses arithmatex
//             (e.g. raw HTML blocks, injected content, or future edge cases).
//   Having both registered costs nothing and prevents silent failures.

window.MathJax = {
  loader: {
    load: ['[tex]/mhchem']
  },
  tex: {
    packages: {'[+]': ['mhchem']},
    inlineMath:  [['\\(', '\\)'], ['$', '$']],
    displayMath: [['\\[', '\\]'], ['$$', '$$']]
  }
};
