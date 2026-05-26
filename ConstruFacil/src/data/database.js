// src/data/database.js
// Banco de dados local mockado - simula SQLite/AsyncStorage

export const PRODUTOS_INICIAIS = [
  {
    id: '1',
    nome: 'Tijolo Comum (milheiro)',
    unidade: 'milheiro',
    quantidade: 15,
    quantidadeMinima: 3,
    categoria: 'Alvenaria',
  },
  {
    id: '2',
    nome: 'Madeira Cupiúba',
    unidade: 'm',
    quantidade: 50,
    quantidadeMinima: 10,
    categoria: 'Madeira',
  },
  {
    id: '3',
    nome: 'Cimento CP II (saco)',
    unidade: 'saco',
    quantidade: 120,
    quantidadeMinima: 20,
    categoria: 'Argamassa',
  },
  {
    id: '4',
    nome: 'Areia Grossa (m³)',
    unidade: 'm³',
    quantidade: 8,
    quantidadeMinima: 2,
    categoria: 'Agregados',
  },
  {
    id: '5',
    nome: 'Vergalhão CA-50 (barra)',
    unidade: 'barra',
    quantidade: 200,
    quantidadeMinima: 30,
    categoria: 'Ferragem',
  },
];

export const calcularSaldoLiquido = (produto, movimentacoes) => {
  const movsProduto = movimentacoes.filter((m) => m.produtoId === produto.id);
  const totalEntradas = movsProduto
    .filter((m) => m.tipo === 'entrada' || m.tipo === 'devolucao')
    .reduce((acc, m) => acc + m.quantidade, 0);
  const totalSaidas = movsProduto
    .filter((m) => m.tipo === 'saida')
    .reduce((acc, m) => acc + m.quantidade, 0);
  return produto.quantidade + totalEntradas - totalSaidas;
};
