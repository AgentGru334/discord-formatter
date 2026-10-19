# TackleBox Discord Formatter

A mobile-friendly Discord message formatter with a visual editor, Markdown view, live preview, ANSI color and code snippet tools, saved templates, configurable validation, backups, and installable offline support.

The app does not post messages to Discord. It is an independent tool and is not affiliated with Discord.

## Run the app

Open `TB_Discord_Formatter_Standalone_Ready.html` in a modern browser for a portable, offline-capable edition.

For the installable website, host the contents of `website/` over HTTPS. The service worker enables offline use after the first visit. See [the setup guide](TB_Discord_Formatter_Setup_Ready.md) for phone installation, team configuration, backups, and troubleshooting.

## Edit and build

The editable application source and lockfile are in `source/`. With a current Node.js release:

```sh
cd source
npm ci
npm test
npm run build
npm run build:standalone
```

`npm run build` refreshes `source/dist/` and `website/`. `npm run build:standalone` creates the portable HTML file at the repository root.

## Privacy

Drafts and templates stay in the browser's local storage on each device unless a user exports them. The app includes no analytics or backend service.
