import type { Metadata, Viewport } from "next";
import { Darker_Grotesque, Sora } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/theme-provider";

const darkerGrotesque = Darker_Grotesque({
  variable: "--font-darker-grotesque",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  width: "device-width",
  initialScale: 1,
};

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL 
  ? `https://${process.env.NEXT_PUBLIC_BASE_URL}` 
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Rico Eriansyah | Teacher, Full Stack Developer Enthusiast & DevOps Enthusiast",
    template: "%s | Rico Eriansyah",
  },
  description:
    "Portofolio resmi Rico Eriansyah. Guru Rekayasa Perangkat Lunak (RPL), Full Stack Developer, dan DevOps Enthusiast yang berfokus pada React, Laravel, dan Cloud Infrastructure.",
  keywords: [
    "Rico Eriansyah",
    "Portofolio Rico Eriansyah",
    "Software Engineer",
    "Full Stack Developer",
    "Guru RPL",
    "SMK Purnawarman",
    "Web Developer Purwakarta",
    "Next.js Developer",
    "Laravel Developer",
    "DevOps Engineer",
  ],
  authors: [{ name: "Rico Eriansyah", url: baseUrl }],
  creator: "Rico Eriansyah",
  publisher: "Rico Eriansyah",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Rico Eriansyah - Full Stack Developer & Teacher",
    description: "Portofolio profesional Rico Eriansyah. Spesialisasi dalam Web Development modern dan infrastruktur server.",
    url: baseUrl,
    siteName: "Rico Eriansyah Portfolio",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Rico Eriansyah Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rico Eriansyah | Full Stack Developer",
    description: "Portofolio dan showcase project Rico Eriansyah.",
    images: ["/og-image.jpg"],
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
    jobTitle: "Software Engineering Teacher & Full Stack Developer",
    worksFor: {
      "@type": "Organization",
      name: "SMK Purnawarman",
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
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}