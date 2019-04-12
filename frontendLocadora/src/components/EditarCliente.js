import React, {Component} from 'react';
import api from '../services/api';

import "./EditarCliente.css";

export default class EditarCliente extends Component {
    
    state = { //atribui os valores da prorpiedade do componente as variaveis de estado
        nome : this.props.cliente.nome,
        cpf : this.props.cliente.cpf,
        telefone : this.props.cliente.telefone,
        email : this.props.cliente.email,
        endereco : this.props.cliente.endereco,
        cep : this.props.cliente.cep,
        filmes : this.props.cliente.filmes
    };

    handleInputChangeNome = e => { //possibilita a edição do texto no input
        this.setState({nome : e.target.value});
    };

    handleInputChangeCpf = e => {  //possibilita a edição do texto no input
        this.setState({cpf : e.target.value});
    };

    handleInputChangeTelefone = e => {  //possibilita a edição do texto no input
        this.setState({telefone : e.target.value});
    };

    handleInputChangeEmail = e => {  //possibilita a edição do texto no input
        this.setState({email : e.target.value});
    };

    handleInputChangeEndereco = e => {  //possibilita a edição do texto no input
        this.setState({endereco : e.target.value});
    };

    handleInputChangeCep = e => {  //possibilita a edição do texto no input
        this.setState({cep : e.target.value});
    };
    
    handleInputChange = e => {  //possibilita a edição do texto no input
        this.setState({filmes : e.target.value});
    };
    
    handleUpdate = async () => { //envia as informações editadas para o backend
        const { _id } = this.props.cliente;
        const nome = this.state.nome;
        const cpf = this.state.cpf;
        const telefone = this.state.telefone;
        const email = this.state.email;
        const endereco = this.state.endereco;
        const cep = this.state.cep;
        const filmes = this.state.filmes;
        await api.post(`atualizar/${_id}`, {nome,cpf,telefone,email,endereco,cep,filmes});
        alert("Cliente atualizado")
    };

    handleExclude = async () => {  //envia a solicitação de exclusão para o backend com id do cliente como parametro
        const {_id} = this.props.cliente;
        await api.post(`excluir/${_id}`);
    }
    
    render() {   //renderiza html

        return(
            <li className="cliente-edita">
                <p>Nome:&nbsp;<input type="text" value={this.state.nome}
                onChange={this.handleInputChangeNome}></input></p>
                <p>CPF:&nbsp;<input type="number" value={this.state.cpf}
                onChange={this.handleInputChangeCpf}></input></p>
                <p>Telefone:&nbsp;<input type="tel" value={this.state.telefone}
                onChange={this.handleInputChangeTelefone}></input></p>
                <p>Email:&nbsp;<input type="email" value={this.state.email}
                onChange={this.handleInputChangeEmail}></input></p>
                <p>Endereço:&nbsp;<input type="text" value={this.state.endereco}
                onChange={this.handleInputChangeEndereco}></input></p>
                <p>CEP:&nbsp;<input type="number" value={this.state.cep}
                onChange={this.handleInputChangeCep}></input></p>
                <p>Filmes<br/><textarea onChange={this.handleInputChange} 
                value={this.state.filmes}></textarea></p>
                <p><button type="button" onClick={this.handleUpdate}
                alt="Atualizar informações do Cliente">Atualizar informações</button></p>
                <p><button type="button" onClick={this.handleExclude}
                alt="Excluir informações do Cliente">Excluir Cliente</button></p>
            </li> 
        );
    }
}