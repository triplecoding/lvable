import { Metadata } from 'next';

const baseUrl = 'https://www.heymariner.com';

export function buildMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    metadataBase: new URL(baseUrl),
    alternates: { canonical: path },
    openGraph: { title, description, url: `${baseUrl}${path}`, type: 'website' },
    twitter: { card: 'summary_large_image', title, description }
  };
}

export function faqSchema(faq: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer }
    }))
  };
}

export function articleSchema({ title, description, path, datePublished }: { title: string; description: string; path: string; datePublished: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    datePublished,
    mainEntityOfPage: `${baseUrl}${path}`,
    publisher: {
      '@type': 'Organization',
      name: 'HeyMariner'
    }
  };
}
