import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useHistory,
} from "react-router-dom";

//* Importando Componentes
import Header from "./../../components/header";
import Footer from "./../../components/footer";
import Modal from "./../../components/modal";
import ModalConfirmacao from "../../components/modalconfirmacao";

//* Importando a Url que será utilizada para realizar o fetch (Ligação com a API)
import { url } from "../../utils/constants";

//* Importando CSS
import "./index.css";

const AdicionarUsuario = () => {
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [sexo, setSexo] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalConfirmacaoVisible, setIsModalConfirmacaoVisible] =
    useState(false);
  const [pergunta, setPergunta] = useState("");

  const [isFunctionAuthorized, setIsFunctionAuthorized] = useState(false);
  const [mensagem, setMensagem] = useState("");
  let history = useHistory();

  const adicionarUsuario = (event) => {
    event.preventDefault();

    // Especifica o objeto usuario
    let usuario = {
      nome: nome,
      dataNascimento: dataNascimento,
      sexo: sexo,
    };
    let urlRequest = url + "/Usuarios";
    if (
      usuario.nome === "" ||
      usuario.dataNascimento === "" ||
      usuario.sexo === ""
    ) {
      setMensagem("Todos os campos devem ter valores");
      setIsModalVisible(true);
    } else {
      // Realiza o Fetch, com o method definido acima, header do tipo JSON e body definido no objeto usuario porém
      // depois de passar pelo método JSON.stringify() - [Deixa o objeto em forma de código JSON]
      setIsModalConfirmacaoVisible(true);
      setPergunta("Deseja mesmo adicionar este usuário ?");
      if (window.confirm("Deseja mesmo adicionar este usuário ?")) {
        setIsModalConfirmacaoVisible(false);
        setIsFunctionAuthorized(false);
        fetch(urlRequest, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(usuario),
        })
          .then((response) => response.json())
          .then((response) => {
            console.log(response);
            setMensagem("Usuário adicionado com sucesso");
            setIsModalVisible(true);
            setTimeout(() => {
              history.push("/gerenciamento");
            }, 2050);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }
  };
  return (
    <div>
      <Header />
      <div className="total coluna">
        <div className="subHeader width85">
          <h1>Adicionar novo usuário</h1>
          <hr style={{ marginBottom: "20px" }} />
        </div>
        <div className="total coluna backgroundConteudo">
          <div className="centralizar">
            <div className="containerConteudo arredondamento coluna">
              <div className="headerContainer arredondamento">
                <h3>Informações do Usuário</h3>
              </div>
              <div>
                <form action="">
                  <div className="infoUsuario centralizar ">
                    <div className="boxInfoLabel coluna arredondamento">
                      <label className="arredondamento">Nome do Usuário</label>
                      <input
                        maxLength="50"
                        className="arredondamento inputEditar"
                        value={nome}
                        onChange={(event) => setNome(event.target.value)}
                        type="text"
                        placeholder="Nome"
                        required
                      />
                    </div>
                    <div className="boxInfoLabel coluna arredondamento">
                      <label className="arredondamento">
                        Data de Nascimento
                      </label>
                      <input
                        className="arredondamento inputEditar"
                        value={dataNascimento}
                        onChange={(event) =>
                          setDataNascimento(event.target.value)
                        }
                        type="date"
                        required
                      />
                    </div>
                    <div className="boxInfoLabel coluna arredondamento">
                      <label className="arredondamento">Sexo do Usuário</label>
                      <select
                        className="arredondamento inputEditar"
                        value={sexo}
                        onChange={(event) => setSexo(event.target.value)}
                        name="sexo"
                        required
                      >
                        <option value="" disabled selected>
                          Selecione seu sexo
                        </option>
                        <option value="Masculino">Masculino</option>
                        <option value="Feminino">Feminino</option>
                        <option value="Outros">Outros</option>
                      </select>{" "}
                    </div>
                  </div>
                  <div className="centralizar">
                    <button
                      className="buttonP boxInfoLabel arredondamento caixadedica"
                      style={{ backgroundColor: "#535556" }}
                      onClick={(event) => {
                        adicionarUsuario(event);
                      }}
                    >
                      Adicionar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalVisible ? (
        <Modal onClose={() => setIsModalVisible(false)} children={mensagem} />
      ) : null}
      {/* {isModalConfirmacaoVisible ? (
        <ModalConfirmacao
          onClose={() => setIsModalConfirmacaoVisible(false)}
          onOk={() => {
            setIsModalConfirmacaoVisible(false);
            setIsFunctionAuthorized(true);
          }}
          children={pergunta}
        />
      ) : null} */}
      <Footer />
    </div>
  );
};

export default AdicionarUsuario;
