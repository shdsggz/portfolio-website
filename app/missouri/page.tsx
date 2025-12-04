import Link from 'next/link'
import Image from 'next/image'
import './missouri.css'

export const metadata = {
  title: 'Voices of Missouri | Leo Song',
  description: 'Missouri is not defined by a single story. This booklet weaves seven symbols into a unified identity.',
}

export default function MissouriPage() {
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
              <div className="hero-subtitle">Booklet, Iconography Design</div>
              <div className="hero-title">Voices of Missouri</div>
            </div>
            <Image 
              className="hero-main" 
              src="/media/missouri/missouri_thumb.webp" 
              alt="Missouri Hero"
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
                <div className="meta-value">Illustrator<br/>InDesign</div>
              </div>
              <div className="meta-item">
                <div className="meta-label">Timeline</div>
                <div className="meta-value">8 Weeks</div>
              </div>
              <div className="meta-item">
                <div className="meta-label">Team</div>
                <div className="meta-value">Independent</div>
              </div>
            </div>
          </div>
          
          <div className="section-text">Missouri is not defined by a single story. This booklet weaves seven symbols into a unified identity.</div>
          
          <div className="feature-section">
            <div className="feature-header">
              <div className="section-title">Full Spreads</div>
              <div className="full-width-image-wrapper">
                <Image 
                  className="full-width-image" 
                  src="/media/missouri/missourispread.webp" 
                  alt="Missouri Full Spreads"
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

