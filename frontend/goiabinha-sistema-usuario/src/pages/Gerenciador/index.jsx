
import React, { useEffect, useState } from 'react'
import Header from './../../components/header'
import {Button} from 'react-bootstrap'
//Importando botões com Ícones
import {FaTrashAlt, FaPencilAlt} from 'react-icons/fa'

//Importando a Url que será utilizada para realizar o fetch (Ligação com a API)
import { url } from '../../utils/constants'

//Importando CSS
import './index.css'

const Gerenciador = () => {
    // Declarando Variáveis
    const [idUsuario, setIdUsuario] = useState('');
    const [nome, setNome] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [sexo, setSexo] = useState('');
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() =>{
        listarUsuarios()
    },[]);

    // Método que adiciona um novo usuário
    const adicionarUsuario = (event) =>{
        event.preventDefault();

        let usuario = {
            nome: nome,
            dataNascimento: dataNascimento,
            sexo: sexo,
        }

        let method = (idUsuario === '' ? 'POST' : 'PUT');
        let urlRequest = (idUsuario === '' ? url + '/Usuarios' : url + '/Usuarios/' + idUsuario);

        fetch(urlRequest, {
            method: method,
            headers :{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(usuario)
        })
        .then(response => response.json())
        .then(response => {
            console.log(response)
            alert('Usuario Salvo!');
            listarUsuarios();
        })
        .catch(err => console.error(err));
    }

    // Método que atualiza as informações de um usuario de acordo com seu Id
    const atualizarUsuario = (event) =>{

    }

    // Método que exclui um usuario e suas informações de acordo com seu Id
    const excluirUsuario = (event) =>{
        if(event.target.value != undefined){
            fetch(`${url}/Usuarios/${event.target.value}`, {
                method: 'DELETE',
                //TO-DO 
                // Adicionar authorization com bearer token
            })
            .then(response => response.json())
            .then(dados => {
                console.log(event.target.value)
    
                alert('Usuario removido!');
                listarUsuarios();
            })
            .catch(err => console.error(err));
        }else{
            alert('Usuario não encontrado, tente novamente!');  
        }
  
    }

    // Método que lista um usuario e suas informações de acordo com seu Id
    const listarUsuario = (id) =>{
        fetch(`${url}/Usuarios/${id}`)
        .then(response => response.json())
        .then(dados => {
            setUsuarios(dados);
            console.log(usuarios)
        })
        .catch(err => console.error(err));
    }

    // Método que lista todos os usuários e suas informações
    const listarUsuarios = () =>{
        fetch(`${url}/Usuarios`)
        .then(response => response.json())
        .then(dados => {
            setUsuarios(dados);
            console.log(usuarios)
        })
        .catch(err => console.error(err));

    }

    const stateContainer = () =>{
        let cont = document.getElementById('idContainerInfo');
        if (cont.style.display === "flex") {
            cont.style.display = "none";

        } else {
            cont.style.display = "flex";

        }
    }

    return(
        <div>
            <Header/>
            <div className='total'>
                <div className='width85'>
                    <div className='subHeader'>
                        <h1>Gerenciamento de Usuários</h1>
                    </div>
                    <hr/>
                    <div className='crudBox'>
                        <div>
                            <button onClick={stateContainer} className='buttonCrud'>Adicionar Usuário</button>

                        </div>
                        <div>
                            <table className='tabelaGerenciamento'>
                                <thead>
                                    <tr>
                                        <td>#</td>
                                        <td>Nome</td>
                                        <td>Data de Nascimento</td>
                                        <td>Sexo</td>
                                        <td>Ações</td>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                    // Função que faz a listagem de todos os usuários em forma de lista
                                    usuarios.map((item, index) => {
                                            return(
                                            <tr key={index}>
                                                <th>{item.id}</th>
                                                <th>{item.nome}</th>
                                                <th>{item.dataNascimento}</th>
                                                <th>{item.sexo}</th>
                                                <th className='colunaBotoes'>
                                                    <button style={{backgroundColor:'#0abab5'}} value={item.id} onClick={stateContainer} ><FaPencilAlt className='iconBotoes'/></button>
                                                    <button style={{backgroundColor:'#ff3333'}} value={item.id} onClick={event => excluirUsuario(event)}><FaTrashAlt className='iconBotoes'/></button>
                                               
                                                </th>

                                            </tr>
                                            )
                                        })
                                    }
                                </tbody>

                            </table>
                        </div>
                    </div>
                    <div id="idContainerInfo">
                        <div className='stateContainer'>
                            <button onClick={stateContainer}>X</button>
                        </div>
                    <form className='containerInputs' onSubmit={adicionarUsuario}>
                            <label>
                                <input maxLength='50' value={nome} onChange={event => setNome(event.target.value)}  type="text" placeholder='Nome' required />
                            </label>

                            <label>
                            <input   value={sexo} onChange={event => setSexo(event.target.value)}  type="text" placeholder='Sexo'  />
                            </label>
                                        
                            <label>
                            <input   value={dataNascimento} onChange={event => setDataNascimento(event.target.value)}  type="date" placeholder='Sexo'  />
                            </label>
                            <input  style={{backgroundColor:'white', color:'red'}} type='submit' value='Salvar'></input>

                        </form>
                    </div>
                </div>
            </div>
        </div>
        
    )

};

export default Gerenciador;