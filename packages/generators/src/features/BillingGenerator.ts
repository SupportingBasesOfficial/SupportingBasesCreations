import { FeatureFlag, ArchitectureType } from '@sbc/core';
import type { Generator, GenerationContext } from '@sbc/core';
import type { GeneratedArtifact } from '@sbc/shared';

export class BillingGenerator implements Generator {
  readonly name = 'billing';
  readonly version = '1.0.0';
  readonly supportedFeatures: readonly FeatureFlag[] = [FeatureFlag.BILLING, FeatureFlag.BILLING_USAGE_BASED];
  readonly supportedArchitectures: readonly ArchitectureType[] = [];

  async generate(context: GenerationContext): Promise<GeneratedArtifact[]> {
    const { project } = context;
    const artifacts: GeneratedArtifact[] = [];
    const hasUsageBased = project.hasFeature(FeatureFlag.BILLING_USAGE_BASED);

    artifacts.push({
      path: 'src/lib/billing/stripe.ts',
      content: this.generateStripeClient(),
      language: 'typescript',
    });

    artifacts.push({
      path: 'src/lib/billing/plans.ts',
      content: this.generatePlans(),
      language: 'typescript',
    });

    artifacts.push({
      path: 'src/lib/billing/subscriptions.ts',
      content: this.generateSubscriptionService(hasUsageBased),
      language: 'typescript',
    });

    artifacts.push({
      path: 'src/app/api/billing/checkout/route.ts',
      content: this.generateCheckoutRoute(),
      language: 'typescript',
    });

    artifacts.push({
      path: 'src/app/api/billing/portal/route.ts',
      content: this.generatePortalRoute(),
      language: 'typescript',
    });

    artifacts.push({
      path: 'src/app/api/billing/webhook/route.ts',
      content: this.generateWebhookRoute(),
      language: 'typescript',
    });

    if (hasUsageBased) {
      artifacts.push({
        path: 'src/lib/billing/usage.ts',
        content: this.generateUsageService(),
        language: 'typescript',
      });

      artifacts.push({
        path: 'src/app/api/billing/usage/route.ts',
        content: this.generateUsageRoute(),
        language: 'typescript',
      });
    }

    artifacts.push({
      path: 'src/app/billing/page.tsx',
      content: this.generateBillingPage(),
      language: 'typescript',
    });

    artifacts.push({
      path: 'src/hooks/useSubscription.ts',
      content: this.generateUseSubscriptionHook(),
      language: 'typescript',
    });

    artifacts.push({
      path: 'supabase/migrations/0002_billing_tables.sql',
      content: this.generateMigration(),
      language: 'sql',
    });

    return artifacts;
  }

  private generateStripeClient(): string {
    return `import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
  typescript: true,
});

export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!;
`;
  }

  private generatePlans(): string {
    return `export interface Plan {
  id: string;
  name: string;
  description: string;
  priceMonthly: number;
  priceYearly: number;
  stripePriceIdMonthly: string;
  stripePriceIdYearly: string;
  features: string[];
  limits: {
    projects: number;
    apiCalls: number;
    storage: string;
  };
}

export const PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'Perfect for getting started',
    priceMonthly: 0,
    priceYearly: 0,
    stripePriceIdMonthly: '',
    stripePriceIdYearly: '',
    features: ['1 project', 'Community support', 'Basic analytics'],
    limits: { projects: 1, apiCalls: 1000, storage: '100MB' },
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'For growing teams',
    priceMonthly: 29,
    priceYearly: 290,
    stripePriceIdMonthly: process.env.STRIPE_PRICE_PRO_MONTHLY ?? '',
    stripePriceIdYearly: process.env.STRIPE_PRICE_PRO_YEARLY ?? '',
    features: ['10 projects', 'Priority support', 'Advanced analytics', 'Custom domains'],
    limits: { projects: 10, apiCalls: 50000, storage: '10GB' },
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For organizations at scale',
    priceMonthly: 99,
    priceYearly: 990,
    stripePriceIdMonthly: process.env.STRIPE_PRICE_ENT_MONTHLY ?? '',
    stripePriceIdYearly: process.env.STRIPE_PRICE_ENT_YEARLY ?? '',
    features: ['Unlimited projects', '24/7 support', 'SSO + SAML', 'Audit logs', 'SLA guarantee'],
    limits: { projects: -1, apiCalls: -1, storage: '1TB' },
  },
];

export function getPlanById(id: string): Plan | undefined {
  return PLANS.find((p) => p.id === id);
}

export function getPlanByStripePriceId(priceId: string): Plan | undefined {
  return PLANS.find(
    (p) => p.stripePriceIdMonthly === priceId || p.stripePriceIdYearly === priceId,
  );
}
`;
  }

