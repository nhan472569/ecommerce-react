import classes from './RatingStars.module.css';

const RatingStars = props => {
  const { ratingAverage, ratingCount } = props;

  const renderStars = ratedStar => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.round(ratedStar)) {
        stars.push(
          <span key={i} className={'fa fa-star ' + classes.checked}></span>
        );
      } else {
        stars.push(<span key={i} className="fa fa-star"></span>);
      }
    }
    return stars;
  };

  return (
    <div className={classes.stars}>
      {renderStars(ratingAverage)}
      <span className={classes['rating-count']}>({ratingCount})</span>
    </div>
  );
};

export default RatingStars;
