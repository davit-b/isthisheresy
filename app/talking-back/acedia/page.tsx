import type { Metadata } from 'next';
import Link from 'next/link';
import { Noto_Serif_Armenian } from 'next/font/google';
import { acediaEntries, acediaSection } from '@/data/talking-back/acedia';

const serif = Noto_Serif_Armenian({ subsets: ['armenian', 'latin'], weight: ['400', '600'] });

const title = 'Evagrius, Talking Back: Against Acedia (Armenian and English)';
const description =
  'The acedia book of Evagrius of Pontus: 59 tempting thoughts of the noonday demon, each answered with scripture. Classical Armenian and English side by side.';

export const metadata: Metadata = {
  metadataBase: new URL('https://isthisheresy.com'),
  title: `${title} | Is This Heresy?`,
  description,
  openGraph: { title, description, type: 'article', siteName: 'Is This Heresy?' },
  twitter: { card: 'summary', title, description },
};

export default function AcediaPage() {
  return (
    <main className="tb-page">
      <Link href="/talking-back" className="back-link tb-mono" style={{ fontSize: '12px' }}>
        ← Talking Back
      </Link>
      <h1 className="tb-mono tb-title">TALKING BACK: ACEDIA</h1>
      <p className="tb-byline">
        Evagrius of Pontus, 4th century. Armenian text: Sargisean, Venice 1907 (public domain). English: translated
        from the Armenian for this site.
      </p>
      <p className={`tb-intro ${serif.className}`}>
        Acedia is the noonday demon of the desert monks: a heavy weariness that makes the cell feel like a prison,
        stretches the hours, and makes every other place and every other person look better. Evagrius, a monk in the
        Egyptian desert, wrote down the thoughts it whispers and answered each one with a line of scripture, the way
        Christ answered the tempter in the wilderness. The Armenian translation calls it ձանձրութիւն, the same root
        as the modern Armenian word for boredom. Read a thought, then read the answer back to it.
      </p>

      <div className={`tb-entries ${serif.className}`}>
        <div className="tb-row tb-heading">
          <div lang="hy" className="tb-hy tb-hy-t">
            {acediaSection.headingHy}
          </div>
          <div className="tb-en tb-en-t">
            {acediaSection.headingEn}
            <div className="tb-note">{acediaSection.headingNote}</div>
          </div>
        </div>

        {acediaEntries.map((e) => (
          <section key={e.n} id={String(e.n)} className="tb-row">
            <p lang="hy" className="tb-hy tb-hy-t">
              <span className="tb-num">{e.numeral}.</span> {e.thoughtHy}
            </p>
            <p lang="hy" className="tb-hy tb-hy-v">
              <span className="tb-src">{e.sourceHy}.</span> {e.verseHy}
            </p>
            <p className="tb-en tb-en-t">
              <a href={`#${e.n}`} className="tb-num">
                {e.n}.
              </a>{' '}
              {e.thoughtEn}
            </p>
            <div className="tb-en tb-en-v">
              <p>
                <span className="tb-src">{e.ref}.</span> &ldquo;{e.verseEn}&rdquo;
              </p>
              {e.note && <p className="tb-note">{e.note}</p>}
              <p className="tb-page-ref tb-mono">p. {e.bookPage}</p>
            </div>
          </section>
        ))}

        <div className="tb-row tb-closing">
          <p lang="hy" className="tb-hy tb-hy-t">
            <span className="tb-num">Կ.</span> {acediaSection.closingHy}
          </p>
          <p className="tb-en tb-en-t">{acediaSection.closingEn}</p>
        </div>
      </div>

      <p className="tb-byline" style={{ marginTop: '48px' }}>
        {acediaSection.credit} [?] marks a word the scan does not settle; notes under an entry say why.
      </p>
    </main>
  );
}
