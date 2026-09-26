import { notFound } from "next/navigation";
import { ClosingCta } from "@/components/ClosingCta";
import { Compare } from "@/components/Compare";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { KeyTable } from "@/components/KeyTable";
import { Limits } from "@/components/Limits";
import { Nav } from "@/components/Nav";
import { Problem } from "@/components/Problem";
import { WontDo } from "@/components/WontDo";
import { getDictionary } from "@/lib/i18n";
import { isLocale } from "@/lib/locale";

// The order is the argument: what it is, why it matters, how it works, what
// else it does, what it refuses, where it is behind, its limits, questions,
// and then the one thing to do.
export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  return (
    <div className="page">
      <Nav dict={dict} lang={lang} />
      <main>
        <Hero dict={dict} />
        <Problem dict={dict} />
        <HowItWorks dict={dict} />
        <KeyTable dict={dict} />
        <WontDo dict={dict} />
        <Compare dict={dict} />
        <Limits dict={dict} />
        <Faq dict={dict} />
        <ClosingCta dict={dict} />
      </main>
      <Footer dict={dict} lang={lang} />
    </div>
  );
}
