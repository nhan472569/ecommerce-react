import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useEffect, useRef, useState } from 'react';
import useHttp from '../../hooks/use-http';
import Notification from '../UI/Notification';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './CommentForm.module.css';

const CommentForm = props => {
  const [starClicked, setStarClicked] = useState(false);
  const [ratingStar, setRatingStar] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [postSuccessfully, setPostSuccessfully] = useState(false);
  const [formError, setFormError] = useState({
    starRating: '',
    review: '',
  });
  const commentInputRef = useRef();

  const { productId, onAddComment } = props;

  const {
    isLoading,
    error,
    sendRequest: postComment,
  } = useHttp(
    useCallback(
      data => {
        onAddComment(data.data.data);
        setPostSuccessfully(true);
      },
      [onAddComment]
    )
  );

  useEffect(() => {
    if (error || postSuccessfully) setShowNotification(true);
  }, [error, postSuccessfully]);

  const submitCommentHandler = async e => {
    e.preventDefault();
    setFormError({ starRating: '', review: '' });
    const comment = commentInputRef.current.value.trim();
    if (!ratingStar && !comment) {
      setFormError({
        starRating: 'Vui lòng đánh giá.',
        review: 'Vui lòng điền phản hồi.',
      });
      return;
    }

    if (!ratingStar) {
      setFormError(prev => {
        return {
          ...prev,
          starRating: 'Vui lòng đánh giá trước khi đăng.',
        };
      });
      return;
    }

    if (!comment) {
      setFormError(prev => {
        return { ...prev, review: 'Bình luận không được để trống.' };
      });
      return;
    }

    await postComment({
      url: `books/${productId}/reviews`,
      method: 'post',
      body: {
        review: comment,
        rating: ratingStar,
      },
    });

    commentInputRef.current.value = '';
    setRatingStar(null);
  };

  const closeNotification = () => {
    setShowNotification(false);
    if (postSuccessfully) {
      setPostSuccessfully(false);
    }
  };

  return (
    <>
      {error && showNotification && (
        <Notification type="error" onClose={closeNotification}>
          {error}
        </Notification>
      )}
      {postSuccessfully && showNotification && (
        <Notification type="success" onClose={closeNotification}>
          Đánh giá sản phẩm thành công
        </Notification>
      )}
      <form className={classes.form} onSubmit={submitCommentHandler}>
        <h2 className={classes.title}>Đánh giá sản phẩm</h2>
        <div className={classes['star-rating']}>
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <FontAwesomeIcon
                key={i}
                icon={solid('star')}
                className={
                  classes['star-icon'] +
                  ' ' +
                  (ratingStar > i ? classes.checked : '')
                }
                onMouseEnter={() => {
                  !starClicked && setRatingStar(i + 1);
                }}
                onMouseLeave={() => {
                  !starClicked && setRatingStar(null);
                }}
                onClick={() => {
                  setFormError(prev => {
                    return {
                      ...prev,
                      starRating: '',
                    };
                  });
                  setRatingStar(i + 1);
                  !starClicked && setStarClicked(true);
                }}
              ></FontAwesomeIcon>
            ))}
          {formError.starRating && (
            <p className={classes.error}>{formError.starRating}</p>
          )}
        </div>

        <textarea
          className={classes.textarea}
          placeholder="Viết đánh giá..."
          ref={commentInputRef}
          onChange={() => {
            setFormError(prev => {
              return {
                ...prev,
                review: '',
              };
            });
          }}
        />
        {formError.review && (
          <p className={classes.error}>{formError.review}</p>
        )}
        <button
          type="submit"
          className={classes.button}
          disabled={isLoading || formError.starRating || formError.review}
        >
          {isLoading ? (
            <LoadingSpinner color="#fff" borderSize="4px" size="30px" />
          ) : (
            'Đăng'
          )}
        </button>
      </form>
    </>
  );
};

export default CommentForm;
