/* Configuration */
const sadMessages = [
    "Are you sure? 🥺",
    "Think about the good times! 💭",
    "I bought your favorite snacks! 🍫",
    "My heart will break into a million pieces 💔",
    "Don't do this to me! 😭",
    "I'll give you a massage! 💆‍♀️",
    "Pretty please? 🍒",
    "I'll cook dinner for a week! 🍳",
    "But we are perfect together! 🧩"
];

/* Enhanced Particle System */
function createParticles() {
    const container = document.createElement('div');
    container.id = 'particles-container';
    document.body.prepend(container);

    // Add animated gradient orbs
    const orb1 = document.createElement('div');
    orb1.className = 'gradient-orb orb-1';
    container.appendChild(orb1);

    const orb2 = document.createElement('div');
    orb2.className = 'gradient-orb orb-2';
    container.appendChild(orb2);

    const orb3 = document.createElement('div');
    orb3.className = 'gradient-orb orb-3';
    container.appendChild(orb3);

    // Create floating sparkles
    for (let i = 0; i < 15; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = `${Math.random() * 100}vw`;
        sparkle.style.animationDuration = `${Math.random() * 8 + 6}s`;
        sparkle.style.animationDelay = `${Math.random() * 5}s`;
        container.appendChild(sparkle);
    }

    // Create floating hearts
    for (let i = 0; i < 10; i++) {
        const heart = document.createElement('div');
        heart.className = 'float-heart';
        heart.innerHTML = ['💕', '💖', '💗', '💓', '💝'][Math.floor(Math.random() * 5)];
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.fontSize = `${Math.random() * 15 + 15}px`;
        heart.style.animationDuration = `${Math.random() * 10 + 8}s`;
        heart.style.animationDelay = `${Math.random() * 5}s`;
        container.appendChild(heart);
    }

    // Original bubble particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 20 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.animationDuration = `${Math.random() * 10 + 5}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        container.appendChild(particle);
    }
}

document.addEventListener('DOMContentLoaded', createParticles);

/* Happy/Confetti Logic */
function launchConfetti() {
    const duration = 6000; // Increased to 6 seconds for a slower celebration
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 25, spread: 360, ticks: 120, zIndex: 0 }; // Slower velocity, more ticks (lifetime)
    const random = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        if (typeof confetti !== 'undefined') {
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 } }));
        }
    }, 250);
}

if (window.location.pathname.includes('yes.html')) {
    // Requires canvas-confetti library to be loaded in HTML
    launchConfetti();
}

/* Reasons Carousel Logic */
if (window.location.pathname.includes('reasons.html')) {
    const reasons = [
        "Your smile lights up my entire world ✨",
        "You make the bad days meaningful and good days better 🌈",
        "I love how kind your heart is ❤️",
        "Being with you feels like home 🏠",
        "You are simply my favorite person 💑",
        "Your laugh is my favorite sound 🎶",
        "You inspire me to be better every single day 🌟",
        "I love the way you look at me 👀",
        "Every moment with you is a treasure 💎",
        "You accept me for who I am",
        "I also like many things in u🌚👉👈...but we should keep those private😋🌝"
    ];

    let currentReasonIndex = 0;
    const reasonElement = document.getElementById('reason-text');
    const nextBtn = document.getElementById('nextReasonBtn');

    if (reasonElement && nextBtn) {
        reasonElement.textContent = reasons[0];

        nextBtn.addEventListener('click', () => {
            currentReasonIndex++;
            if (currentReasonIndex < reasons.length) {
                // Fade out effect
                reasonElement.style.opacity = 0;
                reasonElement.style.transform = 'translateY(10px) scale(0.95)';
                setTimeout(() => {
                    reasonElement.textContent = reasons[currentReasonIndex];
                    reasonElement.style.opacity = 1;
                    reasonElement.style.transform = 'translateY(0) scale(1)';
                }, 300);
            } else {
                window.location.href = 'proposal.html';
            }
        });
    }
}

/* Sad Page Logic */
if (window.location.pathname.includes('sad.html')) {
    const sadTitle = document.querySelector('h1');
    const sadText = document.querySelector('p');
    const backBtn = document.querySelector('.btn-primary'); // "Okay, I'll go back" button

    // Sometimes swap the "Go Back" text for variety
    if (backBtn) {
        const backTexts = ["Okay, I'll go back 🔙", "I forgive you ❤️", "Let me reconsider 🤔", "Fine, you win 🏳️"];
        backBtn.textContent = backTexts[Math.floor(Math.random() * backTexts.length)];
    }

    // Interactive "No" persistence
    // On this page, we assume they clicked "No" from proposal. 
    // We can show random sad messages if they refresh or just on load.
    if (sadTitle && sadText) {
        // Just randomization on load for now
        // A better flow: The user lands here. 
        // Logic: Pick a random message index from sadMessages
        const randIndex = Math.floor(Math.random() * sadMessages.length);
        sadTitle.textContent = sadMessages[randIndex];
    }
}

