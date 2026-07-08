"use client";

import { useEffect, useState, useCallback } from "react";
import { YjsCollaborationProvider, type PeerInfo } from "@sbc/core";

export function useCollaboration(roomId: string, password?: string) {
  const [provider, setProvider] = useState<YjsCollaborationProvider | null>(
    null,
  );
  const [peers, setPeers] = useState<PeerInfo[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!roomId) return;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    const p = new YjsCollaborationProvider({
      roomId,
      password,
      supabaseUrl,
      supabaseKey,
    });
    p.onPresence((updatedPeers) => setPeers(updatedPeers));

    p.connect()
      .then(() => setIsConnected(true))
      .catch(() => setIsConnected(false));

    setProvider(p);

    return () => {
      p.disconnect();
      setProvider(null);
      setIsConnected(false);
      setPeers([]);
    };
  }, [roomId, password]);

  const updateCursor = useCallback(
    (position: { x: number; y: number }) => {
      provider?.updateCursor(position);
    },
    [provider],
  );

  const setSelectedNode = useCallback(
    (nodeId: string | undefined) => {
      provider?.setSelectedNode(nodeId);
    },
    [provider],
  );

  return { provider, peers, isConnected, updateCursor, setSelectedNode };
}
