import { Routes, Route } from 'react-router-dom'
import Navbar from './home/Navbar.jsx'
import Footer from './home/Footer.jsx'
import Home from './home/Home.jsx'
import Booking from './pages/Booking.jsx'
import Hospitals from './pages/Hospitals.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'

// المكون الرئيسي للتطبيق: يحدد الصفحات ومسارات التنقل بينها
function App() {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/hospitals" element={<Hospitals />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
