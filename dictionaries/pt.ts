import type { Dictionary } from "./en";

export const pt = {
  meta: {
    title: "omatty — saiba qual agente acertou",
    description:
      "Um ADE de terminal para sessões paralelas do Claude Code que roda a linha de verificação do seu próprio projeto na worktree de cada sessão e coloca o veredito no card dela.",
  },
  nav: {
    home: "omatty, início",
    github: "GitHub",
    language: "Idioma",
  },
  copy: {
    copy: "Copiar",
    copied: "Copiado",
    failed: "Selecione e copie",
  },
  hero: {
    headline: "Rode agentes em paralelo. Saiba quais acertaram.",
    lead: "Um ADE de terminal para sessões paralelas do Claude Code, em todos os repositórios em que você trabalha.",
    claim:
      "O omatty roda a linha de verificação do próprio projeto dentro da worktree de cada sessão e coloca o veredito no card da sessão.",
    source: "Ler o código",
    status: "v{version}, pré-1.0, para macOS e Linux.",
  },
} satisfies Dictionary;
