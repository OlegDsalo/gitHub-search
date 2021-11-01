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
  const FIRST_PAGE = 1;
  createPages(pages, pagesCount, currentPage);
  return (
    <div className="pagination">
      {currentPage >= 5 ? (
        <>
          <span
            className="first-page"
            onClick={() => dispatch(setCurrentPage(FIRST_PAGE))}
          >{FIRST_PAGE}
          </span>
          <span className="three-dot">&hellip;</span>
        </>
      ) : (<></>)}
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
            <span className="three-dot">&hellip;</span>
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
