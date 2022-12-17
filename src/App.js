import "./scss/app.scss";
import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock";
import pizzas from './assets/pizza.json';




function App() {

  fetch('https://639ca6d642e3ad69273867e2.mockapi.io/items').then(res => {
    console.log(res)
    return res.json()
  }).then(array => console.log(array))

  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <div className="content__top">
              <Categories />
              <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
         {pizzas.map((el) => <PizzaBlock key={el.id} {...el} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
