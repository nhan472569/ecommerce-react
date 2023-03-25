import React from 'react';
import classes from './Button.module.css';

const Button = React.memo(({ children, mode, type, disabled, onClick }) => {
  return (
    <button
      className={classes.btn + ' ' + classes['btn-' + mode]}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
});

export default Button;
