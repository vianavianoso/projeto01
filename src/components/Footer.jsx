import Link from "next/link";
import { Layers } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900 mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-white dark:bg-emerald-500 dark:text-slate-950">
                <Layers className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white">Fluxora</span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md">
              SaaS especialista em controle de matérias-primas e insumos industriais. Previsibilidade e controle contínuo.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Links Rápido</h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li><a href="#beneficios" className="hover:text-slate-900 dark:hover:text-white">Benefícios</a></li>
              <li><a href="#funcionalidades" className="hover:text-slate-900 dark:hover:text-white">Funcionalidades</a></li>
              <li><Link href="/demo" className="hover:text-slate-900 dark:hover:text-white">Demonstração Interativa</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Institucional</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              © {new Date().getFullYear()} Fluxora Tecnologia. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}