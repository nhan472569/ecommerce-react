import Input from '../UI/Input';
import Button from '../UI/Button';
import Modal from '../UI/Modal';
import classes from './Login.module.css';

const Login = props => {
  return (
    <Modal onClose={props.onClose}>
      <h2 className={classes.title}>Đăng nhập</h2>
      <form className={classes.form}>
        <div className={classes.control}>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Địa chỉ email"
          />
        </div>
        <div className={classes.control}>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="Mật khẩu"
          />
        </div>
        <div className={classes.actions}>
          <Button className={classes.login}>Đăng nhập</Button>
        </div>
      </form>
    </Modal>
  );
};

export default Login;
