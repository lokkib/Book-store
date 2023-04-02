import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { motion, AnimatePresence } from "framer-motion"
import { setSorting } from '../redux/slices/filterSlice'
import { RootState } from '../redux/store'
import { SortItem } from '../@types/types/SortItem'
import TriangleDown from './TriangleDownIcon/TriangleDownIcon'
import TriangleUp from './TriangleUpIcon/TriangleUpIcon'

export const list: SortItem[] = [
  { name: 'популярности ↓', sortProperty: 'rating' },
  { name: 'популярности ↑', sortProperty: '+rating' },
  { name: 'цене ↓', sortProperty: 'price' },
  { name: 'цене ↑', sortProperty: '+price' },
  { name: 'алфавиту ↓', sortProperty: 'title' },
  { name: 'алфавиту ↑', sortProperty: '+title' },
]


const subMenuAnimate = {
  enter: {
    opacity: 1,
    rotateX: 0,
    transition: {
      duration: 0.5
    },
    display: "block"
  },
  exit: {
    opacity: 0,
    rotateX: -15,
    transition: {
      duration: 0.5,
      delay: 0.3
    },
    transitionEnd: {
      display: "none"
    }
  }
};



const Sort = React.memo(() => {
  const [isVisible, setIsVisible] = useState(false)

  const dispatch = useDispatch()
  const sort = useSelector((state: RootState) => state.filterInput.sort)

  const sortRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sortRef.current && !e.composedPath().includes(sortRef.current)) {
        setIsVisible(false)
      }
    }
    document.body.addEventListener('click', handleClickOutside)

    return () => {
      document.body.removeEventListener('click', handleClickOutside)
    }
  }, [])

  const clickFilter = (obj: SortItem) => {
    dispatch(setSorting(obj))

    setIsVisible(!isVisible)
  }

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        {!isVisible && <TriangleDown />}
        {isVisible && <TriangleUp />}
        <b>Сортировка по:</b>
        <span
          role="button"
          tabIndex={0}
          onKeyDown={() => setIsVisible(!isVisible)}
          onClick={() => setIsVisible(!isVisible)}
        >
          {sort.name}
        </span>
      </div>
      <AnimatePresence>
      {isVisible && 
        
        <motion.div  exit={{ opacity: 0 }} initial="exit"
        animate={isVisible ? "enter" : "exit"}
        variants={subMenuAnimate} className="sort__popup">
          <ul>
            {list.map((obj, index) => (
              <li
                onKeyDown={() => {
                  clickFilter(obj)
                }}
                role="button"
                tabIndex={0}
                onClick={() => {
                  clickFilter(obj)
                }}
                className={
                  sort.sortProperty === obj.sortProperty ? 'active' : ''
                }
                key={index}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </motion.div>
   
      }
      </AnimatePresence>
     
    </div>
  )
})

export default Sort
