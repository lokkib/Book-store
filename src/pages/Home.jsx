import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import { useEffect, useState } from "react";

export const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryID, setCategoryID] = useState(0);
  const [sortType, setSortType] = useState({
    name: "популярности",
    sortProperty: "rating",
  });
  // https://639ca6d642e3ad69273867e2.mockapi.io/items

  const categoryQuery = categoryID ? `category=${categoryID}` : "";
  const sorting = sortType.sortProperty.replace("+", "");
  const order = sortType.sortProperty.includes("+") ? "asc" : "desc";

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://63a5a154f8f3f6d4abfb73b9.mockapi.io/items?${categoryQuery}&sortBy=${sorting}&order=${order}`
    )
      .then((res) => {
        return res.json();
      })
      .then((array) => {
        setIsLoading(false);
        setItems(array);
      });
    window.scrollTo(0, 0);
  }, [categoryID, categoryQuery, order, sortType, sorting]);
  return (
    <>
      <div className="content__top">
        <Categories onClickCategory={(i) => setCategoryID(i)} />
        <Sort valueSort={sortType} onClickSort={(i) => setSortType(i)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((el, index) => <Skeleton key={index} />)
          : items.map((el) => <PizzaBlock key={el.id} {...el} />)}
      </div>
    </>
  );
};
