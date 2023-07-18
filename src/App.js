import { Route, Routes } from 'react-router-dom';
import './App.css';
import { LogInSignUp } from './components/user/LogInSignUp';
import { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadUser } from './featured/actions/userActions';
import { Profile } from './components/user/Profile';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch]);

  return (
    <Fragment>
      Home
      <Routes>
        <Route exact element={<LogInSignUp />} path='/login' />
        <Route exact element={<Profile />} path='/profile' />
      </Routes>
    </Fragment>
  );
}

export default App;
