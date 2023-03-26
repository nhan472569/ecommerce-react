import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import environment from '../../environment';
import useHttp from '../../hooks/use-http';
import Notification from '../UI/Notification';
import LoadingSpinner from '../UI/LoadingSpinner';
import RatingStars from '../UI/RatingStars';
import classes from './CommentItem.module.css';

const CommentItem = props => {
  const [isActiveActions, setIsActiveActions] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const {
    isLoading,
    sendRequest: deleteComment,
    error,
  } = useHttp(() => props.deleteComment(props.id));

  useEffect(() => {
    document
      .querySelector('body')
      .addEventListener('click', () => setIsActiveActions(false));
    return () => {
      setIsActiveActions(false);
      document
        .querySelector('body')
        .removeEventListener('click', () => setIsActiveActions(false));
    };
  }, [setIsActiveActions]);

  const DAY_IN_MILLISECOND = 1000 * 60 * 60 * 24;
  const HOUR_IN_MILLISECOND = 1000 * 60 * 60;
  const MINUTE_IN_MILLISECOND = 1000 * 60;
  const SECOND_IN_MILLISECOND = 1000;
  const { date: createdDate } = props;
  const originalDate = new Date(createdDate).toLocaleString('vi-VN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const getCommentDate = createdDate => {
    const diffDate = Date.now() - new Date(createdDate);
    if (diffDate < MINUTE_IN_MILLISECOND) {
      return Math.floor(diffDate / SECOND_IN_MILLISECOND) + ' giây trước';
    } else if (diffDate < HOUR_IN_MILLISECOND) {
      return Math.floor(diffDate / MINUTE_IN_MILLISECOND) + ' phút trước';
    } else if (diffDate < DAY_IN_MILLISECOND) {
      return Math.floor(diffDate / HOUR_IN_MILLISECOND) + ' giờ trước';
    }
    return new Date(createdDate).toLocaleString('vi-VN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };
  const formattedDate = getCommentDate(createdDate);

  const toggleActiveActions = () => setIsActiveActions(prev => !prev);
  const deleteCommentHandler = () => {
    setIsActiveActions(false);
    deleteComment({
      url: `books/${props.bookId}/reviews/${props.id}`,
      method: 'delete',
    });
  };
  useEffect(() => {
    if (error) setShowNotification(true);
  }, [error]);

  const closeNotification = () => {
    setShowNotification(false);
  };
  return (
    <>
      {error && showNotification && (
        <Notification type="error" onClose={closeNotification}>
          {error}
        </Notification>
      )}
      <div className={classes.item}>
        <div className={classes.avatar}>
          <img
            src={environment.DOMAIN + '/img/users/' + props.avatar}
            alt="avatar"
          />
        </div>
        <div className={classes.ContentBox}>
          <div className={classes.username}>{props.username}</div>
          <div className={classes.rating}>
            <RatingStars ratingAverage={props.rating} hideRatingNum={true} />
          </div>
          <p className={classes.date} title={originalDate}>
            {formattedDate}
          </p>
          <div className={classes.content}>{props.content}</div>
        </div>
        <div style={{ position: 'relative' }}>
          <FontAwesomeIcon
            icon={solid('ellipsis')}
            className={classes.ellipsis}
            onClick={e => {
              if (!isLoading) {
                toggleActiveActions();
                e.stopPropagation();
              }
            }}
          />
          {isActiveActions && (
            <ul className={classes.actions}>
              <li onClick={deleteCommentHandler}>Xoá đánh giá</li>
            </ul>
          )}
          {isLoading && (
            <LoadingSpinner color="#000" borderSize="4px" size="30px" />
          )}
        </div>
      </div>
    </>
  );
};

export default CommentItem;
