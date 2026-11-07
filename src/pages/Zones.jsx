import { useEffect, useState } from "react";
import { getZones } from "../services/zones";
import ZoneCard from "../components/ZoneCard";
import SearchBar from "../components/SearchBar";
import SectionTitle from "../components/SectionTitle";

const getArray = (response) => {
    if (Array.isArray(response)) return response;
    if (Array.isArray(response?.data)) return response.data;
    if (Array.isArray(response?.zones)) return response.zones;
    return [];
};

const Zones = () => {
    const [search, setSearch] = useState("");
    const [zones, setZones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadZones = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await getZones();
                const items = getArray(response);

                setZones(items.map((zone) => ({
                    ...zone,
                    name: zone.name_en || zone.name_ar || "Zone",
                    description: zone.description_en || zone.description_ar || "",
                    image: zone.images?.[0] || "",
                })));
            } catch (err) {
                setError(err.message || "Failed to load zones.");
            } finally {
                setLoading(false);
            }
        };

        loadZones();
    }, []);

    const filteredZones = zones.filter((zone) =>
        zone.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <section className="page-hero zones-hero">
                <h1>Destinations Defined by Distinction</h1>
                <p>
                    Explore the locations that match your ambition and lifestyle.
                </p>
            </section>

            <section className="section container">
                <SectionTitle
                    title="Zone Projects"
                    subtitle="Find your perfect destination."
                />

                <div className="page-search">
                    <SearchBar
                        value={search}
                        onChange={setSearch}
                        placeholder="Search locations..."
                    />
                </div>

                {loading ? (
                    <div className="empty-state">Loading locations...</div>
                ) : error ? (
                    <div className="empty-state">{error}</div>
                ) : (
                    <>
                        <div className="zone-grid">
                            {filteredZones.map((zone) => (
                                <ZoneCard key={zone.id} zone={zone} />
                            ))}
                        </div>

                        {filteredZones.length === 0 && (
                            <div className="empty-state">
                                No locations found.
                            </div>
                        )}
                    </>
                )}
            </section>
        </>
    );
};

export default Zones;