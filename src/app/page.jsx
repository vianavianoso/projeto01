"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar1 } from "@/components/navbar1";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";

import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogDescription,
  AlertDialogTrigger,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";

import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Send,
} from "lucide-react";

export default function Home() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    empresa: "",
    interesse: "Controle de Estoque Geral",
  });
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviado(true);
    setTimeout(() => {
      setFormData({
        nome: "",
        email: "",
        empresa: "",
        interesse: "Controle de Estoque Geral",
      });
    }, 4000);
  };

  return (
    <>
      <Navbar1 />
      <HeroSection />

      {/* BENEFÍCIOS */}
      <section id="beneficios" className="py-20 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Como o Fluxora Transforma sua Indústria
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400">
              Organização simplificada para alinhar seu setor de compras ao ritmo real de produção.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl border border-slate-200 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-950/50">
              <div className="h-12 w-12 rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 flex items-center justify-center mb-6">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Prevenção de Rupturas</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Identificação imediata de materiais abaixo do estoque mínimo pré-configurado, evitando paradas de fábrica.
              </p>
            </div>

            <div className="p-8 rounded-2xl border border-slate-200 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-950/50">
              <div className="h-12 w-12 rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400 flex items-center justify-center mb-6">
                <BarChart3 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Indicadores por Categoria</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Gráficos claros que monitoram a distribuição de insumos entre Metais, Plásticos, Químicos e Embalagens.
              </p>
            </div>

            <div className="p-8 rounded-2xl border border-slate-200 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-950/50">
              <div className="h-12 w-12 rounded-xl bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400 flex items-center justify-center mb-6">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Movimentação Ágil</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Validações contra saldos negativos e entradas/saídas atualizadas em tempo real.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FUNCIONALIDADES */}
      <section id="funcionalidades" className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Principais Funcionalidades</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Cadastro Completo", desc: "Código MP, nome, unidade de medida, quantidade e limite mínimo." },
              { title: "Filtros Combinados", desc: "Busca dinâmica por nome/código, categoria e situação do estoque." },
              { title: "Módulo de Lançamentos", desc: "Entradas e saídas de insumos com trava de segurança de estoque negativo." },
              { title: "Gráficos em Tempo Real", desc: "Visualização consolidada do almoxarifado em múltiplos indicadores." },
            ].map((f, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
                <CheckCircle2 className="h-6 w-6 text-emerald-600 dark:text-emerald-400 mb-3" />
                <h4 className="font-semibold text-slate-900 dark:text-white mb-2">{f.title}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRÉVIA */}
      <section id="previa" className="py-20 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Prévia do Sistema</h2>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-900 p-6 shadow-2xl dark:border-slate-800 text-white">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-slate-800 p-4 rounded-xl">
                <p className="text-xs text-slate-400">Total de Insumos</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <div className="bg-slate-800 p-4 rounded-xl">
                <p className="text-xs text-emerald-400">Estoque Normal</p>
                <p className="text-2xl font-bold text-emerald-400">5</p>
              </div>
              <div className="bg-slate-800 p-4 rounded-xl">
                <p className="text-xs text-amber-400">Estoque Baixo</p>
                <p className="text-2xl font-bold text-amber-400">4</p>
              </div>
              <div className="bg-slate-800 p-4 rounded-xl">
                <p className="text-xs text-red-400">Sem Estoque</p>
                <p className="text-2xl font-bold text-red-400">3</p>
              </div>
            </div>

            <div className="text-center py-8 bg-slate-800/50 rounded-xl border border-dashed border-slate-700">
              <p className="text-sm text-slate-300 mb-4">Experimente o sistema completo sem necessidade de cadastro:</p>
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
              >
                Abrir Demonstração Interativa <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* BLOCOS SHADCN NA HOME */}
      <section className="py-12 bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Ações Rápidas (shadcn/ui)</p>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <Link href="/demo">
              <Button variant="destructive">Acessar Demonstração</Button>
            </Link>

            <Button variant="outline" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              Voltar ao Topo
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="default">Cadastrar Fictício</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirmação de Teste</AlertDialogTitle>
                  <AlertDialogDescription>
                    Você deseja abrir o ambiente de demonstração para simular cadastros e movimentações?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Não</AlertDialogCancel>
                  <AlertDialogAction asChild>
                    <Link href="/demo">Sim, ir para a Demo</Link>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </section>

      {/* FORMULÁRIO DE LEADS */}
      <section id="contato" className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 shadow-xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
                Solicitar Contato Comercial
              </h2>
            </div>

            {enviado ? (
              <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-8 text-center dark:bg-emerald-950/50">
                <CheckCircle2 className="h-12 w-12 text-emerald-600 dark:text-emerald-400 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-200">
                  Solicitação enviada com sucesso!
                </h3>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">Nome Completo</label>
                  <input
                    required
                    type="text"
                    placeholder="Carlos Silva"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">E-mail Corporativo</label>
                  <input
                    required
                    type="email"
                    placeholder="carlos@suaempresa.com.br"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Nome da Empresa</label>
                  <input
                    required
                    type="text"
                    placeholder="Metalúrgica Brasil"
                    value={formData.empresa}
                    onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Área de Interesse</label>
                  <select
                    value={formData.interesse}
                    onChange={(e) => setFormData({ ...formData, interesse: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
                  >
                    <option value="Controle de Estoque Geral">Controle de Estoque Geral</option>
                    <option value="Redução de Rupturas de Insumo">Redução de Rupturas de Insumo</option>
                    <option value="Integração e Relatórios">Integração e Relatórios</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white shadow-md hover:bg-slate-800 dark:bg-emerald-500 dark:text-slate-950"
                >
                  <Send className="h-4 w-4" /> Enviar Solicitação
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}