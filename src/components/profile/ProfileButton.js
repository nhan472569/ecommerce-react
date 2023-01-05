import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import environment from '../../environment';
import { authAction } from '../../store/auth-context';

import classes from './ProfileButton.module.css';

const ProfileButton = props => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  console.log(user);

  const logoutHandler = () => {
    dispatch(authAction.logout());
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
          <p className={classes.greeting}>
            Xin chào,{' '}
            {user.firstName && user.lastName
              ? user.firstName + ' ' + user.lastName
              : user.email}
          </p>
        </li>
        <li>
          <Link to="/profile">Thông tin</Link>
        </li>
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
