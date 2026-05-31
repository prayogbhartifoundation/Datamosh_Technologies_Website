import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "sonner";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import ServiceCategoryPage from "@/pages/ServiceCategoryPage";
import ServiceDetailPage from "@/pages/ServiceDetailPage";
import IndustriesPage from "@/pages/IndustriesPage";
import AboutPage from "@/pages/AboutPage";
import CareersPage from "@/pages/CareersPage";
import ContactPage from "@/pages/ContactPage";
import ResourcesPage from "@/pages/ResourcesPage";
import ResourceDetailPage from "@/pages/ResourceDetailPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [pathname]);
  return null;
}

function Layout({ children }) {
  return (
    <div className="App min-h-screen flex flex-col bg-white text-slate-900">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Toaster position="top-right" richColors closeButton />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services/:categorySlug" element={<ServiceCategoryPage />} />
            <Route path="/services/:categorySlug/:serviceSlug" element={<ServiceDetailPage />} />
            <Route path="/industries" element={<IndustriesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/resources/:slug" element={<ResourceDetailPage />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
