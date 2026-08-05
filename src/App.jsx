import { Routes, Route } from 'react-router-dom'
import Navbar from './home/Navbar.jsx'
import Footer from './home/Footer.jsx'
import Home from './home/Home.jsx'
import Booking from './pages/Booking.jsx'
import Hospitals from './pages/Hospitals.jsx'
import RequestBlood from './pages/RequestBlood.jsx'
import FindBlood from './pages/FindBlood.jsx'
import BloodAvailability from './pages/BloodAvailability.jsx'
import TrackRequest from './pages/TrackRequest.jsx'
import PatientDashboard from './pages/PatientDashboard.jsx'
import NotificationsPage from './pages/NotificationsPage.jsx'
import DonationCampaigns from './pages/DonationCampaigns.jsx'
import HospitalsMap from './pages/HospitalsMap.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import { BloodRequestProvider } from './context/BloodRequestContext.jsx'

// المكون الرئيسي للتطبيق: يحدد الصفحات ومسارات التنقل بينها مع مزود إدارة طلبات الدم
function App() {
  return (
    <BloodRequestProvider>
      <div className="min-h-screen flex flex-col bg-cream">
        <ScrollToTop />
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/request-blood" element={<RequestBlood />} />
            <Route path="/find-blood" element={<FindBlood />} />
            <Route path="/availability" element={<BloodAvailability />} />
            <Route path="/track-request" element={<TrackRequest />} />
            <Route path="/dashboard" element={<PatientDashboard />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/campaigns" element={<DonationCampaigns />} />
            <Route path="/map" element={<HospitalsMap />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/hospitals" element={<Hospitals />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BloodRequestProvider>
  )
}

export default App
