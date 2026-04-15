import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { HomePage } from './pages/HomePage';
import { BrandsPage } from './pages/BrandsPage';
import { BrandDetailPage } from './pages/BrandDetailPage';
import { KitsPage } from './pages/KitsPage';
import { KitDetailPage } from './pages/KitDetailPage';
import { AboutPage } from './pages/AboutPage';
import { PlannerPage } from './pages/PlannerPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isPlanner = location.pathname === '/planner';

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <ScrollToTop />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 print:static print:bg-white print:border-none">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <Link
              to="/"
              className="flex items-center gap-2 text-gray-900 font-bold text-lg hover:text-blue-600 transition-colors"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
                  />
                </svg>
              </div>
              <span className="hidden sm:inline">Cold Plan</span>
            </Link>
            {!isHome && !isPlanner && (
              <nav className="flex items-center gap-4 text-sm print:hidden">
                <Link to="/brands" className="text-gray-500 hover:text-blue-600 transition-colors">
                  Brands
                </Link>
                <Link to="/kits" className="text-gray-500 hover:text-blue-600 transition-colors">
                  Kits
                </Link>
                <Link to="/planner" className="text-gray-500 hover:text-blue-600 transition-colors">
                  Planner
                </Link>
              </nav>
            )}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-3xl mx-auto px-4 py-6 pb-24">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/brands" element={<BrandsPage />} />
          <Route path="/brands/:brandId" element={<BrandDetailPage />} />
          <Route path="/kits" element={<KitsPage />} />
          <Route path="/kits/:kitId" element={<KitDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/planner" element={<PlannerPage />} />
          {/* Catch-all: redirect to home */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white print:border-none">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-6">
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Product</h3>
              <ul className="space-y-1.5">
                <li><Link to="/planner" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">Symptom Planner</Link></li>
                <li><Link to="/brands" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">Brand Lookup</Link></li>
                <li><Link to="/kits" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">Shop Kits</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Kits</h3>
              <ul className="space-y-1.5">
                <li><Link to="/kits/home" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">Home Kit</Link></li>
                <li><Link to="/kits/travel" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">Travel Kit</Link></li>
                <li><Link to="/kits/college" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">College Kit</Link></li>
                <li><Link to="/kits/office" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">Office Kit</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Popular Brands</h3>
              <ul className="space-y-1.5">
                <li><Link to="/brands/nyquil-cold-flu" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">NyQuil</Link></li>
                <li><Link to="/brands/dayquil-cold-flu" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">DayQuil</Link></li>
                <li><Link to="/brands/advil-pm" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">Advil PM</Link></li>
                <li><Link to="/brands/mucinex-dm" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">Mucinex DM</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Info</h3>
              <ul className="space-y-1.5">
                <li><Link to="/about" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">About</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-4 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-400">
              Cold Plan is for informational purposes only. Not medical advice.
              As an Amazon Associate, Cold Plan earns from qualifying purchases.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
