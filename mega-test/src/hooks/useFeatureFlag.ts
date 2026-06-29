import { useState, useEffect } from 'react';

export function useFeatureFlag(flag: string, context?: { userId?: string; segment?: string }) {
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkFlag() {
      try {
        const params = new URLSearchParams();
        if (context?.userId) params.set('userId', context.userId);
        if (context?.segment) params.set('segment', context.segment);

        const res = await fetch(`/api/features?${params.toString()}`);
        const data = await res.json();
        const flagData = data.flags.find((f: { key: string }) => f.key === flag);
        setEnabled(flagData?.enabled ?? false);
      } catch {
        setEnabled(false);
      } finally {
        setLoading(false);
      }
    }

    checkFlag();
  }, [flag, context?.userId, context?.segment]);

  return { enabled, loading };
}
