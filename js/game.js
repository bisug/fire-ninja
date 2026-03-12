// =========================================
// FIRE NINJA — game.js  (State & Lifecycle)
// =========================================

// ---- Game variables ----
let number = 0;
let score  = 0;
let combo  = 1;
let comboTimer;

let isPaused    = true;   // Start paused for intro
let isGameOver  = false;
let isTimeFrozen = false;
let autoSlashActive = false;

// ---- Player stats ----
let baseScore       = 1;
let autoSparkValue  = 0;
let bellowsMultiplier = 1;
let shieldActive    = false;
let currentRankIndex = 0;

// ---- Upgrade / Skill costs ----
const costs = {
    baseFire : 50,
    autoSpark: 200,
    shield   : 5000,
    nova     : 1000,
    freeze   : 2000,
    meteor   : 3000,
    spirit   : 8000
};

// ---- Ranks ----
const ranks = [
    { name: 'Spark',          req: 0     },
    { name: 'Ember',          req: 500   },
    { name: 'Blaze',          req: 2000  },
    { name: 'Inferno',        req: 10000 },
    { name: 'Maka Bosada Aag',req: 50000 }
];

// ---- DOM refs ----
const numberDisplay  = document.getElementById('number');
const scoreDisplay   = document.getElementById('score');
const rankDisplay    = document.getElementById('rank-name');
const comboContainer = document.getElementById('combo-container');
const comboDisplay   = document.getElementById('combo');
const playArea       = document.getElementById('play-area');
const missOverlay    = document.getElementById('miss-overlay');
const stateOverlay   = document.getElementById('game-state-overlay');
const stateTitle     = document.getElementById('state-title');
const stateDesc      = document.getElementById('state-desc');
const menusContainer = document.getElementById('menus-container');
const pauseToggleBtn = document.getElementById('pause-toggle');
const shieldStatus   = document.getElementById('shield-status');
const makaAudio      = document.getElementById('maka-audio');

// =========================================
//  COMBO
// =========================================
function handleCombo() {
    combo++;
    comboDisplay.textContent = `x${combo}`;
    comboContainer.classList.remove('hidden');

    comboDisplay.style.transform = 'scale(1.5)';
    setTimeout(() => { comboDisplay.style.transform = 'scale(1)'; }, 100);

    clearTimeout(comboTimer);

    const timerBar = comboContainer.querySelector('.combo-timer-bar');
    timerBar.style.transition = 'none';
    timerBar.style.transform  = 'scaleX(1)';
    void timerBar.offsetWidth;
    timerBar.style.transition = `transform ${2 * bellowsMultiplier}s linear`;
    timerBar.style.transform  = 'scaleX(0)';

    comboTimer = setTimeout(() => {
        combo = 1;
        comboContainer.classList.add('hidden');
    }, 2000 * bellowsMultiplier);
}

function breakCombo() {
    clearTimeout(comboTimer);
    combo = 1;
    comboContainer.classList.add('hidden');

    missOverlay.classList.remove('miss-flash');
    void missOverlay.offsetWidth;
    missOverlay.classList.add('miss-flash');
}

// =========================================
//  RANK
// =========================================
function updateRank() {
    if (currentRankIndex < ranks.length - 1) {
        if (score >= ranks[currentRankIndex + 1].req) {
            currentRankIndex++;
            rankDisplay.textContent = ranks[currentRankIndex].name;

            if (ranks[currentRankIndex].name === 'Maka Bosada Aag') {
                document.body.classList.add('maka-bosada-mode');
                makaAudio.preservesPitch = false;
                makaAudio.playbackRate   = 0.2;
                makaAudio.volume         = 1.0;
                makaAudio.play().catch(() => {});
            }
        }
    }
}

// =========================================
//  SHOP UI
// =========================================
function updateShopUI() {
    document.getElementById('cost-base-fire').textContent  = costs.baseFire;
    document.getElementById('cost-auto-spark').textContent = costs.autoSpark;
    document.getElementById('cost-nova').textContent    = costs.nova;
    document.getElementById('cost-freeze').textContent  = costs.freeze;
    document.getElementById('cost-meteor').textContent  = costs.meteor;
    document.getElementById('cost-spirit').textContent  = costs.spirit;
    document.getElementById('cost-shield').textContent  = costs.shield;

    document.querySelector('#upg-base-fire .buy-btn').disabled  = score < costs.baseFire;
    document.querySelector('#upg-auto-spark .buy-btn').disabled = score < costs.autoSpark;
    document.querySelector('#skill-nova .buy-btn').disabled     = score < costs.nova;
    document.querySelector('#skill-freeze .buy-btn').disabled   = score < costs.freeze;
    document.querySelector('#skill-meteor .buy-btn').disabled   = score < costs.meteor;
    document.querySelector('#skill-spirit .buy-btn').disabled   = score < costs.spirit;

    const shieldBtn = document.querySelector('#upg-shield .buy-btn');
    if (shieldActive) {
        shieldBtn.style.display = 'none';
        shieldStatus.classList.remove('hidden');
    } else {
        shieldBtn.style.display = 'block';
        shieldBtn.disabled = score < costs.shield;
        shieldStatus.classList.add('hidden');
    }
}

