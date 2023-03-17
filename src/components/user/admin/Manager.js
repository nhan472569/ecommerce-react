import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import environment from '../../../environment';
import classes from './Manager.module.css';

const Manager = ({ children, title, type }) => {
  const searchInputRef = useRef();
  return (
    <>
      <div className="form-control">
        <input
          className={classes['input-search']}
          type="text"
          ref={searchInputRef}
          placeholder="Tìm kiếm..."
        />
      </div>
    </>
  );
};

export default Manager;
