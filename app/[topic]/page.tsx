import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { topics, getTopicById } from '@/data/topics';
import LeftRail from '@/components/LeftRail';
import InfographicViewer from '@/components/InfographicViewer';
import BottomBar from '@/components/BottomBar';
import ReadTracker from '@/components/ReadTracker';

interface PageProps {
  params: { topic: string };
}

// Generate static params for all topics
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

  return {
    title: `${topic.longTitle} | Is This Heresy?`,
    description: topic.shareSnippet,
    openGraph: {
      title: topic.longTitle,
      description: topic.shareSnippet,
      type: 'article',
      siteName: 'Is This Heresy?',
      images: [
        {
          url: `/images/${topic.imageName}-medium.webp`,
          width: 1200,
          height: 1800,
          alt: topic.longTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: topic.longTitle,
      description: topic.shareSnippet,
      images: [`/images/${topic.imageName}-medium.webp`],
    },
  };
}

export default function TopicPage({ params }: PageProps) {
  const topic = getTopicById(params.topic);

  if (!topic) {
    notFound();
  }

  return (
    <div style={{
      height: '100vh',
      background: '#000',
      display: 'flex',
      overflow: 'hidden',
    }}>
      <ReadTracker topicId={topic.id} />
      <LeftRail currentTopic={topic} />

      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>
        {/* Title header for long titles */}
        {topic.brickTitle.length > 15 && (
          <div style={{
            padding: '16px 24px',
            borderBottom: '1px solid #222',
            fontFamily: "'Space Mono', monospace",
            fontSize: '20px',
            fontWeight: '700',
            color: '#fff',
            letterSpacing: '2px',
          }}>
            {topic.longTitle}
          </div>
        )}

        <InfographicViewer topic={topic} />
      </div>

      {/* Fixed overlay buttons */}
      <BottomBar topic={topic} />
    </div>
  );
}
