import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setHeaderTitle } from '../../redux/actions';
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

const NovaVenda = () => {
  // Estados a serem controlados
  const dispatch = useDispatch();
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

  // Titulo do componente
  useEffect(() => {
    dispatch(setHeaderTitle('Nova Venda'));

  }, [dispatch]);

  // Pesquisa do produto por termo
  const handleResultClick = async (result) => {
    try {
      setProdutoSelecionado(result);
      setSearchTerm(result.codigo_descricao || '');
      setSearchResults([]);
    }
    catch (error) {
      console.error('Erro ao obter detalhes do produto:', error);
    }
  };
  useEffect(() => {
    const axios_pesquisa_produtos = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/produtos/?search=${searchTerm}`);
        setSearchResults(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    };
  
    if (searchTerm.trim() !== '') {
      axios_pesquisa_produtos();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  // Adição de produto à venda
  const handle_adicionar_produtots = () => {
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
  const handle_excluir_produto = (index) => {
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
  function handle_mudar_data(event) {
    const selectedValue = event.target.value;
    setDataEHora(selectedValue);
  }

  // Selecionar vendedor
  const handle_mudar_vendedor = (event) => {
    const selectedValue = event.target.value;
    setVendedorSelecionado(selectedValue);
  };
  useEffect(() => {
    const axios_dados_vendedores = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/vendedores/');
        setVendedores(response.data);
      } catch (error) {
        console.error('Erro ao obter vendedores:', error);
      }
    };
    axios_dados_vendedores();
  }, []);

  // Selecionar cliente
  const handle_mudar_cliente = (event) => {
    const selectedValue = event.target.value;
    setClienteSelecionado(selectedValue);
  };
  useEffect(() => {
    const axios_dados_clientets = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/clientes/');
        setClientes(response.data);
      } catch (error) {
        console.error('Erro ao obter clientes:', error);
      }
    };
    axios_dados_clientets();
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
  const handle_finalizar_venda = async () => {
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
            <button className='adicionar-btn btn-container' onClick={handle_adicionar_produtots}>Adicionar</button>
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
              <button className="btn-excluir" onClick={() => handle_excluir_produto(index)}><FontAwesomeIcon icon={faTrash}/></button>
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
            <input id='data' type="datetime-local" defaultValue={getCurrentDateTime()} onChange={handle_mudar_data}/>
          </div>
          <div className="vendedor">
            <label htmlFor='vendedoresSelect'>Escolha um vendedor:</label>
            <select id='vendedoresSelect' value={vendedorSelecionado} onChange={handle_mudar_vendedor}>
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
            <select id='clientesSelect' value={clienteSelecionado} onChange={handle_mudar_cliente}>
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
            
            <button className='btn-container' onClick={handle_finalizar_venda} disabled={botaoDesabilitado} style={{backgroundColor: botaoDesabilitado ? '#dddddd' : '#235656',backgroudColor: botaoDesabilitado ? '#aaaaaa' : 'black'}}>Finalizar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NovaVenda;
