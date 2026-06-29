# Setup Guide: mega-tech-platform

## Quick Start

1. Copy environment file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Setup database:
   ```bash
   pnpm db
   ```

4. Run dev server:
   ```bash
   pnpm dev
   ```

## Provider Configuration

This project uses the following external services. You must create accounts and configure API keys:

## Oauth Google Setup

**Provider**: Google OAuth 2.0 authentication

### Required Steps
1. **Client ID** (`GOOGLE_CLIENT_ID`)
   - From Google Cloud Console > Credentials
   - Set in `.env`: `GOOGLE_CLIENT_ID=your_clientId_here`

1. **Client Secret** (`GOOGLE_CLIENT_SECRET`)
   - From Google Cloud Console > Credentials
   - Set in `.env`: `GOOGLE_CLIENT_SECRET=your_clientSecret_here`

1. **Redirect URI** (`GOOGLE_REDIRECT_URI`)
   - Configure this value in your provider dashboard
   - Set in `.env`: `GOOGLE_REDIRECT_URI=your_redirectUri_here`


## Stripe Setup

**Provider**: Stripe payment processing

### Required Steps
1. **Publishable Key** (`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`)
   - From Stripe Dashboard > Developers > API keys
   - Set in `.env`: `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_publishableKey_here`

1. **Secret Key** (`STRIPE_SECRET_KEY`)
   - From Stripe Dashboard > Developers > API keys
   - Set in `.env`: `STRIPE_SECRET_KEY=your_secretKey_here`

1. **Webhook Secret** (`STRIPE_WEBHOOK_SECRET`)
   - From Stripe Dashboard > Developers > Webhooks
   - Set in `.env`: `STRIPE_WEBHOOK_SECRET=your_webhookSecret_here`


## Sentry Setup

**Provider**: Sentry error monitoring

### Required Steps
1. **DSN** (`SENTRY_DSN`)
   - From Sentry Dashboard > Project Settings > Client Keys (DSN)
   - Set in `.env`: `SENTRY_DSN=your_dsn_here`

1. **Auth Token** (`SENTRY_AUTH_TOKEN`)
   - For source maps upload (optional)
   - Set in `.env`: `SENTRY_AUTH_TOKEN=your_authToken_here`


## Automated Setup

Run the setup script for interactive configuration:
```bash
npx tsx scripts/setup-env.ts
```

## Verification

After configuration, verify everything works:
```bash
pnpm check-types  # Type check
pnpm test          # Run tests
```