// =========================================
// FIRE NINJA — audio.js  (Sound Engine)
// =========================================

// Pre-warm a pool of Audio objects for rapid playback without lag
const AUDIO_POOL_SIZE = 8;
const audioPool = Array.from({ length: AUDIO_POOL_SIZE }, () => {
    const a = new Audio('assets/audio/click.mp3');
    a.preload = 'auto';
    return a;
});
let poolIndex = 0;

/**
 * Play click.mp3 at a dynamic pitch and volume.
 * @param {number} pitch  - playbackRate (0.1 = very low boom, 3.0 = high squeak)
 * @param {number} volume - 0.0 to 1.0
 */
function playSound(pitch = 1.0, volume = 1.0) {
    const sound = audioPool[poolIndex];
    poolIndex = (poolIndex + 1) % AUDIO_POOL_SIZE;

    sound.currentTime  = 0;
    sound.preservesPitch = false;
    sound.playbackRate = Math.max(0.1, Math.min(pitch, 4.0)); // clamp to safe range
    sound.volume       = Math.max(0, Math.min(volume, 1.0));
    sound.play().catch(() => {});
}
