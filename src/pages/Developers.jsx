import { useEffect, useState } from "react";
import { getDevelopers } from "../services/developers";
import { getUnits } from "../services/units";
import DeveloperCard from "../components/DeveloperCard";
import PropertyCard from "../components/PropertyCard";
import SearchBar from "../components/SearchBar";
import SectionTitle from "../components/SectionTitle";

const getArray = (response, key) => {
    if (Array.isArray(response)) return response;
    if (Array.isArray(response?.data)) return response.data;
    if (Array.isArray(response?.[key])) return response[key];
    return [];
};

const Developers = () => {
    const [search, setSearch] = useState("");
    const [developers, setDevelopers] = useState([]);
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                setError("");

                const [developersResponse, unitsResponse] = await Promise.all([
                    getDevelopers(),
                    getUnits(),
                ]);

                const developerItems = getArray(developersResponse, "developers");
                const unitItems = getArray(unitsResponse, "units");

                setDevelopers(developerItems.map((developer) => ({
                    ...developer,
                    name: developer.name_en || developer.name_ar || "Developer",
                    description: developer.description_en || developer.description_ar || "",
                    image: developer.images?.[0] || "",
                    projects: developer.projects?.length || developer.projectsCount || 0,
                })));

                setProperties(unitItems.map((unit) => ({
                    ...unit,
                    name: unit.title_en || unit.title_ar || "Property",
                    location: unit.zoneName_en || unit.zoneName_ar || "",
                    image: unit.images?.[0] || "",
                    price: Number(unit.price) || 0,
                    area: unit.size || 0,
                })));
            } catch (err) {
                setError(err.message || "Failed to load developers.");
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const filtered = developers.filter((developer) =>
        developer.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <section className="page-hero developers-hero">
                <h1>Defining the Future Skyline</h1>
                <p>
                    Great developments require vision, expertise and innovation.
                </p>
            </section>

            <section className="section container">
                <SectionTitle
                    title="Our Developers"
                    subtitle="Meet the trusted names behind exceptional projects."
                />

                <div className="page-search">
                    <SearchBar
                        value={search}
                        onChange={setSearch}
                        placeholder="Search developers..."
                    />
                </div>

                {loading ? (
                    <div className="empty-state">Loading developers...</div>
                ) : error ? (
                    <div className="empty-state">{error}</div>
                ) : (
                    <>
                        <div className="developer-grid">
                            {filtered.map((developer) => (
                                <DeveloperCard
                                    key={developer.id}
                                    developer={developer}
                                />
                            ))}
                        </div>

                        {filtered.length === 0 && (
                            <div className="empty-state">
                                No developers found.
                            </div>
                        )}
                    </>
                )}
            </section>

            <section className="section container">
                <SectionTitle title="Developers Projects" />

                {loading ? (
                    <div className="empty-state">Loading properties...</div>
                ) : (
                    <div className="property-grid">
                        {properties.map((property) => (
                            <PropertyCard key={property.id} property={property} />
                        ))}
                    </div>
                )}
            </section>
        </>
    );
};

export default Developers;