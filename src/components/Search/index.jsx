import styles from "./style.module.scss";
import SearchIcon from "./SearchIcon";
import {  useState, useCallback } from "react";
import ClearInputIcon from "./ClearInputIcon/ClearInputIcon";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import debounce from "lodash.debounce";
import { setSearchValue } from "../../redux/slices/filterSlice";

const Search = () => {
  const [placeholder, setPlaceholder] = useState("Поиск");
  const dispatch = useDispatch()
  const [localValue, setLocalValue] = useState('')

  const inputRef = useRef();

  const clearInput = () => {
    dispatch(setSearchValue(''));
    setLocalValue("")
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const onChangeInputRerender = useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
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
