document.addEventListener("DOMContentLoaded", () => {
  /* ----------------------
     Fade-in scroll sections
  ---------------------- */
  const fadeSections = document.querySelectorAll(".fade-section");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target); // fade in once
      }
    });
  }, { threshold: 0.2 });

  fadeSections.forEach(section => observer.observe(section));

  /* ----------------------
     Sidebar toggle content
  ---------------------- */
  const toggles = document.querySelectorAll('.game-toggle');
  toggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling;
      content.style.display = content.style.display === 'block' ? 'none' : 'block';
    });
  });

  /* ----------------------
     Lightbox overlay
  ---------------------- */
  const overlay = document.createElement('div');
  overlay.classList.add('lightbox-overlay');
  const overlayImage = document.createElement('img');
  overlay.appendChild(overlayImage);
  document.body.appendChild(overlay);

  document.querySelectorAll('.lightbox-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      overlayImage.src = link.href;
      overlay.classList.add('active');
    });
  });

  overlay.addEventListener('click', () => {
    overlay.classList.remove('active');
  });

  /* ----------------------
     Page fade-in/out
  ---------------------- */
  setTimeout(() => {
    document.body.classList.add('fade-in');
  }, 50);

  document.querySelectorAll('a:not(.lightbox-link)').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.href;
      document.body.classList.remove('fade-in');
      document.body.classList.add('fade-out');
      setTimeout(() => { window.location.href = href; }, 500); // match CSS transition
    });
  });
});
