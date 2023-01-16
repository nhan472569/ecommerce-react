import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import environment from '../../environment';
import classes from './Profile.module.css';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('details');
  const user = useSelector(state => state.auth.user);
  useEffect(() => {
    document.title = `Trang thông tin cá nhân | ${environment.HEAD_TITLE}`;
  });
  const renderTemplate = () => {
    switch (activeTab) {
      case 'details':
      default:
        return (
          <>
            <img
              className={classes.photo}
              src={`${environment.DOMAIN}/img/users/${user.photo}`}
              alt={user.name}
            ></img>
            <form className={classes['profile-form']}>
              <div className={classes['form-actions']}>
                <button type="button" className={classes.cancel}>
                  Huỷ
                </button>
                <button type="submit" className={classes.save}>
                  Lưu
                </button>
              </div>
              <div className={classes['form-control']}>
                <label htmlFor="name" className={classes.label}>
                  Tên
                </label>
                <input
                  className={classes.input}
                  id="name"
                  name="name"
                  value={user.name}
                ></input>
              </div>
              <div className={classes['form-control']}>
                <label htmlFor="email" className={classes.label}>
                  Email
                </label>
                <input
                  className={classes.input}
                  id="email"
                  name="email"
                  value={user.email}
                ></input>
              </div>
              <div className={classes['form-control']}>
                <label htmlFor="photo" className={classes.label}>
                  Ảnh đại diện
                </label>
                <input
                  className={classes.input}
                  id="photo"
                  name="photo"
                ></input>
              </div>
            </form>
          </>
        );
      case 'password':
        return (
          <form className={classes['profile-form']}>
            <div className={classes['form-control']}>
              <label htmlFor="password" className={classes.label}>
                Mật khẩu hiện tại
              </label>
              <input
                className={classes.input}
                id="password"
                name="password"
              ></input>
            </div>
            <div className={classes['form-control']}>
              <label htmlFor="newPassword" className={classes.label}>
                Đặt lại mật khẩu
              </label>
              <input
                className={classes.input}
                id="newPassword"
                name="newPassword"
              ></input>
            </div>
            <div className={classes['form-actions']}>
              <button type="button" className={classes.cancel}>
                Huỷ
              </button>
              <button type="submit" className={classes.save}>
                Lưu
              </button>
            </div>
          </form>
        );
      case 'orders':
        return;
    }
  };
  return (
    <div className={classes.profile + ' container'}>
      <div className={classes['right-menu']}>
        <div
          className={`${classes['menu-item']} ${
            activeTab === 'details' ? classes.active : ''
          }`}
          onClick={() => setActiveTab('details')}
        >
          Thông tin tài khoản
        </div>
        <div
          className={`${classes['menu-item']} ${
            activeTab === 'password' ? classes.active : ''
          }`}
          onClick={() => setActiveTab('password')}
        >
          Thay đổi mật khẩu
        </div>
        <div
          className={`${classes['menu-item']} ${
            activeTab === 'orders' ? classes.active : ''
          }`}
          onClick={() => setActiveTab('orders')}
        >
          Đơn hàng đã mua
        </div>
      </div>
      <div className={classes['main-section']}>{renderTemplate()}</div>
    </div>
  );
};

export default Profile;
