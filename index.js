document.addEventListener('DOMContentLoaded', function () {
  /* ---------------- Scroll animations / header / backToTop ---------------- */
  const sections = document.querySelectorAll('section');
  const backToTop = document.getElementById('backToTop');
  const header = document.getElementById('header');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1 });

  sections.forEach(section => observer.observe(section));

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTop?.classList.add('visible');
      header?.classList.add('scrolled-header');
    } else {
      backToTop?.classList.remove('visible');
      header?.classList.remove('scrolled-header');
    }
  });

  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------------------- Mobile / Desktop nav ---------------------- */
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  const closeMenu = document.getElementById('closeMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', () => {
      mobileNav.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeMenu && mobileNav) {
    closeMenu.addEventListener('click', () => {
      mobileNav.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  }

  if (navLinks.length > 0 && mobileNav) {
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        document.body.style.overflow = 'auto';
      });
    });
  }

  const desktopNav = document.querySelector('.desktop-nav');
  if (menuBtn && desktopNav) {
    menuBtn.addEventListener('click', () => desktopNav.classList.toggle('show'));
    const desktopLinks = desktopNav.querySelectorAll('a');
    desktopLinks.forEach(link =>
      link.addEventListener('click', () => desktopNav.classList.remove('show'))
    );
  }

  /* ---------------- Smooth anchor scrolling ---------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({ top: targetElement.offsetTop - 80, behavior: 'smooth' });
      }
    });
  });

  /* ---------------- More videos toggle ---------------- */
  const moreVideosBtn = document.getElementById('moreVideosBtn');
  const moreProjects = document.getElementById('moreProjects');
  if (moreVideosBtn && moreProjects) {
    moreVideosBtn.addEventListener('click', () => {
      moreProjects.classList.toggle('expanded');
      moreVideosBtn.classList.toggle('expanded');
      if (moreProjects.classList.contains('expanded')) {
        moreVideosBtn.innerHTML = 'Show Less Videos <i class="fas fa-chevron-up"></i>';
      } else {
        moreVideosBtn.innerHTML = 'Show More Videos <i class="fas fa-chevron-down"></i>';
      }
    });
  }

  /* ---------------- Inline Thumbnail → Video Play ---------------- */
  const thumbnails = document.querySelectorAll(".video-thumbnail");
  thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener("click", () => {
      const videoUrl = thumbnail.dataset.video;
      if (!videoUrl) return;
      const iframe = document.createElement("iframe");
      iframe.src = `${videoUrl}?autoplay=1&mute=1`;
      iframe.width = "100%";
      iframe.height = "100%";
      iframe.style.border = "none";
      iframe.allow = "autoplay; encrypted-media";
      iframe.allowFullscreen = true;
      thumbnail.innerHTML = "";
      thumbnail.appendChild(iframe);
    });
  });

  /* ---------------- Open email link automatically ---------------- */
  const link = document.getElementById('openEmail');
  if (link) link.click();

  /* ---------------- Logo Popup ---------------- */
  const logo = document.querySelector('.brand .logo img');
  const overlay = document.getElementById('logoOverlay');
  const overlayContent = document.querySelector('#logoOverlay .overlay-content');
  const overlayImg = document.getElementById('overlayImg');

  if (logo && overlay && overlayContent && overlayImg) {
    logo.addEventListener('click', () => {
      overlayImg.src = logo.src;
      overlay.classList.add('active');
    });

    overlay.addEventListener('click', (e) => {
      if (!overlayContent.contains(e.target)) overlay.classList.remove('active');
    });
  }

  /* ---------------- Before-After VIDEO Slider ---------------- */
  document.addEventListener("DOMContentLoaded", function() {
  const videoSlider = document.getElementById("videoSlider");
  const afterContainer = document.getElementById("afterContainer");
  const videoHandle = document.getElementById("handle");

  if (videoSlider && afterContainer && videoHandle) {
    let dragging = false;

    function updateVideoSlider(x) {
      const rect = videoSlider.getBoundingClientRect();
      let offset = x - rect.left;
      if (offset < 0) offset = 0;
      if (offset > rect.width) offset = rect.width;

      const percent = (offset / rect.width) * 100;
      afterContainer.style.width = percent + "%";
      videoHandle.style.left = percent + "%";
    }

    // Initialize to 50/50 split
      afterContainer.style.width = "50%";
      videoHandle.style.left = "50%";

      videoHandle.addEventListener("mousedown", (e) => {
        dragging = true;
        e.preventDefault();
      });

      window.addEventListener("mousemove", (e) => {
        if (dragging) updateVideoSlider(e.clientX);
      });

      window.addEventListener("mouseup", () => {
        dragging = false;
      });

      videoHandle.addEventListener("touchstart", (e) => {
        dragging = true;
        e.preventDefault();
      });

      window.addEventListener("touchmove", (e) => {
        if (dragging) updateVideoSlider(e.touches[0].clientX);
      });

      window.addEventListener("touchend", () => {
        dragging = false;
      });

      videoSlider.addEventListener("click", (e) => {
        if (!dragging && e.target !== videoHandle) {
          updateVideoSlider(e.clientX);
        }
      });
    }
   });
});










