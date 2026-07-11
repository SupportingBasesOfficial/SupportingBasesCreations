"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useCollaboration } from "../../hooks/useCollaboration";

type CollaborationValue = ReturnType<typeof useCollaboration>;

const CollaborationContext = createContext<CollaborationValue | null>(null);

function getPasswordFromHash(): string | undefined {
  if (typeof window === "undefined") return undefined;
  const hash = window.location.hash;
  const match = hash.match(/(?:^|#)pwd=([^&]+)/);
  return match ? decodeURIComponent(match[1]) : undefined;
}

export function CollaborationProvider({
  roomId,
  children,
}: {
  roomId: string;
  children: ReactNode;
}) {
  const password = getPasswordFromHash();
  const collaboration = useCollaboration(roomId, password);
  return (
    <CollaborationContext.Provider value={collaboration}>
      {children}
    </CollaborationContext.Provider>
  );
}

export function useCollaborationContext(): CollaborationValue | null {
  return useContext(CollaborationContext);
}
