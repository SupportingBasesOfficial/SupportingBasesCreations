"use client";

import { useEffect, useState, useRef } from "react";
import { useCollaborationContext } from "./CollaborationContext";

interface RemoteCursor {
  id: string;
  name: string;
  color: string;
  x: number;
  y: number;
}

export function LiveCursors() {
  const collab = useCollaborationContext();
  const provider = collab?.provider ?? null;
  const peers = collab?.peers ?? [];
  const [cursors, setCursors] = useState<RemoteCursor[]>([]);
  const peersRef = useRef(peers);
  peersRef.current = peers;

  useEffect(() => {
    if (!provider) return;

    const interval = setInterval(() => {
      const remoteCursors: RemoteCursor[] = peersRef.current
        .filter((p) => p.cursor)
        .map((p) => ({
          id: p.id,
          name: p.name,
          color: p.color,
          x: p.cursor?.x ?? 0,
          y: p.cursor?.y ?? 0,
        }));
      setCursors(remoteCursors);
    }, 100);

    return () => clearInterval(interval);
  }, [provider]);

  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
      {cursors.map((cursor) => (
        <div
          key={cursor.id}
          className="absolute transition-all duration-150 ease-out"
          style={{
            left: cursor.x,
            top: cursor.y,
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.2))" }}
          >
            <path
              d="M5 3l14 9-6 1-3 6-5-16z"
              fill={cursor.color}
              stroke="white"
              strokeWidth="1.5"
            />
          </svg>
          <div
            className="absolute left-5 top-5 whitespace-nowrap rounded-md px-2 py-0.5 text-xs font-medium text-white shadow-sm"
            style={{ backgroundColor: cursor.color }}
          >
            {cursor.name}
          </div>
        </div>
      ))}
    </div>
  );
}
