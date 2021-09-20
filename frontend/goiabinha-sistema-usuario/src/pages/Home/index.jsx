import React from 'react';
import Header from './../../components/header'
import Footer from './../../components/footer'

import './index.css'
const Home = () => {
    return(
        <div>
            <Header/>
            <div className='total'>
                <div className='width85'>
                    <div className='centralHome'>
                        <div className='arredondamento centralizar'>
                            <a style={{textAlign:'center'}}href='/gerenciamento'>Gerenciamento de usuários</a>
                        </div>
                        <div className='arredondamento centralizar'>
                            <a style={{textAlign:'center'}}href='/adicionar-usuario'>Adicionar novo usuário</a>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>

        </div>
    )
};

export default Home;