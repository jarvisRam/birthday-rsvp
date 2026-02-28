// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('rsvpForm');
  const attendingSelect = document.getElementById('attending');
  const guestsGroup = document.getElementById('guestsGroup');
  const formMessage = document.getElementById('formMessage');

  // Interactive Form Logic
  // Hide guests selection if 'No' is selected
  attendingSelect.addEventListener('change', (e) => {
    if (e.target.value === 'No') {
      guestsGroup.classList.add('hidden');
    } else {
      guestsGroup.classList.remove('hidden');
    }
  });

  // Handle fake form submission for now
  // Real submission to Formspree will happen normally once user swaps action URL
  form.addEventListener('submit', async (e) => {
    // If testing without a real endpoint, we can prevent default and show message
    // e.preventDefault();
    
    // For now we will allow normal submission, but user has to set the action.
    // Let's add submit animation logic
    const btn = form.querySelector('.submit-btn');
    const originalText = btn.innerHTML;
    
    btn.innerHTML = 'Sending... ✨';
    btn.style.opacity = '0.8';
    btn.disabled = true;

    // Simulate network delay if preventDefault was used
    // setTimeout(() => {
    //   form.classList.add('hidden');
    //   formMessage.classList.remove('hidden');
    //   triggerConfettiVFX();
    // }, 1500);
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

  // Continuous background confetti
  setInterval(createConfetti, 300);

  // Initial burst
  for(let i=0; i<20; i++) {
    setTimeout(createConfetti, i * 50);
  }
});
