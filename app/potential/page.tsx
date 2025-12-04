import Link from 'next/link'
import Image from 'next/image'
import './potential.css'

export const metadata = {
  title: 'Potential | Leo Song',
  description: 'An animation that captures the moment my hidden potential is realized after falling and rising again.',
}

export default function PotentialPage() {
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
              <div className="hero-subtitle">Motion Design</div>
              <div className="hero-title">Potential</div>
            </div>
            
            <div className="hero-video-wrapper">
              <video className="hero-video" controls loop playsInline poster="/media/potential/potential_thumb.webp">
                <source src="/media/potential/potential_full.mp4" type="video/mp4" />
              </video>
            </div>
            
            <div className="meta-section">
              <div className="meta-item">
                <div className="meta-label">Role</div>
                <div className="meta-value">Motion Designer</div>
              </div>
              <div className="meta-item">
                <div className="meta-label">Skills</div>
                <div className="meta-value">After Effects</div>
              </div>
              <div className="meta-item">
                <div className="meta-label">Timeline</div>
                <div className="meta-value">2 Weeks</div>
              </div>
              <div className="meta-item">
                <div className="meta-label">Team</div>
                <div className="meta-value">Independent</div>
              </div>
            </div>
          </div>
          
          <div className="section-text">An animation that captures the moment my hidden potential is realized after falling and rising again.</div>
          
          <div className="feature-section">
            <div className="feature-header">
              <div className="section-title">Storyboard</div>
              <div className="storyboard-image-wrapper">
                <Image 
                  className="storyboard-image" 
                  src="/media/potential/potential_storyboard.webp" 
                  alt="Potential Storyboard"
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

