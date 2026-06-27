import { useSplash } from "../context/SplashContext";
import "./SplashOverlay.css";

export default function SplashOverlay() {
  const { phase, showContent, hide } = useSplash();

  if (phase === "hidden") return null;

  const className = `splash-overlay ${phase === "fading" ? "splash-fadeout" : "splash-visible"}`;

  return (
    <div className={className} aria-hidden="true" onTransitionEnd={hide}>
      {showContent && (
        <div className="splash-content">
          <h1 className="splash-name">Rizky Akbar Siregar</h1>
          <p className="splash-role">Full-Stack Developer</p>
          <p className="splash-role">Loading....</p>
        </div>
      )}
    </div>
  );
}
