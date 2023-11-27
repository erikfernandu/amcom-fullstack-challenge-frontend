// Módulos
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
// Componentes
import store from './redux/store';
import Header from './componentes/header/header.js';
import Sidebar from './componentes/sidebar/sidebar.js';
import Vendas from './componentes/vendas/vendas-lista.js'
import NovaVenda from './componentes/vendas/venda-nova.js';
import DetalhesVenda from './componentes/vendas/venda-detalhes.js';
import Comissoes from './componentes/comissoes/comissoes-lista.js';
// Estilo
import './App.css';

const App = () => {

  return (
    <Provider store={store}>
      <Router>
        <div>
        <Header/>
          <div style={{ display: 'flex' }}>
            <Sidebar/>
            <div className='content'>
              <Routes>
                <Route path="/" element={<Navigate to="/vendas" />} />
                <Route path="/vendas" element={<Vendas/>} />
                <Route path="/detalhes/:vendaId" element={<DetalhesVenda/>} />
                <Route path="/novavenda" element={<NovaVenda/>} />              
                <Route path="/comissoes" element={<Comissoes/>} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </Provider>
  );
};

export default App;