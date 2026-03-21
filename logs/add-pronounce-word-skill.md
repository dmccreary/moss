# Add Pronounce Button Skill — Session Log

**Date:** 2026-03-21
**Status:** Complete — user is VERY happy!

## Summary

Created a new Claude skill (`pronounce-button`) that generates MP3 pronunciation
audio via the ElevenLabs TTS API and inserts inline "Pronounce" buttons into
MkDocs markdown files. Built the skill, generated 10 pronunciations for the
hardest moss biology terms, and deployed them to a new Appendices section.

## What Was Built

### 1. Pronounce Button Skill
- **Location:** `~/.claude/skills/pronounce-button/`
- `SKILL.md` — workflow instructions for Claude
- `scripts/generate-pronunciation.py` — Python script calling ElevenLabs TTS API

### 2. Pronunciation Guide Page
- `docs/appendices/common-terms.md` — 10 hard-to-pronounce terms with definitions and Pronounce buttons
- `docs/audio/*.mp3` — 10 generated MP3 files (17–27 KB each)

### 3. Supporting Infrastructure
- `.pronounce-btn` CSS added to `docs/css/extra.css`
- "Appendices" section added to `mkdocs.yml` nav
- `src/elevenlabs/text-to-speech-api-test.py` — unit test for API key and TTS
- `src/elevenlabs/README.md` — API key documentation

## 10 Terms Generated

| Term | File | Size |
|---|---|---|
| Bryophytes | `docs/audio/bryophytes.mp3` | 20 KB |
| Gametophyte | `docs/audio/gametophyte.mp3` | 20 KB |
| Sporophyte | `docs/audio/sporophyte.mp3` | 20 KB |
| Rhizoids | `docs/audio/rhizoids.mp3` | 18 KB |
| Sphagnum | `docs/audio/sphagnum.mp3` | 17 KB |
| Protonema | `docs/audio/protonema.mp3` | 19 KB |
| Calyptra | `docs/audio/calyptra.mp3` | 18 KB |
| Acrocarpous | `docs/audio/acrocarpous.mp3` | 21 KB |
| Pleurocarpous | `docs/audio/pleurocarpous.mp3` | 24 KB |
| Phytoremediation | `docs/audio/phytoremediation.mp3` | 27 KB |

## Lessons Learned and Fixes

### ElevenLabs API Key Format
- The key is a **64-character hex string** (no prefix).
- Keys starting with `isk_` or `sk_` are either old format or invalid.
- Verify with: `echo $ELEVENLABS_API_KEY | wc -c` → should output `65` (64 chars + newline).
- Documented in `src/elevenlabs/README.md`.

### API Key Permissions
- The key **must** have both **user_read** and **Text to Speech** permissions enabled
  in the ElevenLabs dashboard. Without `user_read`, the validation test (`GET /v1/user`)
  returns 401.

### API Key Not Inherited by Claude Code
- `ELEVENLABS_API_KEY` set in the user's shell is **not** automatically available
  inside Claude Code's Bash tool environment. The key had to be passed explicitly
  in the command.

### MkDocs Relative Path Bug (Critical Fix)
- **Problem:** Audio buttons produced no sound when clicked.
- **Root cause:** MkDocs uses directory URLs by default. A page at
  `docs/appendices/common-terms.md` is served as `/appendices/common-terms/index.html`.
  The initial relative path `../audio/SLUG.mp3` resolved to
  `/appendices/audio/SLUG.mp3` (wrong) instead of `/audio/SLUG.mp3`.
- **Fix:** Changed all audio `src` attributes from `../audio/` to `../../audio/`
  (two levels up: one for `common-terms/`, one for `appendices/`).
- **Skill updated:** The path table in `SKILL.md` was corrected to document the
  directory-URL behavior and show the correct relative paths for common file locations.

## Also in This Session

- Generated `docs/glossary.md` with 400 ISO 11179-compliant definitions using the
  `/glossary-generator` skill. Added Glossary to `mkdocs.yml` nav.
