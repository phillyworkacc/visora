import "@/styles/global.css";
import type { Metadata } from "next";
import { ModalProvider } from "@/components/Modal/ModalContext";
import SessionWrapper from "@/components/SessionWrapper/SessionWrapper";
import { DMSansFont } from "@/fonts/fonts";
import { Toaster } from "sonner";
import { connectToDatabase } from "@/db/db";

export const metadata: Metadata = {
  title: 'Visora - Smarter Website Analytics',
  description: 'Track visitor behavior, unlock actionable insights, and optimize your website with Visora — the analytics platform built for business growth.',
  keywords: 'website analytics, visitor tracking, business insights, heatmaps, user behavior, optimize UX, growth tools',
  openGraph: {
    title: 'Visora - Smarter Website Analytics',
    description: 'Track visitor behavior and get clear, actionable insights to optimize your site and grow your business.',
    url: 'https://yourdomain.com',
    siteName: 'Visora',
    images: [
      {
        url: 'https://yourdomain.com/og-image.png', // Replace with your actual image
        width: 1200,
        height: 630,
        alt: 'Visora Dashboard Screenshot',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Visora - Smarter Website Analytics',
    description: 'Website tracking made insightful. Visualize visitor behavior and optimize your business online.',
    images: ['https://yourdomain.com/og-image.png'],
    creator: '@phillyxm0', // Optional
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await connectToDatabase();
  return (
    <SessionWrapper>
      <ModalProvider>
        <html lang="en">
          <head>
            <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
            <link rel="manifest" href="/manifest.json" />
            <link rel="apple-touch-icon" href="/favicon.ico" />
          </head>
          <body className={DMSansFont.className}>
            <Toaster richColors position="top-center" />
            {children}
          </body>
        </html>
      </ModalProvider>
    </SessionWrapper>
  );
}
