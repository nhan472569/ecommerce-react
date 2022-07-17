import { Link } from 'react-router-dom';
import classes from './Summary.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { brands, solid } from '@fortawesome/fontawesome-svg-core/import.macro';

const Summary = () => {
  return (
    <div className={classes.container}>
      <div className="row">
        <div className={classes['col-3']}>
          <div className={classes['title-holder']}>
            <h5 className={classes.title}>Nhà xuất bản</h5>
          </div>
          <div className={classes['menu-container']}>
            <ul className={classes.menu}>
              <li className={classes['menu-item']}>
                <Link to={'/products'}>Bán chạy</Link>
              </li>
              <li className={classes['menu-item']}>
                <Link to={'/products'}>Phỏng vấn</Link>
              </li>
              <li className={classes['menu-item']}>
                <Link to={'/products'}>Câu chuyện của tác giả</Link>
              </li>
              <li className={classes['menu-item']}>
                <Link to={'/products'}>Hội sách</Link>
              </li>
              <li className={classes['menu-item']}>
                <Link to={'/products'}>Câu hỏi thường gặp</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={classes['col-3']}>
          <div className={classes['title-holder']}>
            <h5 className={classes.title}>Liên hệ</h5>
          </div>
          <div className={classes['content-container']}>
            <div className={classes.content}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              pulvinar eu justo quis bibendum. Proin in cursus leo. Quisque
              sagittis tempus hendrerit.
            </div>
            <div className={classes.socials}>
              <span>
                <a href>
                  <FontAwesomeIcon icon={brands('twitter')} />
                </a>
              </span>
              <span>
                <a
                  href="https://www.instagram.com/thanh.nhan.472569/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FontAwesomeIcon icon={brands('instagram')} />
                </a>
              </span>
              <span>
                <a
                  href="https://www.facebook.com/thanh.nhan.472569"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FontAwesomeIcon icon={brands('facebook-f')} />
                </a>
              </span>
              <span>
                <a href>
                  <FontAwesomeIcon icon={brands('dribbble')} />
                </a>
              </span>
            </div>
          </div>
        </div>
        <div className={classes['col-3']}>
          <div className={classes['title-holder']}>
            <h5 className={classes.title}>Tin tức & cập nhật</h5>
          </div>
          <div className={classes['content-container']}>
            <div className={classes.content}>
              We'd love it if you subscribed to our newsletter! You'll love it
              too.
            </div>
            <form className={classes['subcription-form']}>
              <input
                name="email"
                type="email"
                className={classes.email}
                placeholder="Email..."
                required
              />
              <button>
                <FontAwesomeIcon icon={solid('paper-plane')} />
              </button>
            </form>
          </div>
        </div>
        <div className={classes['col-3']}>
          <div className={classes['title-holder']}>
            <h5 className={classes.title}>Mạng xã hội</h5>
          </div>
          <div className={classes['content-container']}></div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
