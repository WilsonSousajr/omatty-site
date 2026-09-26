# omatty-site

The landing page for [omatty](https://github.com/WilsonSousajr/omatty), a
terminal ADE for running several Claude Code sessions in parallel and telling
quickly which of them got it right.

It is one page, in English (`/en`) and Portuguese (`/pt`), built with Next.js
as a static site and deployed on Vercel. The hero is a real omatty run, played
back as text.

## Develop

```bash
fnm use            # or nvm use: Node 24.21.0, from .nvmrc
npm ci
npm run dev        # http://localhost:3000
./scripts/gate.sh  # the full gate, which CI also runs
```

Contributor rules, the gate and the claims the page may and may not make are
in [`AGENTS.md`](AGENTS.md). The design is
[`docs/specs/2026-09-26-landing-page-design.md`](docs/specs/2026-09-26-landing-page-design.md).
Work is tracked on omatty's board, in
[WilsonSousajr/omatty#501](https://github.com/WilsonSousajr/omatty/issues/501).

## License

MIT
