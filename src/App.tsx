import './scss/app.scss'
import { Routes, Route } from 'react-router-dom'
import React, { Suspense } from 'react'
import Home from './pages/Home'
import Layout from './components/layouts/Layout'
import NotFound from './pages/NotFound'

const Cart = React.lazy(() => import('./pages/Cart'))

const ProductItem = React.lazy(() => import('./pages/ProductItem'))

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route
          path="product/:id"
          element={
            <Suspense
              fallback={
                <div className="loading">
                  Загрузка<span>...</span>
                </div>
              }
            >
              <ProductItem />
            </Suspense>
          }
        />
        <Route
          path="cart"
          element={
            <Suspense
              fallback={
                <div className="loading">
                  Загрузка корзины<span>...</span>
                </div>
              }
            >
              <Cart />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
