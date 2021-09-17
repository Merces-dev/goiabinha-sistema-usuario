import React from 'react';
import './index.css'

const Modal = ({onClose = () => {}, children}) => {
        setTimeout(() => {
            onClose()
        }, 2750);
    
    return(
        <div id="alerta"className='arredondamento '>
            <div className='subDivAlerta arredondamento'>
                <p>Informação Intelitrader</p>
                <button className='arredondamento' onClick={onClose} >X</button> 
            </div>
            <div className='infoAlerta'>
                <p>{children}</p>
            </div>
        </div>

    )


}

export default Modal;