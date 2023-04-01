import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LoadingSpinner from '../UI/LoadingSpinner';
import RatingStars from '../UI/RatingStars';
import CommentItem from './CommentItem';
import classes from './CommentsList.module.css';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useCallback, useEffect, useState } from 'react';
import useHttp from '../../hooks/use-http';
import { useDispatch } from 'react-redux';
import { notificationAction } from '../../store/notification-context';
import NotificationModel from '../../models/NotificationModel';

const CommentsList = ({
  isLoading,
  comments,
  bookId,
  deleteComment,
  ratingAverage,
  ratingCount,
}) => {
  const [reviewStats, setReviewStats] = useState([]);
  const dispatch = useDispatch();
  const handleStats = useCallback(data => {
    setReviewStats(data.data.data);
  }, []);

  const {
    isLoading: isLoadingStats,
    sendRequest: getReviewStats,
    error,
  } = useHttp(handleStats);

  useEffect(() => {
    if (bookId)
      getReviewStats({ url: `books/${bookId}/reviews/book-review-stats` });
    return () => {
      setReviewStats([]);
    };
  }, [getReviewStats, bookId]);

  useEffect(() => {
    if (error)
      dispatch(
        notificationAction.push(new NotificationModel('error', error).toJSON())
      );
  }, [dispatch, error]);

  return (
    <div className={classes.box}>
      <h2 className={classes.title}>Đánh giá từ khách hàng</h2>
      {isLoadingStats || isLoading ? null : (
        <div className={classes.stats}>
          <div className={classes['total-stars']}>
            <RatingStars
              ratingAverage={ratingAverage}
              ratingCount={ratingCount}
              hideRatingNum={true}
              hideTotal={true}
            />
            <span>{ratingAverage} trên 5</span>
          </div>
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <div className={classes['stat-item']} key={i}>
                <span classes={classes.label}>
                  {Math.abs(i - 5) + ' '}
                  <FontAwesomeIcon
                    icon={solid('star')}
                    className={classes['icon-star']}
                  ></FontAwesomeIcon>
                </span>
                <span
                  className={classes.bar}
                  style={{
                    width:
                      (reviewStats.find(item => +item._id === Math.abs(i - 5))
                        ?.numRatings /
                        ratingCount) *
                        80 +
                      '%',
                  }}
                ></span>
                <span className={classes.percent}>
                  {((reviewStats.find(item => +item._id === Math.abs(i - 5))
                    ?.numRatings /
                    ratingCount) *
                    100 || '0') + '%'}
                </span>
              </div>
            ))}
        </div>
      )}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        comments.map(comment => (
          <CommentItem
            key={comment.id}
            id={comment.id}
            bookId={bookId}
            avatar={comment.user.photo}
            username={comment.user.name}
            content={comment.review}
            date={comment.createAt}
            deleteComment={deleteComment}
            rating={comment.rating}
          />
        ))
      )}
    </div>
  );
};

export default CommentsList;
