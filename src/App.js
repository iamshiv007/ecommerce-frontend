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
import { ProductReviews } from './components/Admin/ProductReviews';
import { UpdateProduct } from './components/Admin/UpdateProduct';
import { UpdateUser } from './components/Admin/UpdateUser';
import { UserList } from './components/Admin/UserList';
import { NotFound } from './components/layout/not-found/NotFound';
import { Search } from './components/product/Search';
import { Shipping } from './components/cart/Shipping';
import { ConfirmOrder } from './components/cart/ConfirmOrder';
import PaymentWrapper from './components/cart/PaymentWrapper';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch]);

  return (
    <Fragment>
      <Header />
      <Routes>
        <Route exact element={<PaymentWrapper />} path='/process/payment' />
        <Route exact element={<Home />} path='/' />
        <Route exact element={<LogInSignUp />} path='/login' />
        <Route exact element={<Profile />} path='/account' />
        <Route exact element={<ProductDetails />} path='/product/:id' />
        <Route exact element={<Cart />} path='/cart' />
        <Route exact element={<Products />} path='/products' />
        <Route exact element={<Dashboard />} path='/admin/dashboard' />
        <Route exact element={<About />} path='/about' />
        <Route exact element={<Contact />} path='/contact' />
        <Route exact element={<NewProduct />} path='/admin/product' />
        <Route exact element={<ProductList />} path='/admin/products' />
        <Route exact element={<ProductReviews />} path='/admin/reviews' />
        <Route exact element={<UpdateProduct />} path='/admin/product/:id' />
        <Route exact element={<UpdateUser />} path='/admin/user/:id' />
        <Route exact element={<UserList />} path='/admin/users' />
        <Route exact element={<Search />} path='/search' />
        <Route exact element={<Products />} path='/products/:keyword' />
        <Route exact element={<Shipping />} path='/shipping' />
        <Route exact element={<ConfirmOrder />} path='/order/confirm' />
        <Route element={<NotFound />} path='*' />
      </Routes>
      <Footer />
    </Fragment>
  );
}

export default App;
