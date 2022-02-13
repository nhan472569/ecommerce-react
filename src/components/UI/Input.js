import React from 'react';
import classes from './Input.module.css';

const Input = React.forwardRef((props, ref) => {
  const className = `${classes.input} ${props.hasError ? classes.error : ''}`;
  return (
    <input
      className={className}
      type={props.type}
      id={props.id}
      name={props.name}
      onBlur={props.onBlur}
      onChange={props.onChange}
      placeholder={props.placeholder}
      ref={ref}
    />
  );
});

export default Input;
