import React from 'react';

import '../footer/index.css';


const Footer = () => {

    return (
        <div className='footer total'>
            <div className='width85 centralFooter'>
                <a href='/'>
                <img  src="https://www.intelitrader.com.br/assets/logo.svg" alt='Logo da empresa Intelitrader'/>
                </a>
                <div className='linksFooter'>
                    <a href="/gerenciamento">Gerenciamento de Usuários</a>
                </div>
            </div>
            <div className='subFooter'>
                <p>Todos os direitos reservados a <a href="https://www.intelitrader.com.br">Intelitrader</a> - 2021</p>
            </div>
        </div>
    )
}
export default Footer;