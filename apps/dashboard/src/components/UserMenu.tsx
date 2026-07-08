"use client";

import { useState, useRef, useEffect } from "react";
import { User, LogOut, ChevronDown } from "lucide-react";
import { useSession } from "../hooks/useSession";

export function UserMenu() {
  const { user, signOut } = useSession();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (!user) return null;

  const email = user.email ?? "";
  const initials = email.charAt(0).toUpperCase();

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-lg border border-gray-300 px-2 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
      >
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
          {initials}
        </div>
        <ChevronDown className="h-3 w-3 text-gray-400" />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-56 rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-800 dark:bg-gray-900">
          <div className="border-b border-gray-100 px-3 py-2 dark:border-gray-800">
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <User className="h-3 w-3" />
              {email}
            </div>
          </div>
          <button
            onClick={() => {
              signOut();
              setOpen(false);
            }}
            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </button>
        </div>
      )}
    </div>
  );
}
