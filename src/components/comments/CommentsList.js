import CommentItem from './CommentItem';
import classes from './CommentsList.module.css';

const CommentsList = props => {
  return (
    <div className={classes.box}>
      {props.comments.map(comment => (
        <CommentItem
          key={comment._id}
          avatar={comment.user.avatar}
          username={
            comment.user.firstName && comment.user.lastName
              ? comment.user.firstName + ' ' + comment.user.lastName
              : comment.user.email
          }
          content={comment.content}
          date={comment.commentDate}
        />
      ))}
    </div>
  );
};

export default CommentsList;
