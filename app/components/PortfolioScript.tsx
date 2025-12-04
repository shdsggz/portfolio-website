'use client'

import { useEffect } from 'react'

export default function PortfolioScript() {
  useEffect(() => {
    function restoreScrollPosition(portfolioSection: HTMLElement) {
      const savedScrollPosition = sessionStorage.getItem('portfolioScrollPosition')
      if (savedScrollPosition) {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            portfolioSection.scrollLeft = parseInt(savedScrollPosition, 10)
            sessionStorage.removeItem('portfolioScrollPosition')
          })
        })
      }
    }

    function saveScrollPosition() {
      const portfolioSection = document.querySelector('.portfolio-section') as HTMLElement
      if (portfolioSection) {
        sessionStorage.setItem('portfolioScrollPosition', portfolioSection.scrollLeft.toString())
      }
    }

    function initializeContent() {
      const clickableProjects = document.querySelectorAll('.large-project.clickable, .small-project.clickable')
      clickableProjects.forEach(project => {
        project.classList.add('loaded')
      })
    }

    function initPortfolioLayout() {
      const portfolioSection = document.querySelector('.portfolio-section') as HTMLElement
      if (!portfolioSection) {
        console.error('Portfolio section not found')
        return
      }

      restoreScrollPosition(portfolioSection)
      initializeContent()

      function handlePortfolioScroll(e: WheelEvent) {
        if (window.innerWidth > 768) {
          if (e.ctrlKey || e.metaKey) {
            return
          }
          
          e.preventDefault()
          let scrollDelta = 0
          if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
            scrollDelta = e.deltaX * 0.5
          } else {
            scrollDelta = e.deltaY * 0.5
          }
          portfolioSection.scrollLeft += scrollDelta
        }
      }

      portfolioSection.addEventListener('wheel', handlePortfolioScroll, { passive: false })

      document.body.addEventListener('wheel', (e: WheelEvent) => {
        if (window.innerWidth > 768) {
          if ((e.target as HTMLElement).closest('.portfolio-section')) {
            return
          }
          
          handlePortfolioScroll(e)
        }
      }, { passive: false })
    }

    const handlePageshow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        initPortfolioLayout()
      }
    }

    const handlePagehide = (event: PageTransitionEvent) => {
      if (event.persisted) {
        saveScrollPosition()
      }
    }

    window.addEventListener('pageshow', handlePageshow)
    window.addEventListener('pagehide', handlePagehide)
    window.addEventListener('load', initPortfolioLayout)

    return () => {
      window.removeEventListener('pageshow', handlePageshow)
      window.removeEventListener('pagehide', handlePagehide)
      window.removeEventListener('load', initPortfolioLayout)
    }
  }, [])

  return null
}

