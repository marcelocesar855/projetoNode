import React, {Component} from 'react';
import api from '../services/api';
import socket from 'socket.io-client';
import "./ListaDeClientes.css";

import Cliente from '../components/Cliente';

export default class ListaDeClientes extends Component {

    state = {
        clientes : [],  //arrays de clientes cadastrados
        pesquisa : ""  //nome a ser pesquisado
    };

    async componentDidMount () {  //método a ser executado após a renderizacao da tela
        this.subscribeToEvents();

        const clientes = await api.get('lista');  //busca todos os clientes cadastrados

        this.setState({ clientes : clientes.data});
    };

    handleSearch = async () => {  // método responsável por realizar a busca de clientes pelo nome
        const nome = this.state.pesquisa;
        if (nome !== ""){
            const cliente = await api.get('cliente/' + nome);
            this.setState({clientes : cliente.data});
        }else {
            const cliente = await api.get('lista');
            this.setState({clientes : cliente.data});
        }
    };

    handleInputChange = e => {  //possibilita a edição do texto no input
        this.setState({pesquisa : e.target.value});
    };

    subscribeToEvents = () => {   //metodo que "escuta" eventos de edição no backend
        const io = socket('http://localhost:3000');

        io.on('cliente', data => {
            this.setState({
                clientes : this.state.clientes.map(
                    cliente => (cliente._id === data._id ? data : cliente)
                )
            });
        });
    };

    render() { //renderiza html
        return (
            <div>
                <ul className="menu-lista">
                    <li><a onClick={() => {this.props.history.push('/')}}>Lista de Clientes</a></li>
                    <li><a onClick={() => {this.props.history.push('/cadastro')}}>Cadastrar</a></li>
                    <li><a onClick={() => {this.props.history.push('/editar')}}>Editar</a></li>
                </ul>
                <h1>Lista de Clientes</h1>
                <div className="cliente-wrapper-lista">
                    <form>
                        <input type="text" placeholder="Nome do cliente"
                        onChange={this.handleInputChange} value={this.state.pesquisa}></input>&nbsp;
                        <button type="button" onClick={this.handleSearch}>Pesquisar</button>
                    </form>
                    <ul className="cliente-lista">
                        {this.state.clientes.map(cliente => (
                            <Cliente key={cliente._id} cliente={cliente}/>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}