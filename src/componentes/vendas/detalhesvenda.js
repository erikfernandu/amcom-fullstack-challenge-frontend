// DetalhesVenda.js
import React from 'react';

const DetalhesVenda = ({ match }) => {
  const vendaId = match.params.id;

  return (
    <div>
      <h2>Detalhes da Venda #{vendaId}</h2>
      {/* Conteúdo dos detalhes da venda */}
    </div>
  );
};

export default DetalhesVenda;
