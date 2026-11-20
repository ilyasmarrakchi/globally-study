import type { Metadata, Viewport } from "next";
import { Inter, Nunito } from "next/font/google";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";
import en from "@/locales/en.json";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: en.meta.title,
    template: "%s · GlobAlly Study",
  },
  description: en.meta.description,
  applicationName: "GlobAlly Study",
};

export const viewport: Viewport = {
  themeColor: "#fbfcfe",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${nunito.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-paper font-sans text-ink">
        <LanguageProvider>
          <SkipLink />
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
