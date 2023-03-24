import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import { useEffect, useState} from "react";
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";
import { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setCategoryID,
  setPage,

} from "../redux/slices/filterSlice";
import axios from "axios";


export const Home = () => {
  const dispatch = useDispatch();

  const { categoryID, sort, currentPage } = useSelector(
    (state) => state.filterInput
  );

  const sortType = sort.sortProperty;

  const [items, setItems] = useState([]);
  const { searchValue } = useContext(SearchContext);
  const [isLoading, setIsLoading] = useState(true);

  const onChangeCategory = (id) => {
    dispatch(setCategoryID(id));
  };



  const onChangePage = (n) => {
    dispatch(setPage(n));
  };

  const fetchPizzas = () => {
    setIsLoading(true);
    const categoryQuery = categoryID ? `category=${categoryID}` : "";
    const sorting = sortType.replace("+", "");
    const order = sortType.includes("+") ? "asc" : "desc";
    axios
      .get(
        `https://63a5a154f8f3f6d4abfb73b9.mockapi.io/items?page=${currentPage}&limit=4&${categoryQuery}&sortBy=${sorting}&order=${order}`
      )
      .then((response) => {
        setIsLoading(false);
        setItems(response.data);
      })
      .catch((error) => {
        throw error;
      });

  };




  useEffect(() => {

    window.scrollTo(0, 0);


      fetchPizzas();


  }, [categoryID, sortType,  currentPage]);





  const pizzas = items
    .filter((obj) =>
      obj.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
    )
    .map((el) => <PizzaBlock key={el.id} {...el} />);
  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <>
      <div className="content__top">
        <Categories onClickCategory={(i) => onChangeCategory(i)} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination value={currentPage} fetchingPageOnClick={onChangePage} />
    </>
  );
};
