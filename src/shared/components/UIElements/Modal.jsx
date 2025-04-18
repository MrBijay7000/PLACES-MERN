import React, { forwardRef, useRef } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import Backdrop from "./Backdrop";
import "./Modal.css";

// const ModalOverlay = (props) => {
//   const content = (
//     <div className={`modal ${props.className || ""}`} style={props.style}>
//       <header className={`modal__header ${props.headerClass}`}>
//         <h2>{props.header}</h2>
//       </header>
//       <form
//         onSubmit={
//           props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
//         }
//       >
//         <div className={`modal_content ${props.contentClass}`}>
//           {props.children}
//         </div>
//         <footer className={`modal__footer ${props.footerClass}`}>
//           {props.footer}
//         </footer>
//       </form>
//     </div>
//   );
//   return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
// };

// const ModalOverlay = (props, ref) => {
//   //   return ReactDOM.createPortal(
//   //     <div className={`modal ${props.className || ""}`} style={props.style}>
//   //       <header className={`modal__header ${props.headerClass}`}>
//   //         <h2>{props.header}</h2>
//   //       </header>
//   //       <div className={`modal__content ${props.contentClass}`}>
//   //         {props.children}
//   //       </div>
//   //       <footer className={`modal__footer ${props.footerClass}`}>
//   //         {props.footer}
//   //       </footer>
//   //     </div>,
//   //     document.getElementById("modal-hook")
//   //   );

//   const content = (
//     <div
//       ref={ref}
//       className={`modal ${props.className || ""}`}
//       style={props.style}
//     >
//       <header className={`modal__header ${props.headerClass}`}>
//         <h2>{props.header}</h2>
//       </header>
//       <div className={`modal__content ${props.contentClass}`}>
//         {props.children}
//       </div>
//       <footer className={`modal__footer ${props.footerClass}`}>
//         {props.footer}
//       </footer>
//     </div>
//   );

//   return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
// };

const ModalOverlay = forwardRef((props, ref) => {
  const content = (
    <div
      ref={ref}
      className={`modal ${props.className || ""}`}
      style={props.style}
    >
      <header className={`modal__header ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>
      <div className={`modal__content ${props.contentClass}`}>
        {props.children}
      </div>
      <footer className={`modal__footer ${props.footerClass}`}>
        {props.footer}
      </footer>
    </div>
  );

  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
});

// export default function Modal(props) {
//   return (
//     <>
//       {props.show && <Backdrop onClick={props.onCancel} />}
//       {/* <CSSTransition
//         in={props.show}
//         mountOnEnter
//         unmountOnExit
//         timeout={200}
//         classNames="modal"
//       > */}
//       <CSSTransition
//         in={props.show}
//         mountOnEnter
//         unmountOnExit
//         timeout={200}
//         classNames={{
//           enter: "modal-enter",
//           enterActive: "modal-enter-active",
//           exit: "modal-exit",
//           exitActive: "modal-exit-active",
//         }}
//       >
//         <ModalOverlay {...props} />
//       </CSSTransition>
//     </>
//   );
// }

export default function Modal(props) {
  const nodeRef = useRef(null); // 🔹 useRef to target modal DOM node

  return (
    <>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames={{
          enter: "modal-enter",
          enterActive: "modal-enter-active",
          exit: "modal-exit",
          exitActive: "modal-exit-active",
        }}
        nodeRef={nodeRef} // 🔹 pass ref to CSSTransition
      >
        <ModalOverlay {...props} ref={nodeRef} />
      </CSSTransition>
    </>
  );
}
