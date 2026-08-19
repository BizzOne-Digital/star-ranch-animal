import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';
import ScrollToTop from './components/ScrollToTop';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './admin/components/ProtectedRoute';
import AdminLayout from './admin/layouts/AdminLayout';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Booking = lazy(() => import('./pages/Booking'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Support = lazy(() => import('./pages/Support'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

const AdminLogin = lazy(() => import('./admin/pages/AdminLogin'));
const Dashboard = lazy(() => import('./admin/pages/Dashboard'));
const AdminBookings = lazy(() => import('./admin/pages/AdminBookings'));
const AdminServices = lazy(() => import('./admin/pages/AdminServices'));
const AdminGallery = lazy(() => import('./admin/pages/AdminGallery'));
const AdminDonations = lazy(() => import('./admin/pages/AdminDonations'));
const AdminMessages = lazy(() => import('./admin/pages/AdminMessages'));
const AdminSettings = lazy(() => import('./admin/pages/AdminSettings'));

const PageLoader = () => (
  <div className="page-loader">
    <div className="loading-spinner" />
  </div>
);

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Public routes */}
              <Route element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="our-story" element={<About />} />
                <Route path="services" element={<Services />} />
                <Route path="booking" element={<Booking />} />
                <Route path="gallery" element={<Gallery />} />
                <Route path="support" element={<Support />} />
                <Route path="contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Route>

              {/* Admin routes */}
              <Route path="admin/login" element={<AdminLogin />} />
              <Route path="admin" element={<ProtectedRoute />}>
                <Route element={<AdminLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="bookings" element={<AdminBookings />} />
                  <Route path="services" element={<AdminServices />} />
                  <Route path="gallery" element={<AdminGallery />} />
                  <Route path="donations" element={<AdminDonations />} />
                  <Route path="messages" element={<AdminMessages />} />
                  <Route path="settings" element={<AdminSettings />} />
                </Route>
              </Route>
            </Routes>
          </Suspense>
          <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
        </BrowserRouter>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
