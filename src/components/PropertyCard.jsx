
import { Link } from "react-router-dom";
import { MapPin, BedDouble, Bath, Maximize } from "lucide-react";

const PropertyCard = ({ property }) => {
    return (
        <article className="property-card">
            <Link to={`/units/${property.id}`}>
                <img
                    src={property.image}
                    alt={property.name}
                    className="property-image"
                />
            </Link>

            <div className="property-info">
                <div className="property-location">
                    <MapPin size={14} />
                    {property.location}
                </div>

                <Link to={`/units/${property.id}`}>
                    <h3>{property.name}</h3>
                </Link>

                <div className="property-specs">
                    <span><Maximize size={15} /> {property.area} m²</span>
                    <span><BedDouble size={15} /> {property.bedrooms}</span>
                    <span><Bath size={15} /> {property.bathrooms}</span>
                </div>

                <div className="property-card-bottom">
                    <strong>
                        {property.price.toLocaleString("en-US")} EGP
                    </strong>
                    <Link to={`/units/${property.id}`} className="outline-btn">
                        View Details
                    </Link>
                </div>
            </div>
        </article>
    );
};

export default PropertyCard;
