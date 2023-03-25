import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import styles from './style.module.scss'

const ProductItem = () => {
    const navigate = useNavigate()
    const [product, setProduct] = useState()
    const {id} = useParams()

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const {data} = await axios.get(`https://63a5a154f8f3f6d4abfb73b9.mockapi.io/items/${id}`);
                setProduct(data)
            } catch (error) {
                navigate('/')
            }
        
        }
        fetchProduct()
      
    },[])

    if(!product) {
        return <h3 className={styles.loading}>Загрузка<span>...</span></h3>
    }
 
        return <div>
            <img src={product.imageUrl} alt='product image' />
            <h2>{product.title}</h2>
            <h4>{product.price} ₽</h4>
        </div>
}

export default ProductItem