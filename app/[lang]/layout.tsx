import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n";
import { isLocale, locales } from "@/lib/locale";
import "../globals.css";

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
    <html lang={lang}>
      <body>{children}</body>
    </html>
  );
}
