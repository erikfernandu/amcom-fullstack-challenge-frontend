// services/api.js
const vendas = [
    { id: 1, dataHora: '2023-11-18 10:00', cliente: 'Cliente 1', vendedor: 'Vendedor A', valorTotal: 100.0 },
    { id: 2, dataHora: '2023-11-18 11:30', cliente: 'Cliente 2', vendedor: 'Vendedor B', valorTotal: 150.0 },
    // Adicione mais dados conforme necessário
  ];
  
  export const getVendas = () => Promise.resolve(vendas);
  export const adicionarVenda = novaVenda => {
    const novaVendaComId = { ...novaVenda, id: vendas.length + 1 };
    vendas.push(novaVendaComId);
    return Promise.resolve(novaVendaComId);
  };
  