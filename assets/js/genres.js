// Clean accordion logic for genres.html
// Only one card open at a time, smooth animation, no hidden bugs
document.addEventListener('DOMContentLoaded', function() {
  const genreCards = document.querySelectorAll('.genre-card');

  genreCards.forEach(card => {
    const header = card.querySelector('.genre-header');
    const content = card.querySelector('.genre-content');

    // Always start closed
    content.style.maxHeight = '0px';
    content.style.overflow = 'hidden';
    content.style.opacity = '0';
    content.style.display = 'none';

    header.addEventListener('click', function(e) {
      e.preventDefault();
      const isOpen = card.classList.contains('active');

      // Close all cards
      genreCards.forEach(otherCard => {
        if (otherCard !== card) {
          otherCard.classList.remove('active');
          const otherContent = otherCard.querySelector('.genre-content');
          otherContent.style.maxHeight = '0px';
          otherContent.style.opacity = '0';
          setTimeout(() => {
            otherContent.style.display = 'none';
          }, 350);
        }
      });

      if (!isOpen) {
        card.classList.add('active');
        content.style.display = 'block';
        // Force reflow for transition
        void content.offsetWidth;
        content.style.maxHeight = content.scrollHeight + 'px';
        content.style.opacity = '1';
      } else {
        card.classList.remove('active');
        content.style.maxHeight = '0px';
        content.style.opacity = '0';
        setTimeout(() => {
          content.style.display = 'none';
        }, 350);
      }
    });
  });
});