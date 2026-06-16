import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import Parse from './pages/Parse'
import Research from './pages/Research'
import Peptides from './pages/Peptides'
import Trials from './pages/Trials'
import Shop from './pages/Shop'
import Quiz from './pages/Quiz'
import FatLoss from './pages/FatLoss'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import ExternalRedirect from './pages/ExternalRedirect'
import NotFound from './pages/NotFound'
import Navigation from './components/Navigation'

export default function App() {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/parse" element={<Parse />} />
        <Route path="/research" element={<Research />} />
        <Route path="/peptides" element={<Peptides />} />
        <Route path="/trials" element={<Trials />} />
        <Route path="/shop" element={<ExternalRedirect url="https://www.ridethetide.site/" />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/protocols/fat-loss" element={<FatLoss />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}
