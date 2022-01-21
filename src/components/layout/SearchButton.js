import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './SearchButton.module.css';

const SearchButton = () => {
  const searchInputRef = useRef();
  const navigate = useNavigate();

  const onSearchHandler = event => {
    event.preventDefault();

    const enteredValue = searchInputRef.current.value;

    navigate('/products/?search=' + enteredValue);
  };

  return (
    <form className={classes.search} onSubmit={onSearchHandler}>
      <input
        type="text"
        placeholder="search"
        name="search"
        ref={searchInputRef}
      ></input>
      <button className={classes['search-btn']}>
        <i className="fas fa-search"></i>
      </button>
    </form>
  );
};

export default SearchButton;
