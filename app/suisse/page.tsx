import Link from 'next/link'
import Image from 'next/image'
import './suisse.css'

export const metadata = {
  title: 'Suisse Specimen Guide | Leo Song',
  description: 'Suisse Specimen Guide was inspired by Stanley Kubrick\'s 2001: A Space Odyssey.',
}

export default function SuissePage() {
  return (
    <div className="main-container">
      <aside className="sidebar">
        <div className="back-link-container">
          <Link href="/" className="back-link">← back</Link>
        </div>
      </aside>
      
      <main className="main-content">
        <div className="content-container">
          <div className="hero-section">
            <div className="hero-title-section">
              <div className="hero-subtitle">Typography Booklet Design</div>
              <div className="hero-title">Suisse Specimen Guide</div>
            </div>
            <Image 
              className="hero-main" 
              src="/media/suisse/suisse_thumb.webp" 
              alt="Suisse Hero"
              loading="eager"
              priority
              width={1000}
              height={562}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
            <div className="meta-section">
              <div className="meta-item">
                <div className="meta-label">Role</div>
                <div className="meta-value">Graphic Designer</div>
              </div>
              <div className="meta-item">
                <div className="meta-label">Skills</div>
                <div className="meta-value">Typography<br/>InDesign</div>
              </div>
              <div className="meta-item">
                <div className="meta-label">Timeline</div>
                <div className="meta-value">5 Weeks</div>
              </div>
              <div className="meta-item">
                <div className="meta-label">Team</div>
                <div className="meta-value">Independent</div>
              </div>
            </div>
          </div>
          
          <div className="section-text">Suisse Specimen Guide was inspired by Stanley Kubrick's <br />2001: A Space Odyssey.</div>
          
          <div className="feature-section">
            <div className="feature-header">
              <div className="section-title">Full Spreads</div>
              <div className="full-width-image-wrapper">
                <Image 
                  className="full-width-image" 
                  src="/media/suisse/suisse_spreads.webp" 
                  alt="Suisse Full Spreads"
                  loading="lazy"
                  width={1044}
                  height={588}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

