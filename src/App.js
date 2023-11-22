// Módulos
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// Componentes
import Header from './componentes/header/header.js';
import Sidebar from './componentes/sidebar/sidebar.js';
import Vendas from './componentes/vendas/lista-vendas.js'
import NovaVenda from './componentes/vendas/nova-venda.js';
import DetalhesVenda from './componentes/vendas/detalhes-venda.js';
import Comissoes from './componentes/comissoes/lista-comissoes.js'
// Estilo
import './App.css';

const App = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [titulo, setTitulo] = useState("");
  // Controle de estado do sidebar pela aplicação
  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
  };
  // Controle de estado do título pela aplicação
  const handleSetTitulo = (titulo) => {
    setTitulo(titulo);
  };

  return (
    <Router>
      <div>
      <Header onToggleCollapse={handleToggleCollapse} titulo={titulo} />
        <div style={{ display: 'flex' }}>
          <Sidebar collapsed={collapsed}/>
          <div className='content'>
            <Routes>
              <Route path="/" element={<Vendas onSetTitulo={handleSetTitulo}/>} />
              <Route path="/vendas" element={<Vendas onSetTitulo={handleSetTitulo}/>} />
              <Route path="/detalhes/:vendaId" element={<DetalhesVenda onSetTitulo={handleSetTitulo}/>} />
              <Route path="/novavenda" element={<NovaVenda onSetTitulo={handleSetTitulo}/>} />              
              <Route path="/comissoes" element={<Comissoes onSetTitulo={handleSetTitulo}/>} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
