import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './RatingStars.module.css';

const RatingStars = props => {
  const { ratingAverage, ratingCount } = props;

  const renderStars = ratedStar => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.round(ratedStar)) {
        stars.push(
          <FontAwesomeIcon
            key={i}
            icon={solid('star')}
            className={classes.checked}
          ></FontAwesomeIcon>
        );
      } else {
        stars.push(
          <FontAwesomeIcon key={i} icon={solid('star')}></FontAwesomeIcon>
        );
      }
    }
    return stars;
  };

  return (
    <div className={classes.stars}>
      {renderStars(ratingAverage)}
      <span className="ml-05">{ratingAverage}</span>
      <span className="ml-02">({ratingCount})</span>
    </div>
  );
};

export default RatingStars;
