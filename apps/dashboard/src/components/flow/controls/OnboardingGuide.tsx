"use client";

import { useState, useEffect } from "react";
import {
  Sparkles,
  MousePointerClick,
  LayoutTemplate,
  Rocket,
  X,
  ArrowRight,
} from "lucide-react";

const STORAGE_KEY = "sbc-onboarding-completed";

const STEPS = [
  {
    icon: Sparkles,
    title: "Descreva sua ideia",
    description:
      "Use a IA para descrever o app dos seus sonhos em português. A IA monta a arquitetura completa para você.",
    color: "text-purple-500",
    action: { event: "sbc-open-ai-copilot", label: "Abrir IA Copiloto" },
  },
  {
    icon: LayoutTemplate,
    title: "Ou comece com um template",
    description:
      "Escolha uma arquitetura pronta (delivery, rede social, e-commerce, cursos e mais). Basta clicar e usar.",
    color: "text-blue-500",
    action: { event: "sbc-open-templates", label: "Ver Templates" },
  },
  {
    icon: MousePointerClick,
    title: "Edite os blocos",
    description:
      "Clique em qualquer bloco do diagrama para editar. Adicione campos ao banco de dados, mude rotas de API, troque tecnologias.",
    color: "text-green-500",
    action: null,
  },
  {
    icon: Rocket,
    title: "Publique na nuvem",
    description:
      'Quando estiver satisfeito, clique em "Publicar na Nuvem". Seu app será publicado no GitHub, Vercel e Supabase automaticamente.',
    color: "text-orange-500",
    action: null,
  },
];

export function OnboardingGuide() {
  const [show, setShow] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const completed = localStorage.getItem(STORAGE_KEY);
    if (!completed) {
      const timer = setTimeout(() => setShow(true), 800);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, []);

  const handleClose = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setShow(false);
  };

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      handleClose();
    }
  };

  if (!show) return null;

  const current = STEPS[step];
  const Icon = current.icon;
  const isLast = step === STEPS.length - 1;

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 rounded-xl border border-gray-200 bg-white p-5 shadow-2xl dark:border-gray-700 dark:bg-gray-900">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
            {step + 1}
          </span>
          <span className="text-xs text-gray-400 dark:text-gray-500">
            de {STEPS.length}
          </span>
        </div>
        <button
          onClick={handleClose}
          className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
        >
          <X size={16} />
        </button>
      </div>

      <div className="mb-4">
        <div
          className={`mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-50 dark:bg-gray-800`}
        >
          <Icon size={20} className={current.color} />
        </div>
        <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100">
          {current.title}
        </h3>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {current.description}
        </p>
        {current.action && (
          <button
            onClick={() => {
              window.dispatchEvent(new CustomEvent(current.action!.event));
              handleClose();
            }}
            className="mt-3 flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-blue-700"
          >
            {current.action.label}
            <ArrowRight size={12} />
          </button>
        )}
      </div>

      <div className="mb-4 flex gap-1">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${
              i <= step ? "bg-blue-500" : "bg-gray-200 dark:bg-gray-700"
            }`}
          />
        ))}
      </div>

      <div className="flex items-center justify-between">
        {step > 0 ? (
          <button
            onClick={() => setStep(step - 1)}
            className="text-xs font-medium text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            Voltar
          </button>
        ) : (
          <span />
        )}
        <button
          onClick={handleNext}
          className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-700"
        >
          {isLast ? "Começar a criar" : "Próximo"}
          <ArrowRight size={12} />
        </button>
      </div>
    </div>
  );
}
