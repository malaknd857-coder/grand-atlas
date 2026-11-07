
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const ZoneCard = ({ zone }) => {
    return (
        <Link
            to={`/units?zone=${encodeURIComponent(zone.name)}`}
            className="zone-card"
        >
            <img src={zone.image} alt={zone.name} />
            <div className="zone-overlay">
                <h3>{zone.name}</h3>
                <p>{zone.description}</p>
                <span>Explore Properties <ArrowRight size={16} /></span>
            </div>
        </Link>
    );
};

export default ZoneCard;
