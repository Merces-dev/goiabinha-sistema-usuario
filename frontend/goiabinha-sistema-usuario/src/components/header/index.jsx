import React from 'react';

import '../header/index.css';


const Header = () => {

    return (
        <div className='header total'>
            <div className='width85 centralHeader'>
                <a href='/'>
                <img  src="https://www.intelitrader.com.br/assets/logo.svg" alt='Logo da empresa Intelitrader'/>
                </a>
                <div className='linksHeader'>
                    <a href="/gerenciamento">Gerenciamento de Usuários</a>
                </div>
            </div>
        </div>
    )
}
export default Header;