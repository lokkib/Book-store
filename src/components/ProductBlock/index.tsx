import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addItem } from '../../redux/slices/cartSlice'
import { ProductBlockProps } from '../../@types/props/ProductBlockProps'
import { RootState } from '../../redux/store'
import { Format } from '../../@types/types/Product'


const ProductBlock = ({
  id,
  title,
  price,
  author,
  imageUrl,
  formats,
  languages,
}: ProductBlockProps) => {
  const [activeLanguage, setActiveLanguage] = useState<number>(0)
  const [activeFormat, setActiveFormat] = useState<number>(0)
  const [activeImage, setActiveImage] = useState<number>(0)
  const languageTypes = ['русский', 'английский']
  const formatNames = ['бумажная', 'электронная', 'аудиокнига']
  const dispatch = useDispatch()

  const item = useSelector((state: RootState) =>
    state.cart.items.find((el) => el.id === id)
  )

  const count = item ? item.count : 0

  const clickActiveLanguage = (index: number) => {
    setActiveLanguage(index)
    setActiveImage(index)
  }

  const clickActiveFormat = (index: number) => {
    setActiveFormat(index)
  }

  const onClickAdd = () => {
      const value = formats[activeFormat]
      const chosenFormat = value[formatNames[activeFormat]]

    const itemProperties = {
      id,
      author,
      title,
      price: chosenFormat.price,
      imageUrl: imageUrl[activeImage],
      language: languageTypes[activeLanguage],
      format: formats[activeFormat],
    }

    dispatch(addItem(itemProperties))
  }

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <Link to={`/product/${id}`}>
          <img
            className="pizza-block__image"
            src={imageUrl[activeImage]}
            alt="Pizza"
          />
        </Link>

        <h4 className="pizza-block__title">{author}</h4>
        <p>{title}</p>
        <div className="pizza-block__selector">
          <ul>
            {languages.map((el, index) => (
              <li
                onKeyDown={() => clickActiveLanguage(index)}
                role="button"
                tabIndex={0}
                key={index}
                onClick={() => clickActiveLanguage(index)}
                className={activeLanguage === index ? 'active' : ''}
              >
                {languageTypes[el]}
              </li>
            ))}
          </ul>
          <ul>
            {formats.map((formatItem, index) => (
              <div
                onKeyDown={() => clickActiveFormat(index)}
                role="button"
                tabIndex={0}
                key={index}
                onClick={() => clickActiveFormat(index)}
                className={activeFormat === index ? 'active' : ''}
              >
                <li>{formatNames[index]}</li>
                <p className="product-block__format-price">
                  <i>{(formatItem)[formatNames[index] as keyof Format].price}</i>
                </p>
              </div>
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
