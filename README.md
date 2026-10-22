# Odds Tracker — phone-first prototype

This is a Progressive Web App (PWA) prototype. It can be hosted from a static HTTPS site and then packaged for Android using PWABuilder. It is not yet a native Android project and this zip does not itself contain an APK.

## Features included
- Fetches soccer 1X2 (`h2h`) odds from The Odds API v4
- Selectable league and bookmaker region
- Normalized implied probabilities (market prices, not guaranteed predictions)
- Odds snapshots across refreshes for movement indicators
- Local prediction history with manually recorded match results
- PWA manifest and service worker

## API setup
1. Create an account and API key with The Odds API: https://the-odds-api.com/
2. Check the provider's plan and available soccer leagues/bookmakers. Betika itself may not be offered.
3. Open the app over HTTPS, paste the key and tap **Fetch live odds**.
4. Choose a league/region available on your plan.

The prototype uses The Odds API v4 endpoint:
`https://api.the-odds-api.com/v4/sports/{sport}/odds/?regions=eu&markets=h2h&oddsFormat=decimal&apiKey=YOUR_KEY`

## Security warning
This prototype sends the API key from the browser to the provider and keeps it only in page memory. Do not use a personal or paid production key in a public app; client-side keys can be extracted from traffic or app code. A production release should use a small backend/proxy that keeps the key as a server secret, applies rate limits, and returns only needed data. Do not commit a real key to source control.

## Important limitation
A browser-hosted app may be blocked by provider CORS rules, depending on provider settings. If that happens, use a backend proxy rather than attempting to disable browser security. This prototype has no independent team-strength model: its displayed probabilities are normalized implied probabilities derived from bookmaker prices.

## Phone-only route to an APK
1. Download and unzip this folder on your Android phone using a file manager/archive app.
2. Host the folder as an HTTPS website. One option is a GitHub repository plus GitHub Pages; this can be done in a mobile browser, although uploading multiple files is easier with a Git client app.
3. Open the hosted HTTPS website in Chrome. Test that odds load and the prediction history behaves correctly.
4. Visit https://www.pwabuilder.com/ in Chrome and enter the HTTPS website URL.
5. Follow PWABuilder's Android packaging steps. Save the generated APK and signing files securely.
6. On Android, open the APK from Downloads and allow installation from that source if Android asks. Only install APKs you generated/trust.
7. Keep the signing key safe. Future updates need the same signing identity.

PWABuilder packaging options and output may change; use its current prompts and official documentation: https://docs.pwabuilder.com/ and https://blog.pwabuilder.com/docs/android-platform/

## Files
- `index.html` — app layout
- `style.css` — mobile-first interface
- `app.js` — API calls, odds calculations, snapshots, history
- `manifest.webmanifest` — PWA install metadata
- `sw.js` — basic offline shell cache
- `icon-192.png`, `icon-512.png` — app icons
