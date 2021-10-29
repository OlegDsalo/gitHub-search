import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../../store/users/users.slice';
import { selectUsersCurrentPage } from '../../store/users/users.selector';
import { createPages } from './createPages';

// eslint-disable-next-line react/prop-types
const Pagination = ({ currentPage, lastPage, pagesCount }:any) => {
  const dispatch = useDispatch();
  const pages = [];
  createPages(pages, pagesCount, currentPage);

  return (
    <div style={{ display: 'flex' }}>
      {pages.map((page) => (
        <div key={page}>
          <span
            className={currentPage === page ? 'current-page' : 'page'}
            key={page}
            onClick={() => dispatch(setCurrentPage(page))}
          >
            {page}
          </span>
        </div>
      ))}
      <span>&hellip;</span>
      <span className="page" onClick={() => dispatch(setCurrentPage(pagesCount))}>{pagesCount}</span>
    </div>
  );
};

export default Pagination;
