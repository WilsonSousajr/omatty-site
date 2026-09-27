import { notFound } from "next/navigation";
import { ClosingCta } from "@/components/ClosingCta";
import { Compare } from "@/components/Compare";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Implication } from "@/components/Implication";
import { KeyTable } from "@/components/KeyTable";
import { Nav } from "@/components/Nav";
import { Payoff } from "@/components/Payoff";
import { Problem } from "@/components/Problem";
import { WontDo } from "@/components/WontDo";
import { getDictionary } from "@/lib/i18n";
import { isLocale } from "@/lib/locale";

// The order is SPIN's: the Situation and Problem a reader already lives in,
// the Implication of leaving it, the Need-payoff asked as a question, and
// then the answer, its proof, and the one thing to do.
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
        <Implication dict={dict} />
        <Payoff dict={dict} />
        <HowItWorks dict={dict} />
        <KeyTable dict={dict} />
        <Compare dict={dict} />
        <WontDo dict={dict} />
        <Faq dict={dict} />
        <ClosingCta dict={dict} />
      </main>
      <Footer dict={dict} lang={lang} />
    </div>
  );
}