// =========================================
//  INTRO GUIDE
// =========================================
window.closeIntro = function() {
    document.getElementById('intro-guide').classList.add('hidden');
    isPaused = false;
    startSpawnerOnce(); // safe single start
};

// =========================================
//  PAUSE / RESUME  (Unified Spacebar)
// =========================================
window.togglePause = function() {
    if (isGameOver) return;
    if (!document.getElementById('intro-guide').classList.contains('hidden')) return;

    isPaused = !isPaused;
    menusContainer.classList.toggle('open', isPaused);

    if (isPaused) {
        stateOverlay.classList.remove('hidden');
        stateTitle.textContent  = 'PAUSED';
        stateTitle.style.color  = '#ffcc00';
        stateDesc.textContent   = 'Press Space to resume.';
        pauseToggleBtn.textContent = '▶ Resume [Space]';
        pauseToggleBtn.classList.add('active');
    } else {
        stateOverlay.classList.add('hidden');
        pauseToggleBtn.textContent = '⏸ Pause & Shop [Space]';
        pauseToggleBtn.classList.remove('active');
        startSpawnerOnce(); // re-start after unpause
    }
};

// =========================================
//  GAME OVER
// =========================================
function gameOver() {
    new Audio('assets/audio/boom.mp3').play().catch(() => {});
    isGameOver = true;

    stateOverlay.classList.remove('hidden');
    stateTitle.textContent  = 'GAME OVER';
    stateTitle.style.color  = '#ff0000';
    stateDesc.textContent   = 'You hit a Bomb! Click anywhere to restart.';

    playArea.classList.add('maka-bosada-mode');
    setTimeout(() => playArea.classList.remove('maka-bosada-mode'), 1000);

    stateOverlay.onclick = restartGame;
}

function restartGame() {
    score             = 0;
    number            = 0;
    combo             = 1;
    baseScore         = 1;
    autoSparkValue    = 0;
    bellowsMultiplier = 1;
    shieldActive      = false;
    isGameOver        = false;
    isPaused          = false;
    currentRankIndex  = 0;   // FIX: reset rank
    isTimeFrozen      = false;
    autoSlashActive   = false;

    // Clean up ultimate mode CSS
    document.body.classList.remove('maka-bosada-mode');

    stateOverlay.classList.add('hidden');
    stateOverlay.onclick = null;

    scoreDisplay.textContent   = score;
    numberDisplay.textContent  = number;
    rankDisplay.textContent    = ranks[0].name;
    comboContainer.classList.add('hidden');

    pauseToggleBtn.textContent = '⏸ Pause & Shop [Space]';
    pauseToggleBtn.classList.remove('active');
    menusContainer.classList.remove('open');

    document.querySelectorAll('.fireball-target').forEach(t => t.remove());
    updateShopUI();
    startSpawnerOnce();
}

// =========================================
//  BUY / UPGRADE
// =========================================
window.buyUpgrade = function(type) {
    if (score < costs[type]) return;
    score -= costs[type];

    switch (type) {
        case 'baseFire':
            baseScore++;
            costs.baseFire = Math.floor(costs.baseFire * 1.5);
            break;
        case 'autoSpark':
            autoSparkValue++;
            costs.autoSpark = Math.floor(costs.autoSpark * 1.5);
            break;
        case 'shield':
            shieldActive = true;
            costs.shield = Math.floor(costs.shield * 1.5);
            break;
    }

    scoreDisplay.textContent = score;
    updateShopUI();
};

// Auto-Spark
setInterval(() => {
    if (isPaused || isGameOver || autoSparkValue === 0) return;
    score  += autoSparkValue;
    number += autoSparkValue;
    numberDisplay.textContent = number;
    scoreDisplay.textContent  = score;
    updateRank();
    updateShopUI();
}, 1000);

// =========================================
//  KEYBOARD SHORTCUTS
// =========================================
document.addEventListener('keydown', (e) => {
    if (e.key === ' ' && e.target === document.body) {
        e.preventDefault();
        window.togglePause();
    } else if (!isPaused && !isGameOver) {
        if (e.key === 'a' || e.key === 'A') window.triggerSkill('nova');
        else if (e.key === 's' || e.key === 'S') window.triggerSkill('freeze');
        else if (e.key === 'd' || e.key === 'D') window.triggerSkill('meteor');
        else if (e.key === 'w' || e.key === 'W') window.triggerSkill('spirit');
    }
});
