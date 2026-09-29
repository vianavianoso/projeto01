// src/components/navbar1.jsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar1() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* LOGO COM A IMAGEM FLUXORA.PNG */}
        <Link href="/" className="flex items-center group">
          <Image
            src="/FLUXORA.PNG"
            alt="Fluxora Logo"
            width={150}
            height={40}
            className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
            priority
          />
        </Link>

        {/* Links Desktop */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
          <a href="#beneficios" className="transition-colors hover:text-slate-900 dark:hover:text-white">
            Benefícios
          </a>
          <a href="#funcionalidades" className="transition-colors hover:text-slate-900 dark:hover:text-white">
            Funcionalidades
          </a>
          <a href="#previa" className="transition-colors hover:text-slate-900 dark:hover:text-white">
            Prévia
          </a>
          <a href="#contato" className="transition-colors hover:text-slate-900 dark:hover:text-white">
            Contato
          </a>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/demo"
            className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-slate-800 active:scale-95 dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400"
          >
            Acessar Demonstração
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Toggle Mobile */}
        <button
          onClick={() => setMenuAberto(!menuAberto)}
          className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          aria-label="Abrir Menu"
        >
          {menuAberto ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Menu Mobile */}
      {menuAberto && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 dark:border-slate-800 dark:bg-slate-950">
          <nav className="flex flex-col gap-4 text-base font-medium text-slate-700 dark:text-slate-200">
            <a href="#beneficios" onClick={() => setMenuAberto(false)}>Benefícios</a>
            <a href="#funcionalidades" onClick={() => setMenuAberto(false)}>Funcionalidades</a>
            <a href="#previa" onClick={() => setMenuAberto(false)}>Prévia</a>
            <a href="#contato" onClick={() => setMenuAberto(false)}>Contato</a>
            <Link
              href="/demo"
              onClick={() => setMenuAberto(false)}
              className="flex items-center justify-center gap-2 rounded-lg bg-slate-900 py-3 text-center text-sm font-semibold text-white dark:bg-emerald-500 dark:text-slate-950"
            >
              Acessar Demonstração
              <ArrowRight className="h-4 w-4" />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}