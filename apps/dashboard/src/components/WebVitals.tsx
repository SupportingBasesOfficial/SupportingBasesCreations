"use client";

import { useEffect } from "react";

export function WebVitals() {
  useEffect(() => {
    async function reportVitals() {
      try {
        const { onCLS, onINP, onLCP, onFCP, onTTFB } =
          await import("web-vitals");

        const report = (metric: {
          name: string;
          value: number;
          id: string;
        }) => {
          if (process.env.NODE_ENV === "production") {
            console.debug(
              `[WebVitals] ${metric.name}: ${metric.value.toFixed(2)}`,
            );
          }
        };

        onCLS(report);
        onINP(report);
        onLCP(report);
        onFCP(report);
        onTTFB(report);
      } catch {
        // web-vitals not installed in dev — silently skip
      }
    }

    reportVitals();
  }, []);

  return null;
}
