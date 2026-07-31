# OctoFit Tracker Frontend

React 19 presentation tier for the OctoFit Tracker multi-tier application.

## Environment

Define `VITE_CODESPACE_NAME` in `.env.local` when running in GitHub Codespaces:

```text
VITE_CODESPACE_NAME=bookish-space-spork-qppwj9x64963xrj
```

The frontend builds API URLs with Vite environment variables:

```text
https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

When `VITE_CODESPACE_NAME` is unset, the app falls back to `http://localhost:8000/api` so local development does not produce `https://undefined-8000...` URLs.
