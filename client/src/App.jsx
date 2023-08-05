import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Layout from './components/Layout';
import AllQuotesScreen from './screens/AllQuotesScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegistrationScreen from './screens/RegistrationScreen';

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route path='/' element={<AllQuotesScreen/>}/>
        <Route path='/home' element={<HomeScreen/>}/>
      </Route>
      <Route path='/login' element={<LoginScreen/>}/>
      <Route path = '/registration' element={<RegistrationScreen/>}/>
    </Routes>
    </BrowserRouter>
  )
}
