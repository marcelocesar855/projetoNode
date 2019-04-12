import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import ListaDeClientes from './pages/ListaDeClientes';
import Cadastro from './pages/Cadastro';
import EditarClientes from './pages/EditarClientes';

class App extends Component {
  // definição das rotas para as telas da aplicação
  render() {
    return (
     <BrowserRouter>
      <Switch> 
        <Route path="/" exact component={ListaDeClientes} />
        <Route path="/cadastro" component={Cadastro} />
        <Route path="/editar" component={EditarClientes} />
      </Switch>
     </BrowserRouter>
    );
  }
}

export default App;
