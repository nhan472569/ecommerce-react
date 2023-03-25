import classes from './FormControl.module.css';
import { Field } from 'formik';

const FormControl = ({ type, name, errors, touched, children, as }) => {
  return (
    <>
      <div className={classes['form-control']}>
        <label htmlFor={name} className={classes.label}>
          {children}
        </label>
        <Field
          id={name}
          name={name}
          type={type}
          as={as}
          className={`${classes.input} ${
            errors[name] && touched[name] ? classes['input-error'] : ''
          }`}
        />
      </div>
      {errors[name] && touched[name] ? (
        <div className={classes.error}>{errors[name]}</div>
      ) : null}
    </>
  );
};

export default FormControl;
