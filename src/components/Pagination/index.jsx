import ReactPaginate from "react-paginate";
import styles from './style.module.scss'

const Pagination = () => {
  return (
    <ReactPaginate
	className={styles.pagination}
      breakLabel="..."
      nextLabel=">"
      // onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={3}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
