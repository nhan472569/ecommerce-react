import LoadingSpinner from '../UI/LoadingSpinner';
import CommentItem from './CommentItem';
import classes from './CommentsList.module.css';

const CommentsList = ({ isLoading, comments, bookId, deleteComment }) => {
  return (
    <div className={classes.box}>
      <h2 className={classes.title}>Đánh giá từ khách hàng</h2>
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
