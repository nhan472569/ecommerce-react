import Button from './Button';
import classes from './ConfirmationBox.module.css';

const ConfirmationBox = ({ children, header }) => {
  return (
    <div className={classes.box}>
      <div className={classes.header}>{header}</div>
      <div className={classes.message}>{children}</div>
      <div className={classes.actions}>
        <Button>Huỷ</Button>
        <Button>Đồng ý</Button>
      </div>
    </div>
  );
};

export default ConfirmationBox;
