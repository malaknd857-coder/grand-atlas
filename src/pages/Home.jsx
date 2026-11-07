import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Building2, Users, Award, MapPin } from "lucide-react";
import { getData } from "../services/api";
import PropertyCard from "../components/PropertyCard";
import ZoneCard from "../components/ZoneCard";
import DeveloperCard from "../components/DeveloperCard";
import SectionTitle from "../components/SectionTitle";

const getArray = (response, key) => {
    if (Array.isArray(response)) return response;
    if (Array.isArray(response?.data)) return response.data;
    if (Array.isArray(response?.[key])) return response[key];
    return [];
};

const Home = () => {
    const [properties, setProperties] = useState([]);
    const [zones, setZones] = useState([]);
    const [developers, setDevelopers] = useState([]);

    useEffect(() => {
        const loadHomeData = async () => {
            const [unitsResult, zonesResult, developersResult] =
                await Promise.allSettled([
                    getData("/unit"),
                    getData("/zone"),
                    getData("/developer"),
                ]);

            if (unitsResult.status === "fulfilled") {
                const units = getArray(unitsResult.value, "units");
                setProperties(units.map((unit) => ({
                    ...unit,
                    name: unit.title_en || unit.title_ar || "Property",
                    location: unit.zoneName_en || unit.zoneName_ar || "",
                    image: unit.images?.[0] || "",
                    price: Number(unit.price) || 0,
                    area: unit.size || 0,
                })));
            }

            if (zonesResult.status === "fulfilled") {
                const items = getArray(zonesResult.value, "zones");
                setZones(items.map((zone) => ({
                    ...zone,
                    name: zone.name_en || zone.name_ar || "Zone",
                    description: zone.description_en || zone.description_ar || "",
                    image: zone.images?.[0] || "",
                })));
            }

            if (developersResult.status === "fulfilled") {
                const items = getArray(developersResult.value, "developers");
                setDevelopers(items.map((developer) => ({
                    ...developer,
                    name: developer.name_en || developer.name_ar || "Developer",
                    description: developer.description_en || developer.description_ar || "",
                    image: developer.images?.[0] || "",
                    projects: developer.projects?.length || developer.projectsCount || 0,
                })));
            }
        };

        loadHomeData();
    }, []);

    return (
        <>
            <section className="hero">
                <div className="hero-content">
                    <span>WELCOME TO GRAND ATLAS</span>
                    <h1>Redefining the Horizon of Modern Luxury Living</h1>
                    <p>
                        Discover exceptional properties and explore a world
                        of sophisticated real estate opportunities.
                    </p>
                    <Link to="/units" className="btn btn-primary">
                        Explore Properties <ArrowRight size={17} />
                    </Link>
                </div>
            </section>

            <section className="section container">
                <SectionTitle title="Benchmarks of Success" />

                <div className="stats-grid">
                    <div className="stat-card">
                        <Building2 />
                        <h2>450+</h2>
                        <p>Premium Properties</p>
                    </div>
                    <div className="stat-card">
                        <Users />
                        <h2>1200+</h2>
                        <p>Happy Clients</p>
                    </div>
                    <div className="stat-card">
                        <Award />
                        <h2>15+</h2>
                        <p>Years of Experience</p>
                    </div>
                    <div className="stat-card">
                        <MapPin />
                        <h2>25+</h2>
                        <p>Prime Locations</p>
                    </div>
                </div>
            </section>

            <section className="section about-section">
                <div className="container about-grid">
                    <img
                        src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200"
                        alt="Grand Atlas luxury property"
                    />
                    <div>
                        <span className="eyebrow">ABOUT GRAND ATLAS</span>
                        <h2>Creating Exceptional Real Estate Experiences</h2>
                        <p>
                            At Grand Atlas, we believe finding the perfect property
                            is more than a transaction. It is the beginning of a new
                            lifestyle. Our team connects you with outstanding homes
                            and distinguished developments.
                        </p>
                        <Link to="/contact-us" className="btn btn-primary">
                            Discover More <ArrowRight size={17} />
                        </Link>
                    </div>
                </div>
            </section>

            <section className="section container">
                <SectionTitle
                    title="Hand-Selected Masterpieces"
                    subtitle="Explore our exclusive collection of properties."
                />

                <div className="property-grid">
                    {properties.slice(0, 3).map((property) => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                </div>

                <div className="center-btn">
                    <Link to="/units" className="btn btn-primary">
                        View All Units
                    </Link>
                </div>
            </section>

            <section className="section zones-section">
                <div className="container">
                    <SectionTitle
                        title="Strategic Locations"
                        subtitle="Discover destinations designed around your lifestyle."
                    />
                    <div className="zone-grid">
                        {zones.map((zone) => (
                            <ZoneCard key={zone.id} zone={zone} />
                        ))}
                    </div>
                </div>
            </section>

            <section className="section container">
                <SectionTitle
                    title="Future Landmarks"
                    subtitle="Meet the developers shaping tomorrow's communities."
                />
                <div className="developer-grid">
                    {developers.map((developer) => (
                        <DeveloperCard key={developer.id} developer={developer} />
                    ))}
                </div>

                <div className="center-btn">
                    <Link to="/developers" className="btn btn-primary">
                        Explore Developers
                    </Link>
                </div>
            </section>

            <section className="contact-banner">
                <div>
                    <h2>Ready to Find Your Dream Property?</h2>
                    <p>Let our team help you discover your next home.</p>
                    <Link to="/contact-us" className="btn btn-light">
                        Contact Our Team
                    </Link>
                </div>
            </section>
        </>
    );
};

export default Home;