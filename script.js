window.addEventListener('load', function () {
    const portfolioSection = document.querySelector('.portfolio-section');
    const customScrollbar = document.querySelector('.custom-scrollbar');
    const customScrollbarThumb = document.querySelector('.custom-scrollbar-thumb');
    if (!portfolioSection || !customScrollbar || !customScrollbarThumb) {
      console.error('Required elements not found'); return;
    }

    let scrollWidth = 0, clientWidth = 0, maxScroll = 0, scrollbarWidth = 0;
    
    let currentThumbPos = 0;
    let targetThumbPos = 0;
    let scrollbarAnimating = false;
    let scrollbarAnimationFrame = null;
    
    function updateDimensions() {
      scrollWidth = portfolioSection.scrollWidth;
      clientWidth = portfolioSection.clientWidth;
      maxScroll = Math.max(0, scrollWidth - clientWidth);
      void customScrollbar.offsetHeight;
      scrollbarWidth = customScrollbar.getBoundingClientRect().width || customScrollbar.offsetWidth;
    }

    function animateScrollbarThumb() {
      if (!scrollbarAnimating) return;
      
      const diff = targetThumbPos - currentThumbPos;
      
      if (Math.abs(diff) < 0.1) {
        currentThumbPos = targetThumbPos;
        scrollbarAnimating = false;
        applyScrollbarTransform();
      } else {
        const easingFactor = 0.15;
        currentThumbPos += diff * easingFactor;
        applyScrollbarTransform();
        scrollbarAnimationFrame = requestAnimationFrame(animateScrollbarThumb);
      }
    }
    
    function applyScrollbarTransform() {
      const thumbWidth = Math.max(50, (clientWidth / scrollWidth) * scrollbarWidth);
      
      customScrollbarThumb.style.width = thumbWidth + 'px';
      customScrollbarThumb.style.transform = `translate3d(${currentThumbPos}px,0,0)`;
      
      const scrollLeft = portfolioSection.scrollLeft;
      const t = maxScroll > 0 ? scrollLeft / maxScroll : 0;
        const p = Math.max(0, Math.min(1, t));
      
        customScrollbarThumb.style.background = `linear-gradient(90deg,
          transparent 0%,
          transparent ${Math.max(0, (p - 0.3) * 100)}%,
        rgba(0,0,0,0.1) ${Math.max(0, (p - 0.2) * 100)}%,
        rgba(0,0,0,0.4) ${Math.max(0, (p - 0.1) * 100)}%,
        rgba(0,0,0,0.7) ${Math.max(0, (p - 0.05) * 100)}%,
        #000000 ${p * 100}%,
        rgba(0,0,0,0.7) ${Math.min(100, (p + 0.05) * 100)}%,
        rgba(0,0,0,0.4) ${Math.min(100, (p + 0.1) * 100)}%,
        rgba(0,0,0,0.1) ${Math.min(100, (p + 0.2) * 100)}%,
          transparent ${Math.min(100, (p + 0.3) * 100)}%,
          transparent 100%)`;
      }
    
    function updateScrollbar() {
      updateDimensions();
      
      const scrollLeft = portfolioSection.scrollLeft;
      
      if (maxScroll > 0 && scrollbarWidth > 0) {
        const thumbWidth = Math.max(50, (clientWidth / scrollWidth) * scrollbarWidth);
        const maxThumbPos = scrollbarWidth - thumbWidth;
        targetThumbPos = Math.min(maxThumbPos, Math.max(0, (scrollLeft / maxScroll) * maxThumbPos));
        
        if (!scrollbarAnimating) {
          scrollbarAnimating = true;
          scrollbarAnimationFrame = requestAnimationFrame(animateScrollbarThumb);
        }
      }
    }
    
    function initializeScrollbar() {
      updateDimensions();
      if (maxScroll > 0 && scrollbarWidth > 0) {
        const scrollLeft = portfolioSection.scrollLeft;
        const thumbWidth = Math.max(50, (clientWidth / scrollWidth) * scrollbarWidth);
        const maxThumbPos = scrollbarWidth - thumbWidth;
        currentThumbPos = targetThumbPos = Math.min(maxThumbPos, Math.max(0, (scrollLeft / maxScroll) * maxThumbPos));
        applyScrollbarTransform();
      }
    }

    portfolioSection.addEventListener('wheel', (e) => {
      if (window.innerWidth > 768) {
      e.preventDefault();
        let scrollDelta = 0;
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
          scrollDelta = e.deltaX * 0.5;
      } else {
          scrollDelta = e.deltaY * 0.5;
        }
        portfolioSection.scrollLeft += scrollDelta;
      }
    }, { passive: false });

    portfolioSection.addEventListener('scroll', updateScrollbar, { passive: true });

    customScrollbar.addEventListener('click', (e) => {
      updateDimensions();
      const rect = customScrollbar.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const ratio = clickX / scrollbarWidth;
      portfolioSection.scrollLeft = ratio * maxScroll;
      updateScrollbar();
    }, { passive: true });

    customScrollbarThumb.addEventListener('click', (e) => e.stopPropagation(), { passive: true });

    window.addEventListener('resize', () => {
      updateDimensions();
      initializeScrollbar();
      updateScrollbar();
    }, { passive: true });

    // Initialize content immediately (no animations)
    function initializeContent() {
      if (!customScrollbarThumb) return;
      
      const isMobile = window.innerWidth <= 768;
      
      if (isMobile) {
        if (customScrollbarThumb) {
          customScrollbarThumb.style.display = 'none';
        }
        
        const clickableProjects = document.querySelectorAll('.large-project.clickable, .small-project.clickable');
        clickableProjects.forEach(project => {
          project.classList.add('loaded');
        });
        
        return;
      }
      
      updateDimensions();
      
      if (!scrollbarWidth || scrollbarWidth === 0) {
        scrollbarWidth = window.innerWidth || 800;
      }
      
      customScrollbarThumb.classList.remove('progress-active');
      customScrollbarThumb.classList.add('scrollbar-active');
      
      initializeScrollbar();
      updateScrollbar();
      
      const clickableProjects = document.querySelectorAll('.large-project.clickable, .small-project.clickable');
      clickableProjects.forEach(project => {
        project.classList.add('loaded');
      });
    }
    
    initializeContent();
});
