import { Routes, Route } from "react-router-dom";
import { SplashProvider } from "./context/SplashContext";
import SplashOverlay from "./components/SplashOverlay";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import AllProjectsPage from "./pages/AllProjectsPage";
import NotFoundPage from './pages/NotFoundPage';
import Seo from './components/Seo';

function App() {
  return (
    <>
      <Seo />
      <SplashProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/project/:id" element={<DetailPage />} />
          <Route path="/projects" element={<AllProjectsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <SplashOverlay />
      </SplashProvider>
    </>
  );
}

export default App;
