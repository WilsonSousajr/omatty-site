import type { Metadata } from "next";
import { Instrument_Sans, Martian_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n";
import { isLocale, locales } from "@/lib/locale";
import "../globals.css";

// Martian Mono, expanded, is the display and command face; Instrument Sans
// is for reading. Both are variable, so width and weight cost one file each.
const martian = Martian_Mono({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-martian",
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-instrument",
});

// Only the listed locales exist; /fr is a 404, not a render.
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const { meta } = getDictionary(lang);
  return { title: meta.title, description: meta.description };
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  return (
    <html lang={lang} className={`${martian.variable} ${instrument.variable}`}>
      <body>{children}</body>
    </html>
  );
}
