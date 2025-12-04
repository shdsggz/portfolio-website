import Link from 'next/link'
import PortfolioScript from './components/PortfolioScript'

export default function Home() {
  return (
    <>
      {/* SEO Hidden Heading */}
      <h1 className="visually-hidden">Leo Song — Interaction Designer & Creative Technologist</h1>
      
      {/* Main container */}
      <div className="main-container">
        
        {/* Top section */}
        <section className="top-section">
          <div className="bottom-content">
            <h3 className="name">Leo Song — Interaction Designer</h3>
            <h3 className="name name-right">Los Angeles, CA</h3>
            
            <div className="navigation-links">
              <div className="nav-group">
                <a href="https://drive.google.com/file/d/1gAs_-LoeHNJfsli1blUsnRxsu8c2COE8/view?usp=sharing" className="nav-link" target="_blank" rel="noopener noreferrer">Resume</a>
                <a href="mailto:shdsggz@gmail.com" className="nav-link">
                  <span className="email-text">Email</span>
                </a>
                <a href="https://www.linkedin.com/in/songleoo/" className="nav-link" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </div>
            </div>
          </div>
        </section>
        
        {/* Work */}
        <section className="portfolio-section">
          <div className="portfolio-layout">
            {/* Large Project 2 */}
            <Link href="/jdv" className="large-project large-project-jdv large-project-with-padding clickable">
              <video autoPlay muted loop className="project-media" playsInline preload="auto" {...({ fetchPriority: 'high' } as any)}>
                <source src="/media/jdv.mp4" type="video/mp4" />
              </video>
              <div className="project-description">John Deere: Vision 2035 [WIP]</div>
            </Link>
            
            {/* Large Project */}
            <Link href="/popmore" className="large-project large-project-popmore large-project-with-padding clickable">
              <video autoPlay muted loop className="project-media" playsInline preload="auto" {...({ fetchPriority: 'high' } as any)}>
                <source src="/media/popmore.mp4" type="video/mp4" />
              </video>
              <div className="project-description">Reimagining Unboxing, App Design</div>
            </Link>
            
            {/* Two Row Container */}
            <div className="two-rows-container">
              {/* Top Row */}
              <div className="top-row">
                <Link href="/potential" className="small-project clickable">
                  <video autoPlay muted loop className="project-media" playsInline preload="metadata">
                    <source src="/media/Potential.mp4" type="video/mp4" />
                  </video>
                  <div className="project-description">Potential — After Effects</div>
                </Link>
                
                <Link href="/missouri" className="small-project clickable missouri-project">
                  <img 
                    src="/media/missouri.webp" 
                    alt="Voices of Missouri" 
                    className="project-media" 
                    loading="eager" 
                    decoding="async"
                    fetchPriority="low"
                    width={3766}
                    height={2100}
                  />
                  <div className="project-description">Voices of Missouri, Booklet Design</div>
                </Link>
              
                
                <div className="small-project">
                  <video autoPlay muted loop className="project-media" playsInline preload="none">
                    <source src="/media/qp.mp4" type="video/mp4" />
                  </video>
                  <div className="project-description">Calabi Yau Manifold — Blender</div>
                </div>
              </div>
              
              {/* Bottom Row */}
              <div className="bottom-row">
                <Link href="/suisse" className="small-project clickable">
                  <video autoPlay muted loop className="project-media" playsInline preload="metadata">
                    <source src="/media/Suisse.mp4" type="video/mp4" />
                  </video>
                  <div className="project-description">Suisse Specimen Guide</div>
                </Link>
                <div className="small-project">
                  <video autoPlay muted loop className="project-media" playsInline preload="none">
                    <source src="/media/qp-2.mp4" type="video/mp4" />
                  </video>
                  <div className="project-description">Quantum Medical Bed — Blender, Midjourney</div>
                </div>
                
         
                <div className="small-project">
                  <video autoPlay muted loop className="project-media" playsInline preload="none">
                    <source src="/media/starwars.mp4" type="video/mp4" />
                  </video>
                  <div className="project-description">Star Wars — Unreal Engine 5</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <PortfolioScript />
    </>
  )
}

