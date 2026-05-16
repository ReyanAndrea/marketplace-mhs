import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import AddProduct from './pages/AddProduct'
import AdminDashboard from './pages/AdminDashboard'

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/products/add" element={<AddProduct />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
    </>
  )
}

export default App