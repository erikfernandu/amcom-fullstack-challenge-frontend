import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './css/lista-vendas.css';

const ListaVendas = () => {

  const [vendas, setDados] = useState([]);
  const [showItens, setShowItens] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/vendas/');
        const data = await response.json();
        setDados(data);
      } catch (error) {
        console.error('Erro ao buscar vendas:', error);
      }
    };
    fetchData();
  }, []);

  const handleVerItens = (vendaId) => {
    setShowItens({
      ...showItens,
      [vendaId]: !showItens[vendaId],
    });
  };

  const handle_delete = async (vendaId) => {
    try {
      const url = `http://127.0.0.1:8000/api/venda/${vendaId}`;
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
      });
  
      if (response.ok) {
        console.log('Item excluído com sucesso');
        const novasVendas = vendas.filter(item => item.id !== vendaId);
        setDados(novasVendas);
      } else {
        console.error('Falha ao excluir o item:', response.statusText);
        if (response.status === 404) {
        } else if (response.status === 500) {
        }
      }
    } catch (error) {
      console.error('Erro ao excluir o item:', error.message);
    }
  };
  
  return (
    <div>
      <div className="container-header">
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
                  {venda.dataehora}
                </div>
                <div className="tabela-cell">
                  R$ {venda.valor_total}
                </div>
                <div className="tabela-cell">
                  <button className="verBtn" onClick={() => handleVerItens(venda.id)}>
                  {showItens[venda.id] ? 'Fechar' : 'Ver Itens'}
                  </button>
                  <Link to={`/detalhes/${venda.id}`}>
                    <a className="editarBtn">
                        <FontAwesomeIcon icon={faEdit}/>
                      </a>
                  </Link>                  
                  <a className="excluirBtn" onClick={() => handle_delete(venda.id)}>
                    <FontAwesomeIcon icon={faTrash}/>
                  </a>
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
                    {venda.itemvenda_set.map((item) => (
                      <tr key={item.id}>
                        <td>{item.produto.descricao}</td>
                        <td>{item.quantidade}</td>
                        <td>R$ {item.produto.valor}</td>
                        <td>R$ {item.quantidade * item.produto.valor}</td>
                        <td>{item.produto.comissao}</td>
                        <td>R$ {((item.quantidade * item.produto.valor)*item.produto.comissao) /100}</td>
                      </tr>
                    ))}
                    <tr>
                      <td><strong>Total da venda</strong></td>
                      <td><strong>{venda.total_itens}</strong></td>
                      <td></td>
                      <td><strong>R$ {venda.valor_total}</strong></td>
                      <td></td>
                      <td><strong>R$ {venda.total_comissao}</strong></td>
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
