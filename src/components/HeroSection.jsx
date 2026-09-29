"use client";

import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28 bg-gradient-to-b from-slate-100/80 via-white to-slate-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 text-xs font-semibold text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-300 mb-6 animate-pulse">
          <Zap className="h-3.5 w-3.5" />
          Gestão Inteligente de Matéria-Prima Industrial
        </span>

        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl md:text-6xl max-w-4xl mx-auto leading-tight">
          Elimine a falta de insumos e garanta a{" "}
          <span className="text-emerald-600 dark:text-emerald-400">
            continuidade da sua produção
          </span>
        </h1>

        <p className="mt-6 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          O Fluxora é o SaaS completo para acompanhar estoques de matérias-primas, prever paralisações e visualizar indicadores industriais em tempo real.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/demo"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-slate-900 px-7 py-3.5 text-base font-semibold text-white shadow-lg transition-all hover:bg-slate-800 active:scale-95 dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400"
          >
            Acessar Demonstração Interativa
            <ArrowRight className="h-5 w-5" />
          </Link>
          <a
            href="#contato"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-7 py-3.5 text-base font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Solicitar Contato
          </a>
        </div>
      </div>
    </section>
  );
}