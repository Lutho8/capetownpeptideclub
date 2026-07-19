import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import Parse from './pages/Parse'
import Research from './pages/Research'
import Peptides from './pages/Peptides'
import Trials from './pages/Trials'
import Quiz from './pages/Quiz'
import FatLoss from './pages/FatLoss'
import Login from './pages/Login'
import ExternalRedirect from './pages/ExternalRedirect'
import NotFound from './pages/NotFound'
import Navigation from './components/Navigation'

// Storefront lives at peptide-south-africa.com — all commerce routes redirect
// there with ecosystem tracking so the club has no dead-end mock checkout.
const SHOP_URL = 'https://peptide-south-africa.com/shop?utm_source=club&utm_medium=shop_redirect&utm_campaign=ecosystem'
const CART_URL = 'https://peptide-south-africa.com/cart?utm_source=club&utm_medium=cart_redirect&utm_campaign=ecosystem'

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
        <Route path="/shop" element={<ExternalRedirect url={SHOP_URL} />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/protocols/fat-loss" element={<FatLoss />} />
        <Route path="/cart" element={<ExternalRedirect url={CART_URL} />} />
        <Route path="/checkout" element={<ExternalRedirect url={CART_URL} />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}
