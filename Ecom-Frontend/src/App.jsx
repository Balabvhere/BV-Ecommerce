
import './App.css'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './Components/LoginPage'
import { RegisterPage } from './Components/RegisterPage'
import { Toaster } from 'react-hot-toast'
import Home from './Components/Home'
import Adminlog from './admin/Adminlog'
import AdminDashboard from './admin/AdminDashboard'
import AddProduct from './admin/AddProduct'
import ManageProduct from './admin/ManageProduct'

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProductPage from './Components/ProductPage'
import LandingPage from './Components/LandingPage'
import ProductDetail from './Components/PoductDetail'
import CartPage from './Components/cartPage'
import ManageUser from './admin/manageUser'
import OrderPage from './Components/OrderPage'
import ManageOrder from './admin/manageOrder'





function App() {
  
  
  return (
    <>
    
    <Toaster/>
    
    <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element={<LoginPage/>}></Route>
        <Route path='/register' element={<RegisterPage/>}></Route>
        <Route path="/manageProduct" element={<ManageProduct />} />
        <Route path="/admLogin" element={<Adminlog/>}></Route>
        <Route path='/admDashboard' element={<AdminDashboard/>}></Route>
        <Route path='/addProduct' element={<AddProduct/>}></Route>
        <Route path='/landingPage' element={<LandingPage/>}></Route>
        <Route path='/products' element={<ProductPage/>}></Route>
        <Route path='/search' element={<ProductPage/>}></Route>
        <Route path="/productDetail/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage/>}/>
        <Route path='/manageUser' element={<ManageUser/>}/>
        <Route path='/orders' element={<OrderPage/>}/>
        <Route path='/dashboard' element={<AdminDashboard/>}/>
        <Route path='/manageOrder' element={<ManageOrder/>}/>
    </Routes>
    
    </>
  )
}

export default App
