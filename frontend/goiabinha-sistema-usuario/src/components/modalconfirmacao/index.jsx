import React from "react";
import "./index.css";

const ModalConfirmacao = ({
  onClose = () => {},
  onOk = () => {},
  children,
}) => {
  return (
    <div id="id" className="modal centralizar  ">
      <div className="subContainer arredondamento">
        <div className="tituloSubContainer arredondamento">
          <h2>Intelitrader pergunta...</h2>
          <button
            className="arredondamento buttonP"
            style={{ backgroundColor: "red" }}
            onClick={onClose}
          >
            X
          </button>
        </div>

        <p>{children}</p>
        <div className="divBotoes">
          <button className="arredondamento buttonOk" onClick={onOk}>
            Ok
          </button>
          <button
            className="arredondamento buttonP"
            style={{ backgroundColor: "red" }}
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmacao;
