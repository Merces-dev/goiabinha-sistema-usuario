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
                        <div>
                            <a href='/gerenciamento'>Gerenciamento de Usuários</a>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>

        </div>
    )
};

export default Home;