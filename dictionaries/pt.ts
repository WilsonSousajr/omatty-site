import type { Dictionary } from "./en";

/**
 * Every Portuguese (Brazil) string on the page. `satisfies Dictionary` makes
 * a key missing here, or one en.ts does not have, a type error. Commands,
 * keys and product names stay as they are typed.
 */
export const pt = {
  meta: {
    title:
      "omatty: um ambiente de engenharia para o Claude Code, no seu terminal",
    description:
      "Sessões paralelas do Claude Code em painéis ao vivo, com a árvore de arquivos, o diff e as suas próprias verificações ao lado de cada uma, e as suas issues e pull requests na mesma janela. Tudo no seu terminal.",
  },
  nav: {
    home: "omatty, início",
    sections: "Seções",
    how: "Como funciona",
    compare: "Comparação",
    faq: "Perguntas",
    github: "GitHub",
    install: "Instalar",
    language: "Idioma",
  },
  copy: {
    copy: "Copiar",
    copied: "Copiado",
    failed: "Selecione e copie",
  },
  hero: {
    headline:
      "Um ambiente de engenharia de verdade para o Claude Code. No seu terminal.",
    lead: "Sessões paralelas do Claude Code em painéis ao vivo, com a árvore de arquivos, o diff e as suas próprias verificações logo ao lado. Feito para engenheiros que leem o código antes de entregar.",
    claim:
      "O omatty roda a linha de verificação do próprio projeto dentro da worktree de cada sessão e coloca o veredito no card da sessão.",
    source: "Ler o código",
    recording: "Uma sessão real do omatty",
    caption:
      "O omatty v{version} de verdade e o Claude Code de verdade, em dois repositórios Go: as duas sessões trabalham ao mesmo tempo, a árvore marca o que mudou, o gate cai no card de cada uma, e um comentário de revisão volta e fica na linha certa enquanto o Claude edita. As teclas e os dois prompts são roteirizados; o resto não. As esperas longas são encurtadas na reprodução.",
    status: "v{version}, pré-1.0. Para macOS e Linux, com git e Claude Code.",
  },
  problem: {
    title:
      "Os seus agentes estão num lugar. A sua engenharia está em todo o resto.",
    body: [
      "Você já roda o Claude Code em paralelo: uma sessão por tarefa, uma worktree por sessão, muitas vezes em mais de um repositório. Abrir todas leva segundos.",
      "Tudo o que você precisa para julgar o trabalho delas mora em outro lugar: os painéis no tmux, os arquivos num editor, o diff num cliente git, os testes em mais um terminal por worktree, o pull request numa aba do navegador. Os agentes são rápidos. Você fica trocando de janela.",
    ],
  },
  implication: {
    title: "O que essa troca de janelas custa",
    items: [
      {
        title: "Você perde o fio",
        body: "Em qual worktree está este arquivo, e qual sessão mexeu nele? Com quatro sessões rodando, toda olhada começa procurando a janela certa.",
      },
      {
        title: "Você vira o executor de testes",
        body: "Três worktrees significam entrar no diretório, rodar a suíte e ler a saída três vezes, e de novo depois do próximo turno.",
      },
      {
        title: "Toda correção é redigitada",
        body: "Dizer a uma sessão o que quebrou significa copiar a saída, trocar de painel e explicar de novo, enquanto o Claude continua editando o arquivo que você está apontando.",
      },
    ],
  },
  payoff: {
    title: "E se o ciclo inteiro coubesse numa janela só?",
    body: "Imagine cada sessão num painel ao vivo, com os arquivos e o diff dela ao lado, as suas próprias verificações já rodadas no último turno, e as falhas a uma tecla da sessão que as causou. Nada para onde trocar, e nada que saia do seu terminal.",
  },
  how: {
    title: "Uma janela, o ciclo de engenharia inteiro",
    steps: [
      {
        title: "O Claude trabalha em painéis ao vivo",
        body: "Cada sessão é o binário claude de verdade, num painel em que você digita, numa worktree só dela, com sessões de vários repositórios lado a lado. A barra lateral diz qual está trabalhando, qual espera por você e qual terminou, lido dos próprios hooks do Claude, nunca da tela.",
      },
      {
        title: "A árvore de arquivos acompanha cada sessão",
        body: "ctrl+o f mostra a worktree da sessão em que você está e vai com você para a próxima. Quando o Claude termina um turno, a árvore se lista de novo e marca cada arquivo que o Claude criou, mudou ou apagou, para você abrir os que importam. Marque um arquivo como lido, e ela avisa quando ele mudar de novo.",
      },
      {
        title: "Leia o diff, e responda",
        body: "Tudo o que a sessão mudou, com realce de sintaxe e as linhas que nenhum teste cobre marcadas. Comente nas linhas de que você discorda e mande todos os comentários de volta numa mensagem só. Os comentários se ancoram no conteúdo da linha, não no número, então ficam no lugar enquanto o Claude edita o arquivo.",
      },
      {
        title: "O seu gate roda em cada sessão",
        body: "A linha de fmt, vet, lint, testes e cobertura que o seu projeto já usa, rodando na worktree daquela sessão com uma tecla, ou sozinha quando um turno termina. Uma marca por etapa no card, e uma etapa só passa quando o processo sai com 0. S manda a saída da falha de volta para a sessão que a causou.",
      },
      {
        title: "Entregue, ou desfaça",
        body: "ctrl+o p faz o push e abre o pull request, ou faz o merge quando o seu gate e os checks da forja já estão verdes. ctrl+o u põe a worktree de volta onde o último turno começou. ctrl+o i mostra as issues e os pull requests do projeto na mesma coluna, e uma issue pode abrir uma sessão só dela.",
      },
    ],
  },
  keys: {
    title: "O resto, pela tecla que você aperta",
    intro:
      "Toda tecla vai para o Claude, menos ctrl+o. Estas são as teclas e os comandos que fazem o resto.",
    rows: [
      {
        key: "ctrl+o g",
        text: "Abre o painel do gate e roda o gate da sessão em que você está.",
      },
      {
        key: "ctrl+o d",
        text: "Tudo o que a sessão mudou, com destaque de sintaxe, e as linhas adicionadas que nenhum teste cobre marcadas.",
      },
      {
        key: "ctrl+o u",
        text: "Volta a worktree da sessão para onde o último turno começou.",
      },
      {
        key: "ctrl+o p",
        text: "Faz push e abre o pull request, ou faz o merge quando o seu gate e as verificações da forja já estão verdes.",
      },
      {
        key: "omatty discover",
        text: "Escolha entre os repositórios em que o Claude Code já sabe que você trabalha.",
      },
      {
        key: "omatty adopt",
        text: "Traga as sessões do Claude que você já tem num repositório.",
      },
      {
        key: "ssh -t box omatty",
        text: "É um programa de terminal, então funciona por SSH numa máquina sem tela. Com o dtach instalado, sair desanexa em vez de encerrar as suas sessões.",
      },
      {
        key: "omatty gate",
        text: "Mostra o gate de um projeto, ou propõe um a partir do repositório e não roda nada antes de você confirmar. Também informa o tempo até o merge e com que frequência o gate passa de primeira, e esses números nunca saem da sua máquina.",
      },
    ],
    footprint:
      "Ele nunca escreve no seu ~/.claude/settings.json. Os hooks são passados a cada sessão que ele inicia, e o estado vem desses hooks e das transcrições do Claude, nunca da leitura da tela.",
  },
  wontDo: {
    title: "O que ele não vai fazer",
    body: "O omatty não delega, não planeja, não agenda e não decide por você. Não há coordenador, nem mensagens entre agentes, nem fila sem supervisão, nem nuvem. Você continua sendo a parte do ciclo que pega os problemas; o trabalho do omatty é levar você até lá mais cedo.",
    link: "Por quê, recurso por recurso",
  },
  compare: {
    title: "Feito para julgar o trabalho, não só para rodá-lo",
    intro:
      "A maioria das ferramentas para agentes em paralelo foi feita para colocar mais trabalho em andamento. O omatty foi feito para o que vem depois: descobrir o que presta.",
    headers: {
      feature: "O que você precisa",
      omatty: "omatty",
      herdr: "herdr",
      herdrExamples: "com herdr-reviewr",
      orca: "Orca",
      orcaExamples: "app para desktop",
      claudeAgents: "claude agents",
      claudeAgentsExamples: "incluído no Claude Code",
    },
    yes: "Sim",
    no: "Não",
    rows: [
      {
        feature:
          "A sua própria linha de verificação roda na worktree de cada sessão, com um veredito por etapa no cartão",
        id: "gate" as const,
      },
      {
        feature: "As falhas do seu gate voltam para a sessão com uma tecla",
        id: "sendBack" as const,
      },
      {
        feature:
          "Os comentários da revisão ficam na linha certa enquanto o Claude edita",
        id: "anchor" as const,
      },
    ],
    asOf: "Em 27 de setembro de 2026. Cada célula tem a fonte na comparação completa.",
    more: "Ler a comparação completa",
  },
  faq: {
    title: "Perguntas",
    items: [
      {
        q: "O que é um ADE de terminal?",
        a: "Um ambiente de desenvolvimento de agentes que vive no seu terminal: os agentes rodam em painéis, e as ferramentas para julgar o trabalho deles (o diff, a revisão, o gate) ficam em volta. O omatty roda o binário claude de verdade; ele não reimplementa a interface do Claude.",
      },
      {
        q: "Qual a diferença para o claude agents?",
        a: "O claude agents lista as suas sessões em segundo plano de todos os seus projetos, cada uma numa worktree, mostra os checks de cada pull request, e é de graça e já vem incluído. O omatty põe várias sessões ao vivo lado a lado, acrescenta um ciclo de revisão e roda a sua própria linha de verificação no diretório de cada sessão antes de qualquer push.",
      },
      {
        q: "Qual a diferença para o herdr?",
        a: "O herdr é um espaço de trabalho de terminal para muitos tipos de agente, e está à frente do omatty em amplitude: mais agentes, mais sistemas operacionais e várias máquinas numa janela. O omatty é mais estreito. Ele lê o estado do Claude a partir de hooks e transcrições, não da tela, nunca escreve nas suas configurações do Claude, mantém os comentários da revisão na linha certa enquanto o Claude edita e roda o seu gate em cada sessão.",
      },
      {
        q: "Ele envia alguma coisa para algum lugar?",
        a: "Não. O omatty conversa com o git, com o claude e, se você o instalar, com o gh. Os dois números que ele guarda sobre si mesmo ficam em ~/.omatty.",
      },
      {
        q: "Do que preciso para rodar?",
        a: "macOS ou Linux (sem Windows por enquanto), git e Claude Code. O dtach é opcional e mantém as suas sessões rodando quando você sai; o gh é opcional e liga pull requests e issues. O omatty é pré-1.0, então teclas e configuração ainda podem mudar entre versões menores.",
      },
      {
        q: "Quais agentes ele roda?",
        a: "O Claude Code, como o binário claude de verdade. Outros agentes ainda não são suportados.",
      },
      {
        q: "Quanto custa?",
        a: "Nada. O omatty é gratuito e tem licença MIT. O Claude Code é cobrado pela Anthropic, como sempre.",
      },
      {
        q: "Ele muda a minha configuração do Claude Code?",
        a: "Não. Ele nunca escreve no ~/.claude/settings.json. Os hooks são entregues a cada sessão que ele inicia, na linha de comando dessa sessão, então usar o omatty não deixa rastro na sua configuração do Claude.",
      },
      {
        q: "E se o meu projeto ainda não tiver um gate?",
        a: "omatty gate <projeto> lê o repositório e propõe a linha que ele já usa: gofmt, go vet e go test; cargo fmt, clippy e test; ruff e pytest; ou os scripts lint e test do package.json. Nada é gravado nem executado antes de você confirmar.",
      },
      {
        q: "Como instalo sem o Homebrew?",
        a: "Rode curl -fsSL https://omatty.com/install.sh | sh. Ele baixa o arquivo de release para o seu macOS ou Linux (amd64 ou arm64), recusa se não bater com o checksums.txt e instala em ~/.local/bin sem sudo; com o Homebrew presente, usa o tap. O script é o scripts/install.sh do repositório, então dá para ler antes. Ou compile com go install github.com/WilsonSousajr/omatty/cmd/omatty@latest.",
      },
    ],
  },
  closing: {
    title: "Rode, e conte o que quebrou.",
    body: "O omatty é novo, e o jeito mais rápido de ele melhorar é alguém além do autor usá-lo. Instale, aponte para um repositório em que você trabalha e abra uma issue para qualquer coisa que tenha surpreendido você.",
    issue: "Abrir uma issue",
  },
  footer: {
    tagline: "Um ambiente de engenharia para o Claude Code, no seu terminal.",
    changelog: "Changelog",
    comparison: "Comparação",
    roadmap: "Roadmap",
    license: "Licença MIT",
  },
} satisfies Dictionary;