  private generateSubscriptionService(hasUsageBased: boolean): string {
    return `import { stripe } from './stripe';
import { PLANS, getPlanByStripePriceId } from './plans';

export interface Subscription {
  id: string;
  status: 'active' | 'canceled' | 'past_due' | 'trialing';
  planId: string;
  currentPeriodStart: number;
  currentPeriodEnd: number;
  cancelAtPeriodEnd: boolean;
${hasUsageBased ? `  usageThisPeriod: number;
  usageLimit: number;` : ''}}

export async function createCheckoutSession(
  userId: string,
  userEmail: string,
  priceId: string,
  successUrl: string,
  cancelUrl: string,
) {
  return stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    customer_email: userEmail,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: { userId },
    subscription_data: {
      metadata: { userId },
    },
  });
}

export async function createBillingPortalSession(
  customerId: string,
  returnUrl: string,
) {
  return stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });
}

export async function getSubscription(subscriptionId: string): Promise<Subscription | null> {
  const sub = await stripe.subscriptions.retrieve(subscriptionId);
  const priceId = sub.items.data[0]?.price?.id ?? '';
  const plan = getPlanByStripePriceId(priceId);

  return {
    id: sub.id,
    status: sub.status as Subscription['status'],
    planId: plan?.id ?? 'free',
    currentPeriodStart: sub.current_period_start,
    currentPeriodEnd: sub.current_period_end,
    cancelAtPeriodEnd: sub.cancel_at_period_end,
${hasUsageBased ? `    usageThisPeriod: 0,
    usageLimit: plan?.limits.apiCalls ?? 1000,` : ''}  };
}

export async function cancelSubscription(subscriptionId: string) {
  return stripe.subscriptions.cancel(subscriptionId);
}
`;
  }

  private generateCheckoutRoute(): string {
    return `import { NextRequest, NextResponse } from 'next/server';
import { createCheckoutSession } from '@/lib/billing/subscriptions';

export async function POST(request: NextRequest) {
  try {
    const { priceId } = await request.json();
    if (!priceId) {
      return NextResponse.json({ error: 'Missing priceId' }, { status: 400 });
    }

    const origin = request.headers.get('origin') ?? '';
    const session = await createCheckoutSession(
      'user-id',
      'user@example.com',
      priceId,
      \`\${origin}/billing?success=true\`,
      \`\${origin}/billing?canceled=true\`,
    );

    return NextResponse.json({ url: session.url });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Checkout failed' },
      { status: 500 },
    );
  }
}
`;
  }

  private generatePortalRoute(): string {
    return `import { NextRequest, NextResponse } from 'next/server';
import { createBillingPortalSession } from '@/lib/billing/subscriptions';

export async function POST(request: NextRequest) {
  try {
    const { customerId } = await request.json();
    if (!customerId) {
      return NextResponse.json({ error: 'Missing customerId' }, { status: 400 });
    }

    const origin = request.headers.get('origin') ?? '';
    const session = await createBillingPortalSession(customerId, \`\${origin}/billing\`);

    return NextResponse.json({ url: session.url });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Portal failed' },
      { status: 500 },
    );
  }
}
`;
  }

  private generateWebhookRoute(): string {
    return `import { NextRequest, NextResponse } from 'next/server';
import { stripe, STRIPE_WEBHOOK_SECRET } from '@/lib/billing/stripe';
import type Stripe from 'stripe';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature') ?? '';

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return NextResponse.json(
      { error: \`Webhook signature verification failed: \${err}\` },
      { status: 400 },
    );
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log('Checkout completed:', session.id, 'for user:', session.metadata?.userId);
      break;
    }
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      console.log('Subscription event:', event.type, subscription.id);
      break;
    }
    case 'invoice.paid': {
      const invoice = event.data.object as Stripe.Invoice;
      console.log('Invoice paid:', invoice.id);
      break;
    }
    case 'invoice.payment_failed': {
      const invoice = event.data.object as Stripe.Invoice;
      console.log('Payment failed:', invoice.id);
      break;
    }
    default:
      console.log('Unhandled event type:', event.type);
  }

  return NextResponse.json({ received: true });
}
`;
  }

