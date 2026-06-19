// ═══════════════════════════════════════════
// Animations — Love Page for Paul
// ═══════════════════════════════════════════

(function () {
    'use strict';

    // ── Floating Hearts ──
    const heartsContainer = document.getElementById('floatingHearts');
    const heartEmojis = ['💖', '💜', '💗', '✨', '💕', '🤍', '💫'];

    function createHeart() {
        const heart = document.createElement('span');
        heart.classList.add('floating-heart');
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];

        const left = Math.random() * 100;
        const duration = 6 + Math.random() * 8;
        const size = 0.8 + Math.random() * 1.2;

        heart.style.left = `${left}%`;
        heart.style.animationDuration = `${duration}s`;
        heart.style.fontSize = `${size}rem`;
        heart.style.animationDelay = `${Math.random() * 2}s`;

        heartsContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, (duration + 2) * 1000);
    }

    // Launch hearts periodically
    setInterval(createHeart, 1200);

    // Create a few immediately
    for (let i = 0; i < 5; i++) {
        setTimeout(createHeart, i * 300);
    }

    // ── Sparkles / Stars ──
    const sparkleContainer = document.getElementById('sparkles');
    const sparkleCount = 40;

    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');

        sparkle.style.left = `${Math.random() * 100}%`;
        sparkle.style.top = `${Math.random() * 100}%`;
        sparkle.style.animationDuration = `${2 + Math.random() * 4}s`;
        sparkle.style.animationDelay = `${Math.random() * 5}s`;
        sparkle.style.width = `${2 + Math.random() * 3}px`;
        sparkle.style.height = sparkle.style.width;

        const colors = ['#ff6b9d', '#c44dff', '#6b9dff', '#a78bfa', '#ffffff'];
        sparkle.style.background = colors[Math.floor(Math.random() * colors.length)];

        sparkleContainer.appendChild(sparkle);
    }

    // ── Mouse Trail Glow ──
    document.addEventListener('mousemove', (e) => {
        const glow = document.createElement('div');
        glow.style.cssText = `
            position: fixed;
            left: ${e.clientX - 4}px;
            top: ${e.clientY - 4}px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(196,77,255,0.6), transparent);
            pointer-events: none;
            z-index: 9999;
            animation: trailFade 0.8s ease-out forwards;
        `;
        document.body.appendChild(glow);
        setTimeout(() => glow.remove(), 800);
    });

    // Add trail animation
    const trailStyle = document.createElement('style');
    trailStyle.textContent = `
        @keyframes trailFade {
            from { opacity: 1; transform: scale(1); }
            to { opacity: 0; transform: scale(3); }
        }
    `;
    document.head.appendChild(trailStyle);

})();
