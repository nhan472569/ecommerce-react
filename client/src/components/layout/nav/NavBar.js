import { Link } from 'react-router-dom';

import CartButton from '../nav/CartButton';
import SearchButton from './SearchButton';
import Auth from './Auth';
import classes from './NavBar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useSelector } from 'react-redux';

const NavBar = () => {
  const { role } = useSelector(state => state.auth.user);

  return (
    <header className={classes.header} id="navbar">
      <div className={classes.logo}>
        <Link to="/home">BookShop</Link>
      </div>

      {role !== 'admin' && (
        <nav className={classes.nav}>
          <ul className={classes['nav__items']}>
            <li className={classes['nav__item']}>
              <Link to="/home">
                Trang chủ{' '}
                <FontAwesomeIcon icon={solid('angle-down')}></FontAwesomeIcon>
              </Link>
              <ul className={classes['subnav__items']}>
                <li className={classes['subnav__item']}>
                  <Link to="/home">Trang chính</Link>
                </li>
                <li className={classes['subnav__item']}>
                  <Link to="/home">Tác giả bán chạy</Link>
                </li>
                <li className={classes['subnav__item']}>
                  <Link to="/home">Sách nói</Link>
                </li>
                <li className={classes['subnav__item']}>
                  <Link to="/home">Sách trẻ em</Link>
                </li>
              </ul>
            </li>
            <li className={classes['nav__item']}>
              <Link to="/home">
                Sự kiện{' '}
                <FontAwesomeIcon icon={solid('angle-down')}></FontAwesomeIcon>
              </Link>
              <ul className={classes['subnav__items']}>
                <li className={classes['subnav__item']}>
                  <Link to="/home">Các ngày sự kiện</Link>
                </li>
                <li className={classes['subnav__item']}>
                  <Link to="/home">Sự kiện sắp diễn ra</Link>
                </li>
              </ul>
            </li>
            <li className={classes['nav__item']}>
              <Link to="/home">Blogs</Link>
            </li>
            <li className={classes['nav__item']}>
              <Link to="/home">
                Cửa hàng{' '}
                <FontAwesomeIcon icon={solid('angle-down')}></FontAwesomeIcon>
              </Link>
              <ul className={classes['subnav__items']}>
                <li className={classes['subnav__item']}>
                  <Link to="/home">Danh sách sản phẩm</Link>
                </li>
                <li className={classes['subnav__item']}>
                  <Link to="/home">Danh mục</Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      )}

      {role !== 'admin' && <CartButton />}
      <Auth />
      {role !== 'admin' && <SearchButton />}
    </header>
  );
};

export default NavBar;
