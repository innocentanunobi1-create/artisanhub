import { Button } from '@/components/Button'

const SLIDESHOW_ITEMS = [
  { icon: '🔧', name: 'Plumbing' },
  { icon: '⚡', name: 'Electrical' },
  { icon: '🪚', name: 'Carpentry' },
  { icon: '🎨', name: 'Painting' },
  { icon: '❄️', name: 'AC Repair' },
  { icon: '🧹', name: 'Cleaning' },
  { icon: '🔋', name: 'Generator' },
  { icon: '🔥', name: 'Welding' },
]

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', overflow: 'hidden', position: 'relative' }}>
      
      <section style={{ padding: '120px 20px 80px 20px', textAlign: 'center', position: 'relative', zIndex: 10 }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <div style={{ 
            display: 'inline-block', padding: '8px 24px', borderRadius: '50px', 
            border: '1px solid rgba(16, 185, 129, 0.3)', background: 'rgba(16, 185, 129, 0.1)',
            color: 'var(--color-primary)', fontWeight: 700, marginBottom: '30px',
            letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.9rem'
          }}>
            🇳🇬 The #1 Marketplace in Nigeria
          </div>

          <h1 className="hero-title">
            FIND THE RIGHT <br />
            <span>PROFESSIONAL.</span>
          </h1>

          <p style={{ fontSize: '1.3rem', color: 'var(--color-text-muted)', margin: '0 auto 50px auto', maxWidth: '650px' }}>
            Connect instantly with world-class plumbers, electricians, and builders. 
            Verified. Trusted. Ready to work.
          </p>

          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button href="/artisans" variant="primary" style={{ fontSize: '1.1rem', padding: '16px 40px' }}>
              Find An Artisan
            </Button>
            <Button href="/register" variant="secondary" style={{ fontSize: '1.1rem', padding: '16px 40px' }}>
              Join As A Pro
            </Button>
          </div>
        </div>
      </section>

      <section style={{ padding: '60px 0', position: 'relative', zIndex: 10 }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--color-text-muted)', letterSpacing: '2px', textTransform: 'uppercase' }}>
            Explore The Categories
          </h2>
        </div>
        
        <div className="marquee-wrapper">
          <div className="marquee-content">
            {[...SLIDESHOW_ITEMS, ...SLIDESHOW_ITEMS].map((item, index) => (
              <div key={index} className="marquee-item">
                {item.icon}
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container" style={{ padding: '120px 20px', position: 'relative', zIndex: 10 }}>
        <div className="card-3d" style={{ padding: '60px', textAlign: 'center', maxWidth: '900px', margin: '0 auto', cursor: 'default' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '20px' }}>
            What is Artisan<span style={{ color: 'var(--color-primary)' }}>Hub</span>?
          </h2>
          <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', lineHeight: 1.8 }}>
            ArtisanHub is a next-generation marketplace connecting customers directly with highly skilled professionals. 
            No more calling ten different numbers or risking unverified workers. We provide a secure, seamless, 
            and instant booking experience for every household in Nigeria.
          </p>
        </div>
      </section>

    </div>
  )
}
