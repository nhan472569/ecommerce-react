import React from 'react';
import classes from './CategoryList.module.css';

const CategoryList = props => {
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
          props.getProductsByCategory('story');
        }}
      >
        Văn học
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
          props.getProductsByCategory('discover');
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
          props.getProductsByCategory('humor');
        }}
      >
        Hài hước
      </li>
    </ul>
  );
};

export default CategoryList;
