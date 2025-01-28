import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CareerBoost AI | AI-Powered Resume Tailoring",
  description:
    "Transform your resume with AI-powered tailoring. Get personalized suggestions and optimize your resume for your dream job.",
  keywords:
    "resume builder, AI resume, career boost, job application, resume optimization",
  authors: [{ name: "Sajjad Algburi" }],
  openGraph: {
    title: "CareerBoost AI | AI-Powered Resume Tailoring",
    description: "Transform your resume with AI-powered tailoring",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "CareerBoost AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CareerBoost AI | AI-Powered Resume Tailoring",
    description: "Transform your resume with AI-powered tailoring",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkProvider>
            <main className="flex flex-col justify-between min-h-screen w-full max-w-7xl container ">
              <Navbar />
              {children}
              <Footer />
            </main>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
