import { NextResponse } from 'next/server';
import { featureFlags } from '../../../lib/features/FeatureFlagService';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId') || undefined;
  const segment = searchParams.get('segment') || undefined;

  const flags = featureFlags.getAllFlags().map((flag) => ({
    key: flag.key,
    enabled: featureFlags.isEnabled(flag.key, { userId, segment }),
  }));

  return NextResponse.json({ flags });
}

export async function POST(req: Request) {
  const body = await req.json();
  featureFlags.register(body);
  return NextResponse.json({ success: true });
}
