// detalhes-venda.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './css/vendas.css';

const NovaVenda = () => {

  const [vendedores, setVendedores] = useState([]);
  const [vendedorSelecionado, setVendedorSelecionado] = useState('');
  const [clientes, setClientes] = useState([]);
  const [clienteSelecionado, setClienteSelecionado] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { venda } = useParams();
  
  const handleResultClick = (result) => {
    setSearchTerm(result.descricao || '');
    setSearchResults([]);
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

  const handleVendedoresChange = (event) => {
    const selectedValue = event.target.value;
    setVendedorSelecionado(selectedValue);
  };

  useEffect(() => {
    const apiUrl = 'http://127.0.0.1:8000/api/vendedores/';
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => setVendedores(data))
      .catch(error => console.error('Erro ao obter vendedores:', error));
  }, []);

  const handleClientesChange = (event) => {
    const selectedValue = event.target.value;
    setClienteSelecionado(selectedValue);
  };

  useEffect(() => {
    const apiUrl = 'http://127.0.0.1:8000/api/clientes/';
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => setClientes(data))
      .catch(error => console.error('Erro ao obter clientes:', error));
  }, []);

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
            <input id='data' type="datetime-local" />
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
            <button>Salvar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NovaVenda;
