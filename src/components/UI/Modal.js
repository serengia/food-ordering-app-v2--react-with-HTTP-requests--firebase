import React from "react";
import ReactDom from "react-dom";
import s from "./Modal.module.css";

function Modal(props) {
  const modalContent = (
    <>
      <div className={s.backdrop} onClick={props.closeCart}></div>
      <div className={s.modal}>
        <div className={s.content}>{props.children}</div>
      </div>
    </>
  );

  return (
    <>
      {ReactDom.createPortal(
        modalContent,
        document.getElementById("root-modal")
      )}
    </>
  );
}

export default Modal;
