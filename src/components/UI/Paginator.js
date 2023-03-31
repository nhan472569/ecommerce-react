import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import classes from './Paginator.module.css';

const Paginator = ({ totalItems, itemPerPage, currentPage, paginate }) => {
  return (
    <>
      {!!totalItems ? (
        <section className={classes.paging}>
          <span
            className={classes.operator + ' ' + classes['btn-paging']}
            onClick={() => paginate(1)}
          >
            <FontAwesomeIcon icon={solid('angles-left')} />
          </span>
          <span
            className={classes.operator + ' ' + classes['btn-paging']}
            onClick={() => paginate(currentPage - 1)}
          >
            <FontAwesomeIcon icon={solid('chevron-left')} />
          </span>
          {Array(Math.ceil(totalItems / itemPerPage))
            .fill(0)
            .map((_, i) => (
              <button
                key={i}
                className={classes['btn-paging']}
                onClick={() => paginate(i + 1)}
                disabled={i + 1 === currentPage}
              >
                {i + 1}
              </button>
            ))}
          <span
            className={classes.operator + ' ' + classes['btn-paging']}
            onClick={() => paginate(currentPage + 1)}
          >
            <FontAwesomeIcon icon={solid('chevron-right')} />
          </span>
          <span
            className={classes.operator + ' ' + classes['btn-paging']}
            onClick={() => paginate(Math.ceil(totalItems / itemPerPage))}
          >
            <FontAwesomeIcon icon={solid('angles-right')} />
          </span>
        </section>
      ) : null}
    </>
  );
};

export default Paginator;
