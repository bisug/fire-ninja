// =========================================
// FIRE NINJA — skills.js  (Active Skills)
// =========================================

window.triggerSkill = function(type) {
    if (isPaused || isGameOver) return;
    if (score < costs[type]) return;

    score -= costs[type];
    scoreDisplay.textContent = score;
    updateShopUI();

    switch (type) {
        case 'nova': {
            // Obliterate all non-bomb targets
            const targets = document.querySelectorAll('.fireball-target:not(.target-bomb)');
            if (targets.length === 0) { score += costs[type]; scoreDisplay.textContent = score; updateShopUI(); return; } // refund if nothing to hit

            playArea.classList.add('maka-bosada-mode');
            setTimeout(() => playArea.classList.remove('maka-bosada-mode'), 500);
            playSound(0.5, 1.0);

            targets.forEach(fb => {
                const rect  = fb.getBoundingClientRect();
                const cx    = rect.left + rect.width / 2;
                const cy    = rect.top  + rect.height / 2;
                const pts   = Math.floor(baseScore * combo);
                score  += pts;
                number += pts;
                triggerHitEffects(cx, cy, pts);
                fb.remove();
            });
            scoreDisplay.textContent  = score;
            numberDisplay.textContent = number;
            break;
        }

        case 'freeze': {
            isTimeFrozen = true;
            playArea.style.filter = 'hue-rotate(180deg)';
            playSound(3.0, 0.5);
            createFloatingText(window.innerWidth / 2 - 60, window.innerHeight / 2, '❄ FREEZE ❄', '#88ccff');
            setTimeout(() => {
                isTimeFrozen = false;
                playArea.style.filter = 'none';
                playSound(0.7, 0.4);
            }, 5000);
            break;
        }

        case 'meteor': {
            playSound(0.8, 1.0);
            playArea.classList.add('fire-flash');
            setTimeout(() => playArea.classList.remove('fire-flash'), 200);
            createFloatingText(window.innerWidth / 2 - 60, window.innerHeight / 2, '☄ METEOR!', '#ffcc00');
            for (let i = 0; i < 10; i++) {
                // stagger spawns; noBombs=true prevents bomb spawns during shower
                setTimeout(() => spawnFireball(true), i * 120);
            }
            break;
        }

        case 'spirit': {
            autoSlashActive = true;
            playSound(2.0, 0.8);
            createFloatingText(window.innerWidth / 2 - 80, window.innerHeight / 2, '⚔ SPIRIT BLADE ⚔', '#00ffcc');
            setTimeout(() => {
                autoSlashActive = false;
                createFloatingText(window.innerWidth / 2 - 60, window.innerHeight / 2 + 50, 'Blade faded', '#888');
            }, 5000);
            break;
        }
    }
};
