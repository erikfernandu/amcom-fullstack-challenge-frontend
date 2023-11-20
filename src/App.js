// Módulos
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// Componentes
import Header from './componentes/header/header.js';
import Sidebar from './componentes/sidebar/sidebar.js';
import Vendas from './componentes/vendas/listavendas.js'
// import DetalhesVenda from './componentes/vendas/detalhesvenda.js';
import NovaVenda from './componentes/vendas/novavenda.js';
import Comissoes from './componentes/comissoes/lista-comissoes.js'
// Estilo
import './App.css';


const App = () => {
  const [collapsed, setCollapsed] = useState(true);

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Router>
      <div>
      <Header onToggleCollapse={handleToggleCollapse} />
        <div style={{ display: 'flex' }}>
          <Sidebar collapsed={collapsed}/>
          <div className='content'>
            <Routes>
              <Route path="/" element={<Vendas/>} />
              <Route path="/vendas" element={<Vendas/>} />
              {/* <Route path="/detalhes/:id" element={<DetalhesVenda/>} /> */}
              <Route path="/novavenda" element={<NovaVenda/>} />
              {/* <Route path="/editarvenda" element={<NovaVenda/>} /> */}
              
              <Route path="/comissoes" element={<Comissoes/>} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
