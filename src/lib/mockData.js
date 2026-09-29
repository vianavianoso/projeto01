export const CATEGORIAS_PADRAO = [
  "Metais",
  "Plásticos",
  "Químicos",
  "Embalagens",
];

export const UNIDADES_PADRAO = ["kg", "L", "un", "m", "rolos", "ton"];

export const MATERIAIS_INICIAIS = [
  { id: "MP-001", nome: "Chapa de Aço Carbono 2mm", categoria: "Metais", unidade: "kg", quantidade: 150, estoqueMinimo: 200 },
  { id: "MP-002", nome: "Resina Polipropileno PP", categoria: "Plásticos", unidade: "kg", quantidade: 850, estoqueMinimo: 500 },
  { id: "MP-003", nome: "Solvente Industrial Polimerizado", categoria: "Químicos", unidade: "L", quantidade: 0, estoqueMinimo: 100 },
  { id: "MP-004", nome: "Caixa de Papelão Ondulado K2", categoria: "Embalagens", unidade: "un", quantidade: 1200, estoqueMinimo: 500 },
  { id: "MP-005", nome: "Perfil de Alumínio Anodizado", categoria: "Metais", unidade: "m", quantidade: 45, estoqueMinimo: 50 },
  { id: "MP-006", nome: "Granulado PVC Flexível", categoria: "Plásticos", unidade: "kg", quantidade: 300, estoqueMinimo: 300 },
  { id: "MP-007", nome: "Aditivo Antioxidante X-4", categoria: "Químicos", unidade: "kg", quantidade: 12, estoqueMinimo: 50 },
  { id: "MP-008", nome: "Filme Paletizável Stretch", categoria: "Embalagens", unidade: "rolos", quantidade: 0, estoqueMinimo: 30 },
  { id: "MP-009", nome: "Barra de Cobre Eletrolítico", categoria: "Metais", unidade: "kg", quantidade: 520, estoqueMinimo: 150 },
  { id: "MP-010", nome: "Polietileno de Alta Densidade PEAD", categoria: "Plásticos", unidade: "kg", quantidade: 950, estoqueMinimo: 400 },
  { id: "MP-011", nome: "Tinta Epóxi Industrial Cinza", categoria: "Químicos", unidade: "L", quantidade: 80, estoqueMinimo: 60 },
  { id: "MP-012", nome: "Fita de Arquear Poliéster 19mm", categoria: "Embalagens", unidade: "un", quantidade: 15, estoqueMinimo: 40 },
];

export function calcularSituacao(quantidade, estoqueMinimo) {
  if (quantidade <= 0) {
    return {
      chave: "sem_estoque",
      texto: "Sem estoque",
      corBadge: "bg-red-500/15 text-red-700 border-red-300 dark:bg-red-950/40 dark:text-red-400",
      corPonto: "bg-red-500",
    };
  }
  if (quantidade < estoqueMinimo) {
    return {
      chave: "estoque_baixo",
      texto: "Estoque baixo",
      corBadge: "bg-amber-500/15 text-amber-800 border-amber-300 dark:bg-amber-950/40 dark:text-amber-400",
      corPonto: "bg-amber-500",
    };
  }
  return {
    chave: "normal",
    texto: "Normal",
    corBadge: "bg-emerald-500/15 text-emerald-800 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-400",
    corPonto: "bg-emerald-500",
  };
}