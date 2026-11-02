import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  metadataBase: new URL('https://isthisheresy.com'),
  title: 'Talking Back: Evagrius in Armenian and English | Is This Heresy?',
  description:
    'Evagrius of Pontus answered each tempting thought with a line of scripture. The Classical Armenian text with an English translation, side by side.',
  openGraph: {
    title: 'Talking Back: Evagrius in Armenian and English',
    description: 'Evagrius of Pontus, Talking Back. Classical Armenian and English side by side.',
    type: 'website',
    siteName: 'Is This Heresy?',
  },
};

// Evagrius's eight books, in his order. Only books with a slug are live.
const books: { title: string; slug?: string }[] = [
  { title: 'Gluttony' },
  { title: 'Lust' },
  { title: 'Avarice' },
  { title: 'Sadness' },
  { title: 'Anger' },
  { title: 'Acedia', slug: 'acedia' },
  { title: 'Vainglory' },
  { title: 'Pride' },
];

export default function TalkingBackIndex() {
  return (
    <main className="tb-page">
      <Link href="/" className="back-link tb-mono" style={{ fontSize: '12px' }}>
        ← Is This Heresy?
      </Link>
      <h1 className="tb-mono tb-title">TALKING BACK</h1>
      <p className="tb-byline">
        Evagrius of Pontus, 4th century. Armenian text: Sargisean, Venice 1907 (public domain). English: translated
        from the Armenian for this site.
      </p>
      <ol className="tb-books">
        {books.map((b, i) => (
          <li key={b.title} className="tb-mono">
            <span className="tb-books-n">{i + 1}</span>
            {b.slug ? (
              <Link href={`/talking-back/${b.slug}`} className="tb-books-live">
                {b.title}
              </Link>
            ) : (
              <span className="tb-books-soon">{b.title}</span>
            )}
          </li>
        ))}
      </ol>
    </main>
  );
}
