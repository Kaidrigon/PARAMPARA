import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import "./Navbar.css";

const menuItems = [
  { label: "Sources", path: "/sources" },
  { label: "Traditions", path: "/traditions" },
  { label: "Timeline", path: "/timeline" },
  { label: "Janmashtami", path: "/janmashtami" },
];

function BirdIcon({ flying = false, open = false }) {
  return (
    <svg
      className={`bird-icon ${
        open ? "bird-icon--open" : ""
      } ${flying ? "bird-icon--flying" : ""}`}
      viewBox="0 0 100 76"
      aria-hidden="true"
    >
      {/* Tail */}
      <path
        className="bird-tail"
        d="M30 45 C20 40 12 35 7 27
           C17 29 27 32 36 37
           C27 38 18 43 10 51
           C20 49 28 48 35 48"
      />

      {/* Body */}
      <path
        className="bird-body"
        d="M29 43
           C30 32 39 25 52 25
           C64 25 73 32 73 40
           C73 48 64 53 51 53
           C40 53 32 50 29 43 Z"
      />

      {/* Head */}
      <path
        className="bird-head"
        d="M59 27
           C59 19 65 14 73 15
           C80 16 84 21 83 28
           C82 35 77 39 70 38
           C64 37 60 33 59 27 Z"
      />

      {/* Beak */}
      <path
        className="bird-beak"
        d="M81 25 L96 30 L81 34 Z"
      />

      {/* Left wing */}
      <path
        className="bird-wing bird-wing--left"
        d="M49 38
           C39 35 28 27 23 17
           C32 18 43 21 52 29
           C56 33 56 37 49 38 Z"
      />

      {/* Right wing */}
      <path
        className="bird-wing bird-wing--right"
        d="M52 36
           C61 29 70 21 74 12
           C65 14 55 18 48 26
           C44 31 46 35 52 36 Z"
      />

      {/* Eye */}
      <circle
        className="bird-eye"
        cx="74"
        cy="23"
        r="2"
      />

      {/* Chest feather */}
      <path
        className="bird-feather"
        d="M61 39 C66 41 68 45 66 49"
      />
    </svg>
  );
}

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuRef = useRef(null);
  const touchStartY = useRef(null);
  const lastWheelTime = useRef(0);

  const isHome = location.pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isFlying, setIsFlying] = useState(false);
  const [selectedPath, setSelectedPath] = useState(null);

  const [dialRotation, setDialRotation] = useState(0);

  /*
    Direction in which the bird should fly.

    Values are CSS transforms:
    x = horizontal movement
    y = vertical movement
    rotate = direction the bird faces
  */
  const [flightDirection, setFlightDirection] = useState({
    x: 100,
    y: -70,
    rotate: -15,
  });

  /* ---------------------------------------------
     PAGE SCROLL
  --------------------------------------------- */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* ---------------------------------------------
     RESET WHEN PAGE CHANGES
  --------------------------------------------- */

  useEffect(() => {
    setIsOpen(false);
    setIsFlying(false);
    setSelectedPath(null);
    setDialRotation(0);

    setFlightDirection({
      x: 100,
      y: -70,
      rotate: -15,
    });
  }, [location.pathname]);

  /* ---------------------------------------------
     ESCAPE
  --------------------------------------------- */

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  /* ---------------------------------------------
     CLICK OUTSIDE
  --------------------------------------------- */

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener(
        "pointerdown",
        handlePointerDown
      );
    };
  }, [isOpen]);

  /* ---------------------------------------------
     EXPLORE
  --------------------------------------------- */

  const handleExplore = () => {
    setIsOpen(false);

    if (location.pathname !== "/") {
      navigate("/");

      setTimeout(() => {
        document
          .getElementById("explore")
          ?.scrollIntoView({
            behavior: "smooth",
          });
      }, 180);

      return;
    }

    document
      .getElementById("explore")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  /* ---------------------------------------------
     BIRD TOGGLE
  --------------------------------------------- */

  const handleBirdToggle = () => {
    if (isFlying) return;

    setIsOpen((current) => !current);
  };

  /* ---------------------------------------------
     ROTATE DIAL
  --------------------------------------------- */

  const rotateDial = (amount) => {
    if (!isOpen || isFlying) return;

    setDialRotation((current) => current + amount);
  };

  /* ---------------------------------------------
     WHEEL / TRACKPAD
  --------------------------------------------- */

  const handleWheel = (event) => {
    if (!isOpen || isFlying) return;

    const now = Date.now();

    if (now - lastWheelTime.current < 12) {
      return;
    }

    lastWheelTime.current = now;

    event.preventDefault();

    const delta =
      Math.abs(event.deltaY) > Math.abs(event.deltaX)
        ? event.deltaY
        : event.deltaX;

    rotateDial(delta * 0.28);
  };

  /* ---------------------------------------------
     TOUCH
  --------------------------------------------- */

  const handleTouchStart = (event) => {
    if (!isOpen || isFlying) return;

    touchStartY.current =
      event.touches[0].clientY;
  };

  const handleTouchMove = (event) => {
    if (
      !isOpen ||
      isFlying ||
      touchStartY.current === null
    ) {
      return;
    }

    event.preventDefault();

    const currentY =
      event.touches[0].clientY;

    const difference =
      touchStartY.current - currentY;

    if (Math.abs(difference) > 1) {
      rotateDial(difference * 0.45);

      touchStartY.current = currentY;
    }
  };

  const handleTouchEnd = () => {
    touchStartY.current = null;
  };

  /* ---------------------------------------------
     CALCULATE ITEM ANGLE
  --------------------------------------------- */

  const getItemAngle = (index) => {
    const total = menuItems.length;

    if (total === 1) {
      return -90;
    }

    const startAngle = -155;
    const endAngle = 15;

    return (
      startAngle +
      ((endAngle - startAngle) /
        (total - 1)) *
        index
    );
  };

  /* ---------------------------------------------
     BIRD FLIGHT DIRECTION
     
     Calculate direction based on the ACTUAL
     position of the clicked menu item.
  --------------------------------------------- */

  const calculateFlightDirection = (event) => {
    const birdElement =
      menuRef.current?.querySelector(
        ".mobile-menu-button"
      );

    if (!birdElement) {
      return {
        x: 100,
        y: -70,
        rotate: -15,
      };
    }

    const birdRect =
      birdElement.getBoundingClientRect();

    const birdX =
      birdRect.left + birdRect.width / 2;

    const birdY =
      birdRect.top + birdRect.height / 2;

    const target = event.currentTarget;

    const targetRect =
      target.getBoundingClientRect();

    const targetX =
      targetRect.left +
      targetRect.width / 2;

    const targetY =
      targetRect.top +
      targetRect.height / 2;

    let dx = targetX - birdX;
    let dy = targetY - birdY;

    /*
      Normalize the direction so every flight
      travels a similar visual distance.
    */

    const distance =
      Math.sqrt(dx * dx + dy * dy) || 1;

    const flightDistance = 150;

    dx =
      (dx / distance) *
      flightDistance;

    dy =
      (dy / distance) *
      flightDistance;

    /*
      Bird faces right naturally.

      If target is on the left, flip it.
    */

    const rotate =
      Math.atan2(dy, Math.abs(dx)) *
      (180 / Math.PI) *
      0.45;

    return {
      x: dx,
      y: dy,
      rotate:
        dx < 0
          ? 180 - rotate
          : rotate,
    };
  };

  /* ---------------------------------------------
     NAVIGATION
  --------------------------------------------- */

  const handleNavigation = (
    path,
    event
  ) => {
    if (isFlying) return;

    const direction =
      calculateFlightDirection(event);

    setFlightDirection(direction);

    setSelectedPath(path);

    setIsFlying(true);

    setTimeout(() => {
      navigate(path);

      setIsOpen(false);
      setIsFlying(false);
      setSelectedPath(null);
      setDialRotation(0);
    }, 700);
  };

  return (
    <header
      className={`navbar ${
        isHome
          ? "navbar--home"
          : "navbar--inner-page"
      } ${
        scrolled
          ? "navbar--scrolled"
          : ""
      }`}
    >
      <div className="navbar__inner">

        {/* HOME BRAND */}

        {isHome && (
          <Link
            to="/"
            className="brand"
            onClick={() =>
              setIsOpen(false)
            }
          >
            <div className="brand__name">
              PARAMPARA
            </div>

            <div className="brand__sub">
              INDIAN KNOWLEDGE SYSTEMS
            </div>
          </Link>
        )}

        {/* DESKTOP NAV */}

        {isHome && (
          <nav
            className="navbar__links"
            aria-label="Main navigation"
          >
            <button
              type="button"
              className="navbar__text-link"
              onClick={handleExplore}
            >
              Explore
            </button>

            <Link to="/sources">
              Sources
            </Link>

            <Link to="/traditions">
              Traditions
            </Link>

            <Link to="/timeline">
              Timeline
            </Link>

            <a
              href="https://github.com/Kaidrigon/PARAMPARA"
              target="_blank"
              rel="noreferrer"
            >
              About
            </a>

            <button
              className="nav-button"
              type="button"
              onClick={handleExplore}
            >
              BEGIN EXPLORING
              <span>→</span>
            </button>
          </nav>
        )}

        {/* BIRD NAVIGATION */}

        <div
          ref={menuRef}
          className={`bird-menu ${
            isOpen
              ? "bird-menu--open"
              : ""
          } ${
            isFlying
              ? "bird-menu--flying"
              : ""
          }`}
          style={{
            "--flight-x": `${flightDirection.x}px`,
            "--flight-y": `${flightDirection.y}px`,
            "--flight-rotate": `${flightDirection.rotate}deg`,
          }}
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >

          {/* Orbit ring */}

          <div className="bird-menu__ring" />

          {/* Rotating dial */}

          <div
            className="bird-menu__items"
            aria-hidden={!isOpen}
            style={{
              transform: `rotate(${dialRotation}deg)`,
            }}
          >
            {menuItems.map(
              (item, index) => {
                const angle =
                  getItemAngle(index);

                return (
                  <button
                    key={item.path}
                    type="button"
                    className={`bird-menu__item ${
                      selectedPath ===
                      item.path
                        ? "bird-menu__item--selected"
                        : ""
                    }`}
                    style={{
                      "--item-angle": `${angle}deg`,
                    }}
                    onClick={(event) =>
                      handleNavigation(
                        item.path,
                        event
                      )
                    }
                  >
                    <span className="bird-menu__item-dot" />

                    <span
                      className="bird-menu__label"
                      style={{
                        transform: `rotate(${-dialRotation}deg)`,
                      }}
                    >
                      {item.label}
                    </span>
                  </button>
                );
              }
            )}
          </div>

          {/* Bird */}

          <button
            className="mobile-menu-button"
            type="button"
            aria-label={
              isOpen
                ? "Close navigation"
                : "Open navigation"
            }
            aria-expanded={isOpen}
            onClick={handleBirdToggle}
          >
            <span className="bird-menu__halo" />

            <BirdIcon
              open={isOpen}
              flying={isFlying}
            />
          </button>
        </div>
      </div>
    </header>
  );
}
