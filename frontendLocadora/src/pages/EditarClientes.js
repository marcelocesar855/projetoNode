import React, {Component} from 'react';
import api from '../services/api';
import socket from 'socket.io-client';
import "./EditarClientes.css";

import EditarCliente from '../components/EditarCliente';

export default class ListaDeClientes extends Component {

    state = {
        clientes : [],  //arrays de clientes cadastrados
        pesquisa : ""  //nome a ser pesquisado
    };

    async componentDidMount () {  //método a ser executado após a renderizacao da tela
        this.subscribeToEvents();
        const clientes = await api.get('lista');
        this.setState({
            clientes : clientes.data
        })
    };

    handleSearch = async () => {  //busca cliente no backend a partir do nome
        const nome = this.state.pesquisa;
        if (nome !== ""){
            const cliente = await api.get('cliente/' + nome);
            this.setState({clientes : cliente.data});
        }else {
            const clientes = await api.get('lista');
            this.setState({clientes : clientes.data});
        }
    };

    handleInputChange = e => { //possibilita a edição do texto no input
        this.setState({pesquisa : e.target.value});
    };

    subscribeToEvents = () => {  //metodo que "escuta" eventos de edição e exclusão no backend
        const io = socket('http://localhost:3000');

        io.on('cliente', data => {
            this.setState({
                clientes : this.state.clientes.map(
                    cliente => (cliente._id === data._id ? data : cliente)
                )
            });
        });
        io.on('excluir', async () => {
            const clientes = await api.get('lista');
            this.setState({
                clientes : clientes.data,
                pesquisa : ""
            });
        alert("Cliente excluido")
        });
    };

    render() {   //redenriza html
        return (
            <div>
                <ul className="menu-edita">
                    <li><a onClick={() => {this.props.history.push('/');}}>Lista de Clientes</a></li>
                    <li><a onClick={() => {this.props.history.push('/cadastro');}}>Cadastrar</a></li>
                    <li><a onClick={() => {this.props.history.push('/editar');}}>Editar</a></li>
                </ul>
                <h1>Edição</h1>
                <div className="cliente-wrapper-edita">
                    <form>
                        <input type="text" placeholder="Nome do cliente"
                        onChange={this.handleInputChange} value={this.state.pesquisa}></input>&nbsp;
                        <button type="button" onClick={this.handleSearch}>Pesquisar</button>
                    </form>
                    <ul className="cliente-list-edita">
                        {this.state.clientes.map(cliente => (
                            <EditarCliente key={cliente._id} cliente={cliente}/>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}