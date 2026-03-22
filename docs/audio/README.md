# Audio Pronunciation Files

Generated using the ElevenLabs TTS API via the `pronounce-button` skill.

**Voice:** Sarah (`EXAVITQu4vr4xnSDxMaL`) — US female

**Date generated:** 2026-03-22

## Pronunciation Method Log

Each term was tested with up to three tiers. The **Method** column shows
which tier produced the final accepted version.

| File | Term | Method | Details |
|---|---|---|---|
| `acrocarpous.mp3` | Acrocarpous | SSML | `AE2 K R OW0 K AA1 R P AH0 S` |
| `biogeography.mp3` | Biogeography | Plain | |
| `biomimicry.mp3` | Biomimicry | SSML | `B AY2 OW0 M IH1 M IH0 K R IY0` |
| `biophilic.mp3` | Biophilic | Phonetic | `Bye-oh-FIL-ik` |
| `bryophytes.mp3` | Bryophytes | Phonetic | `Bry-oh-fytes` |
| `calyptra.mp3` | Calyptra | Phonetic | `Kah-lip-trah` |
| `coevolution.mp3` | Coevolution | Plain | |
| `desiccation.mp3` | Desiccation | Plain | |
| `dichotomous.mp3` | Dichotomous | Plain | |
| `evapotranspiration.mp3` | Evapotranspiration | SSML | `IH0 V AE2 P OW0 T R AE2 N S P ER0 EY1 SH AH0 N` |
| `gametophyte.mp3` | Gametophyte | SSML | `G AH0 M IY1 T AH0 F AY2 T` |
| `hornworts.mp3` | Hornworts | SSML | `HH AO1 R N W ER2 T S` |
| `ikebana.mp3` | Ikebana | SSML | `IH2 K EH0 B AA1 N AH0` |
| `liverworts.mp3` | Liverworts | SSML | `L IH1 V ER0 W ER2 T S` |
| `mossarium.mp3` | Mossarium | SSML | `M AO0 S EH1 R IY0 AH0 M` |
| `mutualism.mp3` | Mutualism | Plain | |
| `phenology.mp3` | Phenology | Plain | |
| `phytoremediation.mp3` | Phytoremediation | Plain | |
| `pleurocarpous.mp3` | Pleurocarpous | Phonetic | `Ploor-oh-kar-pus` |
| `protonema.mp3` | Protonema | Phonetic | `Pro-toh-nee-mah` |
| `rhizoids.mp3` | Rhizoids | Phonetic | `Rye-zoyds` |
| `seta.mp3` | Seta | Phonetic | `SEE-tah` |
| `sphagnum.mp3` | Sphagnum | Phonetic | `Sfag-num` |
| `sporophyte.mp3` | Sporophyte | Phonetic | `Spore-oh-fyte` |
| `symbiotic.mp3` | Symbiotic | Plain | |
| `wabi-sabi.mp3` | Wabi-Sabi | Plain | |

## Methods

| Method | Model | Description |
|---|---|---|
| **Plain** | `eleven_multilingual_v2` | Send the word as-is. Works for most terms. |
| **Phonetic** | `eleven_multilingual_v2` | Hyphenated phonetic spelling (e.g., `Gah-mee-toh-fyte`). Fallback when plain is mispronounced. |
| **SSML** | `eleven_flash_v2` | CMU Arpabet phoneme string via `<phoneme>` tag. Most precise control. Last resort. |

## Regenerating

```bash
# Plain (Tier 1)
python3 ~/.claude/skills/pronounce-button/scripts/generate-pronunciation.py "Term" -o docs/audio/term.mp3

# Phonetic (Tier 2)
python3 ~/.claude/skills/pronounce-button/scripts/generate-pronunciation.py "Phonetic-spelling" -o docs/audio/term.mp3

# SSML (Tier 3)
python3 ~/.claude/skills/pronounce-button/scripts/generate-pronunciation.py "term" --ssml "CMU ARPABET STRING" -o docs/audio/term.mp3
```

Requires `ELEVENLABS_API_KEY` in the environment.

