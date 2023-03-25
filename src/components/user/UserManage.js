import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import useHttp from '../../hooks/use-http';
import Paginator from '../UI/Paginator';
import SearchFrom from '../UI/SearchForm';
import UserItem from './UserItem';
import classes from './UserManage.module.css';

function UserManage() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const searchInputRef = useRef();
  const totalUsers = useSelector(state => state.product.count);

  const { isLoading, sendRequest: getUsers } = useHttp(
    useCallback(
      data => {
        setUsers(data.data.data);
      },
      [setUsers]
    )
  );

  useEffect(() => {
    getUsers({ url: 'users' });
    return () => {
      setUsers([]);
      setCurrentPage(null);
    };
  }, [getUsers]);

  const search = event => {
    event.preventDefault();
    let searchName = searchInputRef.current.value;
    if (searchName.trim()) {
      getUsers({ url: `users/?name=${searchName}` });
      return;
    }
    getUsers({ url: 'users' });
  };

  const paginate = page => {
    if (page === currentPage) return;
    setCurrentPage(page);
    getUsers({ url: `users/?page=${page}` });
  };

  return (
    <>
      <SearchFrom />
      <section className={classes['users-list']}>
        <UserItem />
      </section>
      <Paginator
        totalItems={totalUsers}
        currentPage={currentPage}
        paginate={paginate}
      />
    </>
  );
}

export default UserManage;
