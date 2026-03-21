# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Moss: Biology, Ecology, Design, and Sustainability — an MkDocs Material intelligent textbook for high school and introductory college students. The textbook covers 400 concepts organized across 20 chapters in a dependency graph, spanning moss biology, ecology, garden design, indoor systems, architecture, art, practical skills, education, advanced topics, and future applications.

## Development Environment

Assume the user is running `mkdocs serve` in a terminal. When a new MicroSim has been generated, print the URL and open it in Chrome:

```bash
open -a "Google Chrome" "http://127.0.0.1:8000/moss/sims/<sim-name>/main.html"
```

## Learning Mascot: Mossby the Tree Frog

### Character Overview

- **Name**: Mossby
- **Species**: Tree Frog
- **Personality**: Gentle, curious, encouraging, and endearingly punny
- **Catchphrase**: "Let's hop to it!"
- **Visual**: A small bright green tree frog with golden eyes, large adhesive toe pads, and a lighter lime-green belly. Wears a tiny brown gardening hat with a red mushroom on it. A small magnifying glass hangs on a cord around his neck.

### Voice Characteristics

- Uses warm, encouraging language — never condescending or overly academic
- Frequently drops moss puns and frog wordplay ("I'm lichen this topic already!", "This is un-frog-ettable!", "Let's moss-ey on to the next section!", "Don't worry, this will grow on you!")
- Refers to students as "explorers" or "fellow moss enthusiasts"
- Keeps it light — Mossby treats every topic like a small adventure
- Occasionally "ribbits" with excitement when a concept is especially cool
- Signature phrases: "Let's hop to it!", "Take a closer look!", "Every tiny thing matters!", "Nature rewards patience!"

### Placement Rules

| Context | Admonition Type | Frequency |
|---------|----------------|-----------|
| General note / sidebar | mascot-neutral | As needed |
| Chapter opening | mascot-welcome | Every chapter |
| Key concept | mascot-thinking | 2-3 per chapter |
| Helpful tip | mascot-tip | As needed |
| Common mistake | mascot-warning | As needed |
| Section completion | mascot-celebration | End of major sections |
| Difficult content | mascot-encourage | Where students may struggle |

### Admonition Syntax

Use this format in chapter markdown. The `<img>` tag places Mossby's image floated left of the text:

```markdown
!!! mascot-welcome "Mossby Says: Let's Hop To It!"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Mossby welcomes you">
    Welcome back, explorers! In this chapter we're diving into the
    wonderful world of moss ecology. I'm lichen this topic already!

!!! mascot-thinking "Key Insight"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Mossby is thinking">
    Here's something un-frog-ettable: moss can hold up to 20 times
    its dry weight in water — all without roots!

!!! mascot-tip "Mossby's Tip"
    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Mossby shares a tip">
    When checking soil pH, always take samples from three different
    spots and average them. Trust me — one reading doesn't tell the
    whole story!

!!! mascot-warning "Watch Your Step!"
    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Mossby warns you">
    Don't overwater your mossarium! Moss loves humidity, not puddles.
    If you see pooling water, you've gone overboard. Let it dry out
    before misting again.

!!! mascot-encourage "You've Got This!"
    <img src="../../img/mascot/encouraging.png" class="mascot-admonition-img" alt="Mossby encourages you">
    Telling moss species apart can feel overwhelming — there are over
    12,000 species worldwide! But hey, even I started by learning just
    five. You'll get there. One hop at a time!

!!! mascot-celebration "Ribbiting Work!"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Mossby celebrates">
    You've just moss-tered the entire ecology section! From water
    retention to carbon sequestration — outstanding work, explorer!

!!! mascot-neutral "A Note from Mossby"
    <img src="../../img/mascot/neutral.png" class="mascot-admonition-img" alt="Mossby notes">
    Each chapter builds on the last, so if something feels shaky,
    hop back and reinforce it before moving forward. No rush —
    nature rewards patience!
```

### Do's and Don'ts

**Do:**

- Use Mossby to introduce new chapters warmly (always include the catchphrase in welcome admonitions)
- Include at least one moss pun or frog joke per Mossby appearance — he can't help himself
- Keep dialogue brief (1-3 sentences) — Mossby is pithy, not preachy
- Match the pose/image to the content type
- Let Mossby be genuinely funny — students should look forward to his appearances
- Use Mossby to make dry or difficult content feel approachable

**Don't:**

- Use Mossby more than 5-6 times per chapter
- Put mascot admonitions back-to-back (give students breathing room)
- Use Mossby for purely decorative purposes — he should always add value
- Change Mossby's personality or speech patterns
- Force puns where they don't fit — Mossby has taste (mostly)
- Let Mossby explain the core academic content — he introduces, encourages, and comments, but the chapter text does the teaching

### Sample Puns and Wordplay

Keep a rotation going — don't reuse the same pun in the same chapter:

- "I'm lichen this topic already!"
- "This is un-frog-ettable!"
- "Let's moss-ey on to the next section!"
- "Don't worry, this will grow on you!"
- "That's ribbiting stuff!"
- "You really nailed that — no moss-takes!"
- "Spore-tacular work, explorer!"
- "This section is going to be toad-ally awesome!"
- "You're on a roll — or should I say, a log?"
- "Hop-efully that cleared things up!"
- "I'm green with excitement!"
- "Let's dig into this — well, moss doesn't dig, but you get the idea!"
- "Water you waiting for? Let's go!"
- "Leaf it to me to point out the key idea!" (Mossby knows moss doesn't have leaves, and that's the joke)

## Note about the New Interactive Infographic Overlay Skills

When generating chapter content, we have a new set of interactive infographic overlay skills
you can try.
When you have a biological diagram such as the structure of a cell, you can generate
a #### Diagram type of interactive infographic with drawing overlay.  To use this
you must first generate a detailed description of the biological image that will
be fed to a text-to-image tool.  Make sure you give a detailed list of all
the structures that should be in the drawing and their exact colors.
Then, you specify that the interactive infographic microsim will also have
an overlay.json file that has both the regions names and the exact label names
and their positions.  The infographic will place the regions and labels over the
detailed drawing which allows infoboxes and tooltips to be use when the user
hovers over any region.

Try the /interactive-infographic-overlay skill for more information