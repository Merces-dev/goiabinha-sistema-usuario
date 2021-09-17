import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";

//* Importando Componentes
import Header from "./../../components/header";
import Footer from "./../../components/footer";
import Modal from "./../../components/modal";

//* Importando a Url que será utilizada para realizar o fetch (Ligação com a API)
import { url } from "../../utils/constants";

//* Importando CSS
import "./index.css";

const EditarUsuario = () => {
  const [idUsuario, setIdUsuario] = useState(useParams().id);
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [sexo, setSexo] = useState("");

  useEffect(() => {
    listarUsuario();
  }, []);

  function listarUsuario() {
    let id = idUsuario;
    fetch(`${url}/Usuarios/${id}`)
      .then((response) => response.json())
      .then((dados) => {
        console.log(dados);
        setIdUsuario(dados.id);
        setNome(dados.nome);
        setDataNascimento(dados.dataNascimento);
        setSexo(dados.sexo);
        console.log(nome)
      })
      .catch((error) => console.error(error));
  }

  console.log(idUsuario);
  return (
    <div>
      <Header />
      <div className="total">
        <div className="width85">
          <div className="subHeader">
            <h1>Editar dados do Usuário</h1>
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

export default EditarUsuario;
