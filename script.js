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
    let mediaLoadedCount = 0;
    let totalMediaCount = 0;
    let allMediaLoaded = false;
    const holdAt100Duration = 500;
    
    const portfolioLayout = document.querySelector('.portfolio-layout');
    const navigationLinks = document.querySelector('.navigation-links');
    const loadingPercentage = document.querySelector('.loading-percentage');
    const nameElement = document.querySelector('.bottom-content .name');
    
    function loadMediaElements() {
      const portfolioSection = document.querySelector('.portfolio-section');
      if (!portfolioSection) return;
      
      const images = portfolioSection.querySelectorAll('img');
      const videos = portfolioSection.querySelectorAll('video');
      
      totalMediaCount = images.length + videos.length;
      mediaLoadedCount = 0;
      allMediaLoaded = false;
      
      if (totalMediaCount === 0) {
        allMediaLoaded = true;
        currentProgress = 1.0;
        return;
      }
      
      let checkedImages = 0;
      let checkedVideos = 0;
      
      images.forEach((img, index) => {
        if (img.complete && img.naturalHeight !== 0) {
          mediaLoadedCount++;
          checkedImages++;
          if (checkedImages === images.length && checkedVideos === videos.length) {
            checkMediaProgress();
          }
        } else {
          const handleLoad = () => {
            if (!img.hasAttribute('data-loaded')) {
              img.setAttribute('data-loaded', 'true');
              mediaLoadedCount++;
              checkMediaProgress();
            }
          };
          const handleError = () => {
            if (!img.hasAttribute('data-loaded')) {
              img.setAttribute('data-loaded', 'true');
              mediaLoadedCount++;
              checkMediaProgress();
            }
          };
          
          img.addEventListener('load', handleLoad, { once: true });
          img.addEventListener('error', handleError, { once: true });
          
          if (img.loading === 'lazy') {
            img.loading = 'eager';
          }
          
          checkedImages++;
          if (checkedImages === images.length && checkedVideos === videos.length) {
            checkMediaProgress();
          }
        }
      });
      
      videos.forEach((video, index) => {
        if (video.readyState >= 3) {
          mediaLoadedCount++;
          checkedVideos++;
          if (checkedImages === images.length && checkedVideos === videos.length) {
            checkMediaProgress();
          }
        } else {
          const handleCanPlay = () => {
            if (!video.hasAttribute('data-loaded')) {
              video.setAttribute('data-loaded', 'true');
              mediaLoadedCount++;
              checkMediaProgress();
            }
          };
          const handleError = () => {
            if (!video.hasAttribute('data-loaded')) {
              video.setAttribute('data-loaded', 'true');
              mediaLoadedCount++;
              checkMediaProgress();
            }
          };
          
          video.addEventListener('canplaythrough', handleCanPlay, { once: true });
          video.addEventListener('loadeddata', handleCanPlay, { once: true });
          video.addEventListener('error', handleError, { once: true });
          
          checkedVideos++;
          if (checkedImages === images.length && checkedVideos === videos.length) {
            checkMediaProgress();
          }
        }
      });
      
      setTimeout(() => {
        if (!allMediaLoaded && mediaLoadedCount < totalMediaCount) {
          const remaining = totalMediaCount - mediaLoadedCount;
          mediaLoadedCount += remaining;
          checkMediaProgress();
        }
      }, 5000);
    }
    
    function checkMediaProgress() {
      if (mediaLoadedCount >= totalMediaCount && !allMediaLoaded) {
        allMediaLoaded = true;
      }
    }
    
    function updateProgressBar() {
      const mediaProgress = totalMediaCount > 0 ? mediaLoadedCount / totalMediaCount : 1;
      
      if (allMediaLoaded) {
        currentProgress = Math.min(1.0, currentProgress + 0.05);
      } else {
        currentProgress = Math.min(mediaProgress, currentProgress + 0.03);
      }
      
      currentProgress = Math.min(1.0, Math.max(currentProgress, mediaProgress * 0.5));
      
      if (currentProgress >= 0.99 && allMediaLoaded) {
        currentProgress = 1.0;
      }
      
      const currentThumbWidth = 100 + (currentProgress * (scrollbarWidth - 100));
      customScrollbarThumb.style.width = currentThumbWidth + 'px';
      customScrollbarThumb.style.transform = 'translate3d(0, 0, 0)';
      
      const scrollbarFilledWidth = currentProgress * scrollbarWidth;
      const gradientPositionPercent = (scrollbarFilledWidth / currentThumbWidth) * 100;
      const clampedGradientPos = Math.min(100, gradientPositionPercent);
      
      const targetPercentage = currentProgress * 100;
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
      
      if (currentProgress >= 1.0 && allMediaLoaded) {
        if (!progressCompleteTime) {
          progressCompleteTime = performance.now();
        }
        
        const holdDuration = performance.now() - progressCompleteTime;
        
        if (holdDuration >= holdAt100Duration) {
          completeProgressBar();
        } else {
          progressAnimationFrame = requestAnimationFrame(updateProgressBar);
        }
      } else {
        progressAnimationFrame = requestAnimationFrame(updateProgressBar);
      }
    }
    
    function completeProgressBar() {
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
    }
    
    let retryCount = 0;
    const maxRetries = 10;
    
    function startProgressBarAnimation() {
      if (!customScrollbarThumb || !portfolioLayout || !navigationLinks) return;
      
      const isMobile = window.innerWidth <= 768;
      
      if (isMobile) {
        if (loadingPercentage) {
          loadingPercentage.style.display = 'none';
        }
        if (customScrollbarThumb) {
          customScrollbarThumb.style.display = 'none';
        }
        
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
        
        return;
      }
      
      updateDimensions();
      
      if (!scrollbarWidth || scrollbarWidth === 0) {
        retryCount++;
        if (retryCount < maxRetries) {
          setTimeout(() => {
            updateDimensions();
            if (scrollbarWidth > 0) {
              retryCount = 0;
              startProgressBarAnimation();
            } else {
              startProgressBarAnimation();
            }
          }, 100);
          return;
        } else {
          scrollbarWidth = window.innerWidth || 800;
          retryCount = 0;
        }
      } else {
        retryCount = 0;
      }
      
      loadMediaElements();
      
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
      progressCompleteTime = null;
      
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          updateProgressBar();
        });
      });
    }
    
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        startProgressBarAnimation();
      });
    });
});
