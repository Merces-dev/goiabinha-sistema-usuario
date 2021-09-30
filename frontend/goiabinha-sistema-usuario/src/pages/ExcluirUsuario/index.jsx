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

const ExcluirUsuario = () => {
  const [idUsuario, setIdUsuario] = useState(useParams().id);
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [sexo, setSexo] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalConfirmacaoVisible, setIsModalConfirmacaoVisible] =
    useState(false);
  const [isFunctionAuthorized, setIsFunctionAuthorized] = useState(false);

  const [mensagem, setMensagem] = useState("");
  const [pergunta, setPergunta] = useState("");
  let history = useHistory();

  useEffect(() => {
    listarUsuario();
  }, []);

  //Caso o id seja indefinido, levara o usuário a página de erro
  if (idUsuario == undefined) {
    history.push("/nao-encontrada");
  }
  function listarUsuario() {
    let id = idUsuario;
    fetch(`${url}/usuarios/${id}`)
      .then((response) => response.json())
      .then((dados) => {
        console.log(dados);
        setIdUsuario(dados.id);
        setNome(dados.nome);
        var dataSplit = dados.dataNascimento.split('T')
        let data = dataSplit[0]
        setDataNascimento(data);        setSexo(dados.sexo);
      })
      .catch((error) => console.error(error));
  }
  //* Método que exclui um usuario e suas informações de acordo com seu Id
  const excluirUsuario = (event, id) => {
    event.preventDefault();
    // Busca a exclusão do usuário de acordo com o valor definido no input
    if (id !== "") {
      setIsModalConfirmacaoVisible(true);
      setPergunta("Deseja mesmo excluir este usuário ?");

      if (window.confirm("Deseja mesmo excluir este usuário ?")) {
        fetch(`${url}/usuarios/${id}`, {
          method: "DELETE",
          //TODO:
          // Adicionar authorization com bearer token
        })
          .then((response) => response.json())
          .then((dados) => {
            //Mensagem do modal
            setMensagem("");
            setMensagem("Usuário excluso com sucesso.");
            //Estado do modal
            setIsModalVisible(true);
            setTimeout(() => {
              history.push("/gerenciamento");
            }, 2050);
          })
          .catch((err) => console.error(err));
      }
    } else {
      setMensagem("");
      setMensagem("Usuário não encontrado, tente novamente.");
      setIsModalVisible(true);
    }
  };
  console.log(idUsuario);
  return (
    <div>
      <Header />
      <div className="total coluna">
        <div className="subHeader width85">
          <h1>Excluir Usuário</h1>
          <hr style={{ marginBottom: "20px" }} />
        </div>
        <div className="total coluna backgroundConteudo">
          <div className="centralizar">
            <div className="containerConteudo arredondamento coluna">
              <div className="headerContainer arredondamento">
                <h3>Informações do Usuário</h3>
              </div>
              <div>
                <div className="infoUsuario centralizar ">
                  <div className="boxInfoLabel coluna arredondamento">
                    <label className="arredondamento">Id do Usuário</label>
                    <p>{idUsuario}</p>
                  </div>
                  <div className="boxInfoLabel coluna arredondamento">
                    <label className="arredondamento">Nome do Usuário</label>
                    <p>{nome}</p>
                  </div>
                  <div className="boxInfoLabel coluna arredondamento">
                    <label className="arredondamento">Data de Nascimento</label>
                    <p>{dataNascimento}</p>
                  </div>
                  <div className="boxInfoLabel coluna arredondamento">
                    <label className="arredondamento">Sexo do Usuário</label>
                    <p>{sexo}</p>
                  </div>
                </div>
                <div className="centralizar">
                  <button
                    className="buttonP boxInfoLabel arredondamento caixadedica"
                    style={{ backgroundColor: "#ff3333" }}
                    value={idUsuario}
                    onClick={(event) => {
                      excluirUsuario(event, idUsuario);
                    }}
                  >
                    Excluir
                  </button>
                </div>
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
          onOk={(event) => {
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

export default ExcluirUsuario;
