import React from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import "./index.css";
const NotFound = () => {
  return (
    <div>
      <Header />
      <div className="total coluna">
        <div className="total coluna backgroundConteudo">
          <div className="centralizar">
            <div className="containerConteudoNotFound arredondamento coluna">
              <div className="headerContainer arredondamento">
                <h3>Erro 404</h3>
              </div>
              <div className="info404  ">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/284/284270.png"
                  alt="Imagem de erro 404
                "
                />
                <h3>Erro 404</h3>

                <h4>Página ou Dados não encontrados</h4>
                <a href="/" className="texto">
                  Por Favor, Volte à nossa página inicial
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
export default NotFound;
