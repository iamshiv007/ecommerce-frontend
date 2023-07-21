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
import { MyOrders } from './components/order/MyOrders';
import { OrderDetails } from './components/order/OrderDetails';
import { OrderList } from './components/Admin/OrderList';
import { ProcessOrder } from './components/Admin/ProcessOrder';
import { UpdatePassword } from './components/user/updatePassword';
import { UpdateProfile } from './components/user/UpdateProfile';
import { ForgotPassword } from './components/user/ForgotPassword';
import { ResetPassword } from './components/user/ResetPassword';
import { ProtectedRoute } from './components/route/ProtectedRoute'

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

        <Route element={<Home />} path='/' />
        <Route element={<Products />} path='/products' />
        <Route element={<ProductDetails />} path='/product/:id' />
        <Route element={<Products />} path='/products/:keyword' />
        <Route element={<Cart />} path='/cart' />
        <Route element={<About />} path='/about' />
        <Route element={<Contact />} path='/contact' />
        <Route element={<Search />} path='/search' />
        <Route element={<ForgotPassword />} path='/password/forgot' />
        <Route element={<ResetPassword />} path='/password/reset/:token' />

        <Route element={<LogInSignUp />} path='/login' />
        <ProtectedRoute element={<ProtectedRoute component={<Profile />} />} path='/account' />
        <ProtectedRoute element={<ProtectedRoute component={<Shipping />} />} path='/shipping' />
        <ProtectedRoute element={<ProtectedRoute component={<ConfirmOrder />} />} path='/order/confirm' />
        <ProtectedRoute element={<ProtectedRoute component={<OrderSuccess />} />} path='/success' />
        <ProtectedRoute element={<ProtectedRoute component={<MyOrders />} />} path='/orders' />
        <ProtectedRoute element={<ProtectedRoute component={<OrderDetails />} />} path='/order/:id' />
        <ProtectedRoute element={<ProtectedRoute component={<UpdatePassword />} />} path='/password/update' />
        <ProtectedRoute element={<ProtectedRoute component={<UpdateProfile />} />} path='/me/update' />

        <ProtectedRoute element={<ProtectedRoute component={<Dashboard />} isAdmin={true} />} path='/admin/dashboard' />
        <ProtectedRoute element={<ProtectedRoute component={<NewProduct />} isAdmin={true} />} path='/admin/product' />
        <ProtectedRoute element={<ProtectedRoute component={<ProductList />} isAdmin={true} />} path='/admin/products' />
        <ProtectedRoute element={<ProtectedRoute component={<ProductReviews />} isAdmin={true} />} path='/admin/reviews' />
        <ProtectedRoute element={<ProtectedRoute component={<UpdateProduct />} isAdmin={true} />} path='/admin/product/:id' />
        <ProtectedRoute element={<ProtectedRoute component={<UpdateUser />} isAdmin={true} />} path='/admin/user/:id' />
        <ProtectedRoute element={<ProtectedRoute component={<UserList />} isAdmin={true} />} path='/admin/users' />
        <ProtectedRoute element={<ProtectedRoute component={<OrderList />} isAdmin={true} />} path='/admin/orders' />
        <ProtectedRoute element={<ProtectedRoute component={<ProcessOrder />} isAdmin={true} />} path='/admin/order/:id' />

        <ProtectedRoute element={<ProtectedRoute component={<PaymentWrapper />} />} path='/process/payment' />

        <Route element={<NotFound />} path='*' />
      </Routes>
      <Footer />
    </Fragment>
  );
}

export default App;
