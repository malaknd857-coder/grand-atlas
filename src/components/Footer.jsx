
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="footer">
            <div className="container footer-grid">

                <div className="footer-brand">
                    <div className="logo footer-logo">
                        <span className="logo-mark">G</span>
                        <span>GRAND ATLAS</span>
                    </div>
                    <p>Luxury Real Estate Experiences</p>
                    <p>support@gt.agency</p>
                    <p>+20 101 234 5678</p>
                </div>

                <div>
                    <h4>Quick Links</h4>
                    <Link to="/">Home</Link>
                    <Link to="/units">Units</Link>
                    <Link to="/zones">Zones</Link>
                    <Link to="/developers">Developers</Link>
                    <Link to="/contact-us">Contact Us</Link>
                </div>

                <div>
                    <h4>About</h4>
                    <Link to="/">About Grand Atlas</Link>
                    <Link to="/contact-us">Privacy Policy</Link>
                    <Link to="/contact-us">Support</Link>
                </div>

                <div className="footer-subscribe">
                    <h4>Get in touch</h4>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        const email = e.target.email.value;
                        window.location.href =
                            `mailto:support@gt.agency?subject=Newsletter&body=${encodeURIComponent(email)}`;
                    }}>
                        <input
                            type="email"
                            name="email"
                            placeholder="Your email address"
                            required
                        />
                        <button type="submit">Send</button>
                    </form>

                    <div className="social-links">
                        <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram</a>
                        <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">Facebook</a>
                        <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">LinkedIn</a>
                    </div>
                </div>

            </div>

            <div className="footer-bottom">
                © 2026 Grand Atlas. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;
