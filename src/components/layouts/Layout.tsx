import { Outlet } from 'react-router-dom';
import Header from '../Header';

const Layout = () => {
  return (
    <div className='App'>
      <div className='wrapper'>
        <Header />
        <div className='content'>
          <div className='container'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
