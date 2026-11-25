import { Routes, Route } from "react-router-dom";
import { SplashProvider } from "./context/SplashContext";
import SplashOverlay from "./components/SplashOverlay";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import AllProjectsPage from "./pages/AllProjectsPage";
import NotFoundPage from './pages/NotFoundPage';
import Seo from './components/Seo';

// Indonesian (default) has no prefix; English pages live under /en.
const prefixes = ["", "/en"];

function App() {
  return (
    <>
      <Seo />
      <SplashProvider>
        <Routes>
          {prefixes.map((prefix) => [
            <Route key={`${prefix}/`} path={prefix || "/"} element={<HomePage />} />,
            <Route key={`${prefix}/project`} path={`${prefix}/project/:id`} element={<DetailPage />} />,
            <Route key={`${prefix}/projects`} path={`${prefix}/projects`} element={<AllProjectsPage />} />,
          ])}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <SplashOverlay />
      </SplashProvider>
    </>
  );
}

export default App;