## CMU Arpabet Reference

CMU Arpabet (Carnegie Mellon University Arpabet) is a phonetic notation system
that represents English pronunciations using ASCII characters. Each sound in a
word is written as a one- or two-letter code, and vowels carry a stress digit.

### Stress Markers (required on all vowels)

| Marker | Meaning | Example |
|---|---|---|
| `0` | No stress (unstressed) | The "a" in "about" → `AH0` |
| `1` | Primary stress | The "o" in "phoneme" → `OW1` |
| `2` | Secondary stress | The first "a" in "acrocarpous" → `AE2` |

### Vowels

| Arpabet | IPA | Example Word | In Context |
|---|---|---|---|
| `AA` | ɑ | b**o**t | `B AA1 T` |
| `AE` | æ | b**a**t | `B AE1 T` |
| `AH` | ʌ/ə | b**u**t / **a**bout | `B AH1 T` |
| `AO` | ɔ | b**ough**t | `B AO1 T` |
| `AW` | aʊ | b**ou**t | `B AW1 T` |
| `AY` | aɪ | b**i**te | `B AY1 T` |
| `EH` | ɛ | b**e**t | `B EH1 T` |
| `ER` | ɝ | b**ir**d | `B ER1 D` |
| `EY` | eɪ | b**a**it | `B EY1 T` |
| `IH` | ɪ | b**i**t | `B IH1 T` |
| `IY` | i | b**ea**t | `B IY1 T` |
| `OW` | oʊ | b**oa**t | `B OW1 T` |
| `OY` | ɔɪ | b**oy** | `B OY1` |
| `UH` | ʊ | b**oo**k | `B UH1 K` |
| `UW` | u | b**oo**t | `B UW1 T` |

### Consonants

| Arpabet | IPA | Example | Arpabet | IPA | Example |
|---|---|---|---|---|---|
| `B` | b | **b**uy | `P` | p | **p**ie |
| `CH` | tʃ | **ch**air | `R` | r | **r**un |
| `D` | d | **d**ie | `S` | s | **s**it |
| `DH` | ð | **th**e | `SH` | ʃ | **sh**e |
| `F` | f | **f**ight | `T` | t | **t**ie |
| `G` | ɡ | **g**uy | `TH` | θ | **th**ink |
| `HH` | h | **h**igh | `V` | v | **v**ine |
| `JH` | dʒ | **j**oy | `W` | w | **w**ine |
| `K` | k | **k**ite | `Y` | j | **y**es |
| `L` | l | **l**ie | `Z` | z | **z**oo |
| `M` | m | **m**y | `ZH` | ʒ | vi**s**ion |
| `N` | n | **n**o | `NG` | ŋ | si**ng** |

### How to Build an Arpabet String

1. **Break the word into syllables:** e.g., "acrocarpous" → ac·ro·car·pous
2. **Map each sound to an Arpabet code:** `AE K R OW K AA R P AH S`
3. **Add stress markers to each vowel:**
    - Primary stress (`1`) on the loudest syllable
    - Secondary stress (`2`) on any syllable with moderate emphasis
    - Unstressed (`0`) on all others
    - Result: `AE2 K R OW0 K AA1 R P AH0 S`
4. **Separate all codes with spaces**

### Worked Examples from This Project

**Evapotranspiration** (ee-VAP-oh-tran-spir-AY-shun):
```
IH0 V AE2 P OW0 T R AE2 N S P ER0 EY1 SH AH0 N
```
- `IH0` = unstressed "ih" (e-)
- `V AE2 P` = secondary stress "-VAP-"
- `OW0` = unstressed "-oh-"
- `T R AE2 N S P ER0` = "-tran-spir-"
- `EY1 SH AH0 N` = primary stress "-AY-shun"

**Gametophyte** (gah-MEE-toh-fyte):
```
G AH0 M IY1 T AH0 F AY2 T
```
- `G AH0` = unstressed "gah-"
- `M IY1` = primary stress "-MEE-"
- `T AH0` = unstressed "-toh-"
- `F AY2 T` = secondary stress "-fyte"
