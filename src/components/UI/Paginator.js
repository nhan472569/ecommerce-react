import classes from './Paginator.module.css';

const Paginator = ({ totalItems, currentPage, paginate }) => {
  return (
    <section className={classes.paging}>
      {Array(Math.ceil(totalItems / 8))
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
    </section>
  );
};

export default Paginator;
