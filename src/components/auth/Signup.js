import Modal from '../UI/Modal';
import Button from '../UI/Button';
import Input from '../UI/Input';

import classes from './Signup.module.css';

const Signup = props => {
  return (
    <Modal onClose={props.onClose}>
      <h2 className={classes.title}>Đăng ký</h2>
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
        <div className={classes.control}>
          <Input
            type="password"
            name="password2"
            id="password2"
            placeholder="Nhập lại mật khẩu"
          />
        </div>
        <div className={classes.actions}>
          <Button className={classes.login}>Đăng ký</Button>
        </div>
      </form>
    </Modal>
  );
};

export default Signup;
