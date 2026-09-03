import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
    return (
    <header className="navbar">
        <Link to="/" className="navbar__brand">
        <span className="navbar__mark">P</span>

        <span className="navbar__name">
            PARAMPARA
        </span>
        </Link>

        <nav className="navbar__links">
        <Link to="/verify">Verify</Link>
        <Link to="/trace">Trace</Link>
        <Link to="/explore">Explore</Link>
        <Link to="/apply">Apply</Link>
        <Link to="/learn">Learn</Link>
        </nav>

        <button className="navbar__menu" aria-label="Open menu">
        Menu
        </button>
    </header>
    );
}