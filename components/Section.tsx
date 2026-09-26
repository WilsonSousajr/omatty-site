import type { ReactNode } from "react";

/**
 * One section of the page: a region named by its h2, with an id a nav link
 * or a shared URL can land on. <Section id="faq" title={dict.faq.title}>…</Section>
 */
export function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="section">
      <h2 id={`${id}-title`}>{title}</h2>
      {children}
    </section>
  );
}
