import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className="navbar">
      <button>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          Home
        </Link>
      </button>
      <button>
        <Link to="/about" style={{ textDecoration: "none", color: "inherit" }}>
          About
        </Link>
      </button>
      <button>
        <Link to="/contact" style={{ textDecoration: "none", color: "inherit" }}>
          Contact
        </Link>
      </button>
      <button>
        <Link to="/counter" style={{ textDecoration: "none", color: "inherit" }}>
          Counter
        </Link>
      </button>
      <button>
        <Link to="/movie" style={{ textDecoration: "none", color: "inherit" }}>
          Movies
        </Link>
      </button>
      <button>
        <Link to="/todo" style={{ textDecoration: "none", color: "inherit" }}>
          To Do
        </Link>
      </button>
      <button>
        <Link to="/finance" style={{ textDecoration: "none", color: "inherit" }}>
          Finance
        </Link>
      </button>

      {/* Tambahkan tombol untuk mengubah tema */}
      <button onClick={toggleTheme}>Change Theme</button>
    </nav>
  );
};

export default Navbar;
