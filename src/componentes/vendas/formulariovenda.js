// components/Vendas/FormularioVenda.js
import React, { useState } from 'react';

const FormularioVenda = ({ onAdicionarVenda }) => {
  const [novaVenda, setNovaVenda] = useState({
    dataHora: '',
    cliente: '',
    vendedor: '',
    valorTotal: '',
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setNovaVenda({ ...novaVenda, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onAdicionarVenda(novaVenda);
    setNovaVenda({
      dataHora: '',
      cliente: '',
      vendedor: '',
      valorTotal: '',
    });
  };

  return (
    <div>
      <h2>Adicionar Venda</h2>
      <form onSubmit={handleSubmit}>
        <label>Data/Hora:</label>
        <input type="text" name="dataHora" value={novaVenda.dataHora} onChange={handleInputChange} />

        <label>Cliente:</label>
        <input type="text" name="cliente" value={novaVenda.cliente} onChange={handleInputChange} />

        <label>Vendedor:</label>
        <input type="text" name="vendedor" value={novaVenda.vendedor} onChange={handleInputChange} />

        <label>Valor Total:</label>
        <input type="text" name="valorTotal" value={novaVenda.valorTotal} onChange={handleInputChange} />

        <button type="submit">Adicionar Venda</button>
      </form>
    </div>
  );
};

export default FormularioVenda;
