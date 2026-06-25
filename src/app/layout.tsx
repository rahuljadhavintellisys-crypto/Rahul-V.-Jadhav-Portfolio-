import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "@/context/ThemeContext";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-heading",
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rahul V. Jadhav | Operations Leader & Growth Strategist",
  description: "Executive digital headquarters of Rahul V. Jadhav: Operations Leader, Growth Strategist, and AI Transformation Professional. Scaling business systems and high-performance teams.",
  keywords: [
    "Rahul V Jadhav",
    "Operations Leader India",
    "Business Operations Expert Pune",
    "Growth Strategist India",
    "AI Transformation Professional",
    "Team Operations Head",
    "Business Development Leader",
    "Personal Branding Professional",
    "Leadership Consultant",
    "Operations Excellence Expert"
  ],
  authors: [{ name: "Rahul V. Jadhav" }],
  creator: "Rahul V. Jadhav",
  metadataBase: new URL("https://rahulvjadhav.com"),
  openGraph: {
    title: "Rahul V. Jadhav | Operations Leader & Growth Strategist",
    description: "Building High-Performance Teams, Scalable Business Systems, and AI-Powered Growth Engines.",
    url: "/",
    siteName: "Rahul V. Jadhav Personal Brand",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rahul V. Jadhav | Operations Leader",
    description: "Operations, growth, and AI transformation executive based in Wakad, Pune.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <ThemeProvider>
          {children}
          {process.env.NEXT_PUBLIC_GA_ID && (
            <>
              <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
                strategy="afterInteractive"
              />
              <Script id="google-analytics" strategy="afterInteractive">
                {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
                `}
              </Script>
            </>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
