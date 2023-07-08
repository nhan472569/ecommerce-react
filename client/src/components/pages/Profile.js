import { useEffect, useState } from 'react';
import environment from '../../environment';
import classes from './Profile.module.css';
import UpdateDetailProfile from '../user/UpdateDetailProfile';
import ChangePasswordProfile from '../user/ChangePasswordProfile';
import BookManage from '../admin/BookManage';
import UserManage from '../admin/UserManage';

const Profile = ({ manager = false }) => {
  const [activeTab, setActiveTab] = useState('details');

  useEffect(() => {
    document.title = `${manager ? 'Quản trị' : 'Thông tin cá nhân'} | ${
      environment.HEAD_TITLE
    }`;
    manager && setActiveTab('book-manage');
    return () => {
      setActiveTab('details');
    };
  }, [manager]);

  const renderTemplate = () => {
    switch (activeTab) {
      case 'details':
      default:
        return <UpdateDetailProfile />;
      case 'password':
        return <ChangePasswordProfile />;
      case 'book-manage':
        return <BookManage />;
      case 'user-manage':
        return <UserManage />;
      case 'stats-manage':
        return null;
    }
  };
  return (
    <div className={classes.profile + ' container'}>
      <div className={classes['right-menu']}>
        {!manager ? (
          <>
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
          </>
        ) : (
          <>
            <div
              className={`${classes['menu-item']} ${
                activeTab === 'book-manage' ? classes.active : ''
              }`}
              onClick={() => setActiveTab('book-manage')}
            >
              Quản lý sách
            </div>
            <div
              className={`${classes['menu-item']} ${
                activeTab === 'user-manage' ? classes.active : ''
              }`}
              onClick={() => setActiveTab('user-manage')}
            >
              Quản lý tài khoản
            </div>
            <div
              className={`${classes['menu-item']} ${
                activeTab === 'stats-manage' ? classes.active : ''
              }`}
              onClick={() => setActiveTab('stats-manage')}
            >
              Thống kê
            </div>
          </>
        )}
      </div>
      <div className={classes['main-section']}>{renderTemplate()}</div>
    </div>
  );
};

export default Profile;
