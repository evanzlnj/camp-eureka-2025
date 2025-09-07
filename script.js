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
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector('.hamburger');
  const sidebar = document.querySelector('.sidebar');
  const body = document.body;

  // Ensure initial state
  body.classList.add('sidebar-closed');

  function toggleSidebar() {
    const isOpen = sidebar.classList.contains('active');
    if (isOpen) {
      // Closing sidebar
      sidebar.classList.remove('active');
      body.classList.add('sidebar-closed');
      body.classList.remove('sidebar-open');
    } else {
      // Opening sidebar
      sidebar.classList.add('active');
      body.classList.add('sidebar-open');
      body.classList.remove('sidebar-closed');
    }
  }

  // Toggle when hamburger clicked
  hamburger.addEventListener('click', (e) => {
    e.stopPropagation(); // prevent immediate outside click closing
    toggleSidebar();
  });

  // Close sidebar when clicking outside
  document.addEventListener('click', (e) => {
    if (
      sidebar.classList.contains('active') &&
      !sidebar.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      sidebar.classList.remove('active');
      body.classList.add('sidebar-closed');
      body.classList.remove('sidebar-open');
    }
  });

  // Auto close sidebar after link click
  sidebar.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      sidebar.classList.remove('active');
      body.classList.add('sidebar-closed');
      body.classList.remove('sidebar-open');
    });
  });
});
