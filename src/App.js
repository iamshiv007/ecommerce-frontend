import { Route, Routes } from 'react-router-dom';
import './App.css';
import { LogInSignUp } from './components/user/LogInSignUp';
import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { UserOptions } from './components/layout/header/UserOptions';
import { OrderSuccess } from './components/cart/OrderSuccess';
import ProtectedRoute from './components/route/ProtectedRoute';
import { MyOrders } from './components/order/MyOrders';
import { OrderDetails } from './components/order/OrderDetails';
import { OrderList } from './components/Admin/OrderList';
import { ProcessOrder } from './components/Admin/ProcessOrder';
import { UpdatePassword } from './components/user/updatePassword';

function App() {
  const dispatch = useDispatch()
  const { isAuthenticated, user } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch]);

  return (
    <Fragment>
      <Header />

      {isAuthenticated && user.role === 'Admin' && <UserOptions />}

      <Routes>

        <Route exact element={<Home />} path='/' />
        <Route exact element={<Products />} path='/products' />
        <Route exact element={<ProductDetails />} path='/product/:id' />
        <Route exact element={<Products />} path='/products/:keyword' />
        <Route exact element={<Cart />} path='/cart' />
        <Route exact element={<About />} path='/about' />
        <Route exact element={<Contact />} path='/contact' />
        <Route exact element={<Search />} path='/search' />

        <ProtectedRoute exact element={<LogInSignUp />} path='/login' />
        <ProtectedRoute exact element={<Profile />} path='/account' />
        <ProtectedRoute exact element={<Shipping />} path='/shipping' />
        <ProtectedRoute exact element={<ConfirmOrder />} path='/order/confirm' />
        <ProtectedRoute exact element={<OrderSuccess />} path='/success' />
        <ProtectedRoute exact element={<MyOrders />} path='/orders' />
        <ProtectedRoute exact element={<OrderDetails />} path='/order/:id' />
        <ProtectedRoute exact element={<UpdatePassword />} path='/password/update' />

        <ProtectedRoute isAdmin={true} exact element={<Dashboard />} path='/admin/dashboard' />
        <ProtectedRoute isAdmin={true} exact element={<NewProduct />} path='/admin/product' />
        <ProtectedRoute isAdmin={true} exact element={<ProductList />} path='/admin/products' />
        <ProtectedRoute isAdmin={true} exact element={<ProductReviews />} path='/admin/reviews' />
        <ProtectedRoute isAdmin={true} exact element={<UpdateProduct />} path='/admin/product/:id' />
        <ProtectedRoute isAdmin={true} exact element={<UpdateUser />} path='/admin/user/:id' />
        <ProtectedRoute isAdmin={true} exact element={<UserList />} path='/admin/users' />
        <ProtectedRoute isAdmin={true} exact element={<OrderList />} path='/admin/orders' />
        <ProtectedRoute isAdmin={true} exact element={<ProcessOrder />} path='/admin/order/:id' />

        <ProtectedRoute exact element={<PaymentWrapper />} path='/process/payment' />

        <Route element={<NotFound />} path='*' />
      </Routes>
      <Footer />
    </Fragment>
  );
}

export default App;
