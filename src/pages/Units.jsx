import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getUnits } from "../services/units";
import { getData } from "../services/api";

import PropertyCard from "../components/PropertyCard";
import SearchBar from "../components/SearchBar";
import FilterPanel from "../components/FilterPanel";
import Pagination from "../components/Pagination";
import SectionTitle from "../components/SectionTitle";

const Units = () => {
    const [params] = useSearchParams();

    const [units, setUnits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [zones, setZones] = useState([]);
    
    const [search, setSearch] = useState("");
    const [zone, setZone] = useState(params.get("zone") || "");
    const [sort, setSort] = useState("default");
    const [page, setPage] = useState(1);

    const pageSize = 6;

    // تحميل الوحدات من الـ API
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError("");

                const [unitsResult, zonesResult] = await Promise.allSettled([
                    getUnits(),
                    getData("/zone"),
                ]);

                if (unitsResult.status === "fulfilled") {
                    const response = unitsResult.value;

                    const actualUnits = Array.isArray(response)
                        ? response
                        : response.data || response.units || [];

                    setUnits(actualUnits);
                } else {
                    throw unitsResult.reason;
                }

                if (zonesResult.status === "fulfilled") {
                    const response = zonesResult.value;

                    const actualZones = Array.isArray(response)
                        ? response
                        : response.data || response.zones || [];

                    setZones(
                        actualZones.map((item) => ({
                            id: item.id,
                            name: item.name_en || item.name_ar || "Unknown",
                        }))
                    );
                }
            } catch (err) {
                setError(err.message || "Failed to load properties.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // تجهيز بيانات الـ API بالشكل القديم الذي قد تستخدمه الكروت
    const properties = useMemo(() => {
        return units.map((unit) => ({
            ...unit,
            name: unit.title_en || unit.title_ar || "Property",
            location: unit.zoneName_en || unit.zoneName_ar || "",
            zone: unit.zoneName_en || unit.zoneName_ar || "",
            image: unit.images?.[0] || "",
            price: Number(unit.price) || 0,
            area: unit.size,
        }));
    }, [units]);

    // البحث والفلترة والترتيب
    const filteredProperties = useMemo(() => {
        let result = properties.filter((property) => {
            const searchText = search.toLowerCase();

            const matchesSearch =
                (property.name || "").toLowerCase().includes(searchText) ||
                (property.location || "").toLowerCase().includes(searchText) ||
                (property.projectName_en || "").toLowerCase().includes(searchText) ||
                (property.developerName_en || "").toLowerCase().includes(searchText);

            const matchesZone =
                !zone ||
                property.zone === zone ||
                property.zoneName_ar === zone ||
                property.zoneName_en === zone;

            return matchesSearch && matchesZone;
        });

        if (sort === "low") {
            result.sort((a, b) => a.price - b.price);
        }

        if (sort === "high") {
            result.sort((a, b) => b.price - a.price);
        }

        return result;
    }, [properties, search, zone, sort]);

    const totalPages = Math.ceil(filteredProperties.length / pageSize);

    const visibleProperties = filteredProperties.slice(
        (page - 1) * pageSize,
        page * pageSize
    );

    const updateSearch = (value) => {
        setSearch(value);
        setPage(1);
    };

    const updateZone = (value) => {
        setZone(value);
        setPage(1);
    };

    return (
        <>
            <section className="page-hero units-hero">
                <h1>Discover Your Perfect Property</h1>
                <p>Where visionary design meets everyday living.</p>
            </section>

            <section className="section container">
                <SectionTitle
                    title="Available Units"
                    subtitle="Explore our exclusive property collection."
                />

                <div className="units-toolbar">
                    <SearchBar value={search} onChange={updateSearch} />

                    <FilterPanel
                        zone={zone}
                        setZone={updateZone}
                        zones={zones}
                    />

                    <select
                        value={sort}
                        onChange={(e) => {
                            setSort(e.target.value);
                            setPage(1);
                        }}
                    >
                        <option value="default">Sort By</option>
                        <option value="low">Price: Low to High</option>
                        <option value="high">Price: High to Low</option>
                    </select>
                </div>

                {loading ? (
                    <div className="empty-state">
                        <h3>Loading properties...</h3>
                    </div>
                ) : error ? (
                    <div className="empty-state">
                        <h3>Something went wrong</h3>
                        <p>{error}</p>
                    </div>
                ) : (
                    <>
                        <p className="results-count">
                            {filteredProperties.length} Properties Found
                        </p>

                        {visibleProperties.length > 0 ? (
                            <div className="property-grid">
                                {visibleProperties.map((property) => (
                                    <PropertyCard
                                        key={property.id}
                                        property={property}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="empty-state">
                                <h3>No properties found</h3>
                                <p>Try changing your search or filters.</p>
                            </div>
                        )}

                        {totalPages > 1 && (
                            <Pagination
                                currentPage={page}
                                totalPages={totalPages}
                                onPageChange={setPage}
                            />
                        )}
                    </>
                )}
            </section>
        </>
    );
};

export default Units;