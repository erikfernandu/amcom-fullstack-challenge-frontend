import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { formatarValor } from '../../utilitario';
import './css/comissoes.css';

const ListaComissoes = ({ onSetTitulo }) => {
  const [isSearching, setIsSearching] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [comissoes, setComissoes] = useState([]);

  useEffect(() => {
    onSetTitulo("Comissões");
  }, [onSetTitulo]);

  const handleSearch = async () => {
    setIsSearching(true);

    try {
      const response = await axios.get('http://127.0.0.1:8000/api/comissoes/', {
        params: {
          start_date: startDate || null,
          end_date: endDate || null,
        },
      });
      setComissoes(response.data);
    } catch (error) {
      console.error('Erro ao buscar comissões:', error);
    } finally {
      setIsSearching(true);
    }
  };

  return (
    <div>
      <div className="container-header">
        <h2 className="header-subtitle">Relatório de Comissões</h2>
        <div className="input-container">
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
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
            {comissoes.map((comissao) => (
              <div className="grid-item" key={comissao.id}>
                <div>{comissao.codigo}</div>
                <div>{comissao.nome}</div>
                <div>{formatarValor(comissao.total_vendas)}</div>
                <div>{formatarValor(comissao.total_comissoes)}</div>
              </div>
            ))}
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
