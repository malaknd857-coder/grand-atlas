
import { useState } from "react";
import { MapPin, Mail, Phone, Clock } from "lucide-react";
import SectionTitle from "../components/SectionTitle";
import { sendContactMessage } from "../services/contact";

const ContactUs = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const [status, setStatus] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("");

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            setStatus("Please enter a valid email address.");
            return;
        }

        if (form.phone.replace(/\D/g, "").length < 8) {
            setStatus("Please enter a valid phone number.");
            return;
        }

        try {
            setSubmitting(true);

            await sendContactMessage(form);

            setStatus("Your message has been sent successfully!");
            setForm({
                name: "",
                email: "",
                phone: "",
                message: "",
            });
        } catch (error) {
            setStatus(error.message || "Failed to send your message. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <section className="contact-hero">
                <h1>Connected Globally. Available Locally.</h1>
                <p>
                    Reach out to our team to experience a new standard
                    of real estate advisory.
                </p>
            </section>

            <section className="section container">
                <div className="contact-grid">
                    <div className="contact-info">
                        <SectionTitle title="Contact Information" />

                        <p>
                            Our team is available for private consultations
                            and real estate inquiries.
                        </p>

                        <div className="contact-detail">
                            <MapPin />
                            <span>Minusia, Lake Maggiore, Switzerland</span>
                        </div>

                        <div className="contact-detail">
                            <Mail />
                            <span>support@gt.agency</span>
                        </div>

                        <div className="contact-detail">
                            <Phone />
                            <span>+20 101 234 5678</span>
                        </div>

                        <div className="contact-detail">
                            <Clock />
                            <span>Saturday - Wednesday: 9 AM - 5 PM</span>
                        </div>

                        <h3>Follow us on social media</h3>
                        <div className="social-links">
                            <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
                            <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
                            <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
                        </div>

                        <h3>Working Hours</h3>
                        <p>Saturday: 9:00 AM - 5:00 PM</p>
                        <p>Sunday: 9:00 AM - 5:00 PM</p>
                        <p>Monday: 9:00 AM - 5:00 PM</p>
                        <p>Tuesday: 9:00 AM - 5:00 PM</p>
                        <p>Wednesday: 9:00 AM - 5:00 PM</p>
                    </div>

                    <div className="contact-form-box">
                        <h2>Send us a message</h2>

                        <form onSubmit={handleSubmit}>
                            <label>Name</label>
                            <input
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Your name"
                                required
                            />

                            <label>Email</label>
                            <input
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Your email"
                                required
                            />

                            <label>Phone</label>
                            <input
                                name="phone"
                                type="tel"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="Your phone"
                                required
                            />

                            <label>Message</label>
                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                placeholder="Write your message..."
                                rows="5"
                                required
                            />

                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={submitting}
                            >
                                {submitting ? "Sending..." : "Send Message"}
                            </button>

                            {status && (
                                <p className="form-status">{status}</p>
                            )}
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ContactUs;
