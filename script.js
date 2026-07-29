document.addEventListener('DOMContentLoaded', () => {
  const filterBadges = document.querySelectorAll('.quick-badges .badge');
  const projectCards = document.querySelectorAll('.project-card');

  filterBadges.forEach(badge => {
    badge.addEventListener('click', () => {
      // Remove active class from all badges
      filterBadges.forEach(b => b.classList.remove('active'));
      
      // Add active class to clicked badge
      badge.classList.add('active');

      const filterValue = badge.getAttribute('data-filter');

      // Filter project cards
      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category');

        if (filterValue === 'all' || (categories && categories.includes(filterValue))) {
          card.classList.remove('hide');
        } else {
          card.classList.add('hide');
        }
      });
    });
  });
});