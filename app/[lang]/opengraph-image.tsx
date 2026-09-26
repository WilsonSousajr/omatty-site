import { ImageResponse } from "next/og";
import { getDictionary } from "@/lib/i18n";
import { isLocale, locales } from "@/lib/locale";

// The share card a link unfurls into on Hacker News, Reddit and Discord: the
// headline in the page's own type, on the page's own ground. Text only - a
// drawing of the TUI here would be a mock-up (AGENTS.md, invariant 4).
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "omatty";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

/** A subset of a Google font as TTF, which is what next/og can draw with. */
async function googleFont(family: string, axes: string, text: string) {
  const query = `family=${family}:${axes}&text=${encodeURIComponent(text)}`;
  const css = await (
    await fetch(`https://fonts.googleapis.com/css2?${query}`)
  ).text();
  const url = css.match(
    /src: url\((.+?)\) format\('(opentype|truetype)'\)/,
  )?.[1];
  if (!url) throw new Error(`no TTF for ${family} in ${css.slice(0, 200)}`);
  return (await fetch(url)).arrayBuffer();
}

export default async function OpenGraphImage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  const { hero } = getDictionary(isLocale(lang) ? lang : "en");
  const [display, body] = await Promise.all([
    googleFont("Martian+Mono", "wdth,wght@112.5,650", `omatty${hero.headline}`),
    googleFont("Instrument+Sans", "wght@400", hero.claim),
  ]);
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        padding: 48,
        background: "#121212",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 64px",
          border: "2px solid #444444",
          borderRadius: 20,
          background: "#1c1c1c",
        }}
      >
        <div style={{ fontFamily: "Martian", fontSize: 30, color: "#8a8a8a" }}>
          omatty
        </div>
        <div
          style={{
            fontFamily: "Martian",
            fontSize: 64,
            lineHeight: 1.15,
            color: "#dadada",
          }}
        >
          {hero.headline}
        </div>
        <div
          style={{
            fontFamily: "Instrument",
            fontSize: 30,
            lineHeight: 1.4,
            color: "#bcbcbc",
          }}
        >
          {hero.claim}
        </div>
      </div>
    </div>,
    {
      ...size,
      // `data` is next/og's field name, not one we chose (id-denylist).
      fonts: [
        // eslint-disable-next-line id-denylist
        { name: "Martian", data: display, weight: 600 },
        // eslint-disable-next-line id-denylist
        { name: "Instrument", data: body, weight: 400 },
      ],
    },
  );
}
