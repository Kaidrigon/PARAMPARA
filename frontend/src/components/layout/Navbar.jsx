import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const menuItems = [
    { label: "Sources", path: "/sources", angle: -135 },
    { label: "Traditions", path: "/traditions", angle: -90 },
    { label: "Timeline", path: "/timeline", angle: -45 },
    { label: "Janmashtami", path: "/janmashtami", angle: 0 },
];

function BirdIcon({ flying = false, open = false }) {
    return (
    <svg
        className={`bird-icon ${open ? "bird-icon--open" : ""} ${
        flying ? "bird-icon--flying" : ""
        }`}
        viewBox="0 0 80 60"
        aria-hidden="true"
    >
      {/* body */}
        <ellipse
        className="bird-body"
        cx="40"
        cy="34"
        rx="13"
        ry="8"
        />

      {/* head */}
        <circle
        className="bird-head"
        cx="51"
        cy="27"
        r="7"
        />

      {/* beak */}
        <path
        className="bird-beak"
        d="M57 27 L67 30 L57 32"
        />

      {/* tail */}
        <path
        className="bird-tail"
        d="M28 34 L12 27 L20 36 L10 43 L30 39"
        />

      {/* left wing */}
        <path
        className="bird-wing bird-wing--left"
        d="M35 32 C24 25 18 17 20 9 C29 13 36 20 40 29"
        />

      {/* right wing */}
        <path
        className="bird-wing bird-wing--right"
        d="M44 30 C54 22 61 15 59 8 C51 12 45 19 40 29"
        />

      {/* eye */}
        <circle
        className="bird-eye"
        cx="53"
        cy="25"
        r="1.3"
        />
    </svg>
    );
}

export default function Navbar() {
    const navigate = useNavigate();
    const menuRef = useRef(null);

    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isFlying, setIsFlying] = useState(false);
    const [selectedPath, setSelectedPath] = useState(null);

    useEffect(() => {
    const handleScroll = () => {
        setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
        window.removeEventListener("scroll", handleScroll);
    };
    }, []);

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
        document.removeEventListener("pointerdown", handlePointerDown);
    };
    }, [isOpen]);

    const handleExplore = () => {
    setIsOpen(false);

    if (window.location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
        document.getElementById("explore")?.scrollIntoView({
            behavior: "smooth",
        });
        }, 100);
        return;
    }

    document.getElementById("explore")?.scrollIntoView({
        behavior: "smooth",
    });
    };

    const handleBirdToggle = () => {
    if (isFlying) return;

    setIsOpen((current) => !current);
    };

    const handleNavigation = (path) => {
    setSelectedPath(path);
    setIsFlying(true);

    setTimeout(() => {
        navigate(path);

        setIsOpen(false);
        setIsFlying(false);
        setSelectedPath(null);
    }, 520);
    };

    return (
    <header
        className={`navbar ${
        scrolled ? "navbar--scrolled" : ""
        }`}
    >
        <div className="container navbar__inner">
        <Link to="/" className="brand" onClick={() => setIsOpen(false)}>
            <div className="brand__name">PARAMPARA</div>
            <div className="brand__sub">
            INDIAN KNOWLEDGE SYSTEMS
            </div>
        </Link>

        <nav className="navbar__links" aria-label="Main navigation">
            <button
            type="button"
            className="navbar__text-link"
            onClick={handleExplore}
            >
            Explore
            </button>

            <Link to="/sources">Sources</Link>
            <Link to="/traditions">Traditions</Link>
            <Link to="/timeline">Timeline</Link>

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
            BEGIN EXPLORING <span>→</span>
            </button>
        </nav>

        <div
            ref={menuRef}
            className={`bird-menu ${
            isOpen ? "bird-menu--open" : ""
            } ${isFlying ? "bird-menu--flying" : ""}`}
        >
            <div className="bird-menu__items">
            {menuItems.map((item) => (
                <button
                key={item.path}
                type="button"
                className={`bird-menu__item ${
                    selectedPath === item.path
                    ? "bird-menu__item--selected"
                    : ""
                }`}
                style={{
                    "--item-angle": `${item.angle}deg`,
                }}
                onClick={() => handleNavigation(item.path)}
                >
                <span className="bird-menu__label">
                    {item.label}
                </span>
                </button>
            ))}
            </div>

            <button
            className="mobile-menu-button"
            type="button"
            aria-label={isOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={isOpen}
            onClick={handleBirdToggle}
            >
            <BirdIcon open={isOpen} flying={isFlying} />
            </button>
        </div>
        </div>
    </header>
    );
}