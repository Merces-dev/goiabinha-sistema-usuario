import React from 'react';
import Header from './../../components/header'
import {FaTrashAlt, FaPencilAlt} from 'react-icons/fa'

import './index.css'
const Gerenciador = () => {
    const AdicionarUsuario = () =>{

    }

    const AtualizarUsuario = () =>{

    }

    const ExcluirUsuario = () =>{

    }

    const ListarUsuario = () =>{

    }
    
    const ListarUsuarios = () =>{

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
                            <button  className='buttonCrud'>Adicionar Usuário</button>

                        </div>
                        <div>
                            <table className='tabelaGerenciamento'>
                                <thead>
                                    <tr>
                                        <td>#</td>
                                        <td>Nome</td>
                                        <td>Data de Nascimento</td>
                                        <td>Sexo</td>

                                        <td></td>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <th>1</th>
                                        <th>Giovani Merces</th>
                                        <th>01/04/2003</th>
                                        <th>Masculino</th>
                                        <th className='colunaBotoes'>
                                            <button style={{backgroundColor:'#0abab5'}}><FaPencilAlt className='iconBotoes'/></button>
                                            <button style={{backgroundColor:'#ff3333'}}><FaTrashAlt className='iconBotoes'/></button>
                                        </th>

                                    </tr>
                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

};

export default Gerenciador;