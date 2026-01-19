import type { Metadata, Viewport } from "next";
import { Darker_Grotesque, Sora } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css"
import SpeakiMascot from "@/components/SpeakiMascot";

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
    default: "Rico Eriansyah | Software Engineering Teacher & Full Stack Developer",
    template: "%s | Rico Eriansyah",
  },
  description:
    "Official portfolio of Rico Eriansyah, a Software Engineering Teacher (Guru RPL) at SMK Purnawarman and Full Stack Developer specializing in Next.js, Laravel, and DevOps.",
  keywords: [
    "Rico Eriansyah",
    "Guru RPL Purwakarta",
    "Software Engineering Teacher",
    "Full Stack Developer Indonesia",
    "SMK Purnawarman",
    "Jasa Pembuatan Web Purwakarta",
    "Next.js Developer",
    "Laravel Expert",
    "DevOps Engineer",
  ],
  authors: [{ name: "Rico Eriansyah", url: baseUrl }],
  creator: "Rico Eriansyah",
  publisher: "Rico Eriansyah",
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    title: "Rico Eriansyah - Teacher & Developer",
    description: "Portfolio of Rico Eriansyah. Expert in Modern Web Development and Server Infrastructure.",
    url: baseUrl,
    siteName: "Rico Eriansyah Portfolio",
    locale: "id_ID",
    type: "profile",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Rico Eriansyah Profile",
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
    name: "Rico Eriansyah",
    url: baseUrl,
    jobTitle: "Teacher & Full Stack Developer",
    worksFor: {
      "@type": "EducationalOrganization",
      name: "SMK Purnawarman",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Purwakarta",
      addressRegion: "West Java",
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
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}