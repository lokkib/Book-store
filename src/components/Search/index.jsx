import styles from "./style.module.scss";
import SearchIcon from "./SearchIcon";
import { useContext, useState } from "react";
import ClearInputIcon from "./ClearInputIcon/ClearInputIcon";
import { SearchContext } from "../../App";

const Search = () => {
  const [placeholder, setPlaceholder] = useState("Поиск");

  const {searchValue, setSearchValue} = useContext(SearchContext)

  return (
    <div className={styles.block}>
      <SearchIcon />
      <input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onFocus={() => setPlaceholder("")}
        onBlur={() => setPlaceholder("Поиск")}
        className={styles.search}
        placeholder={placeholder}
      />
      {searchValue && (
        <div onClick={() => setSearchValue("")}>
          <ClearInputIcon />
        </div>
      )}
    </div>
  );
};

export default Search;
