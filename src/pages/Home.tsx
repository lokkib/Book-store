import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import { useEffect } from "react";
import Pagination from "../components/Pagination";

import { useSelector, useDispatch } from "react-redux";
import { setCategoryID, setPage } from "../redux/slices/filterSlice";
import { Link } from "react-router-dom";
import { Product } from "../@types/types/Product";
import { fetchProducts } from "../redux/api/itemsApi";
import { RootState } from "../redux/store";

export const Home = () => {
  const dispatch = useDispatch();

  const { categoryID, sort, currentPage } = useSelector(
    (state: RootState) => state.filterInput
  );

  const { items, status } = useSelector((state: RootState) => state.productReducer);

  const sortType = sort.sortProperty;

    const {searchValue} = useSelector((state: RootState) => state.filterInput)

  const onChangeCategory = (id: number) => {
    dispatch(setCategoryID(id));
  };

  const onChangePage = (n: number) => {
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
    .filter((obj: Product) =>
      obj.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
    )
    .map((el: Product) =>   <PizzaBlock key={el.id}  {...el} /> );

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
