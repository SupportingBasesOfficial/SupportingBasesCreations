"use client";

import { useState } from "react";
import { Share2, Copy, Check, Lock } from "lucide-react";
import { useCollaborationContext } from "./CollaborationContext";

export function ShareDialog() {
  const collab = useCollaborationContext();
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const roomId = collab?.provider?.roomId ?? "";

  const shareUrl =
    typeof window !== "undefined" && roomId
      ? `${window.location.origin}/dashboard?room=${roomId}${password ? `#pwd=${encodeURIComponent(password)}` : ""}`
      : "";

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
      >
        <Share2 size={16} />
        Compartilhar
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl dark:bg-gray-900">
            <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-100">
              Compartilhar Arquitetura
            </h2>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-600 dark:text-gray-300">
                  <Lock size={14} className="mr-1 inline" />
                  Senha E2EE (opcional)
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Segredo compartilhado para criptografia"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-600 dark:text-gray-300">
                  Link de Compartilhamento
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    readOnly
                    value={shareUrl}
                    className="flex-1 rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-600 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
                  />
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? "Copiado" : "Copiar"}
                  </button>
                </div>
              </div>

              <div className="rounded-md bg-blue-50 px-4 py-3 text-xs text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                Colaboradores com este link podem editar a arquitetura em tempo
                real.
                {password &&
                  " Toda comunicação é criptografada de ponta a ponta."}
              </div>

              <button
                onClick={() => setOpen(false)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
