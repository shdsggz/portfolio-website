// High-Performance Horizontal Scroll Controller
window.addEventListener('load', function () {
    // Elements
    const portfolioSection = document.querySelector('.portfolio-section');
    const customScrollbar = document.querySelector('.custom-scrollbar');
    const customScrollbarThumb = document.querySelector('.custom-scrollbar-thumb');
    if (!portfolioSection || !customScrollbar || !customScrollbarThumb) {
      console.error('Required elements not found'); return;
    }

    // Performance-optimized state
    let velocity = 0;
    let isAnimating = false;
    let lastTime = 0;
    let animationFrame = null;
    
    // Dimensions cache
    let scrollWidth = 0, clientWidth = 0, maxScroll = 0, scrollbarWidth = 0;
    
    function updateDimensions() {
      scrollWidth = portfolioSection.scrollWidth;
      clientWidth = portfolioSection.clientWidth;
      maxScroll = Math.max(0, scrollWidth - clientWidth);
      scrollbarWidth = customScrollbar.offsetWidth;
    }

    // GPU-optimized scrollbar update with gradient
    function updateScrollbar() {
      const scrollLeft = portfolioSection.scrollLeft;
      
      if (maxScroll > 0) {
        const thumbWidth = Math.max(50, (clientWidth / scrollWidth) * scrollbarWidth);
        const thumbPos = (scrollLeft / maxScroll) * (scrollbarWidth - thumbWidth);
        
        // Use transform3d for GPU acceleration
        customScrollbarThumb.style.width = thumbWidth + 'px';
        customScrollbarThumb.style.transform = `translate3d(${thumbPos}px,0,0)`;
        
        // Dynamic gradient - essential for visual mood
        const t = scrollLeft / maxScroll;
        const p = Math.max(0, Math.min(1, t));
        customScrollbarThumb.style.background = `linear-gradient(90deg,
          transparent 0%,
          transparent ${Math.max(0, (p - 0.3) * 100)}%,
          rgba(255,255,255,0.1) ${Math.max(0, (p - 0.2) * 100)}%,
          rgba(255,255,255,0.4) ${Math.max(0, (p - 0.1) * 100)}%,
          rgba(255,255,255,0.7) ${Math.max(0, (p - 0.05) * 100)}%,
          #FFFFFF ${p * 100}%,
          rgba(255,255,255,0.7) ${Math.min(100, (p + 0.05) * 100)}%,
          rgba(255,255,255,0.4) ${Math.min(100, (p + 0.1) * 100)}%,
          rgba(255,255,255,0.1) ${Math.min(100, (p + 0.2) * 100)}%,
          transparent ${Math.min(100, (p + 0.3) * 100)}%,
          transparent 100%)`;
      }
    }

    // Smooth momentum animation loop
    function animate(currentTime) {
      if (!isAnimating) return;
      
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;
      
      if (Math.abs(velocity) > 0.1) {
        // Apply velocity with friction
        velocity *= 0.95; // Light friction for smooth deceleration
        portfolioSection.scrollLeft += velocity * (deltaTime / 16); // Normalize to 60fps
        
        // Bounds checking
        if (portfolioSection.scrollLeft < 0) {
          portfolioSection.scrollLeft = 0;
          velocity = 0;
        } else if (portfolioSection.scrollLeft > maxScroll) {
          portfolioSection.scrollLeft = maxScroll;
          velocity = 0;
        }
        
        updateScrollbar();
        animationFrame = requestAnimationFrame(animate);
      } else {
        velocity = 0;
        isAnimating = false;
      }
    }

    // Robust mouse detection
    function isMouseLikeWheel(e) {
      return e.deltaMode === 1 || Math.abs(e.deltaY) > 50;
    }

    portfolioSection.addEventListener('wheel', (e) => {
      const isMouseWheel = isMouseLikeWheel(e);
      e.preventDefault();
      
      const scrollDelta = (e.deltaX + e.deltaY);
      
      if (isMouseWheel) {
        // Direct, precise control — no momentum
        portfolioSection.scrollLeft += scrollDelta * 1.5;
        
        // Cancel any existing animation
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
        velocity = 0;
        isAnimating = false;
        updateScrollbar();
      } else {
        // Trackpad with smooth inertia
        portfolioSection.scrollLeft += scrollDelta * 1.2;
        velocity += scrollDelta * 0.2;
        velocity = Math.max(-15, Math.min(15, velocity));
        updateScrollbar();
        if (!isAnimating && Math.abs(velocity) > 0.5) {
          isAnimating = true;
          animationFrame = requestAnimationFrame(animate);
        }
      }
    }, { passive: false });

    // Update scrollbar on native scroll
    portfolioSection.addEventListener('scroll', updateScrollbar, { passive: true });

    // Click-to-seek on scrollbar
    customScrollbar.addEventListener('click', (e) => {
      const rect = customScrollbar.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const ratio = clickX / scrollbarWidth;
      portfolioSection.scrollLeft = ratio * maxScroll;
    }, { passive: true });

    // Prevent thumb clicks from triggering scrollbar clicks
    customScrollbarThumb.addEventListener('click', (e) => e.stopPropagation(), { passive: true });

    // Resize handler
    window.addEventListener('resize', () => {
      updateDimensions();
      updateScrollbar();
    }, { passive: true });

    // Handle BFCache restore and tab switching
    window.addEventListener('pageshow', () => {
      updateDimensions();
      updateScrollbar();
    }, { passive: true });

    // Handle visibility change (tab switching)
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        // Tab became visible, update dimensions immediately
        updateDimensions();
        updateScrollbar();
      }
    }, { passive: true });

    // Initialize immediately
    updateDimensions();
    updateScrollbar();

    // Media load detection for proper dimensions (non-blocking)
    const mediaElements = document.querySelectorAll('img, video');
    let pendingMedia = mediaElements.length;
    
    if (pendingMedia > 0) {
      mediaElements.forEach((el) => {
        const done = () => {
          pendingMedia--;
          if (pendingMedia === 0) {
            updateDimensions();
            updateScrollbar();
          }
        };
        
        if (el.complete || (el.readyState >= 2)) {
          done();
        } else {
          el.addEventListener('load', done, { once: true, passive: true });
          el.addEventListener('loadedmetadata', done, { once: true, passive: true });
        }
      });
    }

    // Additional initialization after a short delay to ensure everything is ready
    setTimeout(() => {
      updateDimensions();
      updateScrollbar();
    }, 100);
});