  private generateUsageService(): string {
    return `import { stripe } from './stripe';

export async function recordUsage(subscriptionItemId: string, quantity: number) {
  await stripe.subscriptionItems.createUsageRecord(subscriptionItemId, {
    quantity,
    timestamp: Math.floor(Date.now() / 1000),
    action: 'increment',
  });
}

export async function getUsageSummary(subscriptionItemId: string, period: 'day' | 'month' | 'year') {
  const now = Math.floor(Date.now() / 1000);
  const start =
    period === 'day' ? now - 86400 :
    period === 'month' ? now - 2592000 :
    now - 31536000;

  const records = await stripe.subscriptionItems.listUsageRecordSummaries(
    subscriptionItemId,
    { start, end: now },
  );

  return records.data.reduce((sum, r) => sum + r.total_usage, 0);
}
`;
  }

  private generateUsageRoute(): string {
    return `import { NextRequest, NextResponse } from 'next/server';
import { getUsageSummary } from '@/lib/billing/usage';

export async function GET(request: NextRequest) {
  const subscriptionItemId = request.nextUrl.searchParams.get('subscriptionItemId');
  const period = (request.nextUrl.searchParams.get('period') ?? 'month') as 'day' | 'month' | 'year';

  if (!subscriptionItemId) {
    return NextResponse.json({ error: 'Missing subscriptionItemId' }, { status: 400 });
  }

  const usage = await getUsageSummary(subscriptionItemId, period);
  return NextResponse.json({ usage, period });
}
`;
  }

  private generateBillingPage(): string {
    return `'use client';

import { PLANS } from '@/lib/billing/plans';
import { Check } from 'lucide-react';
import { useState } from 'react';

export default function BillingPage() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleSubscribe = async (priceId: string, planId: string) => {
    if (!priceId) return;
    setLoading(planId);
    try {
      const res = await fetch('/api/billing/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold">Pricing Plans</h1>
        <p className="mt-2 text-gray-500">Choose the plan that fits your needs</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            className={\`rounded-xl border p-6 \${plan.id === 'pro' ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-gray-200'}\`}
          >
            <h3 className="text-xl font-semibold">{plan.name}</h3>
            <p className="mt-1 text-sm text-gray-500">{plan.description}</p>
            <div className="mt-4">
              <span className="text-3xl font-bold">\${plan.priceMonthly}</span>
              <span className="text-gray-500">/month</span>
            </div>
            <ul className="mt-6 space-y-2">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm">
                  <Check size={16} className="text-green-500" />
                  {f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleSubscribe(plan.stripePriceIdMonthly, plan.id)}
              disabled={!plan.stripePriceIdMonthly || loading === plan.id}
              className="mt-6 w-full rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              {loading === plan.id ? 'Loading...' : plan.priceMonthly === 0 ? 'Current Plan' : 'Subscribe'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
`;
  }

  private generateUseSubscriptionHook(): string {
    return `'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Subscription } from '@/lib/billing/subscriptions';

export function useSubscription() {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSubscription = useCallback(async () => {
    try {
      const res = await fetch('/api/billing/subscription');
      if (res.ok) {
        const data = await res.json();
        setSubscription(data);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSubscription();
  }, [fetchSubscription]);

  const hasPlan = useCallback(
    (planId: string) => subscription?.planId === planId,
    [subscription],
  );

  const canUseFeature = useCallback(
    (feature: string) => {
      if (!subscription) return false;
      return true;
    },
    [subscription],
  );

  return { subscription, loading, hasPlan, canUseFeature, refetch: fetchSubscription };
}
`;
  }

  private generateMigration(): string {
    return `-- Billing tables
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT UNIQUE,
  plan_id TEXT NOT NULL DEFAULT 'free',
  status TEXT NOT NULL DEFAULT 'active',
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own subscription"
  ON subscriptions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own subscription"
  ON subscriptions FOR UPDATE
  USING (auth.uid() = user_id);

CREATE TRIGGER set_timestamp_subscriptions
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION update_timestamp();

CREATE TABLE IF NOT EXISTS billing_events (
  id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_event_id TEXT UNIQUE,
  event_type TEXT NOT NULL,
  payload JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE billing_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own billing events"
  ON billing_events FOR SELECT
  USING (auth.uid() = user_id);
`;
  }
}
