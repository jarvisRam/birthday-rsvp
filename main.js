// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('rsvpForm');
  const attendingSelect = document.getElementById('attending');
  // Interactive Form Logic - Guests logic removed since siblings are no longer invited
  // Form submission handling
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = form.querySelector('.submit-btn');
    const originalText = btn.innerHTML;

    btn.innerHTML = 'Sending... ✨';
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
        // Extra burst of confetti on success
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

  // Confetti Animation Logic
  const confettiContainer = document.getElementById('confetti');
  const colors = ['#ff6b9e', '#9d4edd', '#00f5d4', '#ffffff', '#ff99c2'];

  function createConfetti() {
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

  // Modal Logic
  const modal = document.getElementById('thankYouModal');
  const closeModalBtn = document.getElementById('closeModal');

  if (modal && closeModalBtn) {
    // Show modal on load
    modal.classList.remove('modal-hidden');

    // Close modal on button click
    closeModalBtn.addEventListener('click', () => {
      modal.classList.add('modal-hidden');
    });

    // Close modal on background click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('modal-hidden');
      }
    });
  }

  // Continuous background confetti
  setInterval(createConfetti, 300);

  // Initial burst
  for (let i = 0; i < 20; i++) {
    setTimeout(createConfetti, i * 50);
  }
});
