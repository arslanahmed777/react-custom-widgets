import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { range } from "../../utils/functions";

const Pagination = (props) => {
  const [thispage, setThisPage] = useState(1);
  const [arrOfCurrBtns, setArrOfCurrBtns] = useState([]);
  const { itemsCount, pageSize, onPageChange, currentPage } = props;
  const pagesCount = Math.ceil(itemsCount / pageSize);
  const pages = range(1, pagesCount + 1);
  useEffect(() => {
    setThisPage(currentPage);
    let tempNumberOfPages = [...pages];
    if (currentPage === pages.length - 2 && currentPage < pages.length) {
      tempNumberOfPages = tempNumberOfPages.slice(
        currentPage - 1,
        currentPage + 2
      );
      tempNumberOfPages = [...tempNumberOfPages];
    } else if (currentPage === pages.length) {
      tempNumberOfPages = tempNumberOfPages.slice(
        currentPage - 1,
        currentPage + 1
      );
      tempNumberOfPages = ["...", ...tempNumberOfPages];
    } else {
      tempNumberOfPages = tempNumberOfPages.slice(
        currentPage - 1,
        currentPage + 2
      );
      tempNumberOfPages = [...tempNumberOfPages, "...", pages.length];
    }

    // if (currentPage === 2) {
    //   tempNumberOfPages = [...pages];
    //   tempNumberOfPages = tempNumberOfPages.slice(2, 4);
    //   tempNumberOfPages = ["...", ...tempNumberOfPages, "...", pages.length];
    // }
    setArrOfCurrBtns(tempNumberOfPages);
  }, [currentPage]);
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className={`page-item ${thispage === 1 && "disabled"}`}>
          <span
            onClick={() => onPageChange(thispage - 1)}
            className="page-link"
          >
            Prev
          </span>
        </li>
        {arrOfCurrBtns.map((page) => {
          return (
            <li
              key={page}
              className={`page-item ${page === currentPage && "active"}`}
            >
              <span onClick={() => onPageChange(page)} className="page-link">
                {page}
              </span>
            </li>
          );
        })}
        <li className={`page-item ${pages.length === thispage && "disabled"}`}>
          <span
            onClick={() => onPageChange(thispage + 1)}
            className="page-link"
          >
            Next
          </span>
        </li>
      </ul>
    </nav>
  );
};
Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};
export default Pagination;
