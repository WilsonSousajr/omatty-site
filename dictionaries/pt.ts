import type { Dictionary } from "./en";

/**
 * Every Portuguese (Brazil) string on the page. `satisfies Dictionary` makes
 * a key missing here, or one en.ts does not have, a type error. Commands,
 * keys and product names stay as they are typed.
 */
export const pt = {
  meta: {
    title: "omatty: saiba qual agente acertou",
    description:
      "Um ADE de terminal para sessões paralelas do Claude Code que roda a linha de verificação do seu próprio projeto na worktree de cada sessão e coloca o veredito no card dela.",
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
    headline: "Rode agentes em paralelo. Saiba quais acertaram.",
    lead: "Abrir sessões paralelas do Claude Code leva segundos. Conferir o trabalho delas é o gargalo, e este ADE de terminal foi feito para isso.",
    claim:
      "O omatty roda a linha de verificação do próprio projeto dentro da worktree de cada sessão e coloca o veredito no card da sessão.",
    source: "Ler o código",
    recording: "Uma sessão real do omatty",
    caption:
      "O omatty v{version} de verdade, rodando um gate de verdade em dois repositórios Go: os testes de uma sessão falham, a falha volta para ela e a correção fica verde. O agente de cada sessão é um substituto roteirizado, para a gravação ser sempre igual.",
    status: "v{version}, pré-1.0. Para macOS e Linux, com git e Claude Code.",
  },
  problem: {
    title: "Cinco agentes dizem que terminaram. Quais terminaram mesmo?",
    body: [
      "Você já roda o Claude Code em paralelo: uma sessão por tarefa, uma worktree por sessão, muitas vezes em mais de um repositório. Abrir todas leva segundos.",
      "Aí cada uma termina o turno e diz que o trabalho está pronto. Se ela rodou o seu linter e a sua suíte de testes inteira, na própria worktree, contra as próprias mudanças, o resumo não diz.",
    ],
  },
  implication: {
    title: "Cada sessão sem verificação cai no seu colo",
    items: [
      {
        title: "Você vira o executor de testes",
        body: "Três worktrees são três vezes trocar de diretório, rodar a suíte e ler a saída, e de novo depois do próximo turno.",
      },
      {
        title: "As falhas aparecem tarde",
        body: "O que você não verifica localmente, o CI encontra minutos depois do push, ou um revisor encontra depois disso. Aí a sessão já seguiu em frente.",
      },
      {
        title: "Toda correção é redigitada",
        body: "Dizer a uma sessão o que quebrou é copiar a saída, trocar de painel e explicar tudo de novo, enquanto o Claude continua editando o arquivo que você está apontando.",
      },
    ],
  },
  payoff: {
    title: "E se cada sessão verificasse o próprio trabalho?",
    body: "Imagine cada turno terminando com a sua linha de fmt, lint e testes já rodada na worktree daquela sessão, o veredito no card dela e as falhas a uma tecla da sessão que as causou. Você abriria só os diffs que valem a leitura.",
  },
  how: {
    title: "É isso que o omatty faz quando um turno termina",
    steps: [
      {
        title: "O Claude trabalha na própria worktree",
        body: "Cada sessão é o binário claude de verdade, num painel em que você digita, num diretório só dela. Sessões de vários repositórios ficam lado a lado numa janela, e toda tecla vai para o Claude, menos o líder ctrl+o.",
      },
      {
        title: "O seu gate roda ali",
        body: "A linha de fmt, vet, lint, testes e cobertura que o seu projeto já usa, rodando na worktree daquela sessão: com uma tecla, ou sozinha quando um turno termina, se você ligar isso. O omatty propõe a linha a partir do seu repositório, e nada roda antes de você confirmar.",
      },
      {
        title: "O veredito aparece no card",
        body: "Uma marca por etapa, e o nome da primeira que não passou. Uma etapa passa quando o processo sai com 0; o omatty nunca lê a saída para decidir.",
      },
      {
        title: "A falha volta com uma tecla",
        body: "S envia a saída da falha para a sessão que a causou. Leia o diff, comente as linhas de que discorda e mande todos os comentários de volta numa mensagem só. Os comentários se prendem ao conteúdo da linha, não ao número, e ficam no lugar enquanto o Claude edita o arquivo.",
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
        a: "Baixe um arquivo de release para macOS ou Linux (amd64 ou arm64) e confira com o checksums.txt, ou compile com go install github.com/WilsonSousajr/omatty/cmd/omatty@latest.",
      },
    ],
  },
  closing: {
    title: "Rode, e conte o que quebrou.",
    body: "O omatty é novo, e o jeito mais rápido de ele melhorar é alguém além do autor usá-lo. Instale, aponte para um repositório em que você trabalha e abra uma issue para qualquer coisa que tenha surpreendido você.",
    issue: "Abrir uma issue",
  },
  footer: {
    tagline: "Um ADE de terminal para sessões paralelas do Claude Code.",
    changelog: "Changelog",
    comparison: "Comparação",
    roadmap: "Roadmap",
    license: "Licença MIT",
  },
} satisfies Dictionary;
