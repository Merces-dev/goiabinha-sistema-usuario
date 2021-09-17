import React, { useEffect, useState } from 'react'


//* Importando Componentes
import Header from './../../components/header'
import Footer from './../../components/footer'

//* Importando a Url que será utilizada para realizar o fetch (Ligação com a API)
import { url } from '../../utils/constants'

//* Importando CSS
import './index.css'

const Gerenciador = () => {
    // Declarando Variáveis
    const [idUsuario, setIdUsuario] = useState('');
    const [nome, setNome] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [sexo, setSexo] = useState('');
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() =>{
        listarUsuarios();
    }, [])


    //* Método que adiciona um novo usuário
    const adicionarUsuario = (event) =>{
        event.preventDefault();

        // Especifica o objeto usuario
        let usuario = {
            nome: nome,
            dataNascimento: dataNascimento,
            sexo: sexo,
        }

        // Caso o idUsuario seja igual a vazio, o método utilizado será um POST, caso contrário será um PUT
        let method = (idUsuario === '' ? 'POST' : 'PUT');
        let urlRequest = (idUsuario === '' ? url + '/Usuarios' : url + '/Usuarios/' + idUsuario);

        // Realiza o Fetch, com o method definido acima, header do tipo JSON e body definido no objeto usuario porém
        // depois de passar pelo método JSON.stringify() - [Deixa o objeto em forma de código JSON]
        if(method === 'PUT'){
            if (window.confirm('Deseja mesmo atualizar os dados deste usuário ?')) { 
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
                    alert('Dados do usuário atualizados');
                    listarUsuarios();
                    stateContainer();
                })
                .catch(err => {
                    console.error(err)
                    alert(err);
                });

            }else{

            }
        }else if(method === 'POST'){
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
                alert('Usuário adicionado');
                listarUsuarios();
                stateContainer();
            })
            .catch(err => {
                console.error(err)
                alert(err);
            });
        }

    }



    //* Método que atualiza as informações de um usuario de acordo com seu Id
    const atualizarUsuario = (event) =>{
        event.preventDefault()

        if(event.target.value !== undefined){

        const idUsuario = event.target.value;

        // Lista o usuário de acordo com seu id e dá valor as variáveis do objeto usuario
        listarUsuario(idUsuario);
        stateContainer();

    }else{
        alert('Usuario não encontrado, tente novamente!');
    }
    }

    //* Método que exclui um usuario e suas informações de acordo com seu Id
    const excluirUsuario = (event) =>{
            // Busca a exclusão do usuário de acordo com o valor definido no input
            if(event.target.value !== undefined){
                if (window.confirm('Deseja mesmo apagar este usuário ?')) { 

                    fetch(`${url}/Usuarios/${event.target.value}`, {
                        method: 'DELETE',
                        //TODO:
                        // Adicionar authorization com bearer token
                    })
                    .then(response => response.json())
                    .then(dados => {    
                        listarUsuarios();
                    })
                    .catch(err => console.error(err));

                }
        }else{
            alert('Usuario não encontrado, tente novamente!');
        }
  
    }

    //* Método que lista um usuario e suas informações de acordo com seu Id
    const listarUsuario = (id) =>{
        fetch(`${url}/Usuarios/${id}`)
        .then(response => response.json())
        .then(dados => {
            setIdUsuario(dados.id);
            setNome(dados.nome);
            setDataNascimento(dados.dataNascimento);
            setSexo(dados.sexo);
        })
        .catch(err => console.error(err));
    }

    //* Método que lista todos os usuários e suas informações
    const listarUsuarios = () =>{
        fetch(`${url}/Usuarios`)
        .then(response => response.json())
        .then(dados => {
            setUsuarios(dados);
            console.log(usuarios)
        })
        .catch(err => console.error(err));

    }

    //* Método utilizado para abrir o container de Adicionar Usuário ou Atualizar
    const stateContainer = () =>{
        let cont = document.getElementById('idContainerInfo');
        if (cont.style.display === "flex") {
            cont.style.display = "none";
            zerarVariavies();

        } else {
            cont.style.display = "flex";

        }
    }

    const zerarVariavies =  () => {
        setIdUsuario('');
        setNome('');
        setSexo('');
        setDataNascimento('');
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
                            <button onClick={stateContainer} className='buttonCrud arredondamento'>Adicionar Usuário</button>

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
                                    //*  Função que faz a listagem de todos os usuários em forma de lista
                                    usuarios.map((item, index) => {
                                            return(
                                            <tr className='linhaTabela' key={index}>
                                                <th className='elementoTabela'><p className='mobileTipo'>Id: </p>{item.id}</th>
                                                <th className='elementoTabela'><p className='mobileTipo'>Nome: </p>{item.nome}</th>
                                                <th className='elementoTabela'><p className='mobileTipo'>Data de Nascimento: </p>{item.dataNascimento}</th>

                                                <th className='elementoTabela'><p className='mobileTipo'>Sexo: </p>{item.sexo}</th>
                                                <th className='colunaBotoes'>
                                                    <button className='arredondamento' style={{backgroundColor:'#535556'}} value={item.id} onClick={event => atualizarUsuario(event)} ><span style={{color:'white'}}className='icon fa fa-pencil'></span></button>
                                                    <button className='arredondamento' style={{backgroundColor:'#ff3333'}} value={item.id} onClick={event => excluirUsuario(event)}><span style={{color:'white'}}className='icon fa fa-trash'></span></button>

                                                </th>

                                            </tr>
                                            )
                                        })
                                    }
                                </tbody>

                            </table>
                        </div>
                    </div>
                    <div id="idContainerInfo" className='arredondamento '>
                        <div className='stateContainer '>
                            <button className='arredondamento' onClick={stateContainer}>X</button>
                        </div>
                        <form className='containerInputs '  onSubmit={adicionarUsuario}>
                            <input maxLength='50' className='arredondamento'value={nome} onChange={event => setNome(event.target.value)}  type="text" placeholder='Nome' required />
                      
                            <input className='arredondamento'  value={dataNascimento} onChange={event => setDataNascimento(event.target.value)}  type="date" required />
                            <select className='arredondamento' value={sexo} onChange={event => setSexo(event.target.value)} name="sexo" required>
                                <option value="" disabled selected>Selecione seu sexo</option>   
                                <option value='Masculino'>Masculino</option>
                                <option value='Feminino'>Feminino</option>
                                <option value='Outros'>Outros</option>
      
                            </select>    
                            <input className='buttonCrud arredondamento ' style={{color:'white', backgroundColor: 'var(--laranja)'}} type='submit' value='Salvar'></input>

                        </form>
                    </div>
                    <div id="alerta"className='arredondamento '>
                        <div className='subDivAlerta arredondamento'>
                             <p>Informação Intelitrader</p>
                             <button className='arredondamento' /*onClick={stateAlerta}*/>X</button> 
                        </div>
                        <div className='infoAlerta'>
                            <p>O usuario foi cadastrado com sucesso</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>

        </div>
        
    )

};

export default Gerenciador;