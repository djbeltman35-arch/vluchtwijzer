# Vluchtwijzer

Live: https://vluchtwijzer.netlify.app — gemaakt door Erik (djbeltman35@gmail.com).

- De site staat in `site/` (statische HTML, geen build). Netlify zet bij elke push naar `main` de map `site/` online.
- Netlify-project **vluchtwijzer**. Prijzen via netlify/functions/tp.mjs (Travelpayouts); de token staat alleen als Netlify-omgevingsvariabele `TRAVELPAYOUTS_TOKEN`, nooit in de code.
- Beveiligingsheaders en caching staan in `netlify.toml`.
- Commits die niet live hoeven: zet `[skip netlify]` in het commitbericht (elke productie-deploy kost Netlify-credits).
- Bij wijzigingen aan de app: verhoog de cacheversie in `site/sw.js`.
