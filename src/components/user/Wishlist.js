import { useEffect } from 'react';
import environment from '../../environment';

const Wishlist = () => {
  useEffect(() => {
    document.title = `Danh sách yêu thích | ${environment.HEAD_TITLE}`;
  });
  return (
    <div className="container">
      <p>wishlist</p>
    </div>
  );
};

export default Wishlist;
