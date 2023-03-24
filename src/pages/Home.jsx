import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import { useEffect } from "react";
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";
import { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCategoryID, setPage } from "../redux/slices/filterSlice";

import { fetchProducts } from "../redux/api/itemsApi";

export const Home = () => {
  const dispatch = useDispatch();

  const { categoryID, sort, currentPage } = useSelector(
    (state) => state.filterInput
  );

  const { items, status } = useSelector((state) => state.productReducer);

  const sortType = sort.sortProperty;

  const { searchValue } = useContext(SearchContext);

  const onChangeCategory = (id) => {
    dispatch(setCategoryID(id));
  };

  const onChangePage = (n) => {
    dispatch(setPage(n));
  };

  const getProducts = async () => {
    const categoryQuery = categoryID ? `category=${categoryID}` : "";
    const sorting = sortType.replace("+", "");
    const order = sortType.includes("+") ? "asc" : "desc";

    dispatch(
      fetchProducts({
        currentPage,
        categoryQuery,
        sorting,
        order,
      })
    );
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    getProducts();
  }, [categoryID, sortType, currentPage]);

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
      {status === "error" && (
        <>
        <div className="content__error">
        <h2>
            Произошла ошибка <span>😕</span>{" "}
          </h2>
          <h2>Попробуйти зайти позже</h2>
        </div>
          
        </>
      )}
      <div className="content__items">
        {status === "loading" ? skeletons : pizzas}
      </div>
      {status === "access" &&  <Pagination value={currentPage} fetchingPageOnClick={onChangePage} />}
     
    </>
  );
};
