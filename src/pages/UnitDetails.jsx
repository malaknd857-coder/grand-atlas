
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
    MapPin,
    BedDouble,
    Bath,
    Maximize,
    Phone,
    MessageCircle,
} from "lucide-react";

import { getUnitById } from "../services/units";
import ErrorMessage from "../components/ErrorMessage";

const UnitDetails = () => {
    const { id } = useParams();

    const [property, setProperty] = useState(null);
    const [selectedImage, setSelectedImage] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await getUnitById(id);
                const unit = response.data || response.unit || response;

                if (!unit || !unit.id) {
                    throw new Error("Property not found.");
                }

                const formattedProperty = {
                    ...unit,
                    name: unit.title_en || unit.title_ar || "Property",
                    location: unit.zoneName_en || unit.zoneName_ar || "",
                    price: Number(unit.price) || 0,
                    area: unit.size || 0,
                    images: Array.isArray(unit.images) ? unit.images : [],
                    description:
                        unit.description_en || unit.description_ar || "",
                    developer:
                        unit.developerName_en ||
                        unit.developerName_ar ||
                        unit.project?.developer?.name_en ||
                        "",
                    zone: unit.zoneName_en || unit.zoneName_ar || "",
                    rooms: unit.rooms || 0,
                };

                setProperty(formattedProperty);
                setSelectedImage(formattedProperty.images[0] || "");
            } catch (err) {
                setError(err.message || "Failed to load property.");
            } finally {
                setLoading(false);
            }
        };

        fetchProperty();
    }, [id]);

    const phone = "201012345678";

    if (loading) {
        return (
            <div className="container section">
                <h3>Loading property details...</h3>
            </div>
        );
    }

    if (error || !property) {
        return (
            <div className="container section">
                <ErrorMessage message={error || "Property not found."} />
                <Link to="/units" className="btn btn-primary">
                    Back to Units
                </Link>
            </div>
        );
    }

    return (
        <section className="section container details-page">
            <div className="details-gallery">
                {selectedImage ? (
                    <img
                        className="main-gallery-image"
                        src={selectedImage}
                        alt={property.name}
                    />
                ) : (
                    <div className="main-gallery-image">
                        No image available
                    </div>
                )}

                <div className="gallery-thumbnails">
                    {property.images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedImage(image)}
                            className={
                                selectedImage === image ? "active-thumb" : ""
                            }
                        >
                            <img
                                src={image}
                                alt={`Property ${index + 1}`}
                            />
                        </button>
                    ))}
                </div>
            </div>

            <div className="details-heading">
                <div>
                    <h1>{property.name}</h1>
                    <p>
                        <MapPin size={16} /> {property.location}
                    </p>
                </div>

                <h2>{property.price.toLocaleString("en-US")} EGP</h2>
            </div>

            <div className="details-content">
                <div className="glance">
                    <h3>At a glance</h3>

                    <p><Maximize /> Plot size: {property.area} m²</p>
                    <p><BedDouble /> Bedrooms: {property.bedrooms}</p>
                    <p><Bath /> Bathrooms: {property.bathrooms}</p>
                    <p>Developer: {property.developer || "Not specified"}</p>
                    <p>Zone: {property.zone || "Not specified"}</p>
                    <p>Project: {property.projectName_en || property.project?.name_en || "Not specified"}</p>
                </div>

                <div className="overview">
                    <h3>Overview</h3>
                    <p>{property.description}</p>

                    <div className="details-actions">
                        <a
                            href={`https://wa.me/${phone}?text=${encodeURIComponent(
                                `Hello, I am interested in ${property.name}`
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                            className="btn whatsapp-btn"
                        >
                            <MessageCircle /> Contact via WhatsApp
                        </a>

                        <a href={`tel:+${phone}`} className="btn btn-outline">
                            <Phone /> Call
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UnitDetails;
