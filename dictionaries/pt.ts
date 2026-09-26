import type { Dictionary } from "./en";

/**
 * Every Portuguese (Brazil) string on the page. `satisfies Dictionary` makes
 * a key missing here, or one en.ts does not have, a type error. Commands,
 * keys and product names stay as they are typed.
 */
export const pt = {
  meta: {
    title: "omatty — saiba qual agente acertou",
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
    lead: "Um ADE de terminal para sessões paralelas do Claude Code, em todos os repositórios em que você trabalha.",
    claim:
      "O omatty roda a linha de verificação do próprio projeto dentro da worktree de cada sessão e coloca o veredito no card da sessão.",
    source: "Ler o código",
    recording: "Uma sessão real do omatty",
    caption:
      "O omatty v{version} de verdade, rodando um gate de verdade em dois repositórios Go: os testes de uma sessão falham, a falha volta para ela e a correção fica verde. O agente de cada sessão é um substituto roteirizado, para a gravação ser sempre igual.",
    status: "v{version}, pré-1.0, para macOS e Linux.",
  },
  problem: {
    title: "Abrir três sessões é fácil. Saber em qual confiar, não.",
    body: [
      "Três sessões em três worktrees são três terminais, três diffs e três rodadas de testes, cada uma disparada à mão depois de lembrar em que diretório você está.",
      "O lento não são os agentes. É descobrir se o que voltou presta, e a maioria das ferramentas para rodar agentes em paralelo foi feita para colocar mais trabalho em andamento, não para ajudar você a julgá-lo.",
    ],
  },
  how: {
    title: "O que acontece quando um turno termina",
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
        key: "omatty gate --stats",
        text: "Tempo até o merge, e com que frequência o gate passa de primeira. O omatty não guarda nenhum outro número sobre si mesmo, e estes ficam na sua máquina.",
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
    title: "Onde ele está",
    intro:
      "Tudo o que o omatty faz além do gate, alguém também faz. Veja onde os outros estão à frente.",
    headers: { who: "Quem", what: "O que falta ao omatty" },
    rows: [
      {
        who: "ccmanager, claude-squad",
        what: "Mais agentes. O omatty roda o Claude Code hoje; um segundo agente, o Codex, está em andamento.",
      },
      {
        who: "ccmanager",
        what: "Windows. O omatty é compilado apenas para macOS e Linux.",
      },
      {
        who: "claude-squad",
        what: "Um instalador de uma linha. O omatty tem Homebrew, arquivos de release e go install, mas nenhum script de instalação e nenhum pacote apt, AUR ou nix.",
      },
      {
        who: "Orca",
        what: "Histórico do terminal depois de reanexar. O omatty redesenha o painel, e o que veio antes se perde.",
      },
      {
        who: "lazygit, delta, difftastic",
        what: "Exibição de diffs. Eles fazem isso melhor, e com folga.",
      },
    ],
    claudeAgents:
      "O claude agents, do próprio Claude Code, dá uma tela para as suas sessões em segundo plano, de graça e já incluído. Se o que você quer é uma lista de sessões, use-o. Venha para o omatty por painéis interativos, vários repositórios, um ciclo de revisão e um gate no diretório de cada sessão.",
    lazygit:
      "Para uma sessão num repositório, o Claude num painel e o lazygit no outro resolvem quase tudo. O caso do omatty são várias sessões em vários repositórios.",
    more: "A comparação completa, com as fontes",
  },
  limits: {
    title: "Antes de instalar",
    items: [
      "Pré-1.0: teclas, configuração e o arquivo de estado ainda podem mudar entre versões menores.",
      "Apenas macOS e Linux. Sem Windows.",
      "Só o Claude Code, por enquanto. Um segundo agente, o Codex, está em andamento.",
      "Precisa de git e claude. dtach e gh são opcionais: sem o dtach, sair encerra as suas sessões, e sem o gh as telas de pull requests e issues ficam desligadas.",
    ],
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
        a: "O claude agents lista as suas sessões em segundo plano, cada uma numa worktree, e é de graça e já vem incluído. Os painéis do omatty são interativos, abrangem vários repositórios e acrescentam um ciclo de revisão e um gate que roda no diretório de cada sessão.",
      },
      {
        q: "Ele envia alguma coisa para algum lugar?",
        a: "Não. O omatty conversa com o git, com o claude e, se você o instalar, com o gh. Os dois números que ele guarda sobre si mesmo ficam em ~/.omatty.",
      },
      {
        q: "Quanto custa?",
        a: "Nada. O omatty é gratuito e tem licença MIT. O Claude Code é cobrado pela Anthropic, como sempre.",
      },
      {
        q: "Ele muda a minha configuração do Claude Code?",
        a: "Não. Ele nunca escreve no ~/.claude/settings.json. Os hooks são passados com --settings a cada sessão que ele inicia, então usar o omatty não deixa rastro na sua configuração do Claude.",
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
