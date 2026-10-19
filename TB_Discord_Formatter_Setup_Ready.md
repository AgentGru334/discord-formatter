# TackleBox Discord Formatter

## Open the app now

Open **TB_Discord_Formatter_Standalone_Ready.html** in Chrome or Edge. This is a self-contained app: it includes the editor, styling, previews, templates, and help. You do not need Node.js, Python, an account, an API key, or an internet connection to use this edition.

The standalone edition is a portable backup. Local-file storage and clipboard behavior depend on the browser. If automatic copying is unavailable, the app offers manual selection. Export backups regularly.

## Install on phones and share a link

The `website` folder is the complete static website. Host **the contents of this folder together** at an HTTPS address. No backend, database, or build is required. Keep the directory structure and filenames intact. Hosting at the root or a subdirectory is supported.

This package has not been published to a public address. The Sites publishing connection was unavailable in the creation session. Publication remains the delivery step to finish; no hosted URL is included or implied.

Once hosted:

1. Open the HTTPS address in a normal browser, not an embedded Discord browser.
2. Visit **How to use → Install, use offline & share with your team**. Confirm that offline caching succeeded.
3. On Android/Chrome, choose **Install TackleBox** or use the browser's installation menu.
4. On iPhone/Safari, use **Share → Add to Home Screen**.
5. Share the HTTPS address with your team. Each device keeps its own drafts and templates.

Installation availability and prompts vary by browser. File URLs do not provide service-worker installation. Opening the app online once caches its core files for offline use; remote config fetching still requires a connection.

## Included tools

- **Message:** Visual formatting controls and an exact Markdown view; bold, italic, underline, strike, headings, subtext, lists, quotes, links, inline code, spoilers, undo/redo, and a live preview.
- **ANSI colors:** Text and background palettes, bold and underline, and correct escape-character output.
- **Code snippet:** Language selection, examples, syntax preview, and automatic Discord code fences.
- **Templates:** SHiFT drops, items, builds, announcements, guidelines, programming, and ANSI starters. Fill-in fields, custom save/rename/delete, and template previews.
- **Validation:** Standard/Nitro character settings, custom ceilings, line limits, required phrases, required populated fields, unresolved placeholders, and optional copy blocking.
- **Backup:** Download a workspace backup or team config; validate and review before import. Draft replacement is opt-in.
- **Team config URL:** Fetch a direct HTTPS JSON config and optionally check it on launch. Valid templates merge by ID and imported rules replace current rules; drafts stay untouched during remote updates.
- **Built-in guide:** Formatting, programming, ANSI limitations, templates, installation, backups, and troubleshooting.

## Quick start

1. Choose a template or write in the Visual editor.
2. Select text and apply formatting. On a phone, use the normal long-press selection controls.
3. Check the preview and validation results.
4. Choose **Copy for Discord**, paste into Discord, and review before sending.

The app never posts to Discord. Preview fonts, colors, syntax highlighting, mentions, emoji, and link rendering can differ from the actual client. ANSI colors may be absent on mobile clients. Use Message mode for broadly readable team posts.

The Markdown view preserves text as entered. Switching to Visual normalizes supported Markdown. Advanced or unsupported Discord syntax should stay in Markdown view. Code snippets containing triple backticks are flagged because they can end a Discord code block early.

## Backups and team configuration

Use **Backup & team config → Export backup** to include all three drafts, custom templates, and validation rules. **Export team config** excludes drafts. Files use descriptive `TB_` filenames.

Import shows a review dialog. Templates with matching IDs update, other saved templates remain, and validation rules are replaced. Restoring drafts requires selecting the explicit checkbox. Remote URL checks never restore drafts or execute code.

For a remote config, upload the exported team JSON to your HTTPS server and use the direct file URL. A web page URL will not work. Cross-origin servers must return appropriate CORS headers. If the update fails, the existing saved configuration remains available.

Drafts and templates are saved in browser local storage, not synchronized by an account. Private browsing, storage quotas, and clearing browser data can remove them. The app reports save failures and provides exports. Template count is capped at 200, and imported files at 2 MB.

## Reset limits

Open **Validation rules → Reset rules**, then confirm. This restores 2,000 characters, removes custom checks, and disables copy blocking. This changes only the formatter; it does not alter Discord account entitlements or any AI account usage limits.

## Update a hosted copy

Replace the website files together. When changing cached assets, increment the `CACHE` version in `sw.js` before deploying. The service worker precaches the new version and activates after successful caching. Reopening/reloading the app loads the new version. Existing local drafts remain saved.

## Edit the source

The `source` folder includes editable app code, static assets, tests, and a dependency lockfile. Install a supported current Node.js release, open a terminal in `source`, and run:

```text
npm ci
npm test
npm run build
```

The generated `source/dist` folder is ready for HTTPS static hosting. Runtime libraries are bundled locally; no CDN or analytics is used. Rebuild the standalone edition separately if you change the app.

Reference: [Discord formatting guide](https://support.discord.com/hc/en-us/articles/210298617-Markdown-Text-101-Chat-Formatting-Bold-Italic-Underline), [PWA installation requirements](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable).
