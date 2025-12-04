import Link from 'next/link'
import Image from 'next/image'
import './jdv.css'

export const metadata = {
  title: 'John Deere: Vision 2035 [WIP] | Leo Song',
  description: 'STAG is a command deck that lets farmers control multiple tractors at once using a 2D map and 3D real-time view.',
}

export default function JDVPage() {
  return (
    <div className="main-container">
      {/* Left Sidebar */}
      <aside className="sidebar">
        <div className="back-link-container">
          <Link href="/" className="back-link">← back</Link>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="main-content">
        <div className="content-container">
          
          {/* Hero Section */}
          <div className="hero-section">
            <div className="hero-title-section">
              <div className="hero-subtitle">STAG — A Next-Gen UI for Autonomous Agricultural Agents</div>
              <div className="hero-title">John Deere: Vision 2035 [WIP]</div>
            </div>
            <Image 
              className="hero-main" 
              src="/media/jdv/jdv_thumb.webp" 
              alt="John Deere Vision 2035 Hero"
              loading="eager"
              priority
              width={1000}
              height={562}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
            
            {/* Meta Section */}
            <div className="meta-section">
              <div className="meta-item">
                <div className="meta-label">Role</div>
                <div className="meta-value">Product Designer</div>
              </div>
              <div className="meta-item">
                <div className="meta-label">Skills</div>
                <div className="meta-value">Unreal Engine 5<br/>Figma<br/>After Effects</div>
              </div>
              <div className="meta-item">
                <div className="meta-label">Timeline</div>
                <div className="meta-value">Ongoing</div>
              </div>
              <div className="meta-item">
                <div className="meta-label">Team</div>
                <div className="meta-value">Independent</div>
              </div>
            </div>
          </div>
          
          {/* Description */}
          <div className="section-text">How might the farmer command the entire autonomous fleet <br />in 2035?</div>

          <div className="section-text bold">STAG is a command deck that lets farmers control multiple tractors at once using a 2D map and 3D real-time view.</div>
          
          {/* Core Features */}
          <div className="features-container">
            {/* Core Feature 1 */}
            <div className="feature-section feature-section-first">
              <div className="feature-header">
                <div className="feature-number">Core Feature #1</div>
                <video className="feature-video" autoPlay muted loop playsInline>
                  <source src="/media/jdv/jdv_feature_1.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="text-section">
                <div className="section-title">Field Grid</div>
                <div className="section-text">The primary 2D command map where farmers manage all active tasks and instantly track the color-coded status of every autonomous asset on the farm.</div>
              </div>
              <video className="feature-video" autoPlay muted loop playsInline>
                <source src="/media/jdv/jdv_feature_2.1.mp4" type="video/mp4" />
              </video>
            </div>

            {/* Core Feature 2 */}
            <div className="feature-section">
              <div className="feature-header">
                <div className="feature-number">Core Feature #2</div>
                <video className="feature-video" autoPlay muted loop playsInline>
                  <source src="/media/jdv/jdv_feature_2.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="text-section">
                <div className="section-title">Live Vision</div>
                <div className="section-text">A real-time 3D view that allows farmers to virtually enter the field and visually verify the actual movement and operational status of any machine.</div>
              </div>
            </div>

            {/* Core Feature 3 */}
            <div className="feature-section">
              <div className="feature-header">
                <div className="feature-number">Core Feature #3</div>
                <Image 
                  className="feature-image" 
                  src="/media/jdv/jdv_feature_3.webp" 
                  alt="Core Feature 3"
                  loading="lazy"
                  width={891}
                  height={500}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
              <div className="text-section">
                <div className="section-title">Coming Soon</div>
              </div>
            </div>

            <div className="text-section">
              <div className="section-title">Context</div>
              <div className="section-text">Currently, the demand for food is increasing due to a rising U.S. population, while the agricultural labor force is simultaneously decreasing.</div>
            </div>

            <div className="text-section">
              <div className="section-title">Opportunity</div>
              <div className="section-text">I found that this critical imbalance presents a pivotal opportunity to design the 2035 command system, enabling a single farmer to seamlessly manage entire fleets of autonomous assets.</div>
            </div>

            <div className="process-section">
              <div className="text-section">
                <div className="section-title">Process</div>
              </div>
              <Image 
                className="process-image" 
                src="/media/jdv/process.webp" 
                alt="Process Image"
                loading="lazy"
                width={1044}
                height={588}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
          </div>
          
        </div>
      </main>
    </div>
  )
}

