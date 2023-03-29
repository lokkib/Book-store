import './scss/app.scss'
import { Routes, Route } from 'react-router-dom'
import  Home  from './pages/Home'
import NotFound from './pages/NotFound'
import Cart from './pages/Cart'
import ProductItem from './pages/ProductItem'
import Layout from './components/layouts/Layout'

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="product/:id" element={<ProductItem />} />
        <Route path="cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
