# JBT Theme

A presentation theme by Jonas Tebben for

- **[Slidecko](https://slidecko.de)** – the slide editor in your browser: [slidecko.de](https://slidecko.de)
- **[Slidev](https://sli.dev)** – slides written in Markdown: [sli.dev](https://sli.dev)

Backgrounds are pure CSS (no image files); colours are `--jbt-*` variables in `styles/jbt.css`.

## Use in Slidecko

Open [slidecko.de](https://slidecko.de) and import `jbt.theme.json` from the Theme menu, with **From URL …** and

```
https://github.com/JonasTebben/jbt-theme/blob/main/jbt.theme.json
```

(or **Import …** with a downloaded copy). A theme imported from its URL can be refreshed with **Update from URL** after a new version. When Slidecko exports a project to Slidev, it adds this package with its version tag as a dependency (the `pkg` field in `jbt.theme.json`).

## Use in Slidev

Install the package in your Slidev project and name it in the headmatter:

```bash
npm install github:JonasTebben/jbt-theme#v1.0.0
```

```yaml
---
theme: jbt-theme
---
```

## Layouts

| Layout | Look |
| --- | --- |
| `cover`, `intro` | Blue gradient across the whole slide with a white frame, centred title. Text and links white, inline code dark in its light box |
| `quiz` | Like `cover`; the first `<div>` becomes the answer box with highlighted items |
| `default`, `hands-on` | White title on a band at the top; `hands-on` in capitals with 💻 in front |
| `section`, `statement`, `fact`, `quote` | Large title or large number (`fact`), no band |

Slidev's own layouts (`center`, `end`, `image` …) work as well.

## Light and dark

The theme sets no colour mode and works in Slidev's light and dark mode. In dark mode and on Slidev's black `end` slide, links are sky blue instead of deep blue. Title, intro and quiz slides look the same in both modes. Table cells keep dark text on a light background.

## Development

```bash
npm install
npm run dev   # demo.md
```

`demo.md` shows `cover`, `default`, `hands-on`, `quiz`, `section`, `fact` and `statement`.

When the look changes in `styles/jbt.css`, update the CSS in `jbt.theme.json` in the same commit.

New version: raise `version` in `package.json`, the install line above and `pkg` in `jbt.theme.json`, commit, tag `vX.Y.Z` and push both. `npm run check` verifies that version, install line and `jbt.theme.json` agree; GitHub Actions runs it and a build of `demo.md` on every push and tag. There is deliberately no `build` script (nor `prepare`, `install` …): npm would run it when installing from GitHub and install Slidev for it; the demo build is `demo-build`.

## Versions

- **1.0.0**: first version.

Licence: Apache-2.0
