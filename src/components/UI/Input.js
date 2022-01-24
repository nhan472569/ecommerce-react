import React from 'react';
import classes from './Input.module.css';

const Input = React.forwardRef((props, ref) => {
  return <input {...props} className={classes.input} ref={ref} />;
});

export default Input;
