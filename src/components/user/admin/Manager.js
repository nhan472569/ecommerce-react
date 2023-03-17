import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef } from 'react';
import classes from './Manager.module.css';

const Manager = ({ children, title, type }) => {
  const searchInputRef = useRef();
  return (
    <>
      <h2 className={classes.title}>Quản lý sách</h2>
      <div className="form-control">
        <input
          className={classes['input-search']}
          type="text"
          ref={searchInputRef}
          placeholder="Tìm kiếm..."
        />
        <button>
          <FontAwesomeIcon icon={solid('magnifying-glass')} />
        </button>
      </div>
    </>
  );
};

export default Manager;
