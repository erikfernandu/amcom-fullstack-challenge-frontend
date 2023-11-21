import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import './css/comissoes.css';

const ListaComissoes = () => {
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    // Implementar lógica de pesquisa aqui
    setIsSearching(true);
  };

  const exemploRegistro = {
    codigo: 1,
    vendedor: 'Nome do Vendedor',
    totalVendas: 1000,
    totalComissoes: 100,
    valorTotal: 900,
  };

  return (
    <div>
      <div className="container-header">
        <h2 className="header-subtitle">Relatório de Comissões</h2>
        <div className="input-container">
            <input type="date" />
            <input type="date" />
          <button className="searchBtn" onClick={handleSearch}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>
      <div className="tabela-container">
        {isSearching ? (
          <div className="grid-container">
            <div className="grid-header">
              <div>Cód</div>
              <div>Vendedor</div>
              <div>Total de Vendas</div>
              <div>Total de Comissões</div>
            </div>
            <div className="grid-item">
              <div>{exemploRegistro.codigo}</div>
              <div>{exemploRegistro.vendedor}</div>
              <div>{exemploRegistro.totalVendas}</div>
              <div>{exemploRegistro.totalComissoes}</div>
            </div>
            <div className="grid-item">
              <div>{exemploRegistro.codigo}</div>
              <div>{exemploRegistro.vendedor}</div>
              <div>{exemploRegistro.totalVendas}</div>
              <div>{exemploRegistro.totalComissoes}</div>
            </div>
            <div className="grid-footer">
              <div>Total de comissões do período</div>
              <div>R$ 1000,00</div>
            </div>
          </div>
          ) : (
            <p className="mensagem">Para visualizar o relatório, selecione um período nos campos acima.</p>
        )}
      </div>
    </div>
  );
};

export default ListaComissoes;
