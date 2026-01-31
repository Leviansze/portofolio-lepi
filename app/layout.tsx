import type { Metadata, Viewport } from "next";
import { Darker_Grotesque, Sora } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css"
import SpeakiMascot from "@/components/speaki-mascot";
import MusicPlayer from "@/components/MusicPlayer";

const darkerGrotesque = Darker_Grotesque({
  variable: "--font-darker-grotesque",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `https://${process.env.NEXT_PUBLIC_BASE_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Muhammad Desta | Software Engineering Student & Newbie Developer",
    template: "%s | Muhammad Desta",
  },
  description:
    "Official portfolio of Muhammad Desta, a Software Engineering Student at AMIK WAHANA MANDIRI and Newbie Developer specializing in Next.js, Html, CSS, JavaScript, and Laravel.",
  keywords: [
    "Muhammad Desta",
    "Mahasiswa Teknik Informatika",
    "Software Engineering Student",
    "Newbie Developer Indonesia",
    "AMIK WAHANA MANDIRI",
    "Web Developer",
    "Next.js Developer",
    "Laravel Newbie",
    "Laraver Engineer",
  ],
  authors: [{ name: "Muhammad Desta", url: baseUrl }],
  creator: "Muhammad Desta",
  publisher: "Muhammad Desta",
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    title: "Muhammad Desta - Student & Developer",
    description: "Portfolio of Muhammad Desta. Expert in Modern Web Development and Server Infrastructure.",
    url: baseUrl,
    siteName: "Muhammad Desta Portfolio",
    locale: "id_ID",
    type: "profile",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Muhammad Desta",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Muhammad Desta",
    url: baseUrl,
    jobTitle: "Teacher & Newbie Developer",
    worksFor: {
      "@type": "EducationalOrganization",
      name: "AMIK WAHANA MANDIRI",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Jakarta",
      addressRegion: "DKI Jakarta",
      addressCountry: "ID"
    },
    sameAs: [
      "https://github.com/username_github",
      "https://www.linkedin.com/in/username_linkedin",
      "https://instagram.com/username_ig"
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${darkerGrotesque.variable} ${sora.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}

          <SpeakiMascot />
          <MusicPlayer />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}