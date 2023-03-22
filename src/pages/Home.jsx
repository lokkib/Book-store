import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";
import { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCategoryId } from "../redux/slices/filterSlice";

export const Home = () => {
const dispatch = useDispatch();

const categoryID = useSelector(state => state.filterInput.categoryId)
const sortType = useSelector(state => state.filterInput.sort.sortProperty)

  const [items, setItems] = useState([]);
  const {searchValue} = useContext(SearchContext)
  const [isLoading, setIsLoading] = useState(true);
 
  const [currentPage, setCurrentPage] = useState(1);
  

  const onChangeCategory = (id) => {
      dispatch(setCategoryId(id))
  }

  const categoryQuery = categoryID ? `category=${categoryID}` : "";
  const sorting = sortType.replace("+", "");
  const order = sortType.includes("+") ? "asc" : "desc";

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://63a5a154f8f3f6d4abfb73b9.mockapi.io/items?page=${currentPage}&limit=4&${categoryQuery}&sortBy=${sorting}&order=${order}`
    )
      .then((res) => {

        return res.json();
      })
      .then((array) => {
        setIsLoading(false);
        setItems(array);
      })
      .catch(error => {throw error})
    window.scrollTo(0, 0);
  }, [categoryID, categoryQuery, order, sortType, sorting, currentPage]);

  const pizzas = items
    .filter((obj) =>
      obj.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
    )
    .map((el) => <PizzaBlock key={el.id} {...el} />);
  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  const fetchingPageOnClick = (number) => {
    setCurrentPage(number)
  }

  return (
    <>
      <div className="content__top">
        <Categories onClickCategory={(i) => onChangeCategory(i)} />
        <Sort  />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination fetchingPageOnClick={fetchingPageOnClick} />
    </>
  );
};
