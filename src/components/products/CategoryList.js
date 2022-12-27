import React, { useEffect, useState } from 'react';
import classes from './CategoryList.module.css';

const CategoryList = props => {
  const [active, setActive] = useState({
    all: true,
    story: false,
    novel: false,
    discover: false,
    fiction: false,
    humor: false,
  });

  useEffect(() => {}, [active]);

  const activeCatagoryHandler = category => {
    setActive(prev => {
      const state = {};
      for (let key in prev) {
        state[key] = false;
      }
      state[category] = true;
      console.log(state);
      return state;
    });
  };

  return (
    <ul className={classes.category} id="category">
      <li
        className={
          classes['category-item'] + ' ' + (active.all ? classes.active : null)
        }
        onClick={() => {
          props.getProductsByCategory('all');
          activeCatagoryHandler('all');
        }}
      >
        Tất cả
      </li>
      <li
        className={
          classes['category-item'] +
          ' ' +
          (active.story ? classes.active : null)
        }
        onClick={() => {
          props.getProductsByCategory('story');
          activeCatagoryHandler('story');
        }}
      >
        Văn học
      </li>
      <li
        className={
          classes['category-item'] +
          ' ' +
          (active.novel ? classes.active : null)
        }
        onClick={() => {
          props.getProductsByCategory('novel');
          activeCatagoryHandler('novel');
        }}
      >
        Tiểu thuyết
      </li>
      <li
        className={
          classes['category-item'] +
          ' ' +
          (active.discover ? classes.active : null)
        }
        onClick={() => {
          props.getProductsByCategory('discover');
          activeCatagoryHandler('discover');
        }}
      >
        Phiêu lưu
      </li>
      <li
        className={
          classes['category-item'] +
          ' ' +
          (active.fiction ? classes.active : null)
        }
        onClick={() => {
          props.getProductsByCategory('fiction');
          activeCatagoryHandler('fiction');
        }}
      >
        Viễn tưởng
      </li>
      <li
        className={
          classes['category-item'] +
          ' ' +
          (active.humor ? classes.active : null)
        }
        onClick={() => {
          props.getProductsByCategory('humor');
          activeCatagoryHandler('humor');
        }}
      >
        Hài hước
      </li>
    </ul>
  );
};

export default CategoryList;
