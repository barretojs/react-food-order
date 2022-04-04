import { ReactChild, useContext } from "react";
import ReactDOM from "react-dom";
import CartContext from "../../store/cart-context";
import classes from "./Modal.module.css";

type Props = {
  children?: ReactChild | ReactChild[];
  onClick?: () => void;
};

const Backdrop: React.VFC<Props> = (props) => {
  return <div className={classes.backdrop} onClick={props.onClick} />;
};

const ModalOverlay: React.VFC<Props> = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const Modal: React.VFC<Props> = (props) => {
  const overlayElement: HTMLElement | null =
    document.getElementById("overlays");

  const cartContext = useContext(CartContext);

  return (
    <>
      {overlayElement &&
        ReactDOM.createPortal(
          <Backdrop onClick={cartContext.hideCartHandler} />,
          overlayElement
        )}
      {overlayElement &&
        ReactDOM.createPortal(
          <ModalOverlay>{props.children}</ModalOverlay>,
          overlayElement
        )}
    </>
  );
};

export default Modal;
