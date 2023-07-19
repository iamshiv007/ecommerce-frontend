import { Route, Routes } from 'react-router-dom';
import './App.css';
import { LogInSignUp } from './components/user/LogInSignUp';
import { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadUser } from './featured/actions/userActions';
import { Profile } from './components/user/Profile';
import { Home } from './components/home/Home';
import { Footer } from './components/layout/footer/Footer';
import { Header } from './components/layout/header/Header';
import { ProductDetails } from './components/product/ProductDetails';
import { Cart } from './components/cart/Cart';
import { Products } from './components/product/Products';
import { Dashboard } from './components/Admin/Dashboard';
import { About } from './components/layout/about/About';
import { Contact } from './components/layout/contact/Contact';
import { NewProduct } from './components/Admin/NewProduct';
import { ProductList } from './components/Admin/ProductList';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch]);

  return (
    <Fragment>
      <Header />
      <Routes>
        <Route exact element={<Home />} path='/' />
        <Route exact element={<LogInSignUp />} path='/login' />
        <Route exact element={<Profile />} path='/account' />
        <Route exact element={<ProductDetails />} path='/product/:id' />
        <Route exact element={<Cart />} path='/cart' />
        <Route exact element={<Products />} path='/products' />
        <Route exact element={<Dashboard />} path='/dashboard' />
        <Route exact element={<Dashboard />} path='/dashboard' />
        <Route exact element={<About />} path='/about' />
        <Route exact element={<Contact />} path='/contact' />
        <Route exact element={<NewProduct />} path='/admin/product' />
        <Route exact element={<ProductList />} path='/admin/products' />
      </Routes>
      <Footer />
    </Fragment>
  );
}

export default App;
