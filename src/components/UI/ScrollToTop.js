import classes from './ScrollToTop.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

const ScrollToTop = props => {
  const isActive = props.active;

  return (
    <div
      className={`${classes.btn} ${isActive && classes.active}`}
      id="scroll-to-top"
    >
      <FontAwesomeIcon icon={solid('user-secret')} />
    </div>
  );
};

export default ScrollToTop;
