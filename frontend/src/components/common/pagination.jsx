import React from "react";
import PropTypes from "prop-types";
import "./pagination.css";

const Pagination = (props) => {
  const { totalCount, currentPage, pageSize, handlePaginationClick } = props;
  const pagesCount = Math.ceil(totalCount / pageSize);
  return (
    <div className="Pagination">
      <button
        className="Pagination-button"
        disabled={currentPage <= 1}
        onClick={() => handlePaginationClick("prev")}
      >
        &larr;
      </button>

      <span className="Pagination-info">
        Page <b>{currentPage}</b> of <b>{pagesCount}</b>
      </span>

      <button
        className="Pagination-button"
        disabled={currentPage === pagesCount}
        onClick={() => handlePaginationClick("next")}
      >
        &rarr;
      </button>
    </div>
  );
};

Pagination.propTypes = {
  totalCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  handlePaginationClick: PropTypes.func.isRequired,
};

export default Pagination;
