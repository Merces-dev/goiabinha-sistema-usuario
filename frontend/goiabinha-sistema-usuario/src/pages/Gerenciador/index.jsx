import React, { useEffect, useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";

//* Importando Componentes
import Header from "./../../components/header";
import Footer from "./../../components/footer";
import Modal from "./../../components/modal";
import ModalConfirmacao from "../../components/modalconfirmacao";

//* Importando a Url que será utilizada para realizar o fetch (Ligação com a API)
import { url } from "../../utils/constants";

//* Importando CSS
import "./index.css";

const Gerenciador = (async) => {
  // Declarando Variáveis
  const [idUsuario, setIdUsuario] = useState("");
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [sexo, setSexo] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalConfirmacaoVisible, setIsModalConfirmacaoVisible] =
    useState(false);
  const [isFunctionAuthorized, setIsFunctionAuthorized] = useState(false);

  const [mensagem, setMensagem] = useState("");
  const [pergunta, setPergunta] = useState("");
  let history = useHistory();

  useEffect(() => {
    listarUsuarios();
  }, []);

  //* Método que adiciona um novo usuário
  const adicionarUsuario = (event) => {
    event.preventDefault();

    // Especifica o objeto usuario
    let usuario = {
      nome: nome,
      dataNascimento: dataNascimento,
      sexo: sexo,
    };

    // Caso o idUsuario seja igual a vazio, o método utilizado será um POST, caso contrário será um PUT
    let method = idUsuario === "" ? "POST" : "PUT";
    let urlRequest =
      idUsuario === "" ? url + "/Usuarios" : url + "/Usuarios/" + idUsuario;

    // Realiza o Fetch, com o method definido acima, header do tipo JSON e body definido no objeto usuario porém
    // depois de passar pelo método JSON.stringify() - [Deixa o objeto em forma de código JSON]
    stateContainer();
    if (
      usuario.nome === "" ||
      usuario.dataNascimento === "" ||
      usuario.sexo === ""
    ) {
      setMensagem("Todos os campos devem ter valores");
      setIsModalVisible(true);
    } else {
      if (method === "PUT") {
        setIsModalConfirmacaoVisible(true);
        setPergunta("Deseja mesmo atualizar os dados deste usuário ?");

        if (window.confirm("Deseja mesmo atualizar os dados deste usuário ?")) {


          console.log("liberado");
          fetch(urlRequest, {
            method: method,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(usuario),
          })
            .then((response) => response.json())
            .then((response) => {
              setMensagem("Usuário atualizado com sucesso");
              setIsModalVisible(true);
              setPergunta("");
              listarUsuarios();
              zerarVariavies();
            })
            .catch((err) => {
              console.error(err);
            });
        } else {
          console.log("Não liberado");
        }
      } else if (method === "POST") {
        stateContainer();
        if (window.confirm("Deseja mesmo adicionar este usuário ?")) {

        fetch(urlRequest, {
          method: method,
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
            listarUsuarios();
            stateContainer();
          })
          .catch((err) => {
            console.error(err);
          });
        }}
    }
  };

  //* Método que atualiza as informações de um usuario de acordo com seu Id
  const atualizarUsuario = (event, id) => {
    event.preventDefault();

    if (id !== "") {
      const idUsuario = id;

      // Lista o usuário de acordo com seu id e dá valor as variáveis do objeto usuario
      listarUsuario(idUsuario);
      stateContainer();
    } else {
      setMensagem("");
      setMensagem("Usuário não encontrado, tente novamente.");
      setIsModalVisible(true);
    }
  };

  //* Método que exclui um usuario e suas informações de acordo com seu Id
  const excluirUsuario = (event, id) => {
    // Busca a exclusão do usuário de acordo com o valor definido no input
    if (id !== "") {
      if (window.confirm("Deseja mesmo excluir este usuário ?")) {
        fetch(`${url}/Usuarios/${id}`, {
          method: "DELETE",
          //TODO:
          // Adicionar authorization com bearer token
        })
          .then((response) => response.json())
          .then((dados) => {
            listarUsuarios();

            //Mensagem do modal
            setMensagem("");
            setMensagem("Usuário excluso com sucesso.");
            //Estado do modal
            setIsModalVisible(true);
          })
          .catch((err) => console.error(err));
      }
    } else {
      setMensagem("");
      setMensagem("Usuário não encontrado, tente novamente.");
      setIsModalVisible(true);
    }
  };

  //* Método que lista um usuario e suas informações de acordo com seu Id
  const listarUsuario = (id) => {
    fetch(`${url}/Usuarios/${id}`)
      .then((response) => response.json())
      .then((dados) => {
        setIdUsuario(dados.id);
        setNome(dados.nome);
        setDataNascimento(dados.dataNascimento);
        setSexo(dados.sexo);
      })
      .catch((err) => console.error(err));
  };

  //* Método que lista todos os usuários e suas informações
  const listarUsuarios = () => {
    fetch(`${url}/Usuarios`)
      .then((response) => response.json())
      .then((dados) => {
        setUsuarios(dados);
      })
      .catch((err) => console.error(err));
  };

  //* Método utilizado para abrir o container de Adicionar Usuário ou Atualizar
  const stateContainer = () => {
    let cont = document.getElementById("idContainerInfo");
    if (cont.style.display === "flex") {
      cont.style.display = "none";
      zerarVariavies();
    } else {
      cont.style.display = "flex";
    }
  };

  const zerarVariavies = () => {
    setIdUsuario("");
    setNome("");
    setSexo("");
    setDataNascimento("");
  };

  return (
    <div>
      <Header />
      <div className="total">
        <div className="width85">
          <div className="subHeader">
            <h1>Gerenciamento de Usuários</h1>
          </div>
          <hr />
          <div className="crudBox">
            <div className="caixadedica ">
              <input
                className=" arredondamento caixadedica buttonCrud"
                type="button"
                onClick={(event) => {
                  if (event.ctrlKey) {
                    history.push(`/adicionar-usuario/`);
                  } else {
                    adicionarUsuario(event);
                  }
                }}
                value="Adicionar Usuário"
              ></input>
              <span class="caixadedicatexto arredondamento">
                Tecla CTRL + Botão Esquerdo para abrir a página de adição de
                usuários
              </span>
            </div>

            <div>
              <table className="tabelaGerenciamento">
                <thead>
                  <tr>
                    <td>#</td>
                    <td>Nome</td>
                    <td>Data de Nascimento</td>
                    <td>Sexo</td>
                    <td>Ações</td>
                  </tr>
                </thead>

                <tbody>
                  {
                    //*  Função que faz a listagem de todos os usuários em forma de lista
                    usuarios.map((item, index) => {
                      return (
                        <tr className="linhaTabela" key={index}>
                          <th className="elementoTabela">
                            <p className="mobileTipo">Id: </p>
                            {item.id}
                          </th>
                          <th className="elementoTabela">
                            <p className="mobileTipo">Nome: </p>
                            {item.nome}
                          </th>
                          <th className="elementoTabela">
                            <p className="mobileTipo">Data de Nascimento: </p>
                            {item.dataNascimento}
                          </th>

                          <th className="elementoTabela">
                            <p className="mobileTipo">Sexo: </p>
                            {item.sexo}
                          </th>
                          <th className="colunaBotoes">
                            <div className="caixadedica ">
                              <input
                                className=" arredondamento caixadedica botaoUsuarios"
                                style={{ background: "#535556" }}
                                type="button"
                                onClick={(event) => {
                                  if (event.ctrlKey) {
                                    history.push(`/editar-usuario/${item.id}`);
                                  } else {
                                    atualizarUsuario(event, item.id);
                                  }
                                }}
                                value="Editar"
                              ></input>
                              <span class="caixadedicatexto arredondamento">
                                Tecla CTRL + Botão Esquerdo para abrir a página
                                de edição
                              </span>
                            </div>
                            <div className="caixadedica ">
                              <input
                                className=" arredondamento caixadedica botaoUsuarios"
                                style={{ background: "red" }}
                                type="button"
                                onClick={(event) => {
                                  if (event.ctrlKey) {
                                    history.push(`/excluir-usuario/${item.id}`);
                                  } else {
                                    excluirUsuario(event, item.id);
                                  }
                                }}
                                value="Excluir"
                              ></input>
                              <span class="caixadedicatexto arredondamento">
                                Tecla CTRL + Botão Esquerdo para abrir a página
                                de exclusão
                              </span>
                            </div>
                          </th>
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
          <div id="idContainerInfo" className="arredondamento ">
            <div className="stateContainer ">
              <div className="self">
                <h3>Gerenciar Usuario</h3>
              </div>

              <button className="arredondamento" onClick={stateContainer}>
                X
              </button>
            </div>
            <form className="containerInputs " onSubmit={adicionarUsuario}>
              <input
                maxLength="50"
                className="arredondamento"
                value={nome}
                onChange={(event) => setNome(event.target.value)}
                type="text"
                placeholder="Nome"
                required
              />

              <input
                className="arredondamento"
                value={dataNascimento}
                onChange={(event) => setDataNascimento(event.target.value)}
                type="date"
                required
              />
              <select
                className="arredondamento"
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
              </select>
              <input
                className="buttonCrud arredondamento "
                style={{ color: "white", backgroundColor: "var(--laranja)" }}
                type="submit"
                value="Salvar"
              ></input>
            </form>
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
      </div>
      <Footer />
    </div>
  );
};

export default Gerenciador;
