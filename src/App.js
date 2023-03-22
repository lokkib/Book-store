import "./scss/app.scss";
import Header from "./components/Header";
import { Home } from "./pages/Home";
import NotFound from "./pages/NotFound";
import { Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";
import { useState } from "react";
import { createContext } from "react";
import { useSelector, useDispatch } from 'react-redux'

export const SearchContext = createContext();

function App() {
  const [searchValue, setSearchValue] = useState("");

  const count = useSelector((state) => state.filterInput.value)
  console.log(count)
  const dispatch = useDispatch()

  return (
    <div className="App">
      <div className="wrapper">
        <SearchContext.Provider value={{ searchValue, setSearchValue }}>
          <Header />
          <div className="content">
            <div className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="cart" element={<Cart />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </SearchContext.Provider>
      </div>
    </div>
  );
}

export default App;
