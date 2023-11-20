// NovaVenda.js

import React from 'react';
import './NovaVenda.css'; // Importe o arquivo de estilos

const NovaVenda = () => {

  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  return (
    <div className="nova-venda-container">
      <div className="produtos-section">
        <h2>Produtos</h2>
        <div className="buscar-quantidade">
          <div className="buscar">
            <label>Buscar pelo código de barras ou descrição:</label>
            <input type="text" placeholder="Digite aqui" />
          </div>
          <div className="quantidade">
            <label>Quantidade de itens:</label>
            <input type="number" min="0" />
            <button class='adicionar-btn'>Adicionar</button>
          </div>
        </div>
        <div className="produtos-labels">
          <strong>Produtos/Serviços</strong>
          <strong>Quantidade</strong>
          <strong>Preço unitário</strong>
          <strong>Total</strong>
        </div>
      </div>

      <div className="linha-vertical"></div>

      <div className="dados-venda-section">
        <h2>Dados da venda</h2>
        <div className="dados-venda-container">
          {/* Conteúdo da seção de Dados da Venda */}
          <div className="data-hora">
            <label>Data e hora da venda:</label>
            <input type="datetime-local" defaultValue={getCurrentDateTime()} />
          </div>
          <div className="vendedor">
            <label>Escolha um vendedor:</label>
            <select>
              <option>Vendedor 1</option>
              <option>Vendedor 2</option>
            </select>
          </div>
          <div className="cliente">
            <label>Escolha um cliente:</label>
            <select>
              <option>Cliente 1</option>
              <option>Cliente 2</option>
            </select>
          </div>
          <div className="total-compra">
            <label>Total da compra:</label>
            <span>R$ 0,00</span>
          </div>
          <div className="botoes">
            <button>Cancelar</button>
            <button>Finalizar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NovaVenda;
