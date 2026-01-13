import { topics } from '@/data/topics';
import Brick from '@/components/Brick';

export default function HomePage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#000',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px',
    }}>
      {/* Title */}
      <h1 style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: '64px',
        fontWeight: '700',
        color: '#fff',
        letterSpacing: '8px',
        marginBottom: '40px',
        textAlign: 'center',
      }}>
        IS THIS HERESY?
      </h1>

      {/* Brick mosaic */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px',
        justifyContent: 'center',
        maxWidth: '900px',
      }}>
        {topics.map((topic) => (
          <Brick key={topic.id} topic={topic} />
        ))}
      </div>

      {/* Footer */}
      <footer style={{
        marginTop: '60px',
        fontFamily: "'Space Mono', monospace",
        fontSize: '12px',
        fontWeight: '400',
        color: '#666',
        letterSpacing: '1px',
        textAlign: 'center',
      }}>
        the only constant is change
      </footer>
    </div>
  );
}
