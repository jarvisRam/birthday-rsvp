// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('rsvpForm');
  const formMessage = document.getElementById('formMessage');

  // The gallery page shares this script but has no RSVP form, so guard before binding
  if (form && formMessage) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const btn = form.querySelector('.submit-btn');
      const originalText = btn.innerHTML;

      btn.innerHTML = 'Revving up... 🏎️';
      btn.style.opacity = '0.8';
      btn.disabled = true;

      try {
        const formData = new FormData(form);
        const response = await fetch(form.action, {
          method: form.method,
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          form.classList.add('hidden');
          formMessage.classList.remove('hidden');
          // Chequered-flag burst on success
          for (let i = 0; i < 30; i++) {
            setTimeout(createConfetti, i * 40);
          }
        } else {
          throw new Error('Network response was not ok');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        alert("Oops! There was a problem submitting your RSVP. Please try again.");
        btn.innerHTML = originalText;
        btn.style.opacity = '1';
        btn.disabled = false;
      }
    });
  }

  // Confetti Animation Logic - Piston Cup colours
  const confettiContainer = document.getElementById('confetti');
  const colors = ['#e01b24', '#f7b500', '#ffd23f', '#ffffff', '#c9ced6'];

  function createConfetti() {
    if (!confettiContainer) return;

    const confetti = document.createElement('div');
    confetti.classList.add('confetti');

    // Randomize properties
    const left = Math.random() * 100;
    const animationDuration = Math.random() * 3 + 2; // 2s - 5s
    const size = Math.random() * 6 + 4; // 4px - 10px
    const color = colors[Math.floor(Math.random() * colors.length)];

    confetti.style.left = `${left}vw`;
    confetti.style.width = `${size}px`;
    confetti.style.height = `${size}px`;
    confetti.style.backgroundColor = color;
    confetti.style.animationDuration = `${animationDuration}s`;

    // Start slightly above screen
    confetti.style.top = `-${size}px`;

    confettiContainer.appendChild(confetti);

    // Remove after animation completes to clean up DOM
    setTimeout(() => {
      confetti.remove();
    }, animationDuration * 1000);
  }

  // Skip the ambient animation for users who prefer reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Continuous background confetti
  setInterval(createConfetti, 300);

  // Initial burst
  for (let i = 0; i < 20; i++) {
    setTimeout(createConfetti, i * 50);
  }
});
