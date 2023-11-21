// NovaVenda.js

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './css/vendas.css';

const NovaVenda = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [produtosAdicionados, setProdutosAdicionados] = useState([]);
  const [quantidadeAtual, setQuantidadeAtual] = useState(0);
  const [vendedores, setVendedores] = useState([]);
  const [vendedorSelecionado, setVendedorSelecionado] = useState('');
  const [clientes, setClientes] = useState([]);
  const [clienteSelecionado, setClienteSelecionado] = useState('');

  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const handleResultClick = async (result) => {
    try {
      setProdutoSelecionado(result);

      setSearchTerm(result.descricao || '');

      setSearchResults([]);

    } catch (error) {
      console.error('Erro ao obter detalhes do produto:', error);
    }
  };

  const handleAdicionarProduto = () => {
    if (produtoSelecionado && quantidadeAtual > 0) {
      setProdutosAdicionados([...produtosAdicionados,
        {
          produto: produtoSelecionado,
          quantidade: quantidadeAtual,
        },
      ]);
      setProdutoSelecionado(null);
      setQuantidadeAtual(0);
      setSearchTerm('');
      setSearchResults([]);
    }
  };

  const handleExcluirProduto = (index) => {
    const novosProdutos = [...produtosAdicionados];
    novosProdutos.splice(index, 1);
    setProdutosAdicionados(novosProdutos);
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
              <li key={result.id} onMouseDown={() => handleResultClick(result)}>
                {result.descricao}
              </li>
            ))}
            </ul>
          </div>
          <div className="quantidade">
            <label htmlFor='quantidade'>Quantidade de itens:</label>
            <input id='quantidade' type="number" min="0" value={quantidadeAtual} onChange={(e) => setQuantidadeAtual(parseInt(e.target.value, 10) || 0)}/>
            <button className='adicionar-btn' onClick={handleAdicionarProduto}>Adicionar</button>
          </div>
        </div>
        <div className="produtos-labels">
          <div className="produto-label">
            <strong>Produtos/Serviços</strong>
          </div>
          <div className="produto-label">
            <strong>Quantidade</strong>
          </div>
          <div className="produto-label">
            <strong>Preço unitário</strong>
          </div>
          <div className="produto-label">
            <strong>Total</strong>
          </div>
          <div className="produto-label">
            <strong>delete</strong>
          </div>
        </div>
        <div className="produtos-adicionados">
          {produtosAdicionados.map((item, index) => (
            <div key={index} className="produto-adicionado">
              <span>{item.produto.descricao}</span>
              <span>{item.quantidade}</span>
              <span>R$ {item.produto.valor}</span>
              <span>R$ {item.quantidade * item.produto.valor}</span>
              <a className="excluirBtn" onClick={() => handleExcluirProduto(index)}><FontAwesomeIcon icon={faTrash}/></a>
            </div>
          ))}
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
