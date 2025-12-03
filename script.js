function restoreScrollPosition(portfolioSection) {
  const savedScrollPosition = sessionStorage.getItem('portfolioScrollPosition');
  if (savedScrollPosition) {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        portfolioSection.scrollLeft = parseInt(savedScrollPosition, 10);
        sessionStorage.removeItem('portfolioScrollPosition');
      });
    });
  }
}

function saveScrollPosition() {
  const portfolioSection = document.querySelector('.portfolio-section');
  if (portfolioSection) {
    sessionStorage.setItem('portfolioScrollPosition', portfolioSection.scrollLeft.toString());
  }
}

function initializeContent() {
  const clickableProjects = document.querySelectorAll('.large-project.clickable, .small-project.clickable');
  clickableProjects.forEach(project => {
    project.classList.add('loaded');
  });
}

function initPortfolioLayout() {
  const portfolioSection = document.querySelector('.portfolio-section');
  if (!portfolioSection) {
    console.error('Portfolio section not found');
    return;
  }

  restoreScrollPosition(portfolioSection);
  initializeContent();
  
  // Fix for older Safari: force layout recalculation after videos load metadata
  const videos = document.querySelectorAll('.project-media video');
  if (videos.length > 0) {
    let loadedCount = 0;
    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount === videos.length) {
        // All videos loaded - force Safari to recalculate layout
        requestAnimationFrame(() => {
          const layout = document.querySelector('.portfolio-layout');
          if (layout) void layout.offsetHeight; // Force reflow
        });
      }
    };
    
    videos.forEach(video => {
      if (video.readyState >= 1) {
        checkAllLoaded();
      } else {
        video.addEventListener('loadedmetadata', checkAllLoaded, { once: true });
      }
    });
  }

  function handlePortfolioScroll(e) {
    if (window.innerWidth > 768) {
      if (e.ctrlKey || e.metaKey) {
        return;
      }
      
      e.preventDefault();
      let scrollDelta = 0;
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        scrollDelta = e.deltaX * 0.5;
      } else {
        scrollDelta = e.deltaY * 0.5;
      }
      portfolioSection.scrollLeft += scrollDelta;
    }
  }

  portfolioSection.addEventListener('wheel', handlePortfolioScroll, { passive: false });

  document.body.addEventListener('wheel', (e) => {
    if (window.innerWidth > 768) {
      if (e.target.closest('.portfolio-section')) {
        return;
      }
      
      handlePortfolioScroll(e);
    }
  }, { passive: false });
}

window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    initPortfolioLayout();
  }
});

window.addEventListener('pagehide', (event) => {
  if (event.persisted) {
    saveScrollPosition();
  }
});

window.addEventListener('load', initPortfolioLayout);
/*
 * Calculate target project aspect ratio to match rows:
 * 
 * 1. Calculate bottom row total width ratio:
 *    bottomRowRatio = sum of all bottom row project aspect ratios + gaps between them
 *    (gap = 2px, but calculate as ratio relative to row height)
 * 
 * 2. Calculate top row width before target project:
 *    topRowBeforeRatio = sum of top row project aspect ratios (before target) + gaps
 * 
 * 3. Calculate target project aspect ratio:
 *    targetRatio = bottomRowRatio - topRowBeforeRatio - gap
 * 
 * Example calculation:
 * - Bottom row: Suisse (1.576) + gap + Quantum Medical Bed (1.793) + gap + Star Wars (1.928) = 9.297
 * - Top row before: Potential (1.778) + gap + Missouri (1.793) = 5.571
 * - Target: 9.297 - 5.571 - 2 = 1.726
 * 
 * For 1080px height: target width = 1.726 * 1080 = 1864px
 * Result: 1864x1080px (or 1920x1112px if keeping 1920px width)
 */
