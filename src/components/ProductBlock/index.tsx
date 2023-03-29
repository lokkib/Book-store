import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addItem } from '../../redux/slices/cartSlice'
import { ProductBlockProps } from '../../@types/props/ProductBlockProps'
import { RootState } from '../../redux/store'

const ProductBlock = ({
  id,
  title,
  price,
  imageUrl,
  sizes,
  types,
}: ProductBlockProps) => {
  const [activeType, setActiveType] = useState(0)
  const [activeSize, setActiveSize] = useState(0)
  const typeNames = ['тонкое', 'традиционное']
  const dispatch = useDispatch()

  const item = useSelector((state: RootState) =>
    state.cart.items.find((el) => el.id === id)
  )

  const count = item ? item.count : 0

  const clickActiveTypeDough = (index: number) => {
    setActiveType(index)
  }

  const clickActiveSize = (index: number) => {
    setActiveSize(index)
  }

  const onClickAdd = () => {
    const itemProperties = {
      id,
      title,
      price,
      imageUrl,
      type: typeNames[activeType],
      size: sizes[activeSize],
    }

    dispatch(addItem(itemProperties))
  }

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <Link to={`/product/${id}`}>
          <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        </Link>

        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {types.map((el, index) => (
              <li
              onKeyDown={() => clickActiveTypeDough(index)}
              role='button'
              tabIndex={0}
                key={index}
                onClick={() => clickActiveTypeDough(index)}
                className={activeType === index ? 'active' : ''}
              >
                {typeNames[el]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, index) => (
              <li
              onKeyDown={() => clickActiveSize(index)}
              role='button'
              tabIndex={0}
                key={index}
                onClick={() => clickActiveSize(index)}
                className={activeSize === index ? 'active' : ''}
              >
                {size}
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₽</div>
          <button
            onClick={onClickAdd}
            className="button button--outline button--add"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {!!count && <i>{count}</i>}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductBlock