export const instant = false
import Link from 'next/link'

const CATEGORIES = [
  { name: 'Plumbing', icon: '🔧', desc: 'Leaks, pipes, and installations' },
  { name: 'Electrical', icon: '⚡', desc: 'Wiring, sockets, and repairs' },
  { name: 'Carpentry', icon: '🪚', desc: 'Furniture and woodwork' },
  { name: 'Painting', icon: '🎨', desc: 'Interior and exterior painting' },
  { name: 'AC Repair', icon: '❄️', desc: 'Servicing and installation' },
  { name: 'Cleaning', icon: '🧹', desc: 'Deep cleaning services' },
]

export default function ArtisansDirectory() {
  return (
    <div style={{ minHeight: 'calc(100vh - 80px)', padding: '80px 0', position: 'relative' }}>
      
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div style={{ textAlign: 'center', marginBottom: '80px', perspective: '1000px' }}>
          <h1 className="hero-title">
            SELECT A <span style={{ color: 'var(--color-primary)', WebkitTextFillColor: 'var(--color-primary)' }}>SERVICE</span>
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.2rem', marginTop: '20px', fontWeight: 500 }}>
            Choose a category to find vetted professionals ready to work.
          </p>
        </div>

        <div className="scene-3d" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '40px' }}>
          {CATEGORIES.map((cat) => (
            <Link key={cat.name} href={`/search?category=${encodeURIComponent(cat.name)}`}>
              <div className="card-3d" style={{ padding: '40px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                
                <div className="icon-3d" style={{ marginBottom: '30px' }}>
                  {cat.icon}
                </div>
                
                <div className="text-3d">
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '10px' }}>{cat.name}</h2>
                  <p style={{ color: 'var(--color-text-muted)', marginBottom: '40px', flexGrow: 1, fontSize: '1rem' }}>
                    {cat.desc}
                  </p>
                </div>
                
                <div className="text-3d" style={{ 
                  color: 'var(--color-primary)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px',
                  textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem', marginTop: 'auto'
                }}>
                  Explore <span style={{ fontSize: '1.2rem' }}>→</span>
                </div>

              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
