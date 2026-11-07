
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
    const [open, setOpen] = useState(false);

    const links = [
        { name: "Home", path: "/" },
        { name: "Units", path: "/units" },
        { name: "Zones", path: "/zones" },
        { name: "Developers", path: "/developers" },
        { name: "Contact Us", path: "/contact-us" }
    ];

    return (
        <header className="navbar">
            <div className="container nav-content">
                <Link to="/" className="logo">
                    <span className="logo-mark">G</span>
                    <span>GRAND ATLAS</span>
                </Link>

                <nav className={`nav-links ${open ? "active" : ""}`}>
                    {links.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            onClick={() => setOpen(false)}
                            className={({ isActive }) =>
                                isActive ? "nav-link selected" : "nav-link"
                            }
                        >
                            {link.name}
                        </NavLink>
                    ))}

                    <Link
                        to="/contact-us"
                        className="btn btn-primary mobile-register"
                        onClick={() => setOpen(false)}
                    >
                        Register
                    </Link>
                </nav>

                <Link to="/contact-us" className="btn btn-primary register-btn">
                    Register
                </Link>

                <button
                    className="menu-toggle"
                    onClick={() => setOpen(!open)}
                    aria-label="Toggle navigation"
                >
                    {open ? <X /> : <Menu />}
                </button>
            </div>
        </header>
    );
};

export default Navbar;
