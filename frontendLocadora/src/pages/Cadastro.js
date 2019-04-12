import React, {Component} from 'react';
import api from '../services/api';
import socket from 'socket.io-client';
import "./Cadastro.css";

export default class Cadastro extends Component {

    state = {
        nome : null,
        cpf : null,
        telefone : null,
        email : null,
        endereco : null,
        cep : null,
        filmes :null
    };
    
    handleInclude = async () => { //envia as informações a serem salvar para o backend
        const nome = this.state.nome;
        const cpf = this.state.cpf;
        const telefone = this.state.telefone;
        const email = this.state.email;
        const endereco = this.state.endereco;
        const cep = this.state.cep;
        const filmes = this.state.filmes;
        await api.post("cadastro/", {nome,cpf,telefone,email,endereco,cep,filmes});
    };
    
    async componentDidMount () {  //método a ser executado após a renderizacao da tela
        this.subscribeToEvents();
    };

    subscribeToEvents = () => {  //metodo que "escuta" eventos de cadastro no backend
        const io = socket('http://localhost:3000');

        io.on('cadastro', () => {
            this.setState({
                nome : "",
                cpf : "",
                telefone : "",
                email : "" ,
                endereco : "",
                cep : "",
                filmes : "",
            })
        alert("Cliente Cadastrado")
        });
    };

    
    typeOf(obj) { //método responsável por verificar o tipo de uma variavel js
        return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
      }

    render() { //renderiza html
        return (
            <div className="cliente-wrapper">
                <ul className="menu"> 
                    <li><a onClick={() => {this.props.history.push('/');}}>Lista de Clientes</a></li>
                    <li><a onClick={() => {this.props.history.push('/cadastro');}}>Cadastrar</a></li>
                    <li><a onClick={() => {this.props.history.push('/editar');}}>Editar</a></li>
                </ul>
                <h1>Cadastro</h1>
                <li className="cliente">
                    <p>Nome:&nbsp;<input type="text" value={this.state.nome}></input></p>
                    <p>CPF:&nbsp;<input type="number" value={this.state.cpf}></input></p>
                    <p>Telefone:&nbsp;<input type="number" value={this.state.telefone}></input></p>
                    <p>Email:&nbsp;<input type="email" value={this.state.email}></input></p>
                    <p>Endereço:&nbsp;<input type="text" value={this.state.endereco}></input></p>
                    <p>CEP:&nbsp;<input type="number" value={this.state.cep}></input></p>
                    <p>Filmes<br/><textarea onChange={this.handleInputChange} value={this.state.filmes}></textarea></p>
                    <p><button type="button" onClick={this.handleInclude}
                    alt="Cadastro do Cliente">Cadastrar Cliente</button></p>
            </li> 
            </div>
        );
    }
}
