# Oil Fever '89 🛢️🔥

An original homage to late-80s oil-tycoon arcade mini-games — pick a rig, drill for crude, race pipeline against the clock, or fight a wellhead fire. Chunky 320×200 pixel art, an original 4-tune chiptune soundtrack, full English/German toggle.

**▶ Play it here: `https://github.freaxnx01.ch/game-oil-fever-89/`**

![16-color pixel art](https://img.shields.io/badge/style-320%C3%97200%20pixel%20art-f0c838) ![Single file](https://img.shields.io/badge/build-none%20needed-8fd8e8) ![License](https://img.shields.io/badge/license-MIT-bfe3b2)

## Features

- **3 self-contained mini-games**, arcade-cabinet menu to pick one: Drilling, Pipeline, Firefighting
- **Drilling** — steer the bit around rock and boulders, watch the STRESS meter, reach the oil pocket before the drill string snaps
- **Pipeline** — lay pipe on an 8×5 grid to route oil to the tank before the well flow catches an unconnected joint
- **Firefighting** — plant timed dynamite near a burning derrick and get clear before it detonates, without overheating or running out of charges
- **No scoring** — a pure toy/arcade loop: play → win or fail → retry or back to menu
- **Original chiptune soundtrack** (4 tunes) and all sound effects synthesized live via Web Audio — no audio files
- **Procedural pixel art** — every visual, including the menu banner and game icons, is drawn to canvas at runtime — no image files
- **English/German UI toggle**, with music/SFX mute chips, all persisted to `localStorage`
- CRT-style scanline overlay and beveled "workbench" arcade-cabinet chrome

## Controls

| Input | Action |
|---|---|
| Arrow keys / A-D | Steer / walk (per game) |
| Mouse (hold) | Steer/move toward pointer |
| Space | Start / plant dynamite / place pipe / confirm overlay action |
| Esc | Back to menu from any game |

## Running locally

Open `index.html` in any modern browser — that's it. No build step, no dependencies, no internet connection required (fonts/audio/art are all generated in-code, aside from the Google Font `<link>`).

## Tech

Plain HTML/CSS/vanilla JS, framework-free. `games.js` holds the three game engines and all Canvas2D pixel-art painters; `audio.js` is a small Web Audio step-sequencer/tracker plus one-shot SFX; `index.html` is the arcade-cabinet shell (menu, HUD toolbar, instruction/result overlays) and the shell's own tiny state machine.

## License

MIT — see [LICENSE](LICENSE).
