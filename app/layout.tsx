import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SmartChatbot } from '@/components/chat/SmartChatbot';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'HeyMariner | Maritime Intelligence Platform',
  description: 'AI-assisted maritime platform for articles, port intelligence, harbour details, calculators, and mariner verification.',
  path: '/'
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="mx-auto min-h-screen max-w-6xl px-4 py-8">{children}</main>
        <Footer />
        <SmartChatbot />
      </body>
    </html>
  );
}
