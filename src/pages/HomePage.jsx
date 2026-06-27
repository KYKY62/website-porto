import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import projects from "../data/projects";
import { useSplash } from "../context/SplashContext";
import { preloadImages } from "../utils/preloadImages";
import "./HomePage.css";

const VISIBLE_COUNT = 7;
const PROXIMITY_THRESHOLD = 340;

function HomePage() {
  const navigate = useNavigate();
  const { show } = useSplash();
  const nameRef = useRef(null);
  const cardsRef = useRef([]);
  const isVisibleRef = useRef(false);
  const isMobile = useRef(false);
  const tlRef = useRef(null);
  const rotationsRef = useRef([]);
  const [mobileBtnText, setMobileBtnText] = useState(false);
  const [isLoadingProjects, setIsLoadingProjects] = useState(false);

  const visibleProjects = projects.slice(0, VISIBLE_COUNT);

  useEffect(() => {
    const rots = [];
    for (let i = 0; i < VISIBLE_COUNT; i++) {
      rots.push((Math.random() - 0.5) * 8);
    }
    rotationsRef.current = rots;
  }, []);

  const getCardDimensions = useCallback(() => {
    const vw = window.innerWidth;
    if (vw <= 480) return { w: 110, h: 155 };
    if (vw <= 768) return { w: 150, h: 210 };
    if (vw <= 1024) return { w: 180, h: 240 };
    return { w: 200, h: 260 };
  }, []);

  const getCardPositions = useCallback(() => {
    const positions = [];
    const count = visibleProjects.length;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const { w: cardW, h: cardH } = getCardDimensions();
    const centerX = vw / 2;
    const centerY = vh / 2;

    const padding = 40;
    const maxRadiusX = (vw - cardW - padding) / 2;
    const maxRadiusY = (vh - cardH - padding) / 2;

    let rx, ry;
    if (vw <= 480) {
      rx = Math.min(vw * 0.38, maxRadiusX);
      ry = Math.min(vh * 0.35, maxRadiusY);
    } else if (vw <= 768) {
      rx = Math.min(vw * 0.4, maxRadiusX);
      ry = Math.min(vh * 0.38, maxRadiusY);
    } else if (vw <= 1024) {
      rx = Math.min(vw * 0.38, maxRadiusX);
      ry = Math.min(vh * 0.4, maxRadiusY);
    } else {
      rx = Math.min(vw * 0.36, maxRadiusX);
      ry = Math.min(vh * 0.42, maxRadiusY);
    }

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count - Math.PI / 2;
      const x = centerX + Math.cos(angle) * rx - cardW / 2;
      const y = centerY + Math.sin(angle) * ry - cardH / 2;
      positions.push({ x, y });
    }
    return positions;
  }, [visibleProjects.length, getCardDimensions]);

  const getCenterX = useCallback(() => {
    const { w } = getCardDimensions();
    return window.innerWidth / 2 - w / 2;
  }, [getCardDimensions]);

  const getCenterY = useCallback(() => {
    const { h } = getCardDimensions();
    return window.innerHeight / 2 - h / 2;
  }, [getCardDimensions]);

  const showCards = useCallback(() => {
    if (isVisibleRef.current) return;
    isVisibleRef.current = true;

    const tl = tlRef.current;
    if (tl) tl.kill();

    const positions = getCardPositions();
    const newTl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tlRef.current = newTl;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      const pos = positions[i] || { x: 0, y: 0 };
      card.style.pointerEvents = "auto";
      card.classList.add("floating");

      newTl.to(
        card,
        {
          x: pos.x,
          y: pos.y,
          opacity: 1,
          scale: 1,
          rotation: rotationsRef.current[i] || 0,
          filter: "blur(0px)",
          duration: 0.85,
        },
        i * 0.07,
      );
    });
  }, [getCardPositions]);

  const hideCards = useCallback(() => {
    if (!isVisibleRef.current) return;
    isVisibleRef.current = false;

    const tl = tlRef.current;
    if (tl) tl.kill();

    const centerX = getCenterX();
    const centerY = getCenterY();

    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      card.style.pointerEvents = "none";
      card.classList.remove("floating");
      gsap.to(card, {
        x: centerX,
        y: centerY,
        opacity: 0,
        scale: 0.4,
        rotation: (rotationsRef.current[i] || 0) + (i % 2 === 0 ? 12 : -12),
        filter: "blur(8px)",
        duration: 0.55,
        ease: "power3.in",
        delay: i * 0.03,
      });
    });
  }, [getCenterX, getCenterY]);

  const toggleCards = useCallback(() => {
    if (isVisibleRef.current) {
      hideCards();
      setMobileBtnText(false);
    } else {
      showCards();
      setMobileBtnText(true);
    }
  }, [showCards, hideCards]);

  useEffect(() => {
    isMobile.current = "ontouchstart" in window || window.innerWidth <= 768;

    const cards = cardsRef.current.filter(Boolean);
    const cx = getCenterX();
    const cy = getCenterY();

    cards.forEach((card, i) => {
      gsap.set(card, {
        x: cx,
        y: cy,
        opacity: 0,
        scale: 0.4,
        rotation: (rotationsRef.current[i] || 0) + (i % 2 === 0 ? 15 : -15),
        filter: "blur(10px)",
      });
    });

    gsap.fromTo(
      nameRef.current,
      { opacity: 0, y: 30, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
      },
    );

    if (!isMobile.current) {
      let showTimeout = null;
      let proximityActive = false;

      const handleMouseMove = (e) => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const dist = Math.sqrt(
          Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2),
        );

        if (dist < PROXIMITY_THRESHOLD && !proximityActive) {
          proximityActive = true;
          clearTimeout(showTimeout);
          showCards();
        } else if (dist >= PROXIMITY_THRESHOLD && proximityActive) {
          proximityActive = false;
          showTimeout = setTimeout(() => {
            hideCards();
          }, 700);
        }
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        clearTimeout(showTimeout);
        const tl = tlRef.current;
        if (tl) tl.kill();
      };
    }

    return () => {
      const tl = tlRef.current;
      if (tl) tl.kill();
    };
  }, [showCards, hideCards, getCenterX, getCenterY]);

  useEffect(() => {
    const handleResize = () => {
      if (isVisibleRef.current) {
        const positions = getCardPositions();
        cardsRef.current.forEach((card, i) => {
          if (!card) return;
          const pos = positions[i] || { x: 0, y: 0 };
          gsap.to(card, {
            x: pos.x,
            y: pos.y,
            rotation: rotationsRef.current[i] || 0,
            duration: 0.5,
            ease: "power3.out",
          });
        });
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [getCardPositions]);

  const handleCardClick = (id) => navigate(`/project/${id}`);

  const handleCardEnter = (card) => {
    gsap.to(card, {
      scale: 1.05,
      rotation: 0,
      duration: 0.35,
      ease: "power2.out",
    });
    card.style.zIndex = "30";
  };

  const handleCardLeave = (card) => {
    const i = cardsRef.current.indexOf(card);
    gsap.to(card, {
      scale: 1,
      rotation: rotationsRef.current[i >= 0 ? i : 0] || 0,
      duration: 0.35,
      ease: "power2.out",
    });
    card.style.zIndex = "20";
  };

  return (
    <div className="hero">
      <div className="cards-container">
        {visibleProjects.map((project, index) => (
          <div
            key={project.id}
            className="project-card"
            ref={(el) => (cardsRef.current[index] = el)}
            onClick={() => handleCardClick(project.id)}
            onMouseEnter={() => handleCardEnter(cardsRef.current[index])}
            onMouseLeave={() => handleCardLeave(cardsRef.current[index])}
          >
            <img src={project.thumbnail} alt={project.title} loading="lazy" />
            <div className="card-info">
              <h3>{project.title}</h3>
              <div className="card-tags">
                {project.stack.slice(0, 3).map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="hero-name" ref={nameRef}>
        <h1>Rizky Akbar Siregar</h1>
        <p>Full-Stack Developer</p>
      </div>

      {!isMobile.current && (
        <p className="hero-hint">Move your cursor closer to explore projects</p>
      )}

      <div className="action-buttons">
        <a
          href="https://drive.google.com/file/d/1-ivKqBExvPZNnVniuWYaNE88cqCCwtT7/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="cv-btn action-item"
          aria-label="Download CV"
        >
          <span className="cv-btn-icon action-icon" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </span>
          <span className="action-label">Download CV</span>
        </a>

        <button
          className="more-btn action-item"
          onClick={async () => {
            if (isLoadingProjects) return;
            setIsLoadingProjects(true);
            const MIN_SPLASH = 5000;
            const urls = projects.flatMap((p) => [
              p.thumbnail,
              ...(p.images || []),
            ]);
            show(MIN_SPLASH);
            await Promise.all([
              preloadImages(urls),
              new Promise((resolve) => setTimeout(resolve, MIN_SPLASH)),
            ]);
            navigate("/projects");
          }}
          disabled={isLoadingProjects}
          aria-label="Explore All Projects"
        >
          <span className="more-btn-icon action-icon" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
          <span className="action-label">Explore Projects</span>
        </button>

        <button
          className="mobile-toggle action-item"
          onClick={toggleCards}
          aria-label={mobileBtnText ? "Hide Projects" : "Show Projects"}
        >
          <span className="action-icon" aria-hidden="true">
            {mobileBtnText ? (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
            )}
          </span>
          <span className="action-label">
            {mobileBtnText ? "Hide" : "Projects"}
          </span>
        </button>
      </div>
    </div>
  );
}

export default HomePage;
