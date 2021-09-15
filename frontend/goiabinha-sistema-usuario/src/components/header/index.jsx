import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications';
import '../header/index.css';


const Header = () => {

    return (
        <div className='header total'>
            <div className='width85 centralHeader'>
                <a href='/'>
                <img  src="https://www.intelitrader.com.br/assets/logo.svg"/>
                </a>
                <div className='linksHeader'>
                    <a href="/gerenciamento">Gerenciamento de Usuários</a>
                </div>
            </div>
        </div>
    )
}
export default Header;