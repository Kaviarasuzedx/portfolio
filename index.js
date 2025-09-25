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
(function loadYouTubeAPIOnce(){
  if (window.YT && window.YT.Player) return;
  const tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  document.head.appendChild(tag);
})();

document.querySelectorAll('.video-thumbnail').forEach(thumbnail => {
  thumbnail.addEventListener('click', function () {
    const id = this.dataset.videoId;
    if (!id) return;

    // create a div for the player
    const playerId = 'ytplayer-' + id + '-' + Math.floor(Math.random()*10000);
    this.innerHTML = `<div id="${playerId}"></div>`;

    // wait for the API to be ready (if not ready yet)
    function createWhenReady() {
      if (window.YT && window.YT.Player) {
        new YT.Player(playerId, {
          height: '200',
          width: '100%',
          videoId: id,
          playerVars: {
            autoplay: 1,
            mute: 1,
            rel: 0,
            modestbranding: 1,
            loop: 1,
            playlist: id
          },
          events: {
            onReady: function (e) { e.target.playVideo(); },
            onStateChange: function (e) {
              // fallback loop handler
              if (e.data === YT.PlayerState.ENDED) {
                e.target.seekTo(0);
                e.target.playVideo();
              }
            }
          }
        });
      } else {
        setTimeout(createWhenReady, 150);
      }
    }
    createWhenReady();
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








