<div align="center">

<img src="https://img.shields.io/badge/version-1.0.0-orange?style=for-the-badge" />
<img src="https://img.shields.io/badge/license-MIT-red?style=for-the-badge" />
<img src="https://img.shields.io/badge/built%20with-Vanilla%20JS-yellow?style=for-the-badge&logo=javascript" />
<img src="https://img.shields.io/badge/platform-Web%20Browser-blue?style=for-the-badge&logo=googlechrome" />

<img src="https://img.shields.io/github/stars/Pramesh-Bhurtel/Fire-Ninja?style=for-the-badge&color=orange" />
<img src="https://img.shields.io/github/forks/Pramesh-Bhurtel/Fire-Ninja?style=for-the-badge&color=red" />
<img src="https://img.shields.io/github/last-commit/Pramesh-Bhurtel/Fire-Ninja?style=for-the-badge&color=yellow" />
<img src="https://img.shields.io/github/repo-size/Pramesh-Bhurtel/Fire-Ninja?style=for-the-badge&color=blue" />

# 🔥 Fire Ninja
### *Maka Bosada Aag*

**A high-intensity, browser-based arcade slash game.**  
Slice through waves of fireballs. Earn power. Climb the ranks. Become the legend.

[▶ Play Now](#installation--usage) · [📖 Read the Docs](#game-overview) · [🤝 Contribute](#contributing) · [🐛 Report a Bug](https://github.com/Pramesh-Bhurtel/Fire-Ninja/issues)

---

</div>

## Table of Contents

- [Game Overview](#game-overview)
- [Features](#features)
- [Gameplay Mechanics](#gameplay-mechanics)
  - [Target Types](#target-types)
  - [Power-up Orbs](#power-up-orbs)
  - [Active Skills](#active-skills)
  - [Progression & Ranks](#progression--ranks)
  - [The Shop](#the-shop)
- [Controls](#controls)
- [Technical Architecture](#technical-architecture)
- [Installation & Usage](#installation--usage)
- [Contributing](#contributing)
- [License](#license)

---

## Game Overview

**Fire Ninja** is a fast-paced, skill-based arcade game inspired by classic fruit-slicing mechanics — reborn in pure flame. Your goal is straightforward: **slash fireballs, dodge bombs, and rise through the ranks** until you achieve the legendary title of *Maka Bosada Aag* (The Ultimate Fire Master).

As you play, you earn **Power** (in-game currency) and **XP** for every target you slice. Power is spent in the in-game shop on passive upgrades and active skills that unlock as you level up. Your high score persists across sessions — your legacy is eternal, even if your current run is not.

> **One wrong slice on a bomb resets all session progress to zero.**  
> Only your High Score survives.

---

## Features

| Feature | Description |
|---|---|
| 🎯 **Dynamic Combo System** | Chain slices to multiply your score. Hitting a 15× combo triggers the devastating **Fire Ultimate** visual effect. |
| 🏆 **5-Tier Rank System** | Progress through five distinct ranks with escalating difficulty and prestige. |
| 🛒 **In-Game Shop** | Spend earned Power on passive upgrades and unlock powerful active abilities. |
| 💾 **Persistent Progress** | Your level, high score, and purchased upgrades are automatically saved via `localStorage`. |
| 🎆 **Visual Excellence** | SVG-powered fire textures, particle burst explosions, screen-shake feedback, and rank-specific visual modes. |
| 🔊 **Adaptive Audio** | A dynamic sound engine with pitch-shifting that responds to your current combo multiplier. |
| 📱 **Touch Support** | Full touch-drag slicing support for mobile and tablet browsers. |

---

## Gameplay Mechanics

### Target Types

Understanding what to slice — and what to *never* slice — is the foundation of every run.

| Target | Icon | Rarity | Reward | Risk |
|---|:---:|---|---|---|
| **Normal Fireball** | 🔥 | Common | Base XP & Power | None |
| **Golden Star** | ⭐ | Rare | **5× base points** | None |
| **Bomb** | 💣 | Occasional | — | **Ends the run instantly** |

> **Shield Exception:** If you have an active Shield power-up, slicing one bomb will consume the shield instead of ending your run.

---

### Power-up Orbs

Special orbs fall periodically and grant temporary bonuses when sliced. Each orb has a distinct visual signature — learn to recognize them at speed.

| Orb | Effect | Duration |
|---|---|:---:|
| 🔥 **Fire Boost** | Multiplies all Power earned by **5×** | 10 seconds |
| ⏳ **Slow Motion** | Freezes all active targets in place | 5 seconds |
| 🛡️ **Shield** | Absorbs the next bomb hit without ending the run | Until used |
| 💥 **Score Burst** | Instantly grants a large, flat XP and Power bonus | Instant |

---

### Active Skills

Active skills are unlocked as you level up and are purchased from the Shop. Once acquired, they are activated mid-game using keyboard shortcuts.

| Skill | Key | Unlock Level | Description |
|---|:---:|:---:|---|
| **Fire Nova** | `A` | Level 1 | Obliterates all non-bomb targets currently on screen in a single burst. |
| **Time Freeze** | `S` | Level 5 | Halts all falling targets in mid-air for 5 seconds, allowing safe, deliberate slicing. |
| **Meteor Shower** | `D` | Level 10 | Rapidly spawns a wave of 10 guaranteed non-bomb targets for a burst of easy points. |
| **Spirit Blade** | `W` | Level 15 | Activates an auto-slashing spectral blade that automatically hits falling targets for 5 seconds. |

> Each skill has a **cooldown** after use. Manage them wisely — burning a skill at the wrong moment can cost you a run.

---

### Progression & Ranks

Your rank is determined by your current **Level**, which increases as you accumulate **XP**. With each rank comes a new title, a distinct visual identity, and a greater challenge.

```
Level  1–4   ✨  Spark          — You're just getting started. The flame is small.
Level  5–9   🔥  Ember          — The fire grows. Combos start to matter.
Level 10–14  ☄️  Blaze          — Targets spawn faster. Your skills become essential.
Level 15–19  🌋  Inferno        — The screen is chaos. Only the skilled survive.
Level  20+   👑  Maka Bosada Aag — The pinnacle. The Ultimate Fire Master. You have arrived.
```

Advancing through ranks progressively increases:
- **Spawn rate** — Targets appear more frequently.
- **Target velocity** — Objects fall faster and follow less predictable arcs.
- **Bomb frequency** — The proportion of bombs among spawned targets rises.

---

### The Shop

Press `Space` to **pause the game and open the Shop** at any time. The Shop is divided into two categories:

- **Passive Upgrades** — Permanent bonuses that apply to the entire session (e.g., increased base Power per slice, reduced skill cooldowns, higher combo multiplier caps).
- **Active Skills** — One-time purchases that unlock the skill slot for use in-game. Skills must be unlocked at the appropriate level before they can be purchased.

Upgrades persist between runs via `localStorage`.

---

## Controls

| Action | Input |
|---|---|
| **Slash a target** | `Mouse Click & Drag` or `Touch & Drag` |
| **Pause / Open Shop** | `Space` |
| **Fire Nova** | `A` |
| **Time Freeze** | `S` |
| **Meteor Shower** | `D` |
| **Spirit Blade** | `W` |

---

## Technical Architecture

Fire Ninja is built with **zero dependencies** — pure HTML5, CSS3, and vanilla JavaScript. The codebase is organized into clearly separated modules for maintainability and scalability.

```
fire-ninja/
├── index.html          # Core layout, HUD elements, and inline SVG filter definitions
├── css/
│   └── style.css       # All styling, keyframe animations, and rank-specific visual themes
└── js/
    ├── game.js         # Central state machine: session data, XP/level logic, save/load (localStorage)
    ├── physics.js      # Arcade engine: target spawning, gravity simulation, trajectory arcs, hit detection
    ├── skills.js       # Active ability logic: Fire Nova, Time Freeze, Meteor Shower, Spirit Blade
    ├── effects.js      # Visual feedback: particle systems, floating score text, screen shake
    └── audio.js        # Adaptive sound engine: combo-driven pitch shifting, SFX management
```

### Key Technical Decisions

- **Rendering:** All game objects are rendered on an HTML5 `<canvas>` element for smooth, high-performance animation.
- **SVG Filters:** Fire and glow textures are applied using SVG `<feTurbulence>` and `<feDisplacementMap>` filters defined inline in `index.html`, avoiding external assets.
- **Hit Detection:** The slash gesture is tracked as a polyline. Collision is tested by checking whether any segment of the polyline intersects the bounding circle of each active target.
- **State Persistence:** `game.js` serializes the player's level, high score, and purchased upgrades to `localStorage` on every state change.
- **Audio Pitch Shifting:** `audio.js` uses the Web Audio API's `playbackRate` property to shift sound pitch dynamically, creating an escalating audio feedback loop tied to the combo multiplier.

---

## Installation & Usage

No build tools, bundlers, or package managers are required. Fire Ninja runs entirely in the browser.

**1. Clone the repository**

```bash
git clone https://github.com/Pramesh-Bhurtel/Fire-Ninja.git
cd Fire-Ninja
```

**2. Launch the game**

Simply open `index.html` in any modern browser (Chrome, Firefox, Edge, Safari):

```bash
# macOS
open index.html

# Linux
xdg-open index.html

# Windows
start index.html
```

> **Recommended:** Run via a local HTTP server to avoid browser CORS restrictions on audio assets.
>
> ```bash
> # Using Node.js http-server
> npx http-server ./
>
> # Using Python
> python -m http.server 8080
> ```
>
> Then navigate to `http://localhost:8080` in your browser.

**Browser Compatibility**

| Browser | Version | Status |
|---|:---:|:---:|
| Google Chrome | 90+ | ✅ Fully Supported |
| Mozilla Firefox | 88+ | ✅ Fully Supported |
| Microsoft Edge | 90+ | ✅ Fully Supported |
| Safari | 14+ | ✅ Fully Supported |
| Mobile (iOS/Android) | Modern | ✅ Touch Supported |

---

## Contributing

Contributions are welcome and appreciated. Please follow the steps below to maintain code quality and consistency.

**1. Fork the repository and create your feature branch**

```bash
git checkout -b feature/your-feature-name
```

**2. Make your changes**

- Follow the existing modular file structure.
- Keep new logic in the appropriate module (`physics.js` for spawning/collision, `skills.js` for abilities, etc.).
- Test across at least Chrome and Firefox before submitting.

**3. Commit with a descriptive message**

```bash
git commit -m "feat: add ricochet fireball target type"
```

**4. Push and open a Pull Request**

```bash
git push origin feature/your-feature-name
```

Then open a Pull Request against the `main` branch on GitHub. Please include a brief description of what your change does and why.

**Reporting Bugs**

If you encounter a bug, please [open an issue](https://github.com/Pramesh-Bhurtel/Fire-Ninja/issues) with:
- A description of the problem and steps to reproduce it.
- Your browser name and version.
- Any relevant console errors (open DevTools → Console).

---

## Contributors

Thanks to everyone who has contributed to Fire Ninja!

<a href="https://github.com/Pramesh-Bhurtel/Fire-Ninja/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Pramesh-Bhurtel/Fire-Ninja" />
</a>

---

## License

This project is distributed under the **MIT License**. See the [`LICENSE`](LICENSE) file for details.

---

<div align="center">

*Built with fire. Play with fury. Become the* ***Maka Bosada Aag.***

</div>
