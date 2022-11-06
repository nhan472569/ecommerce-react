import { useState, useEffect } from 'react';

import classes from './CommentBox.module.css';
import CommentForm from './CommentForm';
import CommentsList from './CommentsList';
import useHttp from '../../hooks/use-http';
import LoadingSpinner from '../UI/LoadingSpinner';

const CommentBox = props => {
  const [comments, setComments] = useState([]);

  const { productId } = props;

  const { isLoading, sendRequest: getComments } = useHttp(setComments);
  useEffect(() => {
    getComments({ url: `books/${productId}/reviews/` });
  }, [getComments, productId]);

  const onAddCommentHandler = async () => {
    getComments({ url: `books/${productId}/reviews/` });
  };

  return (
    <div className={classes.box}>
      <h2 className={classes.title}>Bình luận</h2>
      <CommentForm onAddComment={onAddCommentHandler} productId={productId} />
      {isLoading ? <LoadingSpinner /> : <CommentsList comments={comments} />}
    </div>
  );
};

export default CommentBox;
