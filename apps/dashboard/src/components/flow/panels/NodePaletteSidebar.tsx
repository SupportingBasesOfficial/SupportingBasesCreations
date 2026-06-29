"use client";

import { NODE_PALETTE } from "../nodes/NodePalette";
import { NodeType } from "@sbc/shared";
import type { DragEvent } from "react";

export function NodePaletteSidebar() {
  const onDragStart = (event: DragEvent, nodeType: NodeType) => {
    event.dataTransfer.setData("application/nodeType", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="flex h-full w-56 flex-col border-r border-gray-200 bg-white">
      <div className="border-b border-gray-200 px-4 py-3">
        <h3 className="text-sm font-semibold text-gray-700">Components</h3>
        <p className="mt-0.5 text-xs text-gray-400">Drag to canvas</p>
      </div>
      <div className="flex-1 overflow-y-auto p-3">
        <div className="space-y-2">
          {NODE_PALETTE.map((item) => (
            <div
              key={item.type}
              draggable
              onDragStart={(e) => onDragStart(e, item.type)}
              className="flex cursor-grab items-center gap-3 rounded-lg border border-gray-200 px-3 py-2.5 transition-all hover:border-gray-300 hover:shadow-sm active:cursor-grabbing"
            >
              <span className="text-xl">{item.icon}</span>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-700">
                  {item.label}
                </div>
                <div className="text-xs text-gray-400 truncate">
                  {item.description}
                </div>
              </div>
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: item.color }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
