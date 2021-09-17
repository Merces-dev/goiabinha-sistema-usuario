import React, { useEffect, useState } from "react";

//* Importando Componentes
import Header from "./../../components/header";
import Footer from "./../../components/footer";
import Modal from "./../../components/modal";
//* Importando a Url que será utilizada para realizar o fetch (Ligação com a API)
import { url } from "../../utils/constants";

//* Importando CSS
import "./index.css";

const AdicionarUsuario = () => {
  return (
    <div>
      <Header />
      <div className="total">
        <div className="width85">
          <div className="subHeader">
            <h1>Exclusão de Usuário</h1>
          </div>
          <hr />
        </div>
        {/* {isModalVisible?(
                    <Modal onClose={ () => setIsModalVisible(false)} children={mensagem} />
                ): null} */}
      </div>
      <Footer />
    </div>
  );
};

export default AdicionarUsuario;
