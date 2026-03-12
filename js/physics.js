// =========================================
// FIRE NINJA — physics.js  (Arcade Engine)
// =========================================

// ---- Spawner loop (single chain guard) ----
let _spawnerRunning = false;
let spawnRate = 1500;

function startSpawnerOnce() {
    if (_spawnerRunning) return; // FIX: prevent multiple concurrent chains
    _spawnerRunning = true;
    spawnerLoop();
}

function spawnerLoop() {
    if (isGameOver) { _spawnerRunning = false; return; }
    if (!isPaused) {
        spawnFireball();
        const base = Math.max(400, 1500 - score / 100);
        spawnRate  = base + Math.random() * 500;
    }
    setTimeout(spawnerLoop, spawnRate);
}

// ---- Fireball spawner ----
/**
 * @param {boolean} noBombs - true during meteor shower to keep it fun
 */
function spawnFireball(noBombs = false) {
    const fireball = document.createElement('div');
    fireball.className = 'fireball-target';

    // Determine type
    const rand = Math.random();
    let type = 'normal';
    if (!noBombs && rand < 0.1) {
        type = 'bomb';
        fireball.classList.add('target-bomb');
    } else if (rand < 0.3) {
        type = 'star';
        fireball.classList.add('target-star');
    }

    // Start position
    const startX = Math.random() * (window.innerWidth - 120) + 10;
    let x = startX, y = window.innerHeight;

    // Physics per type
    let vx = (Math.random() - 0.5) * 8;
    let vy = -(Math.random() * 8 + 12);
    let g  = 0.2;
    if (type === 'star')  { vy = -(Math.random() * 5 + 18); g = 0.30; }
    if (type === 'bomb')  { vy = -(Math.random() * 4 + 7);  g = 0.08; }

    fireball.style.left = `${x}px`;
    fireball.style.top  = `${y}px`;
    playArea.appendChild(fireball);

    let isHit = false;

    // ---- Hit handler ----
    const hitAction = () => {
        if (isHit || isPaused || isGameOver) return;
        isHit = true;

        if (type === 'bomb') {
            if (shieldActive) {
                // FIX: correct selector — shield is in #upg-shield, not #skill-shield
                shieldActive = false;
                const shieldBtn = document.querySelector('#upg-shield .buy-btn');
                if (shieldBtn) shieldBtn.style.display = 'block';
                shieldStatus.classList.add('hidden');
                updateShopUI();
                playSound(0.5, 0.8);
                createFloatingText(x, y - 40, 'SHIELD BROKEN', '#00ffcc');
            } else {
                gameOver();
            }
            fireball.remove();
            return;
        }

        // Scoring: FIX — add score ONCE here, triggerHitEffects does NOT add score
        const multiplier   = type === 'star' ? 5 : 1;
        const pointsGained = Math.floor(baseScore * combo * multiplier);
        score  += pointsGained;
        number += pointsGained;
        scoreDisplay.textContent  = score;
        numberDisplay.textContent = number;

        // Audio — pitch scales with combo; stars get extra high squeak
        const pitch = 1 + Math.min(combo, 20) * 0.05 + (type === 'star' ? 1.0 : 0);
        playSound(pitch);

        // Visual effects
        triggerHitEffects(x, y, pointsGained);
        fireball.remove();
    };

    fireball.addEventListener('mousedown', hitAction);
    fireball.addEventListener('mouseenter', (e) => { if (e.buttons === 1) hitAction(); });

    // ---- Physics loop ----
    function tick() {
        if (isHit || isGameOver) return;

        if (!isPaused && !isTimeFrozen) {
            vy += g;
            x  += vx;
            y  += vy;
            fireball.style.left = `${x}px`;
            fireball.style.top  = `${y}px`;

            // Spirit Blade auto-slash (on the way down, mid-air)
            if (autoSlashActive && type !== 'bomb' && vy > 0) {
                hitAction();
                return;
            }

            // Off-screen miss
            if (y > window.innerHeight + 120) {
                fireball.remove();
                if (type !== 'bomb') breakCombo();
                return;
            }
        }

        requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
}
