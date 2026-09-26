# omatty landing page: design

Tracked in WilsonSousajr/omatty#501 (part of #330). Approved 2026-09-26.

## Context

omatty has shipped v0.6.0 but has no outside users. `docs/announcement.md` (#330) sets the only measure that counts: **ten people who ran it, plus one issue not written by the maintainer**. We have no page to point Show HN, r/ClaudeAI or Discord at. The goal of this site is to get a stranger from reading, to `brew install`, to opening an issue.

Decisions made during brainstorming:

- **Separate repo:** `github.com/WilsonSousajr/omatty-site`, public, cloned at `~/Projects/omatty-site`. It stays out of iCloud-synced `~/Documents`.
- **Framework:** Next.js App Router, statically generated.
- **Hosting:** Vercel on `*.vercel.app`, with `main` as production. The base URL lives in one config value.
- **Pages:** one page, in English and Portuguese (`/en`, `/pt`).
- **Hero:** a real omatty recording played as text with asciinema-player.
- **Look:** terminal-native dark, built on the TUI's own palette.
- **Structure:** the 11-section list below, which you approved.
- **References:** onorca.dev for the skeleton (hero visual, feature grid, honest comparison, FAQ, closing CTA). DivineTV for the tone (one plain promise, "Nothing you don't", short benefit-led sections).

## Claim discipline

This rule is binding and is enforced by a test.

- **The one claim:** *omatty runs your project's own check line inside each session's worktree and puts the verdict on the session's card.*
- **The frame:** other tools optimise how much agent work is in flight; omatty optimises how quickly you can tell whether what came back is any good.
- **Never on the page:** "the only tool…", "~150 orchestrators", any install method that doesn't exist, or "`claude agents` doesn't do this". The honest line about `claude agents` is that it doesn't run your verification in each session's directory.
- **Limits stated on the page itself:** pre-1.0; macOS and Linux only, no Windows; Claude, with Codex only half-spiked; `dtach` and `gh` optional.

## Repo layout (`~/Projects/omatty-site`)

```
AGENTS.md  CLAUDE.md(-> @AGENTS.md)  README.md  LICENSE(MIT)
docs/specs/2026-09-26-landing-page-design.md   # this design, first commit
app/
  layout.tsx                 # fonts, <html lang>, body tokens
  [lang]/page.tsx            # generateStaticParams: en, pt
  [lang]/opengraph-image.tsx # next/og, per-language share card
  sitemap.ts  robots.ts
proxy.ts                     # "/" -> /pt or /en by Accept-Language (Next 16 proxy)
lib/site.ts                  # SITE_URL (env NEXT_PUBLIC_SITE_URL, default vercel.app), VERSION, INSTALL_CMD, REPO_URL
lib/i18n.ts                  # locales, getDictionary(lang)
dictionaries/en.ts pt.ts     # pt typed `satisfies Dictionary` from en; every string lives here
components/                  # one file per section + primitives
  Nav Hero Problem HowItWorks Features WontDo Compare Limits Faq ClosingCta Footer
  CopyCommand TerminalFrame CastPlayer(client, dynamic import) LangSwitch
public/casts/hero.cast  public/casts/step-*.cast
scripts/demo/                # reproducible recording setup (see Recording)
tests/                       # vitest (unit, claims, gate-parity); e2e/ Playwright smoke
scripts/gate.sh              # the full local gate; CI runs the same steps
.github/workflows/ci.yml     # gate on PR + push to main
.nvmrc  eslint.config.mjs  .prettierrc  .dependency-cruiser.cjs  knip.json  .jscpd.json  lighthouserc.json  vitest.config.ts  playwright.config.ts
```

**Stack:**
- Next 16 with TypeScript (strict) and Tailwind v4. The TUI palette goes in `@theme`.
- `next/font`: JetBrains Mono for display and code, IBM Plex Sans for body.
- `asciinema-player` from npm, loaded client-only.
- Vercel Web Analytics for cookieless page views. It needs no consent banner.

## Agent instructions (mirrors omatty's setup)

- **`CLAUDE.md`** is only a pointer: `@AGENTS.md`, plus the "single canonical file, do not duplicate" paragraph, word for word as in omatty.
- **`AGENTS.md`** is the single canonical file, with the same section skeleton as omatty's `AGENTS.md`, adapted to a web project:
  - **Project overview:** what the site is for (#330's measure) and the claim discipline above, as its invariants.
  - **Technology stack:** everything pinned exactly, including the Node version in `.nvmrc`, `engines` and `ci.yml`. This is the same argument as omatty's #261: a floating version drifted.
  - **Repository layout:** the tree below, with one responsibility per directory.
  - **Build and test commands:** the full local gate, one command per line, with the rule that it is run before claiming a change is ready.
  - **Code style:**
    - Functions 4–20 lines, files under 500 lines.
    - Specific names (the same banned list).
    - No `any`.
    - Early returns, nesting at most 2 levels.
    - WHY comments, keep existing comments, and reference issue numbers.
  - **Dependencies:**
    - Third-party UI libraries wrapped behind one owning component; for example, only `components/CastPlayer.tsx` may import `asciinema-player`. That is invariant 4's analogue, enforced by dependency-cruiser.
    - No new dependency without checking what we already have.
  - **Cross-cutting invariants:**
    1. Every product claim traces to a line in the omatty repo (README, `docs/comparison.md`, CHANGELOG).
    2. The banned claims never appear, in either language.
    3. EN and PT have identical keys; enforced by type.
    4. Every frame of the hero is real omatty output, never a mock-up.
    5. No third-party cookies or trackers.
    6. The page works without JS, except the player and the copy button.
  - **Testing:** TDD is mandatory, the coverage gate is 90%, every bug gets a regression test named after its issue, and named fakes.
  - **Security:** casts are sanitised before commit, and there are no secrets in `NEXT_PUBLIC_*`.
  - **Project tracking and Git workflow:**
    - Issues live in the omatty repo on project 13 (column = state, labels: type, milestone, `area:site`).
    - Commits and PRs use `type(#N): …`.
    - **Never a session URL**; `Co-Authored-By` stays.
    - PR evaluation asks before merging.
  - **Branches and releases:** `main` is protected (PR required, gate checks required, no force-push). Production is Vercel on `main`, and every PR gets a preview. The site has no version tags; it describes the latest omatty release.
  - **Documentation map.**
  - **ai-memory routing block:** generated by `ai-memory install-instructions --target AGENTS.md`, not hand-copied.
- **`.claude/`:** omatty's project skill convention stays in omatty. `settings.json` holds only what the gate commands need.

## The gate (local script = CI, like omatty)

`scripts/gate.sh` runs the steps below in order and fails on the first red. `ci.yml` runs the same steps, on `pull_request` and on pushes to `main`, on ubuntu, with Node pinned. Each step is the web analogue of an omatty gate step:

| Step | Command | omatty analogue |
|---|---|---|
| format | `prettier --check .` | `gofmt -l .` |
| lint | `eslint . --max-warnings 0`: `complexity` 10, `max-depth` 2, `sonarjs/cognitive-complexity` 15, `max-lines` 500, `max-lines-per-function` 20 (skipping JSX-only components via override), `@typescript-eslint/no-explicit-any`, `no-console` | golangci-lint (gocyclo, gocognit, forbidigo) |
| types | `tsc --noEmit` (strict, `noUncheckedIndexedAccess`) | `go vet` |
| deps hygiene | `knip` (unused files, exports and dependencies) + `npm ci` lockfile integrity | `go mod tidy -diff` |
| vuln | `npm audit --omit=dev --audit-level=high` | govulncheck |
| boundaries | `depcruise`: no cycles; `asciinema-player` only from `CastPlayer`; `dictionaries/` imports nothing; `lib/` never imports `components/` | depguard + check-deps |
| duplication | `jscpd --threshold 3` | dupl |
| test + coverage | `vitest run --coverage` with thresholds of 90 for lines, branches, functions and statements, over `lib/`, `components/` and `proxy.ts` | `go test -race` + check-coverage 90 |
| claims | vitest `claims.test.ts`: banned phrases and the key-parity check | (site-specific invariant) |
| build | `next build` (both locales pre-rendered) | `go build` |
| smoke | Playwright against `next start`: `/` redirects by language, `/en` and `/pt` render, the copy button copies, the player mounts, and no console errors | ptyrun real-binary smoke |
| budget | Lighthouse CI (`lhci autorun`): perf ≥ 95, a11y ≥ 95, SEO = 100 | (none) |

Each tool's config asserts itself, following omatty's `TestDepguard_ExecAllowlistMatchesReality`: a small test fails if `gate.sh` and `ci.yml` list different steps, so they can't silently diverge.

## Visual system

- **Tokens** come from `internal/ui/style.go`:

  | Token | Hex | xterm |
  |---|---|---|
  | ink | `#dadada` | 253 |
  | text | `#bcbcbc` | 250 |
  | muted | `#8a8a8a` | 245 |
  | hairline | `#444444` | 238 |
  | accent | `#5fafff` | 75 |
  | amber | `#ffaf00` | 214 |
  | green | `#5fd787` | 78 |
  | red | `#ff5f5f` | 203 |

  The background is near-black `#0b0b0c`, with a surface tone of `#121214`.
- **Colour rule:** one meaning per hue, the same as the TUI. Green means pass, red means fail, amber means waiting, and accent is the only interactive colour.
- **Frames:** sections are drawn with 1px hairlines and rounded terminal frames, echoing the TUI's border. There are no gradient glows.
- **Type:** headings in mono at a large size with tight tracking; body in sans at 17–18px.
- **Motion:** the cast player, plus a subtle reveal on scroll. Both respect `prefers-reduced-motion`, and under it the player shows a still frame.
- **Mobile:** works at 360px. The player scales as text, and on narrow screens it falls back to a poster frame with a tap-to-play control.

## Page sections

All copy comes from the dictionaries.

1. **Nav:** wordmark · How it works · Compare · FAQ · GitHub · EN/PT · Install (anchors to the closing CTA).
2. **Hero:**
   - Headline: "Run agents in parallel. Know which ones got it right."
   - Subline: the one claim.
   - `CopyCommand` showing `brew install WilsonSousajr/tap/omatty`, plus a "Star on GitHub" link.
   - Badge: `v0.6.0 · pre-1.0 · macOS & Linux`.
   - `CastPlayer` playing `hero.cast` inside a `TerminalFrame`.
3. **Problem:** three sessions means three terminals, three diffs and three test runs.
4. **How it works:** four steps, each with a short cast or still.
   1. Real `claude` running in panes across several repos.
   2. The gate runs in each worktree.
   3. The verdict lands on the card, and failures go back into the session.
   4. Diff review, with comments anchored to line content, sent as one message.
5. **Features** (grid): works over SSH; coverage on the diff; detach and reattach with dtach; ship from the card (`ctrl+o p`); discover and adopt existing sessions; zero footprint (never writes `~/.claude/settings.json`); status from hooks and JSONL, never scraped from the screen.
6. **What it won't do:** delegate, plan, schedule or decide for you.
7. **Compare:** a condensed table from `docs/comparison.md`, including its "where others are ahead" rows (agent breadth, Windows, one-line installer, scrollback after reattach, diff rendering). Links to the full document.
8. **Limits:** the list from the claim discipline section, verbatim in spirit.
9. **FAQ** (`<details>`, no JS): what is an ADE; how it relates to `claude agents`; does it phone home (no); pricing (free, MIT); which agents; which OSes; how to install without brew (release archives, `go install`).
10. **Closing CTA:** "Run it, and tell us what broke." Shows the install command again, plus "Open an issue" linking to `issues/new`.
11. **Footer:** GitHub, Changelog, Comparison, License (MIT), and the language switch.

We are deliberately leaving out testimonials, a star counter, an email capture and a docs site.

## SEO and sharing

- `generateMetadata` per language sets the title, description, `alternates.canonical` and `alternates.languages` (en, pt, x-default).
- The OG image is generated per language by `next/og`, rendered as a terminal frame with the headline.
- A `sitemap.ts` lists both locales.

## Recording (the hero asset)

- **Where it lives:** `scripts/demo/setup.sh` builds a scratch demo under a short `HOME` path: two tiny repos, each with a gate. The script also writes the shot list.
  - One session's change fails lint, gets sent back, is fixed and goes green.
  - The other session passes first time.
- **Tooling:** asciinema, installed via brew, records at 100×30.
- **Who records it:** the user, with real `claude`, following the shot list (`! asciinema rec public/casts/hero.cast`). Only real claude fires the turn-end hook that `gate.auto` needs, because `testdata/fake-claude` writes no transcript and fires no hooks. We trim it to about 40 seconds with idle limiting (`idle_time_limit`).
- **Interim cast:** until that exists, a cast recorded with fake-claude plus `ctrl+o g`. That shows real omatty frames and a real gate verdict, just without a turn ending. The site is not promoted to production until the real hero cast is in.
- **Sanitising:** check the cast for paths, usernames and prompts before committing it. The demo repos are throwaway, so there's no transcript content in them.

## Tracking

- An issue in the omatty repo, "landing page", linked to #330. It gets the labels `feat` and `area:docs`, plus #330's milestone label, and goes on project 13 (In Progress, then Review, then Done).
- Site-repo commits follow `type(#N): …` with the omatty issue number.
- No session URLs in any commit, PR or issue. `Co-Authored-By` stays.

## Execution order

Inline, by me.

1. Create the repo with `gh repo create WilsonSousajr/omatty-site --public`, clone it to `~/Projects`, and commit the spec, AGENTS.md and CLAUDE.md. The ai-memory block comes from its CLI.
2. Scaffold Next.js with TypeScript and Tailwind, then build the whole gate *before any feature*: prettier, the eslint limits, tsc, knip, audit, depcruise, jscpd, vitest with coverage, Playwright, lhci, `scripts/gate.sh`, `ci.yml` and the gate-parity test.
   - Prove each step can fail with a negative control: add a deliberate violation per step, see it go red, then remove it.
   - Protect `main`, with the CI check required.
   - From here on, one PR per slice to `main`.
3. Add the tokens, fonts and primitives (`TerminalFrame`, `CopyCommand`, `LangSwitch`), tests first.
4. Build the i18n plumbing and `proxy.ts`, then the dictionaries: EN written first, then PT.
5. Build the sections top to bottom, invoking the frontend-design skill for the visual pass.
6. Add `CastPlayer`, the interim cast and the demo setup script.
7. Add metadata, the OG images, the sitemap and analytics.
8. Link the Vercel project to the repo through the Vercel MCP/CLI, which gives a preview deploy per PR. Production deploy (on `main`) only on your OK.
9. The user records the real hero cast; I swap it in and deploy to production.

## Verification

- **`npm run lint && npm run typecheck && npm test && npm run build`** must be green locally and in CI.
- **Vitest** covers:
  - **Banned claims:** no dictionary string matches the banned phrases (`/\bthe only\b/i`, `150`, `curl .*\| *sh`, and "Windows" outside the limits section).
  - **Install command:** `INSTALL_CMD` equals the README's brew line, and the version badge matches the latest omatty release tag. Both are fetched at test time or pinned in `lib/site.ts`, with a test comparing against a vendored README snapshot.
  - **Copy button:** `CopyCommand` copies the exact text.
  - **Locale redirect:** `proxy` redirects by Accept-Language.
- **Static output:** `next build` pre-renders `/en` and `/pt`. Check `out/` or `.next` for `hreflang` tags and the OG meta.
- **Browser check:** walk through the Vercel preview in Chrome (claude-in-chrome) at 1440px and 375px, in both languages. The cast must play, respect reduced motion, and the copy button must work. Run Lighthouse: at least 95 on performance and accessibility, 100 on SEO.
- **Link previews:** check how the preview URL unfurls, via the opengraph.xyz-style meta check.
- **Content review:** you read the page against `docs/comparison.md` and `docs/announcement.md` before production.
