import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import environment from '../../environment';
import useHttp from '../../hooks/use-http';
import { authAction } from '../../store/auth-context';

import classes from './ProfileButton.module.css';

const ProfileButton = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  const { sendRequest: logout } = useHttp(
    useCallback(() => {
      dispatch(authAction.logout());
    }, [dispatch])
  );
  const logoutHandler = () => {
    logout({ url: 'users/logout', method: 'post' });
  };
  return (
    <div className={classes.thumb}>
      <div className={classes.avatar}>
        <img
          src={`${environment.DOMAIN}/img/users/${user.photo}`}
          alt={user.name}
        />
      </div>
      <ul className={classes.feature}>
        <li>
          <p className={classes.name}>{user.name}</p>
        </li>
        <hr className="seperator"></hr>
        <li>
          <Link to="/profile">Tài khoản của tôi</Link>
        </li>
        <li>
          <Link to="/wishlist">Danh sách yêu thích</Link>
        </li>
        <hr className="seperator"></hr>
        <li>
          <button onClick={logoutHandler} className={classes.logout}>
            Đăng xuất
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ProfileButton;
