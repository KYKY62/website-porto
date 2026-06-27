import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SplashProvider } from "./context/SplashContext";
import SplashOverlay from "./components/SplashOverlay";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import AllProjectsPage from "./pages/AllProjectsPage";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
  return (
    <Router>
      <SplashProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/project/:id" element={<DetailPage />} />
          <Route path="/projects" element={<AllProjectsPage />} />
        </Routes>
        <SplashOverlay />
        <Analytics />
        <SpeedInsights />
      </SplashProvider>
    </Router>
  );
}

export default App;
