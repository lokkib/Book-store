import styles from "./style.module.scss";
import SearchIcon from "./SearchIcon";
import { useContext, useState, useCallback } from "react";
import ClearInputIcon from "./ClearInputIcon/ClearInputIcon";
import { SearchContext } from "../../App";
import { useRef } from "react";
import debounce from "lodash.debounce";

const Search = () => {
  const [placeholder, setPlaceholder] = useState("Поиск");

  const [localValue, setLocalValue] = useState('')
  const { searchValue, setSearchValue } = useContext(SearchContext);
  const inputRef = useRef();

  const clearInput = () => {
    setSearchValue("");
    setLocalValue("")
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const onChangeInputRerender = useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 600),
    [],
   
  );

  const onChangeInput = e => {
    setLocalValue(e.target.value);
    onChangeInputRerender(e.target.value)
  } 



  return (
    <div className={styles.block}>
      <SearchIcon />
      <input
        ref={inputRef}
        value={localValue}
        onChange={(e) => onChangeInput(e)}
        onFocus={() => setPlaceholder("")}
        onBlur={() => setPlaceholder("Поиск")}
        className={styles.search}
        placeholder={placeholder}
      />
      {localValue && (
        <div onClick={clearInput}>
          <ClearInputIcon />
        </div>
      )}
    </div>
  );
};

export default Search;
