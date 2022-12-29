import styles from "./style.module.scss";
import SearchIcon from "./SearchIcon";
import { useState } from "react";
import ClearInputIcon from "./ClearInputIcon/ClearInputIcon";
const Search = ({ setSearchValue, searchValue }) => {
  const [placeholder, setPlaceholder] = useState("Поиск");

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
