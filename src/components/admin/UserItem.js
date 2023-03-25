import environment from '../../environment';
import SkeletonLoading from '../UI/loading/SkeletonLoading';
import classes from './UserItem.module.css';

const roleMap = {
  user: 'Người dùng',
  admin: 'Quản trị viên',
};

const UserItem = ({ user }) => {
  return (
    <div className={classes.item}>
      <div className={classes.avatar}>
        <img
          src={environment.DOMAIN + '/img/users/' + user.photo}
          alt="avatar"
        />
      </div>
      <div className={classes.ContentBox}>
        <div className={classes.username}>
          {user.name} ({user.email})
        </div>
        <div className={classes.role}>Loại tài khoản: {roleMap[user.role]}</div>
      </div>
    </div>
  );
};

const Loading = () => {
  return (
    <div className={classes.item}>
      <div className={classes.avatar}>
        <SkeletonLoading className="w-full h-full radius" />
      </div>
      <div className={classes.ContentBox}>
        <SkeletonLoading className="w-full h-17 mb-10 radius" />
        <SkeletonLoading className="w-full h-17 mb-10 radius" />
      </div>
    </div>
  );
};
UserItem.Loading = Loading;

export default UserItem;
