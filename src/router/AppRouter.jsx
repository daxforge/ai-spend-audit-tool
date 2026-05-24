import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Outlet } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AnimatedBackground from "../components/AnimatedBackground";

// Import pages
import LandingPage from "../pages/LandingPage";
import AuditFormPage from "../pages/AuditFormPage";
import ResultsDashboard from "../pages/ResultsDashboard";
import PublicReportPage from "../pages/PublicReportPage";
import NotFoundPage from "../pages/NotFoundPage";

// Layout Wrapper
function Layout() {
  return (
    <div className="flex flex-col min-h-screen relative">
      <AnimatedBackground />
      <Navbar />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

// Route Transition Wrapper
function AnimatedPage({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route 
            index 
            element={
              <AnimatedPage>
                <LandingPage />
              </AnimatedPage>
            } 
          />
          <Route 
            path="audit" 
            element={
              <AnimatedPage>
                <AuditFormPage />
              </AnimatedPage>
            } 
          />
          <Route 
            path="dashboard/:id" 
            element={
              <AnimatedPage>
                <ResultsDashboard />
              </AnimatedPage>
            } 
          />
          <Route 
            path="report/:id" 
            element={
              <AnimatedPage>
                <PublicReportPage />
              </AnimatedPage>
            } 
          />
          <Route 
            path="*" 
            element={
              <AnimatedPage>
                <NotFoundPage />
              </AnimatedPage>
            } 
          />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default function AppRouter() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}
