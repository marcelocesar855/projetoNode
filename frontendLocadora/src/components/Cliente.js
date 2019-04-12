import React, {Component} from 'react';
import api from '../services/api';

import "./Cliente.css";

export default class Cliente extends Component {
    
    state = {  //atribui os valores da propriedade do componente as variaveis de estado
        filmes : this.props.cliente.filmes
    };

    handleInputChange = e => { //possibilita a edição do texto no input
        this.setState({filmes : e.target.value});
    };
    
    handleUpdate = async () => { //envia as informações atualizadas para o backend
        this.props.cliente.filmes = this.state.filmes;
        const { _id } = this.props.cliente;

        await api.post(`atualizar/${_id}`, this.props.cliente);
        alert("Cliente atualizado")
    };
    
    render() { //renderiza html
        const {cliente} = this.props; //busca dados da propriedade cliente do componente

        return(

            <li className="cliente-listar">
                    <strong>{cliente.nome}</strong><br/>
                    <p>CPF:&nbsp;{cliente.cpf}</p>
                    <p>Telefone:&nbsp;{cliente.telefone}</p>
                    <p>Email:&nbsp;{cliente.email}</p>
                    <p>Endereço:&nbsp;{cliente.endereco}</p>
                    <p>CEP:&nbsp;{cliente.cep}</p>
                    Filmes<br/><textarea onChange={this.handleInputChange} 
                    value={this.state.filmes}></textarea><br/>
                    <p><button type="button" onClick={this.handleUpdate}
                    alt="Atualizar filmes do cliente">Atualizar</button></p>
            </li> 
        );
    }
}