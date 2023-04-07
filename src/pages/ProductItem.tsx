import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import styles from './style.module.scss'
import { Product } from '../@types/types/Product'
import ButtonGoBack from '../components/ButtonGoBack/ButtonGoBack'

const ProductItem = () => {
  const navigate = useNavigate()
  const [product, setProduct] = useState<Product>()
  const [bookRating, setRating] = useState<number>(0)
  const { id } = useParams()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          `https://63a5a154f8f3f6d4abfb73b9.mockapi.io/items/${id}`
        )
        setProduct(data)
        setRating(data.rating)
      } catch (error) {
        navigate('/')
      }
    }
    fetchProduct()
  }, [])

  if (!product) {
    return (
      <h3 className={styles.loading}>
        Загрузка<span>...</span>
      </h3>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className={styles.product__item__block}
    >
      <ButtonGoBack />
      <div className={styles.product}>
        <div className={styles.product__item}>
          <img src={product.imageUrl[0]} alt="product" />
          <h2>{product.title}</h2>
          <h4>от {product.price} ₽</h4>
        </div>
        <div className={styles.product__item__rating}>
          {bookRating
            ? [...new Array(bookRating)].map((_, ind) => {
                return <span key={ind}>⭐</span>
              })
            : ''}
        </div>
      </div>

      <div>
        <h3>Описание</h3>
        <p>{product.description}</p>
      </div>
    </motion.div>
  )
}

export default ProductItem
