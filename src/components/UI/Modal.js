import { Fragment } from 'react';
import reactDom from 'react-dom';
import classes from './Modal.module.css';

const Backdrop = props => {
  return <div className={classes.backdrop} onClick={props.onClose}></div>;
};

const ModalOverlay = props => {
  return <div className={classes.modal}>{props.children}</div>;
};

const overlayEl = document.getElementById('overlays');

const Modal = props => {
  return (
    <Fragment>
      {reactDom.createPortal(<Backdrop onClose={props.onClose} />, overlayEl)}
      {reactDom.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        overlayEl
      )}
    </Fragment>
  );
};

export default Modal;
