import { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import ProductBlock from '../components/ProductBlock'
import Skeleton from '../components/ProductBlock/Skeleton'
import Pagination from '../components/Pagination'
import { setCategoryID, setPage } from '../redux/slices/filterSlice'
import { Product } from '../@types/types/Product'
import { fetchProducts } from '../redux/api/itemsApi'
import { RootState, useAppDispatch } from '../redux/store'

const Home = () => {
  const dispatch = useAppDispatch()

  const { categoryID, sort, currentPage } = useSelector(
    (state: RootState) => state.filterInput
  )

  const { items, status } = useSelector(
    (state: RootState) => state.productReducer
  )

  const sortType = sort.sortProperty

  const { searchValue } = useSelector((state: RootState) => state.filterInput)

  const onChangeCategory = useCallback((id: number) => {
    dispatch(setCategoryID(id))
  }, [])

  const onChangePage = (n: number) => {
    dispatch(setPage(n))
  }

  const getProducts = async () => {
    const categoryQuery = categoryID ? `category=${categoryID}` : ''
    const sorting = sortType.replace('+', '')
    const order = sortType.includes('+') ? 'asc' : 'desc'

    dispatch(
      fetchProducts({
        currentPage,
        categoryQuery,
        sorting,
        order,
      })
    )
  }

  useEffect(() => {
    window.scrollTo(0, 0)

    getProducts()
  }, [categoryID, sortType, currentPage])

  useEffect(() => {
    return () => {
      dispatch(setCategoryID(0))
      dispatch(setPage(1))
    }
  }, [])

  const products = items
    .filter((obj: Product) =>
      obj.author
        ? obj.author
            .toLocaleLowerCase()
            .startsWith(searchValue.toLocaleLowerCase())
        : obj.title
            .toLocaleLowerCase()
            .startsWith(searchValue.toLocaleLowerCase())
    )
    .map((el: Product) => <ProductBlock key={el.id} {...el} />)

  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ))

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="content__top">
        <Categories onClickCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все книги</h2>
      {status === 'error' && (
        <div className="content__error">
          <h2>
            Произошла ошибка <span>😕</span>{' '}
          </h2>
          <h2>Попробуйти зайти позже</h2>
        </div>
      )}
      <div className="content__items">
        {status === 'loading' ? skeletons : products}
      </div>
      {status === 'access' && (
        <Pagination value={currentPage} fetchingPageOnClick={onChangePage} />
      )}
    </motion.div>
  )
}

export default Home
