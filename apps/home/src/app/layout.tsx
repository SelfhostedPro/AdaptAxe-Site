// Theme
import "@workspace/ui/globals.css";
import { ThemeProvider } from "@workspace/ui/components/providers/theme";

// Meta
import type { Metadata } from "next";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "@/constants";
import { JetBrains_Mono, Chivo } from "next/font/google";

// Analytics
import { PostHogProvider } from "@/components/providers/Posthog";

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s - ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  keywords: [
    "Guitar",
    "3D",
    "Modular",
    "Modular Guitar",
    "Bass",
    "Modular Base",
    "Showcase",
  ],
  creator: "Stephen Kluthe",
  authors: [{ name: "Stephen Kluthe" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    creator: "@AdaptAxe",
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

const fontSans = Chivo({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable}  ${fontMono.variable} font-sans antialiased `}
        suppressHydrationWarning
      >
        <PostHogProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
