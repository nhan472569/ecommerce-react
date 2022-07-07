import React from 'react';
import classes from './CategoryList.module.css';

const CategoryList = React.memo(props => {
  return (
    <ul className={classes.category} id="category">
      <li
        className={classes['category-item']}
        onClick={() => {
          props.getProductsByCategory('all');
        }}
      >
        Tất cả
      </li>
      <li
        className={classes['category-item']}
        onClick={() => {
          props.getProductsByCategory('');
        }}
      >
        Bán chạy
      </li>
      <li
        className={classes['category-item']}
        onClick={() => {
          props.getProductsByCategory('novel');
        }}
      >
        Tiểu thuyết
      </li>
      <li
        className={classes['category-item']}
        onClick={() => {
          props.getProductsByCategory('discovery');
        }}
      >
        Phiêu lưu
      </li>
      <li
        className={classes['category-item']}
        onClick={() => {
          props.getProductsByCategory('fiction');
        }}
      >
        Viễn tưởng
      </li>
      <li
        className={classes['category-item']}
        onClick={() => {
          props.getProductsByCategory('comedy');
        }}
      >
        Hài hước
      </li>
    </ul>
  );
});

export default CategoryList;
