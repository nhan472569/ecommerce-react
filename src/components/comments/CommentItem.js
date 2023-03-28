import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useEffect, useState } from 'react';
import environment from '../../environment';
import useHttp from '../../hooks/use-http';
import LoadingSpinner from '../UI/LoadingSpinner';
import RatingStars from '../UI/RatingStars';
import classes from './CommentItem.module.css';
import { notificationAction } from '../../store/notification-context';
import { useDispatch } from 'react-redux';
import NotificationModel from '../../models/NotificationModel';

const CommentItem = props => {
  const [isActiveActions, setIsActiveActions] = useState(false);
  const dispatch = useDispatch();

  const {
    isLoading,
    sendRequest: deleteComment,
    error,
  } = useHttp(
    useCallback(() => {
      props.deleteComment(props.id);
      dispatch(
        notificationAction.push(
          new NotificationModel('success', 'Xoá bình luận thành công').toJSON()
        )
      );
    }, [props, dispatch])
  );

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
    if (error)
      dispatch(
        notificationAction.push(new NotificationModel('error', error).toJSON())
      );
  }, [error, dispatch]);

  return (
    <>
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
