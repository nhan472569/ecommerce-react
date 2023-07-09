import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import classes from './Paginator.module.css';

const Paginator = ({ totalItems, itemPerPage, currentPage, paginate }) => {
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
            style={{ 'margin-right': '2rem' }}
          >
            <FontAwesomeIcon icon={solid('chevron-left')} />
          </button>
          {Array(Math.ceil(totalItems / itemPerPage))
            .fill(0)
            .map((_, i, arr) => (
              <button
                key={i}
                className={`${classes['btn-paging']}
                ${i + 1 === currentPage ? classes.active : ''}`}
                onClick={() => paginate(i + 1)}
                disabled={i + 1 === currentPage}
                style={{
                  'margin-right': i === arr.length - 1 ? '2rem' : '',
                }}
              >
                {i + 1}
              </button>
            ))}
          <button
            className={classes.operator}
            disabled={currentPage === Math.ceil(totalItems / itemPerPage)}
            onClick={() => paginate(currentPage + 1)}
          >
            <FontAwesomeIcon icon={solid('chevron-right')} />
          </button>
          <button
            className={classes.operator}
            disabled={currentPage === Math.ceil(totalItems / itemPerPage)}
            onClick={() => paginate(Math.ceil(totalItems / itemPerPage))}
          >
            <FontAwesomeIcon icon={solid('angles-right')} />
          </button>
        </section>
      ) : null}
    </>
  );
};

export default Paginator;
