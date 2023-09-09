import { useCallback, useEffect, useRef, useState } from 'react';
import useHttp from '../../hooks/use-http';
import Paginator from '../UI/Paginator';
import SearchFrom from '../UI/SearchForm';
import UserItem from './UserItem';
import classes from './UserManage.module.css';

function UserManage() {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const searchInputRef = useRef();

  const { isLoading, sendRequest: getUsers } = useHttp(
    useCallback(
      data => {
        setUsers(data.data.data);
      },
      [setUsers]
    )
  );
  const { sendRequest: getTotals } = useHttp(
    useCallback(
      data => {
        setTotalUsers(data.data.data);
      },
      [setTotalUsers]
    )
  );

  useEffect(() => {
    getUsers({ url: 'users' });
    getTotals({ url: 'users/count' });
    return () => {
      setUsers([]);
      setCurrentPage(null);
    };
  }, [getUsers, getTotals]);

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

  const filterUser = () => {
    getUsers({ url: 'users' });
    getTotals({ url: 'users/count' });
    setCurrentPage(1);
  };

  return (
    <>
      <SearchFrom search={search} ref={searchInputRef} />
      <section className={classes['user-list']}>
        {isLoading
          ? Array(4)
              .fill(0)
              .map((_, i) => <UserItem.Loading key={i} />)
          : users.map(user => (
              <UserItem
                key={user._id}
                user={user}
                onDoUserAction={filterUser}
              />
            ))}
      </section>
      <Paginator
        totalItems={totalUsers}
        currentPage={currentPage}
        itemPerPage={8}
        paginate={paginate}
      />
    </>
  );
}

export default UserManage;
