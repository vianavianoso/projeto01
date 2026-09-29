"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  MATERIAIS_INICIAIS,
  CATEGORIAS_PADRAO,
  UNIDADES_PADRAO,
  calcularSituacao,
} from "@/lib/mockData";

import {
  ArrowLeft,
  Plus,
  Search,
  Filter,
  RotateCcw,
  Boxes,
  CheckCircle,
  AlertTriangle,
  XCircle,
  ArrowDownUp,
  X,
} from "lucide-react";

export default function DemoPage() {
  const [materiais, setMateriais] = useState(MATERIAIS_INICIAIS || []);

  // Filtros
  const [termoBusca, setTermoBusca] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("TODAS");
  const [situacaoFiltro, setSituacaoFiltro] = useState("TODAS");

  // Modais
  const [modalCadastroAberto, setModalCadastroAberto] = useState(false);
  const [modalMovimentacaoAberto, setModalMovimentacaoAberto] = useState(false);
  const [materialSelecionado, setMaterialSelecionado] = useState(null);

  // Formulários
  const estadoInicialNovoMaterial = useMemo(
    () => ({
      codigo: "",
      nome: "",
      categoria: CATEGORIAS_PADRAO?.[0] || "",
      unidade: UNIDADES_PADRAO?.[0] || "",
      quantidade: "0",
      estoqueMinimo: "10",
    }),
    []
  );

  const [novoMaterial, setNovoMaterial] = useState(estadoInicialNovoMaterial);
  const [erroCadastro, setErroCadastro] = useState("");

  const [movimentacao, setMovimentacao] = useState({
    tipo: "entrada",
    quantidade: "1",
  });
  const [erroMovimentacao, setErroMovimentacao] = useState("");

  // Funções de Fechamento Limpo
  const fecharModalCadastro = useCallback(() => {
    setModalCadastroAberto(false);
    setErroCadastro("");
    setNovoMaterial(estadoInicialNovoMaterial);
  }, [estadoInicialNovoMaterial]);

  const fecharModalMovimentacao = useCallback(() => {
    setModalMovimentacaoAberto(false);
    setErroMovimentacao("");
    setMaterialSelecionado(null);
    setMovimentacao({ tipo: "entrada", quantidade: "1" });
  }, []);

  // Fechamento via Tecla ESC
  const fecharModaisComEsc = useCallback(
    (e) => {
      if (e.key === "Escape") {
        fecharModalCadastro();
        fecharModalMovimentacao();
      }
    },
    [fecharModalCadastro, fecharModalMovimentacao]
  );

  useEffect(() => {
    window.addEventListener("keydown", fecharModaisComEsc);
    return () => window.removeEventListener("keydown", fecharModaisComEsc);
  }, [fecharModaisComEsc]);

  // Indicadores
  const indicadores = useMemo(() => {
    let normal = 0;
    let baixo = 0;
    let semEstoque = 0;

    materiais.forEach((item) => {
      const { chave } = calcularSituacao(item.quantidade, item.estoqueMinimo);
      if (chave === "normal") normal++;
      else if (chave === "estoque_baixo") baixo++;
      else if (chave === "sem_estoque") semEstoque++;
    });

    return { total: materiais.length, normal, baixo, semEstoque };
  }, [materiais]);

  // Gráfico Categoria
  const dadosGraficoCategoria = useMemo(() => {
    const contagem = {};
    (CATEGORIAS_PADRAO || []).forEach((cat) => (contagem[cat] = 0));

    materiais.forEach((m) => {
      if (contagem[m.categoria] !== undefined) {
        contagem[m.categoria]++;
      } else {
        contagem[m.categoria] = 1;
      }
    });

    return Object.entries(contagem).map(([cat, qtd]) => ({
      categoria: cat,
      quantidade: qtd,
    }));
  }, [materiais]);

  // Filtros Tabela
  const materiaisFiltrados = useMemo(() => {
    const termo = termoBusca.trim().toLowerCase();

    return materiais.filter((item) => {
      const bateuBusca =
        !termo ||
        (item.nome && item.nome.toLowerCase().includes(termo)) ||
        (item.id && item.id.toLowerCase().includes(termo));

      const bateuCategoria =
        categoriaFiltro === "TODAS" || item.categoria === categoriaFiltro;

      const { chave } = calcularSituacao(item.quantidade, item.estoqueMinimo);
      const bateuSituacao =
        situacaoFiltro === "TODAS" || chave === situacaoFiltro;

      return bateuBusca && bateuCategoria && bateuSituacao;
    });
  }, [materiais, termoBusca, categoriaFiltro, situacaoFiltro]);

  const limparFiltros = () => {
    setTermoBusca("");
    setCategoriaFiltro("TODAS");
    setSituacaoFiltro("TODAS");
  };

  // Handlers
  const handleSalvarNovoMaterial = (e) => {
    e.preventDefault();
    setErroCadastro("");

    const codigoTratado = novoMaterial.codigo.trim().toUpperCase();
    const nomeTratado = novoMaterial.nome.trim();
    const qtdNum = Number(novoMaterial.quantidade);
    const minNum = Number(novoMaterial.estoqueMinimo);

    if (!codigoTratado || !nomeTratado) {
      setErroCadastro("Código e Nome são obrigatórios.");
      return;
    }

    if (materiais.some((m) => m.id.toUpperCase() === codigoTratado)) {
      setErroCadastro("Este código de material já existe.");
      return;
    }

    if (isNaN(qtdNum) || isNaN(minNum) || qtdNum < 0 || minNum < 0) {
      setErroCadastro("Quantidades válidas e não negativas são obrigatórias.");
      return;
    }

    const itemCriado = {
      id: codigoTratado,
      nome: nomeTratado,
      categoria: novoMaterial.categoria,
      unidade: novoMaterial.unidade,
      quantidade: qtdNum,
      estoqueMinimo: minNum,
    };

    setMateriais((prev) => [itemCriado, ...prev]);
    fecharModalCadastro();
  };

  const abrirMovimentacao = (material) => {
    setMaterialSelecionado(material);
    setMovimentacao({ tipo: "entrada", quantidade: "1" });
    setErroMovimentacao("");
    setModalMovimentacaoAberto(true);
  };

  const handleSalvarMovimentacao = (e) => {
    e.preventDefault();
    setErroMovimentacao("");

    if (!materialSelecionado) return;

    const qtd = Number(movimentacao.quantidade);

    if (isNaN(qtd) || qtd <= 0) {
      setErroMovimentacao("A quantidade movimentada deve ser um número maior que zero.");
      return;
    }

    if (movimentacao.tipo === "saida" && qtd > materialSelecionado.quantidade) {
      setErroMovimentacao(
        `Saída não permitida. Saldo atual disponível: ${materialSelecionado.quantidade} ${materialSelecionado.unidade}.`
      );
      return;
    }

    setMateriais((prev) =>
      prev.map((item) => {
        if (item.id === materialSelecionado.id) {
          const novaQtd =
            movimentacao.tipo === "entrada"
              ? item.quantidade + qtd
              : item.quantidade - qtd;
          return { ...item, quantidade: novaQtd };
        }
        return item;
      })
    );

    fecharModalMovimentacao();
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col">

      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 lg:px-8 py-4 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* LOGÓTIPO LINKADO À HOME (/) */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <ArrowLeft className="h-5 w-5 text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
            </div>
            <div className="flex items-center gap-3">
              <img
                src="/FLUXORA.PNG"
                alt="Fluxora Logo"
                className="h-9 w-auto object-contain transition-transform group-hover:scale-105"
              />
              <div>
                <h1 className="text-lg font-bold leading-none group-hover:text-emerald-600 transition-colors">
                  Fluxora SaaS
                </h1>
                <span className="text-xs text-slate-500">Controlo de Matéria-Prima</span>
              </div>
            </div>
          </Link>

          <button
            onClick={() => setModalCadastroAberto(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 transition-all"
          >
            <Plus className="h-4 w-4" /> Registar Material
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {/* CARDS INDICADORES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-4">
            <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800">
              <Boxes className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Total de Materiais</p>
              <p className="text-2xl font-bold">{indicadores.total}</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-4">
            <div className="p-3.5 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600">
              <CheckCircle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Stock Normal</p>
              <p className="text-2xl font-bold text-emerald-600">{indicadores.normal}</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-4">
            <div className="p-3.5 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Stock Baixo</p>
              <p className="text-2xl font-bold text-amber-600">{indicadores.baixo}</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-4">
            <div className="p-3.5 rounded-xl bg-red-100 dark:bg-red-950 text-red-600">
              <XCircle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Sem Stock</p>
              <p className="text-2xl font-bold text-red-600">{indicadores.semEstoque}</p>
            </div>
          </div>
        </div>

        {/* GRÁFICOS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-base font-bold mb-1">Materiais por Categoria</h3>
            <p className="text-xs text-slate-500 mb-6">Quantidade registada em cada categoria.</p>
            <div className="space-y-4">
              {dadosGraficoCategoria.map((item) => {
                const maxQtd = Math.max(...dadosGraficoCategoria.map((d) => d.quantidade), 1);
                const pct = Math.round((item.quantidade / maxQtd) * 100);
                return (
                  <div key={item.categoria} className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span>{item.categoria}</span>
                      <span className="text-slate-500">{item.quantidade} itens</span>
                    </div>
                    <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-800 dark:bg-emerald-500 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-base font-bold mb-1">Distribuição de Situação</h3>
            <p className="text-xs text-slate-500 mb-6">Proporção da integridade do armazém.</p>
            {indicadores.total > 0 ? (
              <div className="space-y-5">
                <div className="h-6 w-full bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden flex">
                  <div style={{ width: `${(indicadores.normal / indicadores.total) * 100}%` }} className="bg-emerald-500 h-full" />
                  <div style={{ width: `${(indicadores.baixo / indicadores.total) * 100}%` }} className="bg-amber-500 h-full" />
                  <div style={{ width: `${(indicadores.semEstoque / indicadores.total) * 100}%` }} className="bg-red-500 h-full" />
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                    <span className="block h-2 w-2 rounded-full bg-emerald-500 mx-auto mb-1" />
                    <span className="font-semibold text-slate-500">Normal</span>
                    <p className="text-sm font-bold">{Math.round((indicadores.normal / indicadores.total) * 100)}%</p>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                    <span className="block h-2 w-2 rounded-full bg-amber-500 mx-auto mb-1" />
                    <span className="font-semibold text-slate-500">Baixo</span>
                    <p className="text-sm font-bold">{Math.round((indicadores.baixo / indicadores.total) * 100)}%</p>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                    <span className="block h-2 w-2 rounded-full bg-red-500 mx-auto mb-1" />
                    <span className="font-semibold text-slate-500">Sem Stock</span>
                    <p className="text-sm font-bold">{Math.round((indicadores.semEstoque / indicadores.total) * 100)}%</p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-400 text-center py-8">Nenhum material registado para gerar o gráfico.</p>
            )}
          </div>
        </div>

        {/* CONTROLES E TABELA */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h2 className="text-lg font-bold">Listagem de Matérias-Primas</h2>
              <p className="text-xs text-slate-500">A apresentar {materiaisFiltrados.length} de {materiais.length} itens</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 w-full lg:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Procurar por nome ou código..."
                  value={termoBusca}
                  onChange={(e) => setTermoBusca(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border dark:border-slate-700 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <select
                value={categoriaFiltro}
                onChange={(e) => setCategoriaFiltro(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border dark:border-slate-700 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="TODAS">Todas Categorias</option>
                {(CATEGORIAS_PADRAO || []).map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              <select
                value={situacaoFiltro}
                onChange={(e) => setSituacaoFiltro(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border dark:border-slate-700 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="TODAS">Todas Situações</option>
                <option value="normal">Normal</option>
                <option value="estoque_baixo">Stock Baixo</option>
                <option value="sem_estoque">Sem Stock</option>
              </select>

              <button
                onClick={limparFiltros}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Limpar Filtros
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            {materiaisFiltrados.length > 0 ? (
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 font-semibold uppercase">
                    <th className="py-3 px-4">Código</th>
                    <th className="py-3 px-4">Material</th>
                    <th className="py-3 px-4">Categoria</th>
                    <th className="py-3 px-4">Unidade</th>
                    <th className="py-3 px-4 text-right">Qtd. Disponível</th>
                    <th className="py-3 px-4 text-right">Stock Mínimo</th>
                    <th className="py-3 px-4">Situação</th>
                    <th className="py-3 px-4 text-center">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {materiaisFiltrados.map((item) => {
                    const situacao = calcularSituacao(item.quantidade, item.estoqueMinimo);

                    return (
                      <tr key={item.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold">{item.id}</td>
                        <td className="py-3.5 px-4 font-medium">{item.nome}</td>
                        <td className="py-3.5 px-4 text-slate-500">{item.categoria}</td>
                        <td className="py-3.5 px-4 font-mono">{item.unidade}</td>
                        <td className="py-3.5 px-4 text-right font-bold font-mono">{item.quantidade}</td>
                        <td className="py-3.5 px-4 text-right text-slate-500 font-mono">{item.estoqueMinimo}</td>
                        <td className="py-3.5 px-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${situacao.corBadge}`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${situacao.corPonto}`} />
                            {situacao.texto}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <button
                            onClick={() => abrirMovimentacao(item)}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-slate-900 text-white dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-[11px] font-semibold transition-colors"
                          >
                            <ArrowDownUp className="h-3 w-3" /> Movimentar
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-12 bg-slate-50/50 dark:bg-slate-950/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
                <Filter className="h-8 w-8 text-slate-400 mx-auto mb-3" />
                <p className="text-sm font-semibold">Nenhum material encontrado</p>
                <button onClick={limparFiltros} className="mt-4 px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 transition-colors">
                  Limpar Filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* MODAL CADASTRAR */}
      {modalCadastroAberto && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button onClick={fecharModalCadastro} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-lg font-bold mb-4">Registar Novo Material</h3>

            {erroCadastro && <div className="mb-4 p-3 rounded bg-red-50 text-red-700 border border-red-200 text-xs">{erroCadastro}</div>}

            <form onSubmit={handleSalvarNovoMaterial} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold mb-1">Código</label>
                <input
                  type="text"
                  placeholder="Ex: MP-013"
                  value={novoMaterial.codigo}
                  onChange={(e) => setNovoMaterial({ ...novoMaterial, codigo: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border dark:border-slate-700 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Nome do Material</label>
                <input
                  type="text"
                  placeholder="Ex: Polietileno de Baixa Densidade"
                  value={novoMaterial.nome}
                  onChange={(e) => setNovoMaterial({ ...novoMaterial, nome: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border dark:border-slate-700 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Categoria</label>
                  <select
                    value={novoMaterial.categoria}
                    onChange={(e) => setNovoMaterial({ ...novoMaterial, categoria: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border dark:border-slate-700 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {(CATEGORIAS_PADRAO || []).map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Unidade</label>
                  <select
                    value={novoMaterial.unidade}
                    onChange={(e) => setNovoMaterial({ ...novoMaterial, unidade: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border dark:border-slate-700 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {(UNIDADES_PADRAO || []).map((un) => <option key={un} value={un}>{un}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Qtd. Inicial</label>
                  <input
                    type="number"
                    min="0"
                    value={novoMaterial.quantidade}
                    onChange={(e) => setNovoMaterial({ ...novoMaterial, quantidade: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border dark:border-slate-700 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Stock Mínimo</label>
                  <input
                    type="number"
                    min="0"
                    value={novoMaterial.estoqueMinimo}
                    onChange={(e) => setNovoMaterial({ ...novoMaterial, estoqueMinimo: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border dark:border-slate-700 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <button type="button" onClick={fecharModalCadastro} className="w-1/2 py-2 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Cancelar</button>
                <button type="submit" className="w-1/2 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-colors font-semibold">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL MOVIMENTAR */}
      {modalMovimentacaoAberto && materialSelecionado && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button onClick={fecharModalMovimentacao} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-lg font-bold mb-1">Movimentar Stock</h3>
            <p className="text-xs text-slate-500 mb-4">{materialSelecionado.nome} ({materialSelecionado.id})</p>

            {erroMovimentacao && <div className="mb-4 p-3 rounded bg-red-50 text-red-700 border border-red-200 text-xs">{erroMovimentacao}</div>}

            <form onSubmit={handleSalvarMovimentacao} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setMovimentacao({ ...movimentacao, tipo: "entrada" })}
                  className={`py-2 rounded-lg font-semibold border transition-colors ${
                    movimentacao.tipo === "entrada"
                      ? "bg-emerald-50 border-emerald-500 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"
                      : "border-slate-200 dark:border-slate-700"
                  }`}
                >
                  Entrada (+)
                </button>
                <button
                  type="button"
                  onClick={() => setMovimentacao({ ...movimentacao, tipo: "saida" })}
                  className={`py-2 rounded-lg font-semibold border transition-colors ${
                    movimentacao.tipo === "saida"
                      ? "bg-red-50 border-red-500 text-red-700 dark:bg-red-950/50 dark:text-red-300"
                      : "border-slate-200 dark:border-slate-700"
                  }`}
                >
                  Saída (-)
                </button>
              </div>

              <div>
                <label className="block font-semibold mb-1">Quantidade ({materialSelecionado.unidade})</label>
                <input
                  type="number"
                  min="1"
                  value={movimentacao.quantidade}
                  onChange={(e) => setMovimentacao({ ...movimentacao, quantidade: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border dark:border-slate-700 dark:bg-slate-950 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div className="flex gap-2 pt-4">
                <button type="button" onClick={fecharModalMovimentacao} className="w-1/2 py-2 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Cancelar</button>
                <button type="submit" className="w-1/2 py-2 bg-slate-900 text-white dark:bg-emerald-500 dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-emerald-400 rounded-lg font-semibold transition-colors">Confirmar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}