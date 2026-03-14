# HealOps Test Repository

A simple NestJS + Next.js monorepo used to validate HealOps self-healing CI/CD pipeline.

## Structure

```
apps/
  backend/   — NestJS 11 API (port 4000)
  frontend/  — Next.js 15 app (port 3000)
```

## Quick Start

```bash
# Install dependencies
cd apps/backend && npm install
cd ../frontend && npm install

# Run
npm run dev
```

## CI/CD

GitHub Actions workflow at `.github/workflows/ci.yml` runs:
- TypeScript type checking
- ESLint
- Unit tests (Jest)
- Build verification




