import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import classes from './Paginator.module.css';

const Paginator = ({ totalItems, itemPerPage, currentPage, paginate }) => {
  const last = Math.ceil(totalItems / itemPerPage);
  const delta = 2;
  const left = currentPage - delta;
  const right = currentPage + delta + 1;
  const range = [];
  const rangeWithDots = [];
  let l;

  for (let i = 1; i <= last; i++) {
    if (i === 1 || i === last || (i >= left && i < right)) {
      range.push(i);
    }
  }

  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push('...');
      }
    }
    rangeWithDots.push(i);
    l = i;
  }
  return (
    <>
      {!!totalItems ? (
        <section className={classes.paging}>
          <button
            className={classes.operator}
            disabled={currentPage === 1}
            onClick={() => paginate(1)}
          >
            <FontAwesomeIcon icon={solid('angles-left')} />
          </button>
          <button
            className={classes.operator}
            disabled={currentPage === 1}
            onClick={() => paginate(currentPage - 1)}
            style={{ marginRight: '2rem' }}
          >
            <FontAwesomeIcon icon={solid('chevron-left')} />
          </button>
          {rangeWithDots.map((item, i, arr) =>
            typeof item === 'number' ? (
              <button
                key={item}
                className={`${classes['btn-paging']}
                ${item === currentPage ? classes.active : ''}`}
                onClick={() => paginate(item)}
                disabled={item === currentPage}
                style={{
                  marginRight: i === arr.length - 1 ? '2rem' : '',
                }}
              >
                {item}
              </button>
            ) : (
              <span key={item + i} className={classes.ellipsis}>
                {item}
              </span>
            )
          )}
          <button
            className={classes.operator}
            disabled={currentPage === last}
            onClick={() => paginate(currentPage + 1)}
          >
            <FontAwesomeIcon icon={solid('chevron-right')} />
          </button>
          <button
            className={classes.operator}
            disabled={currentPage === last}
            onClick={() => paginate(last)}
          >
            <FontAwesomeIcon icon={solid('angles-right')} />
          </button>
        </section>
      ) : null}
    </>
  );
};

export default Paginator;
