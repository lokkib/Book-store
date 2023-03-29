import React, { useState } from 'react'
import { CategoriesProps } from '../@types/props/CategoriesProps'

const Categories = React.memo(({ onClickCategory }: CategoriesProps) => {
  const [activeCategory, setActiveCategory] = useState(0)

  const categories = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
  ]

  const clickedCategory = (index: number) => {
    setActiveCategory(index)
  }

  return (
    <div className="categories">
      <ul>
        {categories.map((el, index) => (
          <li
            onKeyDown={() => {
              clickedCategory(index)
              onClickCategory(index)
            }}
            role="button"
            tabIndex={0}
            key={index}
            onClick={() => {
              clickedCategory(index)
              onClickCategory(index)
            }}
            className={activeCategory === index ? 'active' : ''}
          >
            {el}
          </li>
        ))}
      </ul>
    </div>
  )
})

export default Categories
