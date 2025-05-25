import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://cheverlypd.com'),
  title: "Cheverly Police Department - Serving Our Community",
  description: "Official website of the Cheverly Police Department. Access field training portal, policy documentation, and community resources. Dedicated to protecting and serving the Cheverly community.",
  keywords: ["Cheverly Police", "Police Department", "Maryland Police", "Emergency Services", "Field Training", "Community Safety"],
  authors: [{ name: "Cheverly Police Department" }],
  creator: "Cheverly Police Department",
  publisher: "Cheverly Police Department",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://cheverlypd.com',
    title: 'Cheverly Police Department - Serving Our Community',
    description: 'Official website of the Cheverly Police Department. Access field training portal, policy documentation, and community resources.',
    siteName: 'Cheverly Police Department',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Cheverly Police Department Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cheverly Police Department - Serving Our Community',
    description: 'Official website of the Cheverly Police Department. Access field training portal and policy documentation.',
    images: ['/logo.png'],
    creator: '@CheverlyPD',
  },
  alternates: {
    canonical: 'https://cheverlypd.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Performance & Resource Hints */}
        <link rel="preconnect" href="https://fieldtraining.cheverlypd.com" />
        <link rel="preconnect" href="https://policy.cheverlypd.com" />
        <link rel="dns-prefetch" href="https://fieldtraining.cheverlypd.com" />
        <link rel="dns-prefetch" href="https://policy.cheverlypd.com" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "GovernmentOrganization",
              "name": "Cheverly Police Department",
              "description": "Official website of the Cheverly Police Department serving Cheverly, Maryland",
              "url": "https://cheverlypd.com",
              "logo": "https://cheverlypd.com/logo.png",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "6401 Forest Road",
                "addressLocality": "Cheverly",
                "addressRegion": "MD",
                "postalCode": "20785",
                "addressCountry": "US"
              },
              "telephone": "(301) 341-1055",
              "areaServed": "Cheverly, Maryland",
              "serviceType": "Law Enforcement"
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
