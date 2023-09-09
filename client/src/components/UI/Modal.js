import { Fragment } from 'react';
import reactDom from 'react-dom';
import classes from './Modal.module.css';

const Backdrop = ({ onClose }) => {
  return <div className={classes.backdrop} onClick={onClose}></div>;
};

const ModalOverlay = ({ children, onClose }) => {
  return (
    <div className={classes.modal}>
      <div className={classes.close} onClick={onClose}>
        +
      </div>
      {children}
    </div>
  );
};

const overlayEl = document.getElementById('overlays');

const Modal = ({ children, onClose }) => {
  return (
    <Fragment>
      {reactDom.createPortal(<Backdrop onClose={onClose} />, overlayEl)}
      {reactDom.createPortal(
        <ModalOverlay onClose={onClose}>{children}</ModalOverlay>,
        overlayEl
      )}
    </Fragment>
  );
};

export default Modal;
