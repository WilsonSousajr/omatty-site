import { notFound } from "next/navigation";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { getDictionary } from "@/lib/i18n";
import { isLocale } from "@/lib/locale";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  return (
    <div className="page">
      <Nav dict={dict} lang={lang} />
      <main>
        <Hero dict={dict} />
      </main>
    </div>
  );
}
