# Generátor faktur

**Live:** [https://invo.lastivka.xyz](https://invo.lastivka.xyz)

Frontend aplikace pro generování PDF faktur. Veškerá data se ukládají v `localStorage` prohlížeče.

## Stack

- Vue 3 (Composition API, `<script setup>`)
- Vite 6
- vue-i18n (čeština / angličtina)
- `window.print()` pro export do PDF

## Vývoj

```bash
yarn install
yarn dev
```

## Produkce (Docker)

```bash
docker compose up -d --build
```

Kontejner běží na portu `8081`. Na serveru je potřeba reverse proxy (Caddy / Nginx) pro směrování domény `invo.lastivka.xyz` → `localhost:8081`.
