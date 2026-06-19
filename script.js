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

    // ── Days Counter ──
    const startDate = new Date('2024-06-08T00:00:00');

    function updateCounter() {
        const now = new Date();
        const diff = now - startDate;

        if (diff < 0) return;

        // Calculate years, months, days
        let years = now.getFullYear() - startDate.getFullYear();
        let months = now.getMonth() - startDate.getMonth();
        let days = now.getDate() - startDate.getDate();
        let hours = now.getHours() - startDate.getHours();
        let minutes = now.getMinutes() - startDate.getMinutes();
        let seconds = now.getSeconds() - startDate.getSeconds();

        if (seconds < 0) { seconds += 60; minutes--; }
        if (minutes < 0) { minutes += 60; hours--; }
        if (hours < 0) { hours += 24; days--; }
        if (days < 0) {
            const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
            days += prevMonth.getDate();
            months--;
        }
        if (months < 0) { months += 12; years--; }

        const elYears = document.getElementById('counterYears');
        const elMonths = document.getElementById('counterMonths');
        const elDays = document.getElementById('counterDays');
        const elHours = document.getElementById('counterHours');
        const elMinutes = document.getElementById('counterMinutes');
        const elSeconds = document.getElementById('counterSeconds');

        if (elYears) elYears.textContent = years;
        if (elMonths) elMonths.textContent = months;
        if (elDays) elDays.textContent = days;
        if (elHours) elHours.textContent = String(hours).padStart(2, '0');
        if (elMinutes) elMinutes.textContent = String(minutes).padStart(2, '0');
        if (elSeconds) elSeconds.textContent = String(seconds).padStart(2, '0');
    }

    // Only run counter if elements exist (index.html only)
    if (document.getElementById('counterYears')) {
        updateCounter();
        setInterval(updateCounter, 1000);
    }

    // ── Te Amo Button ──
    const teAmoBtn = document.getElementById('teAmoBtn');
    const teAmoCountEl = document.getElementById('teAmoCount');
    const teAmoBurst = document.getElementById('teAmoBurst');

    if (teAmoBtn && teAmoCountEl) {
        // Load saved count
        let teAmoTotal = parseInt(localStorage.getItem('teAmoCount') || '0', 10);
        teAmoCountEl.textContent = teAmoTotal;

        teAmoBtn.addEventListener('click', () => {
            // Increment and save
            teAmoTotal++;
            teAmoCountEl.textContent = teAmoTotal;
            localStorage.setItem('teAmoCount', teAmoTotal);

            // Button pop animation
            teAmoBtn.classList.remove('clicked');
            void teAmoBtn.offsetWidth; // Force reflow
            teAmoBtn.classList.add('clicked');

            // Heart burst effect
            const burstEmojis = ['❤️', '💖', '💜', '💗', '💕', '✨', '🥰'];
            for (let i = 0; i < 8; i++) {
                const particle = document.createElement('span');
                particle.classList.add('burst-heart');
                particle.textContent = burstEmojis[Math.floor(Math.random() * burstEmojis.length)];

                const angle = (i / 8) * Math.PI * 2;
                const distance = 60 + Math.random() * 40;
                const tx = Math.cos(angle) * distance;
                const ty = Math.sin(angle) * distance;

                particle.style.setProperty('--tx', `${tx}px`);
                particle.style.setProperty('--ty', `${ty}px`);
                particle.style.fontSize = `${0.8 + Math.random() * 0.8}rem`;

                teAmoBurst.appendChild(particle);

                setTimeout(() => particle.remove(), 900);
            }
        });
    }

})();
