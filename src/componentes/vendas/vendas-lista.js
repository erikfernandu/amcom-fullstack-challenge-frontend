import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setHeaderTitle } from '../../redux/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash,faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { formatarValor, formatarDataEHora } from '../utilitarios/functions';
import axios from 'axios';
import './css/lista-vendas.css';

const ListaVendas = () => {
  // Estados a serem controlados
  const dispatch = useDispatch();
  const location = useLocation();
  const [vendas, setDados] = useState([]);
  const [showItens, setShowItens] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Titulo do componente
  useEffect(() => {
    dispatch(setHeaderTitle('Vendas'));
    
    if (location.state && location.state.mensagem) {
      setSuccessMessage(location.state.mensagem);
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        setSuccessMessage('');
      }, 3000);
    }
  }, [dispatch, location.state]);

  useEffect(() => {
    axiosFetchData();
  }, []);

  // Atualização de dados das vendas
  const axiosFetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/vendas/');
      const data = response.data;
      setDados(data);
    } catch (error) {
      console.error('Erro ao buscar vendas:', error);
    }
  };

  // Mostrar os detalhes da venda
  const handle_ver_detalhes = (vendaId) => {
    setShowItens({
      ...showItens,
      [vendaId]: !showItens[vendaId],
    });
  };

  // Função de exclusão da venda
  const handle_excluir_venda = async (vendaId) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/venda-detalhes/${vendaId}`);
      // Tratamento de mensagem da API
      if (response.status === 204) {
        setSuccessMessage('VENDA REMOVIDA COM SUCESSO!');
        setShowSuccessMessage(true);
        axiosFetchData();

        setTimeout(() => {
          setShowSuccessMessage(false);
          setSuccessMessage('');
        }, 3000);
      }
      
    } catch (error) {
      console.error('Erro ao excluir venda:', error);
    }
  };
  
  return (
    <div>
      <div className="container-header">
      {showSuccessMessage && (
          <div className="success-message-container">
            <FontAwesomeIcon icon={faCheckCircle} className="success-message-icon" />
            <div className="success-message">
              {successMessage}
            </div>
          </div>
        )}
        <h2 className="header-subtitle">Vendas Realizadas</h2>
        <Link to="/novavenda"><button className="inserir-btn">Inserir nova Venda</button></Link>
      </div>
      <div className="tabela-container-flex">
          <div className="tabela-row">
            <div className="tabela-cell">
              <strong className="tittle-table">Nota Fiscal</strong>
            </div>
            <div className="tabela-cell">
              <strong className="tittle-table">Cliente</strong>
            </div>
            <div className="tabela-cell">
              <strong className="tittle-table">Vendedor</strong>
            </div>
            <div className="tabela-cell">
              <strong className="tittle-table">Data Venda</strong>
            </div>
            <div className="tabela-cell">
              <strong className="tittle-table">Valor Total</strong>
            </div>
            <div className="tabela-cell">
              <strong className="tittle-table">Opções</strong>
            </div>
          </div>
      </div>
      <div className="tabela-container-flex">
        {vendas.map((venda) => (
          <div key={venda.id}>
              <div className="tabela-row">
                <div className="tabela-cell">
                  {venda.num_notafiscal}
                </div>
                <div className="tabela-cell">
                  {venda.cliente}
                </div>
                <div className="tabela-cell">
                  {venda.vendedor}
                </div>
                <div className="tabela-cell">
                  {formatarDataEHora(venda.dataehora)}
                </div>
                <div className="tabela-cell">
                  {formatarValor(venda.valor_total)}
                </div>
                <div className="tabela-cell">
                  <button className="btn-ver" onClick={() => handle_ver_detalhes(venda.id)}>
                    {showItens[venda.id] ? 'Fechar' : 'Ver Itens'}
                  </button>
                  <a href={`/detalhes/${venda.id}`} className="btn-editar">
                    <FontAwesomeIcon icon={faEdit}/>
                  </a>
                  <button className="btn-excluir" onClick={() => handle_excluir_venda(venda.id)}>
                    <FontAwesomeIcon icon={faTrash}/>
                  </button>
                </div>
              </div>
            {showItens[venda.id] && (
                <div className="tabela-itens">
                  <table>
                    <thead>
                      <tr>
                        <th>Produtos/Serviços</th>
                        <th>Quantidade</th>
                        <th>Preço unitário</th>
                        <th>Total do produto</th>
                        <th>% de comissão</th>
                        <th>Comissão</th>
                      </tr>
                    </thead>
                    <tbody>
                    {venda.itemvenda_set.map((item, index) => (
                      <tr key={`item_${item.id || index}`}>
                        <td>{item.produto.descricao}</td>
                        <td>{item.quantidade}</td>
                        <td>{formatarValor(item.produto.valor)}</td>
                        <td>{formatarValor(item.quantidade * item.produto.valor)}</td>
                        <td>{item.comissao} %</td>
                        <td>{formatarValor(((item.quantidade * item.produto.valor)*item.comissao) /100)}</td>
                      </tr>
                    ))}
                    <tr>
                      <td><strong>Total da venda</strong></td>
                      <td><strong>{venda.total_itens}</strong></td>
                      <td></td>
                      <td><strong>{formatarValor(venda.valor_total)}</strong></td>
                      <td></td>
                      <td><strong>{formatarValor(venda.valor_total_comissoes)}</strong></td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaVendas;