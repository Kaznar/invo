# Invoice Generator

**Live:** [https://invo.lastivka.xyz](https://invo.lastivka.xyz)

Frontend app for generating PDF invoices. All data is stored in the browser's `localStorage`.

## Stack

- Vue 3 (Composition API, `<script setup>`)
- Vite 6
- vue-i18n (Czech / English)
- `window.print()` for PDF export

## Development

```bash
yarn install
yarn dev
```

## Production (Docker)

```bash
docker compose up -d --build
```
