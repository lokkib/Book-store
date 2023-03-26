import ReactPaginate from "react-paginate";
import styles from "./style.module.scss";
import { PaginationProps } from "../../@types/props/PaginationProps";

const Pagination = ({ value, fetchingPageOnClick }: PaginationProps) => {
  return (
    <ReactPaginate
      className={styles.pagination}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(e) => fetchingPageOnClick(e.selected + 1)}
      pageRangeDisplayed={5}
      pageCount={3}
      forcePage={value - 1}
      previousLabel="<"
  
    />
  );
};

export default Pagination;
