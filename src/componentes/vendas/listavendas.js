import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './listavendas.css';

const ListaVendas = () => {

  const [vendas, setDados] = useState([]);

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
      }
    } catch (error) {
      console.error('Erro ao excluir o item:', error.message);
    }
  };
  

  return (
    <div>
      <div className="container-header">
        <h2 className="header-subtitle">Vendas Realizadas</h2>
        <button className="inserir-btn"><Link to="/novavenda">Inserir nova Venda</Link></button>
      </div>
      <div className="tabela-container">
        <table className="tabela">
          <thead>
            <tr>
              <th>Nota Fiscal</th>
              <th>Cliente</th>
              <th>Vendedor</th>
              <th>Data Venda</th>
              <th>Valor Total</th>
              <th>Opções</th>
            </tr>
          </thead>
          <tbody>
            {vendas.map((venda) => (
              <tr key={venda.id}>
                <td>{venda.num_notafiscal}</td>
                <td>{venda.cliente}</td>
                <td>{venda.vendedor}</td>
                <td>{venda.dataehora}</td>
                <td>R$ {venda.valor_total}</td>
                <td>
                  <button className='verBtn'>Ver itens</button>
                  <button className="editarBtn">
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button className="excluirBtn" onClick={() => handle_delete(venda.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListaVendas;
