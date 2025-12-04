import Link from 'next/link'
import Image from 'next/image'
import './popmore.css'

export const metadata = {
  title: 'Reimagining Unboxing: A Digital Second Chance at Discovery | Leo Song',
  description: 'Popmore is a companion app that lets collectors relive the excitement of unboxing twice.',
}

export default function PopmorePage() {
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
              <div className="hero-subtitle">Popmore — Mystery Box Companion App</div>
              <div className="hero-title">Reimagining Unboxing: A Digital Second Chance at Discovery</div>
            </div>
            <Image 
              className="hero-main" 
              src="/media/popmore/p-1.webp" 
              alt="Popmore Hero"
              loading="eager"
              priority
              width={1000}
              height={562}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
            <div className="meta-section">
              <div className="meta-item">
                <div className="meta-label">Role</div>
                <div className="meta-value">Product Designer<br/>UX Researcher</div>
              </div>
              <div className="meta-item">
                <div className="meta-label">Skills</div>
                <div className="meta-value">Figma</div>
              </div>
              <div className="meta-item">
                <div className="meta-label">Timeline</div>
                <div className="meta-value">4 Weeks</div>
              </div>
              <div className="meta-item">
                <div className="meta-label">Team</div>
                <div className="meta-value">Independent</div>
              </div>
            </div>
          </div>

          <div className="section-text">How might we reuse the product to let customers re-experience what they value most: the experience, not the product?</div>

          <div className="section-text bold">Popmore is a companion app that lets collectors relive the excitement of unboxing twice.</div>

          <div className="features-container">
            <div className="feature-section">
              <div className="feature-header">
                <div className="feature-number">Core Feature #1</div>
                <video className="feature-video" autoPlay muted loop playsInline>
                  <source src="/media/popmore/popmore-proto-1.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="text-section">
                <div className="section-title">Personalized Collection</div>
                <div className="section-text">Users can view, showcase, and organize their figures in a digital collection space, arranging them however they like.</div>
              </div>
            </div>

            <div className="feature-section">
              <div className="feature-header">
                <div className="feature-number">Core Feature #2</div>
                <video className="feature-video" autoPlay muted loop playsInline>
                  <source src="/media/popmore/popmore-proto-2.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="text-section">
                <div className="section-title">Claim a Digital Figure</div>
                <div className="section-text">When a user purchases a physical mystery box, they can unlock a matching digital figure in the app, giving them a second unboxing experience to relive.</div>
              </div>
            </div>

            <div className="feature-section feature-full-width">
              <div className="feature-header">
                <div className="feature-number">Core Feature #3</div>
                <Image 
                  className="feature-image" 
                  src="/media/popmore/p-10.webp" 
                  alt="Widget Feature"
                  loading="lazy"
                  width={891}
                  height={500}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
              <div className="text-section">
                <div className="section-title">Home Screen Widget</div>
                <div className="section-text">Figures can be added directly to the device's home screen as interactive widgets. Bringing the collection beyond the app and into daily life.</div>
              </div>
            </div>
          </div>

          <Image 
            className="small-image" 
            src="/media/popmore/p-3.webp" 
            alt="Context Image"
            loading="lazy"
            width={500}
            height={281}
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />

          <div className="text-section">
            <div className="section-title">Context</div>
            <div className="section-text">Mystery boxes are rapidly gaining popularity, with Pop Mart at the center of the <span className="bold">surprise-driven collecting culture.</span></div>
          </div>

          <div className="text-section">
            <div className="section-title">What I did</div>
            <div className="section-text">To better understand the culture around mystery boxes, I visited Pop Mart's offline store and immersed myself in the experience firsthand and interviewed <span className="bold">9 participants</span>.</div>
          </div>

          <div className="research-triangle">
            <div className="research-images">
              <Image 
                className="small-image" 
                src="/media/popmore/p-5.webp" 
                alt="Research Image 1"
                loading="lazy"
                width={300}
                height={169}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
              <Image 
                className="small-image" 
                src="/media/popmore/p-6.webp" 
                alt="Research Image 2"
                loading="lazy"
                width={300}
                height={169}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
            <div className="text-section">
              <Image 
                className="small-image" 
                src="/media/popmore/p-7.webp" 
                alt="KJ Method"
                loading="lazy"
                width={500}
                height={281}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
              <div className="section-text">I then synthesized the findings using the KJ method to identify core themes.</div>
            </div>
          </div>

          <Image 
            className="small-image" 
            src="/media/popmore/p-7.2.webp" 
            alt="Key Insight"
            loading="lazy"
            width={500}
            height={281}
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />

          <div className="text-section">
            <div className="section-title">What I discovered</div>
            <div className="section-text">I found that for many users, the true value of a mystery box lies in the excitement of unboxing rather than the item inside.</div>
          </div>

          <div className="text-section">
            <div className="section-title">Design Opportunity</div>
            <div className="section-text">What if unboxing could happen twice: once in your hands, and again on your screen?</div>
          </div>

          <Image 
            className="large-image" 
            src="/media/popmore/p-12.webp" 
            alt="Final Mockup"
            loading="lazy"
            width={1044}
            height={588}
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />

          <div className="text-section">
            <div className="section-text bold">In Popmore, the excitement doubles with a second unboxing!</div>
          </div>

          <div className="text-section">
            <div className="section-title">Reflection</div>
            <div className="section-text">An app isn't always the answer. Field research matters, because talking to users often reveals insights that challenge assumptions and expectations.</div>
          </div>

          <div className="text-section">
            <div className="disclaimer-title">Disclaimer</div>
            <div className="section-text">Pop Mart characters and figures displayed in this project are the intellectual property of Pop Mart. They are included strictly for academic and illustrative purposes to demonstrate a design concept. I do not claim ownership of these assets.</div>
          </div>
        </div>
      </main>
    </div>
  )
}

