"use client";

import { useCollaborationContext } from "./CollaborationContext";
import { Users, Wifi, WifiOff } from "lucide-react";

export function PresenceAvatars() {
  const collab = useCollaborationContext();
  const peers = collab?.peers ?? [];
  const isConnected = collab?.isConnected ?? false;

  return (
    <div className="flex items-center gap-2">
      <div
        className={`flex items-center gap-1 text-xs ${isConnected ? "text-green-600" : "text-gray-400"}`}
      >
        {isConnected ? <Wifi size={14} /> : <WifiOff size={14} />}
        <span>{isConnected ? "Connected" : "Offline"}</span>
      </div>

      {peers.length > 0 && (
        <div className="flex items-center gap-1">
          <Users size={14} className="text-gray-400" />
          <div className="flex -space-x-2">
            {peers.slice(0, 5).map((peer) => (
              <div
                key={peer.id}
                className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white text-xs font-medium text-white shadow-sm"
                style={{ backgroundColor: peer.color }}
                title={peer.name}
              >
                {peer.name.slice(-2).toUpperCase()}
              </div>
            ))}
            {peers.length > 5 && (
              <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-gray-400 text-xs font-medium text-white">
                +{peers.length - 5}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
