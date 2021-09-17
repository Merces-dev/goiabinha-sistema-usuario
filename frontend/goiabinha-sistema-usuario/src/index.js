import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import reportWebVitals from './reportWebVitals';
//Pages
import Home from './pages/Home'
import Gerenciador from './pages/Gerenciador';
import AdicionarUsuario from './pages/AdicionarUsuario';
import ExcluirUsuario from './pages/ExcluirUsuario';
import EditarUsuario from './pages/EditarUsuario';


const routing = (
  <Router>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route  path="/gerenciamento" component={Gerenciador}/>
      <Route  path="/adicionar-usuario" component={AdicionarUsuario}/>
      <Route  path="/excluir-usuario/:id" component={ExcluirUsuario}/>
      <Route  path="/editar-usuario/:id" component={EditarUsuario}/>

    </Switch>
  </Router>
);

ReactDOM.render(
  
    routing
 , 
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
