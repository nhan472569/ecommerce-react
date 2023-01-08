import classes from './ScrollToTop.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

const ScrollToTop = props => {
  const isActive = props.active;

  const onClickHandler = () => {
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className={`${classes.btn} ${isActive && classes.active}`}
      id="scroll-to-top"
      title="Cuộn lên đầu trang"
      onClick={onClickHandler}
    >
      <FontAwesomeIcon icon={solid('angle-up')} />
    </div>
  );
};

export default ScrollToTop;
