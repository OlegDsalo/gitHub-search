import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../../store/users/users.slice';
import { selectUsersCurrentPage } from '../../store/users/users.selector';
import { createPages } from './createPages';
import './pagination.scss';

interface PaginationProps{
  currentPage: number,
  pagesCount: number,
}

const Pagination = ({ currentPage, pagesCount }:PaginationProps) => {
  const dispatch = useDispatch();
  const pages = [];
  createPages(pages, pagesCount, currentPage);
  return (
    <div className="pagination">
      {pages.map((page) => (
        <span
          className={currentPage === page ? 'current-page' : 'page'}
          key={page}
          onClick={() => dispatch(setCurrentPage(page))}
        >
          {page}
        </span>
      ))}
      {currentPage === pagesCount || currentPage + 3 === pagesCount ? (<></>)
        : (
          <>
            &hellip;
            <span
              className="last-page"
              onClick={() => dispatch(setCurrentPage(pagesCount))}
            >{pagesCount}
            </span>
          </>
        )}
    </div>
  );
};

export default Pagination;
