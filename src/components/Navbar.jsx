import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar({ watchlistCount }) {
  const location = useLocation();
  return (
    <nav className="navbar">
      <div className="scene-bg"><div className="grid-lines" /></div>
      <Link to="/" className="nav-logo">
        <span className="logo-play">▶</span>
        <span className="logo-text">CINE<span className="logo-accent">SEARCH</span></span>
      </Link>
      <div className="nav-center">
        <span className="nav-tag">Powered by OMDB</span>
      </div>
      <div className="nav-links">
        <Link to="/" className={`nav-link ${location.pathname === "/" ? "active" : ""}`}>
          <span className="nav-icon">⬡</span> Home
        </Link>
        <Link to="/watchlist" className={`nav-link watchlist-link ${location.pathname === "/watchlist" ? "active" : ""}`}>
          <span className="nav-icon">♥</span> Watchlist
          {watchlistCount > 0 && <span className="wl-badge">{watchlistCount}</span>}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
