import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import environment from '../../../environment';
import useHttp from '../../../hooks/use-http';
import { authAction } from '../../../store/auth-context';

import classes from './ProfileButton.module.css';

const ProfileButton = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const navigate = useNavigate();

  const { sendRequest: logout } = useHttp(
    useCallback(() => {
      dispatch(authAction.logout());
    }, [dispatch])
  );
  const logoutHandler = () => {
    logout({ url: 'users/logout', method: 'get' });
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
        <div
          className={classes['info-section']}
          onClick={() => navigate('user/profile')}
        >
          <img
            src={environment.DOMAIN + '/img/users/' + user.photo}
            alt={user.name}
            className={classes.photo}
          ></img>
          <div className={classes.info}>
            <p className={classes.name}>{user.name}</p>
            <p className={classes.email}>{user.email}</p>
          </div>
        </div>
        <hr className="seperator"></hr>
        <li className={classes.function}>
          {user.role === 'admin' ? (
            <Link to="/admin/manage" className={classes['function-link']}>
              <span className={classes.icon}>
                <FontAwesomeIcon icon={solid('chart-line')}></FontAwesomeIcon>
              </span>
              Quản lý
            </Link>
          ) : (
            <Link to="/user/wishlist" className={classes['function-link']}>
              <span className={classes.icon}>
                <FontAwesomeIcon icon={solid('heart')}></FontAwesomeIcon>
              </span>
              Danh sách yêu thích
            </Link>
          )}
        </li>
        <hr className="seperator"></hr>
        <li className={classes.function} onClick={logoutHandler}>
          <Link to="#" className={classes['function-link']}>
            <span className={classes.icon}>
              <FontAwesomeIcon
                icon={solid('right-from-bracket')}
              ></FontAwesomeIcon>
            </span>
            Đăng xuất
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ProfileButton;
