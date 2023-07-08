import { forwardRef } from 'react';
import classes from './SearchFrom.module.css';

const SearchFrom = forwardRef(({ search }, ref) => {
  return (
    <form className="form-control" onSubmit={search}>
      <input
        className={classes['input-search']}
        name="search"
        id="search"
        type="text"
        ref={ref}
        placeholder="Tìm kiếm..."
      />
    </form>
  );
});

export default SearchFrom;
