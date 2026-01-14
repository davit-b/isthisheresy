import { notFound, redirect } from 'next/navigation';
import { Metadata } from 'next';
import { topics, getTopicById, isGroupHost, getGroupedTopics } from '@/data/topics';
import LeftRail from '@/components/LeftRail';
import InfographicViewer from '@/components/InfographicViewer';
import MultiInfographicViewer from '@/components/MultiInfographicViewer';
import BottomBar from '@/components/BottomBar';
import ReadTracker from '@/components/ReadTracker';
import MobileHeader from '@/components/MobileHeader';
import TopicPageLayout from '@/components/TopicPageLayout';

interface PageProps {
  params: { topic: string };
}

// Generate static params for all topics (including grouped ones for redirect handling)
export function generateStaticParams() {
  return topics.map((topic) => ({
    topic: topic.id,
  }));
}

// Generate metadata for each topic (OpenGraph)
export function generateMetadata({ params }: PageProps): Metadata {
  const topic = getTopicById(params.topic);

  if (!topic) {
    return { title: 'Not Found' };
  }

  const baseUrl = 'https://isthisheresy.com';
  // Use OG-cropped image (1200x630) for social sharing
  const imageName = topic.imageName ?? topic.id;
  const ogImageUrl = `${baseUrl}/images/${imageName}-en-og.webp`;
  const pageUrl = `${baseUrl}/${topic.id}`;

  return {
    title: `${topic.longTitle} | Is This Heresy?`,
    description: topic.shareSnippet,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: topic.longTitle,
      description: topic.shareSnippet,
      url: pageUrl,
      type: 'article',
      siteName: 'Is This Heresy?',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: topic.longTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: topic.longTitle,
      description: topic.shareSnippet,
      images: [ogImageUrl],
    },
  };
}

export default function TopicPage({ params }: PageProps) {
  const topic = getTopicById(params.topic);

  if (!topic) {
    notFound();
  }

  // If this is a grouped topic (not a host), redirect to the host page with anchor
  if (topic.groupHost) {
    redirect(`/${topic.groupHost}#${topic.id}`);
  }

  // Check if this topic is a group host (has other topics grouped under it)
  const isHost = isGroupHost(topic.id);
  const groupedTopics = isHost ? getGroupedTopics(topic.id) : [topic];

  // Structured data for topic article
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: topic.longTitle,
    description: topic.shareSnippet,
    image: `https://isthisheresy.com/images/${topic.imageName}-en-medium.webp`,
    author: {
      '@type': 'Organization',
      name: 'Is This Heresy?',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Is This Heresy?',
      url: 'https://isthisheresy.com',
    },
    url: `https://isthisheresy.com/${topic.id}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://isthisheresy.com/${topic.id}`,
    },
  };

  return (
    <>
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <TopicPageLayout
        readTracker={<ReadTracker topicId={topic.id} />}
        mobileHeader={<MobileHeader currentTopic={topic} />}
        leftRail={<LeftRail currentTopic={topic} />}
        bottomBar={<BottomBar topic={topic} />}
      >
        {/* Title header for long titles - desktop only */}
        {topic.brickTitle.length > 15 && (
          <div
            className="desktop-only"
            style={{
              padding: '16px 24px',
              borderBottom: '1px solid #222',
              fontFamily: "'Space Mono', monospace",
              fontSize: '20px',
              fontWeight: '700',
              color: '#fff',
              letterSpacing: '2px',
            }}
          >
            {topic.longTitle}
          </div>
        )}

        {isHost ? (
          <MultiInfographicViewer topics={groupedTopics} hostTopic={topic} />
        ) : (
          <InfographicViewer topic={topic} />
        )}
      </TopicPageLayout>
    </>
  );
}
