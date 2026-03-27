import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './contexts/AppContext'
import { AdminProvider } from './admin/AdminContext'
import './index.css'

/* ── Public Pages ── */
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import CityPage from './pages/CityPage'
import DashboardPage from './pages/DashboardPage'
import ItineraryPlannerPage from './pages/ItineraryPlannerPage'
import HotelPage from './pages/HotelPage'
import GroupTripPage from './pages/GroupTripPage'
import PersonalityQuizPage from './pages/PersonalityQuizPage'
import ChatbotPage from './pages/ChatbotPage'
import ExpenseTrackerPage from './pages/ExpenseTrackerPage'
import LeaderboardPage from './pages/LeaderboardPage'
import TripCustomizerPage from './pages/TripCustomizerPage'
import TravelTimelinePage from './pages/TravelTimelinePage'
import TicketManagerPage from './pages/TicketManagerPage'
import PackingChecklistPage from './pages/PackingChecklistPage'
import PhotoSpotsPage from './pages/PhotoSpotsPage'
import WellnessPage from './pages/WellnessPage'
import MarketplacePage from './pages/MarketplacePage'
import VoiceSearchPage from './pages/VoiceSearchPage'
import PredictiveSuggestionsPage from './pages/PredictiveSuggestionsPage'
import CrowdDensityPage from './pages/CrowdDensityPage'
import GeoAlertsPage from './pages/GeoAlertsPage'

/* ── Shared Components ── */
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AuthModal from './components/AuthModal'
import NotificationPanel from './components/NotificationPanel'
import ScrollToTop from './components/ScrollToTop'

/* ── Admin Pages ── */
import AdminLogin from './admin/pages/AdminLogin'
import AdminLayout from './admin/components/AdminLayout'
import AdminDashboard from './admin/pages/AdminDashboard'
import ManageDestinations from './admin/pages/ManageDestinations'
import ManageHotels from './admin/pages/ManageHotels'
import ManageRestaurants from './admin/pages/ManageRestaurants'
import ManageAttractions from './admin/pages/ManageAttractions'
import ManagePackages from './admin/pages/ManagePackages'
import ManageBookings from './admin/pages/ManageBookings'
import ManageUsers from './admin/pages/ManageUsers'
import ManageMedia from './admin/pages/ManageMedia'
import ManageNotifications from './admin/pages/ManageNotifications'
import AdminSettings from './admin/pages/AdminSettings'

/* ── Public Layout Wrapper ── */
function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <AuthModal />
      <NotificationPanel />
      {children}
      <Footer />
    </>
  )
}

function PublicPage({ Component }) {
  return <PublicLayout><Component /></PublicLayout>
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AppProvider>
        <AdminProvider>
          <ScrollToTop />
          <Routes>
            {/* ── Admin Routes (completely separate layout, no public Navbar/Footer) ── */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="destinations" element={<ManageDestinations />} />
              <Route path="hotels" element={<ManageHotels />} />
              <Route path="restaurants" element={<ManageRestaurants />} />
              <Route path="attractions" element={<ManageAttractions />} />
              <Route path="packages" element={<ManagePackages />} />
              <Route path="bookings" element={<ManageBookings />} />
              <Route path="users" element={<ManageUsers />} />
              <Route path="media" element={<ManageMedia />} />
              <Route path="notifications" element={<ManageNotifications />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>

            {/* ── Public Routes ── */}
            <Route path="/" element={<PublicPage Component={HomePage} />} />
            <Route path="/search" element={<PublicPage Component={SearchPage} />} />
            <Route path="/city/:cityId" element={<PublicPage Component={CityPage} />} />
            <Route path="/hotel/:cityId" element={<PublicPage Component={HotelPage} />} />
            <Route path="/dashboard" element={<PublicPage Component={DashboardPage} />} />
            <Route path="/planner" element={<PublicPage Component={ItineraryPlannerPage} />} />
            <Route path="/group-trip" element={<PublicPage Component={GroupTripPage} />} />
            <Route path="/quiz" element={<PublicPage Component={PersonalityQuizPage} />} />
            <Route path="/chatbot" element={<PublicPage Component={ChatbotPage} />} />
            <Route path="/expenses" element={<PublicPage Component={ExpenseTrackerPage} />} />
            <Route path="/leaderboard" element={<PublicPage Component={LeaderboardPage} />} />
            <Route path="/customizer" element={<PublicPage Component={TripCustomizerPage} />} />
            <Route path="/timeline" element={<PublicPage Component={TravelTimelinePage} />} />
            <Route path="/tickets" element={<PublicPage Component={TicketManagerPage} />} />
            <Route path="/packing" element={<PublicPage Component={PackingChecklistPage} />} />
            <Route path="/photo-spots" element={<PublicPage Component={PhotoSpotsPage} />} />
            <Route path="/wellness" element={<PublicPage Component={WellnessPage} />} />
            <Route path="/marketplace" element={<PublicPage Component={MarketplacePage} />} />
            <Route path="/voice-search" element={<PublicPage Component={VoiceSearchPage} />} />
            <Route path="/trending" element={<PublicPage Component={PredictiveSuggestionsPage} />} />
            <Route path="/crowd-density" element={<PublicPage Component={CrowdDensityPage} />} />
            <Route path="/geo-alerts" element={<PublicPage Component={GeoAlertsPage} />} />
          </Routes>
        </AdminProvider>
      </AppProvider>
    </BrowserRouter>
  </StrictMode>
)
