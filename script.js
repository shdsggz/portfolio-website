window.addEventListener('load', function () {
    const portfolioSection = document.querySelector('.portfolio-section');
    if (!portfolioSection) {
      console.error('Portfolio section not found'); return;
    }

    // Initialize clickable projects immediately
    function initializeContent() {
      const clickableProjects = document.querySelectorAll('.large-project.clickable, .small-project.clickable');
      clickableProjects.forEach(project => {
        project.classList.add('loaded');
      });
    }
    
    // Align rows by constraining the last project in the shorter row
    function alignRows() {
      const topRow = document.querySelector('.top-row');
      const bottomRow = document.querySelector('.bottom-row');
      const portfolioLayout = document.querySelector('.portfolio-layout');
      
      if (!topRow || !bottomRow || !portfolioLayout) return;
      
      // Wait for layout to calculate
      requestAnimationFrame(() => {
        // Get the portfolio section padding (2px on each side = 4px total)
        const portfolioSection = document.querySelector('.portfolio-section');
        const padding = 4; // 2px on each side
        
        // Calculate total width of each row (including gap between projects)
        // Get the right edge of the last project in each row
        const topRowProjects = Array.from(topRow.querySelectorAll('.small-project'));
        const bottomRowProjects = Array.from(bottomRow.querySelectorAll('.small-project'));
        
        if (topRowProjects.length === 0 || bottomRowProjects.length === 0) return;
        
        const topLastProject = topRowProjects[topRowProjects.length - 1];
        const bottomLastProject = bottomRowProjects[bottomRowProjects.length - 1];
        
        // Get the right edge of each row (last project's right edge)
        const topRowWidth = topLastProject.offsetLeft + topLastProject.offsetWidth;
        const bottomRowWidth = bottomLastProject.offsetLeft + bottomLastProject.offsetWidth;
        
        // Find which row is shorter
        const shorterRow = topRowWidth <= bottomRowWidth ? topRow : bottomRow;
        const shorterRowWidth = topRowWidth <= bottomRowWidth ? topRowWidth : bottomRowWidth;
        const longerRowWidth = topRowWidth <= bottomRowWidth ? bottomRowWidth : topRowWidth;
        const lastProjectInShorterRow = topRowWidth <= bottomRowWidth ? topLastProject : bottomLastProject;
        
        // Calculate the target width for the last project in shorter row
        // It should extend to match the longer row's width
        const targetWidth = longerRowWidth - lastProjectInShorterRow.offsetLeft;
        
        // Get the current width of the project BEFORE changing it
        const currentWidth = lastProjectInShorterRow.offsetWidth;
        
        // Calculate scale factor
        const scaleFactor = currentWidth > 0 ? targetWidth / currentWidth : 1;
        
        // Get the media element BEFORE changing project width
        const media = lastProjectInShorterRow.querySelector('.project-media');
        const mediaOriginalWidth = media ? media.offsetWidth : 0;
        
        // Apply fixed width to the last project in shorter row
        lastProjectInShorterRow.style.width = targetWidth + 'px';
        lastProjectInShorterRow.style.overflow = 'hidden';
        // Ensure the project aligns content to the left
        lastProjectInShorterRow.style.justifyContent = 'flex-start';
        
        // Scale the media inside to fill the space (zoom in horizontally)
        if (media && scaleFactor > 1 && mediaOriginalWidth > 0) {
          // Wait a frame for the container width to update
          requestAnimationFrame(() => {
            // Set the media width to fill the new container width
            media.style.width = targetWidth + 'px';
            media.style.height = '100%';
            media.style.maxWidth = 'none';
            media.style.objectFit = 'cover';
            media.style.objectPosition = 'left center';
            // Ensure media is positioned from left
            media.style.marginLeft = '0';
            media.style.marginRight = 'auto';
          });
        }
      });
    }
    
    // Wait for media to load and layout to settle
    setTimeout(() => {
      alignRows();
    }, 200);
    
    // Re-align on window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Reset width, overflow, and media styles first
        document.querySelectorAll('.small-project').forEach(project => {
          project.style.width = '';
          project.style.overflow = '';
          project.style.justifyContent = '';
          const media = project.querySelector('.project-media');
          if (media) {
            media.style.width = '';
            media.style.height = '';
            media.style.maxWidth = '';
            media.style.objectFit = '';
            media.style.objectPosition = '';
            media.style.marginLeft = '';
            media.style.marginRight = '';
          }
        });
        alignRows();
      }, 250);
    });
    
    // Wheel event for horizontal scrolling (desktop only)
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
    
    initializeContent();
});
