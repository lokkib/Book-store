import './scss/app.scss';
import Header from './components/Header';
import { Home } from './pages/Home';
import NotFound from './pages/NotFound';
import { Routes, Route } from 'react-router-dom';
import Cart from './pages/Cart';
import ProductItem from './pages/ProductItem';
import Layout from './components/layouts/Layout';

function App() {
  return (
    <Routes>
      <Route  element={<Layout />}>
        <Route path='/'  element={<Home />} />
        <Route path='product/:id' element={<ProductItem />} />
        <Route path='cart' element={<Cart />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
