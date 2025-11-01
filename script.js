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
      if (isProgressBarMode) return;
      
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
        const scrollDelta = e.deltaY * 0.5;
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

    // Progress Bar
    let currentProgress = 0;
    let displayPercentage = 0;
    let progressAnimationFrame = null;
    let isProgressBarMode = true;
    let progressStartTime = null;
    let progressCompleteTime = null;
    const easeInDuration = 1500;
    const holdAt100Duration = 500;
    
    const portfolioLayout = document.querySelector('.portfolio-layout');
    const navigationLinks = document.querySelector('.navigation-links');
    const loadingPercentage = document.querySelector('.loading-percentage');
    const nameElement = document.querySelector('.bottom-content .name');
    
    function updateProgressBar() {
      const elapsed = progressStartTime ? performance.now() - progressStartTime : 0;
      
      const t = Math.min(1.0, elapsed / easeInDuration);
      currentProgress = t * t * t;
      
      const easedProgress = currentProgress;
      const currentThumbWidth = 100 + (easedProgress * (scrollbarWidth - 100));
      customScrollbarThumb.style.width = currentThumbWidth + 'px';
      customScrollbarThumb.style.transform = 'translate3d(0, 0, 0)';
      
      const scrollbarFilledWidth = easedProgress * scrollbarWidth;
      const gradientPositionPercent = (scrollbarFilledWidth / currentThumbWidth) * 100;
      const clampedGradientPos = Math.min(100, gradientPositionPercent);
      
      const targetPercentage = easedProgress * 100;
      const percentageDiff = targetPercentage - displayPercentage;
      if (Math.abs(percentageDiff) > 0.5) {
        displayPercentage += percentageDiff * 0.2;
      } else {
        displayPercentage = targetPercentage;
      }
      
      if (loadingPercentage) {
        const percentageNumber = loadingPercentage.querySelector('.percentage-number');
        if (percentageNumber) {
          const roundedPercentage = Math.round(displayPercentage);
          percentageNumber.textContent = `${roundedPercentage}%`;
        }
      }
      
      customScrollbarThumb.style.background = `linear-gradient(90deg,
        #000000 0%,
        #000000 ${clampedGradientPos}%,
        rgba(0,0,0,0.9) ${Math.min(100, clampedGradientPos + 2)}%,
        rgba(0,0,0,0.5) ${Math.min(100, clampedGradientPos + 5)}%,
        rgba(0,0,0,0.1) ${Math.min(100, clampedGradientPos + 10)}%,
        transparent ${Math.min(100, clampedGradientPos + 15)}%,
        transparent 100%)`;
      
      if (elapsed >= easeInDuration) {
        if (currentProgress < 1.0) {
          currentProgress = 1.0;
        }
        if (displayPercentage < 100) {
          displayPercentage = 100;
          if (loadingPercentage) {
            const percentageNumber = loadingPercentage.querySelector('.percentage-number');
            if (percentageNumber) {
              percentageNumber.textContent = '100%';
            }
          }
        }
        
        customScrollbarThumb.style.width = scrollbarWidth + 'px';
        
        if (!progressCompleteTime) {
          progressCompleteTime = performance.now();
        }
        
        const holdDuration = performance.now() - progressCompleteTime;
        
        if (holdDuration >= holdAt100Duration) {
          isProgressBarMode = false;
          
          customScrollbarThumb.classList.remove('progress-active');
          customScrollbarThumb.classList.add('scrollbar-active');
          
          if (loadingPercentage) {
            loadingPercentage.classList.add('hidden');
          }
          
          initializeScrollbar();
          updateScrollbar();
          
          portfolioLayout.classList.add('animate-in');
          navigationLinks.classList.add('animate-in');
          if (nameElement) {
            nameElement.classList.add('animate-in');
          }
          
          const bottomSection = document.querySelector('.bottom-section');
          if (bottomSection) {
            bottomSection.classList.add('animate-in');
          }
          
          const clickableProjects = document.querySelectorAll('.large-project.clickable, .small-project.clickable');
          clickableProjects.forEach(project => {
            project.classList.add('loaded');
          });
        } else {
          progressAnimationFrame = requestAnimationFrame(updateProgressBar);
        }
      } else {
        progressAnimationFrame = requestAnimationFrame(updateProgressBar);
      }
    }
    
    function startProgressBarAnimation() {
      if (!customScrollbarThumb || !portfolioLayout || !navigationLinks) return;
      
      const isMobile = window.innerWidth <= 768;
      
      updateDimensions();
      
      if (!isMobile) {
        if (!scrollbarWidth || scrollbarWidth === 0) {
          setTimeout(() => {
            updateDimensions();
            if (scrollbarWidth > 0) {
              startProgressBarAnimation();
            }
          }, 100);
          return;
        }
      } else {
        if (!scrollbarWidth || scrollbarWidth === 0) {
          scrollbarWidth = window.innerWidth || 375;
        }
      }
      
      const thumbWidth = 100;
      
      customScrollbarThumb.style.width = thumbWidth + 'px';
      customScrollbarThumb.style.transform = 'translate3d(0, 0, 0)';
      
      customScrollbarThumb.classList.add('progress-active');
      customScrollbarThumb.style.background = `linear-gradient(90deg,
        transparent 0%,
        transparent 0%,
        rgba(0,0,0,0.1) 0%,
        rgba(0,0,0,0.4) 0%,
        rgba(0,0,0,0.7) 0%,
        #000000 0%,
        rgba(0,0,0,0.7) 5%,
        rgba(0,0,0,0.4) 10%,
        rgba(0,0,0,0.1) 20%,
        transparent 30%,
        transparent 100%)`;
      
      currentProgress = 0;
      displayPercentage = 0;
      progressStartTime = performance.now();
      
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          updateProgressBar();
        });
      });
    }
    
    // Always show loading bar
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        startProgressBarAnimation();
      });
    });
});
