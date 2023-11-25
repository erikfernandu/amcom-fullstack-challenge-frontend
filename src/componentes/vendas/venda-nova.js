import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { formatarValor } from '../utilitarios/functions';
import axios from 'axios';
import './css/vendas.css';

const getCurrentDateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const NovaVenda = ({ onSetTitulo }) => {
  // Estados a serem controlados
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [produtosAdicionados, setProdutosAdicionados] = useState([]);
  const [quantidadeAtual, setQuantidadeAtual] = useState(0);
  const [valorTotal, setValorTotal] = useState(0);
  const [dataEHora, setDataEHora] = useState(getCurrentDateTime);
  const [vendedores, setVendedores] = useState([]);
  const [vendedorSelecionado, setVendedorSelecionado] = useState('');
  const [clientes, setClientes] = useState([]);
  const [clienteSelecionado, setClienteSelecionado] = useState('');
  const [botaoDesabilitado, setBotaoDesabilitado] = useState(true);
  // Carregar os dados da venda
  useEffect(() => {
    onSetTitulo("Nova Venda");
  }, [onSetTitulo]);

  // Pesquisa do produto por termo
  const handleResultClick = async (result) => {
    try {
      setProdutoSelecionado(result);

      setSearchTerm(result.codigo_descricao || '');

      setSearchResults([]);

    } catch (error) {
      console.error('Erro ao obter detalhes do produto:', error);
    }
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
  // Adição de produto à venda
  const handleAdicionarProduto = () => {
    if (produtoSelecionado && quantidadeAtual > 0) {
      const valorProduto = produtoSelecionado.valor || 0;
      const totalAtualizado = valorTotal + valorProduto * quantidadeAtual;
      setValorTotal(totalAtualizado);

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
  // Exclusão de produto da venda
  const handleExcluirProduto = (index) => {
    if (index >= 0 && index < produtosAdicionados.length) {
      const produtoRemovido = produtosAdicionados[index];
      const valorProdutoRemovido = produtoRemovido.produto.valor || 0;
      const quantidadeRemovida = produtoRemovido.quantidade;

      const totalAtualizado = valorTotal - valorProdutoRemovido * quantidadeRemovida;
      setValorTotal(totalAtualizado);

      const novosProdutos = [...produtosAdicionados];
      novosProdutos.splice(index, 1);
      setProdutosAdicionados(novosProdutos);
    }
  };
  function handleDataChange(event) {
    const selectedValue = event.target.value;
    setDataEHora(selectedValue);
  }
  // Consulta à API pela lista de vendedores
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
  // Consulta à api pela lista de clientes
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
  // Controle de estado do botão para finalizar venda
  useEffect(() => {
    setBotaoDesabilitado(!(vendedorSelecionado && clienteSelecionado && valorTotal > 0));
  }, [vendedorSelecionado, clienteSelecionado, valorTotal]);

  const getRandomNotaFiscal = () => {
    const randomNumber = Math.floor(Math.random() * 1000000000);
    return randomNumber.toString().padStart(9, '0');
  };
  // Finalizar a venda
  const handleFinalizarVenda = async () => {
    try {
      const vendaData = {
        num_notafiscal: getRandomNotaFiscal(),
        dataehora: dataEHora,
        vendedor: vendedorSelecionado,
        cliente: clienteSelecionado,
        itemvenda_set: produtosAdicionados.map(item => ({
          produto: item.produto.id,
          quantidade: item.quantidade,
        })),
      };

      const response = await axios.post('http://127.0.0.1:8000/api/venda-nova/', vendaData);
      navigate('/vendas', {state: {mensagem: response.data.mensagem}});

    } catch (error) {
      console.log('ERRO_CRITICO', error)
    }
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
            {searchResults.map((result, index) => (
              <li key={`searchResult_${result.id || index}`} onMouseDown={() => handleResultClick(result)}>
                {result.codigo_descricao}
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
          <div>
          </div>
          {produtosAdicionados.map((item, index) => (
            <div key={`produtoAdicionado_${index}`} className="produto-adicionado">
              <span>{item.produto.descricao}</span>
              <span>{item.quantidade}</span>
              <span>{formatarValor(item.produto.valor)}</span>
              <span>{formatarValor(item.quantidade * item.produto.valor)}</span>
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
            <input id='data' type="datetime-local" defaultValue={getCurrentDateTime()} onChange={handleDataChange}/>
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
          <div className="total-venda">
            <h3>Valor total da venda</h3>
            <h2>{formatarValor(valorTotal.toFixed(2))}</h2>
          </div>
          <div className="botoes">
          <Link to="/vendas" className="botao-link">
            Cancelar
          </Link>
            
            <button onClick={handleFinalizarVenda} disabled={botaoDesabilitado} style={{backgroundColor: botaoDesabilitado ? '#dddddd' : '#235656',backgroudColor: botaoDesabilitado ? '#aaaaaa' : 'black'}}>Finalizar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NovaVenda;
