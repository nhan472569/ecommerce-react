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

  return (
    <div className={classes.box}>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <h2 className={classes.title}>Đánh giá sản phẩm</h2>
          <CommentForm
            onAddComment={onAddCommentHandler}
            productId={productId}
          />
          {!isLoading && <CommentsList comments={comments} />}
        </>
      )}
    </div>
  );
};

export default CommentBox;
