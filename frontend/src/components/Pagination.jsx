const Pagination = ({ pagination, onPageChange }) => {
  if (!pagination || pagination.pages <= 1) {
    return null;
  }

  return (
    <div className="pagination">
      <button
        className="button button--ghost"
        type="button"
        disabled={pagination.page === 1}
        onClick={() => onPageChange(pagination.page - 1)}
      >
        Previous
      </button>
      <span>
        Page {pagination.page} of {pagination.pages}
      </span>
      <button
        className="button button--ghost"
        type="button"
        disabled={pagination.page === pagination.pages}
        onClick={() => onPageChange(pagination.page + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
