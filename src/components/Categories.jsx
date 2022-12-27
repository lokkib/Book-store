import { useState } from "react"


function Categories ({onClickCategory}) {

const [activeCategory, setActiveCategory] = useState(0)

const categories = ['Все', 'Мясные', 'Вегетарианская','Гриль','Острые', 'Закрытые']

const clickedCategory = (index) => {
  setActiveCategory(index)
}

    return (
      <div className="categories">
                  <ul>
                   {categories.map((el, index) => <li key={index} onClick={() => {clickedCategory(index); onClickCategory(index)}} className={activeCategory === index? 'active' : ''}>{el}</li> )}
                  </ul>
                </div>
    )
  }

  export default Categories