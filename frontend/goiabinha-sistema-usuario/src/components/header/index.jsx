import React from "react";

import "../header/index.css";

const Header = () => {

    
  //* Método utilizado para abrir o dropdown do Hamburger Button
  const stateContainerHeader = () => {
    let cont = document.getElementById("idLinksHeader");
    if (cont.style.display === "flex") {
      cont.style.display = "none";
    } else {
      cont.style.display = "flex";
    }
  };

  return (
    <div className="header total">
      <div className="width85 centralHeader">
        <div className='logoButton'>
          <a href="/">
            <img
              src="https://www.intelitrader.com.br/assets/logo.svg"
              alt="Logo da empresa Intelitrader"
            />
          </a>
          <div className="mobileHeader">
            <button onClick={stateContainerHeader} className="buttonMobileHamburguer">
              <div className="buttonMobileHamburguerLines"></div>
              <div className="buttonMobileHamburguerLines"></div>
              <div className="buttonMobileHamburguerLines"></div>
            </button>
          </div>
        </div>

        <div className="linksHeader" id='idLinksHeader'>
          <a href="/gerenciamento">Gerenciamento de Usuários</a>
          <a href="/adicionar-usuario">Adicionar novo Usuário</a>
        </div>
      </div>
    </div>
  );
};
export default Header;
