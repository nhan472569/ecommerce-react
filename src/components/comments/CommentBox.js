import { useState, useEffect, useCallback } from 'react';

import classes from './CommentBox.module.css';
import CommentForm from './CommentForm';
import CommentsList from './CommentsList';
import useHttp from '../../hooks/use-http';
import LoadingSpinner from '../UI/LoadingSpinner';
import { useSelector } from 'react-redux';

const CommentBox = props => {
  const [comments, setComments] = useState([]);
  const user = useSelector(state => state.auth.user);

  const { productId } = props;

  const handleComments = useCallback(data => {
    setComments(data.data.data);
  }, []);
  const { isLoading, sendRequest: getComments } = useHttp(handleComments);
  useEffect(() => {
    if (productId) {
      getComments({ url: `books/${productId}/reviews` });
    }
  }, [getComments, productId]);

  const onAddCommentHandler = newComment => {
    setComments(prev => [Object.assign(newComment, { user }), ...prev]);
  };
  const deleteCommentHandler = reviewId => {
    setComments(prev => {
      return prev.filter(comment => comment.id !== reviewId);
    });
  };

  return (
    <div className={classes.box}>
      <>
        <CommentForm onAddComment={onAddCommentHandler} productId={productId} />
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <CommentsList
            bookId={productId}
            deleteComment={deleteCommentHandler}
            comments={comments}
          />
        )}
      </>
    </div>
  );
};

export default CommentBox;
