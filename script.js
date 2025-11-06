window.addEventListener('load', function () {
    const portfolioSection = document.querySelector('.portfolio-section');
    if (!portfolioSection) {
      console.error('Portfolio section not found'); return;
    }

    function initializeContent() {
      const clickableProjects = document.querySelectorAll('.large-project.clickable, .small-project.clickable');
      clickableProjects.forEach(project => {
        project.classList.add('loaded');
      });
    }
    
    function alignRows() {
      const topRow = document.querySelector('.top-row');
      const bottomRow = document.querySelector('.bottom-row');
      const portfolioLayout = document.querySelector('.portfolio-layout');
      
      if (!topRow || !bottomRow || !portfolioLayout) return;
      
      requestAnimationFrame(() => {
        const portfolioSection = document.querySelector('.portfolio-section');
        const padding = 4;
        
        const topRowProjects = Array.from(topRow.querySelectorAll('.small-project'));
        const bottomRowProjects = Array.from(bottomRow.querySelectorAll('.small-project'));
        
        if (topRowProjects.length === 0 || bottomRowProjects.length === 0) return;
        
        const topLastProject = topRowProjects[topRowProjects.length - 1];
        const bottomLastProject = bottomRowProjects[bottomRowProjects.length - 1];
        
        const topRowWidth = topLastProject.offsetLeft + topLastProject.offsetWidth;
        const bottomRowWidth = bottomLastProject.offsetLeft + bottomLastProject.offsetWidth;
        
        const shorterRow = topRowWidth <= bottomRowWidth ? topRow : bottomRow;
        const shorterRowWidth = topRowWidth <= bottomRowWidth ? topRowWidth : bottomRowWidth;
        const longerRowWidth = topRowWidth <= bottomRowWidth ? bottomRowWidth : topRowWidth;
        const lastProjectInShorterRow = topRowWidth <= bottomRowWidth ? topLastProject : bottomLastProject;
        
        const targetWidth = longerRowWidth - lastProjectInShorterRow.offsetLeft;
        
        const currentWidth = lastProjectInShorterRow.offsetWidth;
        
        const scaleFactor = currentWidth > 0 ? targetWidth / currentWidth : 1;
        
        const media = lastProjectInShorterRow.querySelector('.project-media');
        const mediaOriginalWidth = media ? media.offsetWidth : 0;
        
        lastProjectInShorterRow.style.width = targetWidth + 'px';
        lastProjectInShorterRow.style.overflow = 'hidden';
        lastProjectInShorterRow.style.justifyContent = 'flex-start';
        
        if (media && scaleFactor > 1 && mediaOriginalWidth > 0) {
          requestAnimationFrame(() => {
            media.style.width = targetWidth + 'px';
            media.style.height = '100%';
            media.style.maxWidth = 'none';
            media.style.objectFit = 'cover';
            media.style.objectPosition = 'left center';
            media.style.marginLeft = '0';
            media.style.marginRight = 'auto';
          });
        }
      });
    }
    
    setTimeout(() => {
      alignRows();
    }, 200);
    
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
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
    
    function handlePortfolioScroll(e) {
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
    
    initializeContent();
});
