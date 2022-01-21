import { Link } from 'react-router-dom';

import CartButton from '../cart/CartButton';
import classes from './NavBar.module.css';
import SearchButton from './SearchButton';

const NavBar = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link to="/">BookShop</Link>
      </div>
      <nav className={classes.nav}>
        <ul className={classes['nav__items']}>
          <li className={classes['nav__item']}>
            <Link to="/">
              Trang chủ <i className="fas fa-angle-down"></i>
            </Link>
            <ul className={classes['subnav__items']}>
              <li className={classes['subnav__item']}>
                <a href="/#">Trang chính</a>
              </li>
              <li className={classes['subnav__item']}>
                <a href="/#">Tác giả bán chạy</a>
              </li>
              <li className={classes['subnav__item']}>
                <a href="/#">Sách nói</a>
              </li>
              <li className={classes['subnav__item']}>
                <a href="/#">Sách trẻ em</a>
              </li>
            </ul>
          </li>
          <li className={classes['nav__item']}>
            <a href="/">
              Sự kiện <i className="fas fa-angle-down"></i>
            </a>
            <ul className={classes['subnav__items']}>
              <li className={classes['subnav__item']}>
                <a href="/#">Các ngày sự kiện</a>
              </li>
              <li className={classes['subnav__item']}>
                <a href="/#">Sự kiện sắp diễn ra</a>
              </li>
            </ul>
          </li>
          <li className={classes['nav__item']}>
            <a href="/">Blogs</a>
          </li>
          <li className={classes['nav__item']}>
            <a href="/">
              Cửa hàng <i className="fas fa-angle-down"></i>
            </a>
            <ul className={classes['subnav__items']}>
              <li className={classes['subnav__item']}>
                <a href="/#">Danh sách sản phẩm</a>
              </li>
              <li className={classes['subnav__item']}>
                <a href="/#">Danh mục</a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <SearchButton />
      <CartButton />
    </header>
  );
};

export default NavBar;
