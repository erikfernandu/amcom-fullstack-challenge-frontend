import React, { useState, useEffect } from 'react';
import './css/comissoes.css';

const ListaComissoes = () => {

  const [setDados] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/comissoes/');
        const data = await response.json();
        setDados(data);
      } catch (error) {
        console.error('Erro ao buscar comissoes:', error);
      }
    };
    fetchData();
  }, [setDados]);

  return (
    <div>
      <div className="container-header">
        <h2 className="header-subtitle">Relatório de Comissões</h2>
        <input type="date" defaultValue='' />
        <input type="date" defaultValue='' />
      </div>
      <div className="tabela-container">
        <table className="tabela">
          <thead>
            <tr>
              <th>Cód</th>
              <th>Vendedor</th>
              <th>Total de Vendas</th>
              <th>Total de Comissões</th>
            </tr>
          </thead>
          <tbody>
            {/* {comissoes.map((comissao) => (
              <tr key={comissao.id}>
                <td>{comissao.codigo}</td>
                <td>{venda.vendedor}</td>
                <td>{venda.total_vendas}</td>
                <td>{venda.total_comissoes}</td>
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
            ))} */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListaComissoes;
