"use client";

import { create } from "zustand";
import { useCallback } from "react";
import { CheckCircle2, AlertCircle, Info, X, Loader2 } from "lucide-react";

type ToastType = "success" | "error" | "info" | "loading";

interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

interface ToastStore {
  toasts: Toast[];
  add: (toast: Omit<Toast, "id">) => string;
  remove: (id: string) => void;
  update: (id: string, toast: Partial<Omit<Toast, "id">>) => void;
}

const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  add: (toast) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    set((s) => ({ toasts: [...s.toasts, { ...toast, id }] }));
    if (toast.type !== "loading" && toast.duration !== 0) {
      setTimeout(() => {
        set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
      }, toast.duration ?? 4000);
    }
    return id;
  },
  remove: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
  update: (id, patch) =>
    set((s) => ({
      toasts: s.toasts.map((t) => (t.id === id ? { ...t, ...patch } : t)),
    })),
}));

export function useToast() {
  const add = useToastStore((s) => s.add);
  const remove = useToastStore((s) => s.remove);
  const update = useToastStore((s) => s.update);

  const toast = useCallback(
    (message: string, type: ToastType = "info") => add({ message, type }),
    [add],
  );
  const success = useCallback(
    (message: string) => add({ message, type: "success" }),
    [add],
  );
  const error = useCallback(
    (message: string) => add({ message, type: "error" }),
    [add],
  );
  const info = useCallback(
    (message: string) => add({ message, type: "info" }),
    [add],
  );
  const loading = useCallback(
    (message: string) => add({ message, type: "loading", duration: 0 }),
    [add],
  );

  return { toast, success, error, info, loading, remove, update };
}

const TOAST_STYLES: Record<ToastType, { bg: string; icon: typeof Info }> = {
  success: { bg: "bg-green-600", icon: CheckCircle2 },
  error: { bg: "bg-red-600", icon: AlertCircle },
  info: { bg: "bg-blue-600", icon: Info },
  loading: { bg: "bg-gray-700", icon: Loader2 },
};

export function ToastContainer() {
  const toasts = useToastStore((s) => s.toasts);
  const remove = useToastStore((s) => s.remove);

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
      {toasts.map((t) => {
        const style = TOAST_STYLES[t.type];
        const Icon = style.icon;
        return (
          <div
            key={t.id}
            className={`flex items-center gap-3 rounded-lg ${style.bg} px-4 py-3 text-sm text-white shadow-lg animate-[slideIn_0.2s_ease-out]`}
          >
            <Icon
              size={16}
              className={t.type === "loading" ? "animate-spin" : ""}
            />
            <span>{t.message}</span>
            {t.type !== "loading" && (
              <button
                onClick={() => remove(t.id)}
                className="ml-2 opacity-70 hover:opacity-100"
              >
                <X size={14} />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
