import { useState, useEffect, useCallback } from 'react';

import classes from './CommentBox.module.css';
import CommentForm from './CommentForm';
import CommentsList from './CommentsList';
import useHttp from '../../hooks/use-http';
import LoadingSpinner from '../UI/LoadingSpinner';

const CommentBox = props => {
  const [comments, setComments] = useState([]);

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

  const onAddCommentHandler = async () => {
    getComments({ url: `books/${productId}/reviews` });
  };

  return (
    <div className={classes.box}>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <h2 className={classes.title}>Bình luận</h2>
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
