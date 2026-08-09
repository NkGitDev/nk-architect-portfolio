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


/* ==========================================
   Image Modal Lightbox Logic (Fade + Prev/Next Navigation)
   ========================================== */
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImg");
  const modalCaption = document.getElementById("modalCaption");
  const closeBtn = document.getElementById("modalClose");
  const prevBtn = document.getElementById("modalPrev");
  const nextBtn = document.getElementById("modalNext");

  let activeImages = [];
  let currentIndex = 0;

  // Update modal content by index
  function updateModalImage(index) {
    if (activeImages.length === 0) return;

    if (index < 0) {
      currentIndex = activeImages.length - 1;
    } else if (index >= activeImages.length) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }

    const targetImg = activeImages[currentIndex];
    modalImg.src = targetImg.src;
    modalCaption.textContent = targetImg.alt;
  }

  // Open Modal
  function openModal(clickedImg) {
    // Collect all currently visible project images (respects filters)
    const allImages = Array.from(document.querySelectorAll(".project-card img"));
    activeImages = allImages.filter(img => {
      const card = img.closest(".project-card");
      return !card || card.style.display !== "none";
    });

    if (activeImages.length === 0) activeImages = allImages;

    currentIndex = activeImages.indexOf(clickedImg);
    if (currentIndex === -1) currentIndex = 0;

    updateModalImage(currentIndex);
    modal.classList.add("active");
  }

  // Close Modal
  function closeModal() {
    modal.classList.remove("active");
  }

  // Add click event listener to project images
  document.querySelectorAll(".project-card img").forEach((img) => {
    img.addEventListener("click", function () {
      openModal(this);
    });
  });

  // Previous Button Click
  if (prevBtn) {
    prevBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      updateModalImage(currentIndex - 1);
    });
  }

  // Next Button Click
  if (nextBtn) {
    nextBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      updateModalImage(currentIndex + 1);
    });
  }

  // Close Button Click
  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }

  // Close on clicking outside content area
  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === modal || e.target.classList.contains("modal-content-wrapper")) {
        closeModal();
      }
    });
  }

  // Keyboard navigation (ESC, Arrow Left, Arrow Right)
  document.addEventListener("keydown", function (e) {
    if (!modal.classList.contains("active")) return;

    if (e.key === "Escape") {
      closeModal();
    } else if (e.key === "ArrowLeft") {
      updateModalImage(currentIndex - 1);
    } else if (e.key === "ArrowRight") {
      updateModalImage(currentIndex + 1);
    }
  });
});