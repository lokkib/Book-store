import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import Header from '../Header'

const Layout = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="App"
    >
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <Outlet />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Layout
