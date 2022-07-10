import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useHttp from '../../hooks/use-http';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './Author.module.css';

const Author = () => {
  const [authorInfor, setAuthorInfor] = useState({
    _id: '',
    name: '',
    image: '',
    introduction: '',
  });
  const params = useParams();
  const { authorId } = params;

  const { isLoading, sendRequest: getAuthorInfor } = useHttp(setAuthorInfor);

  useEffect(() => {
    getAuthorInfor({ url: `author/${authorId}` });
  }, [getAuthorInfor, authorId]);

  return (
    <section className={classes.container}>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className={classes.image}>
            <img src={authorInfor.image} alt={authorInfor.name}></img>
          </div>
          <div className={classes.content}>
            <h2 className={classes.title}>{authorInfor.name}</h2>
            <p className={classes.description}>{authorInfor.introduction}</p>
          </div>
        </>
      )}
    </section>
  );
};

export default Author;
