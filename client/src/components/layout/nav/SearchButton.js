import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import classes from './SearchButton.module.css';

const SearchButton = ({ onSearch }) => {
  const searchInputRef = useRef();
  const navigate = useNavigate();

  const onSearchHandler = event => {
    event.preventDefault();
    onSearch();
    const enteredValue = searchInputRef.current.value;

    navigate('/search/?name=' + enteredValue);
    searchInputRef.current.value = '';
    searchInputRef.current.blur();
  };

  return (
    <form className={classes.search} onSubmit={onSearchHandler}>
      <input
        type="text"
        placeholder="Tìm kiếm"
        name="search"
        ref={searchInputRef}
      ></input>
      <div className={classes['search-icon']}>
        <FontAwesomeIcon icon={solid('magnifying-glass')} />
      </div>
    </form>
  );
};

export default SearchButton;
