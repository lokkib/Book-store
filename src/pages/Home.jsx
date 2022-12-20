import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock"
import Skeleton from "../components/PizzaBlock/Skeleton";
import { useEffect, useState } from "react";

export const Home = () => {
    const [items, setItems] = useState([]);
    const [isLoading,  setIsLoading] = useState(true);
  
    useEffect(() => {
      fetch("https://639ca6d642e3ad69273867e2.mockapi.io/items")
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((array) => {
        setIsLoading(false)
        setItems(array)
      } );
     
    },[isLoading])
    return (
        <>
        <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        { isLoading ? [...new Array(6)].map((el,index) =>  (
          <Skeleton key={index} /> 
        )) : items.map((el) =>  (<PizzaBlock key={el.id} {...el}/>))}
      </div>
        </>
        
    )
}