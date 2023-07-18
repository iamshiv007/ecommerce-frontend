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
      </Routes>

      <Footer />
    </Fragment>
  );
}

export default App;
