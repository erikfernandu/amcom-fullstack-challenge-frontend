// NovaVenda.js

import React, { useState, useEffect } from 'react';
import './css/nova-venda.css'; // Importe o arquivo de estilos

const NovaVenda = () => {

  const [vendedores, setVendedores] = useState([]);
  const [vendedorSelecionado, setVendedorSelecionado] = useState('');
  const [clientes, setClientes] = useState([]);
  const [clienteSelecionado, setClienteSelecionado] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/produtos/?search=${searchTerm}`);
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    };
  
    if (searchTerm.trim() !== '') {
      fetchApiData();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  useEffect(() => {
    const apiUrl = 'http://127.0.0.1:8000/api/vendedores/';
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => setVendedores(data))
      .catch(error => console.error('Erro ao obter vendedores:', error));
  }, []);

  useEffect(() => {
    const apiUrl = 'http://127.0.0.1:8000/api/clientes/';
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => setClientes(data))
      .catch(error => console.error('Erro ao obter clientes:', error));
  }, []);

  const handleResultClick = (result) => {
    setSearchTerm(result.descricao || '');
    setSearchResults([]);
  };

  const handleVendedoresChange = (event) => {
    const selectedValue = event.target.value;
    setVendedorSelecionado(selectedValue);
  };

  const handleClientesChange = (event) => {
    const selectedValue = event.target.value;
    setClienteSelecionado(selectedValue);
  };

  return (
    <div className="nova-venda-container">
      <div className="produtos-section">
        <h2>Produtos</h2>
        <div className="buscar-quantidade">
          <div className="buscar">
            <label htmlFor='buscar'>Buscar pelo código de barras ou descrição:</label>
            <input id='buscar' type="text" placeholder="Digite aqui" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
            <ul>
            {searchResults.map((result) => (
              <li key={result.id} onClick={() => handleResultClick(result)}>
                {result.descricao}
              </li>
            ))}
            </ul>
          </div>
          <div className="quantidade">
            <label htmlFor='quantidade'>Quantidade de itens:</label>
            <input id='quantidade' type="number" min="0" />
            <button className='adicionar-btn'>Adicionar</button>
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
            <label htmlFor='data'>Data e hora da venda:</label>
            <input id='data' type="datetime-local" defaultValue={getCurrentDateTime()} />
          </div>
          <div className="vendedor">
            <label htmlFor='vendedoresSelect'>Escolha um vendedor:</label>
            <select id='vendedoresSelect' value={vendedorSelecionado} onChange={handleVendedoresChange}>
              <option value="">Selecione...</option>
              {vendedores.map((vendedor) => (
                <option key={vendedor.id} value={vendedor.id}>
                  {vendedor.nome}
                </option>
              ))}
            </select>
          </div>
          <div className="cliente">
            <label htmlFor='clientesSelect'>Escolha um cliente:</label>
            <select id='clientesSelect' value={clienteSelecionado} onChange={handleClientesChange}>
              <option value="">Selecione...</option>
              {clientes.map((cliente) => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nome}
                </option>
              ))}
            </select>
          </div>
          <div className="total-compra">
            <p>Total da compra:</p>
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
