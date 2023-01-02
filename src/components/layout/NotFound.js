import { Link } from 'react-router-dom';
import classes from './NotFound.module.css';

const NotFound = () => {
  return (
    <div className="container position-relative d-flex flex-end">
      <div className={classes.description}>
        <h2>404</h2>
        <p className={classes.subtitle}>
          Oops!
          <br /> Không tìm thấy trang
        </p>
        <p className={classes.explain}>
          Trang bạn tìm kiếm không tồn tại hoặc đã bị gỡ!
        </p>
        <Link to="/home" className={classes.back}>
          Quay trở lại trang chủ
        </Link>
      </div>
      <div className={classes['notfound-img']}>
        <img
          src={process.env.PUBLIC_URL + '/images/404.jpg'}
          alt="Not Found"
        ></img>
      </div>
    </div>
  );
};

export default NotFound;
