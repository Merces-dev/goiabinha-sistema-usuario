import React from 'react';
import Header from './../../components/header'
import './index.css'
const Home = () => {
    return(
        <div>
            <Header/>
            <div className='total'>
                <div className='width85'>
                    <div className='centralHome'>
                        <div>
                            <a href='/gerenciamento'>Gerenciamento de Usuários</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Home;