import ReactPaginate from "react-paginate";
import styles from './style.module.scss'

const Pagination = ({fetchingPageOnClick}) => {
  return (
    <ReactPaginate
	className={styles.pagination}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(e) => fetchingPageOnClick(e.selected + 1)}
      pageRangeDisplayed={5}
      pageCount={3}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
