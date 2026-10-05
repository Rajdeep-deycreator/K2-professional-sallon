const chips = document.querySelectorAll('.chip');
  const cards = document.querySelectorAll('.service');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const f = chip.dataset.filter;
      chips.forEach(c => c.setAttribute('aria-pressed', c === chip));
      cards.forEach(card => { card.hidden = !(f === 'all' || card.dataset.cat === f); });
    });
  });