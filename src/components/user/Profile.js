import { useEffect, useState } from 'react';
import environment from '../../environment';
import classes from './Profile.module.css';
import UpdateDetailProfile from './UpdateDetailProfile';
import ChangePasswordProfile from './ChangePasswordProfile';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('details');

  useEffect(() => {
    document.title = `Thông tin cá nhân | ${environment.HEAD_TITLE}`;
  });

  const renderTemplate = () => {
    switch (activeTab) {
      case 'details':
      default:
        return <UpdateDetailProfile />;
      case 'password':
        return <ChangePasswordProfile />;
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
        {/* <div
          className={`${classes['menu-item']} ${
            activeTab === 'orders' ? classes.active : ''
          }`}
          onClick={() => setActiveTab('orders')}
        >
          Đơn hàng đã mua
        </div> */}
      </div>
      <div className={classes['main-section']}>{renderTemplate()}</div>
    </div>
  );
};

export default Profile;